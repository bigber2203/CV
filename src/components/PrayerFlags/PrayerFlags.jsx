import React, { useEffect, useRef } from 'react';
import './PrayerFlags.css';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export default function PrayerFlags() {
  const containerRef = useRef(null);
  const flagRefs = useRef([]);

  const flags = [
    { name: 'blue', color: '#004F9F', left: '15%', top: '35%' },
    { name: 'white', color: '#FFFFFF', left: '32%', top: '50%' },
    { name: 'red', color: '#C8102E', left: '50%', top: '55%' },
    { name: 'green', color: '#1E6B38', left: '68%', top: '50%' },
    { name: 'yellow', color: '#FFD700', left: '85%', top: '35%' }
  ];

  useEffect(() => {
    if (isTouchDevice()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId = null;
    let isTracking = false;

    const flagsCount = 5;
    const flagLeftPercents = [15, 32, 50, 68, 85];
    const targets = Array.from({ length: flagsCount }, () => ({ rotate: 0, skew: 0, tx: 0 }));
    const currents = Array.from({ length: flagsCount }, () => ({ rotate: 0, skew: 0, tx: 0 }));

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      // Vertical bounding box limit: only calculate if mouse is within 250px of center
      const centerY = rect.top + rect.height / 2;
      if (Math.abs(mouseY - centerY) > 250) {
        if (isTracking) {
          // Clear targets
          for (let i = 0; i < flagsCount; i++) {
            targets[i] = { rotate: 0, skew: 0, tx: 0 };
          }
        }
        return;
      }

      isTracking = true;

      for (let i = 0; i < flagsCount; i++) {
        const flagX = rect.left + rect.width * (flagLeftPercents[i] / 100);
        const flagY = centerY;

        const dx = mouseX - flagX;
        const dy = mouseY - flagY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200; // px radius of wind influence

        if (dist < maxDist) {
          const influence = Math.max(0, 1 - dist / maxDist);
          const blowDir = dx < 0 ? -1 : 1; 

          // Interaction limits (subtle angles)
          targets[i].rotate = blowDir * influence * 8.5; // degrees
          targets[i].skew = blowDir * influence * 4.5; // degrees
          targets[i].tx = blowDir * influence * 5; // px
        } else {
          targets[i].rotate = 0;
          targets[i].skew = 0;
          targets[i].tx = 0;
        }
      }

      if (rafId === null) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    const handleMouseLeave = () => {
      for (let i = 0; i < flagsCount; i++) {
        targets[i] = { rotate: 0, skew: 0, tx: 0 };
      }
      if (rafId === null) {
        rafId = requestAnimationFrame(updatePhysics);
      }
    };

    const updatePhysics = () => {
      let active = false;
      const lerpFactor = 0.08;

      for (let i = 0; i < flagsCount; i++) {
        const cur = currents[i];
        const tar = targets[i];

        cur.rotate += (tar.rotate - cur.rotate) * lerpFactor;
        cur.skew += (tar.skew - cur.skew) * lerpFactor;
        cur.tx += (tar.tx - cur.tx) * lerpFactor;

        // Apply style directly to DOM elements
        const flagEl = flagRefs.current[i];
        if (flagEl) {
          flagEl.style.setProperty('--wind-rotate', `${cur.rotate.toFixed(2)}deg`);
          flagEl.style.setProperty('--wind-skew', `${cur.skew.toFixed(2)}deg`);
          flagEl.style.setProperty('--wind-tx', `${cur.tx.toFixed(2)}px`);
        }

        const diff = Math.abs(tar.rotate - cur.rotate) + Math.abs(tar.tx - cur.tx);
        if (diff > 0.01) {
          active = true;
        }
      }

      if (active) {
        rafId = requestAnimationFrame(updatePhysics);
      } else {
        rafId = null;
        isTracking = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="prayer-flags-wrapper" aria-hidden="true">
      {/* Hanging rope line */}
      <svg className="prayer-flags-rope" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M 0 5 Q 50 18 100 5" fill="none" stroke="#4a3b2c" strokeWidth="0.4" />
      </svg>
      
      {/* Flag elements */}
      <div className="flags-container">
        {flags.map((flag, idx) => (
          <div
            key={flag.name}
            ref={(el) => (flagRefs.current[idx] = el)}
            className={`prayer-flag flag-${flag.name}`}
            style={{
              left: flag.left,
              top: flag.top,
              backgroundColor: flag.color
            }}
          />
        ))}
      </div>
    </div>
  );
}
