import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  detail: GetGroupDetailsResponse['description'];
}

export const DescriptionDetail = ({ detail }: Props) => {
  return (
    <div className='mt-6'>
      <p className='text-text-md-regular break-keep text-gray-800'>{detail}</p>
    </div>
  );
};
