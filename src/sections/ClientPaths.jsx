import React from 'react';
import { ArrowRight, Landmark, Lightbulb, UserCheck } from 'lucide-react';

export default function ClientPaths() {
  const paths = [
    {
      title: 'I HAVE A BUSINESS',
      desc: 'I need a better website, interactive digital menu, online presence, or custom automation pipelines to get more clients.',
      btnText: 'GROW MY BUSINESS',
      icon: <Landmark className="w-6 h-6 text-accent-cyan" />,
      needName: 'Web Development',
      borderColor: 'hover:border-accent-cyan/30'
    },
    {
      title: 'I HAVE AN IDEA',
      desc: 'I want to build a custom website, dashboard platform, software tool, or interactive application from scratch.',
      btnText: 'BUILD MY IDEA',
      icon: <Lightbulb className="w-6 h-6 text-accent-pink" />,
      needName: 'UI/UX & Brand Design',
      borderColor: 'hover:border-accent-pink/30'
    },
    {
      title: 'I NEED A PARTNER',
      desc: 'I need a creative technologist who can blend frontend code, motion animations, automated bots, and video cuts in one place.',
      btnText: "LET'S TALK",
      icon: <UserCheck className="w-6 h-6 text-accent-lime" />,
      needName: 'AI Chatbots & Automation',
      borderColor: 'hover:border-accent-lime/30'
    }
  ];

  const handlePathClick = (needName) => {
    // Select correct checkbox and scroll down to form
    const buttons = Array.from(document.querySelectorAll('#contact button[type="button"]'));
    const targetBtn = buttons.find(b => b.textContent.includes(needName) || needName.includes(b.textContent));
    if (targetBtn) {
      targetBtn.click();
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="work-with-me" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-pink uppercase block mb-3">
            // CONVERSION PATHWAYS
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4 leading-none">
            YOU BRING THE IDEA.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
              I'LL BRING THE DIGITAL EXPERIENCE.
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-body leading-relaxed mt-4">
            You don't need to understand coding, design systems, frameworks, or AI. You just need to tell me what you want to achieve.
          </p>
        </div>

        {/* Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {paths.map((path) => (
            <div 
              key={path.title}
              className={`group p-8 bg-[#12151F]/40 border border-white/5 rounded-3xl hover:bg-[#12151F]/80 transition-all duration-300 flex flex-col justify-between h-[300px] text-left ${path.borderColor}`}
              data-cursor="pointer"
            >
              
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  {path.icon}
                </div>
                
                <h3 className="font-display font-extrabold text-lg text-white mb-3">
                  {path.title}
                </h3>
                
                <p className="text-gray-400 text-xs md:text-sm font-body leading-relaxed">
                  {path.desc}
                </p>
              </div>

              <button
                onClick={() => handlePathClick(path.needName)}
                className="w-full flex items-center justify-center gap-2 bg-[#12151F] hover:bg-[#1C2030] text-white border border-white/10 hover:border-white/20 py-3.5 rounded-xl text-xs font-mono font-bold tracking-wide uppercase transition-colors cursor-pointer mt-6"
              >
                {path.btnText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          ))}
        </div>

        {/* Centered WhatsApp Direct CTA */}
        <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">// DIRECT COMMUNICATION HOTLINE</p>
          <a
            href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] font-display font-extrabold px-8 py-4 rounded-full text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] cursor-pointer"
            data-cursor="pointer"
            data-cursor-text="WHATSAPP"
          >
            Discuss Your Project →
          </a>
        </div>

      </div>
    </section>
  );
}
