import { NextRequest, NextResponse } from 'next/server';

export default async function proxy(request: NextRequest) {
  // const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  const protectedPaths = ['/mypage', '/create-group', '/message', '/schedule', '/notification'];
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  // 보호되지 않은 경로는 그냥 통과
  if (!isProtected) {
    return NextResponse.next();
  }

  // 둘 다 없으면 로그인 페이지로 redirect
  if (!refreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('error', 'unauthorized');
    loginUrl.searchParams.set('path', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)'],
};
