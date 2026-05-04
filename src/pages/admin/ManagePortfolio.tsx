import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Edit3,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';

export default function ManagePortfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(['Web App', 'Mobile App', 'Platform', 'UI/UX Design']);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    client_name: '',
    project_type: 'Web App',
    image_url: '',
    project_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPortfolio();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('project_types')
        .eq('id', 1)
        .single();
      if (data?.project_types) {
        setCategories(data.project_types);
        if (!editingProject) setNewProject(prev => ({ ...prev, project_type: data.project_types[0] }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

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

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    if (!newProject.image_url) {
      alert('Silahkan upload gambar terlebih dahulu');
      return;
    }
    setSaving(true);
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('portfolio')
          .update(newProject)
          .eq('id', editingProject.id);
        if (error) throw error;
        setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...newProject } : p));
      } else {
        const { data, error } = await supabase
          .from('portfolio')
          .insert([newProject])
          .select();
        if (error) throw error;
        setProjects([data[0], ...projects]);
      }

      setIsModalOpen(false);
      setEditingProject(null);
      setNewProject({ title: '', client_name: '', project_type: categories[0] || 'Web App', image_url: '', project_url: '' });
    } catch (err) {
      alert('Gagal simpan project');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      client_name: project.client_name,
      project_type: project.project_type,
      image_url: project.image_url,
      project_url: project.project_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus project ini?')) return;
    try {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Portal Proyek</h1>
          <p className="text-gray-500 text-sm font-medium">Kelola portofolio dan showcase sistem Kaloweb.</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setNewProject({ title: '', client_name: '', project_type: categories[0] || 'Web App', image_url: '', project_url: '' });
            setIsModalOpen(true);
          }}
          className="px-6 h-14 bg-black text-white rounded-2xl flex items-center gap-3 font-bold hover:bg-accent hover:text-black transition-all shadow-xl shadow-black/10 group"
        >
          Project Baru <Plus size={20} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari proyek atau klien..."
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white border border-gray-100 outline-none focus:border-accent transition-all text-sm font-medium shadow-sm"
          />
        </div>
        <button className="h-14 px-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-black transition-all">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Projects Table/Grid */}
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sincronizing Portfolio...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Project</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Tipe</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Client</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {projects.length === 0 ? (
                  <tr><td colSpan={5} className="p-20 text-center text-gray-400 text-sm font-medium">Portofolio masih kosong.</td></tr>
                ) : projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-black mb-1 group-hover:text-accent transition-colors">{project.title}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">PROJECT</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-500">{project.project_type}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-gray-900">{project.client_name}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${project.status === 'Live' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'Live' ? 'bg-green-500' : 'bg-orange-500'}`} />
                        {project.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-xl transition-all shadow-none hover:shadow-lg"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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

      {/* Modal Project */}
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
              <div className="p-10 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <h2 className="text-2xl font-display font-bold text-black tracking-tight">
                  {editingProject ? 'Edit Proyek' : 'Draft Project Baru'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-accent transition-all">
                  <Plus className="rotate-45" size={20} />
                </button>
              </div>

              <div className="p-10 overflow-y-auto space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Nama Proyek</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      placeholder="Misal: Shoda Apps"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Client</label>
                    <input
                      type="text"
                      value={newProject.client_name}
                      onChange={(e) => setNewProject({ ...newProject, client_name: e.target.value })}
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      placeholder="Nama Perusahaan"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Tipe Project</label>
                    <select
                      value={newProject.project_type}
                      onChange={(e) => setNewProject({ ...newProject, project_type: e.target.value })}
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all appearance-none"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Link Portofolio (URL)</label>
                    <input
                      type="url"
                      value={newProject.project_url}
                      onChange={(e) => setNewProject({ ...newProject, project_url: e.target.value })}
                      className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all"
                      placeholder="https://client-web.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Thumbnail Image</label>
                  <div className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-accent transition-all group relative">
                    {newProject.image_url ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                        <img src={newProject.image_url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center text-gray-300 border border-gray-100">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-black mb-1">
                        {uploading ? 'Mengunggah...' : 'Klik untuk Pilih Gambar'}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">PNG, JPG, WEBP max 2MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await uploadImage(file);
                            if (url) setNewProject({ ...newProject, image_url: url });
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
                  onClick={handleSaveProject}
                  disabled={saving || uploading}
                >
                  {saving ? <Loader2 className="animate-spin" /> : editingProject ? 'Update Proyek' : 'Simpan Project'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

