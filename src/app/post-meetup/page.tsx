'use client';

import { useForm } from '@tanstack/react-form';

import {
  MeetupAddressField,
  MeetupCapField,
  MeetupDateField,
  MeetupDetailField,
  MeetupImagesField,
  MeetupSubmitButton,
  MeetupTagsField,
  MeetupTitleField,
} from '@/components/pages/post-meetup';

const PostMeetupPage = () => {
  const form = useForm({
    defaultValues: {
      title: '',
      address: '',
      dateAndTime: {
        date: '',
        time: '',
      },
      cap: 0,
      images: {},
      detail: '',
      tags: [] as string[],
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <section className='px-4'>
          <form.Field children={(field) => <MeetupTitleField field={field} />} name='title' />
          <form.Field children={(field) => <MeetupAddressField field={field} />} name='address' />
          <form.Field children={(field) => <MeetupDateField field={field} />} name='dateAndTime' />
          <form.Field children={(field) => <MeetupCapField field={field} />} name='cap' />
          <form.Field children={(field) => <MeetupImagesField field={field} />} name='images' />
          <form.Field children={(field) => <MeetupDetailField field={field} />} name='detail' />
          <form.Field children={(field) => <MeetupTagsField field={field} />} name='tags' />
        </section>

        <MeetupSubmitButton />
      </form>
    </div>
  );
};

export default PostMeetupPage;
