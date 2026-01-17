'use client';

import { motion } from 'framer-motion';
import { BarChart } from 'lucide-react';
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
    <div className="flex items-center justify-center min-h-[90vh]">

      {/* Background Mesh & Grid Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft colorful blobs for mesh effect */}
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-purple-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-indigo-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />

        {/* Faded Grid Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        style={{
          rotateX: mousePosition.y * -0.05,
          rotateY: mousePosition.x * 0.05,
        }}
        className="relative z-10 flex flex-col items-center justify-center text-center perspective-1000"
      >

        {/* Classy CSS Animation Element */}
        <div className="relative mb-10 group cursor-default">
          {/* Pulse Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-1000 animate-pulse-slow" />

          {/* Central Classy Icon/Badge */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-3xl rotate-6 animate-float" />
            <div className="absolute inset-0 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center border border-white/60 backdrop-blur-sm z-10 animate-float-delayed">
              <BarChart className="w-10 h-10 text-slate-700" />
            </div>
            {/* Orbiting Dot */}
            <div className="absolute inset-[-12px] animate-spin-slow">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30 absolute top-0 left-1/2 -translate-x-1/2" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6 max-w-lg relative z-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Coming Soon
            </span>
          </div>

          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Analytics</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              We are engineering a predictive engine to decode your application performance with AI-driven insights.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-10px) rotate(8deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
