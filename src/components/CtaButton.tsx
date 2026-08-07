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
      className={`btn-shine inline-flex items-center justify-center rounded-2xl font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(52,87,244,0.34)] active:translate-y-0 active:shadow-[0_12px_22px_rgba(52,87,244,0.22)] ${sizes[size]}`}
    >
      <span className="relative z-10">{children}</span>
    </a>
  );
}
