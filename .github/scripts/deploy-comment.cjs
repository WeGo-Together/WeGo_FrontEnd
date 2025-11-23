module.exports = async ({ github, context, core, branch, appDomain, success }) => {
  const buildLogUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;

  let commentBody;

  if (success) {
    const previewUrl = `https://${branch}.preview.${appDomain}`;
    commentBody = `## 🚀 PR Preview Report

✨ Build가 성공적으로 완료되었습니다.

🔗 **Preview Link**: ${previewUrl}
🔗 **Build Log**: ${buildLogUrl}`;
  } else {
    commentBody = `## 🚀 PR Preview Report

❌ Build에 실패했습니다.

Build log를 확인하시고 로직을 수정해주세요.

🔗 **Build Log**: ${buildLogUrl}`;
  }

  // 기존 코멘트 찾기
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });

  const botComment = comments.find(
    (comment) => comment.user.type === 'Bot' && comment.body.includes('## 🚀 PR Preview Report'),
  );

  // 기존 코멘트 있으면 수정, 없으면 생성
  if (botComment) {
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: botComment.id,
      body: commentBody,
    });
    console.log('✅ 기존 코멘트 업데이트 완료');
  } else {
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body: commentBody,
    });
    console.log('✅ 새 코멘트 생성 완료');
  }
};
