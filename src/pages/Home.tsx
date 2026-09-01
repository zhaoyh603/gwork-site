import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import SectionTitle from '../components/SectionTitle';
import ScreenMock from '../components/ScreenMock';
import { FEATURES } from '../data/features';
import { SCENARIOS } from '../data/scenarios';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

const HERO_HIGHLIGHTS = ['按体例起草公文', '回答带出处', '数据留在本机', '支持 macOS 与 Windows'];
const HERO_FLOATING_CARD = {
  title: '通知初稿',
  value: '已按公文体例起草',
  note: '标题、主送单位、正文框架齐全',
};

/** 首页：以场景价值和核心能力为主线承接品牌转化，安全作为信任背书。 */
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
              <span className="eyebrow-pill">政企办公 · 专业助手</span>
            </p>
            <h1
              className="hero-rise max-w-xl text-4xl font-semibold leading-tight tracking-tight text-brand-dark lg:text-6xl"
              style={{ animationDelay: '120ms' }}
            >
              专业的事，交给专业的 AI 助手
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl"
              style={{ animationDelay: '240ms' }}
            >
              公文起草、材料整理、制度问答、周报汇总——不是聊天式问答，而是按政企工作习惯交付：
              按体例起草、带出处回答、到点自动执行。数据留在本机，模型可接内网，无需注册、无需积分。
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

      {/* 2. 场景区（替换原亮点条 + 数据指标条） */}
      <section className="border-b border-white/70 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="典型场景"
            title="从案头到交付，办公的事都交给我"
            desc="四个高频场景，覆盖政企办公日常。"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {SCENARIOS.map((s, i) => (
              <a
                key={s.id}
                href={`./scenarios.html#${s.id}`}
                className="reveal feature-card group p-6 transition-shadow hover:shadow-[0_18px_40px_rgba(19,40,110,0.12)]"
                style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-brand">{s.kicker}</span>
                  <span className="text-xs text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">查看详情 →</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-brand-dark">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
                <p className="mt-4 text-sm font-semibold text-brand">用到的功能：{s.features.map((f) => f.title).join(' · ')}</p>
              </a>
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
            {FEATURES.map((f, i) => {
              const isBig = i % 4 === 0 || i % 4 === 3;
              return (
                <div
                  key={f.no}
                  style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as CSSProperties}
                  className={`reveal feature-card ${isBig ? 'bg-gradient-to-br from-brand-soft/70 to-white lg:col-span-2' : 'lg:col-span-1'}`}
                >
                  <p className="text-sm font-semibold text-brand">{f.no}</p>
                  <h3 className="mt-2 text-lg font-semibold text-brand-dark">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
                </div>
              );
            })}
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

      {/* 5. 信任背书区（原安全合规区） */}
      <section className="border-b border-white/70 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="安全可控"
            title="数据不出门，用着放心"
            desc="面向政企场景，安全是底线不是卖点。"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ['数据留本机', '对话记录、知识库、工作区数据全部存在本机，模型可自由选择云端或内网部署'],
              ['操作可审计', '关键拦截与处理结果可回溯，AI 干活心里有数'],
              ['可随时清理', '会话与上下文一键清理，敏感资料不留痕迹'],
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
          <p className="mt-8 text-center text-sm text-ink-soft">
            完整安全机制见 <a href="./features.html" className="text-link">功能页 →</a>
          </p>
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
