import type { ReactNode } from 'react';

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
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  return (
    <a
      href={href}
      className={`inline-block rounded-md bg-brand font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-md active:translate-y-0 active:shadow-sm ${sizes[size]}`}
    >
      {children}
    </a>
  );
}
