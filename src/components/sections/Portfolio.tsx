import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import Tag from '../ui/Tag';
import { ExternalLink, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ScrollReveal from '../utils/ScrollReveal';


import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  project_type: string;
  image_url: string;
  client_name: string;
  project_url?: string;
}

export default function Portfolio({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['Semua', 'Web App', 'Mobile App', 'Platform', 'UI/UX Design']);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    fetchProjects();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('project_types')
        .eq('id', 1)
        .single();
      if (data?.project_types) {
        setCategories(['Semua', ...data.project_types]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
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

  const filteredProjects = activeCategory === 'Semua' 
    ? projects 
    : projects.filter(p => p.project_type === activeCategory);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section id="portfolio" ref={sectionRef} className="py-14 sm:py-20 md:py-24 lg:py-32 bg-gray-50/30">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12 lg:mb-16">
          <motion.div
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <Tag className="mb-5 lowercase">Portofolio Kami</Tag>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-4 md:mb-6 tracking-tighter leading-[1.05]">
              Karya terpilih untuk <br className="hidden md:block"/> 
              <span className="text-black/30">mitra UMKM &amp; Brand</span>
            </h2>
          </motion.div>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black/40 hover:text-black border border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          <AnimatePresence mode='popLayout'>
            {loading ? (
               <div className="col-span-full py-20 flex flex-col items-center gap-4">
                  <Loader2 className="animate-spin text-accent" size={32} />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Memuat Galeri...</p>
               </div>
            ) : displayedProjects.length === 0 ? (
               <div className="col-span-full py-20 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Belum ada karya di kategori ini.
               </div>
            ) : displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5, 
                    delay: index % 4 * 0.05,
                    ease: [0.22, 1, 0.36, 1] 
                  } 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  y: 20,
                  transition: { duration: 0.3 }
                }}
                className="group relative aspect-[1/1.1] rounded-[1rem] overflow-hidden bg-gray-200 shadow-sm"
              >
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-5 text-center">
                  <p className="text-[8px] font-bold text-accent uppercase tracking-[0.2em] mb-1.5">{project.project_type}</p>
                  <h3 className="text-white text-sm md:text-base font-display font-bold mb-4 leading-tight px-2">
                      {project.title}
                  </h3>
                  <p className="text-[9px] text-white/60 mb-2">{project.client_name}</p>
                  <a 
                    href={project.project_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black rounded-full font-bold text-[8px] uppercase tracking-widest hover:bg-accent transition-colors"
                  >
                    Detail <ExternalLink size={10} />
                  </a>
                </div>

                {/* Always visible info on mobile/bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity">
                  <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest mb-0.5">{project.project_type}</p>
                  <h4 className="text-white font-display font-bold text-sm tracking-tight">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {limit && filteredProjects.length > limit && (
          <div className="mt-16 flex justify-center">
            <Link 
              to="/portfolio"
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
                <ArrowRight className="text-black group-hover:text-white transition-colors duration-500" size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors">Lihat Semua Portofolio</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
