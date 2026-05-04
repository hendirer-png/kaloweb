import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Package,
  Tag,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Pesanan', icon: Package, path: '/admin/orders' },
    { name: 'Portofolio', icon: Briefcase, path: '/admin/portfolio' },
    { name: 'Testimoni', icon: MessageSquare, path: '/admin/testimonials' },
    { name: 'Blog Posts', icon: FileText, path: '/admin/blog' },
    { name: 'Daftar Harga', icon: Tag, path: '/admin/pricing' },
    { name: 'Tim Kami', icon: Users, path: '/admin/team' },
    { name: 'Konten Website', icon: FileText, path: '/admin/content' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile Sidebar Back-drop */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-black text-white p-6 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-black">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold tracking-tight">Admin CMS</h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-white/40">Kaloweb v1.0</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-grow space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center justify-between p-4 rounded-2xl group transition-all
                    ${isActive
                      ? 'bg-accent text-black font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-500 group-hover:text-accent transition-colors'} />
                    <span className="text-sm tracking-tight">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-4 p-2">
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin+Web&background=F7FF58&color=000" alt="Admin" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Super Admin</p>
                <p className="text-[10px] text-gray-400">nopianh57@gmail.com</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-2 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-black"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 group">
              <Search size={16} className="text-gray-400 group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="bg-transparent border-none outline-none text-xs font-medium w-48 focus:w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-black transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-gray-100" />
            <button className="flex items-center gap-2 group">
              <div className="text-right">
                <p className="text-[10px] font-bold text-black group-hover:text-accent transition-colors">Lihat Site</p>
                <p className="text-[9px] text-gray-400">webekspor.com</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                <ChevronRight size={14} />
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-grow overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}
