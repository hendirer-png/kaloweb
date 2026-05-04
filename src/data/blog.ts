export interface BlogPost {
  id: string;
  title: string;
  shortDesc: string;
  img: string;
  date: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'kredibilitas-umkm',
    title: 'Pentingnya Website untuk Kredibilitas UMKM di Era Digital',
    shortDesc: 'Bagaimana kehadiran digital dapat mengubah persepsi konsumen terhadap bisnis kecil Anda.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    date: '15 April 2024',
    author: 'Admin Kaloweb',
    content: `
      <p>Di era digital saat ini, konsumen cenderung mencari informasi produk atau layanan melalui internet sebelum melakukan pembelian. Memiliki website bukan lagi sekadar pilihan bagi UMKM, melainkan kebutuhan mendasar untuk membangun kepercayaan.</p>
      
      <p>Sebuah website profesional memberikan kesan bahwa bisnis Anda serius dan terpercaya. Tanpa website, bisnis Anda mungkin terlewatkan oleh jutaan calon pelanggan yang mengandalkan mesin pencari seperti Google.</p>
      
      <h3>1. Aksesibilitas 24/7</h3>
      <p>Website memungkinkan pelanggan melihat produk Anda kapan saja, bahkan saat toko fisik sedang tutup. Ini memberikan kenyamanan maksimal bagi konsumen yang sibuk.</p>
      
      <h3>2. Memperluas Jangkauan Pasar</h3>
      <p>Dengan website, lokasi geografis bukan lagi penghalang. UMKM di pelosok daerah pun bisa mendapatkan pelanggan dari kota besar atau bahkan luar negeri.</p>
      
      <h3>3. Biaya Marketing Lebih Efisien</h3>
      <p>Dibandingkan dengan mencetak brosur atau menyewa papan iklan, mengelola website jauh lebih hemat biaya dalam jangka panjang dengan hasil yang terukur.</p>
    `
  },
  {
    id: 'aplikasi-mobile-2024',
    title: 'Mengapa Bisnis Anda Membutuhkan Aplikasi Mobile di Tahun 2024',
    shortDesc: 'Aplikasi bukan hanya untuk perusahaan besar. Pelajari manfaatnya untuk retensi pelanggan.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    date: '10 April 2024',
    author: 'Tim Teknis',
    content: `
      <p>Aplikasi mobile telah menjadi bagian tak terpisahkan dari kehidupan sehari-hari. Bagi bisnis, ini adalah cara tercepat untuk menjangkau pelanggan langsung di genggaman mereka.</p>
      
      <p>Aplikasi mobile memungkinkan interaksi yang lebih personal melalui notifikasi push, program loyalitas, dan kemudahan transaksi yang lebih cepat dibandingkan mobile web.</p>
      
      <h3>Retensi Pelanggan Lebih Tinggi</h3>
      <p>Pelanggan yang mengunduh aplikasi Anda adalah pelanggan setia. Anda bisa mengirimkan promo khusus langsung ke HP mereka, yang meningkatkan kemungkinan pembelian ulang.</p>
    `
  },
  {
    id: 'strategi-branding-digital',
    title: 'Strategi Branding Digital untuk Menarik Pelanggan Baru',
    shortDesc: 'Tips praktis membangun identitas brand yang kuat di media sosial dan website.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    date: '05 April 2024',
    author: 'Kreatif Kaloweb',
    content: `
      <p>Branding lebih dari sekadar logo. Ini tentang perasaan yang muncul saat orang mendengar nama bisnis Anda. Di dunia digital, branding harus konsisten di setiap titik sentuh (touchpoints).</p>
      
      <p>Mulai dari pemilihan warna, gaya bahasa di caption media sosial, hingga kecepatan loading website Anda, semuanya berkontribusi pada citra brand Anda.</p>
    `
  }
];
