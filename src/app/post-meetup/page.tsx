'use client';

import { useForm } from '@tanstack/react-form';

import {
  MeetupCapField,
  MeetupDateField,
  MeetupDetailField,
  MeetupImagesField,
  MeetupLocationField,
  MeetupSubmitButton,
  MeetupTagsField,
  MeetupTitleField,
} from '@/components/pages/post-meetup';
import { useCreateGroup } from '@/hooks/use-group/use-group-create';
import { CreateGroupPayload } from '@/types/service/group';

const PostMeetupPage = () => {
  const { mutate } = useCreateGroup();

  const form = useForm({
    defaultValues: {
      title: '',
      location: '',
      locationDetail: '',
      startTime: '',
      endTime: '',
      tags: [] as string[],
      description: '',
      maxParticipants: 0,
      images: [],
    } as CreateGroupPayload,
    onSubmit: ({ value }) => {
      console.log(value);
      const res = mutate(value);
      console.log(res);
    },
  });

  return (
    <div>
      <form>
        <section className='px-4'>
          <form.Field children={(field) => <MeetupTitleField field={field} />} name='title' />
          <form.Field children={(field) => <MeetupLocationField field={field} />} name='location' />
          <form.Field children={(field) => <MeetupDateField field={field} />} name='startTime' />
          <form.Field
            children={(field) => <MeetupCapField field={field} />}
            name='maxParticipants'
          />
          <form.Field children={(field) => <MeetupImagesField field={field} />} name='images' />
          <form.Field
            children={(field) => <MeetupDetailField field={field} />}
            name='description'
          />
          <form.Field children={(field) => <MeetupTagsField field={field} />} name='tags' />
        </section>

        <MeetupSubmitButton onSubmitClick={() => form.handleSubmit()} />
      </form>
    </div>
  );
};

export default PostMeetupPage;
