import { Icon } from '../../../icon';

type CardInfoRowProps = {
  iconId: 'map-pin-1' | 'calendar-1';
  label: string;
};

export const CardInfoRow = ({ iconId, label }: CardInfoRowProps) => (
  <div className='flex min-w-0 items-center gap-1.5'>
    <Icon id={iconId} width={12} className='shrink-0 text-gray-600' height={12} />
    <span className='text-text-xs-regular truncate text-gray-600'>{label}</span>
  </div>
);
