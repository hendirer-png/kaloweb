import { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Tag as TagIcon,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';

export default function ManageBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    status: 'Published',
    author_name: 'Admin',
    category: 'Business'
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      alert('Error uploading image!');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async () => {
    if (!newPost.image_url) {
      alert('Upload gambar thumbnail terlebih dahulu');
      return;
    }
    setSaving(true);
    try {
      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(newPost)
          .eq('id', editingPost.id);
        if (error) throw error;
        setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...newPost } : p));
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([newPost])
          .select();
        if (error) throw error;
        setPosts([data[0], ...posts]);
      }

      setIsModalOpen(false);
      setEditingPost(null);
      setNewPost({ title: '', excerpt: '', content: '', image_url: '', status: 'Published', author_name: 'Admin', category: 'Business' });
    } catch (err) {
      alert('Gagal simpan post');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      image_url: post.image_url || '',
      status: post.status || 'Published',
      author_name: post.author_name || 'Admin',
      category: post.category || 'Business'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus artikel ini?')) return;
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Portal Blog</h1>
          <p className="text-gray-500 text-sm font-medium">Tulis dan terbitkan artikel edukasi untuk audiens Kaloweb.</p>
        </div>
        <button
          onClick={() => {
            setEditingPost(null);
            setNewPost({ title: '', excerpt: '', content: '', image_url: '', status: 'Published', author_name: 'Admin' });
            setIsModalOpen(true);
          }}
          className="px-6 h-14 bg-black text-white rounded-2xl flex items-center gap-3 font-bold hover:bg-accent hover:text-black transition-all shadow-xl shadow-black/10 group"
        >
          Tulis Artikel <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        {/* Blog Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-black tracking-tight">
                    {editingPost ? 'Edit Artikel' : 'Tulis Artikel Baru'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>

                <div className="p-10 space-y-8 overflow-y-auto">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Judul Artikel</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      placeholder="Misal: Cara Ekspor Produk UMKM"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Ringkasan (Excerpt)</label>
                    <textarea
                      value={newPost.excerpt}
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                      className="w-full p-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm min-h-[100px]"
                      placeholder="Tulis ringkasan singkat artikel..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Thumbnail Banner</label>
                    <div className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-accent transition-all group relative">
                      {newPost.image_url ? (
                        <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                          <img src={newPost.image_url} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center text-gray-300 border border-gray-100">
                          <FileText size={32} />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-black mb-1">
                          {uploading ? 'Mengunggah...' : 'Pilih Gambar Banner'}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium">PNG, JPG max 2MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await uploadImage(file);
                              if (url) setNewPost({ ...newPost, image_url: url });
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Kategori</label>
                      <select
                        value={newPost.category}
                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      >
                        <option value="Business">Business</option>
                        <option value="Technology">Technology</option>
                        <option value="E-Export">E-Export</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Status</label>
                      <select
                        value={newPost.status}
                        onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-8 h-14 text-xs font-bold uppercase tracking-widest text-gray-400">Batal</button>
                  <Button
                    variant="black"
                    className="rounded-2xl px-10 h-14"
                    onClick={handleSavePost}
                    disabled={saving || uploading}
                  >
                    {saving ? <Loader2 className="animate-spin" /> : editingPost ? 'Update Artikel' : 'Terbitkan Artikel'}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Artikel</p>
          <h3 className="text-3xl font-display font-medium text-black">{posts.length}</h3>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Views</p>
          <h3 className="text-3xl font-display font-medium text-black">
            {posts.reduce((acc, curr) => acc + (curr.views_count || 0), 0).toLocaleString()}
          </h3>
        </div>
        <div className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Draft Tersimpan</p>
          <h3 className="text-3xl font-display font-medium text-black">
            {posts.filter(p => p.status === 'Draft').length}
          </h3>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Blog...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Judul Artikel</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Stats</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Tanggal</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.length === 0 ? (
                  <tr><td colSpan={5} className="py-20 text-center text-gray-400 text-sm">Belum ada artikel.</td></tr>
                ) : posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6 max-w-md">
                      <h4 className="text-sm font-bold text-black mb-1 group-hover:text-accent transition-colors line-clamp-1">{post.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Oleh {post.author_name}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${post.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-500 font-mono">
                        <span className="flex items-center gap-1"><Eye size={12} /> {post.views_count}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-2">
                        <Calendar size={12} /> {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-xl transition-all shadow-none hover:shadow-lg"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
