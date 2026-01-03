'use client';
import { useRef, useState } from 'react';

import { Icon } from '@/components/icon';

interface IProps {
  onSubmit: (text: string) => void;
}

export const ChatInput = ({ onSubmit }: IProps) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Enter 키로 전송, Shift + Enter 로 줄바꿈
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isMobile) return;
    if (e.key !== 'Enter' || e.shiftKey) return;
    if (e.nativeEvent.isComposing) return;

    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    const changedMessage = message.trim();

    if (!changedMessage) {
      inputRef.current?.focus();
      setMessage('');
      return;
    }

    onSubmit(changedMessage);
    setMessage('');
    inputRef.current?.focus();
  };

  return (
    <div className='flex w-full justify-center px-5'>
      <div className='relative w-full max-w-110'>
        <textarea
          ref={inputRef}
          className='bg-mono-white text-text-md-medium w-full resize-none rounded-2xl border border-gray-300 px-4 py-4 pr-14 break-words text-gray-800 placeholder:text-gray-500 focus:outline-none [&::-webkit-scrollbar]:hidden'
          maxLength={1000}
          placeholder='메세지를 입력해주세요.'
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className='absolute top-4 right-5 h-6 w-6' aria-label='메세지 전송' type='button'>
          <Icon id='send' className='cursor-pointer text-gray-500' onClick={handleSubmit} />
        </button>
      </div>
    </div>
  );
};
