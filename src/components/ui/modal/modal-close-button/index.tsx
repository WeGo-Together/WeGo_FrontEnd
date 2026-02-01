import { Icon } from '@/components/icon';

import { useModal } from '../modal-provider';

export const ModalCloseButton = () => {
  const { close } = useModal();
  return (
    <button
      className='absolute top-0 right-0 rounded-sm transition-colors duration-300 hover:bg-gray-200 active:bg-gray-200'
      aria-label='모달 닫기'
      type='button'
      onClick={close}
    >
      <Icon id='x-1' className='size-5 cursor-pointer text-gray-500' />
    </button>
  );
};
