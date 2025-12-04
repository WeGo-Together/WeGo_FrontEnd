'use client';
import { useForm } from '@tanstack/react-form';
import z from 'zod';

import MeetupImageInput from '@/components/pages/mypage/meetup-create-image-input';
import { ImageRecord } from '@/components/ui/imageinput';

const schema = z.object({
  images: z
    .record(z.string(), z.instanceof(File).nullable())
    .refine((record) => Object.keys(record).length >= 1, {
      message: '최소 1개의 이미지가 필요합니다.',
    }),
});

const MyPage = () => {
  const form = useForm({
    defaultValues: {
      images: {} as ImageRecord,
    },
    validators: {
      onChange: schema,
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      // console.log(value);
      for (const [url, file] of Object.entries(value.images)) {
        console.log(`url: ${url}`);
        console.log(`url: ${file}`);
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* images 필드 */}
        <form.Field name='images'>
          {(field) => {
            const hint = field.state.meta.errors[0]?.message || '최대 3개까지 업로드할 수 있어요.';

            return (
              <>
                <MeetupImageInput value={field.state.value} onChange={field.handleChange} />
                <span>{hint}</span>
              </>
            );
          }}
        </form.Field>
        {/*  */}
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button disabled={!canSubmit} type='submit'>
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default MyPage;
