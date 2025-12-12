import { cookies } from 'next/headers';

// import { redirect } from 'next/navigation';
import { Icon } from '@/components/icon';
import { LoginForm } from '@/components/pages/login';
import { AuthSwitch } from '@/components/shared';

import LoginTempActions from './_temp/login-temp-actions';

const LoginPage = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  // if (accessToken) {
  //   redirect('/');
  // }

  return (
    <div className='flex-col-center min-h-[calc(100dvh-113px)] gap-10 overflow-auto bg-gray-100 px-4 py-15'>
      <div className='flex-col-center w-full gap-4'>
        <Icon id='wego-logo' className='h-19.5 w-45' />
        <LoginForm />
      </div>
      <AuthSwitch type='signup' />
      {/* 📜 임시, 삭제 예정 */}
      {accessToken && <LoginTempActions />}
    </div>
  );
};

export default LoginPage;
