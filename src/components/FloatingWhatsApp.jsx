import React, { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [pulse, setPulse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Pulse animation triggers after 3 seconds, repeating every 6 seconds
    const timer = setTimeout(() => {
      setPulse(true);
      // Turn off after animation cycle completes
      const pulseTimeout = setTimeout(() => setPulse(false), 3000);
      return () => clearTimeout(pulseTimeout);
    }, 3000);

    const interval = setInterval(() => {
      setPulse(true);
      const pulseTimeout = setTimeout(() => setPulse(false), 3000);
      return () => clearTimeout(pulseTimeout);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const whatsappUrl = "https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-45 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:shadow-[0_0_22px_rgba(37,211,102,0.65)] transition-all duration-300 ease-out cursor-pointer group ${
        pulse ? 'animate-pulse-glow' : ''
      }`}
      data-cursor="pointer"
      data-cursor-text="WHATSAPP"
    >
      {/* Custom SVG WhatsApp Logo */}
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>

      {/* Expanded Text */}
      <span
        className={`font-body font-bold text-xs tracking-wide overflow-hidden transition-all duration-300 ease-out whitespace-nowrap ${
          isHovered ? 'max-w-[120px] ml-1 pr-1' : 'max-w-0'
        }`}
      >
        Chat with Bigyat
      </span>

      <style>{`
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 15px rgba(37, 211, 102, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 25px rgba(37, 211, 102, 0.8);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 15px rgba(37, 211, 102, 0.4);
            transform: scale(1);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 1.8s ease-in-out infinite;
        }
      `}</style>
    </a>
  );
}
