import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero({ activeSection }) {
  const roles = [
    'FULL STACK DEVELOPER',
    'CREATIVE TECHNOLOGIST',
    'FRONTEND ENGINEER',
    'DIGITAL DESIGNER',
    'AUTOMATION BUILDER'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  // Rotating roles loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const sectionIndex = {
    home: 0,
    about: 1,
    services: 2,
    'possibility-lab': 3,
    toolbox: 4,
    faq: 5,
    contact: 6
  };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const isActive = activeSection === 'home';
  const isPast = sectionIndex[activeSection] > 0;
  const xOffset = isMobile ? 0 : (isPast ? -50 : 50);

  // Canvas particle network logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 100;
    const connectionDistance = isMobile ? 65 : 110;
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00E5FF' : '#8B5CF6';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            // Subtly attract particles
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles with lines
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw details like background text or nodes
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      connect();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      if (window.lenis) {
        window.lenis.scrollTo(element, { offset: -offset, duration: 1.2 });
      } else {
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >

      {/* Grid line divider overlay */}
      <div className="absolute top-[80px] left-0 w-full h-[1px] bg-white/5 z-1"></div>
      <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block z-1"></div>

      <motion.div 
        animate={{ 
          opacity: isActive ? 1 : 0, 
          x: xOffset 
        }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 z-10 py-12 md:py-0"
      >
        
        {/* Left Column (Content) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
            Creative Technology Studio
          </div>

          {/* Big Name */}
          <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight text-white mb-2 leading-none">
            BIGYAT DEB
          </h1>

          {/* Morphing Roles Text */}
          <div className="h-10 md:h-12 overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="text-lg md:text-2xl font-display font-semibold tracking-widest text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]"
              >
                {roles[currentRoleIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Big Headline */}
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight mb-6">
            I BUILD DIGITAL EXPERIENCES THAT MAKE BUSINESSES{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple">
              IMPOSSIBLE TO IGNORE.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-gray-400 text-base md:text-lg font-body leading-relaxed mb-8 max-w-xl">
            From high-performance websites and digital menus to intelligent automation and creative digital experiences — I help businesses turn ideas into powerful products that drive conversions.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
            <button
              onClick={() => handleScrollTo('contact')}
              className="flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00c5dd] text-[#08090D] font-extrabold px-6 py-4 rounded-full text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.45)] cursor-pointer"
              data-cursor="pointer"
              data-cursor-text="LET'S TALK"
            >
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20visited%20your%20portfolio%20and%20I'm%20interested%20in%20discussing%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#08090D] font-mono font-bold px-6 py-4 rounded-full text-xs tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(37,211,102,0.3)] cursor-pointer"
              data-cursor="pointer"
              data-cursor-text="WHATSAPP"
            >
              Let's Talk on WhatsApp →
            </a>
            <button
              onClick={() => handleScrollTo('what-i-build')}
              className="flex items-center justify-center gap-2 bg-[#12151F] hover:bg-[#181C2A] text-white border border-white/10 hover:border-white/20 px-6 py-4 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer"
              data-cursor="pointer"
            >
              What I Can Build <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column (Futuristic Canvas Visual) */}
        <div className="lg:col-span-5 h-[350px] md:h-[550px] w-full relative rounded-2xl border border-white/5 bg-[#0E1017]/40 backdrop-blur-sm overflow-hidden flex items-center justify-center">
          {/* Canvas container for custom animations */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          
          {/* Floating HUD elements */}
          <div className="absolute top-6 left-6 p-4 glass-panel rounded-xl text-left border-l-2 border-l-accent-cyan max-w-[200px] pointer-events-none select-none">
            <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">SYSTEM STATUS</p>
            <p className="text-[12px] font-display font-semibold text-white">ONLINE // ACTIVE</p>
            <div className="w-full bg-white/10 h-[2px] mt-2 rounded-full overflow-hidden">
              <div className="bg-accent-cyan h-full w-[85%] animate-pulse"></div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 p-4 glass-panel rounded-xl text-left border-r-2 border-r-accent-purple max-w-[200px] pointer-events-none select-none">
            <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest text-right">AUTOMATION ENGINE</p>
            <p className="text-[12px] font-display font-semibold text-white text-right">AI CORE V1.4</p>
          </div>

          {/* Hologram abstract center circle */}
          <div className="w-32 h-32 rounded-full border border-dashed border-accent-cyan/20 animate-spin flex items-center justify-center pointer-events-none" style={{ animationDuration: '30s' }}>
            <div className="w-24 h-24 rounded-full border border-accent-purple/30 animate-spin flex items-center justify-center" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple opacity-40 blur-xs"></div>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
