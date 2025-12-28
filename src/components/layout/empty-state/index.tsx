import Image from 'next/image';

interface Props {
  children?: React.ReactNode;
}

export const EmptyState = ({ children }: Props) => {
  return (
    <section className='flex-col-center text-text-sm-medium absolute inset-0 text-center text-gray-600'>
      <Image
        width={140}
        className='mb-2'
        alt='빈 화면'
        height={140}
        src='/images/image-empty.png'
      />
      {children}
    </section>
  );
};
