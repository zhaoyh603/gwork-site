import { useEffect, useState } from 'react';
import type { ManualPart } from '../data/manual';

/** 高亮判定线：吸顶导航下沿。与锚点 scroll-mt-24（Guide.tsx / ManualSectionView）同值，三处约定互指。 */
const LINE_PX = 96;

/**
 * 锚点目录：桌面端左栏 sticky，移动端顶部横滑条。
 * 滚动高亮：经典「越过 96px 线才切换」——已越线目标中最靠下（最近越线）者为当前节。
 */
export default function GuideToc({ parts }: { parts: ManualPart[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const ids = parts.flatMap((part) => [part.id, ...part.sections.map((s) => s.id)]);
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      () => {
        // 回调只当「该重估」的触发器，选择按越线规则现算。
        // 不用「可见集取 topmost」：板块 section 含全部小节内容（很高），它仍在检测带期间
        // top 恒最小，会让板块链接霸占高亮、小节永不切换。
        // targets 按 parts 顺序即文档顺序，top 单调递增，可提前退出。
        let current: HTMLElement | null = null;
        for (const t of targets) {
          if (t.getBoundingClientRect().top <= LINE_PX) current = t;
          else break;
        }
        // 无目标越线（如停在页首）时保持最后高亮，不清空
        if (current) setActiveId(current.id);
      },
      // 检测带：顶部收进到判定线、底部收进 99%——只剩贴着 96px 线的一条细带，
      // 目标顶部越线必穿过细带，IntersectionObserver 因此在「越线瞬间」精确回调。
      // 不留 40% 视口作检测带（-60% 方案）：小节内容填实变高后，越线时目标仍在带内、
      // 交集状态不变、不触发回调，切换会滞后到下一次带边事件（最多差一个小节高度）。
      { rootMargin: `-${LINE_PX}px 0px -99% 0px` },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [parts]);

  const linkClass = (id: string) =>
    `block rounded-xl px-3 py-1.5 transition-colors ${
      activeId === id ? 'bg-brand/10 font-semibold text-brand' : 'text-ink-soft hover:text-ink'
    }`;

  return (
    <nav aria-label="指南目录" className="lg:sticky lg:top-24 lg:w-56 lg:shrink-0 lg:self-start">
      <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-ink-soft lg:block">目录</p>
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {parts.map((part) => (
          <div key={part.id} className="shrink-0 lg:mb-3">
            <a
              href={`#${part.id}`}
              aria-current={activeId === part.id ? 'true' : undefined}
              className={`${linkClass(part.id)} whitespace-nowrap text-base`}
            >
              {part.title}
            </a>
            <div className="hidden lg:block">
              {part.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={activeId === section.id ? 'true' : undefined}
                  className={`${linkClass(section.id)} pl-4 text-sm`}
                >
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
