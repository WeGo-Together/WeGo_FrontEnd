import Image from 'next/image';

import { AnyFieldApi } from '@tanstack/react-form';

import { Icon } from '@/components/icon';
import { ImageInput, ImageInputProps } from '@/components/ui';
import { cn } from '@/lib/utils';

type ImageUploadPropsWithoutChildren = Omit<ImageInputProps, 'children'>;

interface Props extends ImageUploadPropsWithoutChildren {
  field: AnyFieldApi;
}
const ImageField = ({ field, initialImages }: Props) => {
  return (
    <div className='flex-center py-6'>
      <ImageInput
        accept='image/*'
        initialImages={initialImages}
        maxFiles={1}
        mode='replace'
        multiple={false}
        value={field.state.value}
        onChange={field.handleChange}
      >
        {(images, _onRemoveImageClick, onFileSelectClick) => (
          <>
            {Object.entries(images).map(([url, _file]) => (
              <div key={url} className='relative aspect-square size-24'>
                <Image
                  className='rounded-full border-1 border-[rgba(0,0,0,0.04)]'
                  alt='프로필 이미지'
                  fill
                  src={url}
                />
                <button
                  className={cn(
                    'flex-center absolute -right-1.75 bottom-0 size-8 cursor-pointer rounded-full border-1 border-gray-300 bg-gray-100',
                    'hover:scale-110 hover:bg-gray-200',
                    'transition-all duration-300',
                  )}
                  type='button'
                  onClick={onFileSelectClick}
                >
                  <Icon id='edit' className='size-5 text-gray-600' />
                </button>
              </div>
            ))}
          </>
        )}
      </ImageInput>
    </div>
  );
};

export default ImageField;
