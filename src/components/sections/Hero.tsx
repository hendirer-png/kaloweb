import { motion, useTime, useTransform, useScroll } from 'motion/react';
import { useRef } from 'react';
import Button from '../ui/Button';
import { Star } from 'lucide-react';
import { useContent } from '../../lib/ContentContext';

export default function Hero() {
  const { getContent } = useContent();
  const heroData = getContent('home_hero');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0vh", "25vh"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const cardsCount = 8;
  const time = useTime();

  // Helper to calculate card properties based on a t value (-1.4 to 1.4)
  const getCardProps = (t: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const x = t * (isMobile ? 380 : 650);
    const y = 0;
    const rotate = 0;
    const scale = 1.1 - Math.abs(t) * 0.4;
    const opacity = Math.max(0, 1 - Math.abs(t) * 1.3 + 0.3); 
    return { x, y, rotate, scale, opacity };
  };

  const cards = [
    { id: 1, title: 'Analytics', img: '/card-1.avif' },
    { id: 2, title: 'Design System', img: '/card-2.avif' },
    { id: 3, title: 'App Interface', img: '/card-3.avif' },
    { id: 4, title: 'Global Operations', img: '/card-4.avif' },
    { id: 5, title: 'Secure Data', img: '/card-5.avif' },
    { id: 6, title: 'Growth Metrics', img: '/card-6.avif' },
    { id: 7, title: 'Cloud Infrastructure', img: '/card-7.avif' },
    { id: 8, title: 'Digital Strategy', img: '/card-8.avif' },
  ];

  // Content values with fallbacks
  const headingPrimary = heroData?.headingPrimary || ["Membangun", "Masa", "Depan", "Ekosistem", "Digital"];
  const headingSecondary = heroData?.headingSecondary || ["UMKM", "Cerdas", "Indonesia"];
  const description = heroData?.description || "Solusi website & aplikasi cerdas yang membantu bisnis Anda scale-up dengan teknologi modern dan desain yang berkelas.";
  const backgroundImage = heroData?.backgroundImage || "/hiro.avif";
  const primaryButtonText = heroData?.primaryButtonText || "Mulai Sekarang";
  const secondaryButtonText = heroData?.secondaryButtonText || "Lihat Portofolio";

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-48 md:pb-48 overflow-hidden bg-white"
    >
      {/* Background with parallax image effect like PortfolioHero */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          alt="Hero Background" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        style={{ y: yContent, opacity: opacityHero }}
        className="container-custom relative z-10 flex flex-col items-center text-center"
      >
        <div className="max-w-3xl mx-auto mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-display font-medium leading-[1.05] tracking-tighter mb-4 md:mb-6 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-x-3">
              {headingPrimary.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word === "Digital" ? <span className="text-white">{word}</span> : word}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-3 text-white/40">
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
            className="text-white/90 font-sans text-xs sm:text-sm md:text-lg max-w-xl mx-auto mb-6 md:mb-10 leading-relaxed font-medium px-2 sm:px-0"
          >
            {description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 md:mb-12"
          >
            <Button variant="primary" className="h-10 sm:h-11 px-6 sm:px-8 text-xs sm:text-sm rounded-full shadow-lg hover:shadow-blue-200/50 transition-all w-full sm:w-auto">{primaryButtonText}</Button>
            <Button variant="secondary" className="h-10 sm:h-11 px-6 sm:px-8 text-xs sm:text-sm bg-white/10 backdrop-blur-md border-slate-200 rounded-full hover:bg-slate-50 transition-all w-full sm:w-auto">{secondaryButtonText}</Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
              REKOMENDASI DARI <span className="text-slate-900">4,900+</span> MITRA BISNIS
            </p>
          </motion.div>
        </div>

        {/* The Animated "Walking" Arc of Cards */}
        <div className="relative w-full h-[180px] sm:h-[240px] md:h-[320px] mt-6 md:mt-12 flex justify-center items-start">
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
    const cycleDuration = 35000; // Constant continuous motion
    const progress = (value % cycleDuration) / cycleDuration;
    const cardOffset = (index / count);
    let currentT = ((progress + cardOffset) % 1) * 2.8 - 1.4;
    return currentT;
  });

  const x = useTransform(t, v => getCardProps(v).x);
  const y = useTransform(t, v => getCardProps(v).y);
  const rotate = useTransform(t, v => getCardProps(v).rotate);
  const scale = useTransform(t, v => getCardProps(v).scale);
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
        <div className="absolute inset-x-0 bottom-0 p-4">
           <span className="text-[10px] font-bold text-white uppercase tracking-widest block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             {card.title}
           </span>
        </div>
      </div>
    </motion.div>
  );
}
