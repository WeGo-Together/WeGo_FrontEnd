'use client';

import { useRouter } from 'next/navigation';

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
import { CreateGroupFormValues, createGroupSchema } from '@/lib/schema/group';

const PostMeetupPage = () => {
  const { replace } = useRouter();
  const { mutateAsync: createGroup } = useCreateGroup();

  const form = useForm({
    defaultValues: {
      title: '',
      location: '',
      startTime: '',
      tags: [],
      description: '',
      maxParticipants: 0,
      images: [],
      joinPolicy: 'FREE',
    } as CreateGroupFormValues,
    validators: {
      onChange: createGroupSchema,
      onSubmit: createGroupSchema,
    },
    onSubmit: async ({ value }) => {
      value.images = value.images?.map((image, idx) => {
        return { ...image, sortOrder: idx };
      });

      const res = await createGroup(value);

      replace(`/meetup/${res.id}`);
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

        <form.Subscribe
          children={(state) => (
            <MeetupSubmitButton state={state} onSubmitClick={() => form.handleSubmit()} />
          )}
          selector={(state) => state}
        />
      </form>
    </div>
  );
};

export default PostMeetupPage;
