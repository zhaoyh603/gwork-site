import type { ManualBlock, ManualSection } from '../data/manual';

/** 单个 block 的渲染分发。 */
function BlockView({ block }: { block: ManualBlock }) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="mt-4 text-base leading-7 text-ink-soft">{block.text}</p>;
    case 'steps':
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((step, index) => (
            <li key={`${index}-${step.title}`} className="flex gap-4 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-base font-medium text-ink">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'image':
      return (
        <figure className="mt-5">
          <img src={block.src} alt={block.alt} loading="lazy" width={block.width} height={block.height} className="w-full rounded-2xl border border-white/80 shadow-[0_16px_36px_rgba(19,40,110,0.10)]" />
          {block.caption ? <figcaption className="mt-2 text-center text-xs text-ink-soft">{block.caption}</figcaption> : null}
        </figure>
      );
    case 'tip':
      return (
        <div className="mt-5 rounded-2xl border border-brand/20 bg-brand/5 px-4 py-3">
          <p className="text-sm leading-6 text-ink"><span className="font-semibold text-brand">小贴士：</span>{block.text}</p>
        </div>
      );
    case 'links':
      return (
        <div className="mt-4 flex flex-wrap gap-3">
          {block.items.map((link, index) => (
            <a
              key={`${index}-${link.href}`}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="text-link text-sm"
            >
              {link.label}{link.external ? <span aria-hidden="true"> ↗</span> : ''}
            </a>
          ))}
        </div>
      );
    default: {
      // 穷尽性守卫：manual.ts 新增 block 类型而此处漏渲染时，编译期即报错而非线上内容静默消失
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

/** 手册小节：标题 + block 序列。 */
export default function ManualSectionView({ section }: { section: ManualSection }) {
  return (
    <article id={section.id} className="scroll-mt-24 mt-12 border-t border-white/80 pt-10 first-of-type:border-t-0">
      <h3 className="text-xl font-semibold tracking-tight text-brand-dark">{section.title}</h3>
      {section.blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </article>
  );
}
