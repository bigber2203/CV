import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Possibility Lab', id: 'possibility-lab' },
    { name: 'Toolbox', id: 'toolbox' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple intersection observer logic for active sections
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed navbar
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -offset, duration: 1.2 });
      } else {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-[#08090D]/80 backdrop-blur-md border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="font-display font-extrabold text-2xl tracking-tighter text-white hover:text-accent-cyan transition-colors"
            data-cursor="pointer"
            data-cursor-text="GO HOME"
          >
            BD<span className="text-accent-cyan">.</span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5 px-1.5 py-1 glass-panel-light rounded-full">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium font-body transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-accent-cyan font-semibold bg-white/5'
                    : 'text-gray-400 hover:text-white'
                }`}
                data-cursor="pointer"
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#00E5FF]"></span>
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              data-cursor="pointer"
              data-cursor-text="WHATSAPP"
            >
              Chat on WhatsApp →
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-accent-cyan transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-35 bg-[#08090D] flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-2xl font-display font-semibold transition-all duration-200 ${
                activeSection === link.id ? 'text-accent-cyan scale-105' : 'text-gray-400'
              }`}
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] px-6 py-3.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all"
          >
            Chat on WhatsApp →
          </a>
        </div>
      </div>
    </>
  );
}
