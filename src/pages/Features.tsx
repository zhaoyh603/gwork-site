import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Features() {
  return (
    <div className="min-h-screen">
      <Nav active="features" />
      <main className="py-24 text-center">
        <h1 className="text-4xl font-semibold text-brand-dark">功能页骨架</h1>
      </main>
      <Footer />
    </div>
  );
}
