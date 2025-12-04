interface Props {
  content: string;
}

export const DescriptionContent = ({ content }: Props) => {
  return (
    <div className='mt-6'>
      <p className='text-text-md-regular break-keep text-gray-800'>{content}</p>
    </div>
  );
};
