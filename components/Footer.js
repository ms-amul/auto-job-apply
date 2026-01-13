'use client';

import { brand, Logo } from '@/utils/brand';
import { theme } from '@/utils/theme';
import { ArrowUpRight, Github, Globe, Linkedin, Sparkles, Twitter } from 'lucide-react';
import Container from './Container';

export default function Footer() {

  return (
    <>
      <footer className="relative overflow-hidden">
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #2d1b3d 100%)',
          }}
        />

        <Container>
          <div className="relative z-10">
            {/* Top Section */}
            <div className="pt-16 pb-12">
              <div className="flex flex-col lg:flex-row justify-between gap-12">
                {/* Left: Heading */}
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                    <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
                    <span className="text-xs text-white/80">Contact Us</span>
                  </div>

                  <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8 leading-tight">
                    Interested in working together, trying our the platform or simply learning more?
                  </h2>

                  <div className="mt-8">
                    <p className="text-sm text-white/50 mb-2">Contact us at:</p>
                    <a
                      href={`mailto:${brand.contact.email}`}
                      className="inline-flex items-center gap-2 text-white text-lg hover:text-white/80 transition-colors group"
                    >
                      <span>{brand.contact.email}</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right: Navigation */}
                <div className="flex flex-wrap gap-8 lg:gap-12">
                  <div>
                    <a
                      href="#how-it-works"
                      className="text-white/70 hover:text-white text-base transition-colors"
                    >
                      How It Works
                    </a>
                  </div>
                  <div>
                    <a
                      href="#features"
                      className="text-white/70 hover:text-white text-base transition-colors"
                    >
                      Features
                    </a>
                  </div>
                  <div>
                    <a
                      href="#impact"
                      className="text-white/70 hover:text-white text-base transition-colors"
                    >
                      Impact
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10">
              <div className="flex flex-col items-center md:items-start gap-3">
                {/* Logo and Copyright */}
                <div className="flex items-center gap-3">
                  <Logo size="sm" theme={theme} />
                  <p className="text-sm text-white/40">
                    &copy; {new Date().getFullYear()} {brand.getName()}. All rights reserved.
                  </p>
                </div>

                {/* Powered by Nexi - Highlighted */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs text-white/50">Powered by</span>
                  <span className="text-sm font-bold text-white">Nexi</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {[
                  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/company/rangam-inc/posts/?feedView=all', type: 'icon' },
                  { name: 'Rangam', icon: Globe, href: 'https://www.rangam.com', type: 'badge' },
                  { name: 'Nexi', icon: Globe, href: 'https://nexi.net.in', type: 'badge' },
                ].map((social) => {
                  const Icon = social.icon;

                  if (social.type === 'badge') {
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <Icon className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" strokeWidth={2} />
                        <span className="text-[10px] font-bold text-white/70 group-hover:text-white uppercase tracking-wider">{social.name}</span>
                        {/* Premium Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 blur-md transition-all duration-300" />
                      </a>
                    );
                  }

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}

