import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Brush, Move, Bot, Sparkles } from 'lucide-react';
import CinematicBackground from '../components/CinematicBackground';

export default function Toolbox({ activeSection }) {
  const sectionRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
  const isActive = activeSection === 'toolbox';
  const isPast = sectionIndex[activeSection] > 4;
  const xOffset = isMobile ? 0 : (isPast ? -50 : 50);

  const categories = [
    {
      id: 'code',
      title: 'CODE',
      icon: <Code className="w-6 h-6 text-accent-cyan" />,
      desc: 'Developing fast, semantic frontend interfaces and secure backend API connections.',
      tools: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'Databases', 'APIs', 'Vite'],
      glowClass: 'group-hover:border-accent-cyan/40',
      accentColor: 'text-accent-cyan'
    },
    {
      id: 'design',
      title: 'DESIGN',
      icon: <Brush className="w-6 h-6 text-accent-pink" />,
      desc: 'Creating custom layout wireframes, color guidelines, branding templates, and user flows.',
      tools: ['Figma', 'UI/UX Design', 'Graphic Design', 'Visual Branding', 'Asset Creation', 'Social Creatives'],
      glowClass: 'group-hover:border-accent-pink/40',
      accentColor: 'text-accent-pink'
    },
    {
      id: 'motion',
      title: 'MOTION',
      icon: <Move className="w-6 h-6 text-accent-purple" />,
      desc: 'Wiring smooth page scrolling animations, element zooms, and scroll-triggers.',
      tools: ['GSAP', 'Framer Motion', 'Scroll Animation', '3D Interactions', 'Motion Design', 'Transitions'],
      glowClass: 'group-hover:border-accent-purple/40',
      accentColor: 'text-accent-purple'
    },
    {
      id: 'automation',
      title: 'AUTOMATION',
      icon: <Bot className="w-6 h-6 text-accent-lime" />,
      desc: 'Connecting webhooks, setting up chatbots, and syncing data to workbooks automatically.',
      tools: ['AI Chatbots', 'OpenAI APIs', 'WhatsApp Bots', 'Workflow Loops', 'Zapier & Make', 'Business Automation'],
      glowClass: 'group-hover:border-accent-lime/40',
      accentColor: 'text-accent-lime'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="toolbox" 
      className="relative py-24 overflow-hidden border-y border-white/5"
    >
      {/* Cinematic Background Layer */}
      <CinematicBackground
        src="/backgrounds/section-bazaar-banners.jpg"
        webp="/backgrounds/section-bazaar-banners.webp"
        mobile="/backgrounds/section-bazaar-banners-mobile.webp"
        objectPosition="center center"
        overlayStrength="strong"
        parallax={true}
        kenBurns={false}
        sectionRef={sectionRef}
      />

      {/* Structural details */}
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
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase block mb-3">
            // DEVELOPER TOOLKIT
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            MY CREATIVE TOOLBOX.
          </h2>
          <p className="text-gray-400 text-base font-body max-w-xl">
            Hover over any category block below to explore what technical tools and design frameworks I use to bring ideas to life.
          </p>
        </div>

        {/* Toolbox Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onMouseEnter={() => setHoveredCategory(cat.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`group p-8 glass-panel hover:bg-[#12151F]/60 transition-all duration-500 text-left min-h-[300px] flex flex-col justify-between relative overflow-hidden ${cat.glowClass}`}
              data-cursor="pointer"
            >
              
              {/* Category Header */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-white group-hover:scale-105 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 group-hover:text-white/20 transition-colors uppercase tracking-widest">
                    MODULE_{cat.title}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {cat.title}
                </h3>
                
                <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                  {cat.desc}
                </p>

                {/* Floating Chips */}
                <div className="flex flex-wrap gap-2 transition-opacity duration-300">
                  {cat.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="px-2.5 py-1 rounded bg-[#08090D] border border-white/5 text-gray-300 text-xs font-mono group-hover:border-white/15 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Futuristic animated footer text */}
              <div className="mt-8 pt-4 border-t border-white/5 min-h-[25px] flex items-center">
                {hoveredCategory === cat.id ? (
                  <p className={`font-mono text-[9px] font-bold tracking-widest uppercase animate-pulse flex items-center gap-1.5 ${cat.accentColor}`}>
                    <Sparkles className="w-3.5 h-3.5" /> THIS IS HOW IDEAS BECOME REALITY.
                  </p>
                ) : (
                  <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                    SYSTEM STATUS // IDLE
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
