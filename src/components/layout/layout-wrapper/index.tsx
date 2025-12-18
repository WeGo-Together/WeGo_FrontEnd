import { GNB } from '@/components/layout/gnb';
import { Header } from '@/components/layout/header';

interface Props {
  children: React.ReactNode;
}

export const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className='relative mx-auto max-w-110 min-w-70 bg-gray-100'>
      <Header />
      <main className='min-h-[calc(100vh-112px)]'>{children}</main>
      <GNB />
    </div>
  );
};
