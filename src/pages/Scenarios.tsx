import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CtaButton from '../components/CtaButton';
import { SCENARIOS } from '../data/scenarios';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

/** 场景页：用典型业务流程说明 Gwork 适合谁、怎么用、会产出什么。 */
export default function Scenarios() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="scenarios" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section>
          <div className="grid gap-6">
            {SCENARIOS.map((scenario, index) => (
              <section
                id={scenario.id}
                key={scenario.id}
                className="reveal feature-showcase scroll-mt-20 overflow-hidden rounded-[32px] border border-white/80 px-6 py-8 shadow-[0_20px_44px_rgba(19,40,110,0.08)] backdrop-blur-sm lg:px-10"
                style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
              >
                <div className="feature-showcase__wash" />
                <div className="relative z-[1] grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="eyebrow-pill">{scenario.kicker}</span>
                      <span className="feature-kicker">{scenario.audience}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-brand-dark lg:text-[2rem]">
                      {scenario.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-ink">{scenario.summary}</p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {scenario.workflow.map((step, stepIndex) => (
                        <div key={step} className="surface-card px-4 py-4">
                          <p className="text-xs font-semibold tracking-wide text-brand">步骤 {stepIndex + 1}</p>
                          <p className="mt-2 text-sm leading-relaxed text-ink">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-card px-6 py-6">
                    <p className="text-sm font-semibold text-brand-dark">典型产出</p>
                    <div className="mt-4 space-y-3">
                      {scenario.outcomes.map((outcome) => (
                        <div key={outcome} className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
                          <p className="text-sm text-ink">{outcome}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-brand-dark">用到的功能</p>
                      <div className="mt-3 space-y-2">
                        {scenario.features.map((f) => (
                          <div key={f.title} className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
                            <p className="text-sm font-semibold text-ink">{f.title}</p>
                            <p className="mt-0.5 text-xs leading-5 text-ink-soft">{f.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 rounded-[24px] border border-brand-glow bg-surface-soft px-5 py-5">
                      <p className="text-sm font-semibold text-brand-dark">推荐起步方式</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        先挑一件最日常的小事试手：起草一份通知、查一条制度、整理一包资料。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="reveal py-16 text-center">
          <h2 className="text-2xl font-semibold text-brand-dark">拿不准适不适合你的活儿？</h2>
          <p className="mt-3 text-base text-ink-soft">先翻翻使用指南，再决定装不装。</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <CtaButton href="./guide.html">查看使用指南</CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
