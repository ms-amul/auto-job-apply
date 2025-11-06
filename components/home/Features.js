import Container from '../Container';

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How AutoApply AI Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Land your dream job faster with AI-powered automation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl md:text-4xl">⚡</span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">1. Set Your Preferences</h3>
            <p className="text-gray-600">Tell us your dream role, skills, salary expectations, and location preferences</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl md:text-4xl">🤖</span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">2. AI Does the Work</h3>
            <p className="text-gray-600">Our AI searches thousands of jobs and automatically applies on your behalf</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl md:text-4xl">🎯</span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">3. Get Interviews</h3>
            <p className="text-gray-600">Track responses and focus on preparing for interviews, not filling forms</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

