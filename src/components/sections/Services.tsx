import { motion, useScroll, useTransform } from 'motion/react';
import Tag from '../ui/Tag';
import { Globe, Smartphone, Palette, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';

const services = [
  {
    title: 'Website Development',
    description: 'Pembuatan landing page, e-commerce, dan website profil perusahaan yang responsif dan cepat.',
    icon: Globe,
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Mobile Application',
    description: 'Transformasi bisnis Anda ke dalam aplikasi mobile (Android & iOS) yang intuitif dan fungsional.',
    icon: Smartphone,
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Digital Branding',
    description: 'Membangun identitas visual Brand Anda agar tampil profesional dan konsisten di dunia digital.',
    icon: Palette,
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
  }
];

import { useContent } from '../../lib/ContentContext';

export default function Services() {
  const { getContent } = useContent();
  const sectionData = getContent('home_services');
  
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const tag = sectionData?.tag || "Layanan Kami";
  const title = sectionData?.title || "Partner terpercaya dalam membangun ekosistem digital yang cerdas dan efisien.";
  const highlightText = sectionData?.highlightText || "ekosistem digital";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return Smartphone;
      case 'Palette': return Palette;
      case 'Globe': 
      default: return Globe;
    }
  };

  const activeServices = sectionData?.items?.map((item: any) => ({
    ...item,
    icon: getIcon(item.icon)
  })) || services;

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Helper to render title with highlight
  const renderTitle = () => {
    if (!highlightText) return title;
    const parts = title.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="text-black/30">{highlightText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section id="layanan" ref={sectionRef} className="py-14 sm:py-20 md:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mb-10 md:mb-16 lg:mb-20">
          <motion.div
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tag className="mb-6 lowercase">{tag}</Tag>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-[1.1] text-black tracking-tighter">
              {renderTitle()}
            </h2>
          </motion.div>
        </div>

        {/* Mobile: horizontal scroll strip | md+: 3-col grid */}
        <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scroll-pl-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {activeServices.map((service: any, idx: number) => (
            <motion.div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-gray-50/50 rounded-[1.25rem] sm:rounded-[1.5rem] p-3 sm:p-6 md:p-7 flex flex-col border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-[0_12px_30px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex-shrink-0 w-[62vw] sm:w-[60vw] md:w-auto snap-start min-h-[200px] sm:min-h-[260px] md:min-h-[280px]"
            >
              {/* Image at the top */}
              <div className="relative w-full mb-3 sm:mb-6 md:mb-8">
                <motion.div
                  animate={{ y: hoveredIdx === idx ? -4 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-none overflow-hidden relative shadow-md bg-gray-200 aspect-[16/10]"
                >
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              {/* Content below */}
              <div className="flex-grow">
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white shadow-sm flex items-center justify-center rounded-lg mb-2 sm:mb-4 md:mb-6 group-hover:shadow-md transition-shadow">
                  <service.icon size={14} className="text-black sm:hidden" />
                  <service.icon size={18} className="text-black hidden sm:block" />
                </div>
                <h3 className="text-sm sm:text-lg md:text-2xl font-display font-bold tracking-tight leading-tight mb-1 sm:mb-2 md:mb-3">{service.title}</h3>
                <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm leading-relaxed max-w-[95%] mb-2 sm:mb-4 md:mb-6">
                  {service.description}
                </p>
              </div>

              <div className="mt-auto pt-2 sm:pt-4 md:pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">Learn more</span>
                <motion.div
                  animate={{ x: hoveredIdx === idx ? 0 : -4, opacity: hoveredIdx === idx ? 1 : 0.4 }}
                  className="text-black"
                >
                  <ArrowRight size={14} className="sm:hidden" />
                  <ArrowRight size={18} className="hidden sm:block" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
