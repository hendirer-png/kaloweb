import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (authError) {
        throw authError;
      }

      if (data.session) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        navigate('/admin');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-1 bg-accent/20">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <ShieldCheck size={32} className="text-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-black mb-2">Admin Portal</h1>
          <p className="text-gray-500 text-sm font-medium">Masuk untuk mengelola ekosistem Kaloweb</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
              <div className="relative">
                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nopianh57@gmail.com"
                  className="w-full h-14 pl-12 pr-6 rounded-2xl bg-gray-50 border border-gray-100 focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-100 focus:border-accent focus:bg-white outline-none transition-all text-sm font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs font-bold text-red-500 text-center animate-shake">{error}</p>
            )}

            <Button
              // @ts-ignore
              type="submit"
              variant="black"
              className="w-full h-14 rounded-2xl group"
              // @ts-ignore
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          Sistem Keamanan Berlapis · PT Berkat Digital Sentosa
        </p>
      </motion.div>
    </div>
  );
}
