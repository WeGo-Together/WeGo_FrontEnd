import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  title: GetGroupDetailsResponse['title'];
}

export const DescriptionTitle = ({ title }: Props) => {
  return (
    <div className='mt-6'>
      <h2 className='text-text-xl-bold break-keep text-gray-900'>{title}</h2>
    </div>
  );
};
