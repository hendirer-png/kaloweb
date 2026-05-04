import { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Settings2, 
  ShieldCheck, 
  Bell, 
  Globe,
  Camera,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Save,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Profile State
  const [profile, setProfile] = useState({
    full_name: '',
    email: ''
  });

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState({
    site_name: '',
    support_email: '',
    whatsapp_number: '',
    address: '',
    project_types: [] as string[]
  });
  const [newType, setNewType] = useState('');

  // Password State
  const [passwords, setPasswords] = useState({
    new_password: '',
    confirm_password: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setProfile(prev => ({ ...prev, email: user.email || '' }));
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profileData) setProfile(prev => ({ ...prev, full_name: profileData.full_name || '' }));
      }

      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();
      if (settingsData) {
        setSiteSettings({
          ...settingsData,
          project_types: settingsData.project_types || ['Web App', 'Mobile App', 'Platform', 'UI/UX Design']
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addProjectType = () => {
    if (newType && !siteSettings.project_types.includes(newType)) {
      setSiteSettings({
        ...siteSettings,
        project_types: [...siteSettings.project_types, newType]
      });
      setNewType('');
    }
  };

  const removeProjectType = (type: string) => {
    setSiteSettings({
      ...siteSettings,
      project_types: siteSettings.project_types.filter(t => t !== type)
    });
  };

  const handleUpdateProfile = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ full_name: profile.full_name })
        .eq('id', user.id);

      if (error) throw error;
      alert('Profil diperbarui!');
    } catch (err) {
      alert('Gagal update profil');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSettings = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .update(siteSettings)
        .eq('id', 1);

      if (error) throw error;
      alert('Pengaturan website disimpan!');
    } catch (err) {
      alert('Gagal simpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
      alert('Konfirmasi password tidak cocok');
      return;
    }
    if (passwords.new_password.length < 6) {
      alert('Password minimal 6 karakter');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new_password
      });
      if (error) throw error;
      alert('Password berhasil diganti!');
      setPasswords({ new_password: '', confirm_password: '' });
    } catch (err) {
      alert('Gagal ganti password');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Akun Admin', icon: User },
    { id: 'website', name: 'Website', icon: Globe },
    { id: 'security', name: 'Keamanan', icon: Lock },
  ];

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Pengaturan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Pengaturan</h1>
        <p className="text-gray-500 text-sm font-medium">Kelola identitas dan preferensi sistem Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-4 shadow-sm space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  activeTab === tab.id 
                  ? 'bg-accent text-black font-bold' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                <span className="text-sm tracking-tight">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm p-10 md:p-14"
          >
            {activeTab === 'profile' && (
              <div className="space-y-12">
                 <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="relative">
                       <div className="w-32 h-32 rounded-[2.5rem] bg-gray-100 border-2 border-accent overflow-hidden relative group">
                          <img src={`https://ui-avatars.com/api/?name=${profile.full_name}&background=F7FF58&color=000`} alt="Profile" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer">
                             <Camera size={24} />
                          </div>
                       </div>
                       <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center text-white">
                          <CheckCircle2 size={14} />
                       </div>
                    </div>
                    <div>
                       <h3 className="text-xl font-display font-bold text-black mb-1">{profile.full_name || 'Admin'}</h3>
                       <p className="text-xs text-gray-500 mb-4">Level Akses: Administrator Tertinggi</p>
                       <div className="flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[9px] font-bold uppercase tracking-widest text-gray-400">Status Aktif</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Nama Lengkap</label>
                       <input 
                        type="text" 
                        value={profile.full_name}
                        onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Work Email</label>
                       <input 
                        type="email" 
                        value={profile.email}
                        disabled
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent outline-none font-medium text-sm transition-all opacity-50 cursor-not-allowed" 
                       />
                    </div>
                 </div>

                 <div className="flex justify-end pt-8 border-t border-gray-50">
                    <Button 
                      variant="black" 
                      className="rounded-2xl px-10 h-14"
                      onClick={handleUpdateProfile}
                      disabled={saving}
                    >
                      {saving ? <Loader2 className="animate-spin" /> : 'Simpan Perubahan'}
                    </Button>
                 </div>
              </div>
            )}

            {activeTab === 'website' && (
              <div className="space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Nama Website</label>
                       <input 
                        type="text" 
                        value={siteSettings.site_name}
                        onChange={(e) => setSiteSettings({...siteSettings, site_name: e.target.value})}
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Support</label>
                       <input 
                        type="email" 
                        value={siteSettings.support_email}
                        onChange={(e) => setSiteSettings({...siteSettings, support_email: e.target.value})}
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">WhatsApp Bisnis</label>
                       <input 
                        type="text" 
                        value={siteSettings.whatsapp_number}
                        onChange={(e) => setSiteSettings({...siteSettings, whatsapp_number: e.target.value})}
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm" 
                        placeholder="Contoh: 628123456789"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Alamat Kantor</label>
                       <input 
                        type="text" 
                        value={siteSettings.address}
                        onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                        className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm" 
                       />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Kategori Project Portfolio</label>
                    <div className="flex flex-wrap gap-2 mb-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 min-h-[100px]">
                       {siteSettings.project_types.map((type) => (
                         <div key={type} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 text-xs font-bold text-black shadow-sm group">
                            {type}
                            <button onClick={() => removeProjectType(type)} className="text-gray-300 hover:text-red-500 transition-colors">
                               <Plus size={14} className="rotate-45" />
                            </button>
                         </div>
                       ))}
                       {siteSettings.project_types.length === 0 && <p className="text-xs text-gray-400 italic">Belum ada kategori.</p>}
                    </div>
                    <div className="flex gap-2">
                       <input 
                        type="text" 
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        placeholder="Tambah kategori baru..."
                        className="flex-grow h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm"
                       />
                       <button 
                        onClick={addProjectType}
                        className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-accent hover:text-black transition-all"
                       >
                          <Plus size={20} />
                       </button>
                    </div>
                 </div>

                 <div className="flex justify-end pt-8 border-t border-gray-50">
                    <Button 
                      variant="black" 
                      className="rounded-2xl px-10 h-14"
                      onClick={handleUpdateSettings}
                      disabled={saving}
                    >
                      {saving ? <Loader2 className="animate-spin" /> : 'Simpan Pengaturan'}
                    </Button>
                 </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-12">
                 <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Password Baru</label>
                          <input 
                            type="password" 
                            value={passwords.new_password}
                            onChange={(e) => setPasswords({...passwords, new_password: e.target.value})}
                            placeholder="Minimal 6 karakter" 
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all" 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Konfirmasi Password Baru</label>
                          <input 
                            type="password" 
                            value={passwords.confirm_password}
                            onChange={(e) => setPasswords({...passwords, confirm_password: e.target.value})}
                            placeholder="Ulangi password baru" 
                            className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:border-accent outline-none font-medium text-sm transition-all" 
                          />
                       </div>
                    </div>
                 </div>

                 <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                       <ShieldCheck className="text-accent" size={24} />
                       <h4 className="text-sm font-bold text-black uppercase tracking-tight">Keamanan Akun</h4>
                    </div>
                    <p className="text-xs text-gray-500 mb-6 leading-relaxed">Password digunakan untuk login ke panel admin ini. Jangan bagikan password Anda kepada siapapun.</p>
                 </div>

                 <div className="flex justify-end pt-8 border-t border-gray-50">
                    <Button 
                      variant="black" 
                      className="rounded-2xl px-10 h-14"
                      onClick={handleUpdatePassword}
                      disabled={saving}
                    >
                      {saving ? <Loader2 className="animate-spin" /> : 'Update Password'}
                    </Button>
                 </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
