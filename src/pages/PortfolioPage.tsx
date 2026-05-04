import { useEffect } from 'react';
import PortfolioHero from '../components/sections/PortfolioHero';
import Portfolio from '../components/sections/Portfolio';
import CTA from '../components/sections/CTA';

export default function PortfolioPage() {
  return (
    <div>
      <PortfolioHero />
      <Portfolio />
      <CTA />
    </div>
  );
}
