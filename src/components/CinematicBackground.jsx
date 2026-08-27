import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * CinematicBackground Component
 * Renders a premium, multi-layered 3D scroll-parallax environment
 * with section-specific thematic elements and smooth fade transitions.
 */
export default function CinematicBackground({
  src,
  webp,
  mobile,
  objectPosition = "center center",
  overlayStrength = "medium", // "medium" | "strong"
  parallax = true,
  kenBurns = false,
  priority = false,
  sectionRef,
  type = "default" // "hero" | "about" | "services" | "lab" | "toolbox" | "contact" | "default"
}) {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  // Monitor screen dimensions and user preferences
  useEffect(() => {
    const mediaMobile = window.matchMedia('(max-width: 768px)');
    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMobileChange = (e) => setIsMobile(e.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);

    mediaMobile.addEventListener('change', handleMobileChange);
    mediaMotion.addEventListener('change', handleMotionChange);

    return () => {
      mediaMobile.removeEventListener('change', handleMobileChange);
      mediaMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Monitor Scroll Progress of this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef || undefined,
    offset: ["start end", "end start"]
  });

  // Calculate Parallax Transforms (Only when animations are active)
  const isAnimationEnabled = !isMobile && !prefersReducedMotion;

  // 1. Deep Background Image Layer: moves slowly
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const faqImgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const backgroundY = (parallax && isAnimationEnabled)
    ? (type === "faq" ? faqImgY : imgY)
    : "0%";

  // 2. Mid-ground Layers: move slightly faster than the image
  const midY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  const midYReverse = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  
  // 3. Foreground Elements: move fastest
  const foreY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  // 4. Scroll-linked opacity to cross-fade between section backgrounds
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );
  
  // Smooth scroll-reactive glow intensity scaling
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.0, 0.5]);

  // Rotate layers based on scroll progress
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const rotationReverse = useTransform(scrollYProgress, [0, 1], [0, -30]);

  // Decide dark contrast overlay classes
  let overlayClass = overlayStrength === "strong"
    ? "from-[#08090D] via-[#08090D]/55 to-[#08090D]"
    : "from-[#08090D]/90 via-[#08090D]/40 to-[#08090D]/90";

  if (type === "faq") {
    overlayClass = "from-[#08090D]/95 via-[#08090D]/65 to-[#08090D]/95";
  } else if (type === "contact") {
    overlayClass = "from-[#08090D]/65 via-[#08090D]/72 to-[#08090D]/92";
  }

  // Section-specific Mid-Ground & Atmosphere Elements
  const renderAtmosphere = () => {
    if (isMobile) return null; // Bypass atmospheric details on mobile for performance

    switch (type) {
      case "hero":
        return (
          <motion.div 
            style={{ y: midY, rotate: rotation, scale: glowScale }}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none mix-blend-screen"
          >
            {/* Spinning Holographic Rings */}
            <svg width="600" height="600" viewBox="0 0 100 100" className="opacity-30 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px]">
              <circle cx="50" cy="50" r="45" fill="none" stroke="url(#cyanPurpleGrad)" strokeWidth="0.5" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#00E5FF" strokeWidth="0.2" strokeDasharray="10 5" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '40s' }} />
              <circle cx="50" cy="50" r="25" fill="none" stroke="#8B5CF6" strokeWidth="0.3" strokeDasharray="5 15" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '20s', animationDirection: 'reverse' }} />
              <defs>
                <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        );

      case "about":
        return (
          <motion.div 
            style={{ y: midYReverse }}
            className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
          >
            {/* Volumetric ambient light rays and warm overlay spots */}
            <div className="absolute top-[10%] left-[20%] w-[45%] h-[40%] rounded-full bg-accent-cyan/5 blur-[130px] opacity-70" />
            <div className="absolute bottom-[10%] right-[15%] w-[55%] h-[45%] rounded-full bg-accent-purple/5 blur-[160px] opacity-60" />
            
            {/* Soft gradient light beam overlay */}
            <div 
              style={{
                background: "linear-gradient(135deg, rgba(0, 229, 255, 0.03) 0%, transparent 60%)",
                clipPath: "polygon(0 0, 45% 0, 85% 100%, 0% 100%)"
              }}
              className="absolute inset-0 w-full h-full mix-blend-screen"
            />
          </motion.div>
        );

      case "services":
        return (
          <motion.div 
            style={{ y: midY, rotate: rotationReverse }}
            className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center mix-blend-screen overflow-hidden"
          >
            {/* Cyber neon grid elements in perspective */}
            <div className="absolute w-[120%] h-[120%] opacity-[0.06] border border-accent-cyan/40 rounded-full blur-[2px]" style={{ transform: 'rotateX(75deg) translateZ(50px)' }}></div>
            <div className="absolute w-[90%] h-[90%] opacity-[0.04] border border-accent-purple/40 rounded-full blur-[1px]" style={{ transform: 'rotateX(75deg) translateZ(-50px)' }}></div>
            
            {/* Soft glowing circles at the sides */}
            <div className="absolute left-[5%] top-[25%] w-48 h-48 rounded-full bg-accent-cyan/10 blur-[80px]" />
            <div className="absolute right-[5%] bottom-[25%] w-64 h-64 rounded-full bg-accent-purple/10 blur-[100px]" />
          </motion.div>
        );

      case "lab":
        return (
          <motion.div 
            style={{ y: midY }}
            className="absolute inset-0 z-10 pointer-events-none opacity-20"
          >
            {/* Technical grid/blueprint layout */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.08] stroke-accent-cyan" strokeWidth="0.5">
              <pattern id="labGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" />
                <circle cx="0" cy="0" r="1.5" fill="#00E5FF" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#labGrid)" />
            </svg>

            {/* Tech blueprints */}
            <div className="absolute top-[20%] right-[12%] w-48 h-48 border border-white/5 rounded-xl flex items-center justify-center" style={{ transform: 'rotate(15deg)' }}>
              <div className="w-[85%] h-[85%] border border-dashed border-accent-cyan/20 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
            </div>
            <div className="absolute bottom-[15%] left-[8%] w-36 h-36 border border-white/5 rounded-full flex items-center justify-center" style={{ transform: 'rotate(-10deg)' }}>
              <div className="w-[70%] h-[70%] border border-accent-purple/20 rounded-lg"></div>
            </div>
          </motion.div>
        );

      case "toolbox":
        return (
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-30 mix-blend-screen"
            style={{ y: midYReverse, rotateX: 60, rotateZ: rotation, transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            {/* 3D Wireframe Grid Floor */}
            <div 
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(0, 229, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: 'rotateX(60deg) scale(2.0)',
                width: '100%',
                height: '100%',
                opacity: 0.35,
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
              }}
              className="absolute inset-0"
            />
          </motion.div>
        );

      case "faq":
        return (
          <motion.div 
            style={{ y: midY }}
            className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
          >
            {/* Drifting soft clouds/fog */}
            <div className="absolute top-[25%] left-[-20%] w-[140%] h-[35%] bg-gradient-to-r from-transparent via-white/5 to-transparent blur-[75px] animate-cloud-drift" />
            <div className="absolute bottom-[15%] left-[-40%] w-[140%] h-[30%] bg-gradient-to-r from-transparent via-white/3 to-transparent blur-[85px] animate-cloud-drift-reverse" />
          </motion.div>
        );

      case "contact":
        return (
          <motion.div 
            style={{ y: midY, opacity: glowOpacity }}
            className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
          >
            {/* Soft pulsing colors for calm ending */}
            <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-accent-cyan/8 blur-[160px]" />
            <div className="absolute top-[10%] right-[10%] w-[50%] h-[55%] rounded-full bg-accent-purple/6 blur-[140px]" />

            {/* Warm torchlight atmosphere overlay with pulsing glow */}
            <div 
              style={{
                background: "radial-gradient(circle at 45% 65%, rgba(255, 140, 50, 0.12), transparent 45%)"
              }}
              className="absolute inset-0 z-10 animate-torch-glow mix-blend-screen pointer-events-none"
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Drifting stardust/dust particles layer (Z-index: 30)
  const renderParticles = () => {
    if (isMobile) return null;

    // Default dust particle pattern
    let particleColor = "rgba(255, 255, 255, 0.015)";
    if (type === "hero") particleColor = "rgba(0, 229, 255, 0.02)";
    if (type === "services") particleColor = "rgba(139, 92, 246, 0.025)";
    if (type === "contact") particleColor = "rgba(255, 255, 255, 0.03)";

    return (
      <motion.div 
        style={{ y: foreY }}
        className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
      >
        {/* Floating stardust grid overlay */}
        <div 
          style={{
            backgroundImage: `radial-gradient(${particleColor} 1px, transparent 1px)`,
            backgroundSize: type === "contact" ? "48px 48px" : "32px 32px",
          }}
          className="absolute inset-0 opacity-70"
        />

        {/* Large floating depth-of-field lights */}
        {type === "contact" && (
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-accent-cyan/30 blur-[2px] animate-pulse"></div>
            <div className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-accent-purple/30 blur-[3px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-[30%] left-[40%] w-1.5 h-1.5 rounded-full bg-white/20 blur-[1px] animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div 
      style={{ opacity: sectionOpacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
    >
      {/* Layer 1: Deep Background Image Layer */}
      <motion.picture 
        style={{ y: backgroundY }}
        className={`absolute inset-0 w-full h-[125%] -top-[12%] block ${kenBurns && isAnimationEnabled ? 'animate-ken-burns' : ''}`}
      >
        {mobile && <source srcSet={mobile} media="(max-width: 768px)" type="image/webp" />}
        {webp && <source srcSet={webp} type="image/webp" />}
        
        <img 
          src={src} 
          alt="" 
          loading={priority ? "eager" : "lazy"}
          style={{ 
            objectPosition,
            filter: "saturate(1.25) contrast(1.10) brightness(0.9)",
            transform: "translateZ(0)",
            imageRendering: "auto"
          }}
          className="w-full h-full object-cover"
        />
      </motion.picture>

      {/* Layer 2: Mid-ground Atmospheric & Decorative Elements */}
      {renderAtmosphere()}

      {/* Layer 3: Ambient Glow mixing layer */}
      <motion.div 
        className="absolute inset-0 z-15 mix-blend-screen opacity-90"
        style={{
          scale: glowScale,
          background: `
            radial-gradient(circle at 20% 35%, rgba(0, 228, 255, 0.09) 0%, transparent 40%),
            radial-gradient(circle at 80% 65%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)
          `
        }}
      />

      {/* Layer 4: Foreground Floating Particle Layer */}
      {renderParticles()}

      {/* Layer 5: Readability Overlay & Vignette (Protects Text) */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayClass} z-25`}></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,9,13,0.85))] z-25 pointer-events-none"></div>

      {/* Localized style block for hardware-accelerated Ken Burns effects */}
      {kenBurns && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes kenBurnsEffect {
            0% { transform: scale(1.03) translate(0%, 0%); }
            50% { transform: scale(1.08) translate(-1%, -0.5%); }
            100% { transform: scale(1.03) translate(0%, 0%); }
          }
          .animate-ken-burns {
            animation: kenBurnsEffect 32s ease-in-out infinite;
            will-change: transform;
          }
        `}} />
      )}

      {type === "faq" && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes cloudDrift {
            0% { transform: translateX(-10%) translateY(0); }
            50% { transform: translateX(10%) translateY(5px); }
            100% { transform: translateX(-10%) translateY(0); }
          }
          @keyframes cloudDriftReverse {
            0% { transform: translateX(10%) translateY(0); }
            50% { transform: translateX(-10%) translateY(-5px); }
            100% { transform: translateX(10%) translateY(0); }
          }
          .animate-cloud-drift {
            animation: cloudDrift 40s ease-in-out infinite;
            will-change: transform;
          }
          .animate-cloud-drift-reverse {
            animation: cloudDriftReverse 48s ease-in-out infinite;
            will-change: transform;
          }
        `}} />
      )}

      {type === "contact" && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes torchGlow {
            0%, 100% { opacity: 0.35; filter: blur(90px) scale(0.95); }
            50% { opacity: 0.55; filter: blur(110px) scale(1.05); }
          }
          .animate-torch-glow {
            animation: torchGlow 7s ease-in-out infinite;
            will-change: opacity, filter, transform;
          }
        `}} />
      )}
    </motion.div>
  );
}

