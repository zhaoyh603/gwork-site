# 官网「配置指南」详细操作手册 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把官网「安装指南」页改造为「配置指南」——单页长文 + 锚点目录 + 四大板块 13 个功能点的图文操作手册。

**Architecture:** 内容与骨架分离——手册内容全部放 `src/data/manual.ts` 结构化数据（block 联合类型），`Guide.tsx` 只做页面组装，新增 `GuideToc`（锚点目录 + IntersectionObserver 滚动高亮）与 `ManualSectionView`（block 渲染器）两个组件。截图实机采集后放 `public/screenshots/`。

**Tech Stack:** React 18 + Vite + Tailwind 3（gwork-site 仓库，无测试框架——验证走 type-check + build + 双视口走查）

**Product Spec:** `docs/specs/config-guide/product.md`
**Tech Spec:** `docs/specs/config-guide/tech.md`

**跨仓库说明:** 手册内容须与 Gwork v0.9.17 实机一致。Gwork 主仓库在 `/Users/zhaoyh/project/gwork`（可 grep UI 文案核对）；实机运行配方见 Task 4。

**Gwork 纪律提醒（对内容文字生效）:** 面向用户文案说人话——不出现 provider/baseUrl/apiKey 等术语的裸用法（apiKey 说「密钥」、baseUrl 说「服务地址」）；首次出现的术语用括注；每步告诉用户「在哪、点什么、会发生什么」。

---

### Task 1: 手册数据结构 + Guide 页骨架重写

**Files:**
- Create: `src/data/manual.ts`
- Modify: `src/pages/Guide.tsx`
- Modify: `src/data/guide.ts`（删 INSTALL_STEPS、GUIDE_SECTIONS）

**Why:** 内容与骨架分离是 tech.md 的核心决策——后续所有内容 Task 只动 `manual.ts`，页面组件不再改。先立骨架让后续内容有落点。
**Search anchor:** `grep -n "INSTALL_STEPS" src/pages/Guide.tsx`

- [ ] **Step 1: 新建 `src/data/manual.ts`——类型定义 + 四大板块骨架（13 节 id/title 定稿，blocks 暂空）**

```ts
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
      { id: 'apply-api-key', title: '申请 API Key（以 DeepSeek 为例）', blocks: [] },
      { id: 'config-model', title: '在 Gwork 中配置模型', blocks: [] },
      { id: 'config-vision-model', title: '配置视觉理解模型', blocks: [] },
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
```

- [ ] **Step 2: 收缩 `src/data/guide.ts`——删 INSTALL_STEPS 与 GUIDE_SECTIONS 两个导出及其接口（GuideStep、GuideSection），保留 CONSULT_OPTIONS 原样**

- [ ] **Step 3: 重写 `src/pages/Guide.tsx`——页头改「配置指南」+ 手册骨架渲染 + 保留咨询区**

```tsx
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import CtaButton from '../components/CtaButton';
import GuideToc from '../components/GuideToc';
import ManualSectionView from '../components/ManualSectionView';
import { CONSULT_OPTIONS } from '../data/guide';
import { MANUAL_BASELINE_VERSION, MANUAL_PARTS } from '../data/manual';
import { SITE } from '../data/site';
import { useReveal } from '../hooks/useReveal';

/** 配置指南页：装好之后的完整上手手册——四大板块图文操作步骤。 */
export default function Guide() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="guide" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="reveal surface-card-soft px-8 py-14 text-center lg:px-16">
          <p className="mb-4">
            <span className="eyebrow-pill tracking-wide">配置指南</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-brand-dark lg:text-5xl">
            装好之后，从这里开始
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
            这份手册带你完成模型配置、建好知识库、用上各项功能。还没安装？
            <a href="./download.html" className="text-link">先去下载页 →</a>
          </p>
          <p className="mt-2 text-xs text-ink-soft">界面以 v{MANUAL_BASELINE_VERSION} 为准 · 截图均为浅色主题，不影响深色模式下的操作</p>
        </div>

        <div className="mt-16 flex flex-col gap-10 lg:flex-row">
          <GuideToc parts={MANUAL_PARTS} />
          <div className="min-w-0 flex-1">
            {MANUAL_PARTS.map((part) => (
              <section key={part.id} id={part.id} className="scroll-mt-24">
                <h2 className="text-3xl font-semibold tracking-tight text-brand-dark">{part.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{part.intro}</p>
                {part.sections.map((section) => (
                  <ManualSectionView key={section.id} section={section} />
                ))}
              </section>
            ))}
          </div>
        </div>

        {/* 咨询与反馈区保持原样，见现有代码 */}
      </main>
      <Footer />
    </div>
  );
}
```

