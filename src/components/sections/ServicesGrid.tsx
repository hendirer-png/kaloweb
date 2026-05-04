import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Zap, Briefcase, Database, ArrowRight } from 'lucide-react';
import Tag from '../ui/Tag';
import ScrollReveal from '../utils/ScrollReveal';
import { useContent } from '../../lib/ContentContext';

const iconMap: Record<string, any> = { Zap, Briefcase, Database };

const defaultServices = [
  { title: 'Website Development', desc: 'Kami membangun website modern, responsif, dan SEO-friendly yang dirancang khusus untuk meningkatkan kredibilitas brand Anda.', icon: 'Zap', asset: '/69a4fc504463d68671c1b91a_Frame 2147226974.avif' },
  { title: 'Mobile App Solutions', desc: 'Pengembangan aplikasi mobile kustom untuk iOS dan Android yang memberikan pengalaman pengguna terbaik bagi pelanggan Anda.', icon: 'Briefcase', asset: '/mobile ap.png' },
  { title: 'UI/UX & Branding', desc: 'Menciptakan identitas visual yang kuat dan desain antarmuka yang intuitif untuk memastikan brand UMKM Anda tampil profesional dan berkesan.', icon: 'Database', asset: '/699ccbb16ac8c11d437d0bb5_cta.webp' },
];

function ServiceCard({ item, i }: { item: any; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const assetY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const assetScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  const IconComp = iconMap[item.icon] || Zap;

  return (
    <ScrollReveal key={i} delay={i * 0.15} once={false} className={`w-full py-10 sm:py-14 md:py-24 flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 lg:gap-20 group overflow-hidden border-b border-gray-100 last:border-0`}>
      <div ref={cardRef} className="flex-1 w-full">
        <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all">
          <IconComp size={20} className="text-black" />
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-4 md:mb-6 tracking-tight text-gray-900 group-hover:text-black transition-colors">{item.title}</h3>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mb-6 md:mb-10 leading-relaxed font-medium">{item.desc}</p>
        <button className="flex items-center text-[10px] tracking-[0.3em] font-bold uppercase text-black/40 group-hover:text-black transition-colors">
          LEARN MORE <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="flex-1 w-full h-[220px] sm:h-[280px] md:h-[400px] relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-50/50 transition-all duration-500">
        <motion.div style={{ y: assetY, scale: assetScale }} className="w-full h-full p-4 md:p-8">
          <img src={item.asset} className="w-full h-full object-cover" alt={item.title} />
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export default function ServicesGrid() {
  const { getContent } = useContent();
  const d = getContent('page_services_grid');

  const tag = d?.tag || 'LAYANAN KAMI';
  const title = d?.title || 'Solusi IT komprehensif dan inovasi untuk UMKM';
  const description = d?.description || 'Apakah Anda baru memulai atau ingin meningkatkan skala bisnis, kami membantu Anda bergerak lebih cepat dengan infrastruktur digital yang solid.';
  const services = d?.items || defaultServices;

  return (
    <section id="services-grid" className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <ScrollReveal once={false} className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-28">
          <Tag className="mb-4 md:mb-6 lowercase">{tag}</Tag>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-medium text-black tracking-tighter mb-5 md:mb-8 leading-[1.1]">{title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-medium">{description}</p>
        </ScrollReveal>
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-20">
          {services.map((item: any, i: number) => (
            <ServiceCard item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
