import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { useContent } from '../../lib/ContentContext';

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "60vh"]);

  const { getContent } = useContent();
  const d = getContent('page_about_hero');

  const badge = d?.badge || 'Dipercaya 150+ UMKM';
  const heading = d?.heading || 'Membantu UMKM Naik Kelas Lewat Teknologi';
  const description = d?.description || 'Kaloweb hadir sebagai mitra digital yang berdedikasi untuk mentransformasi UMKM dan Brand lokal menjadi entitas digital yang profesional dan kompetitif.';
  const buttonText = d?.buttonText || 'HUBUNGI KAMI';
  const image = d?.image || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200';
  const cardLabel = d?.cardLabel || 'Growth Analytics';
  const cardValue = d?.cardValue || '+$12,400';

  return (
    <section ref={containerRef} id="about-hero" className="flex flex-col lg:flex-row min-h-[80vh] overflow-hidden">
      <div className="flex-1 bg-gray-50 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-28 sm:pt-36 md:pt-48 pb-12 sm:pb-16 md:pb-20 border-r border-gray-100">
        <motion.div style={{ y: textY }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }} className="max-w-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-[1.1] text-black tracking-tighter mb-4 md:mb-6">{heading}</h1>
          <p className="text-gray-500 mb-6 md:mb-8 max-w-md leading-relaxed text-xs sm:text-sm md:text-base">{description}</p>
          <Button variant="black" className="rounded-full px-8 py-3.5 group text-xs tracking-widest">
            {buttonText} <ArrowUpRight className="inline-block ml-2 group-hover:rotate-45 transition-transform" size={16} />
          </Button>
        </motion.div>
      </div>
      <div className="flex-1 relative min-h-[260px] sm:min-h-[320px] lg:min-h-auto overflow-hidden">
        <motion.img style={{ y: imgY }} src={image} alt="About Hero" className="absolute inset-0 w-full h-[180%] object-cover" />
        <motion.div style={{ y: cardY }} initial={{ y: 20, opacity: 0, x: "-50%" }} animate={{ y: 0, opacity: 1, x: "-50%" }} transition={{ delay: 0.5, duration: 0.8 }} className="absolute top-1/2 left-1/2 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl block w-48 sm:w-56 scale-90 sm:scale-100 origin-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-lg">D</div>
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{cardLabel}</p>
              <p className="text-xl font-bold">{cardValue}</p>
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between py-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-100" />
                  <div className="w-20 h-2 bg-gray-200 rounded" />
                </div>
                <div className="w-10 h-2 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
