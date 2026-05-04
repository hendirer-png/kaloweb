import { useContent } from '../../lib/ContentContext';

export default function Footer() {
  const { getContent } = useContent();
  const d = getContent('global_footer');

  const brand = d?.brand || 'Kaloweb';
  const tagline = d?.tagline || 'Membantu UMKM dan Brand membangun eksistensi digital melalui pembuatan website dan aplikasi profesional yang berorientasi pada pertumbuhan.';
  const copyright = d?.copyright || '© 2026 Kaloweb INC. ALL RIGHTS RESERVED.';
  const whatsapp = d?.whatsapp || '#';
  const email = d?.email || '#';
  const instagram = d?.instagram || '#';
  const linkedin = d?.linkedin || '#';

  const menuLinks = d?.menuLinks || [
    { name: 'Beranda', href: '/' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Portofolio', href: '/portfolio' },
    { name: 'Tentang Kami', href: '/tentang-kami' },
    { name: 'Blog', href: '/blog' },
  ];

  const contactLinks = [
    { name: 'WhatsApp', href: whatsapp },
    { name: 'Email', href: email },
    { name: 'Instagram', href: instagram },
    { name: 'LinkedIn', href: linkedin },
  ];

  const infoLinks = d?.infoLinks || [
    { name: 'FAQ', href: '#' },
    { name: 'Kebijakan Privasi', href: '#' },
    { name: 'Syarat & Ketentuan', href: '#' },
  ];

  return (
    <footer className="bg-black text-white pt-14 sm:pt-20 md:pt-24 pb-8 md:pb-12 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 lg:gap-24 mb-12 md:mb-24">
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6 md:mb-8">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-accent rounded-sm rotate-45" />
              <span className="font-display font-extrabold text-xl md:text-2xl tracking-tighter">{brand}</span>
            </a>
            <p className="text-white/60 leading-relaxed mb-10 text-sm">{tagline}</p>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Subscribe our newsletter</p>
              <div className="flex gap-2 sm:gap-4">
                <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-full py-3 md:py-4 px-4 md:px-6 focus:outline-none focus:border-accent flex-grow text-xs md:text-sm" />
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent text-black rounded-full flex items-center justify-center shrink-0 text-sm">→</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:col-span-3">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Menu</h4>
              {menuLinks.map((link: any) => (
                <a key={link.name} href={link.href} className="block text-white/60 hover:text-accent transition-colors text-sm">{link.name}</a>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Kontak</h4>
              {contactLinks.map((link) => (
                <a key={link.name} href={link.href} className="block text-white/60 hover:text-accent transition-colors text-sm">{link.name}</a>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Informasi</h4>
              {infoLinks.map((link: any) => (
                <a key={link.name} href={link.href} className="block text-white/60 hover:text-accent transition-colors text-sm">{link.name}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t border-white/10 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Style Guide</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
            <a href="#" className="hover:text-white transition-colors">Licensing</a>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
