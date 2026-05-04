import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';
import Tag from '../ui/Tag';
import ScrollReveal from '../utils/ScrollReveal';
import { useContent } from '../../lib/ContentContext';

function Counter({ value, suffix = "", duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration, ease: "easeOut" });
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function About() {
  const { getContent } = useContent();
  const sectionData = getContent('home_about');

  const tag = sectionData?.tag || "Tentang Kami";
  const title = sectionData?.title || "Partner terpercaya dalam membangun ekosistem digital yang cerdas dan efisien";
  const highlightText = sectionData?.highlightText || "ekosistem digital";

  // Helper to render title with highlight
  const renderTitle = () => {
    if (!highlightText) return title;
    const parts = title.split(highlightText);
    return (
      <>
        {parts[0]}
        <span className="inline-flex items-center gap-2"><div className="w-8 h-8 bg-accent rounded-full" /> {highlightText}</span>
        <span className="text-black/30">{parts[1]}</span>
      </>
    );
  };

  return (
    <section id="tentang-kami" className="py-14 sm:py-20 md:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-16 md:mb-24">
          <ScrollReveal direction="up" once={false} className="flex flex-col items-center">
            <Tag className="mb-4 md:mb-6">{tag}</Tag>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-[1.2] text-black">
              {renderTitle()}
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1: Main Stat */}
          <ScrollReveal
            direction="up"
            once={false}
            className="md:col-span-2 relative h-[260px] sm:h-[300px] md:h-[360px] rounded-3xl overflow-hidden group"
          >
            <img src={sectionData?.card1_image || "/693671b05ed33655d4b7ce17_card-about-img.avif"} alt="Team Work" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white p-4 sm:p-6 rounded-2xl shadow-xl">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{sectionData?.card1_tag || "Team Work"}</div>
              <div className="text-2xl sm:text-4xl font-display font-bold mb-1 text-black">
                <Counter value={sectionData?.card1_value || 250} suffix={sectionData?.card1_suffix || "+"} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 leading-relaxed">{sectionData?.card1_desc || "Membantu UMKM Go Digital dengan solusi website dan aplikasi modern."}</p>
            </div>
          </ScrollReveal>

          {/* Card 2: 99% */}
          <ScrollReveal
            direction="up"
            delay={0.1}
            once={false}
            className="bg-gray-50 rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <p className="font-medium text-gray-500 mb-1 text-sm">{sectionData?.card2_tag || "Tingkat Kepuasan Klien"}</p>
              <div className="text-4xl sm:text-5xl font-display font-bold">
                <Counter value={sectionData?.card2_value || 99} suffix={sectionData?.card2_suffix || "%"} />
              </div>
            </div>
            <div className="mt-8">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i + 15}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Client" />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                “{sectionData?.card2_quote || "Website buatan Kaloweb membantu bisnis kopi saya naik kelas dan lebih dipercaya pelanggan."}”
              </p>
            </div>
          </ScrollReveal>

          {/* Column with 2 stacked cards */}
          <div className="flex flex-col gap-6">
            <ScrollReveal
              direction="right"
              delay={0.2}
              once={false}
              className="bg-accent rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between"
            >
              <div>
                <p className="font-medium text-black mb-1 uppercase text-[10px] tracking-widest">{sectionData?.card3_tag || "Growth Rate"}</p>
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
                  <Counter value={sectionData?.card3_value || 85} suffix={sectionData?.card3_suffix || "%"} />
                </div>
              </div>
              <p className="text-sm font-bold text-black mt-4 opacity-80">{sectionData?.card3_desc || "Rata-rata peningkatan trafik digital klien kami."}</p>
            </ScrollReveal>
            <ScrollReveal
              direction="right"
              delay={0.3}
              once={false}
              className="bg-black rounded-3xl p-6 sm:p-8 flex-1 text-white flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <p className="font-medium uppercase text-[10px] tracking-widest opacity-60">{sectionData?.card4_tag || "UMKM Terdukung"}</p>
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
                  <Counter value={sectionData?.card4_value || 150} suffix={sectionData?.card4_suffix || "+"} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
