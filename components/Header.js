import Container from './Container';

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <Container>
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">A</span>
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-900">AutoApply AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          </div>
          <button className="bg-black text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </Container>
    </nav>
  );
}

