import HeroParallax from '@/components/home/HeroParallax';
import Features from '@/components/home/Features';
import ProcessParallax from '@/components/home/ProcessParallax';
import ParallaxStats from '@/components/home/ParallaxStats';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroParallax />
      <Features />
      <ProcessParallax />
      <ParallaxStats />
      <CTA />
    </div>
  );
}
