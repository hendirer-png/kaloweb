import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
   Users,
   TrendingUp,
   Activity,
   ArrowUpRight,
   CheckCircle2,
   Clock,
   MessageSquare,
   Briefcase,
   FileText,
   Package,
   Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Tag from '../../components/ui/Tag';

export default function DashboardOverview() {
   const [stats, setStats] = useState([
      { name: 'Total Proyek', value: '0', change: 'Loading...', icon: Briefcase, color: 'accent', table: 'portfolio' },
      { name: 'Pesanan Baru', value: '0', change: 'Loading...', icon: Package, color: 'blue', table: 'orders' },
      { name: 'Testimoni', value: '0', change: 'Loading...', icon: MessageSquare, color: 'green', table: 'testimonials' },
      { name: 'Blog Posts', value: '0', change: 'Loading...', icon: FileText, color: 'purple', table: 'blog_posts' },
   ]);
   const [recentActivities, setRecentActivities] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchDashboardData();
   }, []);

   const fetchDashboardData = async () => {
      setLoading(true);
      try {
         // Fetch Counts
         const [portfolioCount, ordersCount, testimonialsCount, blogsCount] = await Promise.all([
            supabase.from('portfolio').select('*', { count: 'exact', head: true }),
            supabase.from('orders').select('*', { count: 'exact', head: true }),
            supabase.from('testimonials').select('*', { count: 'exact', head: true }),
            supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
         ]);

         setStats([
            { name: 'Total Proyek', value: (portfolioCount.count || 0).toString(), change: 'Live', icon: Briefcase, color: 'accent', table: 'portfolio' },
            { name: 'Pesanan Baru', value: (ordersCount.count || 0).toString(), change: 'Last Month', icon: Package, color: 'blue', table: 'orders' },
            { name: 'Testimoni', value: (testimonialsCount.count || 0).toString(), change: 'Published', icon: MessageSquare, color: 'green', table: 'testimonials' },
            { name: 'Blog Posts', value: (blogsCount.count || 0).toString(), change: 'Active', icon: FileText, color: 'purple', table: 'blog_posts' },
         ]);

         // Fetch Recent Orders as Activity
         const { data: recentOrders } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(4);

         if (recentOrders) {
            setRecentActivities(recentOrders.map(o => ({
               id: o.id,
               type: 'project',
               title: `Pesanan: ${o.domain_name}`,
               status: o.status,
               time: new Date(o.created_at).toLocaleDateString()
            })));
         }

      } catch (err) {
         console.error('Error dashboard:', err);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="space-y-10 pb-20">
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">
                  Halo, <span className="text-black/30 italic">Super Admin</span> 👋
               </h1>
               <p className="text-gray-500 text-sm font-medium">Ini ringkasan ekosistem Kaloweb hari ini.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Terakhir Update</p>
                  <p className="text-xs font-bold text-black">Hari ini, 10:45 AM</p>
               </div>
               <div className="p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <Activity size={20} className="text-accent" />
               </div>
            </div>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
               >
                  <div className="flex items-center justify-between mb-8">
                     <div className={`p-4 rounded-2xl bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors`}>
                        <stat.icon size={24} />
                     </div>
                     <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                        {stat.change} <ArrowUpRight size={10} />
                     </div>
                  </div>
                  <div>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.name}</p>
                     <h3 className="text-3xl font-display font-bold text-black tracking-tight">{stat.value}</h3>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Main Sections */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Activities */}
            <div className="lg:col-span-8">
               <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 overflow-hidden">
                  <div className="flex items-center justify-between mb-10">
                     <h2 className="text-xl font-display font-bold tracking-tight text-black flex items-center gap-3">
                        Aktivitas Terbaru
                        <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[10px] text-black">4</span>
                     </h2>
                     <button className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Lihat Semua</button>
                  </div>

                  <div className="space-y-6">
                     {loading ? (
                        <div className="py-10 flex flex-col items-center gap-4">
                           <Loader2 size={32} className="animate-spin text-accent" />
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sinkronisasi...</p>
                        </div>
                     ) : recentActivities.length > 0 ? (
                        recentActivities.map((activity, i) => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                              <div className="flex items-center gap-6">
                                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${activity.type === 'project' ? 'bg-black' :
                                       activity.type === 'testimonial' ? 'bg-accent text-black' : 'bg-gray-200 text-black'
                                    }`}>
                                    {activity.type === 'project' ? <Briefcase size={20} /> :
                                       activity.type === 'testimonial' ? <MessageSquare size={20} /> : <FileText size={20} />}
                                 </div>
                                 <div>
                                    <h4 className="text-sm font-bold text-black mb-1 group-hover:text-accent transition-colors">{activity.title}</h4>
                                    <p className="text-[10px] text-gray-400 flex items-center gap-2">
                                       <Clock size={10} /> {activity.time}
                                    </p>
                                 </div>
                              </div>
                              <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${activity.status === 'Live' || activity.status === 'Approved' || activity.status === 'Published' || activity.status === 'Paid'
                                    ? 'bg-green-500/10 text-green-500'
                                    : 'bg-orange-500/10 text-orange-500'
                                 }`}>
                                 {activity.status}
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="py-10 text-center text-gray-400 text-xs font-medium">Belum ada aktivitas terekam.</p>
                     )}
                  </div>
               </div>
            </div>

            {/* Quick Links / Summary */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-black text-white rounded-[3rem] p-10 overflow-hidden relative">
                  <div className="relative z-10">
                     <Tag className="bg-white/10 text-accent border-white/10 mb-6 lowercase">SLA Status</Tag>
                     <h3 className="text-2xl font-display font-medium mb-4 leading-tight">Sistem Berjalan <br /> Optimal.</h3>
                     <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                           <span>Database</span>
                           <span className="text-accent text-xs">Healthy</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="w-full h-full bg-accent animate-pulse" />
                        </div>
                     </div>
                     <button className="w-full p-4 rounded-2xl bg-white text-black text-xs font-bold hover:bg-accent transition-all flex items-center justify-center gap-2">
                        Buka Logs <Activity size={16} />
                     </button>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full -z-0 translate-x-1/2 -translate-y-1/2" />
               </div>

               <div className="bg-white rounded-[3.5rem] border border-gray-100 p-10 shadow-sm text-center">
                  <MessageSquare size={32} className="mx-auto text-accent mb-6" />
                  <h4 className="text-lg font-display font-bold mb-2">Butuh Bantuan?</h4>
                  <p className="text-xs text-gray-500 mb-8 max-w-[200px] mx-auto leading-relaxed">Tim engineering standby 24/7 untuk bantuan teknis dashboard.</p>
                  <button className="w-full text-[10px] font-bold uppercase tracking-widest p-4 rounded-2xl border border-gray-100 hover:bg-black hover:text-white transition-all">Support Desk</button>
               </div>
            </div>
         </div>
      </div>
   );
}
