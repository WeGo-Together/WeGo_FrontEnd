import { Icon } from '../../../icon';

type CardInfoRowProps = {
  iconId: 'map-pin' | 'calendar';
  label: string;
};

export const CardInfoRow = ({ iconId, label }: CardInfoRowProps) => (
  <div className='flex items-center gap-1.5'>
    <Icon id={iconId} width={12} className='text-gray-600' height={12} />
    <span className='text-text-xs-regular text-gray-600'>{label}</span>
  </div>
);
