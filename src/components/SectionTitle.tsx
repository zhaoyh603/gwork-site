/** 章节标题：统一页内分区的眉题、主标题和说明文案排版。 */
export default function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4">
        <span className="eyebrow-pill tracking-wide">{kicker}</span>
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-brand-dark lg:text-[2rem]">{title}</h2>
      {desc ? <p className="mt-4 text-base text-ink-soft">{desc}</p> : null}
    </div>
  );
}
