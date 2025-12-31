import { type AnyFieldApi } from '@tanstack/react-form';

export const getHintMessage = (field: AnyFieldApi) => {
  const {
    meta: { errors, isTouched, isDirty },
  } = field.state;
  const { submissionAttempts } = field.form.state;

  const showError = isTouched || isDirty || submissionAttempts > 0;
  const firstError = errors[0] as { message?: string } | undefined;

  return showError ? firstError?.message : undefined;
};

export const normalizePath = (raw: string | null) => {
  const value = (raw ?? '').trim();

  if (!value) return '/';

  if (value.startsWith('//') || value.includes('://')) return '/';

  return value.startsWith('/') ? value : `/${value}`;
};
