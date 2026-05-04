import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Tag from '../components/ui/Tag';
import ScrollReveal from '../components/utils/ScrollReveal';
import CTA from '../components/sections/CTA';
import { Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
  author_name: string;
  category: string;
  status: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, excerpt, image_url, created_at, author_name, category, status')
          .eq('status', 'Published')
          .order('created_at', { ascending: false });

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

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="container-custom py-20">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Tag className="mb-6 lowercase">Wawasan Digital</Tag>
            <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tighter leading-tight mb-6">
              Blog &amp; <span className="text-gray-400">Artikel Terkini</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl font-medium leading-relaxed">
              Temukan strategi, tips, dan tren teknologi terbaru untuk membantu UMKM Anda berkembang pesat di ekosistem digital.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-accent" size={32} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Artikel...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-gray-400 text-sm font-medium">Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
            {posts.map((post, idx) => (
              <ScrollReveal
                key={post.id}
                delay={idx * 0.1}
                className="group"
              >
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-gray-50 border border-gray-100 shadow-sm relative group-hover:shadow-md transition-all">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-4xl font-display">
                        ✦
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {formatDate(post.created_at)}
                    </div>
                    {post.category && (
                      <div className="absolute top-4 right-4 bg-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black">
                        {post.category}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold mb-3 tracking-tight group-hover:text-black transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">
                    READ ARTICLE
                    <div className="w-6 h-[1px] bg-current transition-all group-hover:w-8" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
      <CTA />
    </div>
  );
}
