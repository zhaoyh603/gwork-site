import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import ScreenMock from '../components/ScreenMock';
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

/** 每节配图变体：公文→secretary，知识库→kb，其余→workspace（03 数据安全配 kb 检索画面语义错配，用中性工作区画面；未映射时 ?? 'workspace' 兜底） */
const MOCK_BY_NO: Record<string, 'workspace' | 'secretary' | 'kb' | 'security'> = {
  '01': 'secretary',
  '02': 'workspace',
  '03': 'security',
  '04': 'workspace',
  '05': 'workspace',
  '06': 'kb',
  '07': 'kb',
  '08': 'workspace',
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
    label: '协同编排',
    metricValue: '多线程推进',
    metricLabel: '主助手统筹 + 子助手执行',
    highlights: ['任务拆解', '并行执行', '自动汇总'],
    style: {
      '--feature-accent': '#4e8cff',
      '--feature-soft-start': 'rgba(78, 140, 255, 0.15)',
      '--feature-soft-end': 'rgba(111, 207, 255, 0.10)',
      '--feature-glow': 'rgba(78, 140, 255, 0.18)',
    } as CSSProperties,
  },
  '03': {
    label: '本地安全',
    metricValue: '本地优先',
    metricLabel: '适配内网模型与敏感资料场景',
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
    highlights: ['组件化', '可扩展', '低负担'],
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
    highlights: ['国产兼容', '成本可控', '按场景选型'],
    style: {
      '--feature-accent': '#5f74ff',
      '--feature-soft-start': 'rgba(95, 116, 255, 0.16)',
      '--feature-soft-end': 'rgba(97, 208, 255, 0.08)',
      '--feature-glow': 'rgba(95, 116, 255, 0.18)',
    } as CSSProperties,
  },
  '06': {
    label: '空间隔离',
    metricValue: '多工作区',
    metricLabel: '项目与部门上下文独立',
    highlights: ['切换便捷', '上下文隔离', '项目并行'],
    style: {
      '--feature-accent': '#4f90f7',
      '--feature-soft-start': 'rgba(79, 144, 247, 0.14)',
      '--feature-soft-end': 'rgba(72, 199, 255, 0.08)',
      '--feature-glow': 'rgba(79, 144, 247, 0.17)',
    } as CSSProperties,
  },
  '07': {
    label: '知识增强',
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
    metricValue: '策略 + 审计',
    metricLabel: '命令、文件、网络与删除全链路更可控',
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
        <div className="reveal surface-card-soft mb-16 px-8 py-14 text-center lg:px-16">
          <p className="mb-4">
            <span className="eyebrow-pill tracking-wide">功能一览</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-brand-dark lg:text-5xl">{FEATURES.length} 项核心能力，覆盖办公与安全控制</h1>
          <p className="mt-4 text-base text-ink-soft">不仅能做事，也把本地安全、联网控制和审计回溯一起考虑进去了。</p>
        </div>

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
                    已接入场景能力
                  </div>
                  <ScreenMock variant={MOCK_BY_NO[f.no] ?? 'workspace'} />
                </div>
              </div>
            </section>
          );
        })}

        <section className="reveal mt-16 rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_18px_40px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand">安全机制</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-dark">安全不是一句“数据在本地”，而是多层保护一起工作</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              结合主项目现有机制，Gwork 已经覆盖命令审批、文件路径限制、网络规则、删除保护和审计回溯等多层防护，
              更适合让 AI 在真实工作区里长期运行。
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
