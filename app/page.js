import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroParallax from '@/components/home/HeroParallax';
import Features from '@/components/home/Features';
import ProcessParallax from '@/components/home/ProcessParallax';
import ParallaxStats from '@/components/home/ParallaxStats';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className='pt-10'>
        <HeroParallax />
        <Features />
        <ProcessParallax />
        <ParallaxStats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
