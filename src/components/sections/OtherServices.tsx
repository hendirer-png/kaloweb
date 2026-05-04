import { motion } from 'motion/react';
import Tag from '../ui/Tag';
import Button from '../ui/Button';
import ScrollReveal from '../utils/ScrollReveal';
import { ShoppingBag, Settings2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../../lib/ContentContext';

export default function OtherServices() {
  const { getContent } = useContent();
  const sectionData = getContent('home_other_services');

  const tag = sectionData?.tag || "Layanan Lainnya";
  const title = sectionData?.title || "Butuh Lebih dari Landing Page?";
  const description = sectionData?.description || "Tidak semua bisnis cukup dengan template. Jika Anda butuh toko online atau sistem digital yang lebih kompleks, kami juga bisa bantu.";
  
  const box1_title = sectionData?.box1_title || "Website Toko Online";
  const box1_desc = sectionData?.box1_desc || "Bangun toko online profesional dengan integrasi pembayaran, manajemen produk, dan desain responsif yang siap menerima pesanan.";
  const box1_btn = sectionData?.box1_btn || "Lihat Layanan Toko Online";

  const box2_title = sectionData?.box2_title || "Website & Sistem Custom";
  const box2_desc = sectionData?.box2_desc || "Solusi 100% custom — website, integrasi AI, sistem ERP, hingga aplikasi mobile. Dibangun sesuai kebutuhan spesifik bisnis Anda.";
  const box2_btn = sectionData?.box2_btn || "Lihat Layanan Custom";

  return (
    <section id="other-services" className="py-14 sm:py-20 md:py-24 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-10 md:mb-16 lg:mb-20">
          <Tag className="mb-4 md:mb-6 lowercase">{tag}</Tag>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tighter mb-4 md:mb-6 leading-[1.1] text-black">
            {title}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Toko Online */}
          <ScrollReveal direction="left" className="group">
            <div className="h-full p-6 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] bg-gray-50 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/5 flex flex-col">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-6 md:mb-8 group-hover:bg-accent group-hover:text-black transition-colors">
                <ShoppingBag size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 md:mb-4">{box1_title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 md:mb-10 flex-grow">
                {box1_desc}
              </p>
              <Link to="/layanan-toko-online">
                <Button variant="black" className="rounded-full w-full justify-between h-14 group/btn">
                  {box1_btn}
                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Custom Systems */}
          <ScrollReveal direction="right" className="group">
            <div className="h-full p-6 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] bg-gray-50 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/5 flex flex-col">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-accent rounded-xl sm:rounded-2xl flex items-center justify-center text-black mb-6 md:mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                <Settings2 size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 md:mb-4">{box2_title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 md:mb-10 flex-grow">
                {box2_desc}
              </p>
              <Link to="/layanan-custom">
                <Button variant="black" className="rounded-full w-full justify-between h-14 bg-white text-black hover:bg-black hover:text-white border border-gray-200 group/btn shadow-none hover:shadow-xl">
                  {box2_btn}
                  <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
