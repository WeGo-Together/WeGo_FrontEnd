import { z } from 'zod';

export const createGroupSchema = z.object({
  title: z
    .string()
    .min(2, '제목은 2자 이상 입력해주세요.')
    .max(50, '제목은 50자 이내 입력해주세요.'),
  location: z.string().nonempty('모임 장소를 입력해주세요.'),
  startTime: z.string().nonempty('날짜와 시간을 입력해주세요.'),
  tags: z.array(z.string()).optional(),
  description: z.string().nonempty('상세 정보를 입력해주세요.'),
  maxParticipants: z.number({ error: '' }).min(2, '최대 인원을 입력해주세요.').max(12),
  images: z
    .array(
      z.object({
        sortOrder: z.number(),
        imageUrl440x240: z.string(),
        imageUrl100x100: z.string(),
      }),
    )
    .optional(),
});

export type CreateGroupFormValues = z.infer<typeof createGroupSchema>;
