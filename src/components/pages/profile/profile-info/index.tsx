import { Button } from '@/components/ui';
import { User } from '@/types/service/user';

import { ProfileCard } from '../profile-card';
import { ProfileDescription } from '../profile-description';
import { ProfileFollowsBadge } from '../profile-follows-badge';

interface Props {
  user: User;
}

export const ProfileInfo = ({ user }: Props) => {
  return (
    <section className='px-4 py-8'>
      <ProfileCard user={user} />
      <ProfileFollowsBadge user={user} />
      <Button>팔로우</Button>
      <ProfileDescription user={user} />
    </section>
  );
};
