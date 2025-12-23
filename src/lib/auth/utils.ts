import { type AnyFieldApi } from '@tanstack/react-form';

export const getHintMessage = (field: AnyFieldApi) => {
  const {
    meta: { errors, isTouched },
  } = field.state;
  const { submissionAttempts } = field.form.state;

  const firstError = errors[0] as { message?: string } | undefined;
  const showError = isTouched || submissionAttempts > 0;

  return showError ? firstError?.message : undefined;
};
