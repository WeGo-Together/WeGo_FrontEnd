import Image from 'next/image';

interface IProps {
  item: {
    id: number;
    nickName: string;
    profileImage: string;
    text: string;
    time: string;
  };
}

export const OtherChat = ({ item }: IProps) => {
  const { nickName, profileImage, text, time } = item;
  return (
    <div className='mb-5 flex'>
      <Image
        width={40}
        className='mr-3 size-10 rounded-full object-cover'
        alt='프로필 이미지'
        height={40}
        src={profileImage}
      />
      <div className='mr-1.5 flex flex-col'>
        <span className='text-text-xs-medium text-gray-800'>{nickName}</span>
        <span className='bg-mono-white mt-1 max-w-60 rounded-tl-sm rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-4 py-3 whitespace-pre-line text-gray-800'>
          {text}
        </span>
      </div>
      <div className='text-text-2xs-regular flex items-end py-1 text-gray-500'>{time}</div>
    </div>
  );
};
