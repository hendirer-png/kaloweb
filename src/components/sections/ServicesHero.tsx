import { motion, useScroll, useTransform, useTime } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { useContent } from '../../lib/ContentContext';

// ── Animated card strip ─────────────────────────────────────────────────────
const baseCards = [
  { id: 1, title: 'Analytics',         img: '/card-1.avif' },
  { id: 2, title: 'Design System',     img: '/card-2.avif' },
  { id: 3, title: 'App Interface',     img: '/card-3.avif' },
  { id: 4, title: 'Global Operations', img: '/card-4.avif' },
  { id: 5, title: 'Secure Data',       img: '/card-5.avif' },
  { id: 6, title: 'Growth Metrics',    img: '/card-6.avif' },
  { id: 7, title: 'Cloud Infra',       img: '/card-7.avif' },
  { id: 8, title: 'Digital Strategy',  img: '/card-8.avif' },
];

const getCardProps = (t: number) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return {
    x:       t * (isMobile ? 380 : 650),
    y:       0,
    rotate:  0,
    scale:   1.1 - Math.abs(t) * 0.4,
    opacity: Math.max(0, 1 - Math.abs(t) * 1.3 + 0.3),
  };
};

function CardItem({ card, index, count, time }: any) {
  const t = useTransform(time, (value: number) => {
    const cycleDuration = 35000;
    const progress     = (value % cycleDuration) / cycleDuration;
    const cardOffset   = index / count;
    return ((progress + cardOffset) % 1) * 2.8 - 1.4;
  });

  const x       = useTransform(t, v => getCardProps(v).x);
  const y       = useTransform(t, v => getCardProps(v).y);
  const rotate  = useTransform(t, v => getCardProps(v).rotate);
  const scale   = useTransform(t, v => getCardProps(v).scale);
  const opacity = useTransform(t, v => getCardProps(v).opacity);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex: 10 }}
      className="absolute w-28 sm:w-32 md:w-40 lg:w-48 bg-white rounded-lg shadow-2xl overflow-hidden border border-white/50 group cursor-pointer p-1"
    >
      <div className="w-full bg-slate-50 rounded-md overflow-hidden relative">
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <span className="text-[9px] font-bold text-white uppercase tracking-widest block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {card.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const textY  = useTransform(scrollYProgress, [0, 1], ['0vh', '60vh']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const time       = useTime();
  const cardsCount = 8;
  const cards      = baseCards;

  const { getContent } = useContent();
  const d = getContent('page_services_hero');

  const heading1       = d?.heading1       || 'Solusi Digital.';
  const heading2       = d?.heading2       || 'Layanan Professional.';
  const description    = d?.description    || 'Dari pembuatan website hingga pengembangan aplikasi, kami menghadirkan teknologi yang membantu UMKM dan Brand tumbuh lebih cepat di dunia digital.';
  const buttonText     = d?.buttonText     || 'MULAI SEKARANG';
  const backgroundImage = d?.backgroundImage || '/6933ffb5c1c55ded9d8218fd_ai-ct-img.avif';

  return (
    <section
      ref={containerRef}
      id="services-hero"
      className="relative h-[100vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden mb-8 md:mb-12 bg-gray-50 pt-28 sm:pt-36 md:pt-56"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Digital Strategy Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Text Content */}
      <motion.div style={{ y: textY, opacity }} className="container-custom relative z-10 flex flex-col items-center">
        <div className="max-w-3xl px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter mb-4 md:mb-6 leading-[0.95]">
            {heading1} <br />
            <span className="text-white/40">{heading2}</span>
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-lg max-w-lg mx-auto mb-6 md:mb-10 font-medium leading-relaxed">
            {description}
          </p>
          <Button
            variant="black"
            className="rounded-full px-6 sm:px-10 py-3 sm:py-4 group text-xs tracking-[0.2em] bg-black text-white hover:scale-105 transition-transform"
          >
            {buttonText} <ArrowUpRight className="inline-block ml-2 group-hover:rotate-45 transition-transform" size={16} />
          </Button>
        </div>

        {/* Animated Walking Cards */}
        <div className="relative w-full h-[180px] sm:h-[240px] md:h-[320px] mt-8 sm:mt-12 md:mt-20 flex justify-center items-start pointer-events-none">
          {cards.map((card, idx) => (
            <CardItem
              key={card.id}
              card={card}
              index={idx}
              count={cardsCount}
              time={time}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
