import { expect, test } from '@playwright/test';

test('비로그인 상태에서 /mypage 접속 시 /login으로 redirect 되는 지 테스트', async ({ page }) => {
  await page.goto('/mypage');

  // redirect 대기
  await expect(page).toHaveURL('/login');
});

test('나의 프로필 페이지로 접속 시 /mypage로 /redirect 되는 지 테스트', async ({ page }) => {
  // 쿠키 설정
  await page.context().addCookies([
    {
      name: 'userId',
      value: '1',
      domain: 'localhost', // 또는 실제 도메인
      path: '/',
      httpOnly: false, // HttpOnly 쿠키면 true
      secure: false, // HTTPS면 true
      sameSite: 'Lax',
    },
  ]);

  // 나의 프로필 페이지 방문
  await page.goto('/profile/1');

  // redirect 대기
  await expect(page).toHaveURL('/mypage');
});

test('존재하지 않는 프로필 페이지로 접속 시 404 redirect 되는 지 테스트', async ({ page }) => {
  // 존재하지 않는 프로필 페이지 방문
  await page.goto('/profile/4');

  // redirect 대기
  await expect(page.getByTestId('not-found-user')).toBeVisible();
});
