import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Download() {
  return (
    <div className="min-h-screen">
      <Nav active="download" />
      <main className="py-24 text-center">
        <h1 className="text-4xl font-semibold text-brand-dark">下载页骨架</h1>
      </main>
      <Footer />
    </div>
  );
}
