import React from 'react';
import { Play, TrendingUp, Cpu, Maximize } from 'lucide-react';
import CornerPrayerFlags from '../components/PrayerFlags/CornerPrayerFlags';


export default function Roadmap() {
  const steps = [
    {
      stage: 'START',
      icon: <Play className="w-5 h-5 text-accent-cyan" />,
      desc: 'Build a high-performance landing page or initial digital presence to give your brand immediate visibility.',
      borderAccent: 'border-l-accent-cyan'
    },
    {
      stage: 'GROW',
      icon: <TrendingUp className="w-5 h-5 text-accent-blue" />,
      desc: 'Inject additional pages, features, photo layouts, customized maps, and Google search parameters.',
      borderAccent: 'border-l-accent-blue'
    },
    {
      stage: 'AUTOMATE',
      icon: <Cpu className="w-5 h-5 text-accent-lime" />,
      desc: 'Set up WhatsApp bots, AI customer support assistants, lead alerts, and automated database sync workflows.',
      borderAccent: 'border-l-accent-lime'
    },
    {
      stage: 'SCALE',
      icon: <Maximize className="w-5 h-5 text-accent-purple" />,
      desc: 'Scale into a full SaaS platform, secure client dashboards, booking systems, or booking management platforms.',
      borderAccent: 'border-l-accent-purple'
    }
  ];

  return (
    <section id="roadmap" className="relative py-24 bg-[#0E1017]/40 border-y border-white/5 overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      {/* Corner Prayer Flags */}
      <CornerPrayerFlags />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-lime uppercase block mb-3">
            // SCALING PLANS
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            NOT SURE WHERE TO START?
          </h2>
          <p className="text-gray-400 text-base font-body">
            We don't need to build everything at once. Start small, validate your results, and scale as your client base expands.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.stage}
              className={`group p-6 bg-[#12151F]/40 border border-white/5 border-l-2 ${step.borderAccent} rounded-r-2xl rounded-l-md hover:bg-[#12151F]/80 transition-all duration-300 text-left flex flex-col justify-between h-[200px]`}
            >
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-mono text-[9px] font-bold text-gray-500">STAGE_0{idx + 1}</span>
                </div>

                <h3 className="font-display font-extrabold text-base text-white mb-2 tracking-wider">
                  {step.stage}
                </h3>
              </div>

              <p className="text-gray-400 text-xs font-body leading-relaxed">
                {step.desc}
              </p>

            </div>
          ))}
        </div>

        {/* Final trust statement */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="text-white text-sm font-mono tracking-wider text-accent-cyan uppercase mb-2">
            ➔ START WITH ONE IDEA.
          </p>
          <p className="text-gray-400 text-xs font-body">
            We can design and build the rest together as your business goals grow.
          </p>
        </div>

      </div>
    </section>
  );
}
