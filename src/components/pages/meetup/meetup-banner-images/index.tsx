'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

import Image from 'next/image';

import { DEFAULT_GROUP_IMAGE } from 'constants/default-images';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  images: GetGroupDetailsResponse['images'];
}

export const MeetupBannerImages = ({ images }: Props) => {
  const hasImages = Boolean(images.length);

  return (
    <section className='select-none'>
      {hasImages ? (
        <Swiper className='h-60' loop modules={[Pagination]} pagination>
          {images.map(({ imageId440x240, imageUrl440x240 }) => (
            <SwiperSlide key={imageId440x240} className='relative'>
              <Image alt='image' draggable={false} fill objectFit='cover' src={imageUrl440x240} />
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
