import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, MapPin, Cpu, Layout, FileCode, PlaySquare } from 'lucide-react';

export default function About({ activeSection }) {

  const domains = [
    { name: 'Web Development', icon: <FileCode className="w-4 h-4 text-accent-cyan" /> },
    { name: 'Frontend Engineering', icon: <Layout className="w-4 h-4 text-accent-blue" /> },
    { name: 'Digital Product Design', icon: <Sparkles className="w-4 h-4 text-accent-purple" /> },
    { name: 'AI & Business Automation', icon: <Cpu className="w-4 h-4 text-accent-lime" /> },
    { name: 'Digital Menus', icon: <ShieldCheck className="w-4 h-4 text-accent-pink" /> },
    { name: 'Graphic Design & Video Editing', icon: <PlaySquare className="w-4 h-4 text-white" /> }
  ];

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
  const isActive = activeSection === 'about';
  const isPast = sectionIndex[activeSection] > 1;
  const xOffset = isMobile ? 0 : (isPast ? -50 : 50);

  return (
    <section 
      id="about" 
      className="relative py-24 overflow-hidden border-y border-white/5"
    >
      
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>

      <motion.div 
        animate={{ 
          opacity: isActive ? 1 : 0, 
          x: xOffset 
        }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 text-left glass-panel p-8 md:p-10 shadow-[0_0_35px_rgba(0,220,255,0.04)]">
            <span className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase block mb-3">
              // WHO IS BIGYAT DEB?
            </span>
            
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
              MORE THAN JUST A DEVELOPER.
            </h2>
            
            <p className="text-gray-300 text-base md:text-lg font-body leading-relaxed mb-6">
              I'm Bigyat Deb, a creative technologist and full stack web developer based in Guwahati, Assam. I enjoy combining technology, design, and creativity to build digital experiences that don't just look good — they solve real business problems, automate workflows, and boost brand identity.
            </p>

            <p className="text-gray-400 text-sm md:text-base font-body leading-relaxed mb-8">
              Whether you are an ambitious startup, a local cafe, or an established agency, I design and build solutions optimized for growth. I handle everything from pixel-perfect frontend layouts and database configurations to AI agent integration.
            </p>

            {/* Domains grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {domains.map((domain, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-[#12151F]/40 border border-white/5 rounded-xl hover:border-white/10 hover:bg-[#12151F]/80 transition-all duration-300"
                >
                  <div className="p-2 bg-white/5 rounded-lg">
                    {domain.icon}
                  </div>
                  <span className="font-body text-sm font-semibold text-gray-300">{domain.name}</span>
                </div>
              ))}
            </div>

            {/* Subtle education note */}
            <div className="p-4 bg-accent-cyan/5 border border-accent-cyan/15 rounded-xl flex items-start gap-3">
              <span className="text-[10px] font-mono bg-accent-cyan/20 text-accent-cyan px-2 py-0.5 rounded mt-0.5">ACADEMICS</span>
              <p className="text-xs text-gray-400 font-body leading-relaxed">
                Subtly blending academic graduation paths in Technology & Business with real-world full-stack development, design engineering, and client solutions.
              </p>
            </div>
          </div>

          {/* Right Column (Visual telemetry / Status card) */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-panel p-6 text-left relative overflow-hidden shadow-[0_0_35px_rgba(130,80,255,0.04)]">
              {/* Card glowing title */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-lime animate-pulse"></span>
                  OPERATIONAL LOG
                </span>
                <span className="text-[9px] font-mono text-gray-500">BD_SYS_V2.6</span>
              </div>

              {/* Attributes */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-gray-400">
                    <span>DEVELOPMENT POWER</span>
                    <span className="text-accent-cyan font-bold">94%</span>
                  </div>
                  <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                    <div className="bg-accent-cyan h-full w-[94%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-gray-400">
                    <span>DESIGN ENGINE</span>
                    <span className="text-accent-purple font-bold">89%</span>
                  </div>
                  <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                    <div className="bg-accent-purple h-full w-[89%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1 text-gray-400">
                    <span>AI & AUTOMATION CORES</span>
                    <span className="text-accent-lime font-bold">91%</span>
                  </div>
                  <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                    <div className="bg-accent-lime h-full w-[91%]"></div>
                  </div>
                </div>
              </div>

              {/* Details table */}
              <div className="mt-6 border-t border-white/5 pt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">BASE_LOCATION:</span>
                  <span className="text-white flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accent-cyan" /> Guwahati, Assam, IN
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">WORK_STYLE:</span>
                  <span className="text-accent-cyan">CLIENT DRIVEN / RESULTS FOCUS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">LATEST_STACK:</span>
                  <span className="text-white">REACT / NEXT / NODE / GSAP</span>
                </div>
              </div>

              {/* Decorative graphic nodes */}
              <div className="mt-6 flex justify-around p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                <div>
                  <p className="font-display font-black text-lg text-white">20+</p>
                  <p className="text-[9px] font-mono text-gray-500 uppercase">PROJECTS DONE</p>
                </div>
                <div className="border-r border-white/5"></div>
                <div>
                  <p className="font-display font-black text-lg text-white">99%</p>
                  <p className="text-[9px] font-mono text-gray-500 uppercase">CLIENT RATE</p>
                </div>
                <div className="border-r border-white/5"></div>
                <div>
                  <p className="font-display font-black text-lg text-white">4.9/5</p>
                  <p className="text-[9px] font-mono text-gray-500 uppercase">RATING SCORE</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Tech DNA marquee bar */}
      <div className="mt-20 border-y border-white/5 py-4 bg-[#12151F]/20 relative overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-24 text-sm font-display font-extrabold tracking-widest text-[#00E5FF]/20 select-none uppercase">
          <span>CODE // DESIGN // AI // AUTOMATION // CREATIVITY</span>
          <span>CODE // DESIGN // AI // AUTOMATION // CREATIVITY</span>
          <span>CODE // DESIGN // AI // AUTOMATION // CREATIVITY</span>
          <span>CODE // DESIGN // AI // AUTOMATION // CREATIVITY</span>
          <span>CODE // DESIGN // AI // AUTOMATION // CREATIVITY</span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: inline-flex;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
