import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './index';

const handleLoginMock = jest.fn();
const clearLoginErrorMock = jest.fn();

jest.mock('@/hooks/use-auth', () => ({
  useLogin: () => ({
    handleLogin: handleLoginMock,
    loginError: null,
    clearLoginError: clearLoginErrorMock,
  }),
}));

type MinimalField = {
  state: { value: string };
  handleChange: (value: string) => void;
};

type FieldProps = { field: MinimalField };

jest.mock('@/components/pages/auth/fields', () => ({
  EmailField: ({ field }: FieldProps) => (
    <input
      aria-label='이메일'
      value={field.state.value ?? ''}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  ),
  PasswordField: ({ field }: FieldProps) => (
    <input
      aria-label='비밀번호'
      value={field.state.value ?? ''}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  ),
}));

jest.mock('../../auth-button', () => ({
  AuthSubmitButton: () => <button type='submit'>로그인하기</button>,
}));

type LoginSnsButtonProps = React.PropsWithChildren<{ onClick: () => void }>;

jest.mock('../login-sns-button', () => ({
  LoginSnsButton: ({ onClick, children }: LoginSnsButtonProps) => (
    <button type='button' onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('입력 후 submit 시 handleLogin이 payload로 호출된다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('이메일'), 'ok@wego.com');
    await user.type(screen.getByLabelText('비밀번호'), 'pw');

    await user.click(screen.getByRole('button', { name: '로그인하기' }));

    expect(handleLoginMock).toHaveBeenCalledTimes(1);
    expect(handleLoginMock.mock.calls[0][0]).toEqual({
      email: 'ok@wego.com',
      password: 'pw',
    });
    expect(handleLoginMock.mock.calls[0][1]).toBeTruthy();
  });

  it('email/password 변경 시 clearLoginError가 호출된다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText('이메일'), 'a');
    expect(clearLoginErrorMock).toHaveBeenCalled();
  });
});
