import Container from '../Container';

export default function CTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to land your dream job?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their job search with AutoApply AI
          </p>
          <button className="bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-medium hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-2">
            Start Applying for Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-sm text-gray-500 mt-4">No credit card required • 100 free applications</p>
        </div>
      </Container>
    </section>
  );
}

