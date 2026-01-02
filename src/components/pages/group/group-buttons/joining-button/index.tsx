import { GroupModal } from '@/components/pages/group/group-modal';
import { Button } from '@/components/ui';
import { useModal } from '@/components/ui';

interface Props {
  conditions: {
    isGroupFull: boolean;
    isFreeGroup: boolean;
  };
}

export const JoiningButton = ({ conditions: { isGroupFull, isFreeGroup } }: Props) => {
  const { open } = useModal();

  return (
    <Button
      disabled={isGroupFull}
      onClick={() => open(<GroupModal type={isFreeGroup ? 'attend' : 'approval'} />)}
    >
      {isFreeGroup ? '참여하기' : '참여 신청하기'}
    </Button>
  );
};
