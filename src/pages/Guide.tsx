import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CtaButton from '../components/CtaButton';
import SectionTitle from '../components/SectionTitle';
import { CONSULT_OPTIONS, GUIDE_SECTIONS, INSTALL_STEPS } from '../data/guide';
import { SITE } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

/** 安装指南页：承接下载后的上手路径、排查要点和咨询反馈入口。 */
export default function Guide() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="guide" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="reveal surface-card-soft px-8 py-14 text-center lg:px-16">
          <p className="mb-4">
            <span className="eyebrow-pill tracking-wide">安装指南</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-brand-dark lg:text-5xl">
            从下载、配置到第一次跑起来
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
            这份指南聚焦桌面端的首次使用流程，帮助你更快完成安装、模型配置和初始排查。
          </p>
        </div>

        <section className="mt-16">
          <SectionTitle
            kicker="安装流程"
            title="五步完成首次上手"
            desc="建议先按标准流程走一遍，再根据自身网络和模型环境做细化配置。"
          />

          <div className="grid gap-5 lg:grid-cols-5">
            {INSTALL_STEPS.map((step, index) => (
              <article
                key={step.no}
                className="reveal surface-card px-5 py-6"
                style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
              >
                <p className="text-sm font-semibold text-brand">{step.no}</p>
                <h2 className="mt-3 text-lg font-semibold text-brand-dark">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{step.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          {GUIDE_SECTIONS.map((section, index) => (
            <article
              key={section.title}
              className="reveal feature-showcase overflow-hidden rounded-[32px] border border-white/80 px-6 py-8 shadow-[0_20px_44px_rgba(19,40,110,0.08)] backdrop-blur-sm"
              style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
            >
              <div className="feature-showcase__wash" />
              <div className="relative z-[1]">
                <h2 className="text-2xl font-semibold tracking-tight text-brand-dark">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{section.desc}</p>
                <div className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
                      <p className="text-sm leading-6 text-ink">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

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
