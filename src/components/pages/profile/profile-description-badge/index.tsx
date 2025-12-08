import { Icon, IconId } from '@/components/icon';

export interface ProfileDescriptionBadgeProps {
  label: string;
  iconId: IconId;
  value: string;
}

interface Props {
  badgeItems: ProfileDescriptionBadgeProps;
}

export const ProfileDescriptionBadge = ({ badgeItems }: Props) => {
  return (
    <div className='flex flex-row items-center gap-4'>
      <div className='flex-center size-10 rounded-xl bg-gray-100'>
        <Icon id={badgeItems.iconId} className='text-mint-500 size-6' />
      </div>
      <div className='flex flex-col'>
        <span className='text-text-xs-medium text-gray-500'>{badgeItems.label}</span>
        <span className='text-text-md-semibold text-gray-700'>{badgeItems.value}</span>
      </div>
    </div>
  );
};
