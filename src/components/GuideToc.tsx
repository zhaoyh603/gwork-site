import type { ManualPart } from '../data/manual';

/** 锚点目录（后续任务实现滚动高亮与移动端形态）。 */
export default function GuideToc({ parts }: { parts: ManualPart[] }) {
  return (
    <nav className="lg:w-56 lg:shrink-0">
      {parts.map((part) => (
        <div key={part.id} className="mb-4">
          <a href={`#${part.id}`} className="text-link text-base font-semibold">{part.title}</a>
        </div>
      ))}
    </nav>
  );
}
