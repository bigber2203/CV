import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';

// Import Layout Components
import BackgroundGrid from './components/BackgroundGrid';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import ScrollVideoBackground from './components/ScrollVideoBackground';

// Import Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import WhatICanBuild from './sections/WhatICanBuild';
import PossibilityLab from './sections/PossibilityLab';
import Philosophy from './sections/Philosophy';
import WhyChooseCreativeTech from './sections/WhyChooseCreativeTech';
import Toolbox from './sections/Toolbox';
import ClientPaths from './sections/ClientPaths';
import Roadmap from './sections/Roadmap';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import FinalCTA from './sections/FinalCTA';
import AdminDashboard from './sections/AdminDashboard';

export default function App() {
  const isAdmin = window.location.pathname === '/admin';
  const [activeSection, setActiveSection] = useState('home');

  // Initialize Lenis Smooth Scroll (only for main website page)
  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease-out curve
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis; // Expose Lenis globally to avoid conflicts

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <>
      {/* Video canvas: fixed, z-index:1, opacity:0 until frame 1 loads */}
      <ScrollVideoBackground />

      {/* Global cinematic overlay: subtle dark vignette to aid readability.
          z-index 2 = above canvas (1), below main content (10).
          pointer-events:none so it never blocks any interaction.
          hidden on mobile (canvas doesn't render there). */}
      <div
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(8,9,13,0.30) 0%, rgba(8,9,13,0.65) 100%)',
        }}
      />

      {/* Background Layout Shells */}
      <BackgroundGrid />
      <CustomCursor />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <FloatingWhatsApp />

      {/* Main Container */}
      <main className="relative z-10 w-full min-h-screen">
        {/* Sections */}
        <Hero activeSection={activeSection} />
        <About activeSection={activeSection} />
        <Services activeSection={activeSection} />
        <WhatICanBuild />
        <PossibilityLab activeSection={activeSection} />
        <Philosophy />
        <WhyChooseCreativeTech />
        <Toolbox activeSection={activeSection} />
        <ClientPaths />
        <Roadmap />
        <FAQ activeSection={activeSection} />
        <Contact activeSection={activeSection} />
        <FinalCTA />
      </main>

      {/* Footer Shell */}
      <Footer />
    </>
  );
}
