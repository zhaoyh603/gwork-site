import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import SectionTitle from '../components/SectionTitle';
import ScreenMock from '../components/ScreenMock';
import { FEATURES } from '../data/features';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

export default function Home() {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div className="min-h-screen" ref={revealRef}>
      <Nav active="home" />

      {/* 1. Hero */}
      <section className="hero-bg border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p
              className="hero-rise mb-4 inline-block rounded-full bg-brand-soft px-4 py-1 text-sm font-medium text-brand"
              style={{ animationDelay: '0ms' }}
            >
              本地优先 · 安全可控
            </p>
            <h1
              className="hero-rise text-4xl font-semibold leading-tight text-brand-dark lg:text-5xl"
              style={{ animationDelay: '120ms' }}
            >
              AI 驱动的政企办公助手
            </h1>
            <p
              className="hero-rise mt-6 text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: '240ms' }}
            >
              多助手协同干活，公文、材料、知识库一站搞定。所有数据留在本机，
              敏感资料不出内网。
            </p>
            <div className="hero-rise mt-8 flex items-center gap-4" style={{ animationDelay: '360ms' }}>
              <CtaButton href="./download.html" size="lg">下载 Gwork</CtaButton>
              <a href="./features.html" className="text-base font-medium text-brand transition-colors hover:text-brand-hover">
                了解功能 →
              </a>
            </div>
            <p className="hero-rise mt-4 text-sm text-ink-soft" style={{ animationDelay: '480ms' }}>支持 macOS 与 Windows</p>
          </div>
          <div className="hero-rise" style={{ animationDelay: '200ms' }}>
            <ScreenMock variant="workspace" />
          </div>
        </div>
      </section>

      {/* 2. 亮点条 */}
      <section className="border-b border-line bg-white">
        <div className="reveal mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-3">
          {[
            ['数据本地存储', '资料存在本机，不依赖云端'],
            ['兼容主流大模型', '含 DeepSeek、通义、智谱、Kimi 等国产模型'],
            ['开箱即用', '安装即可用，无需部署服务器'],
          ].map(([title, desc]) => (
            <div key={title} className="text-center">
              <p className="font-medium text-brand-dark">{title}</p>
              <p className="mt-1.5 text-sm text-ink-soft">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 数据指标条 */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              ['7 大办公能力', '公文、知识库、多助手开箱即用'],
              ['100% 本地存储', '数据不出本机，安全可控'],
              ['多模型厂商', '含 DeepSeek、通义、智谱、Kimi 等'],
              ['全天候定时任务', '到点自动执行，不遗漏'],
            ].map(([num, label], i) => (
              <div key={label} className="text-center">
                <p
                  className="metric-in text-3xl font-semibold text-brand"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {num}
                </p>
                <p className="mt-2 text-sm text-ink-soft">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 核心卖点区 */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="核心能力"
            title="一个助手，承包办公日常"
            desc="从公文写作到知识库问答，从单打独斗到多助手协同，都能帮上忙。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.no}
                style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as CSSProperties}
                className={`reveal rounded-lg border border-line bg-paper p-6 ${f.no === '07' ? 'sm:col-span-2 lg:col-span-3 lg:flex lg:items-center lg:gap-6' : 'transition-shadow hover:shadow-md'}`}
              >
                <p className="text-sm font-semibold text-brand">{f.no}</p>
                <h3 className="mt-2 text-lg font-semibold text-brand-dark">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 能力展示区 */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="协同工作"
            title="多助手一起干活，各司其职"
            desc="主助手负责统筹，子助手按任务分工，定时任务自动跑，跨标签页随时调用。"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ['主助手统筹', '接收任务、拆解分工、汇总结果，全程对话式协作'],
              ['子助手分工', '检索、整理、执行各领一摊，互不干扰'],
              ['定时任务', '周报汇总、资料归档，到点自动执行'],
            ].map(([title, desc], i) => (
              <div
                key={title}
                className="reveal rounded-lg border border-line bg-white p-6"
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <h3 className="font-semibold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 安全合规区 */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="安全合规"
            title="资料不出门，数据你作主"
            desc="面向政企场景，安全是第一优先级。"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div
              className="reveal rounded-lg border border-line bg-brand-soft p-8"
              style={{ '--reveal-delay': '0ms' } as CSSProperties}
            >
              <h3 className="text-lg font-semibold text-brand-dark">数据存储在本机</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                对话记录、知识库、工作区数据全部存在本机；模型可自由选择云端或内网部署，按需满足安全要求。
              </p>
            </div>
            <div
              className="reveal rounded-lg border border-line bg-brand-soft p-8"
              style={{ '--reveal-delay': '90ms' } as CSSProperties}
            >
              <h3 className="text-lg font-semibold text-brand-dark">可控可查，随时清理</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                会话与工作区上下文清晰可见，敏感资料用后可一键清理，不留痕迹。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA 收尾 */}
      <section className="bg-white">
        <div className="reveal mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold text-brand-dark">现在就试试 Gwork</h2>
          <p className="mt-4 text-base text-ink-soft">免费安装，本地运行，两分钟上手。</p>
          <div className="mt-8">
            <CtaButton href="./download.html" size="lg">下载 Gwork</CtaButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
