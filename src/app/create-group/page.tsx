'use client';

import { useRouter } from 'next/navigation';

import { useForm } from '@tanstack/react-form';

import {
  GroupCapField,
  GroupDateField,
  GroupDetailField,
  GroupImagesField,
  GroupLocationField,
  GroupSubmitButton,
  GroupTagsField,
  GroupTitleField,
} from '@/components/pages/create-group';
import { useCreateGroup } from '@/hooks/use-group/use-group-create';
import { CreateGroupFormValues, createGroupSchema } from '@/lib/schema/group';

const CreateGroupPage = () => {
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

      replace(`/group/${res.id}`);
    },
  });

  return (
    <div>
      <form>
        <section className='px-4'>
          <form.Field children={(field) => <GroupTitleField field={field} />} name='title' />
          <form.Field children={(field) => <GroupLocationField field={field} />} name='location' />
          <form.Field children={(field) => <GroupDateField field={field} />} name='startTime' />
          <form.Field
            children={(field) => <GroupCapField field={field} />}
            name='maxParticipants'
          />
          <form.Field children={(field) => <GroupImagesField field={field} />} name='images' />
          <form.Field children={(field) => <GroupDetailField field={field} />} name='description' />
          <form.Field children={(field) => <GroupTagsField field={field} />} name='tags' />
        </section>

        <form.Subscribe
          children={(state) => (
            <GroupSubmitButton
              state={state}
              submitName='모임 생성'
              onSubmitClick={() => form.handleSubmit()}
            />
          )}
          selector={(state) => state}
        />
      </form>
    </div>
  );
};

export default CreateGroupPage;
