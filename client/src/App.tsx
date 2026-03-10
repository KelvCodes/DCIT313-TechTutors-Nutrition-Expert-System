import Header from './components/Header';
import Footer from './components/Footer';
import ChatDemo from './components/ChatDemo';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import { IoRestaurantOutline } from 'react-icons/io5';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-x-hidden bg-white">
      {/* Decorative Blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] height-[500px] bg-sea-blue-light blur-[80px] rounded-full opacity-15 z-0"></div>
      <div className="absolute bottom-[100px] left-[-100px] w-[500px] height-[500px] bg-sea-blue blur-[80px] rounded-full opacity-15 z-0"></div>

      <Header />

      <main className="flex-1 flex flex-col relative z-10 w-full max-w-7xl mx-auto px-0 sm:px-8">
        <section className="pt-28 sm:pt-40 md:pt-48 pb-12 sm:pb-24 flex flex-col md:flex-row items-center gap-10 md:gap-16 px-4 sm:px-0">
          {/* Left Column: Text Content */}
          <div className="flex-1 text-center md:text-left animate-fade-in-up">
            <div className="inline-block px-4 py-2 mb-6 rounded-full bg-sea-blue/10 border border-sea-blue/20 text-sea-blue font-semibold text-xs sm:text-sm shadow-sm">
              ✨ AI Powered Nutrition Assistance
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.15] text-slate-900 tracking-tight">
              Transform Your Health with{' '}
              <span className="bg-gradient-sea bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
                Expert AI Guidance
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Discover personalized dietary plans and symptom-based support through
              our advanced rule-based expert system. Built for your unique biology.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <button className="bg-gradient-sea text-white px-7 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-sea-blue/30 transition-all hover:-translate-y-1 active:scale-95">
                Start Your Journey
              </button>
              <button className="bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-900 px-7 py-3.5 rounded-xl font-bold text-base sm:text-lg hover:bg-white transition-all hover:border-sea-blue/30 group">
                Watch Demo
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image — hidden on very small screens */}
          <div className="flex-1 relative animate-float w-full max-w-sm sm:max-w-none mt-4 md:mt-0">
            <div className="absolute inset-0 bg-gradient-sea rounded-[40px] blur-3xl opacity-20 -z-10 transform scale-90"></div>
            <div className="relative rounded-[28px] sm:rounded-[40px] overflow-hidden border border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop"
                alt="Healthy Nutrition"
                className="w-full h-56 sm:h-72 md:h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Glass Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sea-blue/20 flex items-center justify-center text-sea-blue text-lg sm:text-2xl">
                    <IoRestaurantOutline />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm sm:text-base">Personalized Meal Plan</p>
                    <p className="text-xs text-slate-600">Generated for your goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ChatDemo />
        <HowItWorks />
        <Features />
      </main>

      <Footer />
    </div>
  );
}

export default App;
