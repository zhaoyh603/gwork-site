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

const UPDATE_BASE = 'https://updates.oeerp.com';

export const RELEASE_ARTIFACTS: ReleaseArtifact[] = [
  { name: 'macOS Apple Silicon', platform: 'arm64 DMG', size: '约 459 MB', available: true, url: `${UPDATE_BASE}/Gwork-0.9.6-mac-arm64.dmg` },
  { name: 'macOS Intel', platform: 'x64 DMG', size: '约 480 MB', available: true, url: `${UPDATE_BASE}/Gwork-0.9.6-mac-x64.dmg` },
  { name: 'Windows 64 位', platform: 'x64 安装包', size: '约 627 MB', available: true, url: `${UPDATE_BASE}/Gwork-0.9.6-x64.exe` },
];

export const RELEASE_LOGS: ReleaseLogItem[] = [
  {
    date: '2026-08-21',
    title: '当前版本 0.9.6',
    items: [
      '新增 Windows 64 位安装包，macOS / Windows 双平台可用',
      '关于页新增更新记录，可查看历次版本改进',
      '应用更新源切换为国内服务器，检查和下载新版本更快',
      '粘贴文件时自动插入完整路径，分享文件更可靠',
      '执行命令时增加安全校验，防止越界访问其他位置的文件',
      '修复工作区切换、知识库入口与 wiki 中文命名等问题',
    ],
  },
  {
    date: '近期重点',
    title: '最近更新内容',
    items: ['强化多助手协同执行与子任务分工体验', '继续完善知识库问答与本地资料检索能力', '补充桌面版发布产物与下载说明'],
  },
  {
    date: '稳定性',
    title: '已修复 / 优化方向',
    items: ['优化版本展示与发布信息的一致性', '改进打包产物命名和多架构发布整理', '持续提升大体积运行时资源的获取稳定性'],
  },
  {
    date: '下一步',
    title: '下个版本计划',
    items: ['补齐 Windows 64 位安装包对外发布', '完善官网安装文档、FAQ 与典型场景说明', '继续增强安全、知识库与更新体验'],
  },
];
