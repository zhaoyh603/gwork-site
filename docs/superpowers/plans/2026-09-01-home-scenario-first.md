# 首页场景化改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Gwork 官网首页从「安全能力导向」改为「政企场景导向」，安全降为信任背书，场景区 4 卡各带 3 个真实功能点，并与竞品（DuMate/WorkBuddy）做出「专业」差异化。

**Architecture:** 纯文案 + 结构调整，数据与展示分离：`src/data/` 存内容（scenarios/features），页面组件只渲染。首页场景区直接消费 `SCENARIOS` 数据（DRY，不复制文案），场景页同步消费新增的 `id`/`features` 字段。删除被替换区块遗留的 CSS 死代码（hero-signal）。

**Tech Stack:** React 18 + TypeScript 5.3 + Vite 5 + Tailwind 3。验证：`pnpm type-check && pnpm lint && pnpm build`，实机 `pnpm dev`（端口 5185）浏览器核对。

**Spec:** `docs/superpowers/specs/2026-09-01-home-scenario-first-design.md`

---

### Task 1: 数据层——scenarios.ts 加 `id` + `features` 字段，替换第 4 场景

**Files:**
- Modify: `src/data/scenarios.ts`（整体重写该文件）

- [ ] **Step 1: 重写 `src/data/scenarios.ts`**

场景卡功能点全部为已核验真实能力（多知识库 `kb-manager.ts`、知识图谱 `GraphView.tsx`、公文助手 government-secretary skill、子智能体 `src/main/subagent/`、多任务并行/多标签 gateway tab、定时任务 `automation-scheduler.ts`、文件浏览 workspace 文件树）。

```ts
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
    summary: '把「起草、润色、提纲整理、格式规范」放在一个工作区里连续完成，适合日常通知、会议纪要和专题报告场景。',
    workflow: ['输入任务目标与对象', '让助手生成正文框架与要点', '对草稿进行润色并输出成稿'],
    outcomes: ['通知初稿', '会议纪要提纲', '汇报材料润色稿'],
    features: [
      { title: '公文助手', desc: '一句话交代任务，按公文体例起草、润色、列提纲' },
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
```

- [ ] **Step 2: 编译验证**

Run: `pnpm type-check`
Expected: 通过（0 errors；Scenarios.tsx 现有字段兼容，本步不受影响）

- [ ] **Step 3: Commit**

```bash
git add src/data/scenarios.ts
git commit -m "feat(site): 场景数据加 id+features 字段，第 4 场景换定时任务

场景卡功能点（多知识库/图谱/子智能体/多任务并行/定时任务/文件浏览）
经 gwork 源码核验为真实能力，避免官网吹牛。

Co-Authored-By: deepseek-v4-flash[1m]@claudecode"
```

---

### Task 2: 数据层——features.ts 03/08 措辞微调

**Files:**
- Modify: `src/data/features.ts:25-34`（03 项 scenario）与 `src/data/features.ts:52-58`（08 项 desc/scenario）

- [ ] **Step 1: 改 03 项 scenario**

原文：`scenario: '涉密材料、内部敏感资料处理',`
改为：
```ts
    scenario: '内网环境、敏感资料处理',
```

- [ ] **Step 2: 改 08 项 desc 与 scenario**

原文 desc：`'已提供命令审批、路径限制、网络规则、删除保护与审计能力，让 AI 自主执行更可控、更可回溯。'`
原文 scenario：`'高安全要求、内网办公、长期稳定使用'`
改为：
```ts
    desc: '高风险操作需确认、网络出口可管控、处理过程有记录，让 AI 干活更可控、可回溯。',
    scenario: '高安全要求、内网办公、长期稳定使用',
```

（scenario 不变，只改 desc 说人话。）

- [ ] **Step 3: 编译验证 + Commit**

Run: `pnpm type-check`
Expected: 通过

```bash
git add src/data/features.ts
git commit -m "chore(site): features 安全项措辞说人话

08 项去掉术语堆砌（命令审批/路径限制/网络规则），改为日常表达；
03 项 scenario 去「涉密」改「敏感资料」表述。

Co-Authored-By: deepseek-v4-flash[1m]@claudecode"
```

---

### Task 3: Home.tsx 重构——Hero 重写 + 场景区新增 + 信任背书区改造

**Files:**
- Modify: `src/pages/Home.tsx`（整体重写该文件，含 import 调整）

- [ ] **Step 1: 重写 `src/pages/Home.tsx`**

