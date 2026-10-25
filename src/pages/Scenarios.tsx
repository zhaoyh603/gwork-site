import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CtaButton from '../components/CtaButton';
import { SCENARIOS } from '../data/scenarios';
import { useReveal } from '../hooks/useReveal';

/** 场景页：用典型业务流程说明 Gwork 适合谁、怎么用、会产出什么。 */
export default function Scenarios() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="scenarios" />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.14em] text-brand">典型场景</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-brand-dark lg:text-5xl">四个场景，对照你的日常</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
            四类常见办公场景，看看哪一种和你的日常最接近。
          </p>
        </section>

        {SCENARIOS.map((scenario, index) => (
          <section
            id={scenario.id}
            key={scenario.id}
            className={`reveal scroll-mt-20 ${index > 0 ? 'mt-14 border-t border-line pt-10' : 'mt-14'}`}
          >
            <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-10">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">{scenario.kicker}</p>
                <h2 className="mt-2 font-serif text-2xl leading-snug text-brand-dark">{scenario.title}</h2>
                <p className="mt-3 text-sm text-ink-soft">面向：{scenario.audience}</p>

                <div className="mt-6">
                  <p className="text-xs text-ink-muted">典型产出</p>
                  <ul className="mt-2 space-y-1.5">
                    {scenario.outcomes.map((outcome) => (
                      <li key={outcome} className="text-sm leading-6 text-ink-soft">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <p className="text-base leading-7 text-ink-soft">{scenario.summary}</p>

                <ol className="mt-6 grid border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
                  {scenario.workflow.map((step, stepIndex) => (
                    <li
                      key={step}
                      className="border-b border-line py-4 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                    >
                      <span className="text-xs text-ink-muted">{String(stepIndex + 1).padStart(2, '0')}</span>
                      <p className="mt-1 text-sm leading-6 text-ink">{step}</p>
                    </li>
                  ))}
                </ol>

                <p className="mt-8 text-xs text-ink-muted">用到的功能</p>
                <div className="mt-2 border-t border-line">
                  {scenario.features.map((f) => (
                    <div key={f.title} className="border-b border-line py-4">
                      <p className="text-sm font-medium text-brand-dark">{f.title}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="reveal mt-14 border-t border-line pt-10">
          <h2 className="font-serif text-xl text-brand-dark">推荐起步方式</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">
            先挑一件最日常的小事试手：起草一份通知、查一条制度、整理一包资料。
          </p>
        </section>

        <section className="reveal mt-14 border-t border-line pt-12 text-center">
          <h2 className="font-serif text-2xl text-brand-dark">拿不准适不适合你的活儿？</h2>
          <p className="mt-3 text-sm text-ink-soft">先翻翻使用指南，再决定装不装。</p>
          <div className="mt-6">
            <CtaButton href="./guide.html">查看使用指南</CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
