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

        {/* Bottom copyright block */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 Bigyat Deb. Built with creativity + code.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors">SECURE CORE</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white transition-colors">ALL SYSTEMS INTEGRATED</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
