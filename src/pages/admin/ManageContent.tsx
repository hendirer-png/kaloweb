import { useState, useEffect } from 'react';
import {
  Save,
  Loader2,
  Image as ImageIcon,
  Type,
  Layout,
  ChevronRight,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { useContent } from '../../lib/ContentContext';
import Button from '../../components/ui/Button';

export default function ManageContent() {
  const { content: globalContent, refreshContent } = useContent();
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .order('section_key');

      if (error) throw error;
      setSections(data || []);
      if (data && data.length > 0 && !activeSection) {
        setActiveSection(data[0].section_key);
        setEditingContent(data[0].content);
      }
    } catch (err) {
      console.error('Error fetching sections:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setLoading(true);
    try {
      const initialData = [
        {
          section_key: 'home_hero',
          content: {
            headingPrimary: ["Membangun", "Masa", "Depan", "Ekosistem", "Digital"],
            headingSecondary: ["UMKM", "Cerdas", "Indonesia"],
            description: "Solusi website & aplikasi cerdas yang membantu bisnis Anda scale-up dengan teknologi modern dan desain yang berkelas.",
            backgroundImage: "/hiro.avif",
            primaryButtonText: "Mulai Sekarang",
            secondaryButtonText: "Lihat Portofolio"
          }
        },
        {
          section_key: 'home_services',
          content: {
            tag: "Layanan Kami",
            title: "Partner terpercaya dalam membangun ekosistem digital yang cerdas dan efisien.",
            highlightText: "ekosistem digital",
            items: [
              {
                title: 'Website Development',
                description: 'Pembuatan landing page, e-commerce, dan website profil perusahaan yang responsif dan cepat.',
                icon: 'Globe',
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Mobile Application',
                description: 'Transformasi bisnis Anda ke dalam aplikasi mobile (Android & iOS) yang intuitif dan fungsional.',
                icon: 'Smartphone',
                img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Digital Branding',
                description: 'Membangun identitas visual Brand Anda agar tampil profesional dan konsisten di dunia digital.',
                icon: 'Palette',
                img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
              }
            ]
          }
        },
        {
          section_key: 'home_about',
          content: {
            tag: "Tentang Kami",
            title: "Partner terpercaya dalam membangun ekosistem digital yang cerdas dan efisien",
            highlightText: "ekosistem digital",
            card1_tag: "Team Work",
            card1_value: 250,
            card1_suffix: "+",
            card1_desc: "Membantu UMKM Go Digital dengan solusi website dan aplikasi modern.",
            card1_image: "/693671b05ed33655d4b7ce17_card-about-img.avif",
            card2_tag: "Tingkat Kepuasan Klien",
            card2_value: 99,
            card2_suffix: "%",
            card2_quote: "Website buatan Kaloweb membantu bisnis kopi saya naik kelas dan lebih dipercaya pelanggan.",
            card3_tag: "Growth Rate",
            card3_value: 85,
            card3_suffix: "%",
            card3_desc: "Rata-rata peningkatan trafik digital klien kami.",
            card4_tag: "UMKM Terdukung",
            card4_value: 150,
            card4_suffix: "+"
          }
        },
        {
          section_key: 'home_expertise',
          content: {
            tag: "Intelligence Technology",
            title: "We help businesses harness technology not to replace human creativity, but to amplify it — enabling smarter decisions and faster.",
            items: [
              {
                title: 'Automation & optimization',
                description: 'Streamline your operations through intelligent workflow automation that saves time, reduces errors, and boosts productivity.',
                icon: 'Settings'
              },
              {
                title: 'Data analytics & insights',
                description: 'Transform raw data into strategic insight using advanced analytics, dashboards, and predictive modeling.',
                icon: 'BarChart'
              },
              {
                title: 'Digital transformation',
                description: 'We guide organizations through full-scale digital evolution — modernizing systems, processes, and decision-making frameworks.',
                icon: 'Sparkles'
              },
              {
                title: 'Intelligence in Every Decision',
                description: 'Combine strategy, data, and artificial intelligence to grow faster and build smarter systems.',
                icon: 'UserCheck'
              }
            ]
          }
        },
        {
          section_key: 'home_faq',
          content: {
            tag: "Pertanyaan Umum",
            title: "Masih ada pertanyaan? Kami siap menjawab",
            description: "Tim engineer dan konsultan kami siap membantu Anda memahami lebih detail tentang layanan yang kami berikan.",
            faqs: [
              {
                q: "Berapa lama pengerjaan proyek custom?",
                a: "Tergantung scope. Untuk website custom sederhana rata-rata 4-6 minggu. Sistem dashboard dan ERP biasanya 2-3 bulan."
              },
              {
                q: "Apakah source code milik kami?",
                a: "Ya, 100%. Setelah pelunasan, kami menyerahkan seluruh source code via Repository Git pribadi Anda."
              },
              {
                q: "Bagaimana dengan maintenance?",
                a: "Kami menyediakan dedicated PIC dan WhatsApp group selama 12 bulan (masa maintenance)."
              }
            ]
          }
        },
        {
          section_key: 'home_pricing',
          content: {
            tag: "Daftar Harga",
            title: "Investasi yang sepadan untuk bisnis",
            highlightText: "sepadan untuk bisnis",
            description: "Pilih paket yang paling sesuai dengan skala bisnis dan kebutuhan target market Anda.",
            buttonText: "Get Started"
          }
        },
        {
          section_key: 'home_other_services',
          content: {
            tag: "Layanan Lainnya",
            title: "Butuh Lebih dari Landing Page?",
            description: "Tidak semua bisnis cukup dengan template. Jika Anda butuh toko online atau sistem digital yang lebih kompleks, kami juga bisa bantu.",
            box1_title: "Website Toko Online",
            box1_desc: "Bangun toko online profesional dengan integrasi pembayaran, manajemen produk, dan desain responsif yang siap menerima pesanan.",
            box1_btn: "Lihat Layanan Toko Online",
            box2_title: "Website & Sistem Custom",
            box2_desc: "Solusi 100% custom — website, integrasi AI, sistem ERP, hingga aplikasi mobile. Dibangun sesuai kebutuhan spesifik bisnis Anda.",
            box2_btn: "Lihat Layanan Custom"
          }
        },
        {
          section_key: 'page_custom_service_hero',
          content: {
            tag: "Software House · By Order",
            heading1: "Sistem digital yang",
            heading2: "dipikirkan,",
            heading3: "bukan ditempel.",
            description: "Tim software house kami merancang dan membangun website custom, integrasi AI, sistem ERP, dan aplikasi mobile dari nol. Setiap baris kode dibuat untuk proses bisnis Anda.",
            buttonPrimary: "Diskusi Scope Proyek",
            buttonPrimaryUrl: "https://wa.me/62895406181407",
            buttonSecondary: "Lihat Portofolio",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
            statLabel: "Status",
            statValue: "50+ proyek",
            statDesc: "dibangun dari nol"
          }
        },
        {
          section_key: 'page_custom_service_solutions',
          content: {
            tag: "Scope Aktif",
            title: "Yang biasa kami bangun",
            description: "Cakupan luas, satu pintu engineering. Tidak perlu vendor terpisah per modul.",
            items: [
              { name: 'Website Custom', status: 'Dari nol', icon: 'Globe' },
              { name: 'Sistem ERP', status: 'Internal', icon: 'Database' },
              { name: 'Dashboard Admin', status: 'Real-time', icon: 'Layout' },
              { name: 'Integrasi AI', status: 'Otomasi', icon: 'Cpu' },
              { name: 'Mobile App', status: 'iOS · Android', icon: 'Smartphone' },
              { name: 'API & Integrasi', status: 'Payment · Logistik', icon: 'Layers' }
            ]
          }
        },
        {
          section_key: 'page_custom_service_challenges',
          content: {
            tag: "§ 02 · Tantangan",
            title: "Kenapa Template",
            highlightText: "Tidak Cukup",
            description: "Sistem ada, tapi tidak pas dengan cara kerja tim. Empat sinyal yang paling sering kami dengar sebelum klien memutuskan bangun sistem sendiri.",
            cardInfoTitle: "Cara kami menyelesaikannya →",
            cardInfoDesc: "Enam kapabilitas engineering berikut ini aktif sejak fase brief.",
            items: [
              { num: '01', title: 'Proses bisnis unik dipaksa masuk template', desc: 'Setiap workflow dipotong supaya muat di fitur bawaan, bukan sebaliknya. Tim malah kerja dua kali: di sistem dan di spreadsheet bayangan.' },
              { num: '02', title: 'Data tersebar di banyak tools berbeda', desc: 'Inventori di satu aplikasi, keuangan di tempat lain, CRM di spreadsheet. Tidak ada satu dashboard yang bisa dipercaya manajemen.' },
              { num: '03', title: 'Terjebak platform yang tidak bisa diubah', desc: 'Pindah vendor berarti ekspor data susah, integrasi ulang mahal, dan skill internal tidak transferable. Biaya bertambah tiap tahun.' },
              { num: '04', title: 'Integrasi antar sistem rumit dan rapuh', desc: 'Penghubung API, logistik, dan pembayaran dibuat manual per kebutuhan, tanpa dokumentasi. Satu update pihak ketiga bisa mematikan operasional.' }
            ]
          }
        },
        {
          section_key: 'page_custom_service_capabilities',
          content: {
            tag: "§ 03 · Kapabilitas",
            title: "Apa yang Kami Bangun,",
            highlightText: "Enam kapabilitas, satu tim yang paham bisnis.",
            description: "Dari website marketing sampai sistem ERP internal. Semua dikerjakan tim in-house, tanpa outsource ke vendor luar.",
            bottomInfo: "Tanpa subkontrak, tanpa handoff",
            bottomHighlight: "Tanpa kejutan",
            items: [
              { tag: '01 · Unggulan', subtitle: 'Dibangun dari nol', title: 'Website Custom', desc: 'Desain dan fitur 100% sesuai kebutuhan bisnis Anda. Tidak terbatas template, dibangun dari nol sesuai spesifikasi.', output: 'Mulai dari brief bisnis', icon: 'Globe' },
              { tag: '02', subtitle: 'Otomasi cerdas', title: 'Integrasi AI', desc: 'Chatbot cerdas, analitik prediktif, dan otomasi berbasis AI untuk meningkatkan efisiensi operasional bisnis Anda.', output: 'Integrasi API LLM', icon: 'Cpu' },
              { tag: '03', subtitle: 'Operasi terpusat', title: 'Sistem ERP', desc: 'Manajemen inventori, keuangan, HR, dan operasional terintegrasi dalam satu platform yang dirancang khusus.', output: 'Internal dashboard', icon: 'Database' },
              { tag: '04', subtitle: 'iOS, Android, PWA', title: 'Aplikasi Mobile & Web', desc: 'Progressive web apps dan aplikasi native untuk iOS dan Android yang memberikan pengalaman terbaik bagi pengguna.', output: 'Cross-platform native', icon: 'Smartphone' },
              { tag: '05', subtitle: 'Semua tersambung', title: 'Integrasi Sistem', desc: 'Koneksi API, payment gateway, logistik, dan layanan pihak ketiga agar semua sistem bisnis Anda terhubung.', output: 'Webhook specialist', icon: 'Layers' },
              { tag: '06', subtitle: 'Pendampingan jangka panjang', title: 'Maintenance & Support', desc: 'Dukungan teknis berkelanjutan, monitoring sistem, dan pemeliharaan rutin agar bisnis Anda berjalan tanpa gangguan.', output: 'Reliability engineering', icon: 'ShieldCheck' }
            ]
          }
        },
        {
          section_key: 'page_custom_service_technology',
          content: {
            tag: "§ 04 · Teknologi",
            title: "Stack Yang Kami Pakai",
            description: "Teknologi modern, bukan kuno, dan open standard.",
            rightNote: "Semua dibangun dengan teknologi open-source populer. Tidak ada vendor lock-in.",
            featureTitle: "Kepemilikan penuh",
            featureDesc: "Source code, akun hosting, dan domain milik Anda, bukan sandera kami. Transparansi teknis sejak hari pertama.",
            features: ["Repository Git diserahkan ke akun Anda", "Akses admin hosting diberikan penuh", "Dokumentasi teknis lengkap disertakan"],
            codeSnippet: "git clone https://client-repo.com/project.git\nnpm install\nnpm run build\n# Ready to deploy on your own server",
            stack: [
              { cat: 'Frontend', techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'], num: '§ 04 · 01' },
              { cat: 'Backend', techs: ['Laravel', 'Node.js', 'NestJS', 'Python', 'PostgreSQL', 'MySQL'], num: '§ 04 · 02' },
              { cat: 'Infra & AI', techs: ['AWS', 'Cloudflare', 'Docker', 'Redis', 'OpenAI API', 'LangChain'], num: '§ 04 · 03' }
            ]
          }
        },
        {
          section_key: 'page_custom_service_portfolio',
          content: {
            tag: "§ 05 · Portofolio",
            title: "Sistem Yang Sudah Dibangun",
            description: "Bukan portofolio demo, sistem nyata yang dipakai setiap hari.",
            stats: [
              { value: "50+", label: "Proyek custom selesai" },
              { value: "99.9%", label: "SLA Uptime Sistem" },
              { value: "4.9", label: "Rating kepuasan klien" }
            ],
            items: [
              { num: '§ 05 · 01', tag: 'Unggulan', cat: 'Mobile App', title: 'Marketplace Produk UMKM', desc: 'Aplikasi marketplace mobile yang menghubungkan konsumen langsung dengan pengrajin dan UMKM Indonesia. Dilengkapi sistem pembayaran aman, multi-kategori produk, dan pengiriman terintegrasi.', tags: ['Mobile App', 'Marketplace', 'UMKM'], link: 'shoda-apps.com', img: 'https://images.unsplash.com/photo-1512428559087-560ad51ba42b?auto=format&fit=crop&q=80&w=1200' },
              { num: '§ 05 · 02', cat: 'Event Komunitas', title: 'H.O.G Indomobil Jakarta Chapter', desc: 'Website komunitas Harley Owners Group dengan fitur registrasi event riding, detail itinerary multi-hari, dan sistem pemesanan tiket online untuk official ride series.', tags: ['Web App', 'Event', 'Payment'], link: 'hogjakarta.com', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800' },
              { num: '§ 05 · 03', cat: 'Event Platform', title: 'SportFest', desc: 'Platform manajemen event olahraga dan registrasi peserta untuk festival lari dan sport event di Indonesia. Fitur pendaftaran online dan distribusi race pack.', tags: ['SaaS', 'Registration', 'Event'], link: 'sportfest.id', img: 'https://images.unsplash.com/photo-1461896756996-7835974655e2?auto=format&fit=crop&q=80&w=800' }
            ],
            bottomTitle: "Masih banyak proyek yang tidak bisa ditampilkan karena NDA.",
            bottomDesc: "Briefing tertutup tersedia on-request",
            buttonText: "Diskusi Portfolio Kami",
            buttonUrl: "https://wa.me/62895406181407"
          }
        },
        {
          section_key: 'page_custom_service_workflow',
          content: {
            tag: "§ 06 · Proses",
            title: "Dari Brief ke Deploy",
            description: "Kami bekerja dalam sprint yang transparan.",
            rightNote: "Durasi menyesuaikan scope",
            rightDesc: "Setiap fase punya output konkret yang Anda review sebelum lanjut ke fase berikutnya.",
            steps: [
              { num: '01', phase: 'Discovery', step: '01/04', title: 'Konsultasi & Analisis Kebutuhan', desc: 'Tim kami mendengarkan kebutuhan bisnis Anda secara mendalam. Kami menganalisis proses kerja, tantangan, dan tujuan untuk merancang solusi yang tepat.', output: 'Brief teknis + scope proyek' },
              { num: '02', phase: 'Desain', step: '02/04', title: 'Desain UI/UX & Arsitektur Sistem', desc: 'Kami membuat wireframe, prototype, dan arsitektur teknis yang disetujui bersama sebelum memulai pengembangan.', output: 'Wireframe + arsitektur disetujui' },
              { num: '03', phase: 'Build & QA', step: '03/04', title: 'Pengembangan & Testing', desc: 'Tim developer kami membangun sistem dengan standar industri, dilengkapi testing menyeluruh untuk memastikan kualitas dan keamanan.', output: 'Sistem siap staging + UAT' },
              { num: '04', phase: 'Launch & Support', step: '04/04', title: 'Launch & Dukungan Berkelanjutan', desc: 'Sistem diluncurkan dengan panduan lengkap. Kami terus memberikan maintenance, monitoring, dan support pasca-launch.', output: 'Sistem live + monitoring aktif' }
            ],
            bottomInfo: "Sprint mingguan, review per milestone",
            bottomHighlight: "Anda setujui, kami lanjut."
          }
        },
        {
          section_key: 'page_custom_service_support',
          content: {
            tag: "§ 07 · Pendampingan",
            title: "Hidup Setelah",
            highlightText: "Live",
            subtitle: "SLA Tertulis · Dedicated PIC",
            description: "Sistem custom butuh pendamping, bukan sekadar vendor yang pergi setelah invoice lunas. Kami tetap hadir untuk memastikan sistem berjalan dan tumbuh.",
            items: [
              { title: 'Dedicated engineer', desc: '1 engineer menjadi PIC proyek Anda. Tahu kode, tahu bisnis, tidak berganti-ganti.', icon: 'Users' },
              { title: 'Monitoring 24/7', desc: 'Uptime, error rate, dan performa dipantau otomatis. Kami tahu sebelum Anda menyadari.', icon: 'Activity' },
              { title: 'SLA yang jelas', desc: 'Response time, resolution time, dan kanal komunikasi disepakati di awal, tertulis.', icon: 'FileText' }
            ],
            statusDomain: "ops.webekspor.com",
            uptimeValue: "99.98%",
            responseTimeValue: "< 2 jam",
            incidentLog: "Payment webhook timeout terdeteksi otomatis, di-restore sebelum tim operasional Anda menyadarinya."
          }
        },
        {
          section_key: 'page_custom_service_comparison',
          content: {
            tag: "§ 08 · Perbandingan",
            title: "Kaloweb vs Lainnya",
            description: "Custom build bukan pilihan termurah, tapi paling ekonomis jangka panjang. Untuk sistem tulang punggung bisnis, kode yang dirawat tim tetap menang.",
            rows: [
              { label: '01 Source code milik Anda', we: 'Diserahkan penuh', fr: 'Tergantung kontrak', nc: 'Tidak tersedia', ag: 'Sering dikunci' },
              { label: '02 Tim in-house, tanpa subkontrak', we: 'Satu tim, satu PT', fr: '1 orang', nc: 'N/A', ag: 'Subkontrak lazim' },
              { label: '03 SLA & pendampingan', we: 'Dedicated PIC', fr: 'Hilang setelah invoice', nc: 'Komunitas', ag: 'Biaya mahal' },
              { label: '04 Kustomisasi logika', we: 'Tanpa batas', fr: 'Sesuai skill', nc: 'Terbatas platform', ag: 'Bisa, biaya besar' },
              { label: '05 Estimasi timeline', we: 'Milestone jelas', fr: 'Rawan molor', nc: 'Cepat, kaku', ag: 'Retainer 6 bln' },
              { label: '06 Skala bisnis tumbuh', we: 'Siap scale', fr: 'Harus refactor', nc: 'Hit plafon', ag: 'Kontrak baru' },
              { label: '07 Transparansi biaya', we: 'Per scope', fr: 'Per jam (rawan)', nc: 'Naik per seat', ag: 'Retainer tinggi' }
            ]
          }
        },
        {
          section_key: 'page_custom_service_testimonials',
          content: {
            tag: "§ 09 · Testimoni",
            title: "Cerita Dari Klien",
            description: "Sistem yang dipakai setiap hari, bukan demo.",
            rightNote: "Semua project di bawah ini masih online dan bisa Anda buka langsung lewat link masing-masing.",
            items: [
              { num: '§ 09 · 01', tag: 'Unggulan', quote: '“Kami butuh marketplace yang mewadahi pengrajin dan UMKM dari berbagai daerah dalam satu aplikasi. Tim Kaloweb menerjemahkan alur dagang yang rumit menjadi sistem yang benar-benar dipakai setiap hari.”', metric: 'Live 8 minggu', author: 'Tim Shoda Apps', role: 'Founder Marketplace UMKM', site: 'shoda-apps.com', since: 'Klien sejak 2023', cat: 'Mobile App · Marketplace' },
              { num: '§ 09 · 02', quote: '“Event riding multi-hari kami butuh sistem registrasi, itinerary, dan tiket yang rapi di satu tempat. Kaloweb merancang semuanya dari nol, bukan mengakali plugin. Dashboard admin-nya tetap mudah dipakai.”', metric: 'Sistem tiket terpusat', author: 'Tim H.O.G Indomobil', role: 'Jakarta Chapter', site: 'hogjakarta.com', since: 'Klien sejak 2022', cat: 'Web App · Komunitas' },
              { num: '§ 09 · 03', quote: '“Kami jalankan lomba lari di beberapa kota sekaligus. Butuh platform yang bisa atur jadwal, peserta, dan race pack tanpa ribet. Kaloweb bangunkan sistem yang skalanya ikut tumbuh tiap kami tambah event.”', metric: 'Skala multi-kota', author: 'Tim SportFest', role: 'Platform Event Olahraga', site: 'sportfest.id', since: 'Klien sejak 2023', cat: 'Web App · Event' }
            ]
          }
        },
        {
          section_key: 'page_custom_service_faq',
          content: {
            tag: "§ 10 · Pertanyaan",
            title: "Jawaban untuk hal yang",
            highlightText: "paling sering ditanya.",
            description: "Tidak ketemu jawabannya? Chat tim engineering kami lewat WhatsApp, biasanya dibalas di bawah 2 jam kerja.",
            boxSubtitle: "Masih ragu? Diskusi scope langsung dengan tim kami.",
            boxDesc: "Gratis, tanpa paksaan, balas di bawah 2 jam kerja.",
            buttonText: "Tanya via WhatsApp",
            buttonUrl: "https://wa.me/62895406181407",
            faqs: [
              { q: 'Berapa lama pengerjaan proyek custom saya?', a: 'Tergantung scope. Untuk website custom sederhana rata-rata 4-6 minggu. Sistem dashboard dan ERP biasanya 2-3 bulan. Mobile app full-stack bisa sampai 3-4 bulan. Timeline konkret kami kirim setelah sesi brief teknis, lengkap dengan milestone per fase.' },
              { q: 'Bagaimana skema pembayaran dan penawaran proyek?', a: 'Kami menawarkan sistem fixed-price berdasarkan scope yang disepakati. Pembayaran biasanya dibagi menjadi 3-4 termin sesuai milestone proyek: Down Payment (DP), Milestone Desain, Milestone Development, dan Final Handoff/Live.' },
              { q: 'Apakah source code dan akun hosting benar-benar milik kami?', a: 'Ya, 100%. Setelah pelunasan, kami menyerahkan seluruh source code via Repository Git pribadi Anda, serta akses penuh ke server hosting/cloud. Kami percaya pada keterbukaan kode dan kepemilikan aset klien.' },
              { q: 'Apakah tim Kaloweb bersedia menandatangani NDA?', a: 'Tentu. Kami sangat menghargai privasi dan kerahasiaan ide bisnis atau data perusahaan Anda. NDA standar kami siap ditandatangani sebelum sesi brief teknis dimulai.' },
              { q: 'Kalau tengah jalan saya butuh ubah scope atau tambah fitur?', a: 'Kami bekerja dengan sistem Agile. Perubahan scope kecil bisa diakomodasi, sementara fitur besar baru akan kami buatkan Change Request (CR) dengan penyesuaian timeline dan biaya yang transparan.' },
              { q: 'Apakah kami tetap bisa kontak tim setelah proyek live?', a: 'Sangat bisa. Kami menyediakan dedicated PIC dan WhatsApp group selama 12 bulan (masa maintenance) untuk membantu update konten, pemantauan error, atau sekadar diskusi optimasi sistem.' },
              { q: 'Bisakah proyek kami dikerjakan bertahap sesuai budget?', a: 'Bisa. Kami sering menyarankan pendekatan MVP (Minimum Viable Product). Membangun fitur inti terlebih dahulu agar sistem bisa live cepat, baru kemudian menambah modul lain di fase pengembangan berikutnya.' },
              { q: 'Apakah bisa integrasi dengan sistem yang sudah kami pakai?', a: 'Ya, selama sistem lama Anda memiliki API yang bisa diakses. Kami spesialis dalam membangun jalinan antar sistem (integrasi) baik dengan payment gateway, logistik, CRM, maupun platform internal lainnya.' },
              { q: 'Apa teknologi yang kami pakai bisa dipilih?', a: 'Tim kami akan memberikan rekomendasi stack terbaik (seperti Next.js atau Laravel) berdasarkan keunggulan teknis untuk kebutuhan proyek Anda. Namun, jika tim IT Anda memiliki standar khusus, kami siap berdiskusi.' }
            ]
          }
        },
        {
          section_key: 'page_online_store_hero',
          content: {
            tag: "Konsultasi gratis via WhatsApp",
            headingWords: ["Toko", "online", "yang", "menjual,"],
            subHeadingWords: ["bukan", "sekadar", "ada."],
            description: "Kami bangun toko online profesional dengan domain sendiri, checkout lengkap, dan desain yang terasa seperti brand Anda. Tanpa komisi per transaksi, tanpa bersaing di rak yang sama dengan ribuan kompetitor.",
            buttonText: "Mulai Sekarang",
            stats: [
              { value: "4.9", label: "100+ Klien" },
              { value: "89%", label: "Naik Penjualan" },
              { value: "1 Bulan", label: "Brief ke Live" }
            ],
            company: "PT Berkat Digital Sentosa · Est. 2020",
            previewTag: "Featured Project",
            previewTitle: "Delisa Hijab",
            previewDesc: "Fashion Muslim · delisahijab.co.id",
            previewImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200"
          }
        },
        {
          section_key: 'page_online_store_platforms',
          content: {
            tag: "Website Siap Pakai",
            title: "Untuk Anda yang sudah jualan di",
            description: "Website sendiri bukan pengganti. Ini toko utama tempat brand Anda tinggal permanen.",
            platforms: [
              { name: 'Shopee', icon: 'ShoppingBag', status: 'Tetap jalan' },
              { name: 'Tokopedia', icon: 'Store', status: 'Tetap jalan' },
              { name: 'Instagram', icon: 'Instagram', status: 'Arahkan ke toko' },
              { name: 'TikTok Shop', icon: 'Smartphone', status: 'Arahkan ke toko' },
              { name: 'WhatsApp', icon: 'MessageCircle', status: 'Checkout langsung' }
            ]
          }
        },
        {
          section_key: 'page_online_store_problems',
          content: {
            tag: "§ 02 · Masalah",
            title: "Kenapa Toko Anda",
            highlightText: "Stuck",
            description: "Sebagian besar UMKM yang datang ke kami mengalami 4 hal di bawah ini. Kalau Anda merasa familiar, berarti website toko online sendiri adalah langkah berikutnya.",
            boxSubtitle: "Solusi yang Anda butuhkan →",
            boxDesc: "Lihat bagaimana website sendiri mengubah keempat masalah ini di bawah.",
            buttonText: "Pelajari Solusi",
            problems: [
              { num: '01', title: 'Marketplace makan margin Anda', desc: 'Komisi 5-12% per transaksi + biaya iklan internal yang makin mahal. Makin banyak jual, makin banyak dipotong.' },
              { num: '02', title: 'Pembeli lihat 100 toko yang mirip', desc: 'Di marketplace Anda bersaing harga dengan ribuan penjual lain di halaman yang sama. Brand Anda tenggelam.' },
              { num: '03', title: 'Data pembeli bukan milik Anda', desc: 'Nomor WhatsApp, email, preferensi, semua dikunci marketplace. Tidak bisa retarget, tidak bisa repeat order.' },
              { num: '04', title: 'Website gratisan terlihat murahan', desc: 'Wix atau WordPress gratis pakai subdomain asing, template identik dengan kompetitor, dan loading lambat.' }
            ]
          }
        },
        {
          section_key: 'page_online_store_solutions',
          content: {
            tag: "§ 03 · Solusi",
            title: "Punya toko online sendiri,",
            highlightText: "tanpa komisi dan tanpa ribet teknis.",
            description: "Enam hal di bawah ini aktif sejak hari pertama website Anda diluncurkan. Bukan janji, bukan fitur tambahan berbayar.",
            rightNote: "06 manfaat utama · aktif otomatis",
            solutions: [
              { label: '→ namabisnis.com', title: 'Domain profesional milik sendiri', desc: 'Pelanggan mengingat alamat toko Anda, bukan username marketplace. Branding lebih kuat, SEO lebih tinggi.', icon: 'Globe' },
              { label: '→ Bukan template yang sama', title: 'Desain sesuai identitas brand', desc: 'Tampilan toko dirancang mengikuti karakter produk Anda. Warna, tipografi, dan layout fleksibel, bukan cetakan kompetitor.', icon: 'TrendingUp' },
              { label: '→ Transfer, QRIS, e-wallet', title: 'Checkout lengkap siap pakai', desc: 'Pembeli bisa order langsung, terhubung BCA, Mandiri, BRI, QRIS, OVO, GoPay, DANA, dan ShopeePay. Tanpa setup tambahan.', icon: 'CreditCard' },
              { label: '→ Untuk retargeting & repeat order', title: 'Database pembeli 100% milik Anda', desc: 'Nomor WhatsApp dan email pembeli tersimpan di dashboard Anda. Broadcast promo kapan pun, tidak perlu bayar ke marketplace.', icon: 'Database' },
              { label: '→ Traffic organik jangka panjang', title: 'Dioptimasi untuk Google', desc: 'Setiap halaman produk sudah SEO-ready. Calon pembeli menemukan Anda lewat Google tanpa bayar iklan setiap kali.', icon: 'TrendingUp' },
              { label: '→ Respons < 2 jam kerja', title: 'Tim lokal siap bantu via WhatsApp', desc: 'Tim support Kaloweb standby sepanjang masa berlangganan. Troubleshooting, update konten, atau tambah fitur, langsung chat.', icon: 'MessageSquare' }
            ]
          }
        },
        {
          section_key: 'page_online_store_portfolio',
          content: {
            tag: "§ 04 · Portofolio Nyata",
            title: "100+ Toko Online Dibuat",
            description: "Brand yang sudah pindah dari marketplace.",
            items: [
              { num: '§ 04 · 01', title: 'Delisa Hijab', category: 'Fashion Muslim', desc: 'Brand fashion muslimah yang menjual hijab, mukena, dan abaya berkualitas tinggi. Supplier Hijab No #1 di Indonesia.', link: 'delisahijab.co.id', img: 'https://images.unsplash.com/photo-1583394838336-acd977730f90?auto=format&fit=crop&q=80&w=800', tag: 'Unggulan' },
              { num: '§ 04 · 02', title: 'Sena Indonesia', category: 'Gear Outdoor', desc: 'Perangkat komunikasi Bluetooth dan Mesh Intercom untuk pengendara motor, pesepeda, dan petualang outdoor.', link: 'senaindonesia.co.id', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800' },
              { num: '§ 04 · 03', title: 'Tas Kamera Indonesia', category: 'Fotografi', desc: 'Toko online peralatan fotografi profesional: kamera, lensa, tas kamera, dan aksesoris dari brand kelas dunia.', link: 'taskamera.id', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' }
            ],
            footerText: "Tiga dari ratusan toko online yang kami bangun. Sekarang mereka jualan lewat Google, WhatsApp, dan database pembeli sendiri.",
            buttonText: "Lihat Semua Portofolio",
            buttonUrl: "https://wa.me/62895406181407"
          }
        },
        {
          section_key: 'page_online_store_workflow',
          content: {
            tag: "§ 06 · Alur Kerja",
            title: "Cara Kerja Kami",
            subtitle: "Empat langkah, satu bulan toko online live.",
            duration: "Rata-rata 3-4 minggu",
            description: "Konsultasi, review, kerjakan, publish. Semua transparan, dengan output konkret di setiap langkah.",
            steps: [
              { num: '01', time: '± 30 menit', step: '01/04', title: 'Konsultasi via WhatsApp', desc: 'Hubungi kami melalui WhatsApp untuk menceritakan kebutuhan toko online Anda. Tim kami siap mendengarkan.', output: 'Kebutuhan bisnis dicatat' },
              { num: '02', time: '3-5 hari kerja', step: '02/04', title: 'Diskusi & Perencanaan', desc: 'Kami akan membantu merancang konsep toko online yang sesuai dengan produk, target pasar, dan budget Anda.', output: 'Proposal + mockup dikirim' },
              { num: '03', time: '2-3 minggu', step: '03/04', title: 'Pengerjaan Website', desc: 'Tim profesional kami mengerjakan website toko online Anda dengan standar kualitas terbaik.', output: 'Website siap review' },
              { num: '04', time: '3-5 hari kerja', step: '04/04', title: 'Website Siap Digunakan', desc: 'Toko online Anda siap diluncurkan! Kami juga memberikan panduan penggunaan dan dukungan teknis berkelanjutan.', output: 'Revisi final & live' }
            ],
            footerText: "Ditangani tim internal Kaloweb",
            footerHighlight: "Tanpa outsource"
          }
        },
        {
          section_key: 'page_online_store_support',
          content: {
            tag: "§ 07 · Dukungan Setelah Live",
            title: "Komitmen 12 Bulan",
            highlightText: "Grup WhatsApp khusus",
            description: "Setelah live, Anda tidak sendirian. Begitu website Anda live, kami bentuk grup WhatsApp khusus berisi tim Kaloweb dan tim Anda.",
            features: [
              { title: 'Akses langsung ke tim', desc: 'Developer, desainer, dan support kami ada di grup. Bukan bot, bukan tiket.', icon: 'Users' },
              { title: 'Balas cepat di jam kerja', desc: 'Biasanya di bawah 2 jam. Troubleshooting, banner promo, revisi kecil, tinggal chat.', icon: 'Clock' },
              { title: 'Pendampingan penuh', desc: 'Bukan cuma teknis. Kami bantu saran optimasi konversi dan SEO dasar selama 12 bulan.', icon: 'ShieldCheck' }
            ],
            chatHeader: "Support · Toko Anda",
            chatSubHeader: "Tim Kaloweb · 5 Anggota",
            chatMessages: [
              { sender: 'client', text: 'Halo tim, tolong bantu ganti banner utama dengan promo Ramadan ya. Materi saya kirim di grup.', time: '09:14' },
              { sender: 'kaloweb', text: 'Siap kak, kami kerjakan hari ini. Kami juga usulkan tambah badge “Promo Ramadan” di product card biar lebih konversi.', time: '09:16' },
              { sender: 'kaloweb', text: 'Draft banner sudah kami kirim, preview: tokoanda.com/preview', time: '11:02', isLink: true }
            ],
            stats: [
              { label: 'Status', value: 'Online sekarang' },
              { label: 'Durasi', value: 'Aktif 12 bulan' },
              { label: 'Biaya', value: 'Tanpa biaya tambahan' }
            ]
          }
        },
        {
          section_key: 'page_online_store_comparison',
          content: {
            tag: "§ 08 · Perbandingan",
            title: "Kaloweb vs Lainnya",
            description: "Marketplace cocok untuk awal, DIY cocok untuk hobi. Untuk bisnis yang ingin tumbuh, website sendiri selalu lebih ekonomis dalam 2-3 tahun.",
            tableHeaders: {
              col1: "Kriteria",
              col2: "Kaloweb",
              col2Highlight: "Pilihan Cerdas",
              col3: "Marketplace",
              col4: "DIY (Wix/WP)"
            },
            rows: [
              { label: '01 Biaya per transaksi', we: 'Gratis', mp: '5-12% potong', diy: 'Gratis' },
              { label: '02 Domain nama sendiri', we: 'Termasuk', mp: 'Tidak ada', diy: 'Biaya tambahan' },
              { label: '03 Data pembeli milik Anda', we: '100% milik Anda', mp: 'Dikunci platform', diy: 'Milik Anda' },
              { label: '04 Butuh skill teknis', we: 'Tidak, kami setup', mp: 'Tidak, tapi terbatas', diy: 'Tinggi' },
              { label: '05 Dukungan lokal', we: 'Tim WhatsApp', mp: 'Tiket & bot', diy: 'Forum / Inggris' },
              { label: '06 Siap ekspor & SEO', we: 'Termasuk', mp: 'Terbatas', diy: 'Setup manual' },
              { label: '07 Transparansi biaya', we: 'Per proyek', mp: 'Komisi terus', diy: 'Add-ons' }
            ]
          }
        },
        {
          section_key: 'page_online_store_testimonials',
          content: {
            tag: "§ 09 · Testimoni",
            title: "Cerita Dari Klien",
            description: "Hasil nyata, bukan cuma klaim.",
            testimonials: [
              { num: '§ 09 · 01', tag: 'Unggulan', quote: '“Setelah punya website sendiri, pembeli langsung checkout tanpa lewat reseller. Branding kami akhirnya terasa utuh dan pembeli repeat lebih mudah kami ajak ngobrol lewat WhatsApp.”', metric: 'Repeat order naik ± 38%', author: 'Tim Delisa Hijab', role: 'Supplier Hijab No. 1', site: 'delisahijab.co.id', since: 'Klien sejak 2022', cat: 'Fashion Muslim' },
              { num: '§ 09 · 02', quote: '“Kami butuh website yang bisa tampilkan video produk dengan rapi dan siap untuk pembeli internasional. Kaloweb menyiapkan semuanya, termasuk checkout QRIS & e-wallet, tanpa kami harus mikirin teknis.”', metric: 'Pembeli luar negeri naik 3x', author: 'Tim Sena Indonesia', role: 'Brand Gear Outdoor', site: 'senaindonesia.co.id', since: 'Klien sejak 2023', cat: 'Gear Outdoor' },
              { num: '§ 09 · 03', quote: '“Sebelumnya kami jualan di marketplace dan margin tergerus komisi. Sekarang Google yang membawa pembeli, data mereka masuk database kami, dan kami bisa kirim penawaran langsung.”', metric: 'Margin bersih +22%', author: 'Tim Tas Kamera ID', role: 'Toko Fotografi', site: 'taskamera.id', since: 'Klien sejak 2022', cat: 'Fotografi' }
            ],
            footerText: "Testimoni diverifikasi dari pemilik website yang kami kerjakan. Website mereka bisa Anda buka di link masing-masing."
          }
        },
        {
          section_key: 'page_online_store_faq',
          content: {
            tag: "§ 10 · Pertanyaan",
            title: "Jawaban untuk hal yang",
            highlightText: "paling sering ditanya.",
            description: "Tidak ketemu jawabannya? Chat tim kami lewat WhatsApp, biasanya dibalas di bawah 2 jam kerja.",
            boxSubtitle: "Masih ragu? Tanya langsung tim kami.",
            boxDesc: "Gratis, tanpa paksaan, balas di bawah 2 jam kerja.",
            buttonText: "Tanya via WhatsApp",
            buttonUrl: "https://wa.me/62895406181407",
            faqs: [
              { q: 'Berapa lama pengerjaan website toko online saya?', a: 'Rata-rata 3-4 minggu dari konsultasi awal sampai website live, tergantung jumlah produk dan tingkat customisasi. Mockup dikirim di minggu pertama, revisi dan pengembangan di minggu 2-3, review final dan go-live di minggu ke-4. Timeline pasti kami kirim setelah chat WhatsApp dan review produk Anda.' },
              { q: 'Apakah saya perlu paham coding atau teknis?', a: 'Sama sekali tidak. Kami menangani seluruh setup teknis dari domain, hosting, integrasi pembayaran, hingga optimasi kecepatan. Anda cukup mengelola pesanan lewat dashboard yang sangat user-friendly. Kami berikan panduan lengkap setelah website live.' },
              { q: 'Bisakah website saya terintegrasi dengan Shopee, Tokopedia, atau marketplace lain?', a: 'Tentu. Kami bisa membantu mengarahkan traffic dari profil marketplace atau Instagram Anda langsung ke website sendiri guna menghindari komisi transaksi yang makin mahal.' },
              { q: 'Bagaimana kalau nanti saya mau ubah desain atau tambah fitur?', a: 'Anda punya akses penuh ke WhatsApp group tim kami selama 12 bulan. Untuk perubahan banner promo atau revisi kecil sudah termasuk dalam layanan. Untuk penambahan fitur besar, bisa diskusikan di grup dan akan kami beri penawaran khusus klien.' },
              { q: 'Apakah metode pembayaran di Indonesia sudah didukung?', a: 'Ya, sistem checkout kami sudah siap pakai yang terhubung ke Midtrans/Xendit/Otomatis khusus UMKM untuk menerima pembayaran via BCA, Mandiri, BRI, QRIS, OVO, GoPay, DANA, dan lainnya secara real-time.' },
              { q: 'Kalau saya belum punya produk banyak, apakah sudah pantas punya website?', a: 'Justru saat produk masih sedikit adalah waktu terbaik membangun kredibilitas. Website sendiri membantu Anda terlihat profesional sejak hari pertama, sehingga calon pembeli tidak ragu untuk checkout.' },
              { q: 'Apakah ada biaya tersembunyi setelah website live?', a: 'Tidak ada. Penawaran awal kami mencakup perizinan domain, hosting tahun pertama, sertifikat keamanan SSL, integrasi pembayaran, dan bantuan WhatsApp grup selama 12 bulan pertama.' },
              { q: 'Bagaimana sistem perpanjangan tahun berikutnya?', a: 'Anda hanya perlu memperpanjang biaya Domain & Hosting di tahun kedua (mulai ± Rp 1.5 - 2jt / tahun). Kami akan mengingatkan 30 hari sebelum masa berlaku habis untuk memastikan toko Anda tidak pernah offline.' },
              { q: 'Ada garansi kalau hasil website tidak sesuai harapan?', a: 'Kami bekerja secara iteratif. Kami tidak lanjut ke tahap pengerjaan sebelum Anda menyetujui Mockup Desain (minggu-1). Kepuasan Anda adalah prioritas kami.' }
            ]
          }
        },
        {
          section_key: 'home_cta',
          content: {
            title: "Siap Membangun Platform Digital Anda?",
            description: "Konsultasikan kebutuhan bisnis Anda secara gratis dengan tim ahli kami.",
            primaryButtonText: "Konsultasi Gratis",
            secondaryButtonText: "Lihat Harga",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
          }
        },
        // ── Halaman Layanan ──────────────────────────────────────
        {
          section_key: 'page_services_hero',
          content: {
            heading1: "Solusi Digital.",
            heading2: "Layanan Professional.",
            description: "Dari pembuatan website hingga pengembangan aplikasi, kami menghadirkan teknologi yang membantu UMKM dan Brand tumbuh lebih cepat di dunia digital.",
            buttonText: "MULAI SEKARANG",
            backgroundImage: "/6933ffb5c1c55ded9d8218fd_ai-ct-img.avif"
          }
        },
        {
          section_key: 'page_services_grid',
          content: {
            tag: "LAYANAN KAMI",
            title: "Solusi IT komprehensif dan inovasi untuk UMKM",
            description: "Apakah Anda baru memulai atau ingin meningkatkan skala bisnis, kami membantu Anda bergerak lebih cepat dengan infrastruktur digital yang solid.",
            items: [
              { title: 'Website Development', desc: 'Kami membangun website modern, responsif, dan SEO-friendly yang dirancang khusus untuk meningkatkan kredibilitas brand Anda.', icon: 'Zap', asset: '/69a4fc504463d68671c1b91a_Frame 2147226974.avif' },
              { title: 'Mobile App Solutions', desc: 'Pengembangan aplikasi mobile kustom untuk iOS dan Android yang memberikan pengalaman pengguna terbaik bagi pelanggan Anda.', icon: 'Briefcase', asset: '/mobile ap.png' },
              { title: 'UI/UX & Branding', desc: 'Menciptakan identitas visual yang kuat dan desain antarmuka yang intuitif untuk memastikan brand UMKM Anda tampil profesional dan berkesan.', icon: 'Database', asset: '/699ccbb16ac8c11d437d0bb5_cta.webp' }
            ]
          }
        },
        {
          section_key: 'page_services_whyus',
          content: {
            tag: "MENGAPA KAMI",
            title: "Solusi digital yang",
            highlightText: "berdampak nyata",
            description: "Pendekatan kami menggabungkan kreativitas desain, keahlian teknis, dan pemahaman bisnis untuk membantu UMKM memiliki alat digital yang mereka butuhkan untuk bersaing.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
          }
        },
        // ── Halaman Tentang Kami ─────────────────────────────────
        {
          section_key: 'page_about_hero',
          content: {
            badge: "Dipercaya 150+ UMKM",
            heading: "Membantu UMKM Naik Kelas Lewat Teknologi",
            description: "Kaloweb hadir sebagai mitra digital yang berdedikasi untuk mentransformasi UMKM dan Brand lokal menjadi entitas digital yang profesional dan kompetitif.",
            buttonText: "HUBUNGI KAMI",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
            cardLabel: "Growth Analytics",
            cardValue: "+$12,400"
          }
        },
        {
          section_key: 'page_about_statement',
          content: {
            tag: "TENTANG KAMI",
            statement: "Partner konsultasi digital yang berdedikasi membangun UMKM",
            highlight: "lebih cerdas",
            suffix: "dan lebih profesional.",
            badgeText: "Partner Digital Terpercaya"
          }
        },
        {
          section_key: 'page_about_journey',
          content: {
            tag: "PERJALANAN KAMI",
            title: "Langkah kami mewujudkan transformasi digital UMKM",
            description: "Dimulai dari misi untuk mendigitalkan produk lokal, kami terus berkembang menjadi solusi satu atap untuk segala kebutuhan digital UMKM Indonesia.",
            items: [
              { year: '2017', desc: 'Kami memulai sebagai tim konsultan kecil yang fokus pada optimasi website UMKM.' },
              { year: '2019', desc: 'Ekspansi layanan ke pengembangan aplikasi mobile kustom untuk brand berkembang.' },
              { year: '2021', desc: 'Mengintegrasikan solusi AI untuk membantu efisiensi operasional bisnis mitra kami.' },
              { year: '2023', desc: 'Menjadi partner digital terpercaya bagi lebih dari 150+ UMKM di seluruh Indonesia.' }
            ]
          }
        },
        // ── Global Footer ────────────────────────────────────────
        {
          section_key: 'global_footer',
          content: {
            brand: "Kaloweb",
            tagline: "Membantu UMKM dan Brand membangun eksistensi digital melalui pembuatan website dan aplikasi profesional yang berorientasi pada pertumbuhan.",
            copyright: "© 2026 Kaloweb INC. ALL RIGHTS RESERVED.",
            whatsapp: "https://wa.me/62895406181407",
            email: "mailto:hello@Kaloweb.id",
            instagram: "https://instagram.com/Kaloweb.id",
            linkedin: "https://linkedin.com/company/Kaloweb",
            menuLinks: [
              { name: 'Beranda', href: '/' },
              { name: 'Layanan', href: '/layanan' },
              { name: 'Portofolio', href: '/portfolio' },
              { name: 'Tentang Kami', href: '/tentang-kami' },
              { name: 'Blog', href: '/blog' }
            ],
            infoLinks: [
              { name: 'FAQ', href: '#' },
              { name: 'Kebijakan Privasi', href: '#' },
              { name: 'Syarat & Ketentuan', href: '#' }
            ]
          }
        }
      ];

      const { error } = await supabase.from('site_content').upsert(initialData, {
        onConflict: 'section_key',
        ignoreDuplicates: false
      });
      if (error) throw error;

      await fetchSections();
      await refreshContent();
      alert('Data awal berhasil di-generate!');
    } catch (err) {
      console.error('Error seeding data:', err);
      alert('Gagal men-generate data awal. Pastikan tabel site_content sudah ada.');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (key: string) => {
    const section = sections.find(s => s.section_key === key);
    if (section) {
      setActiveSection(key);
      setEditingContent(JSON.parse(JSON.stringify(section.content))); // Deep copy
    }
  };

  const handleUpdateField = (path: string, value: any) => {
    const newContent = { ...editingContent };
    const parts = path.split('.');
    let current = newContent;

    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;

    setEditingContent(newContent);
  };

  const handleSave = async () => {
    if (!activeSection) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_content')
        .update({ content: editingContent, updated_at: new Date().toISOString() })
        .eq('section_key', activeSection);

      if (error) throw error;

      // Update local sections state
      setSections(sections.map(s =>
        s.section_key === activeSection ? { ...s, content: editingContent } : s
      ));

      await refreshContent();
      alert('Konten berhasil disimpan!');
    } catch (err) {
      console.error('Error saving content:', err);
      alert('Gagal menyimpan konten.');
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File, path: string) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      handleUpdateField(path, data.publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengunggah gambar.');
    } finally {
      setUploading(false);
    }
  };

  const renderField = (path: string, key: string, value: any) => {
    if (value === null || value === undefined) return null;

    const isImageField = typeof value === 'string' && (key.toLowerCase().includes('image') || key.toLowerCase().includes('img') || key.toLowerCase().includes('hiro') || key.toLowerCase().includes('logo') || key.toLowerCase().includes('icon'));

    if (isImageField) {
      return (
        <div className="relative group">
          <div className="aspect-video rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden mb-3 relative">
            {value ? (
              <img src={value as string} alt={key} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <ImageIcon size={40} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-xs font-bold">Ubah Gambar</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, path);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <input
            type="text"
            value={value as string}
            onChange={(e) => handleUpdateField(path, e.target.value)}
            className="w-full h-12 px-5 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent outline-none text-xs font-medium transition-all"
            placeholder="URL Gambar..."
          />
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleUpdateField(path, e.target.value)}
          rows={3}
          className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-accent outline-none text-sm font-medium transition-all resize-none"
        />
      );
    }

    if (typeof value === 'boolean') {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleUpdateField(path, e.target.checked)}
            className="w-5 h-5 rounded text-accent focus:ring-accent"
          />
          <span className="text-sm font-medium text-gray-600">Aktifkan</span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => handleUpdateField(path, parseFloat(e.target.value))}
          className="w-full h-12 px-5 rounded-xl bg-gray-50 border border-gray-200 focus:border-accent outline-none text-xs font-medium transition-all"
        />
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="space-y-4 p-4 border border-gray-200 rounded-2xl bg-gray-50/50">
          {value.map((item, idx) => (
            <div key={idx} className="relative p-4 pt-8 border border-gray-200 bg-white rounded-xl shadow-sm">
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    const newArr = [...value];
                    newArr.splice(idx, 1);
                    handleUpdateField(path, newArr);
                  }}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus Item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute top-2 left-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Item {idx + 1}</span>
              </div>
              {typeof item === 'object' && item !== null ? (
                <div className="grid grid-cols-1 gap-4 mt-2">
                  {Object.entries(item).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{subKey.replace(/([A-Z])/g, ' $1')}</label>
                      {renderField(`${path}.${idx}.${subKey}`, subKey, subValue)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2">
                  {renderField(`${path}.${idx}`, key, item)}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              const newArr = [...value];
              const template = value.length > 0 ?
                (typeof value[0] === 'object' ? Object.keys(value[0]).reduce((acc, k) => ({ ...acc, [k]: typeof value[0][k] === 'string' ? '' : typeof value[0][k] === 'number' ? 0 : typeof value[0][k] === 'boolean' ? false : [] }), {}) : '')
                : '';
              newArr.push(template);
              handleUpdateField(path, newArr);
            }}
            className="flex items-center justify-center w-full gap-2 text-xs font-bold text-accent bg-accent/10 px-4 py-3 rounded-xl hover:bg-accent/20 transition-colors"
          >
            <Plus size={16} /> Tambah Item
          </button>
        </div>
      );
    }

    if (typeof value === 'object') {
      return (
        <div className="grid grid-cols-1 gap-4 p-5 border border-gray-200 rounded-2xl bg-white shadow-sm">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey}>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">{subKey.replace(/([A-Z])/g, ' $1')}</label>
              {renderField(`${path}.${subKey}`, subKey, subValue)}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="text-xs text-red-500">Tipe data tidak didukung</div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="animate-spin text-accent" size={40} />
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Konten...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Manajemen Konten</h1>
          <p className="text-gray-500 text-sm font-medium">Edit teks dan gambar di seluruh halaman website.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedData}
            disabled={loading}
            className="px-6 h-14 bg-gray-100 text-black rounded-2xl flex items-center gap-3 font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
            title="Sinkronisasi section baru ke database"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
            Sync Data
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !activeSection}
            className="px-8 h-14 bg-black text-white rounded-2xl flex items-center gap-3 font-bold hover:bg-accent hover:text-black transition-all shadow-xl shadow-black/10 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Simpan Perubahan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Sections List */}
        <div className="lg:col-span-1 space-y-6">
          {(() => {
            const labelMap: Record<string, string> = {
              home_hero: 'Hero Banner',
              home_services: 'Layanan',
              home_about: 'Tentang Kami',
              home_expertise: 'Keahlian',
              home_faq: 'FAQ',
              home_pricing: 'Harga',
              home_other_services: 'Layanan Lainnya',
              home_cta: 'Call to Action',
              page_custom_service_hero: 'Hero Banner',
              page_custom_service_solutions: 'Solusi',
              page_custom_service_challenges: 'Tantangan',
              page_custom_service_capabilities: 'Kapabilitas',
              page_custom_service_technology: 'Teknologi',
              page_custom_service_portfolio: 'Portofolio',
              page_custom_service_workflow: 'Alur Kerja',
              page_custom_service_support: 'Dukungan Post-Live',
              page_custom_service_comparison: 'Perbandingan',
              page_custom_service_testimonials: 'Testimoni',
              page_custom_service_faq: 'FAQ',
              page_online_store_hero: 'Hero Banner',
              page_online_store_platforms: 'Platform',
              page_online_store_problems: 'Masalah',
              page_online_store_solutions: 'Solusi',
              page_online_store_portfolio: 'Portofolio',
              page_online_store_workflow: 'Alur Kerja',
              page_online_store_support: 'Dukungan Post-Live',
              page_online_store_comparison: 'Perbandingan',
              page_online_store_testimonials: 'Testimoni',
              page_online_store_faq: 'FAQ',
              page_services_hero: 'Hero Banner',
              page_services_grid: 'Grid Layanan',
              page_services_whyus: 'Mengapa Kami',
              page_about_hero: 'Hero Banner',
              page_about_statement: 'Pernyataan',
              page_about_journey: 'Perjalanan Kami',
              global_footer: 'Footer',
            };

            const groups = [
              {
                label: '🏠 Homepage',
                prefix: 'home_',
                color: 'text-blue-500',
                bg: 'bg-blue-50',
              },
              {
                label: '⚙️ Layanan Custom',
                prefix: 'page_custom_service_',
                color: 'text-purple-500',
                bg: 'bg-purple-50',
              },
              {
                label: '🛒 Toko Online',
                prefix: 'page_online_store_',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                label: '📋 Halaman Layanan',
                prefix: 'page_services_',
                color: 'text-orange-500',
                bg: 'bg-orange-50',
              },
              {
                label: '🏢 Tentang Kami',
                prefix: 'page_about_',
                color: 'text-teal-600',
                bg: 'bg-teal-50',
              },
              {
                label: '🌐 Global',
                prefix: 'global_',
                color: 'text-gray-500',
                bg: 'bg-gray-50',
              },
            ];

            return groups.map(group => {
              const groupSections = sections.filter(s => s.section_key.startsWith(group.prefix));
              if (groupSections.length === 0) return null;
              return (
                <div key={group.prefix}>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ml-4 mb-2 ${group.color}`}>
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {groupSections.map((section) => (
                      <button
                        key={section.section_key}
                        onClick={() => handleSectionChange(section.section_key)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${activeSection === section.section_key
                            ? 'bg-black text-white shadow-lg'
                            : `bg-white text-gray-500 hover:${group.bg} border border-gray-100`
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <Layout size={14} />
                          <span className="text-xs font-bold">
                            {labelMap[section.section_key] || section.section_key.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <ChevronRight size={14} className={activeSection === section.section_key ? 'text-accent' : 'text-gray-300'} />
                      </button>
                    ))}
                  </div>
                </div>
              );
            });
          })()}

          {sections.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-400 font-medium mb-4">Belum ada data section di database.</p>
              <button
                onClick={fetchSections}
                className="text-[10px] font-bold uppercase tracking-widest text-accent flex items-center gap-2 mx-auto mb-4"
              >
                <RefreshCw size={12} /> Refresh
              </button>
              <button
                onClick={handleSeedData}
                className="text-[10px] font-bold uppercase tracking-widest text-white bg-black px-4 py-2 rounded-full flex items-center gap-2 mx-auto hover:bg-gray-800 transition-colors"
              >
                <Plus size={12} /> Generate Data Awal
              </button>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeSection && editingContent ? (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-10 space-y-10"
              >
                <div className="flex items-center gap-4 pb-6 border-b border-gray-50">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Type size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl font-display font-bold text-black capitalize">
                        {activeSection.startsWith('home_') ? activeSection.replace('home_', '').replace(/_/g, ' ')
                          : activeSection.startsWith('page_custom_service_') ? activeSection.replace('page_custom_service_', '').replace(/_/g, ' ')
                            : activeSection.startsWith('page_online_store_') ? activeSection.replace('page_online_store_', '').replace(/_/g, ' ')
                              : activeSection.startsWith('page_services_') ? activeSection.replace('page_services_', '').replace(/_/g, ' ')
                                : activeSection.startsWith('page_about_') ? activeSection.replace('page_about_', '').replace(/_/g, ' ')
                                  : activeSection.startsWith('global_') ? activeSection.replace('global_', '').replace(/_/g, ' ')
                                    : activeSection.replace(/_/g, ' ')}
                      </h2>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${activeSection.startsWith('home_') ? 'bg-blue-50 text-blue-600' :
                          activeSection.startsWith('page_custom_service_') ? 'bg-purple-50 text-purple-600' :
                            activeSection.startsWith('page_online_store_') ? 'bg-green-50 text-green-700' :
                              activeSection.startsWith('page_services_') ? 'bg-orange-50 text-orange-600' :
                                activeSection.startsWith('page_about_') ? 'bg-teal-50 text-teal-700' :
                                  activeSection.startsWith('global_') ? 'bg-gray-100 text-gray-600' :
                                    'bg-gray-100 text-gray-500'
                        }`}>
                        {activeSection.startsWith('home_') ? '🏠 Homepage' :
                          activeSection.startsWith('page_custom_service_') ? '⚙️ Layanan Custom' :
                            activeSection.startsWith('page_online_store_') ? '🛒 Toko Online' :
                              activeSection.startsWith('page_services_') ? '📋 Halaman Layanan' :
                                activeSection.startsWith('page_about_') ? '🏢 Tentang Kami' :
                                  activeSection.startsWith('global_') ? '🌐 Global' : 'Lainnya'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-mono">{activeSection}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {Object.entries(editingContent).map(([key, value]) => (
                    <div key={key} className="space-y-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-black ml-2 border-l-4 border-accent pl-2">{key.replace(/([A-Z])/g, ' $1')}</label>
                      {renderField(key, key, value)}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <Layout size={48} className="text-gray-200 mb-4" />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Pilih section untuk mulai mengedit</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
