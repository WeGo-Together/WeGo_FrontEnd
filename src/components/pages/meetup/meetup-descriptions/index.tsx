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
    | 'createdBy'
    | 'createdAt'
    | 'title'
    | 'tags'
    | 'description'
    | 'location'
    | 'startTime'
    | 'maxParticipants'
    | 'participantCount'
  >;
}

export const MeetupDescriptions = ({
  descriptions: {
    createdBy,
    createdAt,
    title,
    tags,
    description,
    location,
    startTime,
    maxParticipants,
    participantCount,
  },
}: Props) => {
  return (
    <section className='bg-white px-5 pt-6 pb-4'>
      <DescriptionProfile hostInfo={createdBy} />
      <DescriptionTitle title={title} />
      <DescriptionTags tags={tags} />
      <DescriptionDetail detail={description} />
      <DescriptionSetting setting={{ location, startTime }} />
      <DescriptionProgress createdAt={createdAt} progress={{ maxParticipants, participantCount }} />
    </section>
  );
};
