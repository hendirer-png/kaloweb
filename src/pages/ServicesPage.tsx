import { useEffect } from 'react';
import ServicesHero from '../components/sections/ServicesHero';
import ServicesGrid from '../components/sections/ServicesGrid';
import WhyUs from '../components/sections/WhyUs';
import OtherServices from '../components/sections/OtherServices';
import CTA from '../components/sections/CTA';

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <ServicesHero />
      <ServicesGrid />
      <WhyUs />
      <OtherServices />
      <CTA />
    </div>
  );
}
