'use client';

import {
  MeetupAddressField,
  MeetupCapField,
  MeetupDateField,
  MeetupDetailField,
  MeetupSubmitButton,
  MeetupTagsField,
  MeetupTitleField,
} from '@/components/pages/post-meetup';

const PostMeetupPage = () => {
  return (
    <div>
      <section className='px-4'>
        <MeetupTitleField />
        <MeetupAddressField />
        <MeetupDateField />
        <MeetupCapField />
        <MeetupDetailField />
        <MeetupTagsField />
      </section>
      <MeetupSubmitButton />
    </div>
  );
};

export default PostMeetupPage;
