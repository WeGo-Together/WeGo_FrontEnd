import { NextRequest, NextResponse } from 'next/server';

import { API } from './api';

export const proxy = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  let hasValidToken = !!accessToken;

  const protectedPaths = ['/mypage', '/create-group', '/message', '/schedule', '/notification'];
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  const publicPaths = ['/login', '/signup'];
  const isPublic = publicPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // 일반 응답 생성
  const response = NextResponse.next();

  // accessToken이 없으면 refresh 실행하여 일반 응답에 set cookie 설정
  if (!accessToken && refreshToken) {
    try {
      const res = await API.authService.refresh();
      const data = res;
      hasValidToken = true;
      response.cookies.set('accessToken', data.accessToken, {
        httpOnly: false,
        maxAge: data.expiresIn,
      });
    } catch {
      hasValidToken = false;
    }
  }

  // 인증된 사용자가 public 페이지 접근 시 홈으로
  if (isPublic && hasValidToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 보호되지 않은 경로는 그냥 통과
  if (!isProtected) {
    return response;
  }

  // accessToken 없으면 login redirect
  if (!hasValidToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('error', 'unauthorized');
    loginUrl.searchParams.set('path', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
