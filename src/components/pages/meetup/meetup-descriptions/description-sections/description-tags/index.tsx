interface Props {
  tags: string[];
}

export const DescriptionTags = ({ tags }: Props) => {
  return (
    <div className='mt-2 flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <div key={tag} className='bg-mint-100 rounded-full px-[10px] py-1'>
          <p className='text-mint-700 text-text-xs-medium'>#{tag}</p>
        </div>
      ))}
    </div>
  );
};
