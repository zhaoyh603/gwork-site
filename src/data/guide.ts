import { SITE } from './site';

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
