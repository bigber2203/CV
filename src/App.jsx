import React, { useEffect } from 'react';
import Lenis from 'lenis';

// Import Layout Components
import BackgroundGrid from './components/BackgroundGrid';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

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

  // Initialize Lenis Smooth Scroll (only for main website page)
  useEffect(() => {
    if (isAdmin) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease-out curve
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <>
      {/* Background Layout Shells */}
      <BackgroundGrid />
      <CustomCursor />
      <Navbar />
      <FloatingWhatsApp />

      {/* Main Container */}
      <main className="relative z-10 w-full min-h-screen">
        {/* Sections */}
        <Hero />
        <About />
        <Services />
        <WhatICanBuild />
        <PossibilityLab />
        <Philosophy />
        <WhyChooseCreativeTech />
        <Toolbox />
        <ClientPaths />
        <Roadmap />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>

      {/* Footer Shell */}
      <Footer />
    </>
  );
}
