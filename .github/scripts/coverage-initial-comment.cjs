module.exports = async ({ github, context }) => {
  const buildLogUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
  const now = new Date().toISOString().replace('T', ' ').split('.')[0];

  const commentBody = `## 📊 Coverage Report

🔄 **Coverage Report를 생성 중입니다.**

잠시만 기다려주세요...

| Status | Build Log | Updated (UTC) |
|--------|-----------|---------------|
| 🔄 Testing... | [View Logs](${buildLogUrl}) | ${now} |`;

  // 기존 코멘트 찾기
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });

  const botComment = comments.find(
    (comment) => comment.user.type === 'Bot' && comment.body.includes('## 📊 Coverage Report'),
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
