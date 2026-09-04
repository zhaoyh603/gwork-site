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
      {
        id: 'apply-api-key',
        title: '申请 API Key（以 DeepSeek 为例）',
        blocks: [
          {
            kind: 'paragraph',
            text: '用 Gwork 之前，需要先拿到一把访问大模型的「钥匙」——API Key（接口密钥）。可以这样理解：Gwork 是安排活儿的指挥官，大模型是真正干活的引擎，而引擎需要自备——Gwork 本身不提供模型服务，调用产生的费用由模型服务商按用量计收，密钥就是服务商用来确认「是谁在用、如何计费」的凭证。各家服务商的申请方式大同小异，下面以 DeepSeek 为例走一遍。',
          },
          {
            kind: 'steps',
            items: [
              {
                title: '打开 DeepSeek 开放平台',
                desc: '在浏览器地址栏输入 platform.deepseek.com，进入 DeepSeek 的开放平台。',
              },
              {
                title: '注册并登录账号',
                desc: '用手机号即可注册，按页面提示完成验证后登录（以官网实际流程为准）。',
              },
              {
                title: '创建密钥',
                desc: '登录后，点左侧菜单里的「API Keys」，再点「创建 API Key」，稍等片刻会生成一串以「sk-」开头的字符——这就是你的密钥。',
              },
              {
                title: '立即复制保存密钥',
                desc: '密钥只显示这一次，关掉页面就再也看不到了。先把它粘贴到备忘录等地方存好，再进行下一步；万一忘了保存，删掉这个重新创建一个即可。',
              },
            ],
          },
          {
            kind: 'tip',
            text: '密钥一定保管好：它等同于你账户的钥匙，泄露出去别人就能拿它消耗你账户里的余额，不要发到聊天群、不要截图外发。调用模型按用量计费，花费明细可以在平台后台查询。',
          },
          {
            kind: 'links',
            items: [
              { label: 'DeepSeek 开放平台', href: 'https://platform.deepseek.com', external: true },
            ],
          },
        ],
      },
      {
        id: 'config-model',
        title: '在 Gwork 中配置模型',
        blocks: [
          {
            kind: 'paragraph',
            text: '拿到密钥后，这一步把它填进 Gwork。配好之后，对话、写材料、读文件等能力就都接上了。什么时候需要做：第一次使用，或者换了新的模型服务商的时候。',
          },
          {
            kind: 'steps',
            items: [
              {
                title: '打开设置',
                desc: '点 Gwork 左侧栏底部的「设置」按钮，打开「系统设置」窗口。',
              },
              {
                title: '进入模型配置页',
                desc: '点左侧页签里的「模型配置」，保持在「主模型」一栏——这里管理日常对话用的模型。',
              },
              {
                title: '点「+ 添加供应商」并选服务商',
                desc: '点右上角「+ 添加供应商」，会弹出「选择供应商类型」窗口。以 DeepSeek 为例：选中「DeepSeek」，名称、API 地址等内容会自动填好；用其他服务商就选对应的名字，列表里没有的选「自定义」手填。',
              },
              {
                title: '粘贴密钥',
                desc: '在「API 密钥」一栏粘贴刚申请的密钥，可以点输入框右侧的眼睛图标检查是否复制完整。界面会提示「密钥仅保存在本机」，不必担心外泄。',
              },
              {
                title: '选择模型名称',
                desc: '往下找到「角色映射」，给「主模型」填模型名称：点「一键获取模型列表」，Gwork 会从服务商拉取可选模型，在下拉里挑一个即可；拉取不到时，也可以按服务商接入文档的说明手动输入。',
              },
              {
                title: '测试并保存',
                desc: '点窗口底部的「测试」，Gwork 会用这套配置实际发一条消息验证能不能连通；显示正常后点「保存」。',
              },
              {
                title: '设为当前',
                desc: '保存后回到供应商列表，新加的供应商还没有启用，点它右侧的「设为当前」，卡片上出现「当前使用」标记即可。',
              },
              {
                title: '发一句「你好」试试',
                desc: '回到对话窗口，输入「你好」发送，能正常回复就说明配置成功了。',
              },
            ],
          },
          {
            kind: 'image',
            src: 'screenshots/guide-config-model.png',
            alt: 'Gwork 模型配置页',
            caption: '在模型配置页填入密钥与服务信息',
          },
          {
            kind: 'paragraph',
            text: '几个字段是什么意思，帮你判断该怎么填：「API 地址」是模型的接入点网址，每家服务商固定一个，选模板会自动带出，选「自定义」时才需要从服务商的接入文档里抄过来；「API 协议」是 Gwork 与服务商交换信息的格式约定，绝大多数国内服务商选「OpenAI 兼容格式」即可；「名称」是必填的标签，方便你区分多套配置。',
          },
          {
            kind: 'paragraph',
            text: '「角色映射」是给不同场景分配模型：「主模型」负责日常对话，必须填；「快速模型」「子智能体」可以不填，不填时自动使用主模型。模型名称旁的「1M」勾选项，决定一次对话模型能「记住」的内容量，默认 200K，日常使用完全够，只有当模型本身宣称支持百万字长内容时才需要勾选。',
          },
          {
            kind: 'tip',
            text: '发了消息没反应？多数是三处小错：密钥复制不完整（首尾带了空格）、API 地址填错、模型名称拼写不对。回到设置，点该供应商卡片右侧的「✎」图标编辑，对照检查一遍后再点「测试」。',
          },
        ],
      },
      {
        id: 'config-vision-model',
        title: '配置视觉理解模型',
        blocks: [
          {
            kind: 'paragraph',
            text: '视觉理解模型，指能看懂图片的模型——把截图、扫描件发给它，它能描述画面、回答图里的问题。什么时候需要它：想让 Gwork 看懂截图、扫描件、照片里的表格和文字时。',
          },
          {
            kind: 'paragraph',
            text: 'Gwork 怎么判断模型能不能看图？一是内置的模型能力清单（常见模型都收录在内，随版本更新），清单里标注支持看图的会自动开启，不用你设置；二是「多模态」开关，可以手动强制开启。清单里没有的模型（自定义或太新的）默认按「不支持看图」处理——此时发图也不会丢，Gwork 会先用内置的读图工具把图转成文字再交给模型。',
          },
          {
            kind: 'steps',
            items: [
              {
                title: '优先用常见的模型',
                desc: 'Gwork 内置了常见模型的能力清单：你配置的模型如果在清单里且支持看图，发图功能会自动开启，你什么都不用做。',
              },
              {
                title: '拿不准就打开「多模态」开关',
                desc: '进入「设置 → 模型配置」，点该供应商卡片右侧的「✎」图标，在「角色映射」的「主模型」一行勾选「多模态」，再点「保存」。开启后发图片由模型直接看图，不经过读图工具转述。',
              },
            ],
          },
          {
            kind: 'image',
            src: 'screenshots/guide-vision-toggle.png',
            alt: '模型设置中的多模态开关',
            caption: '拿不准时，在供应商编辑窗口的「角色映射」里勾选「多模态」',
          },
          {
            kind: 'steps',
            items: [
              {
                title: '发一张图片试试',
                desc: '回到对话窗口，点输入框下方的「添加图片」，选一张图片（比如一张表格截图），输入「这张图里有什么」，点「发送」。',
              },
              {
                title: '看它能否说出画面要点',
                desc: '它能答出图里的关键内容（比如表格有几列、上面写了什么），说明看图功能已经生效。',
              },
            ],
          },
          {
            kind: 'image',
            src: 'screenshots/guide-chat-vision.png',
            alt: '对话中发图片被正确理解',
            caption: '发一张图，它能描述画面内容',
          },
          {
            kind: 'tip',
            text: '勾了「多模态」但模型本身不支持看图时，发图会失败——换一个支持看图的模型即可。这个能力在识别截图、扫描件、照片里的表格和文字时特别有用。',
          },
        ],
      },
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
