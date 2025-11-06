'use client';

import Container from '../Container';
import { Zap, Bot, Target, Sparkles, Rocket, TrendingUp } from 'lucide-react';

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
      icon: Target,
      title: 'Precision Targeting',
      description: 'Apply only to jobs that match your skills, salary expectations, and career goals',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: Sparkles,
      title: 'Smart Optimization',
      description: 'Automatically optimize your resume and cover letter for each application',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
    {
      icon: Rocket,
      title: 'Instant Applications',
      description: 'From job posting to submitted application in under 30 seconds',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50',
    },
    {
      icon: TrendingUp,
      title: 'Track Success',
      description: 'Real-time dashboard showing application status, responses, and interview requests',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
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
          relative h-full bg-white rounded-3xl p-8 md:p-10
          border-2 border-gray-100
          shadow-xl hover:shadow-2xl
          transition-all duration-700 ease-out
          transform hover:-translate-y-3 hover:scale-105
          overflow-hidden
          backdrop-blur-sm
        `}>
          {/* Gradient background on hover */}
          <div className={`
            absolute inset-0 bg-linear-to-br ${feature.bgColor}
            opacity-0 group-hover:opacity-100
            transition-opacity duration-700
          `}></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className={`
              w-20 h-20 md:w-24 md:h-24
              bg-linear-to-br ${feature.color}
              rounded-3xl
              flex items-center justify-center
              mb-8
              transform group-hover:scale-110 group-hover:rotate-6
              transition-all duration-700
              shadow-xl group-hover:shadow-2xl
              ring-4 ring-white/50
            `}>
              <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-orange-600 group-hover:to-rose-600 transition-all duration-500">
              {feature.title}
            </h3>
            
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">
              {feature.description}
            </p>

            {/* Animated indicator with glow */}
            <div className={`
              mt-8 h-1.5 bg-linear-to-r ${feature.color}
              rounded-full
              transform scale-x-0 group-hover:scale-x-100
              transition-transform duration-700
              origin-left
              shadow-lg group-hover:shadow-xl
            `}></div>
          </div>

          {/* Corner accents */}
          <div className={`
            absolute -top-16 -right-16 w-32 h-32
            bg-linear-to-br ${feature.color}
            rounded-full
            opacity-0 group-hover:opacity-20
            transition-all duration-700
            blur-3xl
            animate-pulse
          `}></div>
          
          <div className={`
            absolute -bottom-16 -left-16 w-32 h-32
            bg-linear-to-br ${feature.color}
            rounded-full
            opacity-0 group-hover:opacity-15
            transition-all duration-700
            blur-3xl
            animate-pulse
          `}></div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="features" 
      className="relative py-16 md:py-24 bg-linear-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Powered by Advanced AI
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of job applications with our intelligent automation
          </p>
        </div>
      </Container>

      {/* Auto-scrolling carousel with fade edges */}
      <div className="relative">
        {/* Left fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-linear-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        
        {/* Right fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-linear-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        
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
    </section>
  );
}
