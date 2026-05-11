import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Layout, 
  User, 
  CreditCard, 
  Smartphone, 
  Trash2, 
  Eye,
  ShieldCheck,
  Globe,
  Info,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';

export default function CheckoutPage() {
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(['Semua']);
  const [pricingPlans, setPricingPlans] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    templateId: '',
    templateName: '',
    name: '',
    email: '',
    phone: '',
    domain: '',
    package: selectedPlan ? selectedPlan.name : '',
    price: selectedPlan ? selectedPlan.price : '0'
  });

  useEffect(() => {
    fetchPortfolios();
    fetchCategories();
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('status', 'Active')
        .order('price', { ascending: true });
      if (error) throw error;
      setPricingPlans(data || []);
      
      // If no plan selected from previous page, select the first one
      if (!selectedPlan && data && data.length > 0) {
        setFormData(prev => ({ 
          ...prev, 
          package: data[0].name, 
          price: data[0].price 
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await supabase
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

  const fetchPortfolios = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPortfolios(data || []);
      if (data && data.length > 0) {
        setFormData(prev => ({ 
          ...prev, 
          templateId: data[0].id,
          templateName: data[0].title 
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const steps = [
    { num: 1, name: 'Pilih Template', icon: Layout },
    { num: 2, name: 'Data Diri', icon: User },
    { num: 3, name: 'Konfigurasi', icon: Globe },
    { num: 4, name: 'Pembayaran', icon: CreditCard },
  ];

  const handleFinishPayment = async () => {
    setLoading(true);
    const orderNumber = `WE${Math.floor(Date.now() / 1000)}${Math.floor(Math.random() * 100)}`;
    
    try {
      const amount = parseInt(formData.price.toString().replace(/[,.]/g, ''));
      const { error } = await supabase
        .from('orders')
        .insert([
          {
            order_number: orderNumber,
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            domain_name: formData.domain + '.dev',
            package_type: formData.package,
            total_amount: amount,
            status: 'Pending'
          }
        ]);

      if (error) throw error;

      // Panggil DOKU Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('doku-checkout', {
        body: {
          order_number: orderNumber,
          amount: amount,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone
        }
      });

      if (functionError) throw functionError;
      if (data?.error) throw new Error(data.error);

      // Redirect ke halaman pembayaran DOKU
      if (data?.response?.payment?.url) {
        window.location.href = data.response.payment.url;
      } else {
        // Fallback jika tidak ada URL
        alert(`Pesanan Berhasil! Nomor Order: ${orderNumber}. Silahkan selesaikan pembayaran.`);
      }
      
    } catch (err: any) {
      console.error('Error memproses pembayaran:', err);
      alert('Gagal memproses pesanan: ' + (err.message || 'Terjadi kesalahan sistem.'));
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-10 sm:pb-20">
      <div className="container-custom max-w-[1600px]">
        {/* Progress Stepper */}
        <div className="mb-6 sm:mb-12 relative">
          <div className="flex justify-between items-center relative z-10">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1.5 sm:gap-3">
                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                  step >= s.num ? 'bg-black text-accent border-black' : 'bg-white text-gray-300 border-gray-100'
                }`}>
                  <s.icon size={14} className="sm:hidden" />
                  <s.icon size={20} className="hidden sm:block" />
                </div>
                <p className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest hidden xs:block ${
                  step === s.num ? 'text-black' : 'text-gray-400'
                }`}>{s.name}</p>
              </div>
            ))}
          </div>
          {/* Progress Line */}
          <div className="absolute top-4 sm:top-6 left-0 w-full h-[2px] bg-gray-100 -z-0">
             <motion.div 
               className="h-full bg-black"
               initial={{ width: '0%' }}
               animate={{ width: `${((step - 1) / 3) * 100}%` }}
               transition={{ duration: 0.5 }}
             />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepTemplate 
                key="step1" 
                data={formData} 
                portfolios={portfolios}
                categories={categories}
                onSelect={(item: any) => setFormData({...formData, templateId: item.id, templateName: item.title})} 
                onNext={nextStep} 
              />
            )}
            {step === 2 && <StepDataDiri key="step2" data={formData} update={(val: any) => setFormData({...formData, ...val})} onNext={nextStep} onPrev={prevStep} />}
            {step === 3 && (
              <StepDomain 
                key="step3" 
                data={formData} 
                pricingPlans={pricingPlans}
                update={(val: any) => setFormData({...formData, ...val})} 
                onNext={nextStep} 
                onPrev={prevStep} 
              />
            )}
            {step === 4 && <StepPayment key="step4" formData={formData} onPrev={prevStep} loading={loading} onFinish={handleFinishPayment} />}
          </AnimatePresence>
        </div>

        <p className="mt-4 sm:mt-8 text-center text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
           Transaksi Aman · SSL Encrypted · PT Berkat Digital Sentosa
        </p>
      </div>
    </div>
  );
}

function StepTemplate({ data, portfolios, categories, onSelect, onNext }: any) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredPortfolios = activeCategory === 'Semua' 
    ? portfolios 
    : portfolios.filter((p: any) => p.project_type === activeCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 sm:p-10 md:p-14"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-6 sm:mb-12">
        <div className="text-center md:text-left">
          <Tag className="mb-2 sm:mb-4 lowercase text-[9px] sm:text-[10px]">Langkah 01</Tag>
          <h2 className="text-xl sm:text-3xl font-display font-bold text-black tracking-tight mb-1 sm:mb-2">Pilih Template Website</h2>
          <p className="text-gray-500 text-xs sm:text-sm font-medium">Pilih desain dari portofolio kami yang ingin Anda jadikan acuan.</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-black text-white shadow-lg' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 max-h-[420px] sm:max-h-[650px] overflow-y-auto p-1 sm:p-2 pr-2 sm:pr-4 custom-scrollbar">
         {filteredPortfolios.length === 0 ? (
           <div className="col-span-full py-10 sm:py-20 text-center text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
              Tidak ada template di kategori ini.
           </div>
         ) : filteredPortfolios.map((item: any) => {
           const isActive = data.templateId === item.id;
           return (
             <div 
               key={item.id}
               onClick={() => onSelect(item)}
               className={`relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border-2 transition-all cursor-pointer group ${
                 isActive ? 'border-accent shadow-2xl scale-[0.98]' : 'border-gray-100 hover:border-gray-200'
               }`}
             >
                <div className="aspect-[4/3] relative">
                   <img 
                     src={item.image_url} 
                     alt={item.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <div className={`w-8 h-8 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${isActive ? 'bg-accent text-black' : 'bg-white/20 backdrop-blur-md text-white'}`}>
                         <CheckCircle2 size={16} className="sm:hidden" />
                         <CheckCircle2 size={24} className="hidden sm:block" />
                      </div>
                   </div>
                </div>
                <div className="p-3 sm:p-8 bg-white">
                   <p className="text-[7px] sm:text-[8px] font-bold text-accent uppercase tracking-[0.2em] mb-1">{item.project_type}</p>
                   <h3 className="text-xs sm:text-sm font-bold text-black truncate leading-tight">{item.title}</h3>
                </div>
             </div>
           );
         })}
      </div>

      <div className="mt-6 sm:mt-12 pt-5 sm:pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
               <Layout size={16} className="sm:hidden" />
               <Layout size={20} className="hidden sm:block" />
            </div>
            <div>
               <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Template Terpilih</p>
               <h4 className="text-xs sm:text-sm font-bold text-black">{data.templateName || 'Belum memilih template'}</h4>
            </div>
         </div>
         <Button 
           variant="black" 
           onClick={onNext} 
           className="rounded-xl sm:rounded-2xl px-6 sm:px-12 h-11 sm:h-16 group w-full sm:w-auto text-xs sm:text-sm"
           disabled={!data.templateId}
         >
            Langkah Selanjutnya <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </div>
    </motion.div>
  );
}

function StepDataDiri({ data, update, onNext, onPrev }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 sm:p-10 md:p-14"
    >
      <div className="mb-6 sm:mb-10 text-center md:text-left">
        <Tag className="mb-2 sm:mb-4 lowercase">Langkah 02</Tag>
        <h2 className="text-xl sm:text-3xl font-display font-bold text-black tracking-tight mb-1 sm:mb-2">Data Diri</h2>
        <p className="text-gray-500 text-xs sm:text-sm font-medium">Lengkapi data diri kamu sebagai syarat registrasi dan layanan.</p>
      </div>

      <div className="space-y-5 sm:space-y-8">
        <div className="space-y-1.5 sm:space-y-2">
           <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-3 sm:ml-4">Nama Lengkap</label>
           <div className="relative group">
              <User size={16} className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                value={data.name}
                onChange={(e) => update({ name: e.target.value })}
                className="w-full h-12 sm:h-16 pl-10 sm:pl-14 pr-4 sm:pr-6 rounded-2xl sm:rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 hover:border-gray-200 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none font-medium text-xs sm:text-sm transition-all" 
                placeholder="Tulis nama lengkap sesuai identitas" 
              />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
           <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-3 sm:ml-4">Email</label>
              <div className="relative group">
                 <input 
                   type="email" 
                   value={data.email}
                   onChange={(e) => update({ email: e.target.value })}
                   className="w-full h-12 sm:h-16 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 hover:border-gray-200 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none font-medium text-xs sm:text-sm transition-all" 
                   placeholder="email@anda.com" 
                 />
              </div>
           </div>
           <div className="space-y-1.5 sm:space-y-2">
              <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-3 sm:ml-4">No. Handphone</label>
              <div className="flex gap-2 sm:gap-3 group">
                 <div className="w-18 sm:w-24 h-12 sm:h-16 rounded-2xl sm:rounded-3xl bg-gray-50/50 border border-gray-100 flex items-center justify-center text-[10px] sm:text-xs font-bold gap-1 sm:gap-2 transition-all px-2 sm:px-3">
                    <span>🇮🇩</span> +62
                 </div>
                 <input 
                  type="tel" 
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  className="flex-grow h-12 sm:h-16 px-4 sm:px-6 rounded-2xl sm:rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 hover:border-gray-200 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none font-medium text-xs sm:text-sm transition-all" 
                  placeholder="81234567XX" 
                 />
              </div>
           </div>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gray-50 border border-gray-100 flex gap-3 sm:gap-4 items-start hover:border-accent transition-colors">
           <Info size={18} className="text-accent flex-shrink-0 mt-0.5 sm:mt-0 sm:size-6" />
           <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed font-medium">
              <span className="font-bold text-black uppercase tracking-widest block mb-1 sm:mb-2 text-[9px] sm:text-[10px]">Keamanan Data Terjamin</span>
              Data pribadi kamu dienkripsi dan hanya digunakan untuk keperluan aktivasi layanan dan komunikasi resmi. Kami tidak membagikan data kepada pihak ketiga.
           </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-12 flex justify-between">
         <button onClick={onPrev} className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">
            <ArrowLeft size={14} /> Sebelumnya
         </button>
         <Button 
           variant="black" onClick={onNext} className="rounded-xl sm:rounded-2xl px-6 sm:px-10 h-11 sm:h-14 group text-xs sm:text-sm"
         >
            Selanjutnya <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
         </Button>
      </div>
    </motion.div>
  );
}

