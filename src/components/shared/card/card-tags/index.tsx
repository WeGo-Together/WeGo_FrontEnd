export type CardTag = {
  id: string | number;
  label: string;
};

type CardTagsProps = {
  tags: CardTag[];
};
export const getLastVisibleIndex = (
  maxWidth: number,
  tagWidths: number[],
  gap: number,
): number | null => {
  let usedWidth = 0;
  let lastVisibleIndex: number | null = null;

  for (let index = 0; index < tagWidths.length; index++) {
    const tagWidth = tagWidths[index];
    const extraGap = index === 0 ? 0 : gap;
    const requiredWidth = tagWidth + extraGap;

    if (usedWidth + requiredWidth <= maxWidth) {
      usedWidth += requiredWidth;
      lastVisibleIndex = index;
    } else {
      break;
    }
  }

  return lastVisibleIndex;
};

export const CardTags = ({ tags }: CardTagsProps) => {
  return (
    <div className='mt-1 flex max-h-4.5 flex-wrap gap-1 gap-y-0 overflow-hidden'>
      {tags?.map((tag) => (
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
