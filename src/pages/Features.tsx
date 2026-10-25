import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import ScreenMock, { type MockVariant } from '../components/ScreenMock';
import { FEATURES } from '../data/features';
import { SECURITY_MECHANISMS } from '../data/security';
import { useReveal } from '../hooks/useReveal';

interface FeaturePresentation {
  label: string;
  metricValue: string;
  metricLabel: string;
  highlights: string[];
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
  },
  '02': {
    label: '统筹分工',
    metricValue: '几件事同时跑',
    metricLabel: '主助手统筹 + 子助手执行',
    highlights: ['拆解任务', '同时推进', '自动汇总'],
  },
  '03': {
    label: '本地安全',
    metricValue: '资料不出本机',
    metricLabel: '内网模型、敏感资料都能用',
    highlights: ['本地工作区', '内网可用', '上下文可控'],
  },
  '04': {
    label: '插件扩展',
    metricValue: '按需启用',
    metricLabel: '网页 / 文件 / 邮件 / 定时任务',
    highlights: ['想要就开', '不用就关', '不占地方'],
  },
  '05': {
    label: '模型接入',
    metricValue: '灵活切换',
    metricLabel: '支持多家主流模型厂商',
    highlights: ['国产模型都能接', '花多少钱自己定', '按用途挑'],
  },
  '06': {
    label: '分区办公',
    metricValue: '多工作区',
    metricLabel: '项目与部门各管各的',
    highlights: ['切换快', '互不干扰', '多项目并行'],
  },
  '07': {
    label: '知识库问答',
    metricValue: '来源可追溯',
    metricLabel: '问答结果附引用依据',
    highlights: ['制度检索', '条文引用', '快速问答'],
  },
  '08': {
    label: '安全中心',
    metricValue: '有规矩，有记录',
    metricLabel: '命令、文件、联网、删除，样样管得住',
    highlights: ['命令审批', '网络规则', '删除保护'],
  },
};

/** 获取功能区块的展示文案。 */
function getFeaturePresentation(no: string): FeaturePresentation {
  return FEATURE_PRESENTATIONS[no] ?? FEATURE_PRESENTATIONS['01'];
}

/** 功能页：八项能力左右交替排布，配图与文案用细线分隔。 */
export default function Features() {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="features" />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.14em] text-brand">功能</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-brand-dark lg:text-5xl">八项能力，按办公场景取用</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
            公文写作、资料整理、知识库问答，按日常办公需要选择使用。
          </p>
        </section>

        <div className="mt-14">
          {FEATURES.map((f, i) => {
            const presentation = getFeaturePresentation(f.no);
            return (
              <section
                key={f.no}
                className={`reveal ${i > 0 ? 'mt-14 border-t border-line pt-10' : ''}`}
              >
                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs text-ink-muted">{f.no}</span>
                      <span className="text-xs uppercase tracking-[0.12em] text-ink-muted">{presentation.label}</span>
                    </div>
                    <h2 className="mt-2 font-serif text-2xl text-brand-dark lg:text-3xl">{f.title}</h2>
                    <p className="mt-4 text-base leading-7 text-ink-soft">{f.desc}</p>
                    <p className="mt-4 text-sm text-ink-muted">
                      {presentation.metricValue} · {presentation.metricLabel}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {presentation.highlights.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-ink-soft">
                          <span className="text-ink-muted" aria-hidden="true">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-ink-muted">适用场景：{f.scenario}</p>
                  </div>

                  <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="relative rounded-xl border border-line bg-white p-3">
                      <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-line bg-white px-2.5 py-1 text-xs text-ink-muted">
                        <span className="h-1 w-1 rounded-full bg-ink-muted" aria-hidden="true" />
                        界面示意
                      </div>
                      <ScreenMock variant={MOCK_BY_NO[f.no] ?? 'workspace'} mode="feature" />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section className="reveal mt-14 border-t border-line pt-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">安全机制</p>
            <h2 className="mt-3 font-serif text-xl text-brand-dark">“数据在本地”只是一层，多层保护一起才放心</h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              命令要先批准、文件访问有边界、联网有规矩、删除有保护，每一步都留记录——
              让 AI 在你的电脑里长期干活，你管得住。
            </p>
          </div>

          <div className="mt-6 border-t border-line">
            {SECURITY_MECHANISMS.map((item) => (
              <article
                key={item.title}
                className="grid gap-2 border-b border-line py-5 md:grid-cols-[240px_1fr] md:gap-8"
              >
                <h3 className="font-medium text-brand-dark">{item.title}</h3>
                <div>
                  <p className="text-sm leading-7 text-ink-soft">{item.desc}</p>
                  <p className="mt-2 text-xs text-ink-muted">{item.points.join(' · ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal mt-14 border-t border-line pt-12 text-center">
          <h2 className="font-serif text-2xl text-brand-dark">还不确定适不适合？</h2>
          <p className="mt-3 text-sm text-ink-soft">下载安装，本地跑起来就知道。</p>
          <div className="mt-6">
            <CtaButton href="./download.html">下载 Gwork</CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
