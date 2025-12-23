import { type AnyFieldApi } from '@tanstack/react-form';

export const getHintMessage = (field: AnyFieldApi) => {
  const {
    meta: { errors, isTouched, isDirty },
  } = field.state;
  const { submissionAttempts } = field.form.state;

  const showError = isTouched || isDirty || submissionAttempts > 0;

  const firstError = errors[0] as { message?: string } | undefined;

  if (typeof firstError === 'string') return firstError;

  return showError ? firstError?.message : undefined;
};
