import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import SectionTitle from '../components/SectionTitle';
import ScreenMock from '../components/ScreenMock';
import { FEATURES } from '../data/features';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

const HERO_HIGHLIGHTS = ['支持 macOS 与 Windows', '安装即用', '适配国产模型', '安全中心可见'];
const HERO_SECURITY_SUMMARY = [
  ['命令审批', '高风险命令可拦截或确认后执行'],
  ['网络规则', '联网出口支持总开关与域名规则'],
  ['操作审计', '关键拦截与处理结果可回溯'],
];
const HERO_FLOATING_CARD = {
  title: '安全中心',
  value: '审批 / 规则 / 审计',
  note: '命令、文件、网络多层防护',
};

/** 首页：以产品价值、核心能力和安全优势为主线承接品牌转化。 */
export default function Home() {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="home" />

      {/* 1. Hero */}
      <section className="hero-bg border-b border-white/70">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p
              className="hero-rise mb-5"
              style={{ animationDelay: '0ms' }}
            >
              <span className="eyebrow-pill">本地优先 · 安全可控</span>
            </p>
            <h1
              className="hero-rise max-w-xl text-4xl font-semibold leading-tight tracking-tight text-brand-dark lg:text-6xl"
              style={{ animationDelay: '120ms' }}
            >
              AI 驱动的政企办公助手
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl"
              style={{ animationDelay: '240ms' }}
            >
              多助手协同干活，公文、材料、知识库一站搞定。所有数据留在本机，
              敏感资料不出内网，并提供安全中心、联网规则和审计能力，让 AI 在真实工作区里更可控。
            </p>
            <div className="hero-rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: '360ms' }}>
              <CtaButton href="./download.html" size="lg">下载 Gwork</CtaButton>
              <a href="./features.html" className="text-link text-base">
                了解功能 →
              </a>
            </div>
            <div className="hero-rise mt-8 flex flex-wrap gap-3 text-sm text-ink-soft" style={{ animationDelay: '480ms' }}>
              {HERO_HIGHLIGHTS.map((item) => (
                <span key={item} className="rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </div>
            <div className="hero-rise hero-signal-grid mt-6 max-w-2xl gap-3" style={{ animationDelay: '560ms' }}>
              {HERO_SECURITY_SUMMARY.map(([title, desc]) => (
                <div key={title} className="hero-signal-item">
                  <div className="hero-signal-dot" />
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">{title}</p>
                    <p className="mt-1 text-xs leading-6 text-ink-soft">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-rise" style={{ animationDelay: '200ms' }}>
            <div className="hero-stage">
              <div className="hero-stage-glow" />
              <div className="hero-stage-main">
                <ScreenMock variant="workspace" mode="hero" />
              </div>
              <div className="hero-float-card hero-float-card-single hidden lg:block">
                <p className="text-xs font-medium tracking-wide text-brand">{HERO_FLOATING_CARD.title}</p>
                <p className="mt-2 text-sm font-semibold text-brand-dark">{HERO_FLOATING_CARD.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{HERO_FLOATING_CARD.note}</p>
              </div>
              <div className="hero-mini-panel">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ['政务写作', '规范输出'],
                    ['知识问答', '有据可依'],
                    ['定时任务', '自动归档'],
                  ].map(([title, note]) => (
                    <div key={title} className="rounded-[18px] border border-white/80 bg-white/85 px-3 py-2.5 shadow-sm">
                      <p className="text-[11px] font-medium text-brand-dark">{title}</p>
                      <p className="mt-1 text-[10px] text-ink-soft">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 亮点条 */}
      <section className="section-wash">
        <div className="reveal mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-3">
          {[
            ['数据本地存储', '资料存在本机，不依赖云端'],
            ['兼容主流大模型', '含 DeepSeek、通义、智谱、Kimi 等国产模型'],
            ['安全中心', '审批、网络规则与审计能力可见'],
          ].map(([title, desc]) => (
            <div key={title} className="surface-card px-6 py-7 text-center">
              <p className="font-medium text-brand-dark">{title}</p>
              <p className="mt-1.5 text-sm text-ink-soft">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 数据指标条 */}
      <section className="border-b border-white/70 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              ['8 项核心能力', '办公能力与安全控制一起补齐'],
              ['本地优先', '数据与工作区按本机优先方式组织'],
              ['多模型厂商', '含 DeepSeek、通义、智谱、Kimi 等'],
              ['安全中心', '命令、网络、删除与审计更可控'],
            ].map(([num, label], i) => (
              <div key={label} className="stat-card">
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
      <section className="border-b border-white/70 bg-transparent">
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
                className={`reveal feature-card ${f.no === '07' ? 'sm:col-span-2 lg:col-span-3 lg:flex lg:items-center lg:gap-6' : ''}`}
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
      <section className="section-wash">
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
                className="reveal surface-card px-6 py-7"
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
      <section className="border-b border-white/70 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="安全合规"
            title="资料不出门，数据你作主"
            desc="面向政企场景，安全是第一优先级。"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div
              className="reveal surface-card-soft p-8"
              style={{ '--reveal-delay': '0ms' } as CSSProperties}
            >
              <h3 className="text-lg font-semibold text-brand-dark">数据存储在本机</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                对话记录、知识库、工作区数据全部存在本机；模型可自由选择云端或内网部署，按需满足安全要求。
              </p>
            </div>
            <div
              className="reveal surface-card-soft p-8"
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
      <section className="bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="reveal surface-card-soft px-8 py-14 text-center lg:px-16">
            <h2 className="text-3xl font-semibold text-brand-dark">现在就试试 Gwork</h2>
            <p className="mt-4 text-base text-ink-soft">免费安装，本地运行，两分钟上手。</p>
            <div className="mt-8">
              <CtaButton href="./download.html" size="lg">下载 Gwork</CtaButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
