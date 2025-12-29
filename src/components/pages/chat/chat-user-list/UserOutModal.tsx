import { Button, ModalContent, ModalDescription, ModalTitle, useModal } from '@/components/ui';

interface IProps {
  nickName: string;
}

export const UserOutModal = ({ nickName }: IProps) => {
  const { close } = useModal();

  const handleOut = () => {
    console.log(`${nickName} 내보내기 완료`);
    close();
  };

  return (
    <ModalContent className='flex max-w-[311px] flex-col'>
      <div className='my-6 flex flex-col items-center'>
        <ModalTitle>{`${nickName}을 내보내시겠어요?`}</ModalTitle>
        <ModalDescription>이 작업은 취소할 수 없습니다.</ModalDescription>
      </div>
      <div className='flex w-full gap-2'>
        <Button className='text-text-sm-semibold h-10' variant='tertiary' onClick={close}>
          취소
        </Button>
        <Button className='text-text-sm-bold h-10' onClick={handleOut}>
          내보내기
        </Button>
      </div>
    </ModalContent>
  );
};
