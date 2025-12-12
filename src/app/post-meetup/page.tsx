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
import { ImageRecord } from '@/components/ui';
import { useCreateGroup } from '@/hooks/use-group/use-group-create';
import { useUploadGroupImages } from '@/hooks/use-group/use-upload-group-images';
import { CreateGroupPayload } from '@/types/service/group';

const PostMeetupPage = () => {
  const { mutateAsync: createGroup } = useCreateGroup();
  const { mutateAsync: uploadImages } = useUploadGroupImages();

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
      images: {} as ImageRecord,
    },
    onSubmit: async ({ value }) => {
      const imageRecords = value.images as ImageRecord;
      const imageFiles = Object.values(imageRecords).filter(
        (file): file is File => file !== null && file instanceof File,
      );

      // 이미지가 있으면 먼저 업로드하여 URL 배열 수확
      let uploadedImages = null;
      if (imageFiles.length > 0) {
        const uploadResponse = await uploadImages({ images: imageFiles });
        uploadedImages = uploadResponse.images;
      }

      if (!value.startTime) {
        throw new Error('모임 시작 시간을 입력해주세요.');
      }

      const maxParticipantsNumber = Number(value.maxParticipants);
      if (isNaN(maxParticipantsNumber) || maxParticipantsNumber < 1) {
        throw new Error('모임 최대 인원은 1명 이상이어야 합니다.');
      }

      const createPayload: CreateGroupPayload = {
        title: value.title.trim(),
        location: value.location.trim(),
        locationDetail: value.locationDetail?.trim() || null,
        startTime: value.startTime,
        ...(value.endTime && { endTime: value.endTime }),
        tags: value.tags && value.tags.length > 0 ? value.tags : null,
        description: value.description.trim(),
        maxParticipants: maxParticipantsNumber,
        images: uploadedImages && uploadedImages.length > 0 ? uploadedImages : null,
      };

      await createGroup(createPayload);
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
