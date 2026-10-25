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
          className="btn-shine inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium text-white transition-opacity duration-200 hover:opacity-90"
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
