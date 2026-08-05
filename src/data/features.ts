export interface Feature {
  /** 序号（01-07，卡片上展示） */
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
    desc: '起草公文、整理材料、润色文稿，一句话交代，格式规范不用愁。',
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
    title: '数据本地安全',
    desc: '资料全部存在本机，不经过第三方云端，敏感数据不出内网。',
    scenario: '涉密材料、内部敏感资料处理',
  },
  {
    no: '04',
    title: '可扩展生态',
    desc: '能力插件可插拔：网页、文件、邮件、定时任务，按需启用不臃肿。',
    scenario: '按需扩展能力、自定义工作流',
  },
  {
    no: '05',
    title: '自定义模型厂商',
    desc: '自由接入主流大模型，含 DeepSeek、通义、智谱、Kimi 等国产品牌。',
    scenario: '按预算与场景自由选模型',
  },
  {
    no: '06',
    title: '多工作区',
    desc: '按项目、部门建独立工作区，上下文互不干扰，切换即隔离。',
    scenario: '多项目并行、部门间资料隔离',
  },
  {
    no: '07',
    title: '自带知识库',
    desc: '本地知识库随取随用，内部资料直接问答，回答有据可依。',
    scenario: '内部资料检索、规章制度问答',
  },
];
