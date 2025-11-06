import Container from '../Container';

export default function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fadeInUp">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Your dream job is{' '}
              <span className="relative inline-block">
                one click
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="#F97316" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              {' '}away
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              For <span className="text-orange-500 font-medium">job seekers</span>, <span className="text-orange-500 font-medium">career changers</span>, and <span className="text-orange-500 font-medium">professionals</span> who want to apply to hundreds of jobs effortlessly and land interviews faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="group bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                Try AutoApply for Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-base font-medium hover:border-gray-400 hover:bg-gray-50 transition-all">
                Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <span className="text-orange-500 text-xs font-semibold">🏆 #1 Product of the Day</span>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <span className="text-orange-500 text-xs font-semibold">🚀 #3 Product of the Week</span>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[600px]">
              {/* Main Profile Image Placeholder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-linear-to-br from-gray-200 to-gray-300 rounded-full shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>

              {/* Floating Feature Card 1 */}
              <div className="absolute top-8 left-0 bg-white rounded-2xl shadow-xl p-4 max-w-xs animate-float" style={{animationDelay: '0s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Apply with one prompt</p>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 2 - Job Card */}
              <div className="absolute top-32 right-0 bg-white rounded-2xl shadow-xl p-4 w-64 animate-float" style={{animationDelay: '0.5s'}}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">Alex</p>
                    <p className="text-xs text-gray-500 truncate">Software Engineer • Google</p>
                    <div className="flex gap-1 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">React</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Node</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-green-600">92% Match</span>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 3 */}
              <div className="absolute bottom-32 left-4 bg-white rounded-2xl shadow-xl p-4 max-w-xs animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-rose-500 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Auto-apply to 100+ jobs</p>
                  </div>
                </div>
              </div>

              {/* Floating Feature Card 4 - Search */}
              <div className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl p-4 w-72 animate-float" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Searching for Senior Developer...</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <span className="text-xs text-gray-500 ml-1">Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Feature Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Apply</h3>
              <p className="text-sm text-gray-600">Apply to multiple jobs with one click</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-sm text-gray-600">AI finds the best jobs for your profile</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Auto Follow-up</h3>
              <p className="text-sm text-gray-600">Automated follow-ups to boost response rates</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
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

