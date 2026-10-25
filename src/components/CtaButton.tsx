import type { ReactNode } from 'react';

/** 统一主 CTA 按钮：提供渐变品牌色和悬浮反馈。 */
export default function CtaButton({
  href,
  size = 'md',
  children,
}: {
  href: string;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}) {
  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  return (
    <a
      href={href}
      className={`btn-shine inline-flex items-center justify-center rounded-full font-medium text-white transition-opacity duration-200 hover:opacity-90 ${sizes[size]}`}
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
}
