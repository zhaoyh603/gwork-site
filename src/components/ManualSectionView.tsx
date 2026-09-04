import type { ManualSection } from '../data/manual';

/** 小节渲染器（后续任务实现 block 分发）。 */
export default function ManualSectionView({ section }: { section: ManualSection }) {
  return (
    <article id={section.id} className="scroll-mt-24 mt-12">
      <h3 className="text-xl font-semibold text-brand-dark">{section.title}</h3>
    </article>
  );
}
