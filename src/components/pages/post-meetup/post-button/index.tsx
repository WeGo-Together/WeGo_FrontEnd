import { AnyFormState } from '@tanstack/react-form';

import { Button } from '@/components/ui';

interface Props {
  state: AnyFormState;
  onSubmitClick: () => void;
}

export const MeetupSubmitButton = ({ state, onSubmitClick }: Props) => {
  const { canSubmit, isSubmitted, isPristine } = state;

  const isSubmitDisabled = !canSubmit || isSubmitted || isPristine;

  return (
    <div className='mt-6 border-t-1 border-gray-200 bg-white px-4 py-3'>
      <Button disabled={isSubmitDisabled} type='button' onClick={onSubmitClick}>
        모임 생성
      </Button>
    </div>
  );
};
