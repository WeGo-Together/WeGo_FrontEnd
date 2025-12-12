import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('올바른 이메일 형식이 아닙니다.')
    .max(50, '이메일은 최대 50자까지 입력할 수 있습니다.'),
  password: z.string(),
});

export const signupSchema = loginSchema
  .extend({
    nickname: z
      .string()
      .min(2, '닉네임은 2자 이상이어야 합니다.')
      .max(14, '닉네임은 14자 이하로 입력해주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/[!@#$%^&*]/, '!, @, #, $, %, ^, &, * 중 1개 이상 포함해야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
