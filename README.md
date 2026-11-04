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

**主站发版（2026-11-04 起）**：推送 `main` 后 Forgejo Actions（`.gitea/workflows/site-deploy.yml`）自动构建并部署到 ECS 39.98.121.250（www.gworkai.cn 站点目录 `/var/www/gwork-site`），含线上冒烟断言，合并即上线。手动回退：`pnpm build && rsync -az --delete dist/ ecs-user@39.98.121.250:/var/www/gwork-site/`。

**GitHub Pages 影子站**：影子同步驱动 GitHub Actions（`.github/workflows/deploy.yml`）构建部署 Pages，延迟 ≤30 分钟，仅作展示备用，非主链路。

## 页面结构

| 页面 | 文件 |
| --- | --- |
| 首页 | `index.html`（`src/main-home.tsx`） |
| 功能 | `features.html` |
| 场景 | `scenarios.html` |
| 使用指南（面向用户） | `guide.html` |
| 下载 | `download.html` |
| 联系我们 | `contact.html`（`src/main-contact.tsx`） |
