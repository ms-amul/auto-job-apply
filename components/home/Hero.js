import Container from '../Container';
import { theme } from '../../utils/theme';
import { Trophy, Rocket, ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pb-16 md:pb-24 pt-24 md:pt-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fadeInUp" style={{ animationDuration: '1s' }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Your dream job is{' '}
              <span className="relative inline-block">
                one click
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke={theme.accentPrimary} strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              {' '}away
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              For <span className="font-medium" style={{ color: theme.accentPrimary }}>job seekers</span>, <span className="font-medium" style={{ color: theme.accentPrimary }}>career changers</span>, and <span className="font-medium" style={{ color: theme.accentPrimary }}>professionals</span> who want to apply to hundreds of jobs effortlessly and land interviews faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fadeInUp" style={{ animationDuration: '1s', animationDelay: '0.3s' }}>
              <button
                className="group text-white px-8 py-4 rounded-full text-base font-bold transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                style={{ 
                  background: theme.getAccentGradient(90),
                  boxShadow: `0 20px 40px -10px ${theme.accentPrimary}60`
                }}
              >
                Start Applying for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
              <button className="group border-2 border-gray-300 text-gray-800 px-8 py-4 rounded-full text-base font-bold hover:border-gray-400 hover:bg-white/80 backdrop-blur-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                <Play className="w-4 h-4 fill-gray-800" strokeWidth={0} />
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start animate-fadeInUp" style={{ animationDuration: '1s', animationDelay: '0.5s' }}>
              <div 
                className="relative bg-white/80 backdrop-blur-sm border-2 border-white rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                <div className="absolute inset-0 opacity-[0.08]" style={{ background: theme.getAccentGradient(135) }}></div>
                <Trophy className="w-4 h-4 relative z-10" style={{ color: theme.accentPrimary }} strokeWidth={2.5} />
                <span className="text-xs font-bold relative z-10" style={{ color: theme.accentPrimary }}>#1 Product of the Day</span>
              </div>
              <div 
                className="relative bg-white/80 backdrop-blur-sm border-2 border-white rounded-xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                style={{
                  boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                <div className="absolute inset-0 opacity-[0.08]" style={{ background: theme.getAccentGradient(135) }}></div>
                <Rocket className="w-4 h-4 relative z-10" style={{ color: theme.accentSecondary }} strokeWidth={2.5} />
                <span className="text-xs font-bold relative z-10" style={{ color: theme.accentPrimary }}>#3 Product of the Week</span>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              {/* Main Profile Image Placeholder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full shadow-xl overflow-hidden" style={{ background: theme.getAccentGradient(135), opacity: 0.25 }}>
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              {/* Floating Feature Card 1 */}
              <div 
                className="absolute top-8 left-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 max-w-xs animate-float border-2 border-white/90 overflow-hidden hover:scale-105 transition-all duration-300" 
                style={{
                  animationDelay: '0s',
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 0 0 1px ${theme.accentPrimary}15`
                }}
              >
                {/* Premium glass reflection */}
                <div className="absolute inset-0 bg-linear-to-br from-white/60 via-white/20 to-transparent pointer-events-none"></div>
                {/* Solid background behind text */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg" style={{ background: theme.getAccentGradient(135) }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-gray-900 drop-shadow-sm">Apply with one prompt</p>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 2 - Job Card */}
              <div 
                className="absolute top-32 right-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 w-64 animate-float border-2 border-white/90 overflow-hidden hover:scale-105 transition-all duration-300" 
                style={{
                  animationDelay: '0.5s',
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 0 0 1px ${theme.accentPrimary}15`
                }}
              >
                {/* Premium glass reflection */}
                <div className="absolute inset-0 bg-linear-to-br from-white/60 via-white/20 to-transparent pointer-events-none"></div>
                {/* Solid background behind text */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                
                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-full shrink-0 shadow-lg" style={{ background: theme.getAccentGradient(135) }}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate drop-shadow-sm">Alex Johnson</p>
                    <p className="text-xs text-gray-700 truncate font-medium">Software Engineer • Google</p>
                    <div className="flex gap-1 mt-1.5">
                      <span className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-md font-semibold border border-gray-200/50">React</span>
                      <span className="text-xs bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-md font-semibold border border-gray-200/50">Node</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ 
                      color: theme.accentPrimary,
                      background: `${theme.accentPrimary}15`,
                    }}>92%</span>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 3 */}
              <div 
                className="absolute bottom-32 left-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 max-w-xs animate-float border-2 border-white/90 overflow-hidden hover:scale-105 transition-all duration-300" 
                style={{
                  animationDelay: '1s',
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 0 0 1px ${theme.accentPrimary}15`
                }}
              >
                {/* Premium glass reflection */}
                <div className="absolute inset-0 bg-linear-to-br from-white/60 via-white/20 to-transparent pointer-events-none"></div>
                {/* Solid background behind text */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-lg" style={{ background: theme.getAccentGradient(135) }}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-gray-900 drop-shadow-sm">Auto-apply to 100+ jobs</p>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 4 - Search */}
              <div 
                className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 w-72 animate-float border-2 border-white/90 overflow-hidden hover:scale-105 transition-all duration-300" 
                style={{
                  animationDelay: '1.5s',
                  boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 0 0 1px ${theme.accentPrimary}15`
                }}
              >
                {/* Premium glass reflection */}
                <div className="absolute inset-0 bg-linear-to-br from-white/60 via-white/20 to-transparent pointer-events-none"></div>
                {/* Solid background behind text */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg" style={{ background: theme.getAccentGradient(135) }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-700 font-semibold drop-shadow-sm">Searching for Senior Developer...</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ background: theme.accentPrimary }}></div>
                      <div className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ background: theme.accentPrimary, animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ background: theme.accentPrimary, animationDelay: '0.4s' }}></div>
                      <span className="text-xs text-gray-700 ml-1 font-semibold">Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Feature Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Apply</h3>
              <p className="text-sm text-gray-600">Apply to multiple jobs with one click</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-sm text-gray-600">AI finds the best jobs for your profile</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Auto Follow-up</h3>
              <p className="text-sm text-gray-600">Automated follow-ups to boost response rates</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: theme.getAccentGradient(135) }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Dashboard to monitor all applications</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