（咨询区代码从现有 Guide.tsx 原样搬移，不动。）

- [ ] **Step 4: 临时建 `GuideToc.tsx` / `ManualSectionView.tsx` 最小占位（Task 2/3 替换为完整实现）**

`src/components/GuideToc.tsx`：

```tsx
import type { ManualPart } from '../data/manual';

/** 锚点目录（Task 3 实现滚动高亮）。 */
export default function GuideToc({ parts }: { parts: ManualPart[] }) {
  return (
    <nav className="lg:w-56 lg:shrink-0">
      {parts.map((part) => (
        <div key={part.id} className="mb-4">
          <a href={`#${part.id}`} className="text-link text-base font-semibold">{part.title}</a>
        </div>
      ))}
    </nav>
  );
}
```

`src/components/ManualSectionView.tsx`：

```tsx
import type { ManualSection } from '../data/manual';

/** 小节渲染器（Task 2 实现 block 分发）。 */
export default function ManualSectionView({ section }: { section: ManualSection }) {
  return (
    <div id={section.id} className="scroll-mt-24 mt-12">
      <h3 className="text-xl font-semibold text-brand-dark">{section.title}</h3>
    </div>
  );
}
```

- [ ] **Step 5: 构建验证**

Run: `pnpm type-check && pnpm build`
Expected: 全部通过。若报 GuideToc/ManualSectionView 未找到，确认 Step 4 文件已建。

- [ ] **Step 6: 预览走查骨架**

Run: `pnpm exec vite preview`
Expected: 打开 guide 页——页头显示「配置指南 / 装好之后，从这里开始」，四大板块标题与小节标题依次可见，咨询区正常。

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat(site): 配置指南页骨架——手册数据结构与页面组装重写"
```

---

### Task 2: ManualSectionView 完整渲染器

**Files:**
- Modify: `src/components/ManualSectionView.tsx`

**Why:** 5 种 block 类型（段落/步骤/截图/贴士/链接）的统一渲染，是全部内容的展示层。
**Search anchor:** `grep -n "kind" src/data/manual.ts`

- [ ] **Step 1: 实现完整渲染器**

```tsx
import type { ManualBlock, ManualSection } from '../data/manual';

/** 单个 block 的渲染分发。 */
function BlockView({ block }: { block: ManualBlock }) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="mt-4 text-base leading-7 text-ink-soft">{block.text}</p>;
    case 'steps':
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-base font-medium text-ink">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'image':
      return (
        <figure className="mt-5">
          <img src={block.src} alt={block.alt} loading="lazy" className="w-full rounded-2xl border border-white/80 shadow-[0_16px_36px_rgba(19,40,110,0.10)]" />
          {block.caption ? <figcaption className="mt-2 text-center text-xs text-ink-soft">{block.caption}</figcaption> : null}
        </figure>
      );
    case 'tip':
      return (
        <div className="mt-5 rounded-2xl border border-brand/20 bg-brand/5 px-4 py-3">
          <p className="text-sm leading-6 text-ink"><span className="font-semibold text-brand">小贴士：</span>{block.text}</p>
        </div>
      );
    case 'links':
      return (
        <div className="mt-4 flex flex-wrap gap-3">
          {block.items.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="text-link text-sm font-medium"
            >
              {link.label}{link.external ? ' ↗' : ''}
            </a>
          ))}
        </div>
      );
  }
}

/** 手册小节：标题 + block 序列。 */
export default function ManualSectionView({ section }: { section: ManualSection }) {
  return (
    <article id={section.id} className="scroll-mt-24 mt-12 border-t border-white/80 pt-10 first:border-t-0">
      <h3 className="text-xl font-semibold tracking-tight text-brand-dark">{section.title}</h3>
      {section.blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </article>
  );
}
```

