import { motion, useScroll, useTransform } from 'motion/react';
import Tag from '../ui/Tag';
import { Quote, Loader2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  content: string;
  avatar_url: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const doubleTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div 
          style={{ y: titleY }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12 lg:mb-16"
        >
          <div className="max-w-xl">
            <Tag className="mb-4 md:mb-6 lowercase">Testimoni</Tag>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-4 md:mb-6 tracking-tighter">
              Apa kata mereka tentang kami?
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">
              Berikut adalah pengalaman nyata dari para mitra UMKM dan Brand yang telah kami bantu.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Infinite Scrolling Container */}
        <div className="flex overflow-hidden relative">
          {loading ? (
             <div className="w-full py-20 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-accent" size={32} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Meninjau Feedback...</p>
             </div>
          ) : testimonials.length === 0 ? (
             <div className="w-full py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                Belum ada testimoni terpilih.
             </div>
          ) : (
            <motion.div 
              className="flex gap-6 py-10"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ 
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {doubleTestimonials.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-[200px] sm:w-[260px] md:w-[320px] aspect-[10/13] relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group shadow-xl"
                >
                    <img 
                      src={item.avatar_url || `https://ui-avatars.com/api/?name=${item.author_name}&background=F7FF58&color=000`} 
                      alt={item.author_name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute top-6 left-6">
                       <div className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[7px] font-bold tracking-[0.2em] uppercase">
                          {item.author_role.split(' ')[0]}
                       </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                       <Quote size={24} className="mb-3 opacity-30 fill-white" />
                       <p className="text-sm md:text-base font-display font-medium mb-5 leading-relaxed">"{item.content}"</p>
                       <div>
                          <p className="font-bold text-[11px] tracking-tight">{item.author_name}</p>
                          <p className="text-[8px] opacity-60 uppercase tracking-widest">{item.author_role}</p>
                       </div>
                    </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
