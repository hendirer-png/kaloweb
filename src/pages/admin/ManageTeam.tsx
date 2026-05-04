import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  MoreVertical,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Users,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';

export default function ManageTeam() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `team/${fileName}`;

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

  const handleSaveMember = async () => {
    if (!newMember.name || !newMember.role) {
      alert('Nama dan Jabatan wajib diisi');
      return;
    }
    setSaving(true);
    try {
      if (editingMember) {
        const { error } = await supabase
          .from('team_members')
          .update(newMember)
          .eq('id', editingMember.id);
        if (error) throw error;
        setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...newMember } : m));
      } else {
        const { data, error } = await supabase
          .from('team_members')
          .insert([newMember])
          .select();
        if (error) throw error;
        setMembers([...members, data[0]]);
      }

      setIsModalOpen(false);
      setEditingMember(null);
      setNewMember({ name: '', role: '', image_url: '' });
    } catch (err) {
      alert('Gagal simpan data tim');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      image_url: member.image_url
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus anggota tim ini?')) return;
    try {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
      setMembers(members.filter(m => m.id !== id));
    } catch (err) {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Manajemen Tim</h1>
          <p className="text-gray-500 text-sm font-medium">Kelola anggota tim yang tampil di halaman Tentang Kami.</p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setNewMember({ name: '', role: '', image_url: '' });
            setIsModalOpen(true);
          }}
          className="px-6 h-14 bg-black text-white rounded-2xl flex items-center gap-3 font-bold hover:bg-accent hover:text-black transition-all shadow-xl shadow-black/10 group"
        >
          Tambah Anggota <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama anggota..."
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white border border-gray-100 outline-none focus:border-accent transition-all text-sm font-medium shadow-sm"
          />
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Data Tim...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Anggota</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Jabatan</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300">
                          <Users size={32} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Belum ada anggota tim.</p>
                      </div>
                    </td>
                  </tr>
                ) : members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                          {member.image_url ? (
                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Users size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-black mb-1 group-hover:text-accent transition-colors">{member.name}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">TEAM MEMBER</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">{member.role}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-xl transition-all shadow-none hover:shadow-lg"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
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

      {/* Modal Member */}
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
              className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-10 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <h2 className="text-2xl font-display font-bold text-black tracking-tight">
                  {editingMember ? 'Edit Anggota' : 'Tambah Anggota Baru'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-accent transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-10 overflow-y-auto space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Nama Lengkap</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      placeholder="Misal: John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Jabatan / Role</label>
                    <input
                      type="text"
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      placeholder="Misal: CEO / Developer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Foto Anggota</label>
                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-accent transition-all group relative">
                    {newMember.image_url ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={newMember.image_url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center text-gray-300 border border-gray-100">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-black mb-1">
                        {uploading ? 'Mengunggah...' : 'Klik untuk Pilih Foto'}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">PNG, JPG, WEBP max 2MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) setNewMember({ ...newMember, image_url: url });
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={uploading}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-4 flex-shrink-0">
                <button onClick={() => setIsModalOpen(false)} className="px-8 h-14 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black">Batal</button>
                <Button
                  variant="black"
                  className="rounded-2xl px-10 h-14"
                  onClick={handleSaveMember}
                  disabled={saving || uploading}
                >
                  {saving ? <Loader2 className="animate-spin" /> : editingMember ? 'Update Data' : 'Simpan Anggota'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
