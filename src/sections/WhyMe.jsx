import React from 'react';
import { Check, Target, Zap, Shield, HelpCircle, Layers, MessageSquare, HeartHandshake } from 'lucide-react';

export default function WhyMe() {
  const points = [
    {
      title: 'Modern & Custom Design',
      desc: 'No boring templates. Every project is custom-designed around your unique business needs and brand voice to make you stand out.',
      icon: <Layers className="w-5 h-5 text-accent-cyan" />
    },
    {
      title: 'Mobile-First Development',
      desc: 'Websites engineered to load instantly and look visually breathtaking across smartphones, tablets, and wide desktop setups.',
      icon: <Zap className="w-5 h-5 text-accent-pink" />
    },
    {
      title: 'Fast & Optimized',
      desc: 'Obsessive focus on loading speeds, structural layout indexes, SEO indexing, and clean, modular component structures.',
      icon: <HelpCircle className="w-5 h-5 text-accent-lime" />
    },
    {
      title: 'Business-Focused',
      desc: 'I do not just build code structures. I construct interfaces that attract visitors and convert them directly into paying customers.',
      icon: <Target className="w-5 h-5 text-accent-blue" />
    },
    {
      title: 'Creative Technology Blend',
      desc: 'Fusing backend code stability with design principles, automated bots, and visual video layouts to deliver a complete platform.',
      icon: <Shield className="w-5 h-5 text-accent-purple" />
    },
    {
      title: 'One Person, All Skillsets',
      desc: 'Eliminate friction. Skip hiring separate developers, designers, automation coders, and editors. Get it done in one place.',
      icon: <Check className="w-5 h-5 text-white" />
    },
    {
      title: 'Clear Communication',
      desc: 'No complicated jargon or confusing tech speak. Transparent updates, direct chats, and straightforward documentation.',
      icon: <MessageSquare className="w-5 h-5 text-accent-cyan" />
    },
    {
      title: 'Long-Term Partnership',
      desc: 'Ongoing support, easy upgrades, quick content modifications, and strategic scaling advice for your next business steps.',
      icon: <HeartHandshake className="w-5 h-5 text-accent-pink" />
    }
  ];

  return (
    <section className="relative py-24 bg-[#0E1017]/40 border-y border-white/5 overflow-hidden">
      
      {/* Structural background grids */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase block mb-3">
            // CORE VALUE PROPOSITIONS
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-none">
            NOT JUST CODE.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
              DIGITAL PROBLEM SOLVING.
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-body leading-relaxed">
            I align code features with revenue goals. Here is why clients choose to work with me directly instead of hiring traditional, slow agencies.
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, index) => (
            <div 
              key={index}
              className="group p-6 bg-[#12151F]/40 border border-white/5 rounded-2xl hover:bg-[#12151F]/80 hover:border-white/15 transition-all duration-300 flex flex-col justify-between text-left h-[250px] relative overflow-hidden"
              data-cursor="pointer"
            >
              {/* Corner decor active dot */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent-cyan/20 group-hover:bg-accent-cyan transition-colors"></div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  {point.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {point.title}
                </h3>
              </div>
              <p className="text-gray-400 text-xs font-body leading-relaxed group-hover:text-gray-300 transition-colors">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative central connector label */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-[1px] bg-white/10 w-24"></div>
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            BD INTEGRATED VALUE CORE
          </span>
          <div className="h-[1px] bg-white/10 w-24"></div>
        </div>

      </div>
    </section>
  );
}
