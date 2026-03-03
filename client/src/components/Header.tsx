import { useState } from 'react';

const navLinks = ['Home', 'About', 'How it works', 'Features'];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 sm:top-8 left-0 sm:left-8 right-0 sm:right-8 z-[1000] rounded-none sm:rounded-[18px] bg-[rgba(255,255,255,0.7)] sm:bg-[rgba(255,255,255,0.45)] backdrop-blur-xl sm:backdrop-blur-[18px] border-b sm:border border-[rgba(255,255,255,0.4)] shadow-sm sm:shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4">
        {/* Logo */}
        <span className="text-xl sm:text-2xl font-bold bg-gradient-sea bg-clip-text text-transparent">
          Nutrix-AI
        </span>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 lg:gap-8">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-slate-700 font-medium transition-colors hover:text-sea-blue text-sm">
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button className="hidden md:flex bg-gradient-sea text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,119,190,0.3)]">
          Get Started
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-800 rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4 border-t border-white/30 mt-1 pt-4">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 font-medium hover:text-sea-blue transition-colors text-sm">
              {item}
            </a>
          ))}
          <button className="bg-gradient-sea text-white px-5 py-3 rounded-xl font-semibold text-sm w-full mt-1">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
