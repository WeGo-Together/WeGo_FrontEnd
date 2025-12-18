'use client';

import Image from 'next/image';

import { useRef } from 'react';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { useUploadGroupImages } from '@/hooks/use-group/use-group-upload-images';
import { cn } from '@/lib/utils';
import { ALLOWED_IMAGE_TYPES } from '@/types/service/common';
import { PreUploadGroupImageResponse } from '@/types/service/group';

interface Props {
  field: AnyFieldApi;
}

export const MeetupImagesField = ({ field }: Props) => {
  const { mutateAsync } = useUploadGroupImages();

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxAllowed = 3 - field.state.value.length;
    const files = e.target.files;

    if (!files || files.length === 0) return;
    if (files.length > maxAllowed) return;

    const fileArray = Array.from(files);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidFile = fileArray.find((file) => !ALLOWED_IMAGE_TYPES.includes(file.type as any));

    if (invalidFile) {
      alert('jpg, png, webp 파일만 업로드 가능합니다.');
      e.target.value = '';
      return;
    }

    const response = await mutateAsync({
      images: fileArray,
    });

    field.handleChange([...field.state.value, ...response.images]);
  };

  const onUploadImageButtonClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const onRemoveImageClick = (removeIdx: number) => {
    const removedArray = field.state.value.filter(({}, idx: number) => idx !== removeIdx);
    field.handleChange(removedArray);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='space-y-1'>
      <div className='mt-6 flex flex-row gap-2'>
        <button
          className={cn(
            'flex-center bg-mono-white group aspect-square w-full max-w-20 cursor-pointer rounded-2xl border-1 border-gray-300', // 기본 스타일
            'hover:bg-gray-50', // hover 스타일
            'transition-all duration-300', // animation 스타일
          )}
          aria-label='이미지 선택 버튼'
          type='button'
          onClick={onUploadImageButtonClick}
        >
          <Icon
            id='plus'
            className={cn(
              'size-6 text-gray-600', // 기본 스타일
              'group-hover:scale-120', // hover 스타일
              'transition-all duration-300', // animation 스타일
            )}
          />
          <input
            ref={inputRef}
            className='hidden'
            accept='image/*'
            multiple
            type='file'
            onChange={(e) => onUploadImage(e)}
          />
        </button>
        {field.state.value.map(
          ({ imageUrl100x100 }: PreUploadGroupImageResponse['images'][0], idx: number) => (
            <div key={imageUrl100x100} className='relative aspect-square w-full max-w-20'>
              <Image
                className='border-mono-black/5 h-full w-full rounded-2xl border-1 object-cover'
                alt='썸네일 이미지'
                fill
                src={imageUrl100x100}
              />

              <button
                className={cn(
                  'flex-center bg-mono-white/80 group absolute top-1.5 right-2 size-4 cursor-pointer rounded-full', // 기본 스타일
                  'hover:bg-mono-white hover:scale-110', // hover 스타일
                  'transition-all duration-300', // animation 스타일
                )}
                aria-label='이미지 삭제 버튼'
                type='button'
                onClick={() => onRemoveImageClick(idx)}
              >
                <Icon id='small-x-1' className='size-1.5 text-gray-700' />
              </button>
            </div>
          ),
        )}
      </div>
      <p className='text-text-sm-medium px-2 text-gray-500'>최대 3개까지 업로드할 수 있어요.</p>
    </div>
  );
};
