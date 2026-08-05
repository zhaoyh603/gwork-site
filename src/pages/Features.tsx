import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CtaButton from '../components/CtaButton';
import ScreenMock from '../components/ScreenMock';
import { FEATURES } from '../data/features';

/** 每节配图变体：公文→secretary，知识库→kb，其余→workspace */
const MOCK_BY_NO: Record<string, 'workspace' | 'secretary' | 'kb'> = {
  '01': 'secretary',
  '02': 'workspace',
  '03': 'workspace',
  '04': 'workspace',
  '05': 'workspace',
  '06': 'kb',
  '07': 'kb',
};

export default function Features() {
  return (
    <div className="min-h-screen">
      <Nav active="features" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-brand">功能一览</p>
          <h1 className="text-4xl font-semibold text-brand-dark">七大能力，覆盖办公日常</h1>
          <p className="mt-4 text-base text-ink-soft">每一项都能直接上手，不需要配置服务器。</p>
        </div>

        {FEATURES.map((f, i) => (
          <section key={f.no} className="grid items-center gap-10 border-t border-line py-16 lg:grid-cols-2">
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <p className="text-sm font-semibold text-brand">{f.no}</p>
              <h2 className="mt-2 text-2xl font-semibold text-brand-dark">{f.title}</h2>
              <p className="mt-4 leading-relaxed text-ink">{f.desc}</p>
              <p className="mt-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-sm text-ink">
                适用场景：{f.scenario}
              </p>
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <ScreenMock variant={MOCK_BY_NO[f.no]} />
            </div>
          </section>
        ))}

        <section className="py-16 text-center">
          <h2 className="text-2xl font-semibold text-brand-dark">还不确定适不适合？</h2>
          <p className="mt-3 text-base text-ink-soft">下载安装，本地跑起来就知道。</p>
          <div className="mt-6">
            <CtaButton href="./download.html">下载 Gwork</CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
