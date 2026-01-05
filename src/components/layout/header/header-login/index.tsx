import Link from 'next/link';

export const HeaderLogin = () => {
  return (
    <Link href={'/login'} className='text-text-sm-semibold px-2 py-1 text-gray-500'>
      로그인
    </Link>
  );
};
