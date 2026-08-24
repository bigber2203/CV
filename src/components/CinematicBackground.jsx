import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * CinematicBackground Component
 * Renders a full-bleed, responsive background layer with dark readable overlays,
 * cyan/purple ambient light mixing, scroll parallax, and viewport fade-in.
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
  sectionRef
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen dimensions to safely bypass CPU heavy animations on mobile
  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Configure Scroll Parallax if target sectionRef is provided
  const { scrollYProgress } = useScroll({
    target: sectionRef || undefined,
    offset: ["start end", "end start"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  
  // Disable animation calculations on mobile to maintain 60fps performance
  const backgroundY = (parallax && !isMobile) ? scrollY : "0%";

  // Decide dark gradient contrast overlay based on overlayStrength parameter
  // Reduced middle opacities to 30%-45% so image colors are clearly visible and vibrant
  const overlayClass = overlayStrength === "strong"
    ? "from-[#08090D]/80 via-[#08090D]/45 to-[#08090D]/80"
    : "from-[#08090D]/70 via-[#08090D]/30 to-[#08090D]/70";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
    >
      {/* Background image component layer */}
      <motion.picture 
        style={{ y: backgroundY }}
        className={`absolute inset-0 w-full h-[120%] -top-[10%] block ${kenBurns && !isMobile ? 'animate-ken-burns' : ''}`}
      >
        {/* Next-gen responsive WebP sources */}
        {mobile && <source srcSet={mobile} media="(max-width: 768px)" type="image/webp" />}
        {webp && <source srcSet={webp} type="image/webp" />}
        
        <img 
          src={src} 
          alt="" 
          loading={priority ? "eager" : "lazy"}
          style={{ 
            objectPosition,
            filter: "saturate(1.2) contrast(1.08)",
            transform: "translateZ(0)",
            imageRendering: "auto"
          }}
          className="w-full h-full object-cover"
        />
      </motion.picture>

      {/* Dark Readability Overlay Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayClass} z-1`}></div>

      {/* Cyan + Purple Ambient Glow Color Layer */}
      <div 
        style={{
          background: `
            radial-gradient(circle at 15% 30%, rgba(0, 228, 255, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 45%)
          `
        }}
        className="absolute inset-0 z-2 mix-blend-screen opacity-90"
      ></div>

      {/* Subtly animated floating dust particles (disabled on mobile for performance) */}
      {!isMobile && (
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 z-3"></div>
      )}

      {/* Localized style block for hardware-accelerated Ken Burns effects */}
      {kenBurns && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes kenBurnsEffect {
            0% { transform: scale(1.02) translate(0%, 0%); }
            50% { transform: scale(1.07) translate(-1%, -0.5%); }
            100% { transform: scale(1.02) translate(0%, 0%); }
          }
          .animate-ken-burns {
            animation: kenBurnsEffect 28s ease-in-out infinite;
            will-change: transform;
          }
        `}} />
      )}
    </motion.div>
  );
}
