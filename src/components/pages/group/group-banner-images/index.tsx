'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import './index.css';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { GroupImage } from '@/components/shared';
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
              <GroupImage size='xl' src={variants[0].imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <GroupImage size='xl' src={null} />
      )}
    </section>
  );
};
