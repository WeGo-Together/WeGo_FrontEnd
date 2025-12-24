'use client';

/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export type CardTag = {
  id: string | number;
  label: string;
};

type CardTagsProps = {
  tags: CardTag[];
};

const TAG_GAP = 4;

const BASE_TAG_CLASSES =
  'bg-mint-100 text-text-2xs-medium text-mint-700 inline-flex shrink-0 items-center rounded-full px-2 py-0.5';

const HIDDEN_TAG_CLASSES = `${BASE_TAG_CLASSES} invisible absolute`;

const getLastVisibleIndex = (maxWidth: number, tagWidths: number[], gap: number): number | null => {
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
  const containerRef = useRef<HTMLDivElement>(null);

  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [lastVisibleIndex, setLastVisibleIndex] = useState<number | null>(null);

  const updateVisibleTags = useCallback(() => {
    const container = containerRef.current;

    if (!container || tags.length === 0) {
      setLastVisibleIndex(null);
      return;
    }

    const maxWidth = container.offsetWidth;
    const tagWidths: number[] = [];

    for (let index = 0; index < tags.length; index++) {
      const tagElement = tagRefs.current[index];
      if (!tagElement) {
        tagWidths.push(0);
        continue;
      }

      tagWidths.push(tagElement.offsetWidth);
    }

    const nextLastVisibleIndex = getLastVisibleIndex(maxWidth, tagWidths, TAG_GAP);
    setLastVisibleIndex(nextLastVisibleIndex);
  }, [tags]);

  useLayoutEffect(() => {
    updateVisibleTags();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      updateVisibleTags();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateVisibleTags]);

  return (
    <div ref={containerRef} className='mt-1 flex min-h-5 gap-1'>
      {tags?.map((tag, index) => {
        const isVisible = lastVisibleIndex !== null && index <= lastVisibleIndex;

        return (
          <span
            key={tag.id}
            ref={(element) => {
              tagRefs.current[index] = element;
            }}
            className={isVisible ? BASE_TAG_CLASSES : HIDDEN_TAG_CLASSES}
          >
            {tag.label}
          </span>
        );
      })}
    </div>
  );
};
