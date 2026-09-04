# Gwork 官网

Gwork 产品官网（纯静态站，Vite + React + Tailwind CSS），自动部署到 GitHub Pages。

## 环境要求

- Node.js ≥ 22
- pnpm ≥ 11

## 本地开发

```bash
# 安装依赖（lockfile 的 tarball 绑定 npmmirror 镜像，需对齐 registry）
pnpm config set registry https://registry.npmmirror.com
pnpm install

# 启动开发服务器
pnpm dev

# 类型检查 / 构建
pnpm type-check
pnpm build
```

构建产物输出到 `dist/`，可直接用任意静态服务器预览：

```bash
pnpm build && pnpm exec vite preview
```

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）自动构建并部署到 GitHub Pages，无需手动操作。也可在 Actions 页面手动触发 `workflow_dispatch`。

## 页面结构

| 页面 | 文件 |
| --- | --- |
| 首页 | `index.html`（`src/main-home.tsx`） |
| 功能 | `features.html` |
| 场景 | `scenarios.html` |
| 配置指南（面向用户） | `guide.html` |
| 下载 | `download.html` |
