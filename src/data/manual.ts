/** 配置指南手册数据：内容与骨架分离，页面组件只渲染本文件结构。 */

/** 手册内容基线版本：界面截图与操作步骤对应的产品版本。 */
export const MANUAL_BASELINE_VERSION = '0.9.17';

export interface ParagraphBlock {
  kind: 'paragraph';
  text: string;
}

export interface StepItem {
  /** 步骤标题（动宾短语，如「打开设置」）。 */
  title: string;
  /** 步骤说明：在哪、点什么、会发生什么。 */
  desc: string;
}

export interface StepsBlock {
  kind: 'steps';
  items: StepItem[];
}

export interface ImageBlock {
  kind: 'image';
  /** 相对 public 的路径，如 screenshots/guide-model-config.png。 */
  src: string;
  alt: string;
  caption?: string;
  /** 图片实际像素尺寸：img 尺寸预留，防懒加载时布局偏移（CLS）。截图采集时填实际值。 */
  width?: number;
  height?: number;
}

export interface TipBlock {
  kind: 'tip';
  text: string;
}

export interface LinkItem {
  label: string;
  href: string;
  /** true = 新标签页打开外部网站。 */
  external?: boolean;
}

export interface LinksBlock {
  kind: 'links';
  items: LinkItem[];
}

export type ManualBlock = ParagraphBlock | StepsBlock | ImageBlock | TipBlock | LinksBlock;

export interface ManualSection {
  /** 锚点 id，访问形态 guide.html#<id>。kebab-case。 */
  id: string;
  title: string;
  blocks: ManualBlock[];
}

export interface ManualPart {
  /** 板块锚点 id。 */
  id: string;
  title: string;
  intro: string;
  sections: ManualSection[];
}

export const MANUAL_PARTS: ManualPart[] = [
  {
    id: 'connect-model',
    title: '连接大模型',
    intro: '配置模型是第一次真正用起来的前提，先申请一把「钥匙」，再把它填进 Gwork。',
    sections: [
      { id: 'apply-api-key', title: '申请 API Key（以 DeepSeek 为例）', blocks: [] },
      { id: 'config-model', title: '在 Gwork 中配置模型', blocks: [] },
      { id: 'config-vision-model', title: '配置视觉理解模型', blocks: [] },
    ],
  },
  {
    id: 'core-features',
    title: '核心功能上手',
    intro: '建好资料库、会对话、会用智能体，日常事务就能交给 Gwork 打理。',
    sections: [
      { id: 'create-kb', title: '建立知识库', blocks: [] },
      { id: 'start-chat', title: '完成对话', blocks: [] },
      { id: 'use-subagent', title: '调用智能体', blocks: [] },
    ],
  },
  {
    id: 'productivity',
    title: '效率工具',
    intro: '写材料、拆任务、管文件，这几件工具用顺手后效率翻倍。',
    sections: [
      { id: 'markdown-editor', title: 'Markdown 编辑器', blocks: [] },
      { id: 'task-breakdown', title: '任务分解', blocks: [] },
      { id: 'right-panel', title: '右侧文件面板', blocks: [] },
      { id: 'left-file-tree', title: '左侧文件浏览', blocks: [] },
    ],
  },
  {
    id: 'maintenance-security',
    title: '维护与安全',
    intro: '保持版本最新、确认环境安全，用得放心。',
    sections: [
      { id: 'auto-update', title: '自动更新', blocks: [] },
      { id: 'security-settings', title: '安全设置', blocks: [] },
      { id: 'security-check', title: '安全检查', blocks: [] },
    ],
  },
];