```tsx
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import SectionTitle from '../components/SectionTitle';
import ScreenMock from '../components/ScreenMock';
import { FEATURES } from '../data/features';
import { SCENARIOS } from '../data/scenarios';
import { useReveal } from '../hooks/useReveal';
import type { CSSProperties } from 'react';

const HERO_HIGHLIGHTS = ['按体例起草公文', '回答带出处', '数据留在本机', '支持 macOS 与 Windows'];
const HERO_FLOATING_CARD = {
  title: '通知初稿',
  value: '已按公文体例起草',
  note: '标题、主送单位、正文框架齐全',
};

/** 首页：以场景价值和核心能力为主线承接品牌转化，安全作为信任背书。 */
export default function Home() {
  const revealRef = useReveal<HTMLDivElement>();
  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="home" />

      {/* 1. Hero */}
      <section className="hero-bg border-b border-white/70">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p
              className="hero-rise mb-5"
              style={{ animationDelay: '0ms' }}
            >
              <span className="eyebrow-pill">政企办公 · 专业助手</span>
            </p>
            <h1
              className="hero-rise max-w-xl text-4xl font-semibold leading-tight tracking-tight text-brand-dark lg:text-6xl"
              style={{ animationDelay: '120ms' }}
            >
              专业的事，交给专业的 AI 助手
            </h1>
            <p
              className="hero-rise mt-6 max-w-xl text-lg leading-relaxed text-ink-soft lg:text-xl"
              style={{ animationDelay: '240ms' }}
            >
              公文起草、材料整理、制度问答、周报汇总——不是聊天式问答，而是按政企工作习惯交付：
              按体例起草、带出处回答、到点自动执行。数据留在本机，模型可接内网，无需注册、无需积分。
            </p>
            <div className="hero-rise mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: '360ms' }}>
              <CtaButton href="./download.html" size="lg">下载 Gwork</CtaButton>
              <a href="./features.html" className="text-link text-base">
                了解功能 →
              </a>
            </div>
            <div className="hero-rise mt-8 flex flex-wrap gap-3 text-sm text-ink-soft" style={{ animationDelay: '480ms' }}>
              {HERO_HIGHLIGHTS.map((item) => (
                <span key={item} className="rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-rise" style={{ animationDelay: '200ms' }}>
            <div className="hero-stage">
              <div className="hero-stage-glow" />
              <div className="hero-stage-main">
                <ScreenMock variant="workspace" mode="hero" />
              </div>
              <div className="hero-float-card hero-float-card-single hidden lg:block">
                <p className="text-xs font-medium tracking-wide text-brand">{HERO_FLOATING_CARD.title}</p>
                <p className="mt-2 text-sm font-semibold text-brand-dark">{HERO_FLOATING_CARD.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{HERO_FLOATING_CARD.note}</p>
              </div>
              <div className="hero-mini-panel">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    ['政务写作', '规范输出'],
                    ['知识问答', '有据可依'],
                    ['定时任务', '自动归档'],
                  ].map(([title, note]) => (
                    <div key={title} className="rounded-[18px] border border-white/80 bg-white/85 px-3 py-2.5 shadow-sm">
                      <p className="text-[11px] font-medium text-brand-dark">{title}</p>
                      <p className="mt-1 text-[10px] text-ink-soft">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 场景区（替换原亮点条 + 数据指标条） */}
      <section className="border-b border-white/70 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="典型场景"
            title="材料活，从起草到归档都能帮上忙"
            desc="四个高频场景，覆盖政企办公日常。"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {SCENARIOS.map((s, i) => (
              <a
                key={s.id}
                href={`./scenarios.html#${s.id}`}
                className="reveal feature-card group p-6 transition-shadow hover:shadow-[0_18px_40px_rgba(19,40,110,0.12)]"
                style={{ '--reveal-delay': `${(i % 2) * 90}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-brand">{s.kicker}</span>
                  <span className="text-xs text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">查看详情 →</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-brand-dark">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                  {s.features.map((f) => (
                    <li key={f.title} className="rounded-xl border border-white/80 bg-white/70 px-3 py-2">
                      <p className="text-xs font-semibold text-brand-dark">{f.title}</p>
                      <p className="mt-1 text-[11px] leading-5 text-ink-soft">{f.desc}</p>
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 核心卖点区 */}
      <section className="border-b border-white/70 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="核心能力"
            title="一个助手，承包办公日常"
            desc="从公文写作到知识库问答，从单打独斗到多助手协同，都能帮上忙。"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
              const isBig = i % 4 === 0 || i % 4 === 3;
              return (
                <div
                  key={f.no}
                  style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as CSSProperties}
                  className={`reveal feature-card ${isBig ? 'bg-gradient-to-br from-brand-soft/70 to-white lg:col-span-2' : 'lg:col-span-1'}`}
                >
                  <p className="text-sm font-semibold text-brand">{f.no}</p>
                  <h3 className="mt-2 text-lg font-semibold text-brand-dark">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 能力展示区 */}
      <section className="section-wash">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="协同工作"
            title="多助手一起干活，各司其职"
            desc="主助手负责统筹，子助手按任务分工，定时任务自动跑，跨标签页随时调用。"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ['主助手统筹', '接收任务、拆解分工、汇总结果，全程对话式协作'],
              ['子助手分工', '检索、整理、执行各领一摊，互不干扰'],
              ['定时任务', '周报汇总、资料归档，到点自动执行'],
            ].map(([title, desc], i) => (
              <div
                key={title}
                className="reveal surface-card px-6 py-7"
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <h3 className="font-semibold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 信任背书区（原安全合规区） */}
      <section className="border-b border-white/70 bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionTitle
            kicker="安全可控"
            title="数据不出门，用着放心"
            desc="面向政企场景，安全是底线不是卖点。"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              ['数据留本机', '对话记录、知识库、工作区数据全部存在本机，模型可自由选择云端或内网部署'],
              ['操作可审计', '关键拦截与处理结果可回溯，AI 干活心里有数'],
              ['可随时清理', '会话与上下文一键清理，敏感资料不留痕迹'],
            ].map(([title, desc], i) => (
              <div
                key={title}
                className="reveal surface-card px-6 py-7"
                style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
              >
                <h3 className="font-semibold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-soft">
            完整安全机制见 <a href="./features.html" className="text-link">功能页 →</a>
          </p>
        </div>
      </section>

      {/* 6. CTA 收尾 */}
      <section className="bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="reveal surface-card-soft px-8 py-14 text-center lg:px-16">
            <h2 className="text-3xl font-semibold text-brand-dark">现在就试试 Gwork</h2>
            <p className="mt-4 text-base text-ink-soft">免费安装，本地运行，两分钟上手。</p>
            <div className="mt-8">
              <CtaButton href="./download.html" size="lg">下载 Gwork</CtaButton>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: 编译验证**

Run: `pnpm type-check`
Expected: 通过（0 errors）

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat(site): 首页场景化改造——Hero 重写 + 场景区 + 信任背书区

Hero 改「专业的事，交给专业的 AI 助手」，删安全信号卡；
新增场景区（4 卡 × 3 功能点，直接消费 SCENARIOS 数据）；
原亮点条+指标条移除；安全合规区压缩为「数据不出门，用着放心」背书。

Co-Authored-By: deepseek-v4-flash[1m]@claudecode"
```

---

### Task 4: Scenarios.tsx——加 id 锚点 + 「用到的功能」区块

**Files:**
- Modify: `src/pages/Scenarios.tsx`

- [ ] **Step 1: 场景卡 section 加 `id` 锚点（第 39-43 行附近）**

原文：
```tsx
              <section
                key={scenario.title}
                className="reveal feature-showcase overflow-hidden rounded-[32px] border border-white/80 px-6 py-8 shadow-[0_20px_44px_rgba(19,40,110,0.08)] backdrop-blur-sm lg:px-10"
                style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
              >
```
改为：
```tsx
              <section
                id={scenario.id}
                key={scenario.id}
                className="reveal feature-showcase scroll-mt-20 overflow-hidden rounded-[32px] border border-white/80 px-6 py-8 shadow-[0_20px_44px_rgba(19,40,110,0.08)] backdrop-blur-sm lg:px-10"
                style={{ '--reveal-delay': `${index * 80}ms` } as CSSProperties}
              >
```

（`scroll-mt-20` 保证锚点跳转时不被固定导航遮挡。）

- [ ] **Step 2: 右侧面板「典型产出」区块后加「用到的功能」区块**

在 `{scenario.outcomes.map(...)}` 的 div（第 68-73 行）结束、`推荐起步方式` div 之前插入：

```tsx
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-brand-dark">用到的功能</p>
                      <div className="mt-3 space-y-2">
                        {scenario.features.map((f) => (
                          <div key={f.title} className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
                            <p className="text-sm font-semibold text-ink">{f.title}</p>
                            <p className="mt-0.5 text-xs leading-5 text-ink-soft">{f.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
```

- [ ] **Step 3: 编译验证**

Run: `pnpm type-check`
Expected: 通过（0 errors）

- [ ] **Step 4: Commit**

```bash
git add src/pages/Scenarios.tsx
git commit -m "feat(site): 场景页加 id 锚点与「用到的功能」区块

锚点承接首页场景卡跳转（scroll-mt-20 防导航遮挡）；
功能区块消费 SCENARIOS.features 数据，与首页同源不漂移。

Co-Authored-By: deepseek-v4-flash[1m]@claudecode"
```

---

### Task 5: site.css 死代码清理（hero-signal + stat-card + metric-in）

**Files:**
- Modify: `src/styles/site.css`（hero-signal 主定义 ~208-233、stat-card ~96、metric-in 主定义 ~474-486、媒体查询两处 ~526-528 与 ~564）
- Modify: `src/data/releases.ts:35`（顺手修 pre-existing lint：no-regex-spaces，Task 6 三件套需要 lint 全绿）

> 质量审查补充：Task 3 删除数据指标条后，`stat-card` / `metric-in` / `@keyframes metric-in` 成为孤儿样式，与本任务 hero-signal 同性质，一并清理；`releases.ts:35` 的 `no-regex-spaces` 是 8a65ffc 引入的 pre-existing 错误，Task 6 验收会被卡，顺手修复。

- [ ] **Step 1: 删除 `.stat-card`（~96 行）**

用编辑器删除 `.stat-card { ... }` 整块（Task 3 删数据指标条后无引用）。

- [ ] **Step 2: 删除 `.metric-in` 与 `@keyframes metric-in`（~474-486 与 ~564）**

删除 `.metric-in { ... }` 样式定义与 `@keyframes metric-in` 动画块（含媒体查询内的 `.metric-in` 覆盖若存在）。

- [ ] **Step 3: 删除主定义 `.hero-signal-grid` / `.hero-signal-item` / `.hero-signal-dot`（208-233 行整段）**

用编辑器精确删除从 `.hero-signal-grid {` 到 `.hero-signal-dot { ... }` 结尾的整块（含中间空行），保留前后相邻类（`.hero-float-card` 相关与 `.feature-showcase`）。

- [ ] **Step 4: 删除媒体查询中的 `.hero-signal-grid` 覆盖（526-528 行）**

删除：
```css
  .hero-signal-grid {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 5: 修复 releases.ts:35 lint 错误**

Run: `pnpm lint` 查看具体报错行；`no-regex-spaces` 需将正则中的连续空格改为 `\s`（或 `\s+`，按语义），只修这一行，不扩展范围。

- [ ] **Step 6: 验证无残留 + 三件套 + Commit**

Run: `grep -rn "hero-signal\|stat-card\|metric-in" src/`
Expected: 无输出

Run: `pnpm type-check && pnpm lint && pnpm build`
Expected: 全部通过

```bash
git add src/styles/site.css src/data/releases.ts
git commit -m "chore(site): 删首页遗留死 CSS（hero-signal/stat-card/metric-in）+ 修 releases lint

Task 3 首页重构后 hero-signal/stat-card/metric-in 无引用，一并清理；
releases.ts:35 no-regex-spaces 为 pre-existing lint 错误，顺手修复
保证三件套全绿。

Co-Authored-By: deepseek-v4-flash[1m]@claudecode"
```

---

### Task 6: 全量验证

**Files:** 无（只跑命令）

- [ ] **Step 1: 三件套**

Run: `pnpm type-check && pnpm lint && pnpm build`
Expected: 全部通过，`dist/` 生成成功

- [ ] **Step 2: 实机预览核对**

Run: `pnpm dev`（后台），浏览器打开 `http://localhost:5185/`
逐项核对（对照 spec 文案全稿）：
1. Hero：eyebrow「政企办公 · 专业助手」、H1「专业的事，交给专业的 AI 助手」、副标题、4 个 chips（按体例起草公文 / 回答带出处 / 数据留在本机 / 支持 macOS · Windows）
2. Hero 右侧浮动卡「通知初稿 · 已按公文体例起草」
3. 场景区 4 卡（公文写作 / 知识问答 / 材料整理 / 定时任务），每卡 3 功能点，无溢出、无布局挤压
4. 点击场景卡 → 跳转 `./scenarios.html#<id>` 定位正确且不被导航遮挡
5. 场景页：第 4 场景为「定时任务」，每个场景有「用到的功能」区块
6. 信任背书区「数据不出门，用着放心」3 卡 + 功能页链接
7. 全页滚动无空白区、无残留旧文案（安全中心信号卡、亮点条、指标条已消失）
8. 切换窗口宽度（响应式）场景卡 2 列 → 1 列正常

- [ ] **Step 3: 核对 spec 无遗漏**

对照 `docs/superpowers/specs/2026-09-01-home-scenario-first-design.md` 的「改动文件清单」逐项确认已落地（5 个文件 + CSS 清理，共 6 处改动）。
