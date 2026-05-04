import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Code2,
  ArrowRight,
  Layout,
  Settings2,
  Cpu,
  Smartphone,
  Zap,
  Database,
  ShieldCheck,
  Clock,
  Globe,
  Layers,
  Search,
  MessageSquare,
  Lock,
  Plus,
  Users,
  Activity,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Tag from '../components/ui/Tag';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/utils/ScrollReveal';
import CTA from '../components/sections/CTA';
import { useContent } from '../lib/ContentContext';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Globe': return Globe;
    case 'Database': return Database;
    case 'Layout': return Layout;
    case 'Cpu': return Cpu;
    case 'Smartphone': return Smartphone;
    case 'Layers': return Layers;
    case 'Settings2': return Settings2;
    default: return Code2;
  }
};

export default function CustomServicePage() {
  return (
    <div className="bg-white pt-20">
      <Hero />
      <SolutionsGrid />
      <Challenges />
      <Capabilities />
      <Technology />
      <Portfolio />
      <Workflow />
      <PostLaunchSupport />
      <Comparison />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}

function Hero() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_hero');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const tag = sectionData?.tag || "Software House · By Order";
  const heading1 = sectionData?.heading1 || "Sistem digital yang";
  const heading2 = sectionData?.heading2 || "dipikirkan,";
  const heading3 = sectionData?.heading3 || "bukan ditempel.";
  const description = sectionData?.description || "Tim software house kami merancang dan membangun website custom, integrasi AI, sistem ERP, dan aplikasi mobile dari nol. Setiap baris kode dibuat untuk proses bisnis Anda.";
  const buttonPrimary = sectionData?.buttonPrimary || "Diskusi Scope Proyek";
  const buttonPrimaryUrl = sectionData?.buttonPrimaryUrl || "https://wa.me/628123456789";
  const buttonSecondary = sectionData?.buttonSecondary || "Lihat Portofolio";
  const image = sectionData?.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200";
  const statLabel = sectionData?.statLabel || "Status";
  const statValue = sectionData?.statValue || "50+ proyek";
  const statDesc = sectionData?.statDesc || "dibangun dari nol";

  const headingLines = [
    { text: heading1, color: "text-white" },
    { text: heading2, color: "text-white/30 italic italic-serif" },
    { text: heading3, color: "text-[0.8em]" }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden bg-black text-white"
    >
      {/* Background Parallax and Blobs */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ opacity: opacityHero }}
            className="z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tag className="mb-6 lowercase bg-white/10 text-accent border-white/10">{tag}</Tag>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.95] mb-8">
              {headingLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`block ${line.color}`}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-400 text-sm md:text-lg max-w-xl font-medium leading-relaxed mb-10"
            >
              {description}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a href={buttonPrimaryUrl} target="_blank" rel="noreferrer">
                <Button variant="black" className="rounded-full px-8 h-14 bg-accent text-black hover:bg-white transition-colors group">
                  {buttonPrimary} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button variant="arrow" className="rounded-full px-8 h-14 text-white border-white/10 hover:bg-white/5">
                {buttonSecondary}
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/10"
            >
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-accent" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">NDA Tersedia</p>
              </div>
              <div className="flex items-center gap-3">
                <Database size={20} className="text-accent" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Source Code Milik Anda</p>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-accent" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Penawaran Per Scope</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative">
            <ScrollReveal direction="right" className="relative z-20">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-[2.5rem] border border-white/10 p-4 md:p-8 shadow-2xl relative overflow-hidden group"
              >
                <div className="bg-black rounded-2xl overflow-hidden aspect-[16/10] relative perspective-1000">
                  <motion.img
                    style={{ y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]) }}
                    src={image}
                    alt="Custom Development Preview"
                    className="w-[120%] h-[140%] -top-[20%] -left-[10%] absolute object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Floating Stats */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 right-12 bg-accent p-4 rounded-2xl shadow-xl text-black z-30"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 italic">{statLabel}</p>
                  <h4 className="text-xl font-display font-bold whitespace-nowrap">{statValue}</h4>
                  <p className="text-[9px] font-bold uppercase tracking-tighter opacity-60">{statDesc}</p>
                </motion.div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/30 transition-colors">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-accent mb-2">Project Spec · Draft</p>
                    <p className="text-xs font-bold text-white mb-1">v0.1</p>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="w-12 h-1 bg-accent/20 rounded-full overflow-hidden"
                    >
                      <div className="w-1/3 h-full bg-accent" />
                    </motion.div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/30 transition-colors">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">Timeline</p>
                    <p className="text-xs font-bold text-white mb-1">± 12 minggu</p>
                    <div className="w-12 h-1 bg-white/10 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
            {/* Decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accent/10 blur-[150px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionsGrid() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_solutions');

  const defaultItems = [
    { name: 'Website Custom', status: 'Dari nol', icon: 'Globe' },
    { name: 'Sistem ERP', status: 'Internal', icon: 'Database' },
    { name: 'Dashboard Admin', status: 'Real-time', icon: 'Layout' },
    { name: 'Integrasi AI', status: 'Otomasi', icon: 'Cpu' },
    { name: 'Mobile App', status: 'iOS · Android', icon: 'Smartphone' },
    { name: 'API & Integrasi', status: 'Payment · Logistik', icon: 'Layers' },
  ];

  const items = sectionData?.items || defaultItems;
  const tag = sectionData?.tag || "Scope Aktif";
  const title = sectionData?.title || "Yang biasa kami bangun";
  const description = sectionData?.description || "Cakupan luas, satu pintu engineering. Tidak perlu vendor terpisah per modul.";

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-16">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black">
            {title}
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            {description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item: any, i: number) => {
            const Icon = getIcon(item.icon);
            return (
              <ScrollReveal key={i} delay={i * 0.1} direction="up" className="h-full">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="p-6 h-full rounded-3xl bg-white/40 backdrop-blur-md border border-gray-100 shadow-sm text-center hover:bg-white hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 mx-auto group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-500">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-xs font-bold mb-1 tracking-tight text-black">{item.name}</h4>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors">{item.status}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Challenges() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_challenges');

  const defaultChallenges = [
    {
      num: '01',
      title: 'Proses bisnis unik dipaksa masuk template',
      desc: 'Setiap workflow dipotong supaya muat di fitur bawaan, bukan sebaliknya. Tim malah kerja dua kali: di sistem dan di spreadsheet bayangan.'
    },
    {
      num: '02',
      title: 'Data tersebar di banyak tools berbeda',
      desc: 'Inventori di satu aplikasi, keuangan di tempat lain, CRM di spreadsheet. Tidak ada satu dashboard yang bisa dipercaya manajemen.'
    },
    {
      num: '03',
      title: 'Terjebak platform yang tidak bisa diubah',
      desc: 'Pindah vendor berarti ekspor data susah, integrasi ulang mahal, dan skill internal tidak transferable. Biaya bertambah tiap tahun.'
    },
    {
      num: '04',
      title: 'Integrasi antar sistem rumit dan rapuh',
      desc: 'Penghubung API, logistik, dan pembayaran dibuat manual per kebutuhan, tanpa dokumentasi. Satu update pihak ketiga bisa mematikan operasional.'
    }
  ];

  const challenges = sectionData?.items || defaultChallenges;
  const tag = sectionData?.tag || "§ 02 · Tantangan";
  const title = sectionData?.title || "Kenapa Template";
  const highlightText = sectionData?.highlightText || "Tidak Cukup";
  const description = sectionData?.description || "Sistem ada, tapi tidak pas dengan cara kerja tim. Empat sinyal yang paling sering kami dengar sebelum klien memutuskan bangun sistem sendiri.";
  const cardInfoTitle = sectionData?.cardInfoTitle || "Cara kami menyelesaikannya →";
  const cardInfoDesc = sectionData?.cardInfoDesc || "Enam kapabilitas engineering berikut ini aktif sejak fase brief.";

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <ScrollReveal>
            <Tag className="mb-6 lowercase">{tag}</Tag>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-8 leading-[1.1] text-black">
              {title} <br />
              <span className="text-black/30 italic italic-serif">{highlightText}</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 font-medium">
              {description}
            </p>

            <div className="p-8 rounded-[2rem] bg-white border border-gray-200">
              <div className="flex items-center gap-4 text-accent mb-4">
                <ArrowRight size={20} />
                <p className="text-[10px] font-bold uppercase tracking-widest italic">{cardInfoTitle}</p>
              </div>
              <p className="text-sm font-bold text-gray-900 leading-relaxed mb-0">
                {cardInfoDesc}
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {challenges.map((c: any, i: number) => (
              <ScrollReveal key={i} direction="right" delay={i * 0.1}>
                <div className="p-4 rounded-3xl bg-white border border-gray-100 flex gap-6 items-start hover:border-accent/20 transition-colors">
                  <div className="text-3xl font-display font-bold text-black/5 p-4 bg-gray-50 rounded-2xl">
                    {c.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2 tracking-tight">{c.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
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

function Capabilities() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_capabilities');

  const defaultItems = [
    {
      tag: '01 · Unggulan',
      subtitle: 'Dibangun dari nol',
      title: 'Website Custom',
      desc: 'Desain dan fitur 100% sesuai kebutuhan bisnis Anda. Tidak terbatas template, dibangun dari nol sesuai spesifikasi.',
      output: 'Mulai dari brief bisnis',
      icon: 'Globe'
    },
    {
      tag: '02',
      subtitle: 'Otomasi cerdas',
      title: 'Integrasi AI',
      desc: 'Chatbot cerdas, analitik prediktif, dan otomasi berbasis AI untuk meningkatkan efisiensi operasional bisnis Anda.',
      output: 'Integrasi API LLM',
      icon: 'Cpu'
    },
    {
      tag: '03',
      subtitle: 'Operasi terpusat',
      title: 'Sistem ERP',
      desc: 'Manajemen inventori, keuangan, HR, dan operasional terintegrasi dalam satu platform yang dirancang khusus.',
      output: 'Internal dashboard',
      icon: 'Database'
    },
    {
      tag: '04',
      subtitle: 'iOS, Android, PWA',
      title: 'Aplikasi Mobile & Web',
      desc: 'Progressive web apps dan aplikasi native untuk iOS dan Android yang memberikan pengalaman terbaik bagi pengguna.',
      output: 'Cross-platform native',
      icon: 'Smartphone'
    },
    {
      tag: '05',
      subtitle: 'Semua tersambung',
      title: 'Integrasi Sistem',
      desc: 'Koneksi API, payment gateway, logistik, dan layanan pihak ketiga agar semua sistem bisnis Anda terhubung.',
      output: 'Webhook specialist',
      icon: 'Layers'
    },
    {
      tag: '06',
      subtitle: 'Pendampingan jangka panjang',
      title: 'Maintenance & Support',
      desc: 'Dukungan teknis berkelanjutan, monitoring sistem, dan pemeliharaan rutin agar bisnis Anda berjalan tanpa gangguan.',
      output: 'Reliability engineering',
      icon: 'ShieldCheck'
    }
  ];

  const items = sectionData?.items || defaultItems;
  const tag = sectionData?.tag || "§ 03 · Kapabilitas";
  const title = sectionData?.title || "Apa yang Kami Bangun,";
  const highlightText = sectionData?.highlightText || "Enam kapabilitas, satu tim yang paham bisnis.";
  const description = sectionData?.description || "Dari website marketing sampai sistem ERP internal. Semua dikerjakan tim in-house, tanpa outsource ke vendor luar.";
  const bottomInfo = sectionData?.bottomInfo || "Tanpa subkontrak, tanpa handoff";
  const bottomHighlight = sectionData?.bottomHighlight || "Tanpa kejutan";

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <ScrollReveal className="mb-20 text-center lg:text-left">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 leading-[1.1] text-black">
                {title} <br />
                <span className="text-black/30">{highlightText}</span>
              </h2>
              <p className="text-gray-500 font-medium max-w-xl">
                {description}
              </p>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
              Semua kapabilitas, satu PT legal entity
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: any, i: number) => {
            const Icon = getIcon(item.icon);
            return (
              <ScrollReveal key={i} delay={i * 0.1} direction="up" className="h-full">
                <motion.div 
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="p-8 h-full rounded-[2.5rem] bg-gray-50 border border-gray-100 flex flex-col group hover:bg-white hover:border-accent/30 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-8 mx-0 group-hover:bg-accent group-hover:text-black transition-colors duration-500">
                    <Icon size={24} />
                  </div>
                  <div className="space-y-4 flex-grow">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent italic">{item.tag}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.subtitle}</p>
                    <h3 className="text-2xl font-display font-bold tracking-tight text-black">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <p className="text-[10px] font-bold uppercase text-black italic">{item.output}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-16 pt-16 border-t border-gray-100 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">
              {bottomInfo}
              <div className="w-4 h-[1px] bg-white/20" />
              <span className="text-accent italic">{bottomHighlight}</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Technology() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_technology');

  const defaultStack = [
    {
      cat: 'Frontend',
      techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'],
      num: '§ 04 · 01'
    },
    {
      cat: 'Backend',
      techs: ['Laravel', 'Node.js', 'NestJS', 'Python', 'PostgreSQL', 'MySQL'],
      num: '§ 04 · 02'
    },
    {
      cat: 'Infra & AI',
      techs: ['AWS', 'Cloudflare', 'Docker', 'Redis', 'OpenAI API', 'LangChain'],
      num: '§ 04 · 03'
    }
  ];

  const stack = sectionData?.stack || defaultStack;
  const tag = sectionData?.tag || "§ 04 · Teknologi";
  const title = sectionData?.title || "Stack Yang Kami Pakai";
  const description = sectionData?.description || "Teknologi modern, bukan kuno, dan open standard.";
  const rightNote = sectionData?.rightNote || "Semua dibangun dengan teknologi open-source populer. Tidak ada vendor lock-in.";
  
  const featureTitle = sectionData?.featureTitle || "Kepemilikan penuh";
  const featureDesc = sectionData?.featureDesc || "Source code, akun hosting, dan domain milik Anda, bukan sandera kami. Transparansi teknis sejak hari pertama.";
  const features = sectionData?.features || ["Repository Git diserahkan ke akun Anda", "Akses admin hosting diberikan penuh", "Dokumentasi teknis lengkap disertakan"];
  const codeSnippet = sectionData?.codeSnippet || "git clone https://client-repo.com/project.git\nnpm install\nnpm run build\n# Ready to deploy on your own server";

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-20 lg:text-left flex flex-col lg:flex-row justify-between lg:items-end gap-12">
          <div className="max-w-2xl">
            <Tag className="mb-6 lowercase bg-white/10 text-accent border-white/10">{tag}</Tag>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-8 leading-[1.1]">
              {title}
            </h2>
            <p className="text-gray-400 font-medium">{description}</p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-accent max-w-sm lg:text-right">
            {rightNote}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {stack.map((group: any, i: number) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="p-8 rounded-[2.5rem] bg-gray-900 border border-white/5 h-full hover:bg-gray-800 transition-colors">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-6">{group.num}</p>
                <h3 className="text-2xl font-display font-medium mb-8 text-accent underline underline-offset-8 decoration-accent/20">{group.cat}</h3>
                <ul className="space-y-4">
                  {group.techs.map((t: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-bold tracking-tight text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 tracking-tight">{featureTitle}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                {featureDesc}
              </p>
              <div className="space-y-4">
                {features.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                    <CheckCircle2 size={16} className="text-accent" /> {feat}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-accent/20 blur-[100px] absolute inset-0 rounded-full" />
              <div className="relative z-10 bg-black rounded-3xl border border-white/10 p-6 font-mono text-[10px] text-accent/80 overflow-hidden shadow-2xl">
                <pre className="whitespace-pre-wrap">
                  {codeSnippet}
                </pre>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Portfolio() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_portfolio');

  const defaultItems = [
    {
      num: '§ 05 · 01',
      tag: 'Unggulan',
      cat: 'Mobile App',
      title: 'Marketplace Produk UMKM',
      desc: 'Aplikasi marketplace mobile yang menghubungkan konsumen langsung dengan pengrajin dan UMKM Indonesia. Dilengkapi sistem pembayaran aman, multi-kategori produk, dan pengiriman terintegrasi.',
      tags: ['Mobile App', 'Marketplace', 'UMKM'],
      link: 'shoda-apps.com',
      img: 'https://images.unsplash.com/photo-1512428559087-560ad51ba42b?auto=format&fit=crop&q=80&w=1200'
    },
    {
      num: '§ 05 · 02',
      cat: 'Event Komunitas',
      title: 'H.O.G Indomobil Jakarta Chapter',
      desc: 'Website komunitas Harley Owners Group dengan fitur registrasi event riding, detail itinerary multi-hari, dan sistem pemesanan tiket online untuk official ride series.',
      tags: ['Web App', 'Event', 'Payment'],
      link: 'hogjakarta.com',
      img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800'
    },
    {
      num: '§ 05 · 03',
      cat: 'Event Platform',
      title: 'SportFest',
      desc: 'Platform manajemen event olahraga dan registrasi peserta untuk festival lari dan sport event di Indonesia. Fitur pendaftaran online dan distribusi race pack.',
      tags: ['SaaS', 'Registration', 'Event'],
      link: 'sportfest.id',
      img: 'https://images.unsplash.com/photo-1461896756996-7835974655e2?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const items = sectionData?.items || defaultItems;
  const tag = sectionData?.tag || "§ 05 · Portofolio";
  const title = sectionData?.title || "Sistem Yang Sudah Dibangun";
  const description = sectionData?.description || "Bukan portofolio demo, sistem nyata yang dipakai setiap hari.";
  
  const defaultStats = [
    { value: "50+", label: "Proyek custom selesai" },
    { value: "99.9%", label: "SLA Uptime Sistem" },
    { value: "4.9", label: "Rating kepuasan klien" }
  ];
  const stats = sectionData?.stats || defaultStats;

  const bottomTitle = sectionData?.bottomTitle || "Masih banyak proyek yang tidak bisa ditampilkan karena NDA.";
  const bottomDesc = sectionData?.bottomDesc || "Briefing tertutup tersedia on-request";
  const buttonText = sectionData?.buttonText || "Diskusi Portfolio Kami";
  const buttonUrl = sectionData?.buttonUrl || "https://wa.me/628123456789";

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-24">
          <Tag className="mb-6 lowercase">{tag}</Tag>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-8 text-black">
            {title}
          </h2>
          <p className="text-gray-500 font-medium">{description}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center">
          {stats.map((stat: any, i: number) => (
            <div key={i} className="space-y-2">
              <h4 className="text-4xl md:text-5xl font-display font-bold text-black tracking-tight">{stat.value}</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-32">
          {items.map((item: any, i: number) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:col-span-7 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="group rounded-[3rem] overflow-hidden shadow-2xl relative bg-black perspective-1000">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src={item.img}
                      alt={item.title}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">{item.num}</p>
                        {item.tag && <div className="px-3 py-1 rounded-full bg-accent text-[8px] font-bold uppercase tracking-widest text-black">{item.tag}</div>}
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-2">{item.cat}</p>
                      <h3 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-black mb-6 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.tags?.map((tag: string, idx: number) => (
                        <span key={idx} className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                      <Link to="#" className="group/link flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black">
                        Lihat proyek <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/20 italic">{item.link}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-[3.5rem] bg-gray-50 border border-gray-100 text-center">
          <ScrollReveal>
            <h4 className="text-xl font-display font-bold mb-4 tracking-tight text-black">{bottomTitle}</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 italic mb-8">{bottomDesc}</p>
            <a href={buttonUrl} target="_blank" rel="noreferrer">
              <Button variant="black" className="rounded-full px-10 h-14">{buttonText}</Button>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_workflow');

  const defaultSteps = [
    {
      num: '01',
      phase: 'Discovery',
      step: '01/04',
      title: 'Konsultasi & Analisis Kebutuhan',
      desc: 'Tim kami mendengarkan kebutuhan bisnis Anda secara mendalam. Kami menganalisis proses kerja, tantangan, dan tujuan untuk merancang solusi yang tepat.',
      output: 'Brief teknis + scope proyek'
    },
    {
      num: '02',
      phase: 'Desain',
      step: '02/04',
      title: 'Desain UI/UX & Arsitektur Sistem',
      desc: 'Kami membuat wireframe, prototype, dan arsitektur teknis yang disetujui bersama sebelum memulai pengembangan.',
      output: 'Wireframe + arsitektur disetujui'
    },
    {
      num: '03',
      phase: 'Build & QA',
      step: '03/04',
      title: 'Pengembangan & Testing',
      desc: 'Tim developer kami membangun sistem dengan standar industri, dilengkapi testing menyeluruh untuk memastikan kualitas dan keamanan.',
      output: 'Sistem siap staging + UAT'
    },
    {
      num: '04',
      phase: 'Launch & Support',
      step: '04/04',
      title: 'Launch & Dukungan Berkelanjutan',
      desc: 'Sistem diluncurkan dengan panduan lengkap. Kami terus memberikan maintenance, monitoring, dan support pasca-launch.',
      output: 'Sistem live + monitoring aktif'
    }
  ];

  const steps = sectionData?.steps || defaultSteps;
  const tag = sectionData?.tag || "§ 06 · Proses";
  const title = sectionData?.title || "Dari Brief ke Deploy";
  const description = sectionData?.description || "Kami bekerja dalam sprint yang transparan.";
  const rightNote = sectionData?.rightNote || "Durasi menyesuaikan scope";
  const rightDesc = sectionData?.rightDesc || "Setiap fase punya output konkret yang Anda review sebelum lanjut ke fase berikutnya.";
  const bottomInfo = sectionData?.bottomInfo || "Sprint mingguan, review per milestone";
  const bottomHighlight = sectionData?.bottomHighlight || "Anda setujui, kami lanjut.";

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-24 lg:text-left flex flex-col lg:flex-row justify-between lg:items-end gap-12">
          <div>
            <Tag className="mb-6 lowercase">{tag}</Tag>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black tracking-tighter">
              {title}
            </h2>
            <p className="text-gray-500 font-medium">{description}</p>
          </div>
          <div className="space-y-4 text-center lg:text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent italic">{rightNote}</div>
            <p className="text-gray-400 text-xs md:text-sm max-w-sm leading-relaxed">
              {rightDesc}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s: any, i: number) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <motion.div whileHover={{ y: -10 }} className="p-8 h-full rounded-[2.5rem] bg-gray-50 border border-gray-100 flex flex-col group hover:bg-white hover:border-accent/30 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-4xl font-display font-bold text-black/5 group-hover:text-accent transition-colors leading-none">{s.num}</span>
                  <div className="px-3 py-1 rounded-full bg-white text-[8px] font-bold uppercase tracking-widest text-black/30 border border-gray-100">
                    Step {s.step?.split('/')[0]}
                  </div>
                </div>
                <div className="space-y-4 flex-grow">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-accent italic">Fase {s.phase}</p>
                  <h3 className="text-xl font-display font-bold tracking-tight text-black">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <p className="text-[10px] font-bold uppercase text-black italic tracking-tighter">{s.output}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900 shadow-xl text-white text-[10px] font-bold uppercase tracking-widest">
              {bottomInfo}
              <div className="w-4 h-[1px] bg-white/20" />
              <span className="text-accent italic">{bottomHighlight}</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function PostLaunchSupport() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_support');

  const tag = sectionData?.tag || "§ 07 · Pendampingan";
  const title = sectionData?.title || "Hidup Setelah";
  const highlightText = sectionData?.highlightText || "Live";
  const subtitle = sectionData?.subtitle || "SLA Tertulis · Dedicated PIC";
  const description = sectionData?.description || "Sistem custom butuh pendamping, bukan sekadar vendor yang pergi setelah invoice lunas. Kami tetap hadir untuk memastikan sistem berjalan dan tumbuh.";
  
  const defaultItems = [
    { title: 'Dedicated engineer', desc: '1 engineer menjadi PIC proyek Anda. Tahu kode, tahu bisnis, tidak berganti-ganti.', icon: 'Users' },
    { title: 'Monitoring 24/7', desc: 'Uptime, error rate, dan performa dipantau otomatis. Kami tahu sebelum Anda menyadari.', icon: 'Activity' },
    { title: 'SLA yang jelas', desc: 'Response time, resolution time, dan kanal komunikasi disepakati di awal, tertulis.', icon: 'FileText' }
  ];
  const items = sectionData?.items || defaultItems;

  const statusDomain = sectionData?.statusDomain || "ops.webekspor.com";
  const uptimeValue = sectionData?.uptimeValue || "99.98%";
  const responseTimeValue = sectionData?.responseTimeValue || "< 2 jam";
  const incidentLog = sectionData?.incidentLog || "Payment webhook timeout terdeteksi otomatis, di-restore sebelum tim operasional Anda menyadarinya.";

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <ScrollReveal>
              <Tag className="mb-6 lowercase bg-white/10 text-accent border-white/10">{tag}</Tag>
              <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-8 leading-[1.05]">
                {title} <span className="text-white/30 italic">{highlightText}</span> <br />
                <span className="text-white/30 italic serif">{subtitle}</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-lg font-medium">
                {description}
              </p>

              <div className="space-y-10">
                {items.map((item: any, i: number) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        <Activity size={16} />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Status · {statusDomain}</h4>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-500 text-[9px] font-bold rounded-full border border-green-500/30">Live</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 p-6 rounded-3xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Uptime · API Gateway</p>
                      <h5 className="text-3xl font-display font-bold text-white tracking-tight leading-none">{uptimeValue}</h5>
                      <p className="text-[9px] text-accent font-bold uppercase tracking-widest">30 hari terakhir</p>
                    </div>
                    <div className="space-y-2 p-6 rounded-3xl bg-white/5 border border-white/10">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Response Time · PIC</p>
                      <h5 className="text-3xl font-display font-bold text-white tracking-tight leading-none">{responseTimeValue}</h5>
                      <p className="text-[9px] text-accent font-bold uppercase tracking-widest">Sesuai SLA</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-accent/5 border border-accent/10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Incident Log · Apr 12</p>
                      <span className="text-[10px] font-bold text-green-500">Resolved 14m</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-mono">{incidentLog}</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/20 italic">
                    <span>PIC: 1 Engineer Dedicated</span>
                    <span>Standby 24/7</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 blur-[80px] rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_comparison');

  const defaultRows = [
    { label: '01 Source code milik Anda', we: 'Diserahkan penuh', fr: 'Tergantung kontrak', nc: 'Tidak tersedia', ag: 'Sering dikunci' },
    { label: '02 Tim in-house, tanpa subkontrak', we: 'Satu tim, satu PT', fr: '1 orang', nc: 'N/A', ag: 'Subkontrak lazim' },
    { label: '03 SLA & pendampingan', we: 'Dedicated PIC', fr: 'Hilang setelah invoice', nc: 'Komunitas', ag: 'Biaya mahal' },
    { label: '04 Kustomisasi logika', we: 'Tanpa batas', fr: 'Sesuai skill', nc: 'Terbatas platform', ag: 'Bisa, biaya besar' },
    { label: '05 Estimasi timeline', we: 'Milestone jelas', fr: 'Rawan molor', nc: 'Cepat, kaku', ag: 'Retainer 6 bln' },
    { label: '06 Skala bisnis tumbuh', we: 'Siap scale', fr: 'Harus refactor', nc: 'Hit plafon', ag: 'Kontrak baru' },
    { label: '07 Transparansi biaya', we: 'Per scope', fr: 'Per jam (rawan)', nc: 'Naik per seat', ag: 'Retainer tinggi' },
  ];

  const rows = sectionData?.rows || defaultRows;
  const tag = sectionData?.tag || "§ 08 · Perbandingan";
  const title = sectionData?.title || "Kaloweb vs Lainnya";
  const description = sectionData?.description || "Custom build bukan pilihan termurah, tapi paling ekonomis jangka panjang. Untuk sistem tulang punggung bisnis, kode yang dirawat tim tetap menang.";

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

        <div className="max-w-6xl mx-auto overflow-hidden">
          <ScrollReveal direction="up" className="rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 md:p-8 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Kriteria</th>
                    <th className="p-6 md:p-8 text-center text-sm font-display font-bold text-black border-l border-gray-100 bg-accent/5">Kaloweb</th>
                    <th className="p-6 md:p-8 text-center text-[10px] font-bold uppercase text-gray-400 border-l border-gray-100">Freelancer</th>
                    <th className="p-6 md:p-8 text-center text-[10px] font-bold uppercase text-gray-400 border-l border-gray-100">No-Code (Bubble)</th>
                    <th className="p-6 md:p-8 text-center text-[10px] font-bold uppercase text-gray-400 border-l border-gray-100">Agency Besar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((r: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-6 md:p-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest italic">{r.label}</td>
                      <td className="p-6 md:p-8 text-center text-sm font-bold text-black border-l border-gray-50/80 bg-accent/5">{r.we}</td>
                      <td className="p-6 md:p-8 text-center text-xs text-gray-500 border-l border-gray-50/80">{r.fr}</td>
                      <td className="p-6 md:p-8 text-center text-xs text-gray-500 border-l border-gray-50/80">{r.nc}</td>
                      <td className="p-6 md:p-8 text-center text-xs text-gray-500 border-l border-gray-50/80">{r.ag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
        <p className="mt-8 text-center text-gray-400 text-[10px] uppercase font-bold tracking-widest">Dibandingkan pada proyek berskala serupa. Hasil aktual per klien bisa berbeda.</p>
      </div>
    </section>
  );
}

function Testimonials() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_testimonials');

  const defaultTestimonials = [
    {
      num: '§ 09 · 01',
      tag: 'Unggulan',
      quote: '“Kami butuh marketplace yang mewadahi pengrajin dan UMKM dari berbagai daerah dalam satu aplikasi. Tim Kaloweb menerjemahkan alur dagang yang rumit menjadi sistem yang benar-benar dipakai setiap hari.”',
      metric: 'Live 8 minggu',
      author: 'Tim Shoda Apps',
      role: 'Founder Marketplace UMKM',
      site: 'shoda-apps.com',
      since: 'Klien sejak 2023',
      cat: 'Mobile App · Marketplace'
    },
    {
      num: '§ 09 · 02',
      quote: '“Event riding multi-hari kami butuh sistem registrasi, itinerary, dan tiket yang rapi di satu tempat. Kaloweb merancang semuanya dari nol, bukan mengakali plugin. Dashboard admin-nya tetap mudah dipakai.”',
      metric: 'Sistem tiket terpusat',
      author: 'Tim H.O.G Indomobil',
      role: 'Jakarta Chapter',
      site: 'hogjakarta.com',
      since: 'Klien sejak 2022',
      cat: 'Web App · Komunitas'
    },
    {
      num: '§ 09 · 03',
      quote: '“Kami jalankan lomba lari di beberapa kota sekaligus. Butuh platform yang bisa atur jadwal, peserta, dan race pack tanpa ribet. Kaloweb bangunkan sistem yang skalanya ikut tumbuh tiap kami tambah event.”',
      metric: 'Skala multi-kota',
      author: 'Tim SportFest',
      role: 'Platform Event Olahraga',
      site: 'sportfest.id',
      since: 'Klien sejak 2023',
      cat: 'Web App · Event'
    }
  ];

  const testimonials = sectionData?.items || defaultTestimonials;
  const tag = sectionData?.tag || "§ 09 · Testimoni";
  const title = sectionData?.title || "Cerita Dari Klien";
  const description = sectionData?.description || "Sistem yang dipakai setiap hari, bukan demo.";
  const rightNote = sectionData?.rightNote || "Semua project di bawah ini masih online dan bisa Anda buka langsung lewat link masing-masing.";

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-20 lg:text-left flex flex-col lg:flex-row justify-between lg:items-end gap-12">
          <div>
            <Tag className="mb-6 lowercase">{tag}</Tag>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tighter mb-6 text-black tracking-tighter">
              {title}
            </h2>
            <p className="text-gray-500 font-medium">{description}</p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-accent max-w-sm lg:text-right">
            {rightNote}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t: any, i: number) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.02 }} className="p-8 md:p-10 h-full rounded-[3rem] bg-white border border-gray-100 flex flex-col group hover:shadow-2xl hover:border-accent/30 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">{t.num}</p>
                  {t.tag && <div className="px-3 py-1 rounded-full bg-accent text-[8px] font-bold uppercase tracking-widest text-black">{t.tag}</div>}
                  <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} /> Verified
                  </div>
                </div>

                <p className="text-lg font-display font-medium italic leading-relaxed mb-10 flex-grow text-gray-800">
                  {t.quote}
                </p>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 mb-8 border-l-4 border-l-accent">
                  <p className="text-base font-display font-bold text-black mb-1">{t.metric}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{t.since}</p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h4 className="text-sm font-bold mb-1 tracking-tight text-black">{t.author}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">{t.role}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 italic">{t.cat} · {t.site}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { getContent } = useContent();
  const sectionData = getContent('page_custom_service_faq');

  const defaultFaqs = [
    {
      q: 'Berapa lama pengerjaan proyek custom saya?',
      a: 'Tergantung scope. Untuk website custom sederhana rata-rata 4-6 minggu. Sistem dashboard dan ERP biasanya 2-3 bulan. Mobile app full-stack bisa sampai 3-4 bulan. Timeline konkret kami kirim setelah sesi brief teknis, lengkap dengan milestone per fase.'
    },
    {
      q: 'Bagaimana skema pembayaran dan penawaran proyek?',
      a: 'Kami menawarkan sistem fixed-price berdasarkan scope yang disepakati. Pembayaran biasanya dibagi menjadi 3-4 termin sesuai milestone proyek: Down Payment (DP), Milestone Desain, Milestone Development, dan Final Handoff/Live.'
    },
    {
      q: 'Apakah source code dan akun hosting benar-benar milik kami?',
      a: 'Ya, 100%. Setelah pelunasan, kami menyerahkan seluruh source code via Repository Git pribadi Anda, serta akses penuh ke server hosting/cloud. Kami percaya pada keterbukaan kode dan kepemilikan aset klien.'
    },
    {
      q: 'Apakah tim Kaloweb bersedia menandatangani NDA?',
      a: 'Tentu. Kami sangat menghargai privasi dan kerahasiaan ide bisnis atau data perusahaan Anda. NDA standar kami siap ditandatangani sebelum sesi brief teknis dimulai.'
    },
    {
      q: 'Kalau tengah jalan saya butuh ubah scope atau tambah fitur?',
      a: 'Kami bekerja dengan sistem Agile. Perubahan scope kecil bisa diakomodasi, sementara fitur besar baru akan kami buatkan Change Request (CR) dengan penyesuaian timeline dan biaya yang transparan.'
    },
    {
      q: 'Apakah kami tetap bisa kontak tim setelah proyek live?',
      a: 'Sangat bisa. Kami menyediakan dedicated PIC dan WhatsApp group selama 12 bulan (masa maintenance) untuk membantu update konten, pemantauan error, atau sekadar diskusi optimasi sistem.'
    },
    {
      q: 'Bisakah proyek kami dikerjakan bertahap sesuai budget?',
      a: 'Bisa. Kami sering menyarankan pendekatan MVP (Minimum Viable Product). Membangun fitur inti terlebih dahulu agar sistem bisa live cepat, baru kemudian menambah modul lain di fase pengembangan berikutnya.'
    },
    {
      q: 'Apakah bisa integrasi dengan sistem yang sudah kami pakai?',
      a: 'Ya, selama sistem lama Anda memiliki API yang bisa diakses. Kami spesialis dalam membangun jalinan antar sistem (integrasi) baik dengan payment gateway, logistik, CRM, maupun platform internal lainnya.'
    },
    {
      q: 'Apa teknologi yang kami pakai bisa dipilih?',
      a: 'Tim kami akan memberikan rekomendasi stack terbaik (seperti Next.js atau Laravel) berdasarkan keunggulan teknis untuk kebutuhan proyek Anda. Namun, jika tim IT Anda memiliki standar khusus, kami siap berdiskusi.'
    }
  ];

  const faqs = sectionData?.faqs || defaultFaqs;
  const tag = sectionData?.tag || "§ 10 · Pertanyaan";
  const title = sectionData?.title || "Jawaban untuk hal yang";
  const highlightText = sectionData?.highlightText || "paling sering ditanya.";
  const description = sectionData?.description || "Tidak ketemu jawabannya? Chat tim engineering kami lewat WhatsApp, biasanya dibalas di bawah 2 jam kerja.";
  const boxSubtitle = sectionData?.boxSubtitle || "Masih ragu? Diskusi scope langsung dengan tim kami.";
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
                <span className="text-black/30 placeholder-accent italic serif tracking-tighter">{highlightText}</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 font-medium">
                {description}
              </p>

              <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 text-center md:text-left shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4 italic italic-serif">{boxSubtitle}</p>
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
              {faqs.map((f, i) => (
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
      <div className={`rounded-3xl border transition-all duration-500 ${open ? 'bg-gray-50 border-gray-200 shadow-inner' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-8 py-6 flex items-center justify-between text-left gap-4"
        >
          <span className="text-sm font-display font-bold tracking-tight text-gray-900 leading-tight">
            <span className="text-accent mr-3 font-mono opacity-40">{String(index + 1).padStart(2, '0')}</span>
            {question}
          </span>
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${open ? 'bg-black text-white rotate-45' : 'bg-gray-100/50 text-gray-400'}`}>
            <Plus size={16} />
          </div>
        </button>

        <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-8 pb-8 text-gray-500 text-xs md:text-sm leading-relaxed max-w-[95%] font-medium">
            {answer}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
