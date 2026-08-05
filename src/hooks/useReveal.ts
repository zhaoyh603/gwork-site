import { useEffect, useRef } from 'react';

/**
 * 滚动显现：观察容器内所有 .reveal 元素，进入视口时加 .reveal-in，
 * 触发 CSS 渐入上浮（site.css 中定义）。已显现元素自动解除观察。
 * 用法：const ref = useReveal<HTMLDivElement>(); <div ref={ref}>…<div className="reveal">…
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}
