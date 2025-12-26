import { useLayoutEffect, useRef, useState } from 'react';

export const useLongText = (text: string, maxLines = 20) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isLongText, setIsLongText] = useState(false);

  // 20줄이 넘어가면 longText로 판단.
  useLayoutEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;

    const originalDisplay = el.style.display;
    const originalClamp = el.style.webkitLineClamp;
    const originalOverflow = el.style.overflow;

    el.style.display = 'block';
    el.style.webkitLineClamp = 'unset';
    el.style.overflow = 'visible';

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const fullHeight = el.scrollHeight;

    setIsLongText(fullHeight > lineHeight * maxLines);

    el.style.display = originalDisplay;
    el.style.webkitLineClamp = originalClamp;
    el.style.overflow = originalOverflow;
  }, [text, maxLines]);

  return { textRef, isLongText };
};
