import React, { useState } from 'react';
import { Code, Brush, Move, Bot, Sparkles } from 'lucide-react';

export default function Toolbox() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

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
    <section id="toolbox" className="relative py-24 bg-[#0E1017]/40 border-y border-white/5 overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      {/* Background glow spot */}
      <div className="absolute top-[20%] left-[-10%] w-[45%] h-[45%] bg-accent-cyan/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
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
              className={`group p-8 bg-[#12151F]/40 border border-white/5 rounded-3xl hover:bg-[#12151F]/90 transition-all duration-500 text-left min-h-[300px] flex flex-col justify-between relative overflow-hidden ${cat.glowClass}`}
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

      </div>
    </section>
  );
}
