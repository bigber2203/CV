import React from 'react';
import { Briefcase, BookOpen, Award, ExternalLink } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'FULL STACK WEB DEVELOPMENT',
      period: '2023 - Present',
      desc: 'Building responsive websites and digital products for businesses, cafe chains, and creative agencies. Resolving frontend render limits, backend databases, and API channels.',
      tag: 'Development Core'
    },
    {
      role: 'CREATIVE TECHNOLOGY',
      period: '2024 - Present',
      desc: 'Fusing interface code with animations (GSAP, Framer Motion), custom particles, audio analysis, and layout designs to create engaging digital campaigns.',
      tag: 'Interactive Tech'
    },
    {
      role: 'DIGITAL DESIGN',
      period: '2023 - Present',
      desc: 'Designing website layouts (Figma), brand visual assets, ad posters, and presentation slides. Aligning branding graphics with client marketing targets.',
      tag: 'Branding Core'
    },
    {
      role: 'AUTOMATION & BOT BUILDER',
      period: '2024 - Present',
      desc: 'Deploying AI agent assistants, automated WhatsApp chat pipelines, webhook loops, and email triggers to save businesses hours of manual admin tasks.',
      tag: 'AI Workflows'
    }
  ];

  const learningList = [
    {
      platform: 'Udemy Certification',
      course: 'Web Development & Full Stack Engineering Courses',
      desc: 'Focused on modern JavaScript foundations, Node/Express routing, PostgreSQL databases, and CSS frameworks.',
      status: 'Completed / Active Verification'
    },
    {
      platform: 'Coursera Modules',
      course: 'Technology & Professional Development Courses',
      desc: 'Modules covering user experience design principles, API structuring, and database management foundations.',
      status: 'Completed / Active Verification'
    },
    {
      platform: 'Online Continuous Learning',
      course: 'Advanced UI/UX, AI Integrations, & Creative Coding',
      desc: 'Ongoing hands-on studies in Next.js ISR/SSR, Three.js WebGL scenes, prompt engineering, and automated business workflows.',
      status: 'Ongoing / Self-Led Innovation'
    }
  ];

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      
      {/* Background visual components */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-accent-purple uppercase block mb-3">
            // HISTORY & CERTIFICATES
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
            JOURNEY & PATH.
          </h2>
          <p className="text-gray-400 text-base max-w-xl font-body">
            How I built my capabilities. Bridging structured engineering courses with real-world client project executions.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline Journey */}
          <div className="lg:col-span-7 text-left">
            <h3 className="font-display font-bold text-xl text-white mb-8 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent-cyan" />
              Professional Focus Milestones
            </h3>

            <div className="relative border-l border-white/10 pl-6 ml-3 space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Glowing dot on timeline */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#08090D] border border-white/20 group-hover:border-accent-cyan flex items-center justify-center transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan opacity-40 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                    <h4 className="font-display font-bold text-base md:text-lg text-white group-hover:text-accent-cyan transition-colors">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-xs text-gray-500">{exp.period}</span>
                  </div>

                  <span className="inline-block text-[9px] font-mono text-accent-purple font-semibold bg-accent-purple/10 px-2 py-0.5 rounded mb-2 border border-accent-purple/10">
                    {exp.tag}
                  </span>

                  <p className="text-gray-400 text-xs md:text-sm font-body leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Learning */}
          <div className="lg:col-span-5 text-left space-y-10">
            {/* Academic Education */}
            <div className="clay-card p-6 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/5 rounded-full blur-xl pointer-events-none"></div>
              
              <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent-blue" />
                Academic Graduation
              </h3>

              <div className="space-y-1 font-body">
                <p className="text-sm font-bold text-white">Graduation Program</p>
                <p className="text-xs text-gray-400">Currently pursuing graduation degree studies in India.</p>
                <div className="inline-block text-[9px] font-mono text-accent-blue font-bold bg-accent-blue/10 px-2 py-0.5 rounded mt-2 border border-accent-blue/15">
                  Guwahati, Assam, India
                </div>
              </div>
            </div>

            {/* Certifications and learnings */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-pink" />
                Professional Learning
              </h3>

              <div className="space-y-4">
                {learningList.map((learn, index) => (
                  <div key={index} className="p-5 bg-[#12151F]/40 border border-white/5 rounded-xl hover:border-white/10 transition-colors text-left">
                    <div className="flex justify-between items-center gap-2 mb-1.5">
                      <span className="font-mono text-[9px] font-bold text-accent-pink uppercase tracking-wide">
                        {learn.platform}
                      </span>
                      <span className="text-[8px] font-mono text-gray-500">{learn.status}</span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-white mb-2">
                      {learn.course}
                    </h4>

                    <p className="text-gray-400 text-xs font-body leading-relaxed">
                      {learn.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
