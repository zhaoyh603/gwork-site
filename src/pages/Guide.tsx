import { useEffect } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CtaButton from '../components/CtaButton';
import GuideToc from '../components/GuideToc';
import ManualSectionView from '../components/ManualSectionView';
import { CONSULT_OPTIONS } from '../data/guide';
import { MANUAL_PARTS } from '../data/manual';
import { SITE } from '../data/site';
import { useReveal } from '../hooks/useReveal';

/** 使用指南页：装好之后的完整上手手册——四大板块图文操作步骤。 */
export default function Guide() {
  const revealRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    // 内容由 React 渲染，浏览器的初始片段定位发生在渲染前且不重试——
    // 冷打开（新标签/分享链接）guide.html#<id> 时需挂载后补一次滚动
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView();
  }, []);

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="guide" />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.14em] text-brand">使用指南</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-brand-dark lg:text-5xl">从安装到日常使用</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
            装好之后，从第一次对话到日常设置，一步步带你走完。
          </p>
        </section>

        <div className="mt-14 flex flex-col gap-10 border-t border-line pt-10 lg:flex-row">
          <GuideToc parts={MANUAL_PARTS} />
          <div className="min-w-0 flex-1">
            {MANUAL_PARTS.map((part) => (
              <section key={part.id} id={part.id} className="scroll-mt-24">
                <h2 className="font-serif text-2xl text-brand-dark">{part.title}</h2>
                <p className="mt-3 text-base leading-7 text-ink-soft">{part.intro}</p>
                {part.sections.map((section) => (
                  <ManualSectionView key={section.id} section={section} />
                ))}
              </section>
            ))}
          </div>
        </div>

        <p className="mt-16 text-center text-xs text-ink-muted">
          本指南内容以当前发布版本为准 · 截图均为浅色主题，不影响深色模式下的操作
        </p>

        <section id="consult" className="reveal mt-16 border-t border-line pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">咨询与反馈</p>
              <h2 className="mt-3 font-serif text-2xl text-brand-dark">需要演示、提需求或提交问题？</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
                按“先看场景、再提需求、遇到问题就反馈”的顺序推进即可。
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <CtaButton href="./download.html">前往下载页</CtaButton>
              <a
                href={SITE.contactUrl}
                className="inline-flex items-center text-base text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-brand-dark"
              >
                联系我们 →
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-line">
            {CONSULT_OPTIONS.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="grid gap-2 border-b border-line py-4 transition-colors hover:bg-surface-soft md:grid-cols-[160px_1fr_auto] md:items-baseline md:gap-6"
              >
                <span className="font-medium text-brand-dark">{option.title}</span>
                <span className="text-sm leading-6 text-ink-soft">{option.desc}</span>
                <span className="text-sm text-ink-muted">{option.action} →</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
