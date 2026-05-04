import { motion, useTime, useTransform, useScroll } from 'motion/react';
import { useRef } from 'react';
import Button from '../ui/Button';

export default function PortfolioHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const cardsCount = 16;
  const time = useTime();

  // Helper to calculate card properties based on a t value (-3 to 3)
  const getCardProps = (t: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const x = t * (isMobile ? 360 : 800);
    const y = 0; 
    const rotate = 0;
    const scale = 1;
    const opacity = 1; 
    return { x, y, rotate, scale, opacity };
  };

  const baseCards = [
    { id: 1, title: 'Analytics', img: '/card-1.avif' },
    { id: 2, title: 'Design System', img: '/card-2.avif' },
    { id: 3, title: 'App Interface', img: '/card-3.avif' },
    { id: 4, title: 'Global Operations', img: '/card-4.avif' },
    { id: 5, title: 'Secure Data', img: '/card-5.avif' },
    { id: 6, title: 'Growth Metrics', img: '/card-6.avif' },
    { id: 7, title: 'Cloud Infrastructure', img: '/card-7.avif' },
    { id: 8, title: 'Digital Strategy', img: '/card-8.avif' },
  ];

  // Double the cards for a continuous flow
  const cards = [...baseCards, ...baseCards.map(c => ({ ...c, id: c.id + 100 }))];

  const headingWords = ["Koleksi", "Karya", "Digital", "Terbaik"];
  const headingSecondary = ["untuk", "UMKM", "Maju"];

  return (
    <section 
      ref={containerRef}
      className="relative h-[100vh] flex items-center justify-start pt-28 sm:pt-36 md:pt-44 lg:pt-44 pb-16 md:pb-32 overflow-hidden bg-white"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hiro2.avif" 
          alt="Work Background" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        style={{ y: textY, opacity: opacityHero }}
        className="relative z-10 flex flex-col items-start text-left pl-4 sm:pl-8 md:pl-16 w-full max-w-7xl"
      >
        <div className="max-w-4xl mb-8 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-display font-medium leading-[1.05] tracking-tighter mb-4 md:mb-6 overflow-hidden">
            <div className="flex flex-wrap justify-start gap-x-3">
              {headingWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap justify-start gap-x-2 text-white/40">
              {headingSecondary.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/90 font-sans text-xs md:text-sm max-w-lg mb-5 md:mb-8 leading-relaxed"
          >
            Lihat bagaimana kami membantu UMKM dan Brand lokal bertransformasi <br className="hidden md:block" />
            melalui website dan aplikasi yang didesain secara eksklusif dan fungsional.
          </motion.p>
 
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a href="#portfolio">
              <Button variant="black" className="px-8 py-3 group text-[10px] tracking-widest bg-black text-white hover:bg-white hover:text-black transition-all rounded-full">Explore Projects</Button>
            </a>
          </motion.div>
        </div>
 
        {/* The Animated "Walking" Straight Line of Cards */}
        <div className="relative w-full h-[160px] sm:h-[220px] md:h-[280px] lg:h-[320px] mt-12 sm:mt-24 md:mt-40 lg:mt-48 flex justify-center items-start pointer-events-none">
          {cards.map((card, idx) => (
             <CardItem 
               key={card.id} 
               card={card} 
               index={idx} 
               count={cardsCount} 
               time={time} 
               getCardProps={getCardProps} 
             />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CardItem({ card, index, count, time, getCardProps }: any) {
  const t = useTransform(time, (value: number) => {
    const cycleDuration = 35000;
    const progress = (value % cycleDuration) / cycleDuration;
    const cardOffset = (index / count);
    let currentT = ((progress + cardOffset) % 1) * 6 - 3;
    return currentT;
  });

  const x = useTransform(t, (v: number) => getCardProps(v).x);
  const y = useTransform(t, (v: number) => getCardProps(v).y);
  const rotate = useTransform(t, (v: number) => getCardProps(v).rotate);
  const scale = useTransform(t, (v: number) => getCardProps(v).scale);
  const opacity = useTransform(t, (v: number) => getCardProps(v).opacity);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex: 10 }}
      className="absolute w-28 sm:w-32 md:w-48 lg:w-64 bg-white rounded-lg shadow-2xl overflow-hidden border border-white/50 group cursor-pointer p-1"
    >
      <div className="w-full bg-slate-50 rounded-md overflow-hidden relative">
         <img 
          src={card.img} 
          alt={card.title || `Work ${card.id}`} 
          className="w-full h-auto transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
           <span className="text-[10px] font-bold text-white uppercase tracking-widest block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             {card.title}
           </span>
        </div>
      </div>
    </motion.div>
  );
}
