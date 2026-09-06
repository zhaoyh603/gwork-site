import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import ScreenMock, { type MockVariant } from '../components/ScreenMock';
import { FEATURES } from '../data/features';
import { SECURITY_MECHANISMS } from '../data/security';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

interface FeaturePresentation {
  label: string;
  metricValue: string;
  metricLabel: string;
  highlights: string[];
  style: CSSProperties;
}

/** 每节配图变体：01→secretary、02→assistant、04→skills、05→model-config、07→kb；03 本地与内网安全与 08 安全中心共用 security 画面；未映射时 ?? 'workspace' 兜底 */
const MOCK_BY_NO: Record<string, MockVariant> = {
  '01': 'secretary',
  '02': 'assistant',
  '03': 'security',
  '04': 'skills',
  '05': 'model-config',
  '06': 'workspace',
  '07': 'kb',
  '08': 'security',
};

const FEATURE_PRESENTATIONS: Record<string, FeaturePresentation> = {
  '01': {
    label: '规范写作',
    metricValue: '一键生成',
    metricLabel: '通知 / 纪要 / 报告',
    highlights: ['格式规范', '主送完整', '快速润色'],
    style: {
      '--feature-accent': '#4c6fff',
      '--feature-soft-start': 'rgba(76, 111, 255, 0.16)',
      '--feature-soft-end': 'rgba(72, 199, 255, 0.10)',
      '--feature-glow': 'rgba(76, 111, 255, 0.18)',
    } as CSSProperties,
  },
  '02': {
    label: '统筹分工',
    metricValue: '几件事同时跑',
    metricLabel: '主助手统筹 + 子助手执行',
    highlights: ['拆解任务', '同时推进', '自动汇总'],
    style: {
      '--feature-accent': '#4e8cff',
      '--feature-soft-start': 'rgba(78, 140, 255, 0.15)',
      '--feature-soft-end': 'rgba(111, 207, 255, 0.10)',
      '--feature-glow': 'rgba(78, 140, 255, 0.18)',
    } as CSSProperties,
  },
  '03': {
    label: '本地安全',
    metricValue: '资料不出本机',
    metricLabel: '内网模型、敏感资料都能用',
    highlights: ['本地工作区', '内网可用', '上下文可控'],
    style: {
      '--feature-accent': '#3277d8',
      '--feature-soft-start': 'rgba(50, 119, 216, 0.14)',
      '--feature-soft-end': 'rgba(72, 199, 255, 0.08)',
      '--feature-glow': 'rgba(50, 119, 216, 0.16)',
    } as CSSProperties,
  },
  '04': {
    label: '插件扩展',
    metricValue: '按需启用',
    metricLabel: '网页 / 文件 / 邮件 / 定时任务',
    highlights: ['想要就开', '不用就关', '不占地方'],
    style: {
      '--feature-accent': '#6b7cff',
      '--feature-soft-start': 'rgba(107, 124, 255, 0.16)',
      '--feature-soft-end': 'rgba(132, 199, 255, 0.08)',
      '--feature-glow': 'rgba(107, 124, 255, 0.17)',
    } as CSSProperties,
  },
  '05': {
    label: '模型接入',
    metricValue: '灵活切换',
    metricLabel: '支持多家主流模型厂商',
    highlights: ['国产模型都能接', '花多少钱自己定', '按用途挑'],
    style: {
      '--feature-accent': '#5f74ff',
      '--feature-soft-start': 'rgba(95, 116, 255, 0.16)',
      '--feature-soft-end': 'rgba(97, 208, 255, 0.08)',
      '--feature-glow': 'rgba(95, 116, 255, 0.18)',
    } as CSSProperties,
  },
  '06': {
    label: '分区办公',
    metricValue: '多工作区',
    metricLabel: '项目与部门各管各的',
    highlights: ['切换快', '互不干扰', '多项目并行'],
    style: {
      '--feature-accent': '#4f90f7',
      '--feature-soft-start': 'rgba(79, 144, 247, 0.14)',
      '--feature-soft-end': 'rgba(72, 199, 255, 0.08)',
      '--feature-glow': 'rgba(79, 144, 247, 0.17)',
    } as CSSProperties,
  },
  '07': {
    label: '知识库问答',
    metricValue: '来源可追溯',
    metricLabel: '问答结果附引用依据',
    highlights: ['制度检索', '条文引用', '快速问答'],
    style: {
      '--feature-accent': '#3d7cff',
      '--feature-soft-start': 'rgba(61, 124, 255, 0.15)',
      '--feature-soft-end': 'rgba(72, 199, 255, 0.10)',
      '--feature-glow': 'rgba(61, 124, 255, 0.18)',
    } as CSSProperties,
  },
  '08': {
    label: '安全中心',
    metricValue: '有规矩，有记录',
    metricLabel: '命令、文件、联网、删除，样样管得住',
    highlights: ['命令审批', '网络规则', '删除保护'],
    style: {
      '--feature-accent': '#2f6fda',
      '--feature-soft-start': 'rgba(47, 111, 218, 0.16)',
      '--feature-soft-end': 'rgba(59, 180, 255, 0.10)',
      '--feature-glow': 'rgba(47, 111, 218, 0.18)',
    } as CSSProperties,
  },
};

