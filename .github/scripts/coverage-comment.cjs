module.exports = async ({ github, context }) => {
  const fs = require('fs');

  // GitHub Actions에서 테스트 결과 확인
  const testOutcome = process.env.TEST_OUTCOME;
  /**
   * PR에 코멘트를 작성하거나 업데이트하는 함수
   */
  async function postOrUpdateComment(commentBody) {
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
    });

    const botComment = comments.find(
      (comment) => comment.user.type === 'Bot' && comment.body.includes('## 📊 Coverage Report'),
    );

    if (botComment) {
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: commentBody,
      });
      console.log('✅ Coverage 코멘트가 업데이트되었습니다.');
    } else {
      await github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
      console.log('✅ Coverage 코멘트가 생성되었습니다.');
    }
  }

  // Handle "tests failed" scenario
  if (testOutcome === 'failure') {
    console.log('❌ 테스트가 실패했습니다.');

    const failedComment = `## 📊 Coverage Report
              
❌ **테스트 실행에 실패했습니다**

테스트 실행에 실패했으므로 Coverage Report 생성에 실패했습니다.

test log를 확인하시고 로직을 수정해주세요.`;

    await postOrUpdateComment(failedComment);
    return;
  }

  // Check if current coverage exists
  let currentCoverage;
  let hasNoTests = false;

  try {
    const coverageData = fs.readFileSync('coverage/coverage-summary.json', 'utf8');
    currentCoverage = JSON.parse(coverageData);

    // Check if there are actually no test files (coverage exists but is empty)
    const totalLines = currentCoverage.total?.lines?.total || 0;
    if (totalLines === 0) {
      hasNoTests = true;
    }
  } catch (error) {
    // Coverage file doesn't exist
    console.log('⚠️ Coverage 파일을 찾을 수 없습니다.');
    hasNoTests = true;
  }

  // Handle "no tests" scenario
  if (hasNoTests) {
    console.log('ℹ️ 이 PR에서 테스트 파일을 찾을 수 없습니다.');

    const noTestsComment = `## 📊 Coverage Report
              
ℹ️ **테스트 파일이 감지되지 않았습니다**

이 PR에는 test file이 없어서 Report를 생성하지 못했습니다.`;

    await postOrUpdateComment(noTestsComment);
    return;
  }

  // Check if base coverage exists
  let baseCoverage;
  let isFirstRun = false;
  try {
    baseCoverage = JSON.parse(fs.readFileSync('base-coverage/coverage-summary.json', 'utf8'));
  } catch (error) {
    console.log('⚠️ 기준 coverage를 찾을 수 없습니다. 첫 실행입니다.');
    isFirstRun = true;
    // Use empty baseline
    baseCoverage = {
      total: {
        lines: { pct: 0, total: 0, covered: 0 },
        branches: { total: 0 },
        statements: { total: 0 },
        functions: { total: 0 },
      },
    };
  }

  const current = currentCoverage.total;
  const base = baseCoverage.total;

  // Calculate stats
  const currentIssueNumber = context.issue.number;

  const baseCoveragePercent = base.lines.pct;
  const currentCoveragePercent = current.lines.pct;
  const coveragePercentDiff = currentCoveragePercent - baseCoveragePercent;

  const baseFiles = Object.keys(baseCoverage).filter((key) => key !== 'total').length;
  const currentFiles = Object.keys(currentCoverage).filter((key) => key !== 'total').length;
  const filesDiff = currentFiles - baseFiles;

  const baseLines = base.lines.total;
  const currentLines = current.lines.total;
  const linesDiff = currentLines - baseLines;

  const baseBranches = base.branches.total;
  const currentBranches = current.branches.total;
  const branchesDiff = current.branches.total - base.branches.total;

  const baseHits = base.lines.covered;
  const currentHits = current.lines.covered;
  const hitsDiff = currentHits - baseHits;

  const baseMisses = base.lines.total - base.lines.covered;
  const currentMisses = current.lines.total - current.lines.covered;
  const missesDiff = currentMisses - baseMisses;

  const formatValue = (v, len = 9) => String(v).padStart(len);
  const formatText = (v, len = 9) => String(v).padEnd(len);
  const formatRow = (label, useHighlight, unit, base, current, diff) => {
    const sign = diff > 0 ? '+' : '';
    const prefix = diff > 0 ? '+' : diff < 0 ? '-' : ' ';
    return `${useHighlight ? prefix + ' ' : '  '}${formatText(label, 8)}${formatValue(base + unit)}${formatValue(current + unit)}${formatValue(sign + diff + unit, 10)}     `;
  };

  // Header
  let header;
  if (isFirstRun) {
    header = `첫 번째 coverage report입니다. 앞으로의 PR들은 이 기준선과의 차이를 보여줍니다.\n\n현재 coverage: **${current.lines.pct.toFixed(2)}%**\n\n`;
  } else {
    const direction = coveragePercentDiff > 0 ? '증가' : coveragePercentDiff < 0 ? '감소' : '유지';
    const emoji = coveragePercentDiff > 0 ? '📈' : coveragePercentDiff < 0 ? '📉' : '➡️';
    header = `${emoji} **#${context.issue.number}**을 **main**에 병합하면 coverage가 \`${Math.abs(coveragePercentDiff).toFixed(2)}%\` ${direction}합니다.\n\n`;
  }

  // Coverage Diff Table
  const diffTable = `
### Coverage 요약

\`\`\`diff
@@             Coverage Diff             @@
##             main   ${String('#' + currentIssueNumber).padStart(6)}       +/-   ##
===========================================
${formatRow('Coverage', true, '%', baseCoveragePercent, currentCoveragePercent, coveragePercentDiff)}
===========================================
${formatRow('Files', false, '', baseFiles, currentFiles, filesDiff)}
${formatRow('Lines', false, '', baseLines, currentLines, linesDiff)}
${formatRow('Branches', false, '', baseBranches, currentBranches, branchesDiff)}
===========================================
${formatRow('Hits', true, '', baseHits, currentHits, hitsDiff)}
${formatRow('Misses', true, '', baseMisses, currentMisses, missesDiff)}
\`\`\`
`;

  // Impacted Files
  let impactedTable = '';

  if (isFirstRun) {
    impactedTable =
      '\n### 영향받은 파일\n\n📋 **기준선이 설정되었습니다**\n\n첫 번째 coverage report입니다. 앞으로의 PR들은 coverage 변경으로 영향받은 파일들을 보여줍니다.';
  } else {
    const impactedFiles = [];
    for (const file of Object.keys(currentCoverage)) {
      if (file === 'total') continue;
      if (file.includes('.test.') || file.includes('.spec.')) continue;

      const currentPct = currentCoverage[file]?.lines.pct || 0;
      const basePct = baseCoverage[file]?.lines.pct || 0;
      const diff = currentPct - basePct;

      if (Math.abs(diff) > 0.01) {
        impactedFiles.push({
          name: file,
          current: currentPct.toFixed(2),
          diff: diff.toFixed(2),
          arrow: diff < -0.01 ? '⬇️' : diff > 0.01 ? '⬆️' : '➡️',
        });
      }
    }

    if (impactedFiles.length > 0) {
      impactedTable = '\n### 영향받은 파일\n\n| 파일 | Coverage 변화 |\n|------|------------|\n';
      impactedFiles.forEach((f) => {
        impactedTable += `| \`${f.name}\` | \`${f.current}% (${f.diff >= 0 ? '+' : ''}${f.diff}%)\` ${f.arrow} |\n`;
      });
    } else {
      impactedTable =
        '\n### 영향받은 파일\n\n✅ **이 PR로 영향받은 파일이 없습니다**\n\n수정된 모든 파일이 현재 coverage를 유지했습니다.';
    }
  }

  // Final comment
  const comment = `## 📊 Coverage Report\n\n${header}\n${diffTable}${impactedTable}`;

  await postOrUpdateComment(comment);
};
