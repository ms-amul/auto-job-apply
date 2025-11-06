import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
