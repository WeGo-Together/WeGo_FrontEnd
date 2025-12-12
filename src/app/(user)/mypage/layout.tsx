import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const MyPageLayout = async ({ children }: Props) => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const myId = Number(cookieStore.get('userId')?.value);

  if (!myId) redirect('/login');
  return <>{children}</>;
};

export default MyPageLayout;
