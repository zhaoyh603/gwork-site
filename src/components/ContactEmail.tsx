import { useState } from 'react';

/** 联系邮箱拆成多段，页面源码中不出现完整地址；点击后再拼接并复制。 */
const EMAIL_PARTS = ['gwork', 'yonghui', 'app'] as const;

export default function ContactEmail() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const address = `${EMAIL_PARTS[0]}@${EMAIL_PARTS[1]}.${EMAIL_PARTS[2]}`;

  const revealAndCopy = async () => {
    setRevealed(true);
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪贴板不可用时仍显示地址，用户可手动复制
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!revealed ? (
        <button
          type="button"
          onClick={revealAndCopy}
          className="btn-shine inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(52,87,244,0.34)] active:translate-y-0 active:shadow-[0_12px_22px_rgba(52,87,244,0.22)]"
        >
          <span className="relative z-10">显示并复制邮箱</span>
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <a
            href={`mailto:${address}?subject=${encodeURIComponent('Gwork 反馈')}`}
            className="text-link text-lg font-medium"
          >
            {address}
          </a>
          <button
            type="button"
            onClick={revealAndCopy}
            aria-live="polite"
            className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm text-ink-soft transition-colors hover:text-brand-dark"
          >
            {copied ? '已复制' : '复制地址'}
          </button>
        </div>
      )}
    </div>
  );
}
