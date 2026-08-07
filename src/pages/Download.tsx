import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { SITE } from '../data/site';
import { RELEASE_ARTIFACTS, RELEASE_LOGS } from '../data/releases';
import { useReveal } from '../hooks/useReveal';

/** 下载卡片：根据发布状态显示可下载或待发布态。 */
function DownloadButton({
  name,
  platform,
  size,
  available,
}: {
  name: string;
  platform: string;
  size: string;
  available: boolean;
}) {
  const href = available ? SITE.releaseUrl : '';
  return (
    <a
      href={href || '#'}
      aria-disabled={!available}
      className={
        available
          ? 'btn-shine flex items-center justify-center rounded-[28px] px-8 py-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(52,87,244,0.34)]'
          : 'flex cursor-not-allowed items-center justify-center rounded-[28px] border border-white/80 bg-white/80 px-8 py-6 text-ink-soft shadow-sm backdrop-blur-sm'
      }
    >
      <div className={`text-left ${available ? 'relative z-10' : ''}`}>
        <p className="text-lg font-medium">{name}</p>
        <p className="mt-1 text-sm opacity-80">{platform}</p>
        <p className="mt-1 text-xs opacity-75">{available ? size : '敬请期待'}</p>
      </div>
    </a>
  );
}

const REQUIREMENTS: Array<[string, string]> = [
  ['操作系统', 'macOS 12 及以上 / Windows 10 及以上'],
  ['内存', '8 GB 及以上'],
  ['硬盘空间', '2 GB 可用空间'],
  ['网络', '首次配置模型时需联网，日常可离线使用'],
];

/** 下载页：承接版本获取、环境要求和版本说明。 */
export default function Download() {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="download" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="reveal surface-card-soft px-8 py-14 text-center">
          <p className="mb-4">
            <span className="eyebrow-pill tracking-wide">获取 Gwork</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-brand-dark lg:text-5xl">下载 Gwork {SITE.version}</h1>
          <p className="mt-4 text-base text-ink-soft">本地安装，免费使用，支持 macOS 与 Windows。</p>
        </div>

        <div className="reveal mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
          {RELEASE_ARTIFACTS.map((artifact) => (
            <DownloadButton
              key={artifact.name}
              name={artifact.name}
              platform={artifact.platform}
              size={artifact.size}
              available={artifact.available}
            />
          ))}
        </div>

        <section className="reveal mt-16 rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_18px_40px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-xl font-semibold text-brand-dark">系统要求</h2>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  {REQUIREMENTS.map(([k, v]) => (
                    <tr key={k} className="border-b border-brand-glow last:border-b-0">
                      <td className="w-32 py-3 font-medium text-brand-dark">{k}</td>
                      <td className="py-3 text-ink">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="surface-card px-6 py-6">
              <p className="text-sm font-semibold text-brand">安装引导</p>
              <h3 className="mt-3 text-xl font-semibold text-brand-dark">下载后建议按这个顺序开始</h3>
              <div className="mt-4 space-y-3">
                {[
                  '先完成安装并首次启动应用',
                  '在系统设置中配置模型服务信息',
                  '创建工作区并导入常用资料目录',
                  '从一个明确任务开始试跑',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
                    <p className="text-sm text-ink">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4">
                <a href="./guide.html" className="text-link inline-flex items-center text-base">查看完整安装指南 →</a>
                <a href="./faq.html" className="text-link inline-flex items-center text-base">查看常见问题 →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal mt-10 rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_18px_40px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-brand-dark">版本日志 / 更新记录</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {RELEASE_LOGS.map((log) => (
              <article key={log.title} className="feature-showcase overflow-hidden rounded-[28px] border border-white/80 px-5 py-5 shadow-sm">
                <div className="feature-showcase__wash" />
                <div className="relative z-[1]">
                  <p className="text-sm font-semibold text-brand">{log.date}</p>
                  <h3 className="mt-2 text-lg font-semibold text-brand-dark">{log.title}</h3>
                  <div className="mt-4 space-y-2">
                    {log.items.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
                        <p className="text-sm leading-6 text-ink">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            更完整的发布记录可在
            <a className="text-link" href={SITE.releaseUrl}> GitHub Releases</a>
            查看。
          </p>
        </section>

        <section className="reveal mt-10 rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_18px_40px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h2 className="text-xl font-semibold text-brand-dark">咨询 / 反馈入口</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                如果你是政企试用、内网部署或采购前评估场景，建议先看典型场景和安装指南；
                如果已经遇到安装问题或使用异常，可直接进入反馈入口提交信息。
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href="./scenarios.html" className="text-link inline-flex items-center text-base">查看典型场景 →</a>
                <a href="./guide.html#consult" className="text-link inline-flex items-center text-base">咨询与安装说明 →</a>
                <a href={SITE.issuesUrl} className="text-link inline-flex items-center text-base">提交问题反馈 →</a>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                ['预约演示', '适合需要先确认流程、场景和安全要求的团队'],
                ['提交需求', '适合梳理部门场景、数据要求和定制诉求'],
                ['问题反馈', '适合安装报错、模型接入异常和使用问题上报'],
              ].map(([title, desc]) => (
                <div key={title} className="surface-card px-5 py-4">
                  <p className="text-sm font-semibold text-brand-dark">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal mt-10 rounded-[32px] border border-white/80 bg-white/85 p-8 shadow-[0_18px_40px_rgba(19,40,110,0.08)] backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-brand-dark">版本说明</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            当前版本 {SITE.version}，优先提供 macOS 双架构安装包。Windows 64 位安装包会随着发布节奏继续补齐；
            若你更关心首次部署、模型配置或权限说明，建议先阅读安装指南。
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