- [ ] **Step 2: 构建验证**

Run: `pnpm type-check && pnpm build`
Expected: 通过

- [ ] **Step 3: Commit**

```bash
git add src/components/ManualSectionView.tsx && git commit -m "feat(site): 手册小节渲染器——五种 block 类型分发"
```

---

### Task 3: GuideToc 锚点目录（sticky + 移动横滑 + 滚动高亮）

**Files:**
- Modify: `src/components/GuideToc.tsx`

**Why:** 单页长文的导航核心；桌面左栏 sticky、移动端横滑条、IntersectionObserver 高亮当前小节（模式同 useReveal，无新依赖）。
**Search anchor:** `grep -n "IntersectionObserver" src/hooks/useReveal.ts`

- [ ] **Step 1: 实现完整 GuideToc**

```tsx
import { useEffect, useState } from 'react';
import type { ManualPart } from '../data/manual';

/**
 * 锚点目录：桌面端左栏 sticky，移动端顶部横滑条。
 * 滚动高亮：观察全部板块与小节 id，视口最上方当前命中者高亮。
 */
export default function GuideToc({ parts }: { parts: ManualPart[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const ids = parts.flatMap((part) => [part.id, ...part.sections.map((s) => s.id)]);
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // 取视口中最靠上的可见节为当前节
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActiveId(top.target.id);
        }
      },
      { rootMargin: '-96px 0px -60% 0px' },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [parts]);

  const linkClass = (id: string) =>
    `block rounded-xl px-3 py-1.5 text-sm transition-colors ${
      activeId === id ? 'bg-brand/10 font-semibold text-brand' : 'text-ink-soft hover:text-ink'
    }`;

  return (
    <nav className="lg:sticky lg:top-24 lg:w-56 lg:shrink-0 lg:self-start">
      <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wider text-ink-soft lg:block">目录</p>
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {parts.map((part) => (
          <div key={part.id} className="shrink-0 lg:mb-3">
            <a href={`#${part.id}`} className={`${linkClass(part.id)} whitespace-nowrap text-base`}>{part.title}</a>
            <div className="hidden lg:block">
              {part.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className={`${linkClass(section.id)} pl-4`}>
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: 构建验证**

Run: `pnpm type-check && pnpm build`
Expected: 通过

- [ ] **Step 3: 预览走查**

Run: `pnpm exec vite preview`
Expected: 桌面宽视口下目录吸附在左侧；点击「维护与安全」平滑滚动到位（吸顶导航不遮挡，`scroll-mt-24` 生效）；滚动页面时高亮随小节切换。移动视口（DevTools 390px）下目录为顶部横滑条。

- [ ] **Step 4: Commit**

```bash
git add src/components/GuideToc.tsx && git commit -m "feat(site): 锚点目录——sticky 侧栏/移动横滑/滚动高亮"
```

---

### Task 4: 实机截图采集（跨仓库操作）

**Files:**
- Create: `public/screenshots/guide-*.png`（清单见下）

**Why:** 手册图文对照的「图」。全部在 Gwork v0.9.17 实机一次采集，避免内容阶段反复开应用。
**Search anchor:** `ls /Users/zhaoyh/project/gwork/public/screenshots 2>/dev/null; ls /Users/zhaoyh/project/gwork-site/public/screenshots`

- [ ] **Step 1: 准备隔离实机环境**

Gwork 主工作区 dev 可能被并行会话占用——用隔离实例配方（来自 gwork 项目实践）：

```bash
cd /Users/zhaoyh/project/gwork
GWORK_DATA_DIR=/tmp/gwork-guide-demo DB_DIR=/tmp/gwork-guide-demo/db pnpm dev
```

注意：
- 隔离实例需准备示范数据（工作区选一个含 2-3 个文档的演示文件夹、知识库建一个、对话发几条消息），截图里不能出现真实用户数据。
- 若端口 5183 被占，按隔离配方换 vite 端口后启动。
- 浅色主题（官网现有截图均为浅色）。

- [ ] **Step 2: 逐项截图（macOS 截图快捷键 Shift+Cmd+4，或用已有 CDP 截图脚本）**

| 文件名 | 画面 | 采集要点 |
|--------|------|---------|
| guide-config-model.png | 模型配置页（已填好示例密钥打码形态） | 设置 → 模型配置；密钥输入框内容用示例占位，**不得出现真实密钥** |
| guide-vision-toggle.png | 模型设置「多模态」开关 | 开关所在界面，开关呈打开状态 |
| guide-chat-vision.png | 对话中发图片被理解 | 一张风景图 + 模型描述回复 |
| guide-kb-create.png | 知识库创建向导 | 两步向导界面；选文件夹原生对话框若需系统权限，请辉哥手点配合 |
| guide-chat-main.png | 对话主界面（含附件按钮） | 输入框 + 一条提问一条回答 |
| guide-subagent.png | 智能体卡片/入口 | 复用现有 assistant.png 若可用，否则补拍 |
| guide-editor.png | Markdown 编辑器 | 打开一篇示例文档 |
| guide-task-breakdown.png | 任务分解结果 | 一个示例任务被拆成步骤的界面 |
| guide-right-panel.png | 右侧文件面板有内容 | 面板展开且列出产出文件 |
| guide-left-tree-menu.png | 左侧文件树 + 右键菜单展开 | 右键菜单展开是关键画面 |
| guide-update-ready.png | 更新提醒界面 | 若无法在隔离实例触发更新横幅，用设置里更新相关界面替代 |
| guide-security-settings.png | 设置里的安全开关 | 以实机为准 |
| guide-env-check.png | 关于页环境自检结果 | 自检弹窗展开状态 |

规格：统一浅色主题、窗口宽度一致（约 1280 逻辑像素）、Retina 2x 输出、png 压缩（可用 `sips -Z 1600` 控制边长后对比体积）。

- [ ] **Step 3: 截图入库**

把成图拷入 `/Users/zhaoyh/project/gwork-site/public/screenshots/`，命名与上表一致。核对：无真实密钥、无真实个人数据、主题统一。

- [ ] **Step 4: Commit**

```bash
git add public/screenshots/guide-*.png && git commit -m "chore(site): 配置指南实机截图 13 张（v0.9.17 隔离实例采集）"
```

---

### Task 5: 板块一内容——连接大模型（3 节）

**Files:**
- Modify: `src/data/manual.ts`（填 `connect-model` 板块 3 节 blocks）

**Why:** 首个内容板块；本 Task 产出的内容口径（术语话术、步骤粒度）是后续板块的模板。
**Search anchor:** `grep -n "apply-api-key" src/data/manual.ts`

- [ ] **Step 1: 实机核对操作路径（Gwork 源码 + 隔离实机）**

逐条在实机过一遍并记录实际界面文案，重点核对：
- 模型配置入口：设置 → 模型配置页的实际页签名与按钮文案（对照 gwork 主仓库 `src/renderer/` 模型配置组件）
- 「多模态」开关的准确位置与文案（对照 `src/main/utils/vision-capability.ts` 注释与实机）
- DeepSeek 申请流程：访问 platform.deepseek.com 核对注册/创建密钥入口文字（只写文字步骤，不截图）

- [ ] **Step 2: 填充 2.1 申请 API Key 节**

结构：paragraph（什么是 API Key，说人话：一把访问大模型的「钥匙」，模型服务靠它识别并计费）+ steps（访问 DeepSeek 开放平台注册账号 → 实名/充值说明以官网为准 → 创建 API Key → 立即复制保存，离开页面后不再显示）+ tip（密钥泄露的后果与保管建议）+ links（DeepSeek 开放平台，external）。

- [ ] **Step 3: 填充 2.2 在 Gwork 中配置模型节**

结构：paragraph（打开设置的模型配置页）+ steps（实机核对后的真实路径：打开设置 → 进入模型配置 → 添加/编辑模型服务 → 粘贴密钥、填服务地址与模型名 → 保存 → 回到对话发一句「你好」验证有回应）+ image（guide-config-model.png）+ tip（服务地址/模型名填错时的常见报错与自查）。

- [ ] **Step 4: 填充 2.3 配置视觉理解模型节**

结构：paragraph（视觉理解模型 = 能看懂图片的模型；Gwork 两种方式识别）+ steps（方式一：在模型选择里挑支持看图的模型；方式二：模型设置里勾选「多模态」开关强制开启）+ image（guide-vision-toggle.png）+ steps（验证：对话里点附件发一张图，让它描述图片内容）+ image（guide-chat-vision.png）+ tip（勾了多模态但模型实际不支持看图时会失败，换支持的模型即可）。

- [ ] **Step 5: 内容自检（对办公人员口径）**

逐节自问：不懂技术的人能看懂、敢照做吗？有无裸术语残留？步骤是否每步都有明确点击目标？

- [ ] **Step 6: 构建 + 预览走查**

Run: `pnpm type-check && pnpm build && pnpm exec vite preview`
Expected: 板块一 3 节完整渲染，截图正常显示，锚点跳转正确。

- [ ] **Step 7: Commit**

```bash
git add src/data/manual.ts && git commit -m "feat(site): 配置指南板块一——连接大模型 3 节内容"
```

---

### Task 6: 板块二内容——核心功能上手（3 节）

**Files:**
- Modify: `src/data/manual.ts`（填 `core-features` 板块）

**Why:** 建库/对话/智能体是日常使用主路径。
**Search anchor:** `grep -n "create-kb" src/data/manual.ts`

- [ ] **Step 1: 实机核对**——知识库创建向导的两步界面（对照 gwork #300 实现：选文件夹即成库）、对话附件入口、智能体入口的实际名称与位置。

- [ ] **Step 2: 填充 3.1 建立知识库**：paragraph（知识库 = 把制度文档、资料文件夹变成能问答的资料库）+ steps（实机核对：打开知识库页 → 新建 → 选文件夹 → 命名确认 → 等待整理完成）+ image（guide-kb-create.png）+ steps（验证：围绕库里文档提问，回答能引用资料）+ tip（文件夹里加新文件后如何更新——以实机为准）。

- [ ] **Step 3: 填充 3.2 完成对话**：steps（输入框打字发送 → 点附件添加文件/图片 → 围绕知识库提问的问法建议）+ image（guide-chat-main.png）+ tip（一次说清任务背景和期望，回答更准）。

- [ ] **Step 4: 填充 3.3 调用智能体**：paragraph（智能体 = 不同专长的帮手）+ steps（实机核对：入口在哪 → 怎么发起 → 结果怎么看/怎么回到主对话）+ image（guide-subagent.png 或复用 assistant.png）。

- [ ] **Step 5: 内容自检（对办公人员口径）**

逐节自问：不懂技术的人能看懂、敢照做吗？有无裸术语残留？步骤是否每步都有明确点击目标？

- [ ] **Step 6: 构建 + 预览走查**

Run: `pnpm type-check && pnpm build && pnpm exec vite preview`
Expected: 板块二 3 节完整渲染，截图正常显示，锚点跳转正确。

- [ ] **Step 7: Commit**

```bash
git add src/data/manual.ts && git commit -m "feat(site): 配置指南板块二——核心功能上手 3 节内容"
```

---

### Task 7: 板块三内容——效率工具（4 节）

**Files:**
- Modify: `src/data/manual.ts`（填 `productivity` 板块）

**Why:** 编辑器/任务分解/两个文件区是高频效率点；左侧文件树「单击添加、双击打开、右键菜单」是辉哥点名的重点，必须图文准确。
**Search anchor:** `grep -n "left-file-tree" src/data/manual.ts`

- [ ] **Step 1: 实机核对**——Markdown 编辑器入口与导出；任务分解的触发方式与结果展示；右侧文件面板出现时机与打开方式；左侧文件树单击/双击/右键三种操作的实际行为（对照 gwork #241：单击添加附件、双击打开、右键菜单）。

- [ ] **Step 2: 填充 4.1 Markdown 编辑器**：paragraph（在哪打开、适合写什么）+ steps（新建/打开 → 编辑 → 保存/导出，以实机为准）+ image（guide-editor.png）。

- [ ] **Step 3: 填充 4.2 任务分解**：paragraph（大任务交给系统拆小步）+ steps（怎么发起 → 在哪看拆解 → 如何逐项跟进）+ image（guide-task-breakdown.png）+ tip（任务越具体拆得越准）。

- [ ] **Step 4: 填充 4.3 右侧文件面板**：paragraph（智能体产出文件的收纳区，做完文件类任务会自动出现）+ steps（什么时候出现 → 怎么打开文件 → 不需要时怎么收起）+ image（guide-right-panel.png）。

- [ ] **Step 5: 填充 4.4 左侧文件浏览**：paragraph（工作区文件的浏览区）+ steps（单击 = 添加为对话附件；双击 = 打开文件；右键 = 更多操作菜单，逐项写清会发生什么）+ image（guide-left-tree-menu.png，右键菜单展开状态）+ tip（三种操作怎么记：轻点加附件、双击看内容、右键找更多）。

- [ ] **Step 6: 内容自检（对办公人员口径）**

逐节自问：不懂技术的人能看懂、敢照做吗？有无裸术语残留？步骤是否每步都有明确点击目标？

- [ ] **Step 7: 构建 + 预览走查**

Run: `pnpm type-check && pnpm build && pnpm exec vite preview`
Expected: 板块三 4 节完整渲染，截图正常显示，锚点跳转正确。

- [ ] **Step 8: Commit**

```bash
git add src/data/manual.ts && git commit -m "feat(site): 配置指南板块三——效率工具 4 节内容"
```

---

### Task 8: 板块四内容——维护与安全（3 节）

**Files:**
- Modify: `src/data/manual.ts`（填 `maintenance-security` 板块）

**Why:** 更新与安全是辉哥点名板块；安全设置开关清单在 product.md 标注「以实机为准、成文后辉哥审」。
**Search anchor:** `grep -n "security-settings" src/data/manual.ts`

- [ ] **Step 1: 实机核对**——更新提醒界面的实际形态（对照 gwork #312 更新就绪横幅）；设置里安全相关开关的完整清单与各自文案（对照 gwork 沙箱/exec 防护设置项）；关于页环境自检的入口与结果展示（对照 gwork #242）。

- [ ] **Step 2: 填充 5.1 自动更新**：paragraph（有新版本会提醒，不用卸载重装、配置不会丢）+ steps（提醒出现 → 怎么安装 → 重启后确认版本）+ image（guide-update-ready.png）。

- [ ] **Step 3: 填充 5.2 安全设置**：paragraph（Gwork 内置的安全防护，按实机逐项）+ steps（每个开关：在哪、管什么、建议开还是关——以实机清单为准，成文后辉哥审）+ image（guide-security-settings.png）。

- [ ] **Step 4: 填充 5.3 安全检查**：steps（打开关于页 → 点环境自检 → 结果怎么看 → 有红叉怎么办）+ image（guide-env-check.png）。

- [ ] **Step 5: 内容自检（对办公人员口径）**

逐节自问：不懂技术的人能看懂、敢照做吗？有无裸术语残留？步骤是否每步都有明确点击目标？

- [ ] **Step 6: 构建 + 预览走查**

Run: `pnpm type-check && pnpm build && pnpm exec vite preview`
Expected: 板块四 3 节完整渲染，截图正常显示，锚点跳转正确。

- [ ] **Step 7: Commit**

```bash
git add src/data/manual.ts && git commit -m "feat(site): 配置指南板块四——维护与安全 3 节内容"
```

---

### Task 9: 全站改名「安装指南」→「配置指南」

**Files:**
- Modify: `src/components/Nav.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/pages/Download.tsx`（3 处）
- Modify: `src/pages/Scenarios.tsx`（3 处）

**Why:** 改名全量替换（product.md §6）；guide.html 路径不变。
**Search anchor:** `grep -rn "安装指南" src/`

- [ ] **Step 1: 逐处替换，按上下文调整措辞**

| 位置 | 原文 | 改为 |
|------|------|------|
| Nav.tsx 导航项 | `安装指南` | `配置指南` |
| Footer.tsx 链接 | `安装指南` | `配置指南` |
| Download.tsx:172 | `查看完整安装指南 →` | `查看配置指南 →` |
| Download.tsx:210 | `建议先看典型场景和安装指南` | `建议先看典型场景和配置指南` |
| Download.tsx:239 | `建议先阅读安装指南` | `建议先阅读配置指南` |
| Scenarios.tsx:102 | `可以先看安装指南，再决定试用方式。` | `可以先看配置指南，再决定试用方式。` |
| Scenarios.tsx:104 | `查看安装指南` | `查看配置指南` |

- [ ] **Step 2: 残留扫描**

Run: `grep -rn "安装指南" src/ public/`
Expected: 零输出

- [ ] **Step 3: 构建验证 + Commit**

Run: `pnpm type-check && pnpm build`
Expected: 通过

```bash
git add -A && git commit -m "feat(site): 「安装指南」全站更名「配置指南」——导航/页脚/引用文案"
```

---

### Task 10: 终验——构建、双视口走查、内容实机核对

**Files:**
- 无新改动（发现问题回改对应文件）

**Why:** product.md 验收标准的完整执行。
**Search anchor:** `grep -rn "安装指南" src/`

- [ ] **Step 1: 全量构建**

Run: `pnpm type-check && pnpm build`
Expected: 全绿

- [ ] **Step 2: 桌面视口走查（1440px）**

Run: `pnpm exec vite preview`
Expected 逐项核对：
- 目录吸附左侧，点击每个锚点跳转正确、吸顶导航不遮挡（13 节逐一过）
- 滚动时高亮跟随正确
- 13 张截图全部加载、无变形、无真实数据泄露
- 尾部咨询区三卡跳转正常
- 「先去下载页」引导跳转正常

- [ ] **Step 3: 移动视口走查（390px）**

DevTools 切 390px：
- 目录条横滑可用、不遮挡正文
- 截图宽度自适应、无横向滚动条
- 长页滚动流畅

- [ ] **Step 4: 内容实机核对（product.md 验收核心）**

对照隔离实机（Gwork v0.9.17），手册 13 节的操作步骤逐条照做一遍：按钮名称、菜单位置、界面反馈与手册描述一致。任何偏差立即修 manual.ts。

- [ ] **Step 5: 残留与术语终扫**

Run: `grep -rn "安装指南" src/ public/ ; grep -rnE "baseUrl|provider|apiKey" src/data/manual.ts`
Expected: 第一条零输出；第二条仅允许出现在「说人话转译」语境（原则上应为零，出现即评估改写）。

- [ ] **Step 6: 收尾提交（如有回改）**

```bash
git add -A && git commit -m "fix(site): 配置指南终验回改——<具体问题>"
```

---

## 覆盖矩阵

| Product Spec 章节 | 对应 Task | 覆盖状态 |
|---|---|---|
| §1 页面骨架 | Task 1, 2, 3 | ✅ |
| §2 板块一（3 节） | Task 4, 5 | ✅ |
| §3 板块二（3 节） | Task 4, 6 | ✅ |
| §4 板块三（4 节） | Task 4, 7 | ✅ |
| §5 板块四（3 节） | Task 4, 8 | ✅ |
| §6 改名与引用替换 | Task 9 | ✅ |
| 边界情况（移动端/懒加载/版本声明） | Task 3, 4, 10 | ✅ |
| 验收标准 | Task 10 | ✅ |

## 需要辉哥配合的点

- Task 4 截图采集：知识库选文件夹等**原生系统对话框**的截图需要系统录屏权限，可能请辉哥手点（隔离配方已尽量避开）。
- Task 8 安全设置文案：成文后请辉哥审阅开关说明口径。
