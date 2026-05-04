import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import Tag from '../components/ui/Tag';
import { ArrowLeft, Clock, User, Share2, Loader2 } from 'lucide-react';
import CTA from '../components/sections/CTA';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image_url: string;
  created_at: string;
  author_name: string;
  category: string;
  status: string;
  content: string;
}

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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

  if (loading) {
    return (
      <div className="pt-40 pb-24 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Artikel...</p>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-2xl font-display font-medium mb-4">Artikel tidak ditemukan</h1>
        <Link to="/blog" className="text-black font-bold uppercase text-xs tracking-widest underline decoration-accent decoration-2 underline-offset-4">
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="container-custom py-12 md:py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} /> Kembali ke Blog
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <Tag className="mb-6 lowercase">{post.category || 'Wawasan Digital'}</Tag>
            <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tighter leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <div className="flex items-center gap-2">
                <User size={14} className="text-black/20" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-black/20" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: post.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link artikel disalin!');
                  }
                }}
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <Share2 size={14} className="text-black/20" />
                <span>Share</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 md:mb-24 shadow-2xl"
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}

        {/* Content Section */}
        <div className="max-w-3xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
              prose-p:text-gray-500 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-black prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ditulis Oleh</p>
                <p className="text-sm font-bold">{post.author_name}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: post.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link artikel disalin!');
                  }
                }}
                className="bg-gray-50 hover:bg-gray-100 p-3 rounded-full transition-colors"
              >
                <Share2 size={18} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <CTA />
    </div>
  );
}
