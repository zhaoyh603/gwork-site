import { SITE } from '../data/site';
import CtaButton from './CtaButton';

export type NavActive = 'home' | 'features' | 'download';

const LINKS: Array<{ key: NavActive; label: string; href: string }> = [
  { key: 'features', label: '功能', href: './features.html' },
  { key: 'download', label: '下载', href: './download.html' },
];

export default function Nav({ active }: { active: NavActive }) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="./index.html" className="flex items-center gap-2">
          <img src="./icon.png" alt="Gwork 图标" className="h-7 w-7 rounded-md" />
          <span className="text-lg font-semibold text-brand-dark">{SITE.name}</span>
        </a>
        <div className="flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={
                active === link.key
                  ? 'font-medium text-brand'
                  : 'text-ink-soft transition-colors hover:text-brand-dark'
              }
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.docsUrl || './download.html'}
            className="text-ink-soft transition-colors hover:text-brand-dark"
          >
            文档
          </a>
          <CtaButton href="./download.html" size="sm">
            下载 Gwork
          </CtaButton>
        </div>
      </nav>
    </header>
  );
}
