import { ReactNode } from 'react';

import { ModalContent, ModalTitle } from '@/components/ui';

const SubTitle = ({ children }: { children: ReactNode }) => {
  return <div className='text-text-sm-bold text-gray-600'>{children}</div>;
};

const Contents = ({ children }: { children: ReactNode }) => {
  return <div className='text-text-sm-regular text-gray-600'>{children}</div>;
};

export const SignupAgreementModal = () => {
  return (
    <ModalContent className='w-9/10'>
      <div className='flex flex-col gap-4'>
        <ModalTitle>서비스 이용 약관</ModalTitle>

        <div className='max-h-94 space-y-4 overflow-y-auto rounded-lg bg-gray-50 p-5'>
          <div className='space-y-2'>
            <SubTitle>1. 개인정보 수집 및 이용</SubTitle>
            <Contents>WeGo는 서비스 제공을 위해 최소한의 개인정보를 수집합니다.</Contents>
          </div>

          <div className='space-y-2'>
            <SubTitle>수집하는 정보</SubTitle>
            <Contents>
              <ul className='list-disc pl-5'>
                <li>이메일 주소</li>
              </ul>
            </Contents>
          </div>

          <div className='space-y-2'>
            <SubTitle>이용 목적</SubTitle>
            <Contents>
              <ul className='list-disc pl-5'>
                <li>회원 가입 및 본인 확인</li>
                <li>서비스 이용에 따른 알림 발송</li>
                <li>모임 관련 정보 제공</li>
              </ul>
            </Contents>
          </div>

          <div className='space-y-2'>
            <SubTitle>개인정보 보호</SubTitle>
            <Contents>
              <p>수집된 이메일 주소는 서비스 제공 목적 외에 절대 사용하지 않습니다.</p>
              <ul className='mt-2 list-disc pl-5'>
                <li>제3자에게 제공하거나 판매하지 않습니다</li>
                <li>마케팅 목적으로 사용하지 않습니다</li>
              </ul>
            </Contents>
          </div>

          <div className='space-y-2'>
            <SubTitle>2. 서비스 이용</SubTitle>
            <Contents>
              <ul className='list-disc pl-5'>
                <li>본 서비스는 모임 관리를 위한 플랫폼입니다</li>
                <li>타인에게 피해를 주는 행위는 금지됩니다</li>
                <li>서비스의 정상적인 운영을 방해하는 행위는 제재 대상입니다</li>
              </ul>
            </Contents>
          </div>

          <div className='space-y-2'>
            <SubTitle>3. 회원 탈퇴</SubTitle>
            <Contents>
              <ul className='list-disc pl-5'>
                <li>언제든지 회원 탈퇴가 가능합니다</li>
                <li>탈퇴 시 개인정보는 즉시 삭제됩니다</li>
                <li>관련 법령에 따라 보관이 필요한 경우에만 일정 기간 보관 후 삭제됩니다</li>
              </ul>
            </Contents>
          </div>
        </div>
      </div>
    </ModalContent>
  );
};