function StepDomain({ data, pricingPlans, update, onNext, onPrev }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 sm:p-10 md:p-14"
    >
      <div className="mb-6 sm:mb-10 text-center md:text-left">
        <Tag className="mb-2 sm:mb-4 lowercase">Langkah 03</Tag>
        <h2 className="text-xl sm:text-3xl font-display font-bold text-black tracking-tight mb-1 sm:mb-2">Konfigurasi</h2>
        <p className="text-gray-500 text-xs sm:text-sm font-medium">Tentukan nama domain dan pilih paket layanan untuk website kamu.</p>
      </div>

      <div className="space-y-6 sm:space-y-10">
         <div className="relative group">
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm sm:text-xl group-focus-within:text-black transition-colors">https://</div>
            <input 
              type="text" 
              value={data.domain}
              onChange={(e) => update({ domain: e.target.value })}
              className="w-full h-14 sm:h-24 pl-20 sm:pl-32 pr-14 sm:pr-28 rounded-[1.5rem] sm:rounded-[2.5rem] bg-gray-50/50 border border-gray-100 hover:border-gray-200 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 outline-none font-display font-medium text-base sm:text-2xl transition-all" 
              placeholder="nama-bisnis-mu" 
            />
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm sm:text-xl group-focus-within:text-black transition-colors">.dev</div>
         </div>

         <div className="space-y-3 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4">
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
               <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400">Pilih Paket Berlangganan</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
               {pricingPlans.map((plan: any) => {
                 const isActive = data.package === plan.name;
                 return (
                   <div 
                     key={plan.id}
                     onClick={() => update({ package: plan.name, price: plan.price })}
                     className={`p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                       isActive 
                        ? 'bg-black border-black shadow-2xl scale-100 transform -translate-y-1 sm:-translate-y-2' 
                        : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 scale-[0.98]'
                     }`}
                   >
                      <div className="flex justify-between items-start mb-5 sm:mb-10">
                         <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-colors ${isActive ? 'bg-white/10 text-accent' : 'bg-gray-50 text-gray-400'}`}>
                            <CreditCard size={18} className="sm:hidden" />
                            <CreditCard size={24} className="hidden sm:block" />
                         </div>
                         {isActive && (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-accent">
                             <CheckCircle2 size={18} className="sm:hidden" />
                             <CheckCircle2 size={24} className="hidden sm:block" />
                           </motion.div>
                         )}
                      </div>
                      <div>
                         <p className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1 sm:mb-2 ${isActive ? 'text-white/40' : 'text-gray-400'}`}>
                            {plan.name}
                         </p>
                         <p className={`text-lg sm:text-2xl font-display font-bold mb-0.5 sm:mb-1 ${isActive ? 'text-white' : 'text-black'}`}>
                            Rp {plan.price}
                         </p>
                         <p className={`text-[10px] sm:text-xs font-medium ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                            per tahun
                         </p>
                      </div>
                   </div>
                 );
               })}
            </div>
         </div>
      </div>

      <div className="mt-6 sm:mt-12 flex justify-between">
         <button onClick={onPrev} className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black">
            <ArrowLeft size={14} /> Sebelumnya
         </button>
         <Button 
           variant="black" 
           onClick={onNext} 
           className="rounded-xl sm:rounded-2xl px-6 sm:px-10 h-11 sm:h-14 group text-xs sm:text-sm"
           disabled={!data.domain || !data.package}
         >
            Konfirmasi Paket <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
         </Button>
      </div>
    </motion.div>
  );
}

function StepPayment({ formData, onPrev, loading, onFinish }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 sm:p-10 md:p-14"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-12 lg:gap-16">
         <div className="lg:col-span-3">
            <div className="mb-6 sm:mb-10">
              <Tag className="mb-2 sm:mb-4 lowercase">Langkah 04</Tag>
              <h2 className="text-xl sm:text-3xl font-display font-bold text-black tracking-tight mb-1 sm:mb-2">Ringkasan Pesanan</h2>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Periksa kembali detail pesanan Anda sebelum melakukan pembayaran.</p>
            </div>

            <div className="space-y-5 sm:space-y-8 bg-gray-50/50 p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-5 sm:pb-8 border-b border-gray-200 border-dashed">
                  <div>
                     <p className="text-xs sm:text-sm font-bold text-black mb-1">{formData.package} Package</p>
                     <p className="text-xs sm:text-sm text-gray-500 font-mono italic mb-2 sm:mb-4">{formData.domain || 'bisnis-anda'}.dev</p>
                     <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-black font-bold uppercase tracking-widest bg-white border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit shadow-sm">
                        <Layout size={12} /> {formData.templateName || 'Custom Template'}
                     </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Harga</p>
                    <p className="text-base sm:text-xl font-bold text-black">Rp {formData.price}</p>
                  </div>
               </div>

               <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                  <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-500">
                     <span>Subtotal</span>
                     <span>Rp {formData.price}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-500">
                     <span>Pajak (0%)</span>
                     <span>Rp 0</span>
                  </div>
                  <div className="flex justify-between items-center text-base sm:text-xl font-display font-bold text-black pt-4 sm:pt-6 mt-1 sm:mt-2 border-t border-gray-200 border-dashed">
                     <span>Jumlah Total</span>
                     <span className="text-lg sm:text-2xl bg-accent px-3 sm:px-4 py-0.5 sm:py-1 rounded-lg sm:rounded-xl">Rp {formData.price}</span>
                  </div>
               </div>
            </div>

            <div className="mt-4 sm:mt-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-gray-100 flex items-center gap-3 sm:gap-4">
               <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Smartphone size={16} className="sm:hidden" />
                  <Smartphone size={20} className="hidden sm:block" />
               </div>
               <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-black mb-0.5 sm:mb-1">Pembayaran Digital Instan</h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Pesanan akan otomatis diproses setelah konfirmasi pembayaran berhasil.</p>
               </div>
            </div>
         </div>

         <div className="lg:col-span-2 space-y-3 sm:space-y-6">
            <div className="p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-black text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
               
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6 sm:mb-12">
                     <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10">
                        <CreditCard size={20} className="text-accent sm:hidden" />
                        <CreditCard size={28} className="text-accent hidden sm:block" />
                     </div>
                     <ShieldCheck size={20} className="text-white/30 sm:hidden" />
                     <ShieldCheck size={28} className="text-white/30 hidden sm:block" />
                  </div>
                  
                  <div className="mb-6 sm:mb-10">
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5 sm:mb-3">Total Tagihan</p>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">Rp {formData.price}</h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                     <button 
                      onClick={onFinish}
                      disabled={loading}
                      className="w-full h-12 sm:h-16 bg-accent text-black rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 sm:gap-3 text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_40px_rgba(214,253,112,0.3)]"
                     >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <>Bayar Sekarang <ArrowRight size={18} /></>
                        )}
                     </button>
                     <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                        <ShieldCheck size={12} className="text-white/30" />
                        <p className="text-[8px] sm:text-[9px] text-center text-white/40 uppercase tracking-widest font-medium">Pembayaran Aman & Terenkripsi</p>
                     </div>
                  </div>
               </div>
            </div>

            <button onClick={onPrev} className="w-full h-11 sm:h-14 rounded-xl sm:rounded-2xl border border-gray-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:border-black transition-all flex items-center justify-center gap-2">
               <ArrowLeft size={14} /> Ubah Detail Pesanan
            </button>
         </div>
      </div>
    </motion.div>
  );
}
