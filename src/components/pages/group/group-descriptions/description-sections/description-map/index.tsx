'use client';

import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import { EmptyState } from '@/components/layout/empty-state';
import { GetGroupDetailsResponse } from '@/types/service/group';

interface Props {
  location: GetGroupDetailsResponse['address']['location'];
}

export const DescriptionMap = ({ location }: Props) => {
  const [coords, setCoords] = useState({ lat: 33.450701, lng: 126.570667 });

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAOMAP_KEY as string,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  useEffect(() => {
    // 카카오지도 SDK 로딩 끝나면 실행
    if (loading) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(location, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setCoords({
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        });
      }
    });
  }, [loading]);

  return (
    <div className='relative mt-6 h-60 w-full overflow-hidden rounded-xl border border-gray-300 bg-gray-100'>
      {!error ? (
        <Map id='map' className='h-60 w-full' center={coords} level={3}>
          <MapMarker position={coords} />
        </Map>
      ) : (
        <EmptyState>지도를 불러올 수 없습니다.</EmptyState>
      )}
    </div>
  );
};
