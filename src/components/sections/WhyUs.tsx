import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Tag from '../ui/Tag';
import ScrollReveal from '../utils/ScrollReveal';
import { useContent } from '../../lib/ContentContext';

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const { getContent } = useContent();
  const d = getContent('page_services_whyus');

  const tag = d?.tag || 'MENGAPA KAMI';
  const title = d?.title || 'Solusi digital yang';
  const highlightText = d?.highlightText || 'berdampak nyata';
  const description = d?.description || 'Pendekatan kami menggabungkan kreativitas desain, keahlian teknis, dan pemahaman bisnis untuk membantu UMKM memiliki alat digital yang mereka butuhkan untuk bersaing.';
  const image = d?.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200';

  return (
    <section id="why-us" ref={containerRef} className="py-14 sm:py-20 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <ScrollReveal direction="left" once={false}>
            <motion.div style={{ y: titleY }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <Tag className="mb-4 md:mb-6 lowercase">{tag}</Tag>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tighter mb-5 md:mb-8 leading-[1.1] text-black">
                {title} <span className="text-black/30">{highlightText}</span>
              </h2>
            </motion.div>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mb-6 md:mb-8 font-medium">{description}</p>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2} once={false} className="rounded-[2.5rem] overflow-hidden aspect-[4/3] relative group shadow-xl bg-gray-100">
            <motion.img
              style={{ y: imgY, scale: 1.35 }}
              src={image}
              className="absolute inset-0 w-full h-[150%] object-cover transition-transform duration-1000 group-hover:scale-145"
              alt="Why Us"
              referrerPolicy="no-referrer"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
