'use client';

import { useRouter } from 'next/navigation';

import { use } from 'react';

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
import { useEditGroup } from '@/hooks/use-group/use-group-edit';
import { useGetGroupDetails } from '@/hooks/use-group/use-group-get-details';
import { CreateGroupFormValues, createGroupSchema } from '@/lib/schema/group';
import { GetGroupDetailsResponse, PreUploadGroupImageResponse } from '@/types/service/group';

interface Props {
  params: Promise<{ groupId: string }>;
}

const EditMeetupPage = ({ params }: Props) => {
  const { groupId } = use(params);
  const { replace } = useRouter();
  const { data } = useGetGroupDetails({ groupId });
  const { mutateAsync: EditGroup } = useEditGroup({ groupId });

  const {
    title,
    address: { location },
    startTime,
    tags,
    description,
    maxParticipants,
    images,
  } = data as GetGroupDetailsResponse;

  const { defaultImages } = convertToDefaultImages(images);

  const form = useForm({
    defaultValues: {
      title,
      location,
      startTime,
      tags,
      description,
      maxParticipants,
      images: defaultImages,
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

      const res = await EditGroup(value);

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

export default EditMeetupPage;

const convertToDefaultImages = (images: GetGroupDetailsResponse['images']) => {
  const defaultImages: PreUploadGroupImageResponse['images'] = [];

  images.forEach(({ imageKey, sortOrder, variants }) => {
    defaultImages.push({
      imageKey,
      sortOrder,
      imageUrl100x100: variants[0].imageUrl,
      imageUrl440x240: variants[1].imageUrl,
    });
  });

  return { defaultImages };
};
