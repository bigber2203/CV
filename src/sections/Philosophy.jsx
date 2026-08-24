import React from 'react';
import { Users, Target, Heart, Cpu } from 'lucide-react';

export default function Philosophy() {
  const pillars = [
    {
      num: '01',
      title: 'YOUR CUSTOMER.',
      icon: <Users className="w-6 h-6 text-accent-cyan" />,
      questions: [
        'Who are your target users?',
        'What specific information do they search for?',
        'What design elements make them trust your brand?'
      ],
      desc: 'Everything begins with understanding the audience. A beautiful design fails if it does not speak to the people who pay for your services.'
    },
    {
      num: '02',
      title: 'YOUR BUSINESS.',
      icon: <Target className="w-6 h-6 text-accent-blue" />,
      questions: [
        'What core problems are we solving?',
        'What goals should the interface achieve?',
        'More leads, cafe orders, or booking sheets?'
      ],
      desc: 'We define clear metrics for success before writing a single line of code. Code must serve business growth directly.'
    },
    {
      num: '03',
      title: 'THE EXPERIENCE.',
      icon: <Heart className="w-6 h-6 text-accent-pink" />,
      questions: [
        'Is the navigation layout intuitive?',
        'Does the page load instantly on mobile phones?',
        'Are checkout/contact actions friction-free?'
      ],
      desc: 'We design premium, responsive user flows tailored around human psychology, keeping animations smooth and micro-interactions responsive.'
    },
    {
      num: '04',
      title: 'THE TECHNOLOGY.',
      icon: <Cpu className="w-6 h-6 text-accent-purple" />,
      questions: [
        'What frontend frameworks fit best (Next/React)?',
        'Do we require serverless SQL databases?',
        'Which bots speed up lead notifications?'
      ],
      desc: 'We choose fast, secure, modern tools (Next.js, Tailwind v4, Supabase, GSAP) to turn finalized layout concepts into high-performance web systems.'
    }
  ];

  return (
    <section id="philosophy" className="relative py-24 bg-[#0E1017]/40 border-y border-white/5 overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase block mb-3">
            // DEVELOPMENT STRATEGY
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-none">
            I DON'T START WITH CODE.
          </h2>
          <p className="text-gray-400 text-base font-body leading-relaxed">
            Many developers start coding immediately without looking at the business details. I design digital experiences around your customers to make sure you get results.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pil) => (
            <div 
              key={pil.num}
              className="group p-6 bg-[#12151F]/40 border border-white/5 rounded-2xl hover:border-accent-cyan/20 transition-all duration-300 flex flex-col justify-between h-[360px] text-left"
              data-cursor="pointer"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-white">
                    {pil.icon}
                  </div>
                  <span className="font-display font-black text-2xl text-white/5 group-hover:text-white/10 transition-colors">
                    {pil.num}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-accent-cyan transition-colors">
                  {pil.title}
                </h3>
                
                <p className="text-gray-400 text-xs font-body leading-relaxed mb-4">
                  {pil.desc}
                </p>
              </div>

              {/* Questions subset */}
              <div className="border-t border-white/5 pt-4 space-y-1">
                {pil.questions.map((q, idx) => (
                  <p key={idx} className="text-[10px] font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                    ➔ {q}
                  </p>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Closing value quote */}
        <div className="mt-16 text-center max-w-xl mx-auto p-6 bg-[#12151F]/30 border border-white/5 rounded-2xl">
          <p className="text-white text-base md:text-lg font-body leading-relaxed italic font-medium">
            "Technology is just the tool. The experience and business result are what matter."
          </p>
        </div>

      </div>
    </section>
  );
}
