import React from 'react';
import { Laptop, UtensilsCrossed, Bot, Layers, ArrowRight } from 'lucide-react';

export default function WhatICanBuild() {
  const concepts = [
    {
      id: 'website',
      icon: <Laptop className="w-8 h-8 text-accent-cyan" />,
      tagline: 'YOUR BUSINESS DESERVES MORE THAN A FACEBOOK PAGE.',
      desc: 'I can build a modern website that gives your business a professional online presence and helps customers understand, trust, and contact your brand.',
      features: [
        'Responsive Website (Mobile + Desktop)',
        'Contact & Inquiry Forms',
        'Detailed Service & Pricing Pages',
        'Google Maps & Location Integration',
        'SEO Foundation for local search rankings',
        'Direct WhatsApp chat links integration',
        'Modern micro-interactions & animations',
        'Hyper-fast loading performance'
      ],
      btnText: 'BUILD MY WEBSITE',
      borderColorClass: 'hover:border-accent-cyan/30',
      numColor: 'text-accent-cyan/10'
    },
    {
      id: 'menu',
      icon: <UtensilsCrossed className="w-8 h-8 text-accent-pink" />,
      tagline: 'TURN YOUR MENU INTO AN EXPERIENCE.',
      desc: 'I can create interactive digital menus and websites for restaurants, cafes, bars, hotels, and food businesses that boost customer engagement.',
      features: [
        'Interactive QR Code Menus',
        'Beautiful, animated food categories',
        'Mobile-friendly swipe navigation',
        'High-quality food image galleries',
        'Animated, modern user interface',
        'Contact, location, and operating hours info',
        'Social media channels links integration',
        'Digital ordering & cart simulation support'
      ],
      btnText: 'CREATE MY DIGITAL MENU',
      borderColorClass: 'hover:border-accent-pink/30',
      numColor: 'text-accent-pink/10'
    },
    {
      id: 'ai',
      icon: <Bot className="w-8 h-8 text-accent-lime" />,
      tagline: 'LET YOUR BUSINESS WORK SMARTER.',
      desc: 'I can help design intelligent automation systems and chatbot routers that reduce repetitive manual tasks and speed up client updates.',
      features: [
        'AI Chatbots & Virtual Assistants',
        'Customer Support Q&A Automation',
        'Automated Lead Collection workflows',
        'WhatsApp Business bot responses',
        'Custom embedded website bots',
        'Workflow connections (Zapier/Make)',
        'Database logging automations'
      ],
      btnText: 'AUTOMATE MY BUSINESS',
      borderColorClass: 'hover:border-accent-lime/30',
      numColor: 'text-accent-lime/10'
    },
    {
      id: 'webapp',
      icon: <Layers className="w-8 h-8 text-accent-blue" />,
      tagline: "HAVE AN IDEA? LET'S MAKE IT REAL.",
      desc: 'From startup ideas to internal company dashboards and management sheets, I can help turn complex concepts into functional products.',
      features: [
        'Custom Web Applications (React/Next.js)',
        'Interactive Client Dashboards',
        'Dynamic platforms with relational databases',
        'Interactive booking & scheduling tools',
        'Community discussion boards',
        'Internal business management portals',
        'Secure user authentication setups'
      ],
      btnText: 'DISCUSS MY IDEA',
      borderColorClass: 'hover:border-accent-blue/30',
      numColor: 'text-accent-blue/10'
    }
  ];

  const handleScrollToContact = (needName) => {
    // Fill need select and scroll down
    const needInput = document.querySelector(`button[type="button"]`);
    if (needInput) {
      // Find element and trigger click to select
      const buttons = Array.from(document.querySelectorAll('#contact button[type="button"]'));
      const targetBtn = buttons.find(b => b.textContent.includes(needName) || needName.includes(b.textContent));
      if (targetBtn) targetBtn.click();
    }
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="what-i-build" className="relative py-24 overflow-hidden border-t border-white/5">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase block mb-3">
            // CLIENT FOCUS & FUTURE BUILDS
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4 leading-none">
            DON'T HAVE A PORTFOLIO TO SHOW YOU. YET.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
              LET'S BUILD YOURS NEXT.
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-body leading-relaxed mt-4">
            Every great portfolio starts somewhere. Instead of showing you recycled templates, I'd rather focus on what I can create specifically to grow your business.
          </p>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {concepts.map((concept, index) => (
            <div
              key={concept.id}
              className={`group clay-card p-8 rounded-3xl border border-white/5 hover:bg-[#0E1017] transition-all duration-500 text-left flex flex-col justify-between min-h-[500px] relative overflow-hidden ${concept.borderColorClass}`}
              data-cursor="pointer"
              data-cursor-text={concept.btnText.split(' ')[0]}
            >
              
              {/* Giant background count */}
              <div className={`absolute -top-10 -right-10 font-display font-black text-[120px] ${concept.numColor} select-none pointer-events-none`}>
                0{index + 1}
              </div>

              <div>
                {/* Header icon */}
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300">
                  {concept.icon}
                </div>

                {/* Tagline */}
                <h4 className="font-mono text-xs font-bold text-accent-cyan tracking-wider uppercase mb-3">
                  {concept.tagline}
                </h4>

                {/* Title and details */}
                <h3 className="font-display font-extrabold text-2xl text-white mb-4">
                  {concept.btnText.replace('MY ', '')}
                </h3>

                <p className="text-gray-400 text-sm font-body leading-relaxed mb-6">
                  {concept.desc}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-8">
                  {concept.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-400 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call-to-action button */}
              <button
                onClick={() => handleScrollToContact(concept.id === 'website' ? 'Web Development' : concept.id === 'menu' ? 'Digital QR Menu' : concept.id === 'ai' ? 'AI Chatbots' : 'UI/UX')}
                className="w-full flex items-center justify-center gap-2 bg-[#12151F] hover:bg-[#1C2030] text-white border border-white/10 hover:border-accent-cyan/30 py-4 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 uppercase cursor-pointer"
              >
                {concept.btnText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
