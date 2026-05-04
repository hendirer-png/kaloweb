import { useEffect } from 'react';
import AboutHero from '../components/sections/AboutHero';
import AboutStatement from '../components/sections/AboutStatement';
import Team from '../components/sections/Team';
import Journey from '../components/sections/Journey';
import CTA from '../components/sections/CTA';

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutStatement />
      <Team />
      <Journey />
      <div className="bg-white pb-24">
         <CTA />
      </div>
    </div>
  );
}
