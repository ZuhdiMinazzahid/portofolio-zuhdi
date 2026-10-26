import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nama_pengirim: '',
    email_pengirim: '',
    isi_pesan: '',
    // Honeypot field for spam bots
    website_trap: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Anti-spam check (honeypot)
    if (formData.website_trap) {
      console.warn('Spam submission detected and blocked.');
      setStatus({
        type: 'success',
        message: 'Pesan Anda berhasil dikirim!',
      });
      return;
    }

    // 2. Client-side Validation
    const nama = formData.nama_pengirim.trim();
    const email = formData.email_pengirim.trim();
    const pesan = formData.isi_pesan.trim();

    if (!nama || !email || !pesan) {
      setStatus({
        type: 'error',
        message: 'Mohon isi semua kolom yang wajib diisi.',
      });
      return;
    }

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: 'error',
        message: 'Format alamat email tidak valid.',
      });
      return;
    }

    if (pesan.length > 1000) {
      setStatus({
        type: 'error',
        message: 'Pesan maksimal 1.000 karakter.',
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: null, message: '' });

      const { error } = await supabase.from('pesan_masuk').insert([
        {
          nama_pengirim: nama,
          email_pengirim: email,
          isi_pesan: pesan,
        },
      ]);

      if (error) throw error;

      setStatus({
        type: 'success',
        message: 'Terima kasih! Pesan Anda telah terkirim dan tersimpan dengan aman.',
      });

      // Clear form
      setFormData({
        nama_pengirim: '',
        email_pengirim: '',
        isi_pesan: '',
        website_trap: '',
      });
    } catch (err) {
      console.error('Error inserting pesan_masuk:', err.message);
      setStatus({
        type: 'error',
        message:
          'Gagal mengirim pesan: ' +
          (err.message || 'Silakan hubungi langsung lewat WhatsApp.'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot hidden input */}
      <input
        type="text"
        name="website_trap"
        value={formData.website_trap}
        onChange={handleChange}
        tabIndex="-1"
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {status.type === 'success' && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{status.message}</span>
        </div>
      )}

      {status.type === 'error' && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="nama_pengirim"
            className="block text-xs font-bold text-[#0E0E10] mb-2 uppercase tracking-wide"
          >
            Nama Lengkap *
          </label>
          <input
            id="nama_pengirim"
            name="nama_pengirim"
            type="text"
            required
            value={formData.nama_pengirim}
            onChange={handleChange}
            placeholder="Contoh: Rian Pratama"
            className="w-full px-5 py-3.5 rounded-2xl bg-[#F4F4F6] text-[#0E0E10] border-0 focus:outline-none focus:ring-2 focus:ring-primary-container text-sm transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="email_pengirim"
            className="block text-xs font-bold text-[#0E0E10] mb-2 uppercase tracking-wide"
          >
            Email Bisnis *
          </label>
          <input
            id="email_pengirim"
            name="email_pengirim"
            type="email"
            required
            value={formData.email_pengirim}
            onChange={handleChange}
            placeholder="nama@perusahaan.com"
            className="w-full px-5 py-3.5 rounded-2xl bg-[#F4F4F6] text-[#0E0E10] border-0 focus:outline-none focus:ring-2 focus:ring-primary-container text-sm transition-all"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="isi_pesan"
            className="block text-xs font-bold text-[#0E0E10] uppercase tracking-wide"
          >
            Isi Pesan / Brief Proyek *
          </label>
          <span className="text-[11px] text-[#5A595E]">
            {formData.isi_pesan.length}/1000
          </span>
        </div>
        <textarea
          id="isi_pesan"
          name="isi_pesan"
          rows="4"
          required
          maxLength={1000}
          value={formData.isi_pesan}
          onChange={handleChange}
          placeholder="Ceritakan gambaran proyek video, timeline, atau kebutuhan visual yang Anda rencanakan..."
          className="w-full px-5 py-3.5 rounded-2xl bg-[#F4F4F6] text-[#0E0E10] border-0 focus:outline-none focus:ring-2 focus:ring-primary-container text-sm transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary-container text-on-secondary-fixed font-bold text-sm shadow-md hover:bg-primary-fixed-dim hover:shadow-mustard-btn transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Mengirim Pesan...</span>
          </>
        ) : (
          <>
            <span>Kirim Pesan</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
