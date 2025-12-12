'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

import Image from 'next/image';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  images: GetGroupDetailsResponse['images'];
}

export const MeetupBannerImages = ({ images }: Props) => {
  const hasImages = images.length;

  const defaultImageUrl =
    'https://images.unsplash.com/photo-1705599359461-f99dc9e80efa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
          <Image alt='image' draggable={false} fill objectFit='cover' src={defaultImageUrl} />
        </div>
      )}
    </section>
  );
};
