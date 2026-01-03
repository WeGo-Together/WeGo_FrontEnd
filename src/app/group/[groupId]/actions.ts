'use server';

import { revalidatePath } from 'next/cache';

export const revalidateGroupAction = async (groupId: string) => {
  // 모임 취소 (useDeleteGroup) Mutation 이후 해당 groupId의 상세 페이지의 RSC 캐싱을 무효 처리함.
  // RSC 캐싱을 무효화 해야만, History Back을 통해 재진입하더라도 RSC의 캐싱 데이터를 보여주지 않음.
  revalidatePath(`/group/${groupId}`);
};
