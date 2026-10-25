import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ContactEmail from '../components/ContactEmail';
import { useReveal } from '../hooks/useReveal';

const CONTACT_NOTES = [
  '安装或使用问题：请附上系统版本、Gwork 版本和复现步骤。',
  '功能建议：请说明使用场景和期望效果。',
  '邮件仅用于回复你的问题，不会公开。',
];

/** 联系我们：提供邮箱入口与写信前的信息说明。 */
export default function Contact() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="contact" />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <section className="reveal">
          <p className="text-xs uppercase tracking-[0.14em] text-brand">联系我们</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-brand-dark lg:text-5xl">有问题或建议？</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">发邮件给我们，我们会尽快回复。</p>
        </section>

        <section className="reveal mt-14 border-t border-line pt-10">
          <div className="rounded-xl border border-line p-8">
            <ContactEmail />
          </div>

          <ul className="mt-10 border-t border-line">
            {CONTACT_NOTES.map((note) => (
              <li key={note} className="border-b border-line py-4 text-sm leading-6 text-ink-soft">
                {note}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
