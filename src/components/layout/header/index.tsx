import Link from 'next/link';

export const Header = () => {
  return (
    <header className='sticky top-0 z-100 h-14 w-full bg-white px-4 py-2'>
      <nav className='flex-between'>
        <Link href={'/'}>
          <svg width={92} height={40}>
            <use href='/icons/wego-logo.svg' />
          </svg>
        </Link>
        <Link href={'/notification'} className='flex-center h-10 w-10'>
          <svg width={24} height={24}>
            <use href='/icons/cowbell.svg' />
          </svg>
        </Link>
      </nav>
    </header>
  );
};
