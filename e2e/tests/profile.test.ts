import { expect, test } from '@playwright/test';

test('나의 프로필 페이지로 접속 시 마이페이지로 리다이렉트 되는 지 테스트', async ({ page }) => {
  // 나의 프로필 페이지 방문
  await page.goto('/profile/1');

  // redirect 대기
  await expect(page).toHaveURL('/mypage');
});

test('존재하지 않는 프로필 페이지로 접속 시 404 리다이렉트 되는 지 테스트', async ({ page }) => {
  // 존재하지 않는 프로필 페이지 방문
  await page.goto('/profile/4');

  // redirect 대기
  await expect(page.getByTestId('not-found-user')).toBeVisible();
});
