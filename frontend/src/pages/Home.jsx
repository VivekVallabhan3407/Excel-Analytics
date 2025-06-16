import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FaqSection from '../components/home/FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyChooseUs />
      <FaqSection />
    </div>
  );
}