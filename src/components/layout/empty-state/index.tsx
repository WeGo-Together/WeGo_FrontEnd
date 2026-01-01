import { Icon } from '@/components/icon';

interface Props {
  children?: React.ReactNode;
}

export const EmptyState = ({ children }: Props) => {
  return (
    <section className='flex-col-center text-text-sm-medium absolute inset-0 text-center text-gray-600'>
      <Icon id='empty' className='mb-2 size-35' />
      {children}
    </section>
  );
};
