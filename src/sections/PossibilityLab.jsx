import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Send, Share2, Layers } from 'lucide-react';
import CinematicBackground from '../components/CinematicBackground';

export default function PossibilityLab() {
  const [activeScenario, setActiveScenario] = useState('brand');

  const scenarios = [
    {
      id: 'brand',
      question: 'A WEBSITE THAT FEELS LIKE YOUR BRAND?',
      tag: 'Brand Identity',
      visualTitle: 'Custom UI Layout Wireframe',
      renderVisual: () => (
        <div className="flex flex-col gap-3 p-6 text-left h-full justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[9px] font-mono text-gray-500">
            <span>PROJECT: BD_WEB_CORE</span>
            <span>RENDER_MODE: GRID</span>
          </div>
          {/* Mock Website Grid */}
          <div className="space-y-2">
            <div className="w-2/3 h-4 bg-accent-cyan/20 rounded animate-pulse"></div>
            <div className="w-full h-2.5 bg-white/5 rounded"></div>
            <div className="w-5/6 h-2.5 bg-white/5 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#12151F] border border-white/5 rounded p-3 text-center">
              <p className="text-[14px] text-white font-extrabold font-display">UNIQUE</p>
              <p className="text-[8px] text-gray-500 font-mono">Tailored Styling</p>
            </div>
            <div className="bg-[#12151F] border border-white/5 rounded p-3 text-center">
              <p className="text-[14px] text-[#A3FF12] font-extrabold font-display">99%</p>
              <p className="text-[8px] text-gray-500 font-mono">Brand Alignment</p>
            </div>
          </div>
          <div className="text-[8px] font-mono text-accent-cyan/60 flex items-center justify-between">
            <span>NO BORING TEMPLATES</span>
            <span>GRID_SYSTEM // ACTIVE</span>
          </div>
        </div>
      )
    },
    {
      id: 'menu',
      question: 'A DIGITAL MENU CUSTOMERS ENJOY USING?',
      tag: 'Hospitality UX',
      visualTitle: 'Bistro Food Category Deck',
      renderVisual: () => (
        <div className="flex flex-col gap-3 p-6 text-left h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[9px] font-mono text-gray-500">
            <span>MOBILE_VIEWPORT // QR_MENU</span>
            <span>₹ INR</span>
          </div>
          {/* Menu Mockup Card */}
          <div className="bg-[#12151F] border border-[#EC4899]/20 rounded-xl p-3 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-lg bg-accent-pink/10 flex items-center justify-center text-accent-pink">☕</div>
            <div className="flex-1 text-xs">
              <p className="text-white font-bold">Assam Smoked Latte</p>
              <p className="text-gray-500 text-[9px]">With organic honey drops</p>
            </div>
            <span className="text-accent-pink font-bold text-xs">₹280</span>
          </div>
          {/* Quick buttons */}
          <div className="flex gap-2 text-[8px] font-mono justify-around text-gray-400">
            <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/5">HOT DRINKS</span>
            <span className="bg-accent-pink/15 text-accent-pink px-2.5 py-1 rounded-full border border-accent-pink/20">COLD BREWS</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/5">DESSERTS</span>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[10px] font-mono">
            <span className="text-gray-500">CART TOTAL:</span>
            <span className="text-white font-bold">₹280.00</span>
          </div>
        </div>
      )
    },
    {
      id: 'ai',
      question: 'AN AI ASSISTANT ANSWERING CUSTOMERS 24/7?',
      tag: 'AI Automations',
      visualTitle: 'Intelligent LLM Chat Logger',
      renderVisual: () => (
        <div className="flex flex-col gap-3.5 p-6 text-left h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[9px] font-mono text-gray-500">
            <span>CLIENT_SOCKET // AGENT_READY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse"></span>
          </div>
          <div className="space-y-2">
            <div className="bg-[#12151F] border border-white/5 rounded-lg p-2 text-[8px] max-w-[80%]">
              <p className="text-gray-500">CLIENT:</p>
              <p className="text-white">Are you open this Sunday in Guwahati?</p>
            </div>
            <div className="bg-accent-lime/10 border border-accent-lime/20 rounded-lg p-2 text-[8px] max-w-[85%] ml-auto text-right">
              <p className="text-accent-lime font-bold">AI_ASSISTANT:</p>
              <p className="text-white">Yes! We are open from 9 AM to 10 PM. Can I reserve a table for you?</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 border border-white/5 rounded-lg px-2.5 py-1.5 bg-[#08090D] justify-between text-[9px]">
            <span className="text-gray-500">Auto-booking reservation...</span>
            <Send className="w-3 h-3 text-accent-lime" />
          </div>
        </div>
      )
    },
    {
      id: 'automation',
      question: 'A SYSTEM THAT AUTOMATES REPETITIVE WORK?',
      tag: 'Business Integrations',
      visualTitle: 'API Webhook Pipeline logs',
      renderVisual: () => (
        <div className="flex flex-col gap-3 p-6 text-left h-full justify-between font-mono text-[8px]">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 text-gray-500">
            <span>FLOW_PIPELINE // RUNNING</span>
            <span className="text-accent-blue animate-spin"><RefreshCw className="w-2.5 h-2.5" /></span>
          </div>
          <div className="space-y-1.5 text-gray-400">
            <p className="flex justify-between text-white">
              <span>[01] Form Submitted</span>
              <span className="text-accent-lime">OK</span>
            </p>
            <p className="flex justify-between">
              <span>[02] AI Router Lead Analysis</span>
              <span className="text-accent-lime">OK</span>
            </p>
            <p className="flex justify-between">
              <span>[03] Update CRM Google Worksheet</span>
              <span className="text-accent-lime">OK</span>
            </p>
            <p className="flex justify-between">
              <span>[04] Send SMS notification</span>
              <span className="text-accent-lime">OK</span>
            </p>
          </div>
          <div className="bg-[#12151F] border border-white/5 p-2 rounded text-center text-accent-blue font-bold">
            PIPELINE STATUS // SYNCED IN 1.2s
          </div>
        </div>
      )
    },
    {
      id: 'sketch',
      question: 'A DIGITAL PRODUCT FROM JUST AN IDEA?',
      tag: 'Product Design',
      visualTitle: 'Sketch wireframe compilation',
      renderVisual: () => (
        <div className="flex flex-col gap-3 p-6 text-left h-full justify-between">
          <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[9px] font-mono text-gray-500">
            <span>IDEA_SKETCH // COMPILING</span>
            <span>100%</span>
          </div>
          <div className="flex items-center justify-center gap-6 h-28 relative">
            {/* Sketch Side */}
            <div className="flex-1 border border-dashed border-white/20 p-2 rounded text-center text-[8px] font-mono text-gray-500">
              <p>IDEA SKETCH</p>
              <div className="border border-dashed border-white/10 h-8 mt-1.5 flex items-center justify-center">📐</div>
            </div>
            {/* Morph indicator */}
            <div className="text-accent-purple animate-pulse">➔</div>
            {/* Compilation Side */}
            <div className="flex-1 bg-[#12151F] border border-accent-purple/30 p-2 rounded text-center text-[8px] font-mono text-white">
              <p className="font-bold text-accent-purple">DEPLOYED APP</p>
              <div className="bg-accent-purple/10 border border-accent-purple/20 h-8 mt-1.5 rounded flex items-center justify-center text-[10px]">📱</div>
            </div>
          </div>
          <p className="text-[9px] text-gray-500 font-mono text-center">Framer Motion compilation // completed</p>
        </div>
      )
    }
  ];

  const currentScenario = scenarios.find(s => s.id === activeScenario) || scenarios[0];

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const sectionRef = useRef(null);

  return (
    <section 
      ref={sectionRef}
      id="possibility-lab" 
      className="relative py-24 overflow-hidden border-t border-white/5"
    >
      {/* Cinematic Background Layer */}
      <CinematicBackground
        src="/backgrounds/section-market-illustrated.png"
        webp="/backgrounds/section-market-illustrated.webp"
        mobile="/backgrounds/section-market-illustrated-mobile.webp"
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
          <span className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase block mb-3">
            // THE DIGITAL POSSIBILITY LAB
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            WHAT IF YOUR BUSINESS HAD...
          </h2>
          <p className="text-gray-400 text-base font-body max-w-xl">
            Select a scenario below to visualize how we can transform your business ideas into premium interactive platforms.
          </p>
        </div>

        {/* Constellation Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Scenario triggers */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-4 text-left order-last lg:order-first">
            {scenarios.map((scen) => (
              <button
                key={scen.id}
                onMouseEnter={() => setActiveScenario(scen.id)}
                onClick={() => setActiveScenario(scen.id)}
                className={`w-full p-5 text-left transition-all duration-300 flex items-center justify-between cursor-pointer glass-panel ${
                  activeScenario === scen.id
                    ? 'border-accent-purple shadow-[0_0_25px_rgba(139,92,246,0.15)] scale-[1.01] bg-[#12151F]/80'
                    : 'border-white/5 hover:border-white/10 hover:bg-[#0E1017]/40'
                }`}
                data-cursor="pointer"
              >
                <div className="flex flex-col">
                  <span className={`font-mono text-[9px] tracking-wider uppercase mb-1 ${
                    activeScenario === scen.id ? 'text-accent-purple font-bold' : 'text-gray-500'
                  }`}>
                    {scen.tag}
                  </span>
                  <span className={`font-display font-extrabold text-sm md:text-base ${
                    activeScenario === scen.id ? 'text-white' : 'text-gray-400'
                  }`}>
                    {scen.question}
                  </span>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                  activeScenario === scen.id ? 'text-accent-purple translate-x-1' : 'text-gray-600'
                }`} />
              </button>
            ))}
          </div>

          {/* Right panel: Live Visual viewport */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="glass-panel overflow-hidden shadow-2xl h-full flex flex-col justify-between border-white/10 shadow-[0_0_35px_rgba(130,80,255,0.04)]">
              
              {/* Fake header bar */}
              <div className="bg-[#08090D] border-b border-white/5 px-6 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
                </div>
                <span className="font-mono text-[10px] text-gray-400">{currentScenario.visualTitle}</span>
                <span className="w-2.5 h-2.5"></span>
              </div>

              {/* Rendered visual viewport content */}
              <div className="flex-1 relative">
                {currentScenario.renderVisual()}
              </div>

            </div>
          </div>

        </div>

        {/* Final CTA marker */}
        <div className="mt-20 border-t border-white/5 pt-12 text-center max-w-2xl mx-auto space-y-6">
          <h3 className="font-display font-black text-2xl md:text-3xl text-white">
            THAT'S WHAT WE CAN BUILD TOGETHER.
          </h3>
          <button
            onClick={handleScrollToContact}
            className="inline-flex items-center gap-2 bg-[#00E5FF] hover:bg-[#00c5dd] text-[#08090D] font-extrabold px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)] cursor-pointer animate-pulse"
            data-cursor="pointer"
            data-cursor-text="LET'S GO"
          >
            LET'S CREATE YOUR IDEA <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </section>
  );
}
