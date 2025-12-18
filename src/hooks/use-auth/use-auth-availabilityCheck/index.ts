'use client';

import { useCallback, useMemo, useState } from 'react';

import { Availability } from '@/types/service/user';

type AvailabilityState =
  | { status: 'idle' }
  | { status: 'checking' }
  | { status: 'available'; message: string }
  | { status: 'unavailable'; message: string }
  | { status: 'error'; message: string };

type Messages = {
  available: string;
  unavailable: string;
  error: string;
  checking: string;
};

export const useAvailabilityCheck = <TQuery>(
  request: (query: TQuery) => Promise<Availability>,
  buildQuery: (value: string) => TQuery,
  messages: Messages,
) => {
  const [state, setState] = useState<AvailabilityState>({ status: 'idle' });

  const hint = useMemo(() => {
    if (state.status === 'checking') return messages.checking;
    if (state.status === 'available') return state.message;
    if (state.status === 'unavailable') return state.message;
    if (state.status === 'error') return state.message;
    return undefined;
  }, [messages.checking, state]);

  const isChecking = state.status === 'checking';
  const isAvailable = state.status === 'available';

  const reset = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  const check = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      if (isChecking) return;

      try {
        setState({ status: 'checking' });

        const data = await request(buildQuery(trimmed));
        const available = Boolean(data.available);

        if (available) {
          setState({ status: 'available', message: messages.available });
        } else {
          setState({ status: 'unavailable', message: messages.unavailable });
        }
      } catch {
        setState({ status: 'error', message: messages.error });
      }
    },
    [buildQuery, isChecking, messages, request],
  );

  return { state, hint, isChecking, isAvailable, reset, check };
};
