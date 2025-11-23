import { redirect } from 'next/navigation';

interface BaseAPIConfig {
  method: string;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
  cache?: RequestCache;
}

export const httpClient = async <T>(url: string, config: BaseAPIConfig): Promise<T> => {
  const isServer = typeof window === 'undefined';
  const environment = isServer ? '🔵 SERVER' : '🟢 CLIENT';
  const isDev = process.env.NODE_ENV === 'development';

  // 개발 환경에서만 로그
  if (isDev) {
    console.groupCollapsed(`${environment} 📤 API Request`);
    console.log('Method:', config.method.toUpperCase());
    console.log('URL:', url);
    console.log('Params:', config.params);
    console.log('Data:', config.data);
    console.groupEnd();
  }

  // queryString 처리
  const queryString = config.params
    ? (() => {
        const search = new URLSearchParams();
        Object.entries(config.params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            search.append(key, String(value));
          }
        });
        const qs = search.toString();
        return qs ? `?${qs}` : '';
      })()
    : '';

  // token 처리
  let token: string | undefined;

  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    token = cookieStore.get('accessToken')?.value;
  } else {
    const match = document.cookie.match(new RegExp('(^| )accessToken=([^;]+)'));
    token = match ? decodeURIComponent(match[2]) : undefined;
  }

  // body 처리
  let body: string | FormData | undefined = undefined;

  const hasBody = !['GET', 'HEAD'].includes(config.method.toUpperCase());
  const isFormData = config.data instanceof FormData;

  if (hasBody && config.data) {
    body = isFormData ? (config.data as FormData) : JSON.stringify(config.data);
  }

  // headers 처리
  const headers: Record<string, string> = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(config.headers || {}),
  };

  // FormData일 때는 Content-Type 제거 (브라우저가 자동으로 boundary와 함께 설정)
  if (isFormData && headers['Content-Type']) {
    delete headers['Content-Type'];
  }

  // fetch 호출
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${queryString}`, {
    method: config.method,
    headers,
    body,
    signal: config.signal,
    cache: config.cache ?? 'no-store',
    credentials: config.credentials,
  });

  // 401 처리
  if (response.status === 401) {
    redirect('/login');
  }

  // 에러 처리
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } catch {
      const text = await response.text();
      if (text) errorMessage = text;
    }
    throw new Error(errorMessage);
  }

  // 빈 응답 처리
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    const text = await response.text();
    return text as unknown as T;
  }

  return response.json();
};
