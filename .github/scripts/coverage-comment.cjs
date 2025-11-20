module.exports = async ({ github, context }) => {
  const fs = require('fs');

  // Check if current coverage exists
  let currentCoverage;
  try {
    currentCoverage = JSON.parse(fs.readFileSync('coverage/coverage-summary.json', 'utf8'));
  } catch (error) {
    console.log('❌ No coverage file generated. Tests may have failed.');

    // Post error comment
    const errorComment = `
## 📊 Coverage Report
              
⚠️ **Unable to generate coverage report**

Coverage file not found. This usually means:
- Tests failed to run
- \`npm run test:coverage\` didn't generate coverage
- Coverage directory is not created

Please check the test execution logs above.`;

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
        body: errorComment,
      });
    } else {
      await github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: errorComment,
      });
    }

    return; // Exit early
  }

  // Check if base coverage exists
  let baseCoverage;
  let isFirstRun = false;
  try {
    baseCoverage = JSON.parse(fs.readFileSync('base-coverage/coverage-summary.json', 'utf8'));
  } catch (error) {
    console.log('⚠️ No base coverage found. This is the first run.');
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
    header = `This is the first coverage report. Future PRs will show diff against this baseline.\n\nCurrent coverage: **${current.lines.pct.toFixed(2)}%**\n\n`;
  } else {
    const direction =
      coveragePercentDiff > 0
        ? 'increase'
        : coveragePercentDiff < 0
          ? 'decrease'
          : 'remain the same';
    const emoji = coveragePercentDiff > 0 ? '📈' : coveragePercentDiff < 0 ? '📉' : '➡️';
    header = `${emoji} Merging **#${context.issue.number}** into **main** will ${direction} coverage by \`${Math.abs(coveragePercentDiff).toFixed(2)}%\`.\n\n`;
  }

  // Coverage Diff Table
  const diffTable = `
### Coverage Summary

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

  // Impacted Files (skip for first run)
  let impactedTable = '';
  console.log('isFirstRun:', isFirstRun);
  console.log('Total files in current coverage:', Object.keys(currentCoverage).length);
  console.log('Total files in base coverage:', Object.keys(baseCoverage).length);

  if (isFirstRun) {
    impactedTable =
      '\n### Impacted Files\n\n📋 **Baseline established**\n\nThis is the first coverage report. Future PRs will show which files are impacted by coverage changes.';
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
      impactedTable = '\n### Impacted Files\n\n| File | Coverage Δ |\n|------|------------|\n';
      impactedFiles.forEach((f) => {
        impactedTable += `| \`${f.name}\` | \`${f.current}% (${f.diff >= 0 ? '+' : ''}${f.diff}%)\` ${f.arrow} |\n`;
      });
    } else {
      impactedTable =
        '\n### Impacted Files\n\n✅ **No files were impacted by this PR**\n\nAll modified files maintained their current coverage.';
    }
  }

  // Final comment
  const comment = `## 📊 Coverage Report\n\n${header}\n${diffTable}${impactedTable}`;

  // Find and update or create comment
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
      body: comment,
    });
  } else {
    await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: comment,
    });
  }
};
