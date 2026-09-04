import { useEffect } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CtaButton from '../components/CtaButton';
import GuideToc from '../components/GuideToc';
import ManualSectionView from '../components/ManualSectionView';
import { CONSULT_OPTIONS } from '../data/guide';
import { MANUAL_BASELINE_VERSION, MANUAL_PARTS } from '../data/manual';
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
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 lg:flex-row">
          <GuideToc parts={MANUAL_PARTS} />
          <div className="min-w-0 flex-1">
            {MANUAL_PARTS.map((part) => (
              <section key={part.id} id={part.id} className="scroll-mt-24">
                <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">{part.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{part.intro}</p>
                {part.sections.map((section) => (
                  <ManualSectionView key={section.id} section={section} />
                ))}
              </section>
            ))}
          </div>
        </div>

        <p className="mt-16 text-center text-xs text-ink-soft">
          本指南界面以 v{MANUAL_BASELINE_VERSION} 为准 · 截图均为浅色主题，不影响深色模式下的操作
        </p>

        <section id="consult" className="reveal mt-16 rounded-[32px] border border-white/80 bg-white/80 px-8 py-10 shadow-[0_20px_44px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-brand">咨询与反馈</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-dark">需要演示、提需求或提交问题？</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                第一版官网仍保持纯静态，但已经把常见咨询路径整理出来。你可以按“先看场景、再提需求、遇到问题就反馈”的顺序推进。
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <CtaButton href="./download.html">前往下载页</CtaButton>
              <a href={SITE.issuesUrl} className="text-link inline-flex items-center text-base">进入问题反馈 →</a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CONSULT_OPTIONS.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="surface-card block px-5 py-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="text-base font-semibold text-brand-dark">{option.title}</p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{option.desc}</p>
                <p className="mt-4 text-sm font-medium text-brand">{option.action} →</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
