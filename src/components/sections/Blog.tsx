import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Tag from '../ui/Tag';
import Button from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  image_url: string;
  created_at: string;
  category: string;
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, image_url, created_at, category')
          .eq('status', 'Published')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 sm:py-20 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-16">
          <motion.div
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <Tag className="mb-4 md:mb-6 lowercase">Blog &amp; Artikel</Tag>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium mb-4 md:mb-6 tracking-tighter leading-[1.1]">
              Wawasan <span className="text-gray-400">digital terkini.</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">Strategi untuk membantu UMKM berkembang di dunia digital.</p>
          </motion.div>
          <Link to="/blog">
            <Button variant="black" className="h-11 text-xs rounded-full">View All</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-accent" size={24} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Artikel...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm font-medium">Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar text-left">
            {posts.map((post, idx) => (
              <div key={post.id} className="flex-shrink-0 w-[58vw] sm:w-auto snap-start">
                <Link
                  to={`/blog/${post.id}`}
                  className="group block aspect-[1/1.2] rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden shadow-sm bg-gray-100 relative"
                >
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-5xl font-display">
                      ✦
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {post.category && (
                    <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 bg-accent px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-black">
                      {post.category}
                    </div>
                  )}
                  <div className="absolute inset-x-3 sm:inset-x-5 bottom-3 sm:bottom-5 text-left">
                    <h3 className="text-[11px] sm:text-sm md:text-base font-display font-bold text-white group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
