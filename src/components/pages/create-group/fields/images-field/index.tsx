'use client';

import { useRef, useState } from 'react';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { ImageLoadingBar } from '@/components/pages/create-group/fields/images-field/image-loading-bar';
import { GroupImage } from '@/components/shared';
import { Hint } from '@/components/ui';
import { useUploadGroupImages } from '@/hooks/use-group/use-group-upload-images';
import { cn } from '@/lib/utils';
import { validateImage } from '@/lib/validateImage';
import { PreUploadGroupImageResponse } from '@/types/service/group';

interface Props {
  field: AnyFieldApi;
}

export const GroupImagesField = ({ field }: Props) => {
  const [preUploadError, setPreUploadError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync, isPending } = useUploadGroupImages();

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;

    const fileArray = Array.from(e.target.files);

    for (const file of fileArray) {
      const { valid, error } = await validateImage(file);
      if (!valid && error) {
        setPreUploadError(error);
        e.target.value = '';
        return;
      }
    }

    const response = await mutateAsync({
      images: fileArray,
    });

    field.handleChange([...field.state.value, ...response.images]);
    setPreUploadError('');
  };

  const onUploadImageButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const onRemoveImageClick = (removeIdx: number) => {
    const removedArray = field.state.value.filter(({}, idx: number) => idx !== removeIdx);
    field.handleChange(removedArray);
  };

  return (
    <div className='space-y-1'>
      <ul className='mt-6 flex gap-2'>
        <li className='relative aspect-square w-full max-w-20'>
          <button
            className={cn(
              'flex-center bg-mono-white group size-full cursor-pointer rounded-2xl border-1 border-gray-300', // 기본 스타일
              'hover:bg-gray-50',
              'transition-all duration-300',
            )}
            aria-label='이미지 선택 버튼'
            disabled={isPending}
            type='button'
            onClick={onUploadImageButtonClick}
          >
            {isPending ? (
              <ImageLoadingBar />
            ) : (
              <Icon
                id='plus'
                className={cn(
                  'size-6 text-gray-600',
                  'group-hover:scale-120',
                  'transition-all duration-300',
                )}
              />
            )}
            <input
              ref={inputRef}
              className='hidden'
              accept='image/*'
              multiple
              type='file'
              onChange={(e) => onUploadImage(e)}
            />
          </button>
        </li>

        {field.state.value.map(
          ({ imageUrl100x100 }: PreUploadGroupImageResponse['images'][0], idx: number) => (
            <li key={imageUrl100x100} className='relative aspect-square w-full max-w-20'>
              <GroupImage
                className='border-mono-black/5 size-full border-1'
                size='md'
                src={imageUrl100x100}
              />

              <button
                className={cn(
                  'flex-center bg-mono-white/80 absolute top-1.5 right-2 size-4 cursor-pointer rounded-full',
                  'hover:bg-mono-white hover:scale-110',
                  'transition-all duration-300',
                )}
                aria-label='이미지 삭제 버튼'
                type='button'
                onClick={() => onRemoveImageClick(idx)}
              >
                <Icon id='small-x-1' className='size-1.5 text-gray-700' />
              </button>
            </li>
          ),
        )}
      </ul>

      {preUploadError && <Hint message={preUploadError} />}
      <p className='text-text-sm-medium px-2 text-gray-500 select-none'>
        최대 3개까지 업로드할 수 있어요.
      </p>
    </div>
  );
};
