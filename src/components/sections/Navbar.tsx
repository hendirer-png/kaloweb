import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { useContent } from '../../lib/ContentContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Layanan', path: '/layanan' },
  { name: 'Tentang Kami', path: '/tentang-kami' },
  { name: 'Portofolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { getContent } = useContent();
  const footerData = getContent('global_footer');
  const brand = footerData?.brand || 'Kaloweb';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (path: string) => {
    if (window.location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Main Navbar Bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-black/10' : 'py-6 bg-transparent'
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2 z-10"
          >
            <div className="w-5 h-5 bg-accent rounded-sm rotate-45 shrink-0" />
            <span
              className={`font-display font-extrabold text-xl tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-black' : menuOpen ? 'text-black' : 'text-white'
                }`}
            >
              {brand}
            </span>
          </Link>

          {/* Desktop Menu (lg+) */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleLinkClick(item.path)}
                className={`font-display font-bold text-xs uppercase tracking-widest transition-colors duration-300 hover:text-accent ${isScrolled ? 'text-black' : 'text-white'
                  } ${location.pathname === item.path ? 'text-accent' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA — hidden on small screens, visible md+ */}
            <div className="hidden md:block">
              <Button 
                variant="primary" 
                className="text-xs uppercase tracking-widest px-6 py-2.5"
                onClick={() => { window.open('https://wa.me/62895406181407?text=Halo!%20Saya%20tertarik%20dengan%20layanan%20Kaloweb.', '_blank'); }}
              >
                Hubungi Kami
              </Button>
            </div>

            {/* Hamburger — visible below lg */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Tutup Menu' : 'Buka Menu'}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled || menuOpen ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'
                }`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile / iPad Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-white shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <Link to="/" onClick={() => handleLinkClick('/')} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-accent rounded-sm rotate-45" />
                  <span className="font-display font-extrabold text-lg tracking-tighter text-black">{brand}</span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Tutup Menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleLinkClick(item.path)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-widest transition-all duration-200 ${location.pathname === item.path
                          ? 'bg-accent text-black'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                        }`}
                    >
                      {location.pathname === item.path && (
                        <div className="w-1.5 h-1.5 rounded-sm bg-black rotate-45 shrink-0" />
                      )}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA at bottom */}
              <div className="px-6 py-6 border-t border-gray-100">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Button
                    variant="primary"
                    className="w-full text-sm uppercase tracking-widest justify-center py-3"
                    onClick={() => { window.open('https://wa.me/62895406181407?text=Halo!%20Saya%20tertarik%20dengan%20layanan%20Kaloweb.', '_blank'); }}
                  >
                    Hubungi Kami
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
