/** 章节标题：统一页内分区的眉题、主标题和说明文案排版。 */
export default function SectionTitle({
  kicker,
  title,
  desc,
  motto,
}: {
  kicker: string;
  title: string;
  desc?: string;
  /** 典故点睛句（可选）。与 desc 同传时合并为一行：楷体典故 + 白话短说明。 */
  motto?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4">
        <span className="eyebrow-pill tracking-wide">{kicker}</span>
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-brand-dark lg:text-[2rem]">{title}</h2>
      {motto && desc ? (
        <p className="mt-3 flex flex-wrap items-baseline justify-center gap-x-3">
          <span className="font-classic text-base tracking-[0.2em] text-brand-dark/70">{motto}</span>
          <span className="text-sm text-ink-soft">· {desc}</span>
        </p>
      ) : motto ? (
        <p className="font-classic mt-3 text-base tracking-[0.2em] text-ink-soft">{motto}</p>
      ) : desc ? (
        <p className="mt-4 text-base text-ink-soft">{desc}</p>
      ) : null}
    </div>
  );
}
