import { useEffect, useState } from 'react';
import { SITE } from '../data/site';
import CtaButton from './CtaButton';

export type NavActive = 'home' | 'features' | 'scenarios' | 'guide' | 'download';

const LINKS: Array<{ key: Exclude<NavActive, 'home'>; label: string; href: string }> = [
  { key: 'features', label: '功能', href: './features.html' },
  { key: 'scenarios', label: '场景', href: './scenarios.html' },
  { key: 'guide', label: '使用指南', href: './guide.html' },
];

/** 顶部导航：统一品牌露出、当前页态与下载入口。 */
export default function Nav({ active }: { active: NavActive }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="glass-nav sticky top-0 z-30">
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6 py-3">
        <a href="./index.html" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/80 bg-white/90 shadow-[0_12px_28px_rgba(76,111,255,0.16)] transition-transform duration-300 group-hover:-translate-y-0.5">
            <img src="./icon.png" alt="Gwork 图标" className="h-7 w-7 rounded-xl" />
          </div>
          <div>
            <span className="block text-lg font-semibold tracking-tight text-brand-dark">{SITE.name}</span>
            <span className="block text-xs text-ink-soft">AI 办公智能工作台</span>
          </div>
        </a>
        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              aria-current={active === link.key ? 'page' : undefined}
              className={
                active === link.key
                  ? 'rounded-full bg-brand-soft px-4 py-2 font-medium text-brand shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
                  : 'text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:text-brand-dark'
              }
            >
              {link.label}
            </a>
          ))}
          <CtaButton href="./download.html" size="sm">
            下载 Gwork
          </CtaButton>
        </div>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/85 text-brand-dark shadow-sm transition-all duration-200 hover:-translate-y-0.5 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>
      <div
        className={`mx-4 mb-4 overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_20px_44px_rgba(19,40,110,0.12)] backdrop-blur-xl transition-all duration-300 lg:hidden ${menuOpen ? 'pointer-events-auto max-h-96 translate-y-0 opacity-100' : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'}`}
      >
        <div className="space-y-2 p-4">
          {LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              aria-current={active === link.key ? 'page' : undefined}
              className={
                active === link.key
                  ? 'block rounded-2xl bg-brand-soft px-4 py-3 font-medium text-brand'
                  : 'block rounded-2xl px-4 py-3 text-ink transition-colors hover:bg-surface-soft'
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <CtaButton href="./download.html" size="md">
              下载 Gwork
            </CtaButton>
          </div>
        </div>
      </div>
    </header>
  );
}
