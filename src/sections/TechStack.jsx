import React, { useState } from 'react';
import { Terminal, Cpu, Database, Wrench, PenTool, Bot, Sparkles } from 'lucide-react';

export default function TechStack() {
  const [selectedGroup, setSelectedGroup] = useState('ALL');

  const groups = [
    { id: 'ALL', name: 'All Modules', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'LANG', name: 'Languages', icon: <Terminal className="w-4 h-4" /> },
    { id: 'FRAME', name: 'Frameworks', icon: <Cpu className="w-4 h-4" /> },
    { id: 'DATA', name: 'Databases', icon: <Database className="w-4 h-4" /> },
    { id: 'TOOL', name: 'Tools & Platforms', icon: <Wrench className="w-4 h-4" /> },
    { id: 'CREATIVE', name: 'Design & Creative', icon: <PenTool className="w-4 h-4" /> },
    { id: 'AI', name: 'AI & Automation', icon: <Bot className="w-4 h-4" /> }
  ];

  const skillsData = [
    // Languages
    { name: 'JavaScript', category: 'LANG', level: 'Core', desc: 'Interactive UI logic & scripting.', cord: '[X: 12, Y: 44]' },
    { name: 'TypeScript', category: 'LANG', level: 'Advanced', desc: 'Type-safe React & server integrations.', cord: '[X: 18, Y: 56]' },
    { name: 'HTML5 & CSS3', category: 'LANG', level: 'Mastery', desc: 'Semantic layouts and animations.', cord: '[X: 04, Y: 22]' },
    { name: 'Python', category: 'LANG', level: 'Proficient', desc: 'AI scripts and backend scripting.', cord: '[X: 32, Y: 80]' },
    { name: 'SQL', category: 'LANG', level: 'Advanced', desc: 'Relational data query design.', cord: '[X: 25, Y: 60]' },
    { name: 'C++', category: 'LANG', level: 'Academic', desc: 'Algorithmic problem-solving.', cord: '[X: 50, Y: 30]' },
    { name: 'Java', category: 'LANG', level: 'Academic', desc: 'Object-oriented foundations.', cord: '[X: 52, Y: 35]' },

    // Frameworks & Libraries
    { name: 'React', category: 'FRAME', level: 'Core', desc: 'High-performance reactive interfaces.', cord: '[X: 08, Y: 72]' },
    { name: 'Next.js', category: 'FRAME', level: 'Advanced', desc: 'Static page rendering & SEO optimizations.', cord: '[X: 15, Y: 85]' },
    { name: 'Node.js & Express', category: 'FRAME', level: 'Advanced', desc: 'Restful API architectures and servers.', cord: '[X: 28, Y: 90]' },
    { name: 'Tailwind CSS', category: 'FRAME', level: 'Mastery', desc: 'Utility-first styling systems.', cord: '[X: 06, Y: 48]' },
    { name: 'GSAP', category: 'FRAME', level: 'Advanced', desc: 'Complex scroll and timeline animations.', cord: '[X: 22, Y: 65]' },
    { name: 'Framer Motion', category: 'FRAME', level: 'Advanced', desc: 'Fluid component entry transitions.', cord: '[X: 24, Y: 68]' },
    { name: 'Three.js / Fiber', category: 'FRAME', level: 'Intermediate', desc: 'Immersive WebGL canvas viewports.', cord: '[X: 30, Y: 70]' },
    { name: 'Vite', category: 'FRAME', level: 'Advanced', desc: 'Rapid React build configurations.', cord: '[X: 10, Y: 50]' },
    { name: 'Redux / Router', category: 'FRAME', level: 'Advanced', desc: 'State trees and application routing.', cord: '[X: 11, Y: 52]' },
    { name: 'Socket.io', category: 'FRAME', level: 'Intermediate', desc: 'Realtime WebSocket event pipes.', cord: '[X: 29, Y: 88]' },

    // Databases
    { name: 'PostgreSQL', category: 'DATA', level: 'Advanced', desc: 'Complex relational databases.', cord: '[X: 40, Y: 22]' },
    { name: 'MongoDB', category: 'DATA', level: 'Advanced', desc: 'Flexible JSON documents store.', cord: '[X: 42, Y: 25]' },
    { name: 'MySQL', category: 'DATA', level: 'Advanced', desc: 'Standard schema setups.', cord: '[X: 44, Y: 28]' },
    { name: 'Supabase', category: 'DATA', level: 'Advanced', desc: 'Serverless tables and auth tokens.', cord: '[X: 46, Y: 30]' },
    { name: 'Firebase', category: 'DATA', level: 'Advanced', desc: 'Cloud storage and event sync.', cord: '[X: 48, Y: 32]' },

    // Tools & Platforms
    { name: 'Git & GitHub', category: 'TOOL', level: 'Advanced', desc: 'Team branch structures & repository reviews.', cord: '[X: 60, Y: 12]' },
    { name: 'Docker', category: 'TOOL', level: 'Intermediate', desc: 'Containerized deployment packaging.', cord: '[X: 65, Y: 18]' },
    { name: 'Vercel / Netlify', category: 'TOOL', level: 'Advanced', desc: 'Instant serverless CDNs deployments.', cord: '[X: 62, Y: 15]' },
    { name: 'Cloudflare', category: 'TOOL', level: 'Advanced', desc: 'DNS setups and edge network caches.', cord: '[X: 64, Y: 17]' },
    { name: 'GitHub Actions', category: 'TOOL', level: 'Intermediate', desc: 'CI/CD pipeline automated releases.', cord: '[X: 68, Y: 24]' },

    // Design & Creative Tools
    { name: 'Figma', category: 'CREATIVE', level: 'Advanced', desc: 'Interactive UI layout prototypes.', cord: '[X: 72, Y: 44]' },
    { name: 'Adobe Photoshop', category: 'CREATIVE', level: 'Advanced', desc: 'Raster editing and poster layouts.', cord: '[X: 74, Y: 48]' },
    { name: 'Adobe Illustrator', category: 'CREATIVE', level: 'Advanced', desc: 'Vector logos and corporate branding.', cord: '[X: 76, Y: 52]' },
    { name: 'Adobe Premiere Pro', category: 'CREATIVE', level: 'Advanced', desc: 'Video cutting and audio sync.', cord: '[X: 78, Y: 56]' },
    { name: 'After Effects', category: 'CREATIVE', level: 'Intermediate', desc: 'Motion graphics & text intros.', cord: '[X: 80, Y: 60]' },
    { name: 'Blender', category: 'CREATIVE', level: 'Intermediate', desc: 'Abstract 3D meshes & scenes.', cord: '[X: 82, Y: 64]' },

    // AI & Automation
    { name: 'OpenAI APIs', category: 'AI', level: 'Advanced', desc: 'LLM completions and prompt fine-tunes.', cord: '[X: 90, Y: 82]' },
    { name: 'Workflow Automation', category: 'AI', level: 'Advanced', desc: 'Connecting webhooks on Make/Zapier.', cord: '[X: 92, Y: 85]' },
    { name: 'AI Chatbots', category: 'AI', level: 'Advanced', desc: 'Context-trained customer support agents.', cord: '[X: 94, Y: 88]' },
    { name: 'Prompt Engineering', category: 'AI', level: 'Advanced', desc: 'Optimizing context scopes.', cord: '[X: 96, Y: 90]' }
  ];

  const filteredSkills = selectedGroup === 'ALL'
    ? skillsData
    : skillsData.filter(s => s.category === selectedGroup);

  return (
    <section id="skills" className="relative py-24 bg-[#0E1017]/40 border-y border-white/5 overflow-hidden">
      
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="text-left max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase block mb-3">
              // TELEMETRY & CAPABILITIES
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-none">
              TECH STACK.
            </h2>
            <p className="text-gray-400 text-base font-body leading-relaxed">
              An interactive constellation representing tools, libraries, and frameworks I use to engineer client solutions. Filter by subsystem category to inspect details.
            </p>
          </div>

          {/* Group Tabs */}
          <div className="flex flex-wrap gap-2 justify-start lg:justify-end max-w-2xl">
            {groups.map((grp) => (
              <button
                key={grp.id}
                onClick={() => setSelectedGroup(grp.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold font-mono border transition-all duration-300 cursor-pointer ${
                  selectedGroup === grp.id
                    ? 'bg-accent-cyan border-accent-cyan text-[#08090D] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'bg-[#12151F] border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                }`}
              >
                {grp.icon}
                {grp.name}
              </button>
            ))}
          </div>
        </div>

        {/* Constellation Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="group relative p-4 bg-[#12151F]/40 border border-white/5 rounded-xl hover:border-accent-cyan/30 hover:bg-[#12151F]/90 transition-all duration-300 text-left h-[140px] flex flex-col justify-between overflow-hidden"
              data-cursor="pointer"
            >
              {/* Floating cord stamp */}
              <div className="flex justify-between items-center text-[8px] font-mono text-gray-500">
                <span>{skill.cord}</span>
                <span className="text-accent-cyan/40 group-hover:text-accent-cyan transition-colors">{skill.level}</span>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-accent-cyan transition-colors mb-1">
                  {skill.name}
                </h4>
                <p className="text-gray-400 text-[10px] font-body leading-relaxed group-hover:text-gray-300 transition-colors">
                  {skill.desc}
                </p>
              </div>

              {/* Glowing decorative light point inside card */}
              <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-accent-cyan group-hover:shadow-[0_0_6px_#00E5FF] transition-all self-end"></div>
            </div>
          ))}
        </div>

        {/* Constellation status log */}
        <div className="mt-12 bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between flex-wrap gap-4 text-left">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse"></span>
            <p className="text-xs font-mono text-gray-400">
              COORDINATE REGISTERED: <span className="text-white font-bold">{filteredSkills.length} ACTIVE STACK NODES</span>
            </p>
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase">
            SECURE INTEGRATION PROTOCOL // ONLINE
          </p>
        </div>

      </div>
    </section>
  );
}
