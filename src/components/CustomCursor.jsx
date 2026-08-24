import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Check if device is touch or mobile
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseOver = (e) => {
      // Find closest interactive element
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setHovered(true);
        const text = target.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
        }
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan/60 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-150 ease-out flex items-center justify-center ${
          hovered ? 'w-24 h-24 bg-accent-cyan/10 border-accent-cyan text-white text-[10px] tracking-wider font-bold font-display uppercase p-2 text-center' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {hovered && cursorText && (
          <span className="animate-fade-in whitespace-nowrap">{cursorText}</span>
        )}
      </div>

      {/* Inner Solid Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-accent-cyan rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-75 ease-out ${
          hovered ? 'scale-0' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
