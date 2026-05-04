import { motion } from 'motion/react';
import Tag from '../ui/Tag';
import ScrollReveal from '../utils/ScrollReveal';
import { useContent } from '../../lib/ContentContext';

const fadeInVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.15 } },
  viewport: { once: true, margin: "-100px" }
};

const defaultJourney = [
  { year: '2017', desc: 'Kami memulai sebagai tim konsultan kecil yang fokus pada optimasi website UMKM.' },
  { year: '2019', desc: 'Ekspansi layanan ke pengembangan aplikasi mobile kustom untuk brand berkembang.' },
  { year: '2021', desc: 'Mengintegrasikan solusi AI untuk membantu efisiensi operasional bisnis mitra kami.' },
  { year: '2023', desc: 'Menjadi partner digital terpercaya bagi lebih dari 150+ UMKM di seluruh Indonesia.' },
];

export default function Journey() {
  const { getContent } = useContent();
  const d = getContent('page_about_journey');

  const tag = d?.tag || 'PERJALANAN KAMI';
  const title = d?.title || 'Langkah kami mewujudkan transformasi digital UMKM';
  const description = d?.description || 'Dimulai dari misi untuk mendigitalkan produk lokal, kami terus berkembang menjadi solusi satu atap untuk segala kebutuhan digital UMKM Indonesia.';
  const journey = d?.items || defaultJourney;

  return (
    <section id="journey" className="py-14 sm:py-20 md:py-24 lg:py-32 bg-gray-50/50">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
        <ScrollReveal direction="left">
          <Tag className="mb-4 md:mb-6 lowercase">{tag}</Tag>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-[1.1] tracking-tighter mb-5 md:mb-8 text-black">{title}</h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">{description}</p>
        </ScrollReveal>
        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-2 gap-4 sm:gap-6">
          {journey.map((item: any, i: number) => (
            <motion.div key={i} variants={fadeInVariant} whileHover={{ y: -4 }} className="bg-white p-4 sm:p-6 md:p-8 rounded-[1.2rem] md:rounded-[1.5rem] border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-gray-800 text-white w-fit px-3 sm:px-5 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-6 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest">{item.year}</div>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
