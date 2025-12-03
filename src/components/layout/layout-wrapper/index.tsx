import { GNB } from '@/components/layout/gnb';
import { Header } from '@/components/layout/header';

interface Props {
  children: React.ReactNode;
}

export const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className='relative mx-auto max-w-[440px] bg-blue-200'>
      <Header />
      <main className='min-h-[calc(100vh-112px)]'>{children}</main>
      <GNB />
    </div>
  );
};
