import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  DollarSign,
  Loader2,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';

export default function ManagePricing() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    price: '',
    features: [] as string[],
    status: 'Active'
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('price', { ascending: true });
      
      if (error) {
        console.error('Supabase Error:', error);
        alert('Gagal mengambil data: ' + error.message);
        throw error;
      }
      setPlans(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!newPlan.name || !newPlan.price) {
      alert('Nama dan Harga wajib diisi');
      return;
    }
    setSaving(true);
    try {
      if (editingPlan) {
        const { error } = await supabase
          .from('pricing_plans')
          .update(newPlan)
          .eq('id', editingPlan.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('pricing_plans')
          .insert([newPlan]);
        if (error) throw error;
      }
      
      setIsModalOpen(false);
      setEditingPlan(null);
      setNewPlan({ name: '', description: '', price: '', features: [], status: 'Active' });
      fetchPlans();
      alert('Paket harga disimpan!');
    } catch (err) {
      alert('Gagal simpan paket');
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (featureInput && !newPlan.features.includes(featureInput)) {
      setNewPlan({ ...newPlan, features: [...newPlan.features, featureInput] });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
    setNewPlan({ ...newPlan, features: updatedFeatures });
  };

  const handleEdit = (plan: any) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name,
      description: plan.description || '',
      price: plan.price,
      features: plan.features || [],
      status: plan.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus paket harga ini?')) return;
    try {
      const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
      if (error) throw error;
      setPlans(plans.filter(p => p.id !== id));
    } catch (err) {
      alert('Gagal hapus');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Manajemen Harga</h1>
          <p className="text-gray-500 text-sm font-medium">Kelola paket layanan dan harga untuk klien Anda.</p>
        </div>
        <button 
          onClick={() => {
            setEditingPlan(null);
            setNewPlan({ name: '', description: '', price: '', features: [], status: 'Active' });
            setIsModalOpen(true);
          }}
          className="px-6 h-14 bg-black text-white rounded-2xl flex items-center gap-3 font-bold hover:bg-accent hover:text-black transition-all shadow-xl shadow-black/10"
        >
          Paket Baru <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-accent" size={40} /></div>
        ) : plans.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-dashed border-gray-200">
             <DollarSign size={40} className="mx-auto text-gray-200 mb-4" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Belum ada paket harga yang dibuat.</p>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="mt-4 text-xs font-bold text-black hover:text-accent transition-colors"
             >
               + Buat Paket Pertama
             </button>
          </div>
        ) : plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm flex flex-col hover:border-accent transition-all group">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-black">
                   <DollarSign size={24} />
                </div>
                <div className="flex gap-2">
                   <button onClick={() => handleEdit(plan)} className="p-2 text-gray-400 hover:text-black transition-colors"><Edit3 size={18} /></button>
                   <button onClick={() => handleDelete(plan.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
             </div>
             
             <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
             <p className="text-xs text-gray-500 mb-6 flex-grow">{plan.description}</p>
             
             <div className="mb-8">
                <span className="text-3xl font-display font-bold text-black">Rp {plan.price}</span>
                <span className="text-xs text-gray-400 font-bold ml-2">/ Bulan</span>
             </div>
             
             <div className="space-y-3 mb-8">
                {plan.features?.map((f: string, i: number) => (
                   <div key={i} className="flex items-start gap-3 text-xs font-medium text-gray-600">
                      <CheckCircle2 size={14} className="text-accent mt-0.5" />
                      {f}
                   </div>
                ))}
             </div>
             
             <div className={`mt-auto py-3 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-center ${
                plan.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
             }`}>
                {plan.status}
             </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-black">{editingPlan ? 'Edit Paket' : 'Buat Paket Baru'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black"><Plus className="rotate-45" size={20} /></button>
              </div>
              
              <div className="p-10 overflow-y-auto space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Nama Paket</label>
                       <input type="text" value={newPlan.name} onChange={(e) => setNewPlan({...newPlan, name: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none font-medium text-sm" placeholder="Contoh: Growth Plan" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Harga (Rp)</label>
                       <input type="text" value={newPlan.price} onChange={(e) => setNewPlan({...newPlan, price: e.target.value})} className="w-full h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none font-medium text-sm" placeholder="Contoh: 2.500.000" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Deskripsi Singkat</label>
                    <textarea value={newPlan.description} onChange={(e) => setNewPlan({...newPlan, description: e.target.value})} className="w-full h-32 p-6 rounded-2xl bg-gray-50 border-none outline-none font-medium text-sm resize-none" placeholder="Jelaskan target market paket ini..." />
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Fitur & Keunggulan</label>
                    <div className="flex gap-2">
                       <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addFeature()} className="flex-grow h-14 px-6 rounded-2xl bg-gray-50 border-none outline-none font-medium text-sm" placeholder="Tambah fitur..." />
                       <button onClick={addFeature} className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-accent hover:text-black transition-all"><Plus size={20} /></button>
                    </div>
                    <div className="space-y-2">
                       {newPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                             <div className="flex items-center gap-3 text-xs font-bold text-black">
                                <CheckCircle2 size={16} className="text-accent" /> {feature}
                             </div>
                             <button onClick={() => removeFeature(index)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-10 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
                 <button onClick={() => setIsModalOpen(false)} className="px-8 h-14 text-xs font-bold uppercase tracking-widest text-gray-400">Batal</button>
                 <Button variant="black" className="rounded-2xl px-10 h-14" onClick={handleSavePlan} disabled={saving}>{saving ? <Loader2 className="animate-spin" /> : 'Simpan Paket'}</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
