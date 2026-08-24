import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FinalCTA() {
  const handleScrollToForm = () => {
    const el = document.getElementById('contact-form-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 bg-[#08090D] overflow-hidden border-t border-white/5">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      {/* Pulsing light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-tr from-accent-cyan/10 to-accent-purple/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
        
        <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase block">
          // FINAL SUBMISSION CALL
        </span>

        <h2 className="font-display font-black text-4xl md:text-7xl text-white tracking-tight leading-none max-w-4xl mx-auto">
          HAVE AN IDEA?
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
            LET'S BUILD IT TOGETHER ↗
          </span>
        </h2>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-body leading-relaxed">
          Have a business that needs a better digital presence? Have an idea you've been thinking about? Let's talk and figure out what's possible.
        </p>

        {/* Large animated magnetic button */}
        <div className="pt-6">
          <a
            href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] font-display font-black text-lg md:text-2xl px-10 py-6 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_45px_rgba(37,211,102,0.65)] cursor-pointer"
            data-cursor="pointer"
            data-cursor-text="WHATSAPP"
          >
            Discuss Your Project <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
