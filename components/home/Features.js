'use client';

import Container from '../Container';
import { Zap, Bot, Target, Sparkles, Rocket, TrendingUp, Clock, Mail, BarChart3, Shield, RefreshCw, Bell } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Set your preferences and watch AI apply to hundreds of jobs in minutes',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
    },
    {
      icon: Bot,
      title: 'AI-Powered Matching',
      description: 'Our AI analyzes job descriptions and matches them perfectly with your profile',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
    },
    {
      icon: RefreshCw,
      title: '24/7 Auto-Pilot',
      description: 'Agent runs continuously in the background, scanning and applying to new jobs automatically',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
    },
    {
      icon: Target,
      title: 'Smart Profile Matching',
      description: 'Intelligent algorithm matches your profile with job requirements for perfect fit every time',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: Sparkles,
      title: 'Auto Application',
      description: 'Automatically fills out applications, uploads documents, and submits - while you sleep',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      icon: Mail,
      title: 'Instant Notifications',
      description: 'Get real-time email alerts for every application submitted and company response received',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50 to-pink-50',
    },
    {
      icon: BarChart3,
      title: 'Live Tracking Dashboard',
      description: 'Monitor all applications, track status changes, and manage responses in one beautiful interface',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
    },
    {
      icon: Clock,
      title: 'Save 40+ Hours Weekly',
      description: 'Let automation handle the tedious work while you focus on interview preparation',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared. Complete control over your job search',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss a follow-up or interview with intelligent notification system',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'from-violet-50 to-purple-50',
    },
  ];

  const FeatureCard = ({ feature, keyPrefix }) => {
    const Icon = feature.icon;
    
    return (
      <div
        key={keyPrefix}
        className="group relative w-96 md:w-[420px] shrink-0"
      >
        <div className={`
          relative h-full bg-white/3 backdrop-blur-3xl rounded-3xl p-8 md:p-10
          border border-white/20
          shadow-2xl
          transition-all duration-700 ease-out
          transform hover:-translate-y-2 hover:scale-[1.02]
          overflow-hidden
        `}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        }}
        >
          {/* Premium glass reflection with multiple layers */}
          <div className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-transparent opacity-80"></div>
          <div className="absolute inset-0 bg-linear-to-tl from-white/8 via-transparent to-transparent opacity-60"></div>
          
          {/* Glass shine top edge */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-0 left-1/4 right-1/4 h-12 bg-linear-to-b from-white/10 to-transparent blur-sm"></div>
          
          {/* Animated gradient background */}
          <div className={`
            absolute inset-0 bg-linear-to-br ${feature.color}
            opacity-0 group-hover:opacity-[0.08]
            transition-opacity duration-700
          `}></div>
          
          {/* Enhanced shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
          </div>

          {/* Subtle frosted glass texture */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)'
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Premium glassmorphic icon container */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8">
              {/* Icon glow backdrop */}
              <div className={`
                absolute inset-0 bg-linear-to-br ${feature.color}
                rounded-3xl blur-2xl opacity-40 group-hover:opacity-60
                transition-all duration-700 animate-pulse
              `}></div>
              
              {/* Glass icon box */}
              <div className={`
                relative w-full h-full
                bg-linear-to-br ${feature.color}
                rounded-3xl
                flex items-center justify-center
                transform group-hover:scale-110 group-hover:rotate-6
                transition-all duration-700
                overflow-hidden
              `}
              style={{
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4), inset 0 2px 0 0 rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              }}
              >
                {/* Glass shine overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/20 to-transparent"></div>
                
                <Icon className="relative z-10 w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-2xl" strokeWidth={2.5} />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-400 group-hover:to-rose-400 transition-all duration-500 tracking-tight">
              {feature.title}
            </h3>
            
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light">
              {feature.description}
            </p>
          </div>

          {/* Subtle corner accent glows */}
          <div className={`
            absolute -top-16 -right-16 w-32 h-32
            bg-linear-to-br ${feature.color}
            rounded-full
            opacity-0 group-hover:opacity-20
            transition-all duration-700
            blur-3xl
          `}></div>
          
          <div className={`
            absolute -bottom-16 -left-16 w-32 h-32
            bg-linear-to-br ${feature.color}
            rounded-full
            opacity-0 group-hover:opacity-15
            transition-all duration-700
            blur-3xl
          `}></div>

          {/* Subtle border highlight */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-0 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="features" 
      className="relative py-20 md:py-32 bg-linear-to-b from-gray-900 via-slate-900 to-gray-900 overflow-hidden"
    >
      {/* Premium dark background with mesh gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 -right-32 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px)'
          }}
        ></div>
      </div>

      <Container>
        <div className="relative z-10 text-left mb-16 md:mb-20">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 mb-6 shadow-2xl">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold bg-linear-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              AI-Powered Features
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            <span className="bg-linear-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
              Powered by
            </span>
            <br />
            <span className="bg-linear-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
              Advanced AI
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Experience the future of job applications with our{' '}
            <span className="text-orange-400 font-semibold">intelligent automation</span>
          </p>
        </div>
      </Container>

      {/* Glassmorphic carousel with corner fade accents */}
      <div className="relative">
        {/* Subtle left corner fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 via-gray-900/30 to-transparent backdrop-blur-[1px]"></div>
        </div>
        
        {/* Subtle right corner fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-l from-gray-900/80 via-gray-900/30 to-transparent backdrop-blur-[1px]"></div>
        </div>
        
        <div className="overflow-hidden py-4">
          <div className="flex gap-8 md:gap-10 marquee-container">
            {/* First set of features */}
            {features.map((feature, index) => (
              <FeatureCard key={`first-${index}`} feature={feature} keyPrefix={`first-${index}`} />
            ))}
            
            {/* Duplicate set for seamless loop */}
            {features.map((feature, index) => (
              <FeatureCard key={`second-${index}`} feature={feature} keyPrefix={`second-${index}`} />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className="relative z-10 mt-10">
          <div className="text-left mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Agentic Workflow
              </span>
            </h3>
            <p className="text-lg md:text-xl text-gray-400">
              Your personal AI agent working 24/7 to land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: '01',
                icon: Target,
                title: 'Agent Scans',
                description: 'Continuously monitors job boards for new postings matching your criteria',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                step: '02',
                icon: Bot,
                title: 'AI Matches',
                description: 'Analyzes requirements vs your profile using advanced ML algorithms',
                color: 'from-purple-500 to-pink-500',
              },
              {
                step: '03',
                icon: Rocket,
                title: 'Auto Applies',
                description: 'Fills applications, uploads resume, and submits automatically',
                color: 'from-orange-500 to-red-500',
              },
              {
                step: '04',
                icon: Mail,
                title: 'You Track',
                description: 'Get instant email alerts and monitor everything in your dashboard',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Connecting line for desktop */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/4 left-full w-8 h-0.5 z-0">
                      <div className={`h-full bg-linear-to-r ${item.color} opacity-30`}></div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
                    </div>
                  )}

                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:-translate-y-2"
                    style={{
                      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-60 rounded-2xl"></div>
                    
                    {/* Step number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center">
                      <span className="text-white font-black text-sm">{item.step}</span>
                    </div>

                    {/* Icon */}
                    <div className={`relative w-16 h-16 md:w-20 md:h-20 bg-linear-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                      style={{
                        boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.4), inset 0 2px 0 0 rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent rounded-2xl"></div>
                      <Icon className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
                      
                      {/* Glow */}
                      <div className={`absolute inset-0 bg-linear-to-br ${item.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                    </div>

                    {/* Content */}
                    <h4 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bottom accent */}
                    <div className={`mt-6 h-1 bg-linear-to-r ${item.color} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats highlight */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '24/7', label: 'Always Active' },
              { value: '100+', label: 'Jobs/Day' },
              { value: '< 30s', label: 'Per Application' },
              { value: '100%', label: 'Automated' },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative bg-white/3 backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-black bg-linear-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
