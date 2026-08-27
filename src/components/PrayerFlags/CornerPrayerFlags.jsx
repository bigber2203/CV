import React, { useEffect, useRef, useState } from 'react';
import './CornerPrayerFlags.css';

export default function CornerPrayerFlags() {
  const containerRef = useRef(null);
  const [isGusting, setIsGusting] = useState(false);

  const flags = [
    { name: 'blue', color: '#004F9F', left: '17%', top: '15%' },
    { name: 'white', color: '#FFFFFF', left: '28%', top: '31%' },
    { name: 'red', color: '#C8102E', left: '42.5%', top: '47.5%' },
    { name: 'green', color: '#1E6B38', left: '60%', top: '63%' },
    { name: 'yellow', color: '#FFD700', left: '80%', top: '78%' }
  ];

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const parent = element.parentElement;
    if (!parent) return;

    let gustTimeout = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGusting(true);
          
          if (gustTimeout) clearTimeout(gustTimeout);
          gustTimeout = setTimeout(() => {
            setIsGusting(false);
          }, 2200); // duration of gust animation
        }
      },
      { threshold: 0.15 } // trigger when 15% of parent is visible
    );

    observer.observe(parent);

    return () => {
      observer.disconnect();
      if (gustTimeout) clearTimeout(gustTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`corner-flags-wrapper ${isGusting ? 'gust-active' : ''}`}
      aria-hidden="true"
    >
      {/* Curved diagonal rope */}
      <svg className="corner-flags-rope" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 10 0 Q 30 50 100 90" fill="none" stroke="#4a3b2c" strokeWidth="0.6" />
      </svg>

      {/* Flag elements */}
      <div className="corner-flags-container">
        {flags.map((flag) => (
          <div
            key={flag.name}
            className={`corner-flag corner-flag-${flag.name}`}
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
