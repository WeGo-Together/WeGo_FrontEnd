import { useLayoutEffect, useRef, useState } from 'react';

export const useLongText = (text: string, maxLines = 20) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isLongText, setIsLongText] = useState(false);

  // 20줄이 넘어가면 longText로 판단.
  useLayoutEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;

    // 클론 생성
    const clone = el.cloneNode(true) as HTMLSpanElement;

    // 오프스크린 스타일 적용
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.pointerEvents = 'none';
    clone.style.display = 'block';
    clone.style.webkitLineClamp = 'unset';
    clone.style.overflow = 'visible';

    clone.style.width = `${el.offsetWidth}px`;

    // DOM에 추가
    document.body.appendChild(clone);

    // 측정
    const lineHeight = parseFloat(getComputedStyle(clone).lineHeight);
    const fullHeight = clone.scrollHeight;

    setIsLongText(fullHeight > lineHeight * maxLines);

    // 정리
    document.body.removeChild(clone);
  }, [text, maxLines]);

  return { textRef, isLongText };
};
