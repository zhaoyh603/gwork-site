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
      className={`inline-block rounded-md bg-brand font-medium text-white shadow-sm transition-colors hover:bg-brand-hover ${sizes[size]}`}
    >
      {children}
    </a>
  );
}
