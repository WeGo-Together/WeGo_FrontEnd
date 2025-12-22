import {
  DescriptionDetail,
  DescriptionProfile,
  DescriptionProgress,
  DescriptionSetting,
  DescriptionTags,
  DescriptionTitle,
} from '@/components/pages/meetup/meetup-descriptions/description-sections';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  descriptions: Pick<
    GetGroupDetailsResponse,
    | 'status'
    | 'createdBy'
    | 'createdAt'
    | 'address'
    | 'title'
    | 'tags'
    | 'description'
    | 'startTime'
    | 'myMembership'
    | 'maxParticipants'
    | 'participantCount'
  >;
}

export const MeetupDescriptions = ({
  descriptions: {
    status,
    createdBy,
    createdAt,
    address: { location },
    title,
    tags,
    description,
    startTime,
    myMembership,
    maxParticipants,
    participantCount,
  },
}: Props) => {
  return (
    <section className='bg-white px-5 pt-6 pb-4'>
      <DescriptionProfile
        conditions={{ isHost: myMembership?.role === 'HOST', isPast: status === 'FINISHED' }}
        hostInfo={createdBy}
      />
      <DescriptionTitle title={title} />
      <DescriptionTags tags={tags} />
      <DescriptionDetail detail={description} />
      <DescriptionSetting setting={{ location, startTime }} />
      <DescriptionProgress createdAt={createdAt} progress={{ maxParticipants, participantCount }} />
    </section>
  );
};
