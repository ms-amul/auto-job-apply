'use client';

import { useState } from 'react';
import Container from './Container';
import SignInModal from './auth/SignInModal';
import { Sparkles, ArrowUpRight, Twitter, Linkedin, Github } from 'lucide-react';
import { theme } from '@/utils/theme';

export default function Footer() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

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
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 mb-8 leading-tight">
                    Interested in working together, trying our the platform or simply learning more?
                  </h2>

                  <div className="mt-8">
                    <p className="text-sm text-white/50 mb-2">Contact us at:</p>
                    <a 
                      href="mailto:support@jobvita.com"
                      className="inline-flex items-center gap-2 text-white text-lg hover:text-white/80 transition-colors group"
                    >
                      <span>support@jobvita.com</span>
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
                      href="#pricing" 
                      className="text-white/70 hover:text-white text-base transition-colors"
                    >
                      Pricing
                    </a>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsSignInOpen(true)}
                      className="text-white/70 hover:text-white text-base transition-colors"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10">
              <p className="text-sm text-white/40">
                &copy; {new Date().getFullYear()} JobVita. All rights reserved.
              </p>

              <div className="flex items-center gap-6">
                {[
                  { name: 'LinkedIn', icon: Linkedin, href: '#' },
                  { name: 'Twitter', icon: Twitter, href: '#' },
                  { name: 'GitHub', icon: Github, href: '#' },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-white/40 hover:text-white transition-colors"
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

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </>
  );
}

