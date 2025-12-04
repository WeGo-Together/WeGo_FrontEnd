import Image from 'next/image';

import { ImageInput, ImageInputProps } from '@/components/ui/imageinput';

type ImageUploadPropsWithoutChildren = Omit<ImageInputProps, 'children'>;

const ProfileImageInput = ({ value, onChange, initialImages }: ImageUploadPropsWithoutChildren) => {
  return (
    <ImageInput
      initialImages={initialImages}
      maxFiles={1}
      mode='replace'
      multiple={false}
      value={value}
      onChange={onChange}
    >
      {(images, _onRemoveImageClick, onFileSelectClick) => (
        <div className='flex justify-center'>
          {Object.entries(images).map(([url, _file]) => (
            <div key={url} className='relative size-16 md:size-25'>
              <Image
                className='border-border-primary rounded-5x h-full w-full border-[2.22px] object-cover md:rounded-4xl'
                alt='팀 이미지'
                fill
                src={url}
              />
              <button
                className='absolute -right-3 -bottom-3 cursor-pointer'
                aria-label='팀 이미지 수정 버튼'
                type='button'
                onClick={onFileSelectClick}
              >
                수정
              </button>
            </div>
          ))}
        </div>
      )}
    </ImageInput>
  );
};

export default ProfileImageInput;
