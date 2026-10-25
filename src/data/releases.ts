export interface ReleaseArtifact {
  /** 构建名称。 */
  name: string;
  /** 平台说明。 */
  platform: string;
  /** 文件大小。 */
  size: string;
  /** 是否已提供下载。 */
  available: boolean;
  /** 安装包直链（更新服务器）。 */
  url: string;
}

export interface ReleaseLogItem {
  /** 时间标签。 */
  date: string;
  /** 模块标题。 */
  title: string;
  /** 更新内容。 */
  items: string[];
}

/** 更新服务基址：安装包与版本清单的发布地（发版流程 SSOT），官网同源读取。 */
export const UPDATE_BASE = 'https://updates.gworkai.cn';

export interface ReleaseFile {
  /** 相对文件名。 */
  url: string;
  /** 字节数。 */
  size: number;
}

/** 解析 electron-builder 生成的 yml 清单（latest-mac.yml / latest.yml，格式稳定）。 */
export function parseReleaseManifest(raw: string): { version: string; files: ReleaseFile[] } {
  const version = raw.match(/^version:\s*(\S+)/m)?.[1] ?? '';
  const files = [...raw.matchAll(/^ {2}- url: (\S+)$\n\s+sha512: \S+\n\s+size: (\d+)/gm)].map((m) => ({
    url: m[1],
    size: Number(m[2]),
  }));
  return { version, files };
}

/** 按安装包文件名归类平台；未识别返回 null（如 zip/blockmap，官网卡片只给安装包）。 */
export function matchArtifact(url: string): Omit<ReleaseArtifact, 'url' | 'size'> | null {
  if (url.endsWith('-mac-arm64.dmg')) return { name: 'macOS Apple Silicon', platform: 'arm64 DMG', available: true };
  if (url.endsWith('-mac-x64.dmg')) return { name: 'macOS Intel', platform: 'x64 DMG', available: true };
  if (url.endsWith('.exe')) return { name: 'Windows 64 位', platform: 'x64 安装包', available: true };
  if (url.endsWith('-linux-amd64.deb')) return { name: 'Linux', platform: 'x86_64 deb', available: true };
  return null;
}

/** 字节数转展示文案，如 470399739 → 约 449 MB。 */
export function formatSize(bytes: number): string {
  return `约 ${Math.round(bytes / 1024 / 1024)} MB`;
}

export const RELEASE_ARTIFACTS: ReleaseArtifact[] = [
  { name: 'macOS Apple Silicon', platform: 'arm64 DMG', size: '约 459 MB', available: true, url: `${UPDATE_BASE}/Gwork-0.9.6-mac-arm64.dmg` },
  { name: 'macOS Intel', platform: 'x64 DMG', size: '约 480 MB', available: true, url: `${UPDATE_BASE}/Gwork-0.9.6-mac-x64.dmg` },
  { name: 'Windows 64 位', platform: 'x64 安装包', size: '约 627 MB', available: true, url: `${UPDATE_BASE}/Gwork-0.9.6-x64.exe` },
  { name: 'Linux', platform: 'x86_64 deb', size: '约 270 MB', available: true, url: `${UPDATE_BASE}/Gwork-1.3.0-linux-amd64.deb` },
];

/** 卡片内可选下载变体（同一系统的不同架构/格式）。 */
export interface ReleaseVariant {
  /** 下拉里的显示名（如 Apple 芯片（arm64））。 */
  label: string;
  /** 文件大小文案。 */
  size: string;
  /** 安装包直链。 */
  url: string;
}

/** 下载卡片：一张卡 = 一个系统；mac 双架构收进同一张卡的下拉。 */
export interface ReleaseCard {
  name: string;
  variants: ReleaseVariant[];
}

/**
 * 三张固定卡片的静态兜底（动态清单取不到对应文件时逐项回落）。
 * Linux 清单可能晚于客户端上线（首版补传），故不能依赖动态清单出现才渲染卡片。
 */
const STATIC_CARDS: ReleaseCard[] = [
  {
    name: 'macOS',
    variants: [
      { label: 'Apple 芯片（arm64）', size: '约 459 MB', url: `${UPDATE_BASE}/Gwork-0.9.6-mac-arm64.dmg` },
      { label: 'Intel 芯片（x64）', size: '约 480 MB', url: `${UPDATE_BASE}/Gwork-0.9.6-mac-x64.dmg` },
    ],
  },
  {
    name: 'Windows',
    variants: [{ label: '64 位安装包', size: '约 627 MB', url: `${UPDATE_BASE}/Gwork-0.9.6-x64.exe` }],
  },
  {
    name: 'Linux',
    variants: [{ label: 'Ubuntu、Debian、统信 UOS、银河麒麟', size: '约 270 MB（deb 安装包）', url: `${UPDATE_BASE}/Gwork-1.3.0-linux-amd64.deb` }],
  },
];

/**
 * 把清单里的产物组合成三张固定卡片：动态清单命中的变体用线上大小/地址，
 * 未命中（如 Linux 清单暂缺）回落静态兜底——保证卡片结构与顺序稳定。
 */
export function buildCards(artifacts: ReleaseArtifact[]): ReleaseCard[] {
  const byName = new Map(artifacts.map((a) => [a.name, a]));
  const pick = (name: string, fallback: ReleaseVariant): ReleaseVariant => {
    const hit = byName.get(name);
    return hit ? { label: fallback.label, size: hit.size, url: hit.url } : fallback;
  };
  const [mac, win, linux] = STATIC_CARDS;
  return [
    { name: mac.name, variants: [pick('macOS Apple Silicon', mac.variants[0]), pick('macOS Intel', mac.variants[1])] },
    { name: win.name, variants: [pick('Windows 64 位', win.variants[0])] },
    { name: linux.name, variants: [pick('Linux', linux.variants[0])] },
  ];
}

/** 解析 CHANGELOG.md（## 版本（日期） + - 条目，标题与条目间允许空行），兼容全/半角括号。 */
export function parseChangelog(raw: string): ReleaseLogItem[] {
  return raw
    .split(/^## /m)
    .slice(1)
    .map((block) => {
      const [header, ...rest] = block.split('\n');
      const m = header.match(/^([^\s（(]+)[（(]([^）)]+)[)）]/);
      if (!m) return null;
      return {
        date: m[2],
        title: `版本 ${m[1]}`,
        items: rest.map((l) => l.replace(/^-\s*/, '').trim()).filter(Boolean),
      };
    })
    .filter((l): l is ReleaseLogItem => l !== null);
}

/** 静态兜底：仅当更新服务器清单与 CHANGELOG 都拉取失败时展示。 */
export const RELEASE_LOGS: ReleaseLogItem[] = [
  {
    date: '2026-08-21',
    title: '版本 0.9.6',
    items: [
      '新增 Windows 64 位安装包，macOS / Windows 双平台可用',
      '关于页新增更新记录，可查看历次版本改进',
      '应用更新源切换为国内服务器，检查和下载新版本更快',
      '粘贴文件时自动插入完整路径，分享文件更可靠',
      '执行命令时增加安全校验，防止越界访问其他位置的文件',
      '修复工作区切换、知识库入口与 wiki 中文命名等问题',
    ],
  },
];
