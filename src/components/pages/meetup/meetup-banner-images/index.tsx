'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

import Image from 'next/image';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  images: string[];
}

export const MeetupBannerImages = ({ images }: Props) => {
  return (
    <section>
      <Swiper className='h-60' loop modules={[Pagination]} pagination>
        {images.map((src) => (
          <SwiperSlide key={src} className='relative'>
            <Image alt='image' fill objectFit='cover' src={src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
