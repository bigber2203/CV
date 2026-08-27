import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function BackgroundGrid() {
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );

  // Monitor screen size and accessibility preferences
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

  // Track page-level scroll progress
  const { scrollY } = useScroll();

  // Slow parallax shifts for the grid and radial spots (only if animations are enabled)
  // Grid moves up slowly as we scroll down
  const gridY = useTransform(scrollY, [0, 5000], [0, -150]);
  // Glow spots move at different speeds to create layered depth
  const glow1Y = useTransform(scrollY, [0, 5000], [0, 180]);
  const glow2Y = useTransform(scrollY, [0, 5000], [0, -220]);
  const glow3Y = useTransform(scrollY, [0, 5000], [0, 80]);

  // Spring-smoothed mouse coordinates for liquid mouse parallax (only on desktop + motion enabled)
  const mouseX = useSpring(0, { stiffness: 35, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 35, damping: 25 });

  // Map mouse movement for different layers
  const glow1X = useTransform(mouseX, (x) => x * 1.5);
  const glow2X = useTransform(mouseX, (x) => x * -1.2);
  const glow3X = useTransform(mouseX, (x) => x * 0.8);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      // Shift by up to 25px
      mouseX.set(x * 25);
      mouseY.set(y * 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, prefersReducedMotion, mouseX, mouseY]);

  // Determine standard motion style bindings
  const animationEnabled = !prefersReducedMotion && !isMobile;
  const gridStyle = animationEnabled ? { y: gridY, x: mouseX } : { y: 0, x: 0 };
  const glow1Style = animationEnabled ? { y: glow1Y, x: glow1X } : { y: 0, x: 0 };
  const glow2Style = animationEnabled ? { y: glow2Y, x: glow2X } : { y: 0, x: 0 };
  const glow3Style = animationEnabled ? { y: glow3Y, x: glow3X } : { y: 0, x: 0 };

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#08090D] pointer-events-none">
      {/* Base tech-grid pattern with scroll & mouse parallax */}
      <motion.div 
        style={gridStyle} 
        className="absolute inset-0 tech-grid opacity-50"
      />

      {/* Futuristic radial glow spots */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[120px] animate-pulse" 
        style={{ ...glow1Style, animationDuration: '10s' }}
      />
      <motion.div 
        className="absolute bottom-[10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-accent-purple/5 blur-[160px] animate-pulse" 
        style={{ ...glow2Style, animationDuration: '14s' }}
      />
      <motion.div 
        className="absolute top-[35%] left-[25%] w-[50%] h-[50%] rounded-full bg-accent-blue/5 blur-[140px] animate-pulse" 
        style={{ ...glow3Style, animationDuration: '12s' }}
      />

      {/* Grid intersection dots for enhanced digital-matrix feel (fewer on mobile for speed) */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-[20%] left-[20%] grid-dot animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-[45%] right-[25%] grid-dot animate-ping" style={{ animationDuration: '6s' }}></div>
          <div className="absolute top-[75%] left-[15%] grid-dot animate-ping" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-[85%] right-[15%] grid-dot animate-ping" style={{ animationDuration: '7s' }}></div>
        </div>
      )}

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.85))]"></div>
      
      {/* Tech decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/10 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/10 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/10 pointer-events-none"></div>
    </div>
  );
}

