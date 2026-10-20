import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionTitle from '../components/SectionTitle';
import ContactEmail from '../components/ContactEmail';
import { useReveal } from '../hooks/useReveal';

/** 联系我们：提供邮箱入口与写信前的信息说明。 */
export default function Contact() {
  const revealRef = useReveal<HTMLDivElement>();

  return (
    <div className="site-shell" ref={revealRef}>
      <Nav active="contact" />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="reveal surface-card-soft px-8 py-14 text-center">
          <SectionTitle
            kicker="联系我们"
            title="有问题或建议？"
            desc="发邮件给我们，我们会尽快回复。"
          />
          <div className="mx-auto max-w-xl">
            <ContactEmail />
            <ul className="mt-10 space-y-3 text-left text-sm leading-relaxed text-ink-soft">
              <li>安装或使用问题：请附上系统版本、Gwork 版本和复现步骤。</li>
              <li>功能建议：请说明使用场景和期望效果。</li>
              <li>邮件仅用于回复你的问题，不会公开。</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
