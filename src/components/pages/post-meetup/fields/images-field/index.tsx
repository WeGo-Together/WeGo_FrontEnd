'use client';

import Image from 'next/image';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { ImageInput, ImageInputProps } from '@/components/ui';
import { cn } from '@/lib/utils';

type ImageUploadPropsWithoutChildren = Omit<ImageInputProps, 'children'>;

interface Props extends ImageUploadPropsWithoutChildren {
  field: AnyFieldApi;
}

export const MeetupImagesField = ({ field, initialImages }: Props) => {
  return (
    <ImageInput
      initialImages={initialImages}
      maxFiles={3}
      mode='append'
      multiple={true}
      value={field.state.value}
      onChange={field.handleChange}
    >
      {(images, onRemoveImageClick, onFileSelectClick) => (
        <div className='mt-6 flex flex-row gap-2'>
          <button
            className={cn(
              'flex-center bg-mono-white group aspect-square w-full max-w-20 cursor-pointer rounded-2xl border-1 border-gray-300', // 기본 스타일
              'hover:bg-gray-50', // hover 스타일
              'transition-all duration-300', // animation 스타일
            )}
            aria-label='이미지 선택 버튼'
            type='button'
            onClick={onFileSelectClick}
          >
            <Icon
              id='plus'
              className={cn(
                'size-6 text-gray-600', // 기본 스타일
                'group-hover:scale-120', // hover 스타일
                'transition-all duration-300', // animation 스타일
              )}
            />
          </button>
          {Object.entries(images).map(([url, _file]) => (
            <div key={url} className='relative aspect-square w-full max-w-20'>
              <Image
                className='border-mono-black/5 h-full w-full rounded-2xl border-1 object-cover'
                alt='팀 이미지'
                fill
                src={url}
              />
              <button
                className={cn(
                  'flex-center bg-mono-white/80 group absolute top-1.5 right-2 size-4 cursor-pointer rounded-full', // 기본 스타일
                  'hover:bg-mono-white hover:scale-110', // hover 스타일
                  'transition-all duration-300', // animation 스타일
                )}
                aria-label='이미지 삭제 버튼'
                onClick={() => onRemoveImageClick(url)}
              >
                <Icon id='small-x-1' className='size-1.5 text-gray-700' />
              </button>
            </div>
          ))}
        </div>
      )}
    </ImageInput>
  );
};
