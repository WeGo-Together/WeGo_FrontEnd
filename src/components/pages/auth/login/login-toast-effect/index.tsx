'use client';

import { useEffect, useRef } from 'react';

import { Toast } from '@/components/ui';
import { useToast } from '@/components/ui/toast/core';
import { useAuth } from '@/providers';

type Props = {
  error?: string | string[];
};

export const LoginToastEffect = ({ error }: Props) => {
  const { run } = useToast();
  const { setIsAuthenticated } = useAuth();
  const lastErrorRef = useRef<string>('');

  useEffect(() => {
    if (!error) return;

    const normalized = Array.isArray(error) ? error.join(',') : error;

    if (lastErrorRef.current === normalized) return;
    lastErrorRef.current = normalized;

    setIsAuthenticated(false);

    run(<Toast type='info'>로그인이 필요한 서비스입니다.</Toast>);
  }, [error, run, setIsAuthenticated]);

  return null;
};
