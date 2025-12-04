export type CardTag = {
  id: string | number;
  label: string;
};

type CardTagsProps = {
  tags: CardTag[];
};

export const CardTags = ({ tags }: CardTagsProps) => {
  if (!tags?.length) return null;

  return (
    <div className='mt-1 flex gap-1 overflow-hidden'>
      {tags.map((tag) => (
        <span
          key={tag.id}
          className='bg-mint-100 text-text-2xs-medium text-mint-700 inline-flex shrink-0 items-center rounded-full px-2 py-0.5'
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
};
