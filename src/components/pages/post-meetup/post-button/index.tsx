import { Button } from '@/components/ui';

interface Props {
  onSubmitClick: () => void;
}

export const MeetupSubmitButton = ({ onSubmitClick }: Props) => {
  return (
    <div className='mt-6 border-t-1 border-gray-200 bg-white px-4 py-3'>
      <Button type='button' onClick={onSubmitClick}>
        모임 생성
      </Button>
    </div>
  );
};
