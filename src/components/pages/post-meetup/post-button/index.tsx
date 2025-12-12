import { AnyFormState } from '@tanstack/react-form';

import { Button } from '@/components/ui';

interface Props {
  state: AnyFormState;
}

export const MeetupSubmitButton = ({ state }: Props) => {
  return (
    <div className='mt-6 border-t-1 border-gray-200 bg-white px-4 py-3'>
      <Button disabled={!state.canSubmit} type='submit'>
        모임 생성
      </Button>
    </div>
  );
};
