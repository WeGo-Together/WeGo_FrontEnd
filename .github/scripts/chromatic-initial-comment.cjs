module.exports = async ({ github, context }) => {
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

  // 빌드 실패
  console.log('🔄 Storybook 빌드를 시작합니다.');
  comment = `## 🎨 Storybook Report

🔄 **Storybook Build가 진행중입니다.**

잠시만 기다려주세요...

| Status | Storybook | Build Log | Updated (UTC) |
|--------|-----------|-----------|---------------|
| 🔄 Building... | - | [View Logs](${buildUrl}) | ${now} |`;

  await postOrUpdateComment(comment);
};
