import { z } from 'zod';

export const profileImageOnChangeSchema = z.union([
  z.object({ blobUrl: z.instanceof(File) }),
  z.object({ Url: z.null() }),
  z.object({}),
]);

export const nickNameOnChangeSchema = z
  .string()
  .min(2, '닉네임은 2글자 이상이어야 합니다.')
  .max(20, '닉네임은 20글자 이하여야 합니다.');

export const profileMessageOnChangeSchema = z
  .string()
  .max(20, '소개글은 20글자까지 작성 가능합니다.');

export const mbtiOnChangeSchema = z.string().refine(
  (val) => {
    if (val === '') return true;
    if (val.length >= 1 && !['I', 'E', 'i', 'e'].includes(val[0])) return false;
    if (val.length >= 2 && !['S', 'N', 's', 'n'].includes(val[1])) return false;
    if (val.length >= 3 && !['T', 'F', 't', 'f'].includes(val[2])) return false;
    if (val.length === 4 && !['J', 'P', 'j', 'p'].includes(val[3])) return false;
    return true;
  },
  { message: '유효한 MBTI가 아닙니다' },
);

export const mbtiOnBlurSchema = z.string().refine(
  (val) => {
    if (val === '') return true;
    return val.length === 4 && /^[IEie][SNsn][TFtf][JPjp]$/.test(val);
  },
  { message: 'MBTI 4글자를 모두 입력해주세요' },
);
