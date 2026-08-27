import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PrayerFlags from '../components/PrayerFlags/PrayerFlags';


export default function Hero({ activeSection }) {
  const roles = [
    'FULL STACK DEVELOPER',
    'CREATIVE TECHNOLOGIST',
    'FRONTEND ENGINEER',
    'DIGITAL DESIGNER',
    'AUTOMATION BUILDER'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Rotating roles loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const sectionIndex = {
    home: 0,
    about: 1,
    services: 2,
    'possibility-lab': 3,
    toolbox: 4,
    faq: 5,
    contact: 6
  };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const isActive = activeSection === 'home';
  const isPast = sectionIndex[activeSection] > 0;
  const xOffset = isMobile ? 0 : (isPast ? -50 : 50);



  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <section 
      id="home" 
      className="relative min-h-[100svh] flex items-center justify-center pt-24 overflow-hidden"
    >

      {/* Grid line divider overlay */}
      <div className="absolute top-[80px] left-0 w-full h-[1px] bg-white/5 z-1"></div>
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>

      {/* Interactive Prayer Flags */}
      <PrayerFlags />

      <motion.div 
        animate={{ 
          opacity: isActive ? 1 : 0, 
          x: xOffset 
        }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-4xl w-full mx-auto px-6 flex flex-col items-center justify-center text-center z-10 py-12 md:py-0"
      >
        
        {/* Main Content Column */}
        <div className="flex flex-col items-center text-center w-full">
          
          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
            Creative Technology Studio
          </div>

          {/* Big Name */}
          <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight text-white mb-2 leading-none">
            BIGYAT DEB
          </h1>

          {/* Morphing Roles Text */}
          <div className="h-10 md:h-12 overflow-hidden mb-6 flex justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-lg md:text-2xl font-display font-semibold tracking-widest text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]"
              >
                {roles[currentRoleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Big Headline */}
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight mb-6 text-center max-w-3xl mx-auto">
            I BUILD DIGITAL EXPERIENCES THAT MAKE BUSINESSES{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
              IMPOSSIBLE TO IGNORE.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-gray-400 text-base md:text-lg font-body leading-relaxed mb-8 max-w-xl mx-auto text-center">
            From high-performance websites and digital menus to intelligent automation and creative digital experiences — I help businesses turn ideas into powerful products that drive conversions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full mx-auto">
            <button
              onClick={() => handleScrollTo('contact')}
              className="flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00c5dd] text-[#08090D] font-extrabold px-6 py-4 rounded-full text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.45)] cursor-pointer"
              data-cursor="pointer"
              data-cursor-text="LET'S TALK"
            >
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] font-mono font-bold px-6 py-4 rounded-full text-xs tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)] cursor-pointer"
              data-cursor="pointer"
              data-cursor-text="WHATSAPP"
            >
              Let's Talk on WhatsApp →
            </a>
            <button
              onClick={() => handleScrollTo('what-i-build')}
              className="flex items-center justify-center gap-2 bg-[#12151F] hover:bg-[#181C2A] text-white border border-white/10 hover:border-white/20 px-6 py-4 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer"
              data-cursor="pointer"
            >
              What I Can Build <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
