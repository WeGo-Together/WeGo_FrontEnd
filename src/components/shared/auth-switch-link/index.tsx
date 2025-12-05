import Link from 'next/link';

const authSwitchContent = {
  login: {
    description: '이미 회원이신가요?',
    linkText: '로그인하기',
    href: '/login',
  },
  signup: {
    description: 'WEGO가 처음이신가요?',
    linkText: '회원가입하기',
    href: '/signup',
  },
} as const;

type AuthSwitchType = keyof typeof authSwitchContent;

interface AuthSwitchProps {
  type?: AuthSwitchType;
}

export const AuthSwitch = ({ type = 'login' }: AuthSwitchProps) => {
  const content = authSwitchContent[type];

  return (
    <p className='flex-center bg-mono-white text-text-sm-medium gap-1 rounded-full px-4 py-2 text-gray-600'>
      {content.description}
      <Link href={content.href} className='text-mint-600 text-text-sm-semibold'>
        {content.linkText}
      </Link>
    </p>
  );
};
