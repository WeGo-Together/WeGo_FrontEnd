import Link from 'next/link';

const ProfileNotFound = () => {
  return (
    <div data-testid='not-found-user'>
      <h2>존재하지 않는 유저입니다.</h2>
      <Link href='/'>메인으로 돌아가기</Link>
    </div>
  );
};

export default ProfileNotFound;
