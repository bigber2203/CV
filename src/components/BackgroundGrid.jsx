import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#08090D] pointer-events-none">
      {/* Base tech-grid pattern */}
      <div className="absolute inset-0 tech-grid opacity-60"></div>

      {/* Futuristic radial glow spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-cyan/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-purple/5 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-accent-blue/5 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }}></div>

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(transparent_50%,rgba(0,0,0,0.8))]"></div>
      
      {/* Tech decorative corners */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-white/10 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/10 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-white/10 pointer-events-none"></div>
    </div>
  );
}
