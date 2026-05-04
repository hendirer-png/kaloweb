import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Store,
  Smartphone,
  Instagram,
  MessageCircle,
  TrendingUp,
  Clock,
  Globe,
  Database,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  ChevronDown,
  Plus,
  Minus,
  Star,
  Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Tag from '../components/ui/Tag';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/utils/ScrollReveal';
import CTA from '../components/sections/CTA';
import { useContent } from '../lib/ContentContext';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Globe': return Globe;
    case 'TrendingUp': return TrendingUp;
    case 'CreditCard': return CreditCard;
    case 'Database': return Database;
    case 'MessageSquare': return MessageSquare;
    case 'ShoppingBag': return ShoppingBag;
    case 'Store': return Store;
    case 'Instagram': return Instagram;
    case 'Smartphone': return Smartphone;
    case 'MessageCircle': return MessageCircle;
    case 'Users': return Users;
    case 'Clock': return Clock;
    case 'ShieldCheck': return ShieldCheck;
    default: return CheckCircle2;
  }
};

export default function OnlineStorePage() {
  return (
    <div className="bg-white pt-20">
      <Hero />
      <Platforms />
      <Problems />
      <Solutions />
      <Portfolio />
      <Workflow />
      <PostLiveSupport />
      <Comparison />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_hero');

  const headingWords = sectionData?.headingWords || "Toko online yang menjual,".split(" ");
  const subHeadingWords = sectionData?.subHeadingWords || "bukan sekadar ada.".split(" ");
  const tag = sectionData?.tag || "Konsultasi gratis via WhatsApp";
  const description = sectionData?.description || "Kami bangun toko online profesional dengan domain sendiri, checkout lengkap, dan desain yang terasa seperti brand Anda. Tanpa komisi per transaksi, tanpa bersaing di rak yang sama dengan ribuan kompetitor.";
  const buttonText = sectionData?.buttonText || "Mulai Sekarang";

  const defaultStats = [
    { value: "4.9", label: "100+ Klien" },
    { value: "89%", label: "Naik Penjualan" },
    { value: "1 Bulan", label: "Brief ke Live" }
  ];
  const stats = sectionData?.stats || defaultStats;
  const company = sectionData?.company || "PT Berkat Digital Sentosa · Est. 2020";

  const previewTag = sectionData?.previewTag || "Featured Project";
  const previewTitle = sectionData?.previewTitle || "Delisa Hijab";
  const previewDesc = sectionData?.previewDesc || "Fashion Muslim · delisahijab.co.id";
  const previewImage = sectionData?.previewImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200";

  return (
    <section 
      ref={containerRef}
      className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-gray-50/50"
    >
      {/* Floating Decorative Blobs */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-accent/10 blur-[80px] rounded-full -z-10" 
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          x: [0, 15, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[5%] w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full -z-10" 
      />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ opacity: opacityContent }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tag className="mb-6 lowercase">{tag}</Tag>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.95] mb-8 text-black">
              <div className="overflow-hidden flex flex-wrap gap-x-[0.2em]">
                {headingWords.map((word: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden flex flex-wrap gap-x-[0.2em] text-black/30">
                {subHeadingWords.map((word: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block italic"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-500 text-sm md:text-lg max-w-xl font-medium leading-relaxed mb-10"
            >
              {description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button
                variant="black"
                className="rounded-full px-8 h-14 group"
                onClick={() => navigate('/checkout')}
              >
                {buttonText} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex flex-col justify-center px-4">
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-black/40">
                  <Clock size={12} /> Balas &lt; 2 jam kerja
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Tanpa komitmen
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-gray-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-black font-display font-bold text-xl tracking-tight">
                  {stats[0]?.value} <Star size={16} fill="currentColor" className="text-orange-400" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stats[0]?.label}</p>
              </div>
              <div className="space-y-1">
                <p className="text-black font-display font-bold text-xl tracking-tight">{stats[1]?.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stats[1]?.label}</p>
              </div>
              <div className="space-y-1">
                <p className="text-black font-display font-bold text-xl tracking-tight">{stats[2]?.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stats[2]?.label}</p>
              </div>
              <div className="space-y-1">
                <p className="text-black font-display font-bold text-xs tracking-tight leading-tight">{company}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: yBg }}
            className="relative"
          >
            <ScrollReveal direction="right" className="relative z-10">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-black group perspective-1000"
              >
                <motion.img
                  style={{ y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]) }}
                  src={previewImage}
                  alt={previewTitle}
                  className="w-[120%] h-[130%] -top-[15%] -left-[10%] absolute object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-8 bottom-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white">
                  <p className="text-[10px] uppercase font-bold tracking-widest mb-2 opacity-60">{previewTag}</p>
                  <h3 className="text-2xl font-display font-bold mb-1">{previewTitle}</h3>
                  <p className="text-xs opacity-80">{previewDesc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_platforms');

  const defaultPlatforms = [
    { name: 'Shopee', icon: 'ShoppingBag', status: 'Tetap jalan' },
    { name: 'Tokopedia', icon: 'Store', status: 'Tetap jalan' },
    { name: 'Instagram', icon: 'Instagram', status: 'Arahkan ke toko' },
    { name: 'TikTok Shop', icon: 'Smartphone', status: 'Arahkan ke toko' },
    { name: 'WhatsApp', icon: 'MessageCircle', status: 'Checkout langsung' },
  ];

  const platforms = sectionData?.platforms || defaultPlatforms;
  const tag = sectionData?.tag || "Website Siap Pakai";
  const title = sectionData?.title || "Untuk Anda yang sudah jualan di";
  const description = sectionData?.description || "Website sendiri bukan pengganti. Ini toko utama tempat brand Anda tinggal permanen.";

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black">
            {title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto font-medium">
            {description}
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {platforms.map((p: any, i: number) => {
            const Icon = getIcon(p.icon);
            return (
              <ScrollReveal key={i} delay={i * 0.15} direction="up" className="flex-1 min-w-[150px] max-w-[200px]">
                <motion.div 
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="p-6 h-full rounded-3xl bg-white/50 backdrop-blur-md border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-colors duration-500 shadow-sm border border-gray-100">
                    <Icon size={24} />
                  </div>
                  <p className="text-sm font-bold mb-1 tracking-tight">{p.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors">{p.status}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Problems() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_problems');

  const defaultProblems = [
    {
      num: '01',
      title: 'Marketplace makan margin Anda',
      desc: 'Komisi 5-12% per transaksi + biaya iklan internal yang makin mahal. Makin banyak jual, makin banyak dipotong.'
    },
    {
      num: '02',
      title: 'Pembeli lihat 100 toko yang mirip',
      desc: 'Di marketplace Anda bersaing harga dengan ribuan penjual lain di halaman yang sama. Brand Anda tenggelam.'
    },
    {
      num: '03',
      title: 'Data pembeli bukan milik Anda',
      desc: 'Nomor WhatsApp, email, preferensi, semua dikunci marketplace. Tidak bisa retarget, tidak bisa repeat order.'
    },
    {
      num: '04',
      title: 'Website gratisan terlihat murahan',
      desc: 'Wix atau WordPress gratis pakai subdomain asing, template identik dengan kompetitor, dan loading lambat.'
    }
  ];

  const problems = sectionData?.problems || defaultProblems;
  const tag = sectionData?.tag || "§ 02 · Masalah";
  const title = sectionData?.title || "Kenapa Toko Anda";
  const highlightText = sectionData?.highlightText || "Stuck";
  const description = sectionData?.description || "Sebagian besar UMKM yang datang ke kami mengalami 4 hal di bawah ini. Kalau Anda merasa familiar, berarti website toko online sendiri adalah langkah berikutnya.";
  const boxSubtitle = sectionData?.boxSubtitle || "Solusi yang Anda butuhkan →";
  const boxDesc = sectionData?.boxDesc || "Lihat bagaimana website sendiri mengubah keempat masalah ini di bawah.";
  const buttonText = sectionData?.buttonText || "Pelajari Solusi";

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <ScrollReveal>
              <Tag className="mb-6 lowercase">{tag}</Tag>
              <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-8 leading-[1.1] text-black">
                {title} <br />
                <span className="text-black/30 italic">{highlightText}</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 font-medium">
                {description}
              </p>

              <div className="p-8 rounded-[2rem] bg-white border border-gray-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">{boxSubtitle}</p>
                <p className="text-sm font-bold text-black mb-6">{boxDesc}</p>
                <Link to="#solutions">
                  <Button variant="black" className="rounded-full w-full h-12">{buttonText}</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            {problems.map((p: any, i: number) => (
              <ScrollReveal key={i} direction="right" delay={i * 0.1}>
                <div className="p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                  <div className="flex gap-6">
                    <span className="text-4xl font-display font-bold text-black/5 group-hover:text-accent transition-colors leading-none">{p.num}</span>
                    <div>
                      <h3 className="text-lg font-display font-bold mb-3 tracking-tight">{p.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_solutions');

  const defaultSolutions = [
    {
      label: '→ namabisnis.com',
      title: 'Domain profesional milik sendiri',
      desc: 'Pelanggan mengingat alamat toko Anda, bukan username marketplace. Branding lebih kuat, SEO lebih tinggi.',
      icon: 'Globe'
    },
    {
      label: '→ Bukan template yang sama',
      title: 'Desain sesuai identitas brand',
      desc: 'Tampilan toko dirancang mengikuti karakter produk Anda. Warna, tipografi, dan layout fleksibel, bukan cetakan kompetitor.',
      icon: 'TrendingUp'
    },
    {
      label: '→ Transfer, QRIS, e-wallet',
      title: 'Checkout lengkap siap pakai',
      desc: 'Pembeli bisa order langsung, terhubung BCA, Mandiri, BRI, QRIS, OVO, GoPay, DANA, dan ShopeePay. Tanpa setup tambahan.',
      icon: 'CreditCard'
    },
    {
      label: '→ Untuk retargeting & repeat order',
      title: 'Database pembeli 100% milik Anda',
      desc: 'Nomor WhatsApp dan email pembeli tersimpan di dashboard Anda. Broadcast promo kapan pun, tidak perlu bayar ke marketplace.',
      icon: 'Database'
    },
    {
      label: '→ Traffic organik jangka panjang',
      title: 'Dioptimasi untuk Google',
      desc: 'Setiap halaman produk sudah SEO-ready. Calon pembeli menemukan Anda lewat Google tanpa bayar iklan setiap kali.',
      icon: 'TrendingUp'
    },
    {
      label: '→ Respons < 2 jam kerja',
      title: 'Tim lokal siap bantu via WhatsApp',
      desc: 'Tim support Kaloweb standby sepanjang masa berlangganan. Troubleshooting, update konten, atau tambah fitur, langsung chat.',
      icon: 'MessageSquare'
    }
  ];

  const solutions = sectionData?.solutions || defaultSolutions;
  const tag = sectionData?.tag || "§ 03 · Solusi";
  const title = sectionData?.title || "Punya toko online sendiri,";
  const highlightText = sectionData?.highlightText || "tanpa komisi dan tanpa ribet teknis.";
  const description = sectionData?.description || "Enam hal di bawah ini aktif sejak hari pertama website Anda diluncurkan. Bukan janji, bukan fitur tambahan berbayar.";
  const rightNote = sectionData?.rightNote || "06 manfaat utama · aktif otomatis";

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="container-custom">
        <ScrollReveal className="mb-20 text-center lg:text-left">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 leading-[1.1] text-black">
                {title} <br />
                <span className="text-black/30">{highlightText}</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base font-medium">
                {description}
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
              {rightNote}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((s: any, i: number) => {
            const Icon = getIcon(s.icon);
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} className="p-8 h-full rounded-[2.5rem] bg-gray-50 border border-gray-100 flex flex-col group hover:bg-white hover:border-accent/30 hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-8 border border-gray-100 group-hover:bg-accent group-hover:text-black transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{s.label}</p>
                    <h3 className="text-xl font-display font-bold tracking-tight">{s.title}</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_portfolio');

  const defaultItems = [
    {
      num: '§ 04 · 01',
      title: 'Delisa Hijab',
      category: 'Fashion Muslim',
      desc: 'Brand fashion muslimah yang menjual hijab, mukena, dan abaya berkualitas tinggi. Supplier Hijab No #1 di Indonesia.',
      link: 'delisahijab.co.id',
      img: 'https://images.unsplash.com/photo-1583394838336-acd977730f90?auto=format&fit=crop&q=80&w=800',
      tag: 'Unggulan'
    },
    {
      num: '§ 04 · 02',
      title: 'Sena Indonesia',
      category: 'Gear Outdoor',
      desc: 'Perangkat komunikasi Bluetooth dan Mesh Intercom untuk pengendara motor, pesepeda, dan petualang outdoor.',
      link: 'senaindonesia.co.id',
      img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: '§ 04 · 03',
      title: 'Tas Kamera Indonesia',
      category: 'Fotografi',
      desc: 'Toko online peralatan fotografi profesional: kamera, lensa, tas kamera, dan aksesoris dari brand kelas dunia.',
      link: 'taskamera.id',
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const items = sectionData?.items || defaultItems;
  const tag = sectionData?.tag || "§ 04 · Portofolio Nyata";
  const title = sectionData?.title || "100+ Toko Online Dibuat";
  const description = sectionData?.description || "Brand yang sudah pindah dari marketplace.";
  const footerText = sectionData?.footerText || "Tiga dari ratusan toko online yang kami bangun. Sekarang mereka jualan lewat Google, WhatsApp, dan database pembeli sendiri.";
  const buttonText = sectionData?.buttonText || "Lihat Semua Portofolio";
  const buttonUrl = sectionData?.buttonUrl || "https://wa.me/628123456789";

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black">
            {title}
          </h2>
          <p className="text-gray-500 font-medium">{description}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 max-w-7xl mx-auto">
          {items.map((item: any, i: number) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1} className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all h-full">
                <div className="aspect-[16/10] overflow-hidden relative perspective-1000 bg-black">
                  <motion.img
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  {item.tag && (
                    <div className="absolute top-6 left-6 bg-accent px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-black">
                      {item.tag}
                    </div>
                  )}
                  <div className="absolute top-6 right-6 text-[10px] font-bold text-white uppercase tracking-widest opacity-60">
                    {item.num}
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{item.category}</p>
                  <h3 className="text-2xl font-display font-medium mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">{item.desc}</p>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    {item.link}
                    <div className="w-8 h-[1px] bg-current" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-20 text-center">
          <ScrollReveal>
            <p className="text-gray-400 text-xs font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              {footerText}
            </p>
            <a href={buttonUrl} target="_blank" rel="noreferrer">
              <Button variant="black" className="rounded-full bg-white text-black border border-gray-200">{buttonText}</Button>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_workflow');

  const defaultSteps = [
    {
      num: '01',
      time: '± 30 menit',
      step: '01/04',
      title: 'Konsultasi via WhatsApp',
      desc: 'Hubungi kami melalui WhatsApp untuk menceritakan kebutuhan toko online Anda. Tim kami siap mendengarkan.',
      output: 'Kebutuhan bisnis dicatat'
    },
    {
      num: '02',
      time: '3-5 hari kerja',
      step: '02/04',
      title: 'Diskusi & Perencanaan',
      desc: 'Kami akan membantu merancang konsep toko online yang sesuai dengan produk, target pasar, dan budget Anda.',
      output: 'Proposal + mockup dikirim'
    },
    {
      num: '03',
      time: '2-3 minggu',
      step: '03/04',
      title: 'Pengerjaan Website',
      desc: 'Tim profesional kami mengerjakan website toko online Anda dengan standar kualitas terbaik.',
      output: 'Website siap review'
    },
    {
      num: '04',
      time: '3-5 hari kerja',
      step: '04/04',
      title: 'Website Siap Digunakan',
      desc: 'Toko online Anda siap diluncurkan! Kami juga memberikan panduan penggunaan dan dukungan teknis berkelanjutan.',
      output: 'Revisi final & live'
    }
  ];

  const steps = sectionData?.steps || defaultSteps;
  const tag = sectionData?.tag || "§ 06 · Alur Kerja";
  const title = sectionData?.title || "Cara Kerja Kami";
  const subtitle = sectionData?.subtitle || "Empat langkah, satu bulan toko online live.";
  const duration = sectionData?.duration || "Rata-rata 3-4 minggu";
  const description = sectionData?.description || "Konsultasi, review, kerjakan, publish. Semua transparan, dengan output konkret di setiap langkah.";
  const footerText = sectionData?.footerText || "Ditangani tim internal Kaloweb";
  const footerHighlight = sectionData?.footerHighlight || "Tanpa outsource";

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-20 lg:text-left flex flex-col lg:flex-row justify-between lg:items-end gap-12">
          <div>
            <Tag className="mb-6 lowercase">{tag}</Tag>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black">
              {title}
            </h2>
            <p className="text-gray-500 font-medium">{subtitle}</p>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent">{duration}</div>
            <p className="text-gray-400 text-xs md:text-sm max-w-sm leading-relaxed lg:text-right">
              {description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s: any, i: number) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }} className="p-8 h-full rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col group hover:bg-white hover:border-accent/30 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-display font-bold text-black/5 leading-none">{s.num}</span>
                  <div className="px-3 py-1 rounded-full bg-white text-[9px] font-bold uppercase tracking-widest text-black/40 border border-gray-100">
                    {s.time}
                  </div>
                </div>
                <div className="space-y-4 flex-grow">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent italic">{s.step}</p>
                  <h3 className="text-xl font-display font-bold tracking-tight leading-tight">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-[10px] font-bold uppercase text-black italic">{s.output}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest">
              {footerText}
              <div className="w-4 h-[1px] bg-white/20" />
              <span className="text-accent italic">{footerHighlight}</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function PostLiveSupport() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_support');

  const tag = sectionData?.tag || "§ 07 · Dukungan Setelah Live";
  const title = sectionData?.title || "Komitmen 12 Bulan";
  const highlightText = sectionData?.highlightText || "Grup WhatsApp khusus";
  const description = sectionData?.description || "Setelah live, Anda tidak sendirian. Begitu website Anda live, kami bentuk grup WhatsApp khusus berisi tim Kaloweb dan tim Anda.";
  
  const defaultFeatures = [
    { title: 'Akses langsung ke tim', desc: 'Developer, desainer, dan support kami ada di grup. Bukan bot, bukan tiket.', icon: 'Users' },
    { title: 'Balas cepat di jam kerja', desc: 'Biasanya di bawah 2 jam. Troubleshooting, banner promo, revisi kecil, tinggal chat.', icon: 'Clock' },
    { title: 'Pendampingan penuh', desc: 'Bukan cuma teknis. Kami bantu saran optimasi konversi dan SEO dasar selama 12 bulan.', icon: 'ShieldCheck' }
  ];
  const features = sectionData?.features || defaultFeatures;

  const chatHeader = sectionData?.chatHeader || "Support · Toko Anda";
  const chatSubHeader = sectionData?.chatSubHeader || "Tim Kaloweb · 5 Anggota";
  
  const defaultMessages = [
    { sender: 'client', text: 'Halo tim, tolong bantu ganti banner utama dengan promo Ramadan ya. Materi saya kirim di grup.', time: '09:14' },
    { sender: 'kaloweb', text: 'Siap kak, kami kerjakan hari ini. Kami juga usulkan tambah badge “Promo Ramadan” di product card biar lebih konversi.', time: '09:16' },
    { sender: 'kaloweb', text: 'Draft banner sudah kami kirim, preview: tokoanda.com/preview', time: '11:02', isLink: true }
  ];
  const chatMessages = sectionData?.chatMessages || defaultMessages;

  const defaultStats = [
    { label: 'Status', value: 'Online sekarang' },
    { label: 'Durasi', value: 'Aktif 12 bulan' },
    { label: 'Biaya', value: 'Tanpa biaya tambahan' }
  ];
  const stats = sectionData?.stats || defaultStats;

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="container-custom overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollReveal>
              <Tag className="mb-6 lowercase bg-white/10 text-accent border-white/10 tracking-[0.2em]">{tag}</Tag>
              <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-8 leading-[1.05]">
                {title} <br />
                <span className="text-white/30 italic italic-serif">{highlightText}</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-lg font-medium">
                {description}
              </p>

              <div className="space-y-8">
                {features.map((f: any, i: number) => {
                  const Icon = getIcon(f.icon);
                  return (
                    <div key={i} className="flex gap-5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold mb-2">{f.title}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="max-w-md mx-auto">
                <div className="rounded-[2.5rem] bg-gray-900 border border-white/10 overflow-hidden shadow-2xl relative">
                  <div className="bg-gray-800/50 p-6 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black font-bold text-xs overflow-hidden">
                        WE
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{chatHeader}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{chatSubHeader}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">Hari ini</span>
                    </div>

                    {chatMessages.map((msg: any, i: number) => (
                      <div key={i} className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}>
                        <div className={`${msg.sender === 'client' ? 'bg-white/10 rounded-2xl rounded-tr-none text-white' : 'bg-accent text-black rounded-2xl rounded-tl-none shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]'} p-4 max-w-[85%] text-xs leading-relaxed`}>
                          {msg.isLink ? (
                            <>
                              Draft banner sudah kami kirim, preview: <span className="underline font-bold">tokoanda.com/preview</span>
                            </>
                          ) : (
                            msg.text
                          )}
                          <div className={`text-[8px] ${msg.sender === 'client' ? 'text-white/40 text-right' : 'text-black/40'} mt-2`}>{msg.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-16 border-t border-white/5 bg-gray-800/20 p-4 flex items-center">
                    <div className="w-full h-8 rounded-full bg-white/5 border border-white/10 px-4 flex items-center text-[10px] text-white/30">
                      Ketik pesan...
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-8">
                  {stats.map((stat: any, i: number) => (
                    <div key={i} className="text-center">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent mb-1">{stat.label}</p>
                      <p className="text-xs font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accent/10 blur-[150px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_comparison');

  const defaultRows = [
    { label: '01 Biaya per transaksi', we: 'Gratis', mp: '5-12% potong', diy: 'Gratis' },
    { label: '02 Domain nama sendiri', we: 'Termasuk', mp: 'Tidak ada', diy: 'Biaya tambahan' },
    { label: '03 Data pembeli milik Anda', we: '100% milik Anda', mp: 'Dikunci platform', diy: 'Milik Anda' },
    { label: '04 Butuh skill teknis', we: 'Tidak, kami setup', mp: 'Tidak, tapi terbatas', diy: 'Tinggi' },
    { label: '05 Dukungan lokal', we: 'Tim WhatsApp', mp: 'Tiket & bot', diy: 'Forum / Inggris' },
    { label: '06 Siap ekspor & SEO', we: 'Termasuk', mp: 'Terbatas', diy: 'Setup manual' },
    { label: '07 Transparansi biaya', we: 'Per proyek', mp: 'Komisi terus', diy: 'Add-ons' },
  ];

  const rows = sectionData?.rows || defaultRows;
  const tag = sectionData?.tag || "§ 08 · Perbandingan";
  const title = sectionData?.title || "Kaloweb vs Lainnya";
  const description = sectionData?.description || "Marketplace cocok untuk awal, DIY cocok untuk hobi. Untuk bisnis yang ingin tumbuh, website sendiri selalu lebih ekonomis dalam 2-3 tahun.";
  const tableHeaders = sectionData?.tableHeaders || {
    col1: "Kriteria", col2: "Kaloweb", col2Highlight: "Pilihan Cerdas", col3: "Marketplace", col4: "DIY (Wix/WP)"
  };

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black">
            {title}
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto overflow-hidden">
          <ScrollReveal direction="up" className="rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 md:p-8 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">{tableHeaders.col1}</th>
                    <th className="p-6 md:p-8 text-center text-sm font-display font-bold text-black border-l border-gray-100">
                      <span className="text-accent block text-[9px] mb-1 italic">{tableHeaders.col2Highlight}</span>
                      {tableHeaders.col2}
                    </th>
                    <th className="p-6 md:p-8 text-center text-sm font-display font-bold text-gray-400 border-l border-gray-100">{tableHeaders.col3}</th>
                    <th className="p-6 md:p-8 text-center text-sm font-display font-bold text-gray-400 border-l border-gray-100">{tableHeaders.col4}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((r: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-6 md:p-8 text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{r.label}</td>
                      <td className="p-6 md:p-8 text-center text-sm font-bold text-black border-l border-gray-50/80 bg-accent/5">{r.we}</td>
                      <td className="p-6 md:p-8 text-center text-xs font-medium text-gray-500 border-l border-gray-50/80">{r.mp}</td>
                      <td className="p-6 md:p-8 text-center text-xs font-medium text-gray-500 border-l border-gray-50/80">{r.diy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_testimonials');

  const defaultTestimonials = [
    {
      num: '§ 09 · 01',
      tag: 'Unggulan',
      quote: '“Setelah punya website sendiri, pembeli langsung checkout tanpa lewat reseller. Branding kami akhirnya terasa utuh dan pembeli repeat lebih mudah kami ajak ngobrol lewat WhatsApp.”',
      metric: 'Repeat order naik ± 38%',
      author: 'Tim Delisa Hijab',
      role: 'Supplier Hijab No. 1',
      site: 'delisahijab.co.id',
      since: 'Klien sejak 2022',
      cat: 'Fashion Muslim'
    },
    {
      num: '§ 09 · 02',
      quote: '“Kami butuh website yang bisa tampilkan video produk dengan rapi dan siap untuk pembeli internasional. Kaloweb menyiapkan semuanya, termasuk checkout QRIS & e-wallet, tanpa kami harus mikirin teknis.”',
      metric: 'Pembeli luar negeri naik 3x',
      author: 'Tim Sena Indonesia',
      role: 'Brand Gear Outdoor',
      site: 'senaindonesia.co.id',
      since: 'Klien sejak 2023',
      cat: 'Gear Outdoor'
    },
    {
      num: '§ 09 · 03',
      quote: '“Sebelumnya kami jualan di marketplace dan margin tergerus komisi. Sekarang Google yang membawa pembeli, data mereka masuk database kami, dan kami bisa kirim penawaran langsung.”',
      metric: 'Margin bersih +22%',
      author: 'Tim Tas Kamera ID',
      role: 'Toko Fotografi',
      site: 'taskamera.id',
      since: 'Klien sejak 2022',
      cat: 'Fotografi'
    }
  ];

  const testimonials = sectionData?.testimonials || defaultTestimonials;
  const tag = sectionData?.tag || "§ 09 · Testimoni";
  const title = sectionData?.title || "Cerita Dari Klien";
  const description = sectionData?.description || "Hasil nyata, bukan cuma klaim.";
  const footerText = sectionData?.footerText || "Testimoni diverifikasi dari pemilik website yang kami kerjakan. Website mereka bisa Anda buka di link masing-masing.";

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black">
            {title}
          </h2>
          <p className="text-gray-500 font-medium">{description}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t: any, i: number) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.02 }} className="p-8 md:p-10 h-full rounded-[2.5rem] bg-white border border-gray-100 flex flex-col group hover:shadow-2xl hover:border-accent/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/20">{t.num}</div>
                  {t.tag && <div className="px-3 py-1 rounded-full bg-accent text-[9px] font-bold uppercase tracking-widest text-black">{t.tag}</div>}
                  <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} /> Verified
                  </div>
                </div>

                <p className="text-lg md:text-xl font-display font-medium italic leading-relaxed mb-10 flex-grow text-gray-800">
                  {t.quote}
                </p>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
                  <p className="text-base font-display font-bold text-black mb-1">{t.metric}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{t.since}</p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <p className="text-sm font-bold mb-1 tracking-tight">{t.author}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">{t.role}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{t.cat} · {t.site}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-xs font-medium max-w-xl mx-auto leading-relaxed">
            {footerText}
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { getContent } = useContent();
  const sectionData = getContent('page_online_store_faq');

  const defaultFaqs = [
    {
      q: 'Berapa lama pengerjaan website toko online saya?',
      a: 'Rata-rata 3-4 minggu dari konsultasi awal sampai website live, tergantung jumlah produk dan tingkat customisasi. Mockup dikirim di minggu pertama, revisi dan pengembangan di minggu 2-3, review final dan go-live di minggu ke-4. Timeline pasti kami kirim setelah chat WhatsApp dan review produk Anda.'
    },
    {
      q: 'Apakah saya perlu paham coding atau teknis?',
      a: 'Sama sekali tidak. Kami menangani seluruh setup teknis dari domain, hosting, integrasi pembayaran, hingga optimasi kecepatan. Anda cukup mengelola pesanan lewat dashboard yang sangat user-friendly. Kami berikan panduan lengkap setelah website live.'
    },
    {
      q: 'Bisakah website saya terintegrasi dengan Shopee, Tokopedia, atau marketplace lain?',
      a: 'Tentu. Kami bisa membantu mengarahkan traffic dari profil marketplace atau Instagram Anda langsung ke website sendiri guna menghindari komisi transaksi yang makin mahal.'
    },
    {
      q: 'Bagaimana kalau nanti saya mau ubah desain atau tambah fitur?',
      a: 'Anda punya akses penuh ke WhatsApp group tim kami selama 12 bulan. Untuk perubahan banner promo atau revisi kecil sudah termasuk dalam layanan. Untuk penambahan fitur besar, bisa diskusikan di grup dan akan kami beri penawaran khusus klien.'
    },
    {
      q: 'Apakah metode pembayaran di Indonesia sudah didukung?',
      a: 'Ya, sistem checkout kami sudah siap pakai yang terhubung ke Midtrans/Xendit/Otomatis khusus UMKM untuk menerima pembayaran via BCA, Mandiri, BRI, QRIS, OVO, GoPay, DANA, dan lainnya secara real-time.'
    },
    {
      q: 'Kalau saya belum punya produk banyak, apakah sudah pantas punya website?',
      a: 'Justru saat produk masih sedikit adalah waktu terbaik membangun kredibilitas. Website sendiri membantu Anda terlihat profesional sejak hari pertama, sehingga calon pembeli tidak ragu untuk checkout.'
    },
    {
      q: 'Apakah ada biaya tersembunyi setelah website live?',
      a: 'Tidak ada. Penawaran awal kami mencakup perizinan domain, hosting tahun pertama, sertifikat keamanan SSL, integrasi pembayaran, dan bantuan WhatsApp grup selama 12 bulan pertama.'
    },
    {
      q: 'Bagaimana sistem perpanjangan tahun berikutnya?',
      a: 'Anda hanya perlu memperpanjang biaya Domain & Hosting di tahun kedua (mulai ± Rp 1.5 - 2jt / tahun). Kami akan mengingatkan 30 hari sebelum masa berlaku habis untuk memastikan toko Anda tidak pernah offline.'
    },
    {
      q: 'Ada garansi kalau hasil website tidak sesuai harapan?',
      a: 'Kami bekerja secara iteratif. Kami tidak lanjut ke tahap pengerjaan sebelum Anda menyetujui Mockup Desain (minggu-1). Kepuasan Anda adalah prioritas kami.'
    }
  ];

  const faqs = sectionData?.faqs || defaultFaqs;
  const tag = sectionData?.tag || "§ 10 · Pertanyaan";
  const title = sectionData?.title || "Jawaban untuk hal yang";
  const highlightText = sectionData?.highlightText || "paling sering ditanya.";
  const description = sectionData?.description || "Tidak ketemu jawabannya? Chat tim kami lewat WhatsApp, biasanya dibalas di bawah 2 jam kerja.";
  const boxSubtitle = sectionData?.boxSubtitle || "Masih ragu? Tanya langsung tim kami.";
  const boxDesc = sectionData?.boxDesc || "Gratis, tanpa paksaan, balas di bawah 2 jam kerja.";
  const buttonText = sectionData?.buttonText || "Tanya via WhatsApp";
  const buttonUrl = sectionData?.buttonUrl || "https://wa.me/628123456789";

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Tag className="mb-6 lowercase">{tag}</Tag>
              <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-8 leading-[1.1] text-black">
                {title} <br />
                <span className="text-black/30">{highlightText}</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 font-medium">
                {description}
              </p>

              <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4 italic">{boxSubtitle}</p>
                <p className="text-xs font-bold text-gray-400 mb-8 max-w-xs uppercase leading-relaxed">{boxDesc}</p>
                <a href={buttonUrl} target="_blank" rel="noreferrer">
                  <Button variant="black" className="rounded-full w-full h-14 group">
                    {buttonText}
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((f: any, i: number) => (
                <FAQListItem key={i} question={f.q} answer={f.a} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FAQListItemProps {
  question: string;
  answer: string;
  index: number;
  key?: number;
}

const FAQListItem = ({ question, answer, index }: FAQListItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.05}>
      <div className={`rounded-3xl border transition-all duration-500 ${open ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-8 py-6 flex items-center justify-between text-left gap-4"
        >
          <span className="text-sm font-display font-bold tracking-tight text-gray-900 leading-tight">
            <span className="text-accent mr-3 font-mono">{String(index + 1).padStart(2, '0')}</span>
            {question}
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-black text-white rotate-45' : 'bg-gray-100 text-gray-400'}`}>
            <Plus size={16} />
          </div>
        </button>

        <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 pb-8 text-gray-500 text-xs md:text-sm leading-relaxed max-w-[90%] font-medium">
            {answer}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
