import { useLayoutEffect, useRef } from 'react';

export default function AutoFitText({
  as: Element = 'div',
  children,
  className,
  contentKey,
  maxFontSize,
  minFontSize = 10,
  maxLineHeight,
  minLineHeight,
}) {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      let fontSize = maxFontSize;
      element.style.fontSize = `${fontSize}px`;
      element.style.lineHeight = String(maxLineHeight);
      element.style.setProperty('--fit-scale', '1');

      while ((element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) && fontSize > minFontSize) {
        fontSize = Math.max(minFontSize, fontSize - .5);
        const progress = (maxFontSize - fontSize) / (maxFontSize - minFontSize);
        const lineHeight = maxLineHeight - ((maxLineHeight - minLineHeight) * progress);
        element.style.fontSize = `${fontSize}px`;
        element.style.lineHeight = String(lineHeight);
        element.style.setProperty('--fit-scale', String(fontSize / maxFontSize));
      }
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [contentKey, maxFontSize, maxLineHeight, minFontSize, minLineHeight]);

  return <Element ref={elementRef} className={className}>{children}</Element>;
}
