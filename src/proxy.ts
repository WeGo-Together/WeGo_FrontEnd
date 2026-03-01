import { NextRequest, NextResponse } from 'next/server';

import { RefreshResponse } from './types/service/auth';

const GUEST_ONLY_PATHS = ['/login', '/signup'];
const MEMBER_ONLY_PATHS = ['/mypage', '/create-group', '/message', '/schedule', '/notification'];

export const proxy = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  let isLoggedIn = !!accessToken;
  let refreshFailed = false;

  const isGuestOnly = GUEST_ONLY_PATHS.some((path) => request.nextUrl.pathname.startsWith(path));
  const isMemberOnly = MEMBER_ONLY_PATHS.some((path) => request.nextUrl.pathname.startsWith(path));

  // 일반 응답 생성
  const response = NextResponse.next();

  // accessToken이 없을 때 refreshToken 있으면 refresh 시도 - 응답에 set cookie 설정
  if (!isLoggedIn && refreshToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: { Cookie: `refreshToken=${refreshToken.value}` },
      });
      if (!res.ok) throw new Error('refresh failed');
      const json = await res.json();
      const data: RefreshResponse = json.data;
      isLoggedIn = true;
      response.cookies.set('accessToken', data.accessToken, {
        httpOnly: false,
        maxAge: data.expiresIn,
        domain: 'wego.monster',
        secure: process.env.NODE_ENV === 'production',
      });
      // 서버가 발급한 새 refreshToken Set-Cookie 헤더를 브라우저에 포워딩
      const setCookieHeader = res.headers.get('set-cookie');
      if (setCookieHeader) {
        response.headers.append('Set-Cookie', setCookieHeader);
      }
    } catch (err) {
      console.log('refresh failed', err);
      isLoggedIn = false;
      refreshFailed = true;
      response.cookies.set('refreshToken', '', {
        maxAge: 0,
        domain: 'wego.monster',
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  }

  // 로그인 상태에서 Guest Only Path 에 접근 시 / 로 Redirect
  if (isGuestOnly && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 로그아웃 상태에서 Member Only Path에 접근 시 /login 으로 Redirect
  if (isMemberOnly && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('error', 'unauthorized');
    loginUrl.searchParams.set('path', request.nextUrl.pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    if (refreshFailed) {
      redirectResponse.cookies.set('refreshToken', '', {
        maxAge: 0,
        domain: 'wego.monster',
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
    return redirectResponse;
  }

  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// 0. refreshToken만 있고 accessToken이 없는 경우 refresh 시도
// 0-1. refreshToken이 유효하지 않을 때는 로그아웃 상태로 판정됨. 이후 규칙에 의해 동작이 결정됨
// 1. 로그인 상태에서 /login, /signup 접근 시 /로 redirect
// 2. 로그아웃 상태에서 인증이 필요한 경로 접근 시 /login으로 redirect
// 3. member only 도 아니고 guest only 도 아닌 경로 접근 시 그대로 통과(ex. / 접근 시)

// 기본 정보
// - logout API는 accessToken이 유효하지 않을 경우 401 에러 반환됨.
// - 즉 refreshToken이 저장되어있지만 유효하지 않으면 logout api 실행 불가
// - 따라서 refreshToken이 유효하지 않을 경우 logout api를 호출하는 것이 아닌 직접 setcookie 설정으로 cookie 정보를 삭제해야함.
