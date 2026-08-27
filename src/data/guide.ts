import { SITE } from './site';

export interface GuideStep {
  /** 步骤编号。 */
  no: string;
  /** 步骤标题。 */
  title: string;
  /** 步骤说明。 */
  desc: string;
}

export interface GuideSection {
  /** 分区标题。 */
  title: string;
  /** 分区说明。 */
  desc: string;
  /** 分区条目。 */
  items: string[];
}

export const INSTALL_STEPS: GuideStep[] = [
  {
    no: '01',
    title: '下载对应系统安装包',
    desc: '优先选择与你设备架构匹配的安装包。macOS 当前提供 Apple Silicon 与 Intel 两类构建；Windows 版本按发布计划逐步补齐。',
  },
  {
    no: '02',
    title: '完成安装并首次启动',
    desc: '首次启动时建议保留默认安装目录，并确认应用拥有读取本地工作区与文档的基础权限。macOS 若提示证书无法验证，可参考下方「macOS 证书与安全提示」跳过检查。',
  },
  {
    no: '03',
    title: '配置模型服务',
    desc: '在系统设置中填写模型服务信息，例如 provider、baseUrl、apiKey 与 modelId；也可以接入内网模型服务。',
  },
  {
    no: '04',
    title: '创建工作区并导入资料',
    desc: '把常用项目目录、制度文档或资料文件夹纳入工作区和知识库，后续问答与整理可以直接围绕本地资料展开。',
  },
  {
    no: '05',
    title: '开始使用公文、知识库与多助手能力',
    desc: '建议先从一个明确任务开始，例如起草通知、检索制度、整理材料或创建定时任务，便于快速熟悉产品节奏。',
  },
];

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    title: '首次配置模型',
    desc: '模型配置是首次可用的关键步骤，建议优先准备以下信息：',
    items: ['模型服务地址（baseUrl）', '访问密钥（apiKey）', '模型名称（modelId）', '提供方标识（providerId 或兼容协议）'],
  },
  {
    title: '常见问题排查',
    desc: '遇到异常时可优先检查以下几项：',
    items: ['系统版本和安装包架构是否匹配', '是否已完成模型配置', '是否具备工作区目录的读取权限', '首次运行时是否被系统安全策略拦截'],
  },
  {
    title: 'macOS 证书与安全提示',
    desc: '当前 macOS 构建包未经 Apple 公证，首次打开可能被 Gatekeeper 拦截。按以下任一方式跳过证书检查：',
    items: [
      '右键（或按住 Control 点击）应用图标 → 选择“打开”，在弹窗中再次确认“打开”',
      '若仍被拦截：系统设置 → 隐私与安全性 → 找到 Gwork 并点击“仍要打开”',
      '进阶方式：终端执行 sudo xattr -d com.apple.quarantine /Applications/Gwork.app（仅需一次，请将路径替换为实际安装位置）',
      '正式版将逐步完成签名与公证，届时不再需要跳过检查',
    ],
  },
  {
    title: '更新方式',
    desc: '当前版本按发布页提供构建包，并支持应用内更新提醒；建议：',
    items: ['关注 GitHub Releases 获取最新版本', '升级前备份关键工作区与资料目录', '升级后确认模型配置与工作区路径保持正常'],
  },
  {
    title: '权限说明',
    desc: 'Gwork 在桌面端主要会接触以下权限与目录：',
    items: ['本地工作区目录读取与写入', '知识库资料目录扫描', '与已配置模型服务建立网络连接', '在需要时调用浏览器、文件或定时任务等扩展能力'],
  },
];

export const CONSULT_OPTIONS = [
  {
    title: '预约演示',
    desc: '适合在正式部署前先了解产品能力边界、典型流程和落地方式。',
    action: '查看场景页',
    href: './scenarios.html',
  },
  {
    title: '提交需求',
    desc: '适合整理业务背景、部门场景、数据安全要求与现有流程后统一反馈。',
    action: '提交 Issue / 需求',
    href: SITE.issuesUrl,
  },
  {
    title: '问题反馈',
    desc: '安装报错、模型接入异常或使用问题，建议附上系统版本、截图与复现步骤。',
    action: '前往反馈入口',
    href: SITE.issuesUrl,
  },
] as const;
