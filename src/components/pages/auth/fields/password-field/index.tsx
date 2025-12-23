'use client';

import { useState } from 'react';

import { type AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { FormInput } from '@/components/shared';
import { getHintMessage } from '@/lib/auth/utils';

interface PasswordToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
}

interface Props {
  field: AnyFieldApi;
  passwordType: 'loginPassword' | 'signupPassword' | 'confirmPassword';
}

const PasswordToggleButton = ({ isVisible, onToggle }: PasswordToggleButtonProps) => {
  return (
    <button
      className='absolute top-4 right-5 h-6 w-6'
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
      tabIndex={-1}
      type='button'
      onClick={onToggle}
    >
      <Icon id={isVisible ? 'visibility-true' : 'visibility-false'} className='text-gray-600' />
    </button>
  );
};

export const PasswordField = ({ field, passwordType }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const hintMessage = getHintMessage(field);

  const isConfirmPassword = passwordType === 'confirmPassword';
  const isLogin = passwordType === 'loginPassword';

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  const iconButton = <PasswordToggleButton isVisible={isVisible} onToggle={handleToggle} />;

  return (
    <FormInput
      hintMessage={hintMessage}
      inputProps={{
        type: isVisible ? 'text' : 'password',
        autoComplete: isLogin ? 'current-password' : 'new-password',
        placeholder: !isConfirmPassword
          ? '비밀번호를 입력해주세요'
          : '비밀번호를 한 번 더 입력해주세요',
        value: field.state.value,
        iconButton: iconButton,
        onChange: (e) => field.handleChange(e.target.value),
        onBlur: () => field.handleBlur(),
      }}
      labelName={!isConfirmPassword ? '비밀번호' : '비밀번호 확인'}
    />
  );
};
