export interface Feature {
  /** 序号（01-08，卡片上展示） */
  no: string;
  title: string;
  desc: string;
  /** 适用场景，features 页展示 */
  scenario: string;
}

export const FEATURES: Feature[] = [
  {
    no: '01',
    title: '公文/办公助手',
    desc: '起草材料、整理资料、润色文稿，你交代一句，它先问清、再下笔，格式规范不用愁。',
    scenario: '公文写作、材料整理、文档润色',
  },
  {
    no: '02',
    title: '多助手协同',
    desc: '多标签页工作区，主助手带队、子助手分工，复杂任务拆开并行干。',
    scenario: '复杂任务拆解、多线并行推进',
  },
  {
    no: '03',
    title: '本地与内网安全',
    desc: '工作区、资料、会话都存在自己电脑上，配上内网模型，敏感的活儿也能放心干。',
    scenario: '内网环境、敏感资料处理',
  },
  {
    no: '04',
    title: '按需装能力',
    desc: '网页、文件、邮件、定时任务，想要哪个开哪个，不用就关掉。',
    scenario: '按需扩展能力、自定义工作流',
  },
  {
    no: '05',
    title: '自定义模型厂商',
    desc: '主流大模型都能接：DeepSeek、通义、智谱、Kimi 等国产品牌都在列。',
    scenario: '按预算与场景自由选模型',
  },
  {
    no: '06',
    title: '多工作区',
    desc: '按项目、按部门各建一个工作区，资料和对话互不掺和。',
    scenario: '多项目并行、部门间资料隔离',
  },
  {
    no: '07',
    title: '自带知识库',
    desc: '本地知识库随取随用，内部资料直接问答，回答有据可依。',
    scenario: '内部资料检索、规章制度问答',
  },
  {
    no: '08',
    title: '安全中心与审计',
    desc: '高风险操作先点头、联网有规矩、干过什么都有记录，AI 干活你管得住。',
    scenario: '高安全要求、内网办公、长期稳定使用',
  },
];
