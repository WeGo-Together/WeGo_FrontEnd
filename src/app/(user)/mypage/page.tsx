'use client';
import { useGetUser } from '@/hooks/use-user';
import { useDeleteUser } from '@/hooks/use-user/use-user-delete';
import { useUpdateUser } from '@/hooks/use-user/use-user-update';

const MyPage = () => {
  const userId = 1;
  // 여기서 user 정보를 확인해서 undefined이면 로그인페이지로 리다이렉트

  const { data } = useGetUser({ userId });

  const { mutate: updateUser } = useUpdateUser({
    nickName: '새로운 이름',
    profileMessage: '새로운 메시지',
  });

  const { mutate: deleteUser } = useDeleteUser();

  const handleUpdateClick = () => {
    updateUser();
  };

  const handleDeleteClick = () => {
    deleteUser();
  };

  return (
    <div>
      <p>{data?.id}</p>
      <p>{data?.nickName}</p>
      <p>{data?.mbti}</p>

      <button onClick={handleUpdateClick}>프로필 변경 요청</button>
      <button onClick={handleDeleteClick}>회원 탈퇴</button>
    </div>
  );
};

export default MyPage;
