import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { SITE } from '../data/site';

function DownloadButton({ os, desc }: { os: string; desc: string }) {
  const href = SITE.github ? `${SITE.github}/releases` : '';
  const ready = Boolean(href);
  return (
    <a
      href={href || '#'}
      aria-disabled={!ready}
      className={
        ready
          ? 'flex items-center justify-center rounded-md bg-brand px-8 py-5 text-white shadow-sm transition-colors hover:bg-brand-hover'
          : 'flex cursor-not-allowed items-center justify-center rounded-md border border-line bg-paper px-8 py-5 text-ink-soft'
      }
    >
      <div className="text-left">
        <p className="text-lg font-medium">{os} 版</p>
        <p className="text-sm opacity-80">{ready ? desc : '敬请期待'}</p>
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

export default function Download() {
  return (
    <div className="min-h-screen">
      <Nav active="download" />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-brand">获取 Gwork</p>
          <h1 className="text-4xl font-semibold text-brand-dark">下载 Gwork {SITE.version}</h1>
          <p className="mt-4 text-base text-ink-soft">本地安装，免费使用，支持 macOS 与 Windows。</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
          <DownloadButton os="macOS" desc="Apple Silicon / Intel" />
          <DownloadButton os="Windows" desc="64 位安装包" />
        </div>

        <section className="mt-16 rounded-lg border border-line bg-paper p-8">
          <h2 className="text-xl font-semibold text-brand-dark">系统要求</h2>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {REQUIREMENTS.map(([k, v]) => (
                <tr key={k} className="border-b border-line last:border-b-0">
                  <td className="w-32 py-3 font-medium text-brand-dark">{k}</td>
                  <td className="py-3 text-ink">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-10 rounded-lg border border-line bg-paper p-8">
          <h2 className="text-xl font-semibold text-brand-dark">版本说明</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            当前版本 {SITE.version}。更新日志见
            {SITE.github ? (
              <a className="text-brand hover:text-brand-hover" href={`${SITE.github}/releases`}> GitHub Releases</a>
            ) : (
              ' GitHub Releases（即将开放）'
            )}
            ，应用内也支持自动更新提醒。
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
