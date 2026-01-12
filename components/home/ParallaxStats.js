'use client';

import { useEffect, useRef, useState } from 'react';
import { Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { theme } from '@/utils/theme';
import SignInModal from '../auth/SignInModal';
import Container from '../Container';
import { ImpactBackground, ImpactHeader, StatCard, ImpactCTA } from './impact';

export default function ParallaxStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    {
      icon: Zap,
      category: 'Performance',
      title: 'High Efficiency',
      value: '10K+',
      label: 'Applications / month',
      color: theme.accentPrimary,
      glow: 'rgba(59, 130, 246, 0.4)',
      features: ['Automated vetting', 'Profile optimization', 'Instant submission']
    },
    {
      icon: Users,
      category: 'Community',
      title: 'Global Network',
      value: '2,500',
      label: 'Active Users',
      color: theme.accentSecondary,
      glow: 'rgba(168, 85, 247, 0.4)',
      features: ['Tech roles focus', 'Executive placement', 'Diverse industries']
    },
    {
      icon: TrendingUp,
      category: 'Optimization',
      title: 'Growth Acceleration',
      value: '5x',
      label: 'Faster job landing',
      color: theme.accentTertiary || '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.4)',
      features: ['Smart matching AI', 'Response tracking', 'Priority surfacing']
    },
    {
      icon: Shield,
      category: 'Reliability',
      title: 'Success Ratio',
      value: '87%',
      label: 'Interview Rate',
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.4)',
      features: ['Verified companies', 'Secure data vault', 'GDPR compliant']
    }
  ];

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative py-8 md:py-16 overflow-hidden bg-[#020617]"
    >
      <ImpactBackground />

      <Container>
        <div className="relative z-10">
          <ImpactHeader />

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:px-4">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* <ImpactCTA onSignIn={() => setIsSignInOpen(true)} /> */}
        </div>
      </Container>

    </section>
  );
}
