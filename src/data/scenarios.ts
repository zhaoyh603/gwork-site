export interface ScenarioFeature {
  /** 功能点名称。 */
  title: string;
  /** 功能点一句话说明。 */
  desc: string;
}

export interface Scenario {
  /** 锚点 id，承接首页场景卡链接。 */
  id: string;
  /** 场景标题。 */
  title: string;
  /** 场景标签，用于快速识别。 */
  kicker: string;
  /** 面向对象。 */
  audience: string;
  /** 场景概述。 */
  summary: string;
  /** 推荐使用流程。 */
  workflow: string[];
  /** 典型产出。 */
  outcomes: string[];
  /** 用到的主要功能。 */
  features: ScenarioFeature[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'gongwen',
    kicker: '政务公文写作',
    title: '通知、纪要、报告快速起草',
    audience: '办公室、公文岗、综合处室',
    summary: '把“起草、润色、提纲整理、格式规范”放在一个工作区里连续完成，适合日常通知、会议纪要和专题报告场景。',
    workflow: ['输入任务目标与对象', '让助手生成正文框架与要点', '对草稿进行润色并输出成稿'],
    outcomes: ['通知初稿', '会议纪要提纲', '汇报材料润色稿'],
    features: [
      { title: '公文助手', desc: '一句话交代，先问清、再下笔，按体例起草、润色、列提纲' },
      { title: '多助手协同', desc: '材料归集、要点提取交给子助手并行跑' },
      { title: '文件浏览', desc: '本地文件直接引用，附件随手插入' },
    ],
  },
  {
    id: 'zhishi',
    kicker: '企业知识库问答',
    title: '制度、资料、项目文档随问随答',
    audience: '行政、法务、运营、项目团队',
    summary: '把本地资料加入知识库后，Gwork 可以在问答时自动检索资料来源，适合制度查询、项目资料查阅和业务标准问答。',
    workflow: ['导入本地文档或资料目录', '围绕具体问题发起问答', '查看回答与引用来源并继续追问'],
    outcomes: ['制度问答结果', '文档摘要', '带引用依据的回答'],
    features: [
      { title: '多知识库', desc: '按部门、按制度类型分开建库，互不串扰' },
      { title: '知识图谱', desc: '资料关系一目了然，顺藤摸瓜找依据' },
      { title: '回答带出处', desc: '引用来源可查，回答有据可依' },
    ],
  },
  {
    id: 'cailiao',
    kicker: '多助手材料整理',
    title: '复杂任务拆开并行推进',
    audience: '综合管理、方案岗、售前与交付团队',
    summary: '面对多个资料源或多步骤任务时，可让主助手拆分任务给子助手并行执行，再统一回收结果，适合材料归集、方案整理和资料比对。',
    workflow: ['主助手拆分检索、归类、润色子任务', '子助手分别处理各自任务', '主助手汇总结果并输出统一结论'],
    outcomes: ['材料清单', '方案摘要', '多来源对比结果'],
    features: [
      { title: '子智能体', desc: '检索、整理、润色各领一摊，互不干扰' },
      { title: '多任务并行', desc: '多线同时跑，不等不堵' },
      { title: '多标签工作区', desc: '任务独立成页，跨页随时调用' },
    ],
  },
  {
    id: 'dingshi',
    kicker: '定时任务',
    title: '周报汇总、资料归档，到点自动跑',
    audience: '办公室、综合处室、项目团队',
    summary: '把重复性、周期性的事务（周报汇总、资料归档、定期检查）交给定时任务，到点自动执行，结果留在本地，执行记录随时可查。',
    workflow: ['设定触发时间与任务内容', '任务到点自动执行', '查看执行结果与记录'],
    outcomes: ['周报汇总稿', '归档后的资料目录', '定时任务执行记录'],
    features: [
      { title: '到点自动执行', desc: '设置好就忘，结果自动交付' },
      { title: '执行记录可回溯', desc: '跑了什么、结果如何，随时查看' },
      { title: '多任务编排', desc: '多个定时任务各管各的，互不影响' },
    ],
  },
];
