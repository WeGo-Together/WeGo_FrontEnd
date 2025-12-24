import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2 className='text-gray-700'>페이지를 찾을 수 없습니다.</h2>
      <p className='text-gray-700'>존재하지 않는 경로입니다</p>
      <Link href='/' className='text-gray-700'>
        홈으로
      </Link>
    </div>
  );
}