/** 获取功能区块的视觉配置，统一控制标签、指标和主题色。 */
function getFeaturePresentation(no: string): FeaturePresentation {
  return FEATURE_PRESENTATIONS[no] ?? FEATURE_PRESENTATIONS['01'];
}

/** 功能页：分条展示七大能力，并通过示意画面增强感知。 */
export default function Features() {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="features" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {FEATURES.map((f, i) => {
          const presentation = getFeaturePresentation(f.no);
          return (
            <section
              key={f.no}
              className="feature-showcase reveal mb-8 grid items-center gap-10 overflow-hidden rounded-[32px] border border-white/80 px-6 py-10 shadow-[0_20px_44px_rgba(19,40,110,0.08)] backdrop-blur-sm lg:grid-cols-2 lg:px-10"
              style={{
                '--reveal-delay': `${i * 70}ms`,
                ...presentation.style,
              } as CSSProperties}
            >
              <div className="feature-showcase__wash" />
              <div className={`relative z-[1] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow-pill">{f.no}</span>
                  <span className="feature-kicker">{presentation.label}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-brand-dark lg:text-[1.9rem]">{f.title}</h2>
                <p className="mt-4 leading-relaxed text-ink">{f.desc}</p>

                <div className="feature-metric-panel mt-6">
                  <p className="text-sm font-semibold text-brand-dark">{presentation.metricValue}</p>
                  <p className="mt-1 text-sm text-ink-soft">{presentation.metricLabel}</p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {presentation.highlights.map((item) => (
                    <span key={item} className="feature-highlight-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 inline-block rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-ink shadow-sm">
                  适用场景：{f.scenario}
                </p>
              </div>
              <div className={`relative z-[1] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="feature-preview-frame">
                  <div className="feature-preview-badge">
                    <span className="feature-preview-dot" />
                    界面示意
                  </div>
                  <ScreenMock variant={MOCK_BY_NO[f.no] ?? 'workspace'} mode="feature" />
                </div>
              </div>
            </section>
          );
        })}

        <section className="reveal mt-16 rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_18px_40px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand">安全机制</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-dark">“数据在本地”只是一层，多层保护一起才放心</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              命令要先批准、文件访问有边界、联网有规矩、删除有保护，每一步都留记录——
              让 AI 在你的电脑里长期干活，你管得住。
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {SECURITY_MECHANISMS.map((item, index) => (
              <article
                key={item.title}
                className="reveal feature-showcase overflow-hidden rounded-[28px] border border-white/80 px-5 py-5 shadow-sm"
                style={{ '--reveal-delay': `${index * 60}ms` } as CSSProperties}
              >
                <div className="feature-showcase__wash" />
                <div className="relative z-[1]">
                  <p className="text-lg font-semibold text-brand-dark">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{item.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {item.points.map((point) => (
                      <span key={point} className="feature-highlight-chip">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal py-16 text-center">
          <h2 className="text-2xl font-semibold text-brand-dark">还不确定适不适合？</h2>
          <p className="mt-3 text-base text-ink-soft">下载安装，本地跑起来就知道。</p>
          <div className="mt-6">
            <CtaButton href="./download.html">下载 Gwork</CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
