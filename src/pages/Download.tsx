import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { SITE } from '../data/site';
import {
  RELEASE_ARTIFACTS,
  RELEASE_LOGS,
  UPDATE_BASE,
  type ReleaseArtifact,
  type ReleaseLogItem,
  formatSize,
  matchArtifact,
  parseChangelog,
  parseReleaseManifest,
} from '../data/releases';
import { useReveal } from '../hooks/useReveal';

type PlatformKey = 'mac' | 'win' | 'linux';

/** 按浏览器 UA 判断访问者系统；判断不出时默认 Linux（余下情况多为 Linux 桌面）。 */
function detectPlatform(): PlatformKey {
  const ua = navigator.userAgent;
  if (/Macintosh|Mac OS X/i.test(ua)) return 'mac';
  if (/Windows/i.test(ua)) return 'win';
  return 'linux';
}

/**
 * mac 默认变体：默认 Apple 芯片（在售机型主流），仅在明确识别为 x86 时选 Intel。
 * Chromium 系读 userAgentData.architecture；Safari/Firefox 无该字段时同样落到 Apple 芯片。
 */
function detectMacVariantIndex(): number {
  const uaData = (navigator as Navigator & { userAgentData?: { architecture?: string } }).userAgentData;
  return uaData?.architecture === 'x86' ? 1 : 0;
}

const PLATFORM_LABEL: Record<PlatformKey, string> = { mac: 'macOS', win: 'Windows', linux: 'Linux' };
const PLATFORM_META: Record<PlatformKey, string> = {
  mac: 'macOS 12 及以上',
  win: 'Windows 10 及以上',
  linux: 'Ubuntu 20.04+ / Debian 10+ / 统信 UOS 20 / 银河麒麟 V10 · 仅 x86_64 架构',
};

const REQUIREMENTS: Array<[string, string]> = [
  ['操作系统', 'macOS 12 及以上 / Windows 10 及以上 / Ubuntu 20.04+、Debian 10+、统信 UOS 20、银河麒麟 V10（x86_64）'],
  ['内存', '8 GB 及以上'],
  ['硬盘空间', '2 GB 可用空间'],
  ['Linux CPU', '支持 x86_64 架构：Intel、AMD、海光、兆芯；暂不支持飞腾、鲲鹏（ARM）与龙芯'],
];

/**
 * 拉取更新服务器版本清单（mac + Windows + Linux）与更新记录（CHANGELOG.md）。
 * Linux 清单可能晚于客户端上线（首版补传），404 视为空清单不阻断其他平台。
 */
