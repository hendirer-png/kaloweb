import { useState, useEffect } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Trash2,
  Search,
  MoreVertical,
  Plus,
  ShieldCheck,
  ChevronDown,
  Loader2,
  Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import Tag from '../../components/ui/Tag';
import Button from '../../components/ui/Button';

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    author_name: '',
    author_role: '',
    content: '',
    rating: 5,
    avatar_url: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      alert('Error uploading avatar!');
      return null;
    } finally {
      setUploading(false);
    }
  };

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

  const handleSaveTestimonial = async () => {
    setSaving(true);
    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(newTestimonial)
          .eq('id', editingTestimonial.id);
        if (error) throw error;
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...newTestimonial } : t));
      } else {
        const { data, error } = await supabase
          .from('testimonials')
          .insert([newTestimonial])
          .select();
        if (error) throw error;
        setTestimonials([data[0], ...testimonials]);
      }

      setIsModalOpen(false);
      setEditingTestimonial(null);
      setNewTestimonial({ author_name: '', author_role: '', content: '', rating: 5, avatar_url: '' });
    } catch (err) {
      alert('Gagal simpan testimoni');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setNewTestimonial({
      author_name: testimonial.author_name,
      author_role: testimonial.author_role,
      content: testimonial.content,
      rating: testimonial.rating || 5,
      avatar_url: testimonial.avatar_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus testimoni ini?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Portal Testimoni</h1>
          <p className="text-gray-500 text-sm font-medium">Kurasi dan tampilkan cerita sukses dari klien Kaloweb.</p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial(null);
            setNewTestimonial({ author_name: '', author_role: '', content: '', rating: 5, avatar_url: '' });
            setIsModalOpen(true);
          }}
          className="px-6 h-14 bg-black text-white rounded-2xl flex items-center gap-3 font-bold hover:bg-accent hover:text-black transition-all shadow-xl shadow-black/10 group"
        >
          Tulis Testimoni <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        {/* Testimonials Modal */}
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
                    {editingTestimonial ? 'Edit Testimoni' : 'Klip Testimoni Baru'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Plus className="rotate-45" size={20} />
                  </button>
                </div>

                <div className="p-10 space-y-8 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Nama Author</label>
                      <input
                        type="text"
                        value={newTestimonial.author_name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, author_name: e.target.value })}
                        className="w-full h-14 px-6 rounded-sm bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Role / Perusahaan</label>
                      <input
                        type="text"
                        value={newTestimonial.author_role}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, author_role: e.target.value })}
                        className="w-full h-14 px-6 rounded-sm bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Avatar Profile</label>
                    <div className="flex items-center gap-6 p-6 rounded-sm bg-gray-50 border-2 border-dashed border-gray-200 hover:border-accent transition-all group relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                        <img
                          src={newTestimonial.avatar_url || `https://ui-avatars.com/api/?name=${newTestimonial.author_name || 'User'}&background=F7FF58&color=000`}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black mb-1">
                          {uploading ? 'Mengunggah...' : 'Pilih Foto Profil'}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await uploadImage(file);
                              if (url) setNewTestimonial({ ...newTestimonial, avatar_url: url });
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          disabled={uploading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Isi Testimoni</label>
                    <textarea
                      value={newTestimonial.content}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                      className="w-full p-6 rounded-sm bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm min-h-[120px]"
                    />
                  </div>
                </div>

                <div className="p-10 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-8 h-14 text-xs font-bold uppercase tracking-widest text-gray-400">Batal</button>
                  <Button
                    variant="black"
                    className="rounded-2xl px-10 h-14"
                    onClick={handleSaveTestimonial}
                    disabled={saving || uploading}
                  >
                    {saving ? <Loader2 className="animate-spin" /> : editingTestimonial ? 'Update Cerita' : 'Simpan Cerita'}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4">
            <Loader2 size={32} className="animate-spin text-accent" />
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sincronizing Testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-400 text-sm">Belum ada testimoni.</div>
        ) : testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-10 rounded-[3rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col group"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-sm bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                  <img src={t.avatar_url || `https://ui-avatars.com/api/?name=${t.author_name}&background=F7FF58&color=000`} alt={t.author_name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-black mb-0.5">{t.author_name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent italic">{t.author_role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[8px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 size={10} /> {t.status}
                </div>
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex gap-1 text-accent mb-4">
                {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
              </div>
              <p className="text-sm font-display font-medium text-gray-800 leading-relaxed italic italic-serif text-pretty">
                "{t.content}"
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors"
                >Hapus</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

