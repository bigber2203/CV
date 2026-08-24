import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: 'What kind of websites can you build?',
      a: 'I build everything from sleek business websites and portfolios to interactive digital menus, high-converting landing pages, client dashboards, and custom web applications.'
    },
    {
      q: "Can you help me even if I don't understand technology?",
      a: 'Absolutely. You do not need to understand coding or frameworks. You describe your business objectives in plain language, and I handle the designs, databases, server setups, and bot configurations.'
    },
    {
      q: 'Will my website work on phones?',
      a: 'Yes. Every project is engineered mobile-first. I test all interfaces across multiple screen widths (from 320px up to wide 1920px screens) to ensure responsive compatibility.'
    },
    {
      q: 'Can you redesign my existing website?',
      a: 'Yes. I can import your content, modernize the design aesthetic to feel premium, improve mobile responsiveness, speed up page loading times, and integrate AI automations.'
    },
    {
      q: 'Can you add AI or automation to my business?',
      a: 'Yes. Depending on your needs, we can deploy conversational customer support chatbots, automated leads collection databases, WhatsApp business bots, and Zapier/Make workflow systems.'
    },
    {
      q: 'Can we start with a small project?',
      a: 'Definitely. Starting with a simple landing page or digital menu is a great way to launch fast. We can scale the features and add more pages as your business expands.'
    }
  ];

  const toggleAccordion = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      {/* Background glow spot */}
      <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-accent-pink/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase block mb-3">
            // FAQ REGISTER
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            FREQUENTLY ASKED.
          </h2>
          <p className="text-gray-400 text-base font-body">
            Have questions about pricing, project scales, or AI integration? Here are straightforward answers.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx}
                className="p-1.5 rounded-2xl bg-[#0E1017]/40 border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                  data-cursor="pointer"
                >
                  <span className="font-display font-bold text-sm md:text-base text-white hover:text-accent-cyan transition-colors pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    isOpen ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' : 'border-white/10 text-gray-500'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-5 pt-0 text-gray-400 text-xs md:text-sm font-body leading-relaxed border-t border-white/5 mt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
