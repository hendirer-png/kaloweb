import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import ScrollReveal from '../utils/ScrollReveal';
import { useContent } from '../../lib/ContentContext';

export default function CTA() {
  const { getContent } = useContent();
  const sectionData = getContent('home_cta');

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-45%", "15%"]);

  const title = sectionData?.title || "Siap untuk melejitkan brand Anda secara digital?";
  const description = sectionData?.description || "Tim kami siap membantu Anda membangun pondasi digital yang kuat melalui website dan aplikasi profesional yang dirancang khusus untuk pertumbuhan bisnis Anda.";
  const primaryButtonText = sectionData?.primaryButtonText || "Pesan Sekarang";
  const image = sectionData?.image || "/692dd59736012cfb238ae312_cta-bg.avif";

  return (
    <section ref={containerRef} className="py-14 sm:py-20 md:py-24 bg-white overflow-hidden px-4 sm:px-6 md:px-12">
      <div className="relative overflow-hidden bg-gray-50 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center p-6 sm:p-10 md:p-12 text-center text-white rounded-3xl">
        <motion.img 
          style={{ y: bgY }}
          src={image} 
          alt="CTA Background" 
          className="absolute inset-0 w-full h-[130%] object-cover opacity-100"
          referrerPolicy="no-referrer"
        />
        
        <ScrollReveal once={false} className="relative z-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-6 md:mb-10">
             <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4 md:mb-6">Dipercaya 150+ Mitra</p>
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-9 h-9 md:w-12 md:h-12 rounded-full border-2 border-white/20" alt="Partner" />
                ))}
             </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-tight mb-6 md:mb-8">
            {title.includes('<br/>') || title.includes('\n') ? (
              <span dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }} />
            ) : title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-2 sm:px-0">
            {description}
          </p>

          <Button 
            variant="arrow" 
            onClick={() => navigate('/checkout')}
          >
            {primaryButtonText}
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
