import { GroupModal } from '@/components/pages/group/group-modal';
import { Button } from '@/components/ui';
import { useModal } from '@/components/ui';

export const PendingButton = () => {
  const { open } = useModal();

  return (
    <div className='flex gap-[10px]'>
      <Button
        className='flex-[1.2]'
        variant='tertiary'
        onClick={() => open(<GroupModal type='pending' />)}
      >
        신청 취소
      </Button>
      <Button className='flex-2' disabled={true}>
        대기중
      </Button>
    </div>
  );
};
