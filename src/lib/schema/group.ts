import { z } from 'zod';

export const createGroupSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty('모임 제목을 입력해 주세요.')
    .max(50, '모임 제목은 50자 이내 입력해 주세요.'),
  location: z.string().nonempty('모임 장소를 입력해 주세요.'),
  startTime: z.string().nonempty('모임 날짜와 시간을 입력해 주세요.'),
  tags: z.array(z.string().nonempty().max(8, '태그는 8자 이내 입력해 주세요.')).max(10).optional(),
  description: z
    .string()
    .trim()
    .min(1, '모임 상세 정보를 입력해 주세요.')
    .max(300, '모임 상세 정보는 300자 이내 입력해 주세요.'),
  maxParticipants: z.number().min(2, '최대 인원을 입력해 주세요.').max(12),
  images: z
    .array(
      z.object({
        imageKey: z.string(),
        sortOrder: z.number(),
        imageUrl440x240: z.string(),
        imageUrl100x100: z.string(),
      }),
    )
    .optional(),
  joinPolicy: z.union([z.literal('FREE'), z.literal('APPROVE')]),
});

export type CreateGroupFormValues = z.infer<typeof createGroupSchema>;
