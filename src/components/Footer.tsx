import { SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src="./icon.png" alt="Gwork 图标" className="h-5 w-5 rounded" />
          <span className="text-sm text-ink-soft">© 2026 {SITE.name}。保留所有权利。</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-ink-soft">
          {SITE.docsUrl ? (
            <a href={SITE.docsUrl} className="transition-colors hover:text-brand-dark">文档</a>
          ) : null}
          {SITE.github ? (
            <a href={SITE.github} className="transition-colors hover:text-brand-dark">GitHub</a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
