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
    const fullAddress = `${data.sido} ${data.sigungu} ${data.bname}`;
    LocationField.handleChange(fullAddress);
    close();
  };

  return (
    <ModalContent className='max-w-[330px]'>
      <ModalTitle>모임 장소</ModalTitle>
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
