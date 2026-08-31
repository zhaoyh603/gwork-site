export interface FaqItem {
  /** FAQ 分类。 */
  category: string;
  /** 问题标题。 */
  question: string;
  /** 答案内容。 */
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    category: '安装使用',
    question: '是否必须联网才能使用？',
    answer: '不一定。首次配置云端模型时需要联网；如果接入的是内网模型或本地可访问的模型服务，日常办公流程可以在受控网络环境中完成。本地知识库、工作区与会话数据默认保留在本机。',
  },
  {
    category: '数据安全',
    question: '数据会上传到第三方云端吗？',
    answer: '工作区、知识库和会话记录可以保存在本机。只有在你主动配置并调用云端模型、网页检索或联网工具时，相关请求才会发送到对应服务。对于内网或私有部署场景，可以只使用受控模型与本地资料。',
  },
  {
    category: '模型配置',
    question: '支持哪些模型厂商？',
    answer: 'Gwork 支持按提供方与模型配置进行接入，适配主流模型厂商与 OpenAI 兼容接口。官网第一版重点建议的使用方向包括 DeepSeek、通义、智谱、Kimi 等，也支持按 baseUrl、modelId 和 provider 配置自定义模型接入。',
  },
  {
    category: '平台兼容',
    question: 'Windows 和 macOS 有什么区别？',
    answer: '产品能力保持一致，都是桌面端 AI 办公助手。当前发布资料已提供 macOS arm64 / x64 构建包，Windows 64 位安装包按发布节奏逐步补齐；功能说明、安装步骤和使用流程可保持统一。',
  },
  {
    category: '故障排查',
    question: '安装失败或启动失败怎么办？',
    answer: '建议先检查操作系统版本、磁盘空间、应用权限和安装包是否完整。若仍无法处理，可通过问题反馈入口提交系统版本、安装包类型、报错截图与复现步骤。',
  },
  {
    category: '部署方式',
    question: '是否支持私有部署或内网使用？',
    answer: '支持。Gwork 的桌面数据、工作区与知识库可以本地保存；如果模型服务部署在内网，也可以按内网地址接入，适合安全要求更高的政企办公环境。',
  },
];
