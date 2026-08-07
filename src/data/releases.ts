export interface ReleaseArtifact {
  /** 构建名称。 */
  name: string;
  /** 平台说明。 */
  platform: string;
  /** 文件大小。 */
  size: string;
  /** 是否已提供下载。 */
  available: boolean;
}

export interface ReleaseLogItem {
  /** 时间标签。 */
  date: string;
  /** 模块标题。 */
  title: string;
  /** 更新内容。 */
  items: string[];
}

export const RELEASE_ARTIFACTS: ReleaseArtifact[] = [
  { name: 'macOS Apple Silicon', platform: 'arm64 DMG / ZIP', size: '约 457 MB - 468 MB', available: true },
  { name: 'macOS Intel', platform: 'x64 DMG / ZIP', size: '约 478 MB - 489 MB', available: true },
  { name: 'Windows 64 位', platform: 'x64 安装包', size: '发布中', available: false },
];

export const RELEASE_LOGS: ReleaseLogItem[] = [
  {
    date: '2026-08-04',
    title: '当前版本 0.9.0',
    items: ['提供 macOS arm64 / x64 双架构构建包', '支持桌面端工作区、多助手协同与知识库能力', '延续桌面产品的本地优先使用方式'],
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
