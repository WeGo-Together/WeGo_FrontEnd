import { Icon } from '@/components/icon';

interface Props {
  location: string;
  date: string;
  time: string;
}

export const DescriptionSetting = ({ location, date, time }: Props) => {
  return (
    <div className='mt-6'>
      <ul className='text-text-sm-medium space-y-[6px] text-gray-900'>
        <li className='flex items-center gap-2'>
          <Icon id='map-pin' width={16} className='text-mint-500' height={16} />
          <p>{location}</p>
        </li>
        <li className='flex items-center gap-2'>
          <Icon id='calendar' width={16} className='text-mint-500' height={16} />
          <p>
            {date} - {time}
          </p>
        </li>
      </ul>
    </div>
  );
};
