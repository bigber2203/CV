import React from 'react';
import { Compass, Lightbulb, PenTool, Code2, ShieldAlert, Rocket } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      desc: 'Understand your business objectives, target audience demographics, and conversion goals to shape the project scope.',
      icon: <Compass className="w-5 h-5 text-accent-cyan" />
    },
    {
      num: '02',
      title: 'STRATEGIZE',
      desc: 'Map structural layout paths, decide technology setups (React/Next.js/Supabase), and plan features to guarantee fast speeds.',
      icon: <Lightbulb className="w-5 h-5 text-accent-blue" />
    },
    {
      num: '03',
      title: 'DESIGN',
      desc: 'Create high-fidelity visual mockups, typography assets, custom colors, and responsive layouts that fit your brand.',
      icon: <PenTool className="w-5 h-5 text-accent-purple" />
    },
    {
      num: '04',
      title: 'BUILD',
      desc: 'Develop utilizing clean components. Configure backend logic, integrate third-party APIs, and wire up database triggers.',
      icon: <Code2 className="w-5 h-5 text-accent-lime" />
    },
    {
      num: '05',
      title: 'TEST',
      desc: 'Run strict performance tests, responsive layout audits (320px to 1920px), custom cursor controls, and forms pipelines checks.',
      icon: <ShieldAlert className="w-5 h-5 text-accent-pink" />
    },
    {
      num: '06',
      title: 'LAUNCH',
      desc: 'Deploy files onto high-speed CDN edges (Vercel/Netlify), link DNS parameters, and hand off training workflows.',
      icon: <Rocket className="w-5 h-5 text-white" />
    }
  ];

  return (
    <section className="relative py-24 bg-[#0E1017]/40 border-y border-white/5 overflow-hidden">
      
      {/* Structural layout traces */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-lime uppercase block mb-3">
            // WORKFLOW TIMELINE
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            FROM IDEA TO LAUNCH.
          </h2>
          <p className="text-gray-400 text-base font-body">
            A structured, 6-step engineering process designed to keep projects organized, on time, and aligned with your business goals.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          
          {/* Subtle connecting canvas trace line on wide desktop */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-dashed border-t border-white/5 -z-10 hidden lg:block"></div>

          {steps.map((step, index) => (
            <div 
              key={index}
              className="group clay-card p-8 rounded-2xl border border-white/5 hover:border-accent-lime/30 transition-all duration-300 text-left relative flex flex-col justify-between h-[230px] overflow-hidden"
              data-cursor="pointer"
            >
              
              {/* Corner Glowing Number */}
              <div className="absolute -top-6 -right-6 font-display font-black text-7xl text-white/[0.02] group-hover:text-white/[0.04] transition-colors pointer-events-none select-none">
                {step.num}
              </div>

              <div>
                {/* Header elements */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:scale-105 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-500">PHASE_{step.num}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-accent-lime transition-colors">
                  {step.title}
                </h3>
              </div>

              <p className="text-gray-400 text-xs font-body leading-relaxed group-hover:text-gray-300 transition-colors">
                {step.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
