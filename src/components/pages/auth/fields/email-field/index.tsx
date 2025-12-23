import { AnyFieldApi } from '@tanstack/react-form';

import { FormInput } from '@/components/shared';
import { getHintMessage } from '@/lib/auth/utils';

interface Props {
  field: AnyFieldApi;
}
export const EmailField = ({ field }: Props) => {
  const hintMessage = getHintMessage(field);

  return (
    <FormInput
      hintMessage={hintMessage}
      inputProps={{
        type: 'email',
        autoComplete: 'email',
        placeholder: '이메일을 입력해주세요',
        value: field.state.value,
        onChange: (e) => field.handleChange(e.target.value),
      }}
      labelName='이메일'
    />
  );
};
