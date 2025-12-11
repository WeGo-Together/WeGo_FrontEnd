module.exports = async ({ github, context }) => {
  const fs = require('fs');

  const buildUrl = process.env.BUILD_URL || '';
  const now = new Date().toISOString().replace('T', ' ').split('.')[0];

  const title = '## 🎭 Playwright Report';
  const descriptionSuccess = `
✨ **E2E Test가 성공적으로 완료되었습니다.**

Test 요약 내용을 확인해주세요.
`;
  const descriptionSkipped = `
✨ **E2E Test 파일이 감지되지 않았습니다.**

이 PR에는 Test File이 없어서 Report를 생성하지 못했습니다.
`;
  const descriptionFailed = `
❌ **E2E Test에 실패했습니다.**

Test Log를 확인하시고 로직을 수정해주세요.
`;

  const statusTableSuccess = `
| Status | Build Log | Updated (UTC) |
|--------|-----------|---------------|
| ✅ Ready | [View Build](${buildUrl}) | ${now} |
`;

  const statusTableSkipped = `
| Status | Build Log | Updated (UTC) |
|--------|-----------|---------------|
| ⏭️ Skipped | - | ${now} |
`;

  const statusTableFailed = `
| Status | Build Log | Updated (UTC) |
|--------|-----------|---------------|
| ❌ Failed | [View Logs](${buildUrl}) | ${now} |
`;

  const results = JSON.parse(fs.readFileSync('test-results/results.json', 'utf8'));

  const passed = results.stats.expected;
  const failed = results.stats.unexpected;
  const duration = (results.stats.duration / 1000).toFixed(1);

  // 성공한 테스트 목록
  const successTestsByFile = results.suites.reduce((acc, suite) => {
    const fileName = suite.file;
    const passedSpecs = suite.specs.filter((spec) => spec.ok);

    if (passedSpecs.length > 0) {
      acc[fileName] = passedSpecs.map((spec) => ({
        project: spec.tests[0].projectName,
        title: spec.title,
      }));
    }

    return acc;
  }, {});

  const totalPassedCount = Object.values(successTestsByFile).flat().length;

  const passedTestsList = Object.entries(successTestsByFile)
    .map(([file, tests]) => {
      const testList = tests.map((test) => `  - [${test.project}] ${test.title}`).join('\n');
      return `- **${file}** (${tests.length})\n${testList}`;
    })
    .join('\n');

  // 실패한 테스트 목록
  const failedTestsByFile = results.suites.reduce((acc, suite) => {
    const fileName = suite.file;
    const failedSpecs = suite.specs.filter((spec) => !spec.ok);

    if (failedSpecs.length > 0) {
      acc[fileName] = failedSpecs.map((spec) => ({
        project: spec.tests[0].projectName,
        title: spec.title,
        error: spec.tests[0].results[0].errors[0]?.message || 'Unknown error',
      }));
    }

    return acc;
  }, {});

  const totalFailedCount = Object.values(failedTestsByFile).flat().length;

  // 실패한 테스트 목록
  const failedTestList = Object.entries(failedTestsByFile)
    .map(([file, tests]) => {
      const testList = tests
        .map(
          (test) =>
            `  - [${test.project}] ${test.title}\n    \`\`\`\n    ${test.error.split('\n')[0]}\n    \`\`\``,
        )
        .join('\n');
      return `- **${file}** (${tests.length})\n${testList}`;
    })
    .join('\n');

  let resultType;

  if (passed + failed === 0) resultType = 'skipped';
  else if (failed > 0) resultType = 'failed';
  else resultType = 'success';

  let nextDescription;
  let nextStatusTable;
  switch (resultType) {
    case 'success':
      nextDescription = descriptionSuccess;
      nextStatusTable = statusTableSuccess;
      break;
    case 'skipped':
      nextDescription = descriptionSkipped;
      nextStatusTable = statusTableSkipped;
      break;
    case 'failed':
      nextDescription = descriptionFailed;
      nextStatusTable = statusTableFailed;
      break;
  }

  const testSummary = `
### 📊 Test Summary
- ✅ Passed: ${totalPassedCount}
- ❌ Failed: ${totalFailedCount}
- ⏱️ Duration: ${duration}s
`;

  //prettier-ignore
  const successTestListSection = totalPassedCount > 0 ?
`<details>
<summary><strong>✅ Passed Tests (${totalPassedCount})</strong></summary>

${passedTestsList}

</details>
` : '';

  //prettier-ignore
  const failedTestListSection = totalFailedCount > 0 ?
`<details open>
<summary><strong>❌ Failed Tests (${totalFailedCount})</strong></summary>

${failedTestList}

</details>
` : '';

  //prettier-ignore
  const testResults = totalPassedCount + totalFailedCount > 0 ? `
### 📜 Test Details
${successTestListSection}

${failedTestListSection}
` : '';

  const comment = `
${title}

${nextDescription}

${nextStatusTable}

${testSummary}

${testResults}
`;

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
      (comment) => comment.user.type === 'Bot' && comment.body.includes(title),
    );

    if (botComment) {
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: commentBody,
      });
      console.log('✅ Playwright 코멘트가 업데이트되었습니다.');
    } else {
      await github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
      console.log('✅ Playwright 코멘트가 생성되었습니다.');
    }
  }

  await postOrUpdateComment(comment);
};
