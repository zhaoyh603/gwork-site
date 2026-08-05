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
      <p className="mb-3 text-sm font-medium tracking-wide text-brand">{kicker}</p>
      <h2 className="text-3xl font-semibold text-brand-dark">{title}</h2>
      {desc ? <p className="mt-4 text-base text-ink-soft">{desc}</p> : null}
    </div>
  );
}
