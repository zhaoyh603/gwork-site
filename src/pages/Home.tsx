import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav active="home" />
      <main className="py-24 text-center">
        <h1 className="text-4xl font-semibold text-brand-dark">首页骨架</h1>
      </main>
      <Footer />
    </div>
  );
}
