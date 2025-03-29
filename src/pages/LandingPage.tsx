// src/pages/LandingPage.tsx
import React from 'react';

// Import the section components you already built
// Make sure these paths are correct based on your project structure
import Hero from '../components/sections/Hero';
import AboutProgram from '../components/sections/AboutProgram';
import ClassSchedule from '../components/sections/ClassSchedule';
import AboutMentor from '../components/sections/AboutMentor';
// Journey section component is NOT imported
import Curriculum from '../components/sections/Curriculum';
import BonusMasterclass from '../components/sections/BonusMasterclass';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing'; // Will modify this later
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

// This component simply arranges your sections for the main page
const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutProgram />
      <ClassSchedule />
      <AboutMentor />
      {/* Journey Section is omitted */}
      <Curriculum />
      <BonusMasterclass />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
};

export default LandingPage;