'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

import Image from 'next/image';

import { DEFAULT_GROUP_IMAGE } from 'constants/default-images';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ImageWithFallback } from '@/components/ui';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  images: GetGroupDetailsResponse['images'];
}

export const GroupBannerImages = ({ images }: Props) => {
  const hasImages = Boolean(images.length);

  return (
    <section className='select-none'>
      {hasImages ? (
        <Swiper loop={images.length > 1} modules={[Pagination]} pagination>
          {images.map(({ groupImageId, variants }) => (
            <SwiperSlide key={groupImageId} className='relative'>
              <ImageWithFallback
                width={440}
                className='h-60 w-110 object-cover'
                alt='모임 썸네일 이미지'
                fallbackSrc={DEFAULT_GROUP_IMAGE}
                height={240}
                src={variants[0].imageUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='relative h-60'>
          <Image alt='image' draggable={false} fill objectFit='cover' src={DEFAULT_GROUP_IMAGE} />
        </div>
      )}
    </section>
  );
};
