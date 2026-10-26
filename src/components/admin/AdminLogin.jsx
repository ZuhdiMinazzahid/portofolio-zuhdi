import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLogin, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMsg(
        err.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex items-center justify-center p-4 selection:bg-primary-container selection:text-on-primary-container">
      <div className="max-w-md w-full bg-surface-container-low rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website</span>
        </button>

        {/* Header Monogram */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-secondary-fixed mx-auto flex items-center justify-center font-extrabold text-xl shadow-glow mb-4">
            ZM
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Admin Panel Login
          </h2>
          <p className="text-xs text-secondary mt-1">
            Masuk untuk mengedit konten dan membaca pesan klien
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Email Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-full bg-primary-container text-on-secondary-fixed font-bold text-sm shadow-md hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <span>Masuk ke Dashboard</span>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/5 text-center text-xs text-secondary">
          <p>Akun admin dikelola melalui Supabase Dashboard.</p>
        </div>
      </div>
    </div>
  );
}
