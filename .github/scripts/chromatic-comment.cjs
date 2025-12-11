module.exports = async ({ github, context, core }) => {
  const changeCount = parseInt(process.env.CHANGE_COUNT || '0', 10);
  const hasChanges = changeCount > 0;
  const buildStatus = process.env.BUILD_STATUS || 'success'; // ← 이 줄 추가!
  const storybookUrl = process.env.STORYBOOK_URL || '';
  const buildUrl = process.env.BUILD_URL || '';
  const now = new Date().toISOString().replace('T', ' ').split('.')[0];

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
      (comment) => comment.user.type === 'Bot' && comment.body.includes('## 🎨 Storybook Report'),
    );

    if (botComment) {
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: commentBody,
      });
      console.log('✅ Storybook 코멘트가 업데이트되었습니다.');
    } else {
      await github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: commentBody,
      });
      console.log('✅ Storybook 코멘트가 생성되었습니다.');
    }
  }

  let comment;

  if (buildStatus === 'failure') {
    // 빌드 실패
    console.log('❌ Storybook 빌드가 실패했습니다.');
    comment = `## 🎨 Storybook Report

❌ **Story 생성에 실패했습니다**

build log를 확인하시고 로직을 수정해주세요.

| Status | Storybook | Build Log | Updated (UTC) |
|--------|-----------|-----------|---------------|
| ❌ Failed | - | [View Logs](${buildUrl}) | ${now} |`;
  } else if (!hasChanges) {
    // Story 변경사항 없음
    comment = `## 🎨 Storybook Report

✅ **변경 사항이 없습니다**

모든 Story가 이전 빌드와 동일합니다.

| Status | Storybook | Build Log | Updated (UTC) |
|--------|-----------|-----------|---------------|
| ✅ Unchanged | [View Storybook](${storybookUrl}) | [View Build](${buildUrl}) | ${now} |`;
  } else {
    // Story 변경사항 있음
    comment = `## 🎨 Storybook Report

✨ **Story가 변경되었습니다**

Chromatic에서 비주얼 변경사항을 확인하세요.

| Status | Storybook | Build Log | Updated (UTC) |
|--------|-----------|-----------|---------------|
| ✅ Ready | [View Storybook](${storybookUrl}) | [View Build](${buildUrl}) | ${now} |`;
  }

  await postOrUpdateComment(comment);
};
