'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  BarChart2,
  Cpu,
  Shield
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-120px)] w-full overflow-hidden flex items-center justify-center rounded-[40px] bg-[#020617]">
      {/* Heavy Animated Background Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-slate-950 to-blue-950/20" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Data Nodes (Decorative) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              y: [0, -30, 0],
              x: mousePosition.x * (i + 1) * 0.2
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute"
            style={{
              top: `${20 + (i * 12)}%`,
              left: `${15 + (i * 15)}%`,
            }}
          >
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Content */}
      <motion.div
        style={{
          rotateX: mousePosition.y * 0.2,
          rotateY: mousePosition.x * 0.2
        }}
        className="relative z-20 w-full max-w-5xl px-6 py-20 flex flex-col items-center text-center perspective-1000"
      >
        {/* Upper Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Cpu className="w-4 h-4 text-blue-400" />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">AI Intelligence Core</span>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-6">
            THE FUTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-emerald-300 animate-premium-shimmer bg-[length:200%_auto] selection:bg-blue-500/30">
              IS ANALYTICAL
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed opacity-80">
            We're engineering a predictive engine that decodes the job market.
            Real-time tracking, success probability, and AI-driven optimizations.
          </p>
        </motion.div>

        {/* Feature Cards Grid (Compact & Premium) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16">
          {[
            { icon: BarChart2, label: 'Success Funnel', desc: 'Conversion analysis' },
            { icon: Activity, label: 'Real-time Pulse', desc: 'Live market trends' },
            { icon: Shield, label: 'Secure Audits', desc: 'Data privacy core' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), ease: "easeOut" }}
              whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.2)' }}
              className="p-8 rounded-[40px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-left group cursor-default transition-colors duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-500">
                <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{feature.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Row Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          {/* Animated Coming Soon Indicator */}
          <div className="relative group">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-blue-600 blur-2xl rounded-full"
            />
            <div className="relative px-12 py-5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/5 to-blue-500/10 animate-premium-shimmer bg-[length:200%_auto]" />
              <span className="relative z-10 text-white font-black text-sm uppercase tracking-[0.4em] flex items-center gap-4">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]"
                />
                Coming Soon
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5 px-8 py-5 rounded-[28px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20 animate-pulse" />
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] relative" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Status</p>
              <p className="text-xs font-bold text-white/90">Core Systems Initializing...</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Floating Orb Container Overlay */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <motion.div
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/10 rounded-full"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -1,
            y: mousePosition.y * -1,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-500/5 rounded-full"
        />
      </div>

      <style jsx global>{`
        @keyframes premium-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
        .animate-premium-shimmer {
          animation: premium-shimmer 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        ::selection {
          background: rgba(59, 130, 246, 0.2);
          color: white;
        }
      `}</style>
    </div>
  );
}
