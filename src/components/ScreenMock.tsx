import { useState } from 'react';

export type MockVariant = 'workspace' | 'secretary' | 'kb' | 'security';

/** 真实产品截图（素材未采集/加载失败时回退下方 CSS 模拟） */
const REAL_SHOTS: Partial<Record<MockVariant, string>> = {
  workspace: '/screenshots/workspace.png',
  secretary: '/screenshots/secretary.png',
  kb: '/screenshots/kb.png',
  security: '/screenshots/security.png',
};

const VARIANTS: Record<MockVariant, { tabs: string[]; lines: string[]; active: number }> = {
  workspace: {
    tabs: ['工作区 · 年度总结', '助手 · 材料整理', '定时任务'],
    lines: ['帮我整理这季度的项目材料，按条理列出来', '已整理完成，共 12 份材料，要点如下：…', '任务「每周五汇总周报」已按时执行'],
    active: 0,
  },
  secretary: {
    tabs: ['公文助手', '材料整理', '知识库'],
    lines: ['起草一份关于推进信息化建设的通知', '已生成草稿：标题、主送单位、正文框架、落款齐全', '可一键套用单位公文格式'],
    active: 0,
  },
  kb: {
    tabs: ['知识库 · 规章制度', '搜索', '定时任务'],
    lines: ['检索「差旅报销标准」', '共找到 3 份相关制度，最新一份为 2026 年修订版：…', '引用来源：机关差旅管理办法.docx'],
    active: 0,
  },
  security: {
    tabs: ['安全中心', '审批记录', '审计日志'],
    lines: ['网络访问规则：已限制非白名单域名', '命令执行审批：待批准 2 条，已批准 15 条', '删除保护已开启，敏感操作均需确认'],
    active: 0,
  },
};

/** 产品界面示意图：优先使用真实截图，素材缺失时回退轻量卡片模拟。 */
export default function ScreenMock({ variant = 'workspace' }: { variant?: MockVariant }) {
  const v = VARIANTS[variant];
  const realShot = REAL_SHOTS[variant];
  const [shotFailed, setShotFailed] = useState(false);
  if (realShot && !shotFailed) {
    return (
      <img
        src={realShot}
        alt="Gwork 界面截图"
        className="relative w-full rounded-[28px] border border-white/80 shadow-[0_24px_54px_rgba(19,40,110,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(19,40,110,0.22)]"
        onError={() => setShotFailed(true)}
      />
    );
  }
  return (
    <div className="mock-float relative overflow-hidden rounded-[28px] border border-white/80 bg-white/85 shadow-[0_24px_54px_rgba(19,40,110,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(19,40,110,0.22)]">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-brand/10 blur-3xl" />
      {/* 窗口栏 */}
      <div className="relative flex items-center gap-2 border-b border-white/70 bg-gradient-to-r from-surface-soft via-white to-surface-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b81]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbf69]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c76f]" />
        <span className="ml-3 text-xs text-ink-soft">Gwork 工作台</span>
        <span className="ml-auto rounded-full border border-white/80 bg-white/80 px-2.5 py-1 text-[11px] text-brand shadow-sm">
          在线协作中
        </span>
      </div>
      {/* tab 栏 */}
      <div className="flex gap-2 border-b border-brand-glow bg-white/90 px-4 pt-3">
        {v.tabs.map((tab, i) => (
          <span
            key={tab}
            className={
              i === v.active
                ? 'rounded-t-2xl border border-brand-glow border-b-white bg-white px-3 py-2 text-xs font-medium text-brand shadow-[0_-6px_16px_rgba(76,111,255,0.08)]'
                : 'px-3 py-2 text-xs text-ink-soft'
            }
          >
            {tab}
          </span>
        ))}
      </div>
      {/* 对话区 */}
      <div className="space-y-3 bg-gradient-to-b from-white to-surface-soft px-6 py-5">
        {v.lines.map((line, i) => (
          <div
            key={line}
            className={
              i % 2 === 0
                ? 'ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-brand via-brand-hover to-brand-dark px-4 py-3 text-xs leading-relaxed text-white shadow-[0_14px_28px_rgba(52,87,244,0.22)]'
                : 'max-w-[85%] rounded-2xl rounded-bl-md border border-white/80 bg-white/95 px-4 py-3 text-xs leading-relaxed text-ink shadow-[0_12px_24px_rgba(17,35,95,0.08)]'
            }
          >
            {line}
          </div>
        ))}
      </div>
      {/* 输入条 */}
      <div className="border-t border-brand-glow bg-gradient-to-r from-surface-soft to-white px-4 py-4">
        <div className="h-10 rounded-2xl border border-white/80 bg-white/95 px-4 text-xs leading-10 text-ink-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
          输入任务，例如：起草一份会议通知…
        </div>
      </div>
    </div>
  );
}
