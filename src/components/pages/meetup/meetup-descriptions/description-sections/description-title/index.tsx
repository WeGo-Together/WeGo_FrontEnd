interface Props {
  title: string;
}

export const DescriptionTitle = ({ title }: Props) => {
  return (
    <div className='mt-6'>
      <h2 className='text-text-xl-bold line-clamp-2 text-gray-900'>{title}</h2>
    </div>
  );
};
