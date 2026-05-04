import Tag from '../ui/Tag';
import ScrollReveal from '../utils/ScrollReveal';
import { useContent } from '../../lib/ContentContext';

export default function AboutStatement() {
  const { getContent } = useContent();
  const d = getContent('page_about_statement');

  const tag = d?.tag || 'TENTANG KAMI';
  const statement = d?.statement || 'Partner konsultasi digital yang berdedikasi membangun UMKM';
  const highlight = d?.highlight || 'lebih cerdas';
  const suffix = d?.suffix || 'dan lebih profesional.';
  const badgeText = d?.badgeText || 'Partner Digital Terpercaya';

  return (
    <section id="about-statement" className="py-20 sm:py-28 md:py-40 text-center px-5 sm:px-8 bg-white overflow-hidden">
      <ScrollReveal>
        <Tag className="mb-5 md:mb-8 font-medium lowercase">{tag}</Tag>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium max-w-4xl mx-auto leading-[1.1] tracking-tighter text-black">
          {statement} <span className="inline-flex items-center gap-2"><div className="w-6 h-6 md:w-9 md:h-9 bg-accent rounded-full" /> {highlight}</span> dan <span className="text-black/30">{suffix}</span>
        </h2>
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/100?img=5" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Avatar" />
            <img src="https://i.pravatar.cc/100?img=9" className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="Avatar" />
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{badgeText}</span>
        </div>
      </ScrollReveal>
    </section>
  );
}
