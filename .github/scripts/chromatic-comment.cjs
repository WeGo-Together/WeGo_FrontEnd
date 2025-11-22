module.exports = async ({ github, context, core }) => {
  const hasChanges = process.env.HAS_CHANGES === 'true';
  const storybookUrl = process.env.STORYBOOK_URL || '';
  const buildUrl = process.env.BUILD_URL || '';

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

  if (!hasChanges) {
    // Story 변경사항 없음
    comment = `## 🎨 Storybook Report

ℹ️ **Story 변경사항이 감지되지 않았습니다**

이 PR에는 Story 변경이 없어서 빌드를 스킵했습니다.`;
  }
  else {
    // Story 변경사항 있음
    comment = `## 🎨 Storybook Report

✨ **Story가 변경되었습니다**

Chromatic에서 비주얼 변경사항을 확인하세요.

📚 [View Storybook](${storybookUrl})
🔍 [View Build Details](${buildUrl})`;
  }

  await postOrUpdateComment(comment);
};