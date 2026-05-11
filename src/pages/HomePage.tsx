import Hero from '../components/sections/Hero';
import LogoStrip from '../components/sections/Logos';
import About from '../components/sections/About';
import Portfolio from '../components/sections/Portfolio';
import Services from '../components/sections/Services';
import Expertise from '../components/sections/Expertise';
import Pricing from '../components/sections/Pricing';
import OtherServices from '../components/sections/OtherServices';
import FAQ from '../components/sections/FAQ';
import Testimonials from '../components/sections/Testimonials';
import Team from '../components/sections/Team';
import Blog from '../components/sections/Blog';
import CTA from '../components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <About />
      <Portfolio limit={8} />
      <Services />
      <Expertise />
      <Pricing />
      <OtherServices />
      <FAQ />
      <Testimonials />
      <Team />
      <Blog />
      <CTA />
    </>
  );
}
