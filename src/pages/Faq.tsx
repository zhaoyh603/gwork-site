import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CtaButton from '../components/CtaButton';
import { FAQS } from '../data/faq';
import { SITE } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

/** FAQ 页：集中回答下载前后的关键疑问，降低试用和部署犹豫。 */
export default function Faq() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="faq" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="reveal surface-card-soft px-8 py-14 text-center lg:px-16">
          <p className="mb-4">
            <span className="eyebrow-pill tracking-wide">FAQ</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-brand-dark lg:text-5xl">
            把下载前后最常见的问题一次说清楚
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
            先确认是否适合你的网络环境、数据要求和部署方式，再决定下载试用，会更高效。
          </p>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          {FAQS.map((item, index) => (
            <article
              key={item.question}
              className="reveal surface-card px-6 py-6"
              style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
            >
              <p className="text-sm font-semibold text-brand">{item.category}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-dark">{item.question}</h2>
              <p className="mt-4 text-sm leading-7 text-ink">{item.answer}</p>
            </article>
          ))}
        </section>

        <section id="contact" className="reveal mt-16 rounded-[32px] border border-white/80 bg-white/80 px-8 py-10 shadow-[0_20px_44px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-brand">咨询 / 反馈</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-dark">还想进一步确认？这里有两个直达入口</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                如果你更关心安装部署，可以先看安装指南；如果已经遇到问题，直接去反馈入口提交信息会更快。
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <CtaButton href="./guide.html#consult">查看安装与咨询</CtaButton>
                <a href={SITE.issuesUrl} className="text-link inline-flex items-center text-base">提交问题反馈 →</a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="surface-card px-5 py-5">
                <p className="text-sm font-semibold text-brand-dark">适合先咨询的情况</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                  <li>内网或私有部署需求</li>
                  <li>跨部门场景需要统一规划</li>
                  <li>希望先看演示再决定试用</li>
                </ul>
              </div>
              <div className="surface-card px-5 py-5">
                <p className="text-sm font-semibold text-brand-dark">反馈时建议附上</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
                  <li>操作系统与版本</li>
                  <li>安装包类型与截图</li>
                  <li>复现步骤与错误提示</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
