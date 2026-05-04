import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import Tag from '../ui/Tag';
import { useContent } from '../../lib/ContentContext';

export default function FAQ() {
  const { getContent } = useContent();
  const sectionData = getContent('home_faq');
  
  const defaultFaqs = [
    {
      question: "Berapa lama proses pembuatan website?",
      answer: "Biasanya memakan waktu 2-4 minggu tergantung pada kompleksitas fitur dan kesiapan konten dari pihak mitra. Paket landing page sederhana bisa selesai lebih cepat."
    },
    {
      question: "Apakah saya bisa request desain custom?",
      answer: "Tentu. Kami tidak menggunakan template standar. Setiap desain dibuat eksklusif untuk mencerminkan identitas Brand atau UMKM Anda secara unik."
    },
    {
      question: "Apakah website sudah termasuk sistem SEO?",
      answer: "Ya, setiap website yang kami bangun sudah dioptimasi secara teknis untuk SEO dasar, termasuk kecepatan akses dan struktur metadata yang ramah mesin pencari."
    },
    {
      question: "Bagaimana dengan pemeliharaan website setelah jadi?",
      answer: "Kami menyediakan layanan dukungan teknis dan pemeliharaan untuk memastikan website Anda tetap aman, cepat, dan up-to-date dengan teknologi terbaru."
    }
  ];

  const faqs = sectionData?.faqs || defaultFaqs;
  const tag = sectionData?.tag || "Bantuan";
  const title = sectionData?.title || "Pertanyaan yang sering ditanyakan.";
  const description = sectionData?.description || "Masih punya pertanyaan lain? Jangan ragu untuk menghubungi tim kami melalui WhatsApp untuk konsultasi gratis.";
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 md:py-24 bg-gray-50/50 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">
          <div className="lg:col-span-5">
            <motion.div 
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Tag className="mb-4 md:mb-6 lowercase">{tag}</Tag>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tighter mb-4 md:mb-6 leading-[1.1] text-black">
                {title}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed max-w-sm">
                {description}
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`border border-gray-100 rounded-2xl overflow-hidden transition-colors ${
                    openIdx === idx ? 'bg-white shadow-sm border-gray-200' : 'bg-white/40 hover:bg-white hover:border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                  >
                    <span className="text-sm md:text-base font-display font-bold text-gray-900 tracking-tight">
                      {faq.question || faq.q}
                    </span>
                    <div className={`p-1.5 rounded-full transition-transform duration-300 ${openIdx === idx ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {openIdx === idx ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIdx === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-gray-500 text-[11px] md:text-xs font-medium leading-relaxed max-w-[90%]">
                          {faq.answer || faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
