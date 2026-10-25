import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import SectionTitle from '../components/SectionTitle';
import ScreenMock from '../components/ScreenMock';
import { FEATURES } from '../data/features';
import { SCENARIOS } from '../data/scenarios';
import { useReveal } from '../hooks/useReveal';

const HERO_HIGHLIGHTS = ['按体例起草公文', '回答带出处', '到点自动执行', '支持 macOS、Windows 与 Linux'];
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
      <section className="hero-bg">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand">政企办公 · 本地部署</p>
            <h1 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.18] tracking-tight text-brand-dark lg:text-5xl">
              办公的事，
              <br />
              交给一个<span className="text-brand">懂规矩</span>的助手
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              公文起草、资料问答、材料整理、定时任务。数据和资料留在本机，模型可接内网。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <CtaButton href="./download.html" size="lg">下载 Gwork</CtaButton>
              <a href="./features.html" className="text-link border-b border-line pb-0.5 text-base">
                了解功能 →
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-ink-soft">
              {HERO_HIGHLIGHTS.map((item) => (
                <span key={item} className="rounded-full border border-line px-3.5 py-1 text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            {/* 叠放界面：主截图 + 背后一张倾斜的纸卡，形成「文件叠放」层次 */}
            <div className="absolute left-0 top-0 hidden h-full w-[92%] rotate-[-2deg] rounded-xl border border-line bg-white lg:block" aria-hidden="true" />
            <div className="relative rotate-[1.2deg] rounded-xl border border-line bg-white p-2 shadow-[0_24px_48px_rgba(27,42,74,0.10)]">
              <ScreenMock variant="workspace" mode="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 场景区 */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionTitle kicker="典型场景" title="从案头到交付，办公的事都交给我" desc="四个场景，对照你的日常" />
          <div className="border-t border-line">
            {SCENARIOS.map((s, i) => (
              <a
                key={s.id}
                href={`./scenarios.html#${s.id}`}
                className="group grid gap-2 border-b border-line py-6 md:grid-cols-[56px_220px_1fr] md:gap-8"
              >
                <span className="font-serif text-2xl leading-none text-brand/25">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-serif text-xl text-brand-dark">{s.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink-muted">{s.kicker}</p>
                </div>
                <div>
                  <p className="text-sm leading-7 text-ink-soft">{s.summary}</p>
                  <p className="mt-2 text-xs text-ink-muted">用到的功能：{s.features.map((f) => f.title).join(' · ')}</p>
                  <span className="mt-2 inline-block text-sm text-link">查看详情 →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 核心能力 */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionTitle kicker="核心能力" title="一个助手，承包办公日常" desc="八项能力，按需取用" />
          <div className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
            {FEATURES.map((f) => (
              <div key={f.no} className="flex gap-5 border-b border-line py-5">
                <span className="font-serif text-xl leading-none text-brand/25">{f.no}</span>
                <div>
                  <h3 className="font-medium text-brand-dark">{f.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 协同工作 */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionTitle kicker="协同工作" title="多助手一起干活，各司其职" desc="拆开并行，结果交回你手上" />
          <div className="grid gap-x-10 gap-y-8 border-t border-line pt-6 md:grid-cols-3">
            {[
              ['主助手统筹', '接收任务、拆解分工、汇总结果，全程对话式协作'],
              ['子助手分工', '检索、整理、执行各领一摊，互不干扰'],
              ['定时任务', '周报汇总、资料归档，到点自动执行'],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="font-medium text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 安全可控 */}
      <section className="border-b border-line bg-surface-soft">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <SectionTitle
            kicker="安全可控"
            title="数据不出门，用着放心"
            desc="安全是底线，不是卖点"
            motto="人有不为也，而后可以有为。——《孟子·离娄下》"
          />
          <div className="grid gap-x-10 gap-y-8 border-t border-line pt-6 md:grid-cols-3">
            {[
              ['数据留本机', '对话记录、知识库、工作区数据全部存在本机，模型可自由选择云端或内网部署'],
              ['操作可审计', '关键拦截与处理结果可回溯，AI 干活心里有数'],
              ['可随时清理', '会话与上下文一键清理，敏感资料不留痕迹'],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="font-medium text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            完整安全机制见 <a href="./features.html" className="text-link">功能页 →</a>
          </p>
        </div>
      </section>

      {/* 6. CTA 收尾：墨蓝反色落款区 */}
      <section className="bg-brand-dark">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <p className="font-classic text-sm tracking-[0.16em] text-white/60">君子生非异也，善假于物也。——《荀子·劝学》</p>
          <h2 className="mt-6 font-serif text-3xl text-white">现在就试试 Gwork</h2>
          <p className="mt-3 text-sm text-white/70">安装后按引导配置模型，本地跑起来。</p>
          <div className="mt-8">
            <a
              href="./download.html"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-9 text-base font-medium text-brand-dark transition-opacity hover:opacity-90"
            >
              下载 Gwork
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
