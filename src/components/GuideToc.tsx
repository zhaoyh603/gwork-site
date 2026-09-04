import { useEffect, useState } from 'react';
import type { ManualPart } from '../data/manual';

/**
 * 锚点目录：桌面端左栏 sticky，移动端顶部横滑条。
 * 滚动高亮：观察全部板块与小节 id，视口最上方当前命中者高亮。
 */
export default function GuideToc({ parts }: { parts: ManualPart[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const ids = parts.flatMap((part) => [part.id, ...part.sections.map((s) => s.id)]);
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // 取视口中最靠上的可见节为当前节
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActiveId(top.target.id);
        }
      },
      { rootMargin: '-96px 0px -60% 0px' },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [parts]);

  const linkClass = (id: string) =>
    `block rounded-xl px-3 py-1.5 text-sm transition-colors ${
      activeId === id ? 'bg-brand/10 font-semibold text-brand' : 'text-ink-soft hover:text-ink'
    }`;

  return (
    <nav aria-label="指南目录" className="lg:sticky lg:top-24 lg:w-56 lg:shrink-0 lg:self-start">
      <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-ink-soft lg:block">目录</p>
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {parts.map((part) => (
          <div key={part.id} className="shrink-0 lg:mb-3">
            <a href={`#${part.id}`} className={`${linkClass(part.id)} whitespace-nowrap text-base`}>{part.title}</a>
            <div className="hidden lg:block">
              {part.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className={`${linkClass(section.id)} pl-4`}>
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
