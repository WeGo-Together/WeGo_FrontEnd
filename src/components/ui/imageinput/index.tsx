import React, { useEffect, useRef, useState } from 'react';

export type ImageRecord = Record<string, File | null>;

export interface ImageInputProps {
  value?: ImageRecord;
  children: (
    images: ImageRecord,
    onRemoveImageClick: (url: string) => void,
    onFileSelectClick: () => void,
  ) => React.ReactNode;
  onChange?: (images: ImageRecord) => void;
  maxFiles?: number;
  accept?: string;
  multiple?: boolean;
  mode?: 'replace' | 'append';
  initialImages?: string[];
}

export const ImageInput = ({
  value,
  children,
  onChange,
  maxFiles = 1,
  accept = 'image/*',
  multiple = false,
  mode = 'replace',
  initialImages = [],
}: ImageInputProps) => {
  const [internalImages, setInternalImages] = useState<ImageRecord>(() => {
    // initialImages 처리
    return initialImages.reduce((acc, url) => {
      acc[url] = null;
      return acc;
    }, {} as ImageRecord);
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined && onChange !== undefined;
  const images = isControlled ? value : internalImages;

  useEffect(() => {
    return () => {
      Object.keys(images).forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

  const addImages = (files: File[]) => {
    const newImages: ImageRecord = {};

    // 선택된 파일들에 대해 blob URL 생성
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      newImages[url] = file;
    });

    // append 모드면 이미지 계속 쌓임
    // replace 모드면 이미지 교체
    const nextImages = mode === 'append' ? { ...images, ...newImages } : newImages;

    // 전체 이미지
    const entries = Object.entries(nextImages);

    // 최대 선택가능한 이미지 갯수만 적용
    const limitedEntries = entries.slice(0, maxFiles);

    // 최대 갯수 초과한 이미지들에 대해 revoke URL 적용
    const removedEntries = entries.slice(maxFiles);

    removedEntries.forEach(([url]) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    // 최대 선택가능한 이미지 갯수에 대해서만 상태 업데이트
    const limitedImages = limitedEntries.slice(0, maxFiles).reduce((acc, [url, file]) => {
      acc[url] = file;
      return acc;
    }, {} as ImageRecord);

    updateImages(limitedImages);
  };

  const onFileSelectClick = () => {
    inputRef.current?.click();
  };

  const onRemoveImageClick = (url: string) => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }

    const newImages = { ...images };
    delete newImages[url];

    updateImages(newImages);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addImages(files);
    e.target.value = '';
  };

  const updateImages = (newImages: ImageRecord) => {
    if (!isControlled) {
      setInternalImages(newImages);
    }
    onChange?.(newImages);
  };

  return (
    <>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        accept={accept}
        multiple={multiple}
        type='file'
        onChange={handleFileChange}
      />

      {/* eslint-disable-next-line react-hooks/refs */}
      {children(images, onRemoveImageClick, onFileSelectClick)}
    </>
  );
};
