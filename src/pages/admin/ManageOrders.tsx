import { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Download,
  Smartphone,
  Loader2,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';

export default function ManageOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      if (selectedOrder?.id === id) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Gagal update status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-500/10 text-green-500';
      case 'Pending': return 'bg-orange-500/10 text-orange-500';
      case 'Expired': return 'bg-red-500/10 text-red-500';
      case 'Cancelled': return 'bg-gray-500/10 text-gray-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Pengelola Pesanan</h1>
          <p className="text-gray-500 text-sm font-medium">Lacak dan kelola semua transaksi pembelian sistem Kaloweb.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={fetchOrders}
            className="h-14 px-6 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 text-sm font-bold text-gray-500 hover:text-black transition-all shadow-sm"
          >
            Refresh Data
          </button>
          <button className="h-14 px-8 bg-black text-white rounded-2xl flex items-center gap-3 text-sm font-bold hover:bg-accent hover:text-black transition-all shadow-xl shadow-black/10">
            Cek Pembayaran Manual
          </button>
        </div>
      </div>

      {/* Stats Quickbar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Pesanan', value: orders.length.toString(), icon: Package, color: 'black' },
          { label: 'Belum Bayar', value: orders.filter(o => o.status === 'Pending').length.toString(), icon: Clock, color: 'orange' },
          { label: 'Selesai', value: orders.filter(o => o.status === 'Paid').length.toString(), icon: CheckCircle2, color: 'green' },
          { label: 'Batal', value: orders.filter(o => o.status === 'Cancelled' || o.status === 'Expired').length.toString(), icon: XCircle, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-display font-medium text-black">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-accent" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Memuat Data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Customer</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Total (IDR)</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium">Belum ada pesanan masuk.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6 text-xs font-mono font-bold text-gray-400 group-hover:text-black transition-colors">{order.order_number}</td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-black mb-0.5">{order.customer_name}</p>
                          <p className="text-[10px] text-gray-400 font-mono italic">{order.domain_name}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-black">
                        {order.total_amount.toLocaleString('id-ID')}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition-all"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Side Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-lg bg-white h-full shadow-2xl relative z-10 flex flex-col"
            >
              <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-black tracking-tight">Detail Pesanan</h2>
                  <p className="text-xs text-gray-400 font-mono">{selectedOrder.order_number}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-all">
                  <span className="text-xl">×</span>
                </button>
              </div>

              <div className="p-10 overflow-y-auto flex-grow space-y-10">
                <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status Pembayaran</p>
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${getStatusStyle(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-black mb-1">IDR {selectedOrder.total_amount.toLocaleString('id-ID')}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} /> Dipesan pada {formatDate(selectedOrder.created_at)}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 ml-2">Detail Pelanggan</h4>
                    <div className="p-6 rounded-3xl bg-white border border-gray-100 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Nama</span>
                        <span className="font-bold text-black">{selectedOrder.customer_name}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Email</span>
                        <span className="font-bold text-black italic">{selectedOrder.customer_email}</span>
                      </div>
                      {selectedOrder.customer_phone && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">WhatsApp</span>
                          <span className="font-bold text-black">{selectedOrder.customer_phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 ml-2">Detail Produk</h4>
                    <div className="p-6 rounded-3xl bg-white border border-gray-100 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Item</span>
                        <span className="font-bold text-black">Kaloweb ({selectedOrder.package_type})</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Domain</span>
                        <span className="font-bold text-accent italic">{selectedOrder.domain_name}</span>
                      </div>
                    </div>
                  </div>

                  {selectedOrder.status === 'Pending' && (
                    <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100 flex items-start gap-4">
                      <Clock className="text-orange-500 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-xs font-bold text-orange-600 mb-1">Menunggu Pembayaran</p>
                        <p className="text-[10px] text-orange-500 leading-relaxed">System menungg pembayaran. Link pembayaran aktif di sisi user.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-10 border-t border-gray-100 grid grid-cols-2 gap-4">
                {selectedOrder.status === 'Pending' && (
                  <Button
                    variant="black"
                    className="rounded-2xl h-14"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Paid')}
                    disabled={updating}
                  >
                    {updating ? <Loader2 className="animate-spin text-white" /> : 'Tandai Sudah Bayar'}
                  </Button>
                )}
                {selectedOrder.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'Cancelled')}
                    disabled={updating}
                    className="rounded-2xl h-14 border border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center"
                  >
                    {updating ? <Loader2 className="animate-spin" /> : 'Batalkan Order'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

