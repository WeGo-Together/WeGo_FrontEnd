'use client';

import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';

import { AnyFieldApi } from '@tanstack/react-form';

import { ModalContent, ModalTitle, useModal } from '@/components/ui';

interface Props {
  LocationField: AnyFieldApi;
}

export const LocationSearchModal = ({ LocationField }: Props) => {
  const { close } = useModal();

  const handleComplete = (data: Address) => {
    // 선택 주소의 '지번'이 1개라면 (jibun), N개라면 임의로 첫번째 매핑 주소 반환 (autoJibun)
    const fullAddress = data.jibunAddress || data.autoJibunAddress;
    LocationField.handleChange(fullAddress);
    close();
  };

  return (
    <ModalContent className='max-w-[330px]'>
      <ModalTitle>모달임</ModalTitle>
      <section className='mt-2'>
        <DaumPostcodeEmbed
          minWidth={200}
          style={{ height: '470px' }}
          autoClose={false}
          onComplete={handleComplete}
        />
      </section>
    </ModalContent>
  );
};
