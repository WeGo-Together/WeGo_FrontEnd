import { Icon } from '@/components/icon';
import { formatDateTime } from '@/lib/formatDateTime';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  setting: Pick<GetGroupDetailsResponse, 'address' | 'startTime'>;
}

export const DescriptionSetting = ({
  setting: {
    address: { location },
    startTime,
  },
}: Props) => {
  return (
    <div className='mt-6'>
      <ul className='text-text-sm-medium space-y-[6px] text-gray-900'>
        <li className='flex items-center gap-2'>
          <Icon id='map-pin-1' width={16} className='text-mint-500' height={16} />
          <p>{location}</p>
        </li>
        <li className='flex items-center gap-2'>
          <Icon id='calendar-1' width={16} className='text-mint-500' height={16} />
          <p>{formatDateTime(startTime)}</p>
        </li>
      </ul>
    </div>
  );
};
