export type MockVariant = 'workspace' | 'secretary' | 'kb';

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
};

export default function ScreenMock({ variant = 'workspace' }: { variant?: MockVariant }) {
  const v = VARIANTS[variant];
  return (
    <div className="overflow-hidden rounded-lg border border-line shadow-md">
      {/* 窗口栏 */}
      <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 text-xs text-ink-soft">Gwork 工作台</span>
      </div>
      {/* tab 栏 */}
      <div className="flex gap-1 border-b border-line bg-white px-4 pt-2">
        {v.tabs.map((tab, i) => (
          <span
            key={tab}
            className={
              i === v.active
                ? 'rounded-t border border-line border-b-white px-3 py-1.5 text-xs font-medium text-brand'
                : 'px-3 py-1.5 text-xs text-ink-soft'
            }
          >
            {tab}
          </span>
        ))}
      </div>
      {/* 对话区 */}
      <div className="space-y-3 bg-white px-6 py-5">
        {v.lines.map((line, i) => (
          <div
            key={line}
            className={
              i % 2 === 0
                ? 'ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-brand px-4 py-2.5 text-xs leading-relaxed text-white'
                : 'max-w-[85%] rounded-lg rounded-bl-sm border border-line bg-paper px-4 py-2.5 text-xs leading-relaxed text-ink'
            }
          >
            {line}
          </div>
        ))}
      </div>
      {/* 输入条 */}
      <div className="border-t border-line bg-paper px-4 py-3">
        <div className="h-8 rounded-md border border-line bg-white px-3 text-xs leading-8 text-ink-soft">
          输入任务，例如：起草一份会议通知…
        </div>
      </div>
    </div>
  );
}
