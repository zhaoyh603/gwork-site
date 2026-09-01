import { useState } from 'react';

export type MockVariant = 'workspace' | 'secretary' | 'kb' | 'security' | 'assistant' | 'model-config' | 'skills';
export type MockDisplayMode = 'hero' | 'feature';

interface ShotMeta {
  src: string;
  heroNote: string;
  heroPosition: string;
  heroScale: number;
  featurePosition: string;
  featureScale: number;
}

/** 真实产品截图配置：统一描述标题、焦点位置与轻微放大比例。 */
const REAL_SHOTS: Partial<Record<MockVariant, ShotMeta>> = {
  workspace: {
    src: 'screenshots/workspace.png',
    heroNote: '项目、工作空间与任务入口集中呈现',
    heroPosition: 'center top',
    heroScale: 1.04,
    featurePosition: '34% 18%',
    featureScale: 1.42,
  },
  secretary: {
    src: 'screenshots/secretary.png',
    heroNote: '写作起草、资料处理与技能入口一屏联动',
    heroPosition: 'center top',
    heroScale: 1.05,
    featurePosition: '34% 18%',
    featureScale: 1.44,
  },
  kb: {
    src: 'screenshots/kb.png',
    heroNote: '检索、引用与资料问答统一承接',
    heroPosition: 'center top',
    heroScale: 1.05,
    featurePosition: '34% 18%',
    featureScale: 1.44,
  },
  security: {
    src: 'screenshots/security.png',
    heroNote: '规则、审批与安全状态集中可见',
    heroPosition: 'center top',
    heroScale: 1.05,
    featurePosition: '34% 18%',
    featureScale: 1.46,
  },
  assistant: {
    src: 'screenshots/assistant.png',
    heroNote: '主助手派发、子助手并行，协同任务一屏掌握',
    heroPosition: 'center top',
    heroScale: 1.05,
    featurePosition: '34% 18%',
    featureScale: 1.42,
  },
  'model-config': {
    src: 'screenshots/model-config.png',
    heroNote: '多模型厂商自由接入，按场景选模型',
    heroPosition: 'center top',
    heroScale: 1.05,
    featurePosition: '34% 18%',
    featureScale: 1.42,
  },
  skills: {
    src: 'screenshots/skills.png',
    heroNote: '技能与 MCP 服务可插拔，按需启用',
    heroPosition: 'center top',
    heroScale: 1.05,
    featurePosition: '34% 18%',
    featureScale: 1.42,
  },
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
  assistant: {
    tabs: ['主助手', '子智能体', '后台任务'],
    lines: ['帮我完善这份财务报告，按章节拆给子智能体', '已派发 3 个子智能体并行处理，分别负责三大板块', '子智能体运行中，完成后我将统一合稿'],
    active: 0,
  },
  'model-config': {
    tabs: ['模型配置', '供应商列表'],
    lines: ['选择供应商：DeepSeek、通义、智谱、Kimi…', '支持 OpenAI / Claude 兼容协议与本地模型', '按场景自由切换，密钥存在本机'],
    active: 0,
  },
  skills: {
    tabs: ['SKILLS & MCP', '技能', 'MCP'],
    lines: ['技能可插拔：公文、文档、检索按需启用', 'MCP 服务全局配置、按工作空间隔离', '新增服务：导入配置文件或手动填写'],
    active: 0,
  },
};

/** 产品界面示意图：根据页面场景切换成首页陈列或功能卡聚焦两种展示模式。 */
export default function ScreenMock({
  variant = 'workspace',
  mode = 'hero',
}: {
  variant?: MockVariant;
  mode?: MockDisplayMode;
}) {
  const v = VARIANTS[variant];
  const realShot = REAL_SHOTS[variant];
  const [shotFailed, setShotFailed] = useState(false);
  if (realShot && !shotFailed) {
    const isFeatureMode = mode === 'feature';
    return (
      <div className={`screen-shot-shell ${isFeatureMode ? 'screen-shot-shell--feature' : 'mock-float'}`}>
        <div className="screen-shot-shell__halo" />
        {!isFeatureMode ? (
          <div className="screen-shot-header">
            <div className="flex items-center gap-2">
              <span className="screen-shot-dot bg-[#ff6b81]" />
              <span className="screen-shot-dot bg-[#ffbf69]" />
              <span className="screen-shot-dot bg-[#28c76f]" />
            </div>
          </div>
        ) : null}
        <div className={`screen-shot-stage ${isFeatureMode ? 'screen-shot-stage--feature' : ''}`}>
          <div className={`screen-shot-frame ${isFeatureMode ? 'screen-shot-frame--feature' : ''}`}>
            <img
              src={realShot.src}
              alt="Gwork 界面截图"
              className="screen-shot-image"
              style={{
                ['--shot-scale' as string]: String(isFeatureMode ? realShot.featureScale : realShot.heroScale),
                objectPosition: isFeatureMode ? realShot.featurePosition : realShot.heroPosition,
              }}
              onError={() => setShotFailed(true)}
            />
            <div className="screen-shot-overlay" />
          </div>
          {!isFeatureMode ? (
            <div className="screen-shot-caption">
              <p className="screen-shot-caption__note">{realShot.heroNote}</p>
            </div>
          ) : null}
        </div>
      </div>
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
