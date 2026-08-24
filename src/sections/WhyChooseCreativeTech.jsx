import React from 'react';
import { X, Check } from 'lucide-react';

export default function WhyChooseCreativeTech() {
  const oldWay = [
    'Generic Templates',
    'Copy-Paste Websites',
    'Slow Updates & Agency Delays',
    'Boring, Static Layouts',
    'No Brand Personality',
    'One-Size-Fits-All Solutions'
  ];

  const creativeTechWay = [
    'Custom Experiences Designed From Scratch',
    'Modern Tech stack (Next.js/Tailwind v4)',
    'Smooth Animations & Interactive UX',
    'AI Integrations & Workflow Automations',
    'Business-Focused Conversion Thinking',
    'Design & Development Handled Together'
  ];

  return (
    <section id="why-creative-tech" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      {/* Backdrop glowing gradient spot */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-accent-purple/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase block mb-3">
            // METRIC COMPARISONS
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            WHY WORK WITH SOMEONE LIKE ME?
          </h2>
          <p className="text-gray-400 text-base font-body max-w-xl">
            Compare the slow templates approach against custom modern interfaces that convert visitors.
          </p>
        </div>

        {/* Side-by-side Comparative grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* The Old Way */}
          <div className="p-8 bg-[#0E1017]/30 border border-white/5 rounded-3xl text-left opacity-60 hover:opacity-80 transition-opacity duration-300 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2">// TEMPLATE MODEL</span>
              <h3 className="font-display font-extrabold text-2xl text-white mb-6 flex items-center gap-2">
                THE OLD WAY
              </h3>
              
              <ul className="space-y-4">
                {oldWay.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-body text-gray-400">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-[10px] font-mono text-gray-500 mt-12 border-t border-white/5 pt-4">
              Slow build iterations // Low business value
            </p>
          </div>

          {/* The Creative Technology Way */}
          <div 
            className="group relative p-8 bg-[#12151F] border border-accent-cyan/20 hover:border-accent-cyan/60 rounded-3xl text-left transition-all duration-300 flex flex-col justify-between shadow-[0_0_20px_rgba(0,229,255,0.05)] hover:shadow-[0_0_25px_rgba(0,229,255,0.12)] scale-[1.002]"
            data-cursor="pointer"
            data-cursor-text="MODERN"
          >
            {/* Backdrop animated glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/[0.02] to-accent-purple/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[9px] font-bold text-accent-cyan uppercase tracking-widest block">// TAILORED EXPERIENCE</span>
                <span className="text-[8px] bg-accent-cyan/15 text-accent-cyan px-2 py-0.5 rounded font-mono font-bold animate-pulse">RECOMMENDED</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white mb-6">
                THE CREATIVE TECHNOLOGY APPROACH
              </h3>

              <ul className="space-y-4 relative z-10">
                {creativeTechWay.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-body text-gray-200 group-hover:text-white transition-colors">
                    <div className="w-5 h-5 rounded-full bg-accent-cyan/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent-cyan" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[10px] font-mono text-accent-cyan mt-12 border-t border-white/5 pt-4 flex justify-between items-center">
              <span>Tailored code solutions // Maximum impact</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping"></span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
