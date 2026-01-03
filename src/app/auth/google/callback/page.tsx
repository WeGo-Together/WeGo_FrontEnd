'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { API } from '@/api';
import { normalizePath } from '@/lib/auth/utils';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const returnedState = searchParams.get('state');
    const error = searchParams.get('error');

    const cleanupOAuthState = () => {
      sessionStorage.removeItem('google_oauth_state');
    };

    if (error) {
      cleanupOAuthState();
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!code || !returnedState) {
      cleanupOAuthState();
      router.replace('/login?error=missing_code');
      return;
    }

    const savedState = sessionStorage.getItem('google_oauth_state');
    if (!savedState || savedState !== returnedState) {
      cleanupOAuthState();
      router.replace('/login?error=invalid_state');
      return;
    }

    const nextPath = normalizePath(sessionStorage.getItem('post_login_path'));

    const exchange = async () => {
      try {
        const redirectUri = `${window.location.origin}/auth/google/callback`;

        await API.authService.exchangeGoogleCode({
          authorizationCode: code,
          redirectUri,
        });

        cleanupOAuthState();

        sessionStorage.removeItem('post_login_path');

        router.replace(nextPath);
      } catch {
        router.replace(`/login?error=network_error&path=${nextPath}`);
      } finally {
        cleanupOAuthState();
      }
    };

    exchange();
  }, [router, searchParams]);

  return null;
}