function useDynamicRelease(): { version: string; artifacts: ReleaseArtifact[]; changelog: ReleaseLogItem[] } | null {
  const [dynamic, setDynamic] = useState<{
    version: string;
    artifacts: ReleaseArtifact[];
    changelog: ReleaseLogItem[];
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`${UPDATE_BASE}/latest-mac.yml`).then((r) => r.text()),
      fetch(`${UPDATE_BASE}/latest.yml`).then((r) => r.text()),
      fetch(`${UPDATE_BASE}/latest-linux.yml`).then((r) => (r.ok ? r.text() : '')).catch(() => ''),
      fetch(`${UPDATE_BASE}/CHANGELOG.md`).then((r) => r.text()),
    ])
      .then(([macYml, winYml, linuxYml, changelogRaw]) => {
        if (cancelled) return;
        const mac = parseReleaseManifest(macYml);
        const win = parseReleaseManifest(winYml);
        const linux = parseReleaseManifest(linuxYml);
        const artifacts: ReleaseArtifact[] = [];
        for (const file of [...mac.files, ...win.files, ...linux.files]) {
          const meta = matchArtifact(file.url);
          if (meta) artifacts.push({ ...meta, size: formatSize(file.size), url: `${UPDATE_BASE}/${file.url}` });
        }
        const changelog = parseChangelog(changelogRaw).slice(0, 4);
        if (artifacts.length > 0) {
          setDynamic({ version: mac.version || win.version || linux.version, artifacts, changelog });
        }
      })
      .catch((error) => {
        // 有意兜底：更新服务器拉取失败降级静态版本，不打扰用户；留痕便于排查
        console.warn('[download] 更新服务器拉取失败，使用静态版本', error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return dynamic;
}

/** 下载页：系统优先——识别访问者系统后给一个主下载入口，其余平台以细线列表列出。 */
export default function Download() {
  const revealRef = useReveal<HTMLDivElement>();
  const dynamic = useDynamicRelease();
  const version = dynamic?.version ?? SITE.version;
  const artifacts = dynamic?.artifacts ?? RELEASE_ARTIFACTS;
  const logs = dynamic?.changelog.length ? dynamic.changelog : RELEASE_LOGS;

  const platform = detectPlatform();
  const [macVariant, setMacVariant] = useState(() => detectMacVariantIndex());

  const byName = (name: string): ReleaseArtifact | undefined => artifacts.find((a) => a.name === name);
  const macVariants = [byName('macOS Apple Silicon'), byName('macOS Intel')].filter(
    (a): a is ReleaseArtifact => Boolean(a),
  );
  const primary =
    platform === 'mac'
      ? macVariants[macVariant] ?? macVariants[0]
      : platform === 'win'
        ? byName('Windows 64 位')
        : byName('Linux');
  const others = (['mac', 'win', 'linux'] as PlatformKey[]).filter((p) => p !== platform);

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="download" />
      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* Hero：左对齐，纸面气质 */}
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.14em] text-brand">获取 Gwork</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-brand-dark lg:text-5xl">下载 Gwork {version}</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
            本地安装，数据留在本机。支持 macOS、Windows 与 Linux。
          </p>
        </section>

        {/* 主下载：识别结果 + 唯一朱砂 CTA */}
        <section className="reveal mt-10 rounded-xl border border-line p-8">
          <p className="text-xs uppercase tracking-[0.12em] text-ink-muted">检测到你的系统</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-serif text-2xl text-brand-dark">{PLATFORM_LABEL[platform]}</p>
              <p className="mt-1 text-sm text-ink-soft">{PLATFORM_META[platform]}</p>
              {platform === 'linux' ? (
                <p className="mt-1 text-xs text-ink-muted">CPU 需为 x86_64：Intel、AMD、海光、兆芯；飞腾、鲲鹏（ARM）与龙芯暂不支持</p>
              ) : null}
              {platform === 'mac' && macVariants.length > 1 ? (
                <label className="mt-4 block">
                  <span className="sr-only">选择芯片</span>
                  <select
                    value={macVariant}
                    onChange={(e) => setMacVariant(Number(e.target.value))}
                    className="select-plain cursor-pointer rounded-full border border-line bg-white py-2 pl-4 pr-9 text-sm text-ink outline-none focus:border-brand"
                  >
                    <option value={0}>Apple 芯片（arm64）</option>
                    <option value={1}>Intel 芯片（x64）</option>
                  </select>
                </label>
              ) : null}
            </div>
            <div className="text-right">
              {primary ? (
                <>
                  <p className="mb-3 text-xs text-ink-muted">{primary.size}</p>
                  <a
                    href={primary.url}
                    className="btn-shine inline-flex min-h-[48px] items-center justify-center rounded-full px-8 text-base font-medium text-white transition-opacity hover:opacity-90"
                  >
                    下载 {PLATFORM_LABEL[platform]} 版
                  </a>
                </>
              ) : (
                <p className="text-sm text-ink-muted">该平台安装包暂未发布</p>
              )}
            </div>
          </div>
        </section>

        {/* 其他平台：细线列表 */}
        <section className="reveal mt-10">
          <h2 className="text-xs uppercase tracking-[0.12em] text-ink-muted">其他平台</h2>
          <div className="mt-3 border-t border-line">
            {others.map((p) => {
              const artifact =
                p === 'win' ? byName('Windows 64 位') : p === 'mac' ? macVariants[0] : byName('Linux');
              return (
                <div key={p} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4">
                  <div>
                    <p className="font-medium text-brand-dark">{PLATFORM_LABEL[p]}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{PLATFORM_META[p]}</p>
                    {p === 'linux' ? (
                      <p className="mt-0.5 text-xs text-ink-muted">CPU 需为 x86_64：Intel、AMD、海光、兆芯；飞腾、鲲鹏（ARM）与龙芯暂不支持</p>
                    ) : null}
                  </div>
                  {artifact ? (
                    <a href={artifact.url} className="text-link text-sm">
                      下载 {p === 'linux' ? 'deb' : PLATFORM_LABEL[p]} →
                    </a>
                  ) : (
                    <span className="text-sm text-ink-muted">暂未发布</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 系统要求 + 安装引导：细线两栏 */}
        <section className="reveal mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-xl text-brand-dark">系统要求</h2>
            <dl className="mt-4">
              {REQUIREMENTS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[88px_1fr] gap-4 border-b border-line py-3 last:border-b-0">
                  <dt className="text-sm text-ink-muted">{k}</dt>
                  <dd className="text-sm leading-6 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-serif text-xl text-brand-dark">安装引导</h2>
            <ol className="mt-4">
              {['完成安装并首次启动应用', '按引导配置模型服务', '创建工作区并导入常用资料', '从一个明确任务开始试跑'].map(
                (item, i) => (
                  <li key={item} className="flex gap-4 border-b border-line py-3 last:border-b-0">
                    <span className="text-sm text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm leading-6 text-ink">{item}</span>
                  </li>
                ),
              )}
            </ol>
            <a href="./guide.html" className="text-link mt-4 inline-flex text-sm">
              查看使用指南 →
            </a>
          </div>
        </section>

        {/* 版本日志：细线列表 */}
        <section className="reveal mt-14 border-t border-line pt-10">
          <h2 className="font-serif text-xl text-brand-dark">更新记录</h2>
          <div className="mt-4">
            {logs.map((log) => (
              <article key={log.title} className="border-b border-line py-6 last:border-b-0">
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="font-medium text-brand-dark">{log.title}</h3>
                  <p className="text-xs text-ink-muted">{log.date}</p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {log.items.map((item) => (
                    <li key={item} className="text-sm leading-6 text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* 咨询入口：一行链接 */}
        <section className="reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-ink-muted">试用、内网部署或采购前评估：</span>
          <a href="./scenarios.html" className="text-link">
            查看典型场景 →
          </a>
          <a href={SITE.contactUrl} className="text-link">
            联系我们 →
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
