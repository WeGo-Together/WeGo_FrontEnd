const ACCESS_TOKEN_KEY = 'accessToken';
const COOKIE_DOMAIN = '.wego.monster';

export const setAccessToken = (token: string, maxAgeSeconds?: number) => {
  if (typeof document === 'undefined') return;

  const parts = [
    `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}`,
    'path=/',
    `domain=${COOKIE_DOMAIN}`,
  ];

  if (typeof maxAgeSeconds === 'number' && maxAgeSeconds > 0) {
    parts.push(`Max-Age=${maxAgeSeconds}`);
  }

  document.cookie = parts.join('; ');
};

export const clearAccessToken = () => {
  if (typeof document === 'undefined') return;

  document.cookie = [
    `${ACCESS_TOKEN_KEY}=`,
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'path=/',
    `domain=${COOKIE_DOMAIN}`,
  ].join('; ');

  document.cookie = `${ACCESS_TOKEN_KEY}=; Max-Age=0; path=/`;
};

export const getAccesstoken = async () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  } else {
    const match = document.cookie.match(new RegExp(`(^| )${ACCESS_TOKEN_KEY}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : undefined;
  }
};
