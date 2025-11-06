import Container from './Container';
import { Sparkles, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <Container>
        <div className="py-6">
          {/* Main Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            {/* Left: Logo + Brand */}
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-7 h-7 bg-linear-to-br from-orange-500 to-rose-500 rounded-lg flex items-center justify-center"
                style={{
                  boxShadow: '0 4px 12px -3px rgba(249, 115, 22, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
                }}
              >
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base font-bold text-white">JobVita</span>
            </div>

            {/* Right: Links + Social */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Links - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-4 text-xs">
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {[
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <Icon className="w-3.5 h-3.5 text-gray-400 hover:text-white transition-colors" strokeWidth={2} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} JobVita. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

