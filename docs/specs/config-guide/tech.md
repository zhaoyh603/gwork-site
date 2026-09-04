# 官网「配置指南」详细操作手册 — 技术规格

**Status:** 产品已确认
**version:** 1.0
**updated:** 2026-09-04
**changes:** 初版——页面骨架数据结构、组件拆分、截图管线

---

## 现状分析

- `src/pages/Guide.tsx`（108 行）：页头 + INSTALL_STEPS 五卡 + GUIDE_SECTIONS 四卡 + 咨询区，全部内容由 `src/data/guide.ts`（91 行）承载。无锚点目录、无滚动高亮、无长文渲染。
- 全站 5 页共用 Nav/Footer；动效统一走 `useReveal`（IntersectionObserver + `--reveal-delay`）。
- 截图放 `public/screenshots/*.png`（现 7 张），页面经 `ScreenMock` 或 `<img>` 引用；`vite.config` `base: './'` 相对路径构建。
- 手册新内容量大（四大板块 13 小节），若继续塞进 `guide.ts` 单文件会逼近/超出 500 行纪律线。

---

## 变更方案

### 数据结构（新增 `src/data/manual.ts`）

手册内容与骨架分离，`guide.ts` 只留安装引导与咨询区数据。结构化块（block）联合类型：

| Block 类型 | 字段 | 用途 |
|-----------|------|------|
| `paragraph` | text | 小节引入说明 |
| `steps` | items: { title, desc } | 编号操作步骤（核心形态） |
| `image` | src, alt, caption | 实机截图 + 图注 |
| `tip` | text | 小贴士（浅色提示条） |
| `links` | items: { label, href, external? } | 外链/站内链接（DeepSeek 官网等） |

板块结构：`MANUAL_PARTS: ManualPart[]`，`ManualPart = { id, title, intro, sections: ManualSection[] }`，`ManualSection = { id, title, blocks: ManualBlock[] }`。id 即锚点（`guide.html#<id>`）。

### 组件拆分

| 文件 | 职责 |
|------|------|
| `src/pages/Guide.tsx` | 页面组装：页头（改「配置指南」+ 下载页引导句）+ GuideToc + 正文循环 ManualSectionView + 咨询区（保留） |
| `src/components/GuideToc.tsx` | 锚点目录：桌面 `lg:` 左栏 sticky；移动端顶部横滑条。滚动高亮用 IntersectionObserver（`rootMargin` 判定当前小节，模式同 useReveal），无新依赖 |
| `src/components/ManualSectionView.tsx` | 小节渲染器：按 block 类型分发渲染（steps 编号、image 懒加载 `loading="lazy"`、tip 提示条、links） |

`Nav.tsx` / `Footer.tsx` / `Download.tsx` / `Scenarios.tsx` 仅改「安装指南」→「配置指南」文案。`guide.html` 路由名不变。

### 截图管线

1. 实机截图（Gwork v0.9.17，mac 浅色主题）：跑 Gwork 实机逐功能截取，缺口清单见 product.md 各节截图列；产物统一 2x 裁剪、压缩后放 `public/screenshots/`，命名 `guide-<功能点>.png`。
2. 复用现有 7 张中适用的（model-config / kb / assistant / security 等），命名不动的直接引用。
3. 全部 `<img>` 带 `alt` 与 `loading="lazy"`。

---

## 技术实现决策表

| 维度 | 决策内容 |
|------|---------|
| 数据层 | `src/data/manual.ts` 新建（blocks 联合类型 + MANUAL_PARTS）；`src/data/guide.ts` 收缩为安装引导句 + 咨询区数据 |
| 页面 | `Guide.tsx` 重写为骨架组装；锚点 id 规范 `guide.html#<section-id>` |
| 组件 | 新增 `GuideToc.tsx`、`ManualSectionView.tsx`；复用 Nav/Footer/CtaButton/SectionTitle/useReveal |
| 交互 | IntersectionObserver 滚动高亮（无第三方依赖）；锚点跳转平滑滚动（CSS `scroll-behavior` + `scroll-margin-top` 避开吸顶导航） |
| 资源 | 截图 `public/screenshots/guide-*.png`，png 压缩（现有截图同级体量）；`base: './'` 相对路径不受影响 |
| 文案 | 全站「安装指南」→「配置指南」替换：Nav/Footer/Guide 页头/Download/Scenarios |

## 风险与应对

| 风险 | 应对 |
|------|------|
| 手册步骤与实机 UI 不一致误导用户 | 内容写作前逐功能实机核对（product.md 验收标准），成文后辉哥审 |
| 单页截图多导致加载慢 | `loading="lazy"` + png 压缩；控制在 15 张内 |
| 移动端长页目录遮挡内容 | 移动端目录条限高横滑；正文 `scroll-margin-top` 预留 |
| `guide.ts` 删减波及他页引用 | 改动前 grep INSTALL_STEPS/GUIDE_SECTIONS 全部引用点 |

---

## 测试与验证

1. `pnpm type-check && pnpm build`（gwork-site）
2. `vite preview` 本地走查：桌面 1440px 目录跳转/高亮、移动 390px 目录条与截图自适应
3. 手册内容实机逐条核对（Gwork v0.9.17）
4. 全站 grep「安装指南」零残留
