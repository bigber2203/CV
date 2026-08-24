import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, 
  UtensilsCrossed, 
  Bot, 
  Cpu, 
  Palette, 
  Video, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import CinematicBackground from '../components/CinematicBackground';

export default function Services() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      num: '01',
      title: 'CUSTOM WEBSITE DEVELOPMENT',
      icon: <Laptop className="w-8 h-8 text-accent-cyan" />,
      desc: 'Build modern, responsive, high-performance websites for businesses, brands, restaurants, startups, and professionals.',
      bullets: [
        'Business Websites & Portfolios',
        'High-Converting Landing Pages',
        'E-commerce & E-shops',
        'Custom Web Applications',
        'Fully Responsive Architectures'
      ],
      colorClass: 'group-hover:border-accent-cyan/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]',
      glowColor: 'bg-accent-cyan/10'
    },
    {
      num: '02',
      title: 'DIGITAL MENUS & FOOD EXPERIENCES',
      icon: <UtensilsCrossed className="w-8 h-8 text-accent-pink" />,
      desc: 'Create premium digital menus for restaurants, cafes, bars, hotels, and food businesses to boost ordering conversions.',
      bullets: [
        'Interactive QR Code Menus',
        'Mobile Optimized Design',
        'Animated Food Categories',
        'Image Galleries & Visual Menus',
        'Digital Ordering Integration'
      ],
      colorClass: 'group-hover:border-accent-pink/40 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]',
      glowColor: 'bg-accent-pink/10'
    },
    {
      num: '03',
      title: 'AI & BOT AUTOMATION',
      icon: <Bot className="w-8 h-8 text-accent-lime" />,
      desc: 'Help businesses automate repetitive tasks, generate leads, and support clients using intelligent AI integrations.',
      bullets: [
        'AI Chatbots & Assistants',
        'Customer Support Automation',
        'Lead Generation Bots',
        'WhatsApp Business Automations',
        'Workflow Automations (Zapier/Make)'
      ],
      colorClass: 'group-hover:border-accent-lime/40 hover:shadow-[0_0_20px_rgba(163,255,18,0.15)]',
      glowColor: 'bg-accent-lime/10'
    },
    {
      num: '04',
      title: 'FRONTEND & DIGITAL PRODUCTS',
      icon: <Cpu className="w-8 h-8 text-accent-blue" />,
      desc: 'Develop modern interface systems and client dashboards using reactive frameworks, keeping load speeds exceptionally fast.',
      bullets: [
        'React & Next.js Applications',
        'Interactive Dashboards',
        'Custom UI Components & Design Systems',
        'API Integrations & Webhooks',
        'SEO-Optimized Speed Builds'
      ],
      colorClass: 'group-hover:border-accent-blue/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
      glowColor: 'bg-accent-blue/10'
    },
    {
      num: '05',
      title: 'DIGITAL DESIGN & BRANDING',
      icon: <Palette className="w-8 h-8 text-accent-purple" />,
      desc: 'Provide creative designer deliverables targeting modern layouts, posters, branding creatives, and social content structures.',
      bullets: [
        'Website UI/UX Design (Figma)',
        'Social Media Graphics & Ad Posters',
        'Pitch Decks & Presentations',
        'Brand Identity Systems',
        'Logo & Visual Assets Creation'
      ],
      colorClass: 'group-hover:border-accent-purple/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
      title: 'UI/UX & Brand Design',
      desc: 'Pixel-perfect wireframes, style guides, identity packages, and client portals.',
      bullets: [
        'Figma wireframe prototypes',
        'Custom typographic hierarchies',
        'Sleek modern color schemes',
        'Complete brand identity assets'
      ],
      colorClass: 'group-hover:border-accent-purple/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]',
      glowColor: 'bg-accent-purple/5'
    },
    {
      id: 'video',
      num: '05',
      icon: <Video className="w-8 h-8 text-white" />,
      title: 'Video & Content Editing',
      desc: 'High-retention social media cuts, promo reels, motion designs, and audio correction.',
      bullets: [
        'Short-form reels & TikTok content',
        'YouTube content layouts',
        'Custom audio track editing',
        'Creative Social Media Cuts'
      ],
      colorClass: 'group-hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]',
      glowColor: 'bg-white/5'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="relative py-24 overflow-hidden"
    >
      {/* Cinematic Background Layer */}
      <CinematicBackground
        src="/backgrounds/section-street-scene.jpg"
        webp="/backgrounds/section-street-scene.webp"
        mobile="/backgrounds/section-street-scene-mobile.webp"
        objectPosition="center center"
        overlayStrength="strong"
        parallax={true}
        kenBurns={false}
        sectionRef={sectionRef}
      />
      
      {/* Structural details */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>
      
      {/* Pulsing light behind */}
      <div className="absolute top-[30%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-blue/5 blur-[150px] pointer-events-none"></div>
      
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
            // SERVICES & SOLVING CAPABILITIES
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-none">
            WHAT I BUILD.
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-body leading-relaxed">
            I combine coding skills, designer principles, and AI automated nodes to ship complete solutions. Hover on any service panel to view what features are covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              className={`group clay-card p-8 rounded-2xl border border-white/5 hover:bg-[#0E1017] transition-all duration-500 text-left flex flex-col justify-between h-[450px] relative overflow-hidden ${service.colorClass}`}
              data-cursor="pointer"
              data-cursor-text="EXPLORE"
            >
              {/* Background Glow Ring */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${service.glowColor}`}></div>

              <div>
                {/* Header indicators */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <span className="font-display font-black text-3xl text-white/10 group-hover:text-white/30 transition-colors">
                    {service.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg md:text-xl text-white mb-4 group-hover:text-accent-cyan transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm font-body leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                  {service.desc}
                </p>
              </div>

              {/* Collapsed / Expanded Bullet List */}
              <div className="relative overflow-hidden h-32 flex flex-col justify-end">
                <div className={`space-y-1.5 transition-all duration-500 ${
                  activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'
                }`}>
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-body text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0" />
                      <span className="truncate">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] text-accent-cyan tracking-wider uppercase font-bold pt-4 border-t border-white/5">
                  EXPLORE STRUCTURE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
