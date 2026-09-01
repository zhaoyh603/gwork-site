import { SITE } from '../data/site';

const FOOTER_LINKS = [
  { label: '功能', href: './features.html' },
  { label: '场景', href: './scenarios.html' },
  { label: '安装指南', href: './guide.html' },
] as const;

/** 页脚：承接品牌信息和对外链接，保持与页面整体视觉一致。 */
export default function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/70 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/80 bg-white shadow-sm">
            <img src="./icon.png" alt="Gwork 图标" className="h-5 w-5 rounded" />
          </div>
          <span className="text-sm text-ink-soft">© 2026 {SITE.name}。保留所有权利。</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-ink-soft">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-brand-dark">
              {link.label}
            </a>
          ))}
          {SITE.docsUrl ? (
            <a href={SITE.docsUrl} className="transition-colors hover:text-brand-dark">文档</a>
          ) : null}
          {SITE.github ? (
            <a href={SITE.github} className="transition-colors hover:text-brand-dark">GitHub</a>
          ) : null}
          <a href={SITE.issuesUrl} className="transition-colors hover:text-brand-dark">问题反馈</a>
        </div>
      </div>
    </footer>
  );
}
