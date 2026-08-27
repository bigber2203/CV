import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import CornerPrayerFlags from '../components/PrayerFlags/CornerPrayerFlags';


export default function FAQ({ activeSection }) {
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
  const isActive = activeSection === 'faq';
  const isPast = sectionIndex[activeSection] > 5;
  const xOffset = isMobile ? 0 : (isPast ? -50 : 50);

  const toggleAccordion = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      className="relative py-24 overflow-hidden"
    >

      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>

      {/* Corner Prayer Flags */}
      <CornerPrayerFlags />

      <motion.div 
        animate={{ 
          opacity: isActive ? 1 : 0, 
          x: xOffset 
        }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left mb-16 max-w-2xl"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-accent-pink uppercase block mb-3">
            // FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-none">
            COMMON INQUIRIES.
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-body leading-relaxed">
            Here are quick explanations regarding project timelines, AI capabilities, design revisions, and operational logistics.
          </p>
        </motion.div>

        {/* FAQ Accordion Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="faq-glass-card overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                  data-cursor="pointer"
                >
                  <span className="font-display font-bold text-sm md:text-base text-gray-200 hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <div className="p-1 bg-white/5 rounded-lg border border-white/5 text-gray-400">
                    {isOpen ? <Minus className="w-4 h-4 text-accent-pink" /> : <Plus className="w-4 h-4" />}
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
        </motion.div>

      </motion.div>
    </section>
  );
}
