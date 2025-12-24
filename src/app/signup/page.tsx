import { Icon } from '@/components/icon';
import { SignupForm } from '@/components/pages/auth';
import { AuthSwitch } from '@/components/shared';

const SignupPage = () => {
  return (
    <div className='flex-col-center min-h-[calc(100dvh-113px)] gap-10 overflow-auto bg-gray-100 px-4 py-15'>
      <div className='flex-col-center w-full gap-4'>
        <Icon id='wego-logo' className='h-19.5 w-45' />
        <SignupForm />
      </div>
      <AuthSwitch type='login' />
    </div>
  );
};

export default SignupPage;
