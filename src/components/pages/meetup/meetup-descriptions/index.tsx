import type { DUMMY_MEETUP_DATA } from '@/app/meetup/[id]/page';
import {
  DescriptionContent,
  DescriptionProfile,
  DescriptionProgress,
  DescriptionSetting,
  DescriptionTags,
  DescriptionTitle,
} from '@/components/pages/meetup/meetup-descriptions/description-sections';

interface Props {
  description: typeof DUMMY_MEETUP_DATA.description;
}

export const MeetupDescriptions = ({
  description: { ownerInfo, title, tags, content, setting, progress, createdAt },
}: Props) => {
  return (
    <section className='bg-white px-5 pt-6 pb-4'>
      <DescriptionProfile {...ownerInfo} />
      <DescriptionTitle title={title} />
      <DescriptionTags tags={tags} />
      <DescriptionContent content={content} />
      <DescriptionSetting {...setting} />
      <DescriptionProgress createdAt={createdAt} progress={progress} />
    </section>
  );
};
