import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Tag from '../ui/Tag';
import { Sparkles, BarChart, Settings, UserCheck } from 'lucide-react';
import ScrollReveal from '../utils/ScrollReveal';
import React, { useRef } from 'react';
import { useContent } from '../../lib/ContentContext';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Settings': return Settings;
    case 'BarChart': return BarChart;
    case 'Sparkles': return Sparkles;
    case 'UserCheck': 
    default: return UserCheck;
  }
};

const ExpertiseCard: React.FC<{ card: any; idx: number }> = ({ card, idx }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = getIcon(card.icon);

  return (
    <ScrollReveal 
      delay={idx % 2 * 0.2} 
      direction={idx % 2 === 0 ? 'left' : 'right'}
      once={false}
      className="group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="aspect-[4/5] bg-white rounded-[2rem] p-0 mb-6 overflow-hidden relative border border-gray-100 flex items-center justify-center transition-all duration-500 group-hover:border-accent group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
      >
        {/* Main Image Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none p-4 lg:p-8">
           <motion.img 
             src={`/card-${idx + 1}.avif`} 
             style={{ transform: "translateZ(30px)" }}
             className="w-full h-full object-contain group-hover:scale-105 transition-all duration-1000"
             alt={card.title}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Subtle overlay hint */}
        <motion.div 
          style={{ transform: "translateZ(60px)" }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div className="w-16 h-16 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
             <IconComponent className="text-black" size={24} />
          </div>
        </motion.div>
      </motion.div>

      <div className="text-center md:text-left px-2">
        <h3 className="text-xl font-display font-bold mb-3 tracking-tight group-hover:text-black transition-colors">{card.title}</h3>
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md mx-auto md:mx-0 font-medium opacity-80 group-hover:opacity-100 transition-opacity">{card.description}</p>
      </div>
    </ScrollReveal>
  );
}

export default function Expertise() {
  const { getContent } = useContent();
  const sectionData = getContent('home_expertise');

  const defaultCards = [
    {
      title: 'Automation & optimization',
      description: 'Streamline your operations through intelligent workflow automation that saves time, reduces errors, and boosts productivity.',
      icon: 'Settings'
    },
    {
      title: 'Data analytics & insights',
      description: 'Transform raw data into strategic insight using advanced analytics, dashboards, and predictive modeling.',
      icon: 'BarChart'
    },
    {
      title: 'Digital transformation',
      description: 'We guide organizations through full-scale digital evolution — modernizing systems, processes, and decision-making frameworks.',
      icon: 'Sparkles'
    },
    {
      title: 'Intelligence in Every Decision',
      description: 'Combine strategy, data, and artificial intelligence to grow faster and build smarter systems.',
      icon: 'UserCheck'
    }
  ];

  const cards = sectionData?.items || defaultCards;
  const tag = sectionData?.tag || "Intelligence Technology";
  const title = sectionData?.title || "We help businesses harness technology not to replace human creativity, but to amplify it — enabling smarter decisions and faster.";

  return (
    <section className="py-14 sm:py-20 md:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <ScrollReveal once={false} className="flex flex-col items-center text-center mb-10 md:mb-16 lg:mb-20">
          <Tag className="mb-4 md:mb-6 lowercase">{tag}</Tag>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium max-w-3xl mb-4 md:mb-6 leading-[1.1] tracking-tighter text-black">
            {title}
          </h2>
        </ScrollReveal>

        {/* Mobile: horizontal scroll | sm: 2-col | lg: 4-col */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {cards.map((card: any, idx: number) => (
            <div key={idx} className="flex-shrink-0 w-[72vw] sm:w-auto snap-start">
              <ExpertiseCard card={card} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
