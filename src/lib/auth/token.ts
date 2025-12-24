const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (token: string, maxAgeSeconds?: number) => {
  if (typeof document === 'undefined') return;

  const parts = [
    `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}`,
    'path=/',
    'domain=.wego.monster',
  ];

  if (typeof maxAgeSeconds === 'number' && maxAgeSeconds > 0) {
    parts.push(`Max-Age=${maxAgeSeconds}`);
  }

  document.cookie = parts.join('; ');
};

export const clearAccessToken = () => {
  if (typeof document === 'undefined') return;

  document.cookie = `${ACCESS_TOKEN_KEY}=; Max-Age=0; path=/`;
};
