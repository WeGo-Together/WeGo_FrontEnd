import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

export const signupSchema = z
  .object({
    email: z.email('이메일 형식이 올바르지 않습니다.'),
    nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
