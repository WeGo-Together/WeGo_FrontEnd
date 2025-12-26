import Image from 'next/image';

interface Props {
  children?: React.ReactNode;
}

export const EmptyState = ({ children }: Props) => {
  return (
    <section className='flex-col-center text-text-sm-medium pointer-events-none absolute inset-0 gap-2 text-gray-600'>
      <Image width={140} alt='빈 화면' height={140} src='/images/image-empty.png' />
      {children}
    </section>
  );
};
