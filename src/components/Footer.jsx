import React from 'react';
import { Mail, MessageSquare, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Possibility Lab', id: 'possibility-lab' },
    { name: 'Toolbox', id: 'toolbox' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  const whatsappUrl = "https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you.";

  return (
    <footer className="relative py-16 bg-[#08090D] border-t border-white/5 overflow-hidden">
      
      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-12 mb-8 items-start">
          
          {/* Logo Details */}
          <div className="lg:col-span-6 text-left space-y-4">
            <h3 className="font-display font-black text-3xl text-white tracking-tight">
              BIGYAT DEB<span className="text-accent-cyan">.</span>
            </h3>
            <p className="text-accent-cyan font-mono text-xs font-bold uppercase tracking-wider">
              Creative Technologist · Full Stack Developer · Digital Designer
            </p>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-body">
              Guwahati, Assam, India. Combining code engineering, interactive motions, AI integrations, and branding visual assets.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-1.5 font-mono text-xs text-gray-500 pt-2">
              <p>
                WhatsApp:{' '}
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#25D366] transition-colors"
                >
                  +91 7002200651
                </a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:debbigyat@gmail.com" className="text-white hover:text-accent-cyan transition-colors">
                  debbigyat@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Footer Nav Links & Social Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-left w-full">
            
            {/* Sitemap */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Sitemap</h4>
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="text-gray-400 hover:text-accent-cyan text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer text-left"
                    data-cursor="pointer"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Social Channels</h4>
              <div className="flex flex-col gap-2.5 font-mono text-xs">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <a 
                  href="mailto:debbigyat@gmail.com" 
                  className="text-gray-400 hover:text-accent-cyan transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
                <a href="#" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href="#" className="text-gray-400 hover:text-accent-pink transition-colors flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Office base</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-body">
                Guwahati, Assam,<br />
                India
              </p>
            </div>

          </div>
        </div>

        {/* Concept 3: HP Alpine Dots Grid Footer Dock */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          {/* Subtle background glow */}
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Left Branding */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="text-left">
              <span className="block text-[10px] font-mono font-bold tracking-widest text-accent-cyan uppercase mb-1">
                // BRAND AUTHENTICITY
              </span>
              <h4 className="font-display font-black text-xl text-white tracking-wide">
                WEBSITE CRAFTED BY <span className="hover:text-accent-cyan transition-colors duration-300">BIGYAT DEB</span>
              </h4>
            </div>
          </div>

          {/* Symmetrical 5-color HP Accent Grid (Divider) */}
          <div className="flex items-center gap-2.5 relative z-10 px-4 py-2 bg-black/20 rounded-full border border-white/5">
            {/* Mountain Blue */}
            <div 
              className="w-3.5 h-3.5 rounded-full bg-[#003580] cursor-help relative group transition-all duration-300 hover:scale-125 hover:shadow-[0_0_10px_#003580]"
              title="Himachal Blue"
            >
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-[8px] font-mono text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">Alpine Blue</span>
            </div>
            {/* Snow White */}
            <div 
              className="w-3.5 h-3.5 rounded-full bg-[#FFFFFF] cursor-help relative group transition-all duration-300 hover:scale-125 hover:shadow-[0_0_10px_#FFFFFF]"
              title="Snow White"
            >
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-[8px] font-mono text-black bg-white/95 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">Summit Snow</span>
            </div>
            {/* Saffron */}
            <div 
              className="w-3.5 h-3.5 rounded-full bg-[#FF671F] cursor-help relative group transition-all duration-300 hover:scale-125 hover:shadow-[0_0_10px_#FF671F]"
              title="Saffron"
            >
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-[8px] font-mono text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">Saffron Sun</span>
            </div>
            {/* Forest Green */}
            <div 
              className="w-3.5 h-3.5 rounded-full bg-[#1E6B38] cursor-help relative group transition-all duration-300 hover:scale-125 hover:shadow-[0_0_10px_#1E6B38]"
              title="Forest Green"
            >
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-[8px] font-mono text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">Deodar Green</span>
            </div>
            {/* Deep Red */}
            <div 
              className="w-3.5 h-3.5 rounded-full bg-[#C8102E] cursor-help relative group transition-all duration-300 hover:scale-125 hover:shadow-[0_0_10px_#C8102E]"
              title="Deep Red"
            >
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-[8px] font-mono text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">Rhododendron Red</span>
            </div>
          </div>

          {/* Right Contact Info System Labels */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 text-xs font-mono">
            {/* Phone */}
            <a 
              href="tel:+917002200651"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.01] border border-white/5 hover:border-accent-cyan/35 hover:bg-accent-cyan/[0.02] transition-all duration-300"
            >
              <span className="text-gray-500 group-hover:text-accent-cyan transition-colors duration-300 font-bold">
                // TEL
              </span>
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                +91 7002200651
              </span>
            </a>

            {/* Email */}
            <a 
              href="mailto:debbigyat@gmail.com"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.01] border border-white/5 hover:border-accent-purple/35 hover:bg-accent-purple/[0.02] transition-all duration-300"
            >
              <span className="text-gray-500 group-hover:text-accent-purple transition-colors duration-300 font-bold">
                // MAIL
              </span>
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-bold">
                debbigyat@gmail.com
              </span>
            </a>
          </div>
        </div>

        {/* Small copyright disclaimer below dock */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-mono text-gray-600">
          <p>© 2026 Bigyat Deb. Built with creativity & code.</p>
          <div className="flex gap-4">
            <span className="hover:text-white/40 transition-colors">SECURE CORE</span>
            <span>|</span>
            <span className="hover:text-white/40 transition-colors">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
