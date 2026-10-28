import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import ImageUploader from '../ui/ImageUploader';

export default function AdminProfilTab() {
  const [formData, setFormData] = useState({
    id: '',
    nama_lengkap: '',
    jabatan: '',
    tentang_saya: '',
    foto_profil: '',
    nomor_whatsapp: '',
    email: '',
    file_cv: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  useEffect(() => {
    async function loadProfil() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profil')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setFormData({
            id: data.id || '',
            nama_lengkap: data.nama_lengkap || '',
            jabatan: data.jabatan || '',
            tentang_saya: data.tentang_saya || '',
            foto_profil: data.foto_profil || '',
            nomor_whatsapp: data.nomor_whatsapp || '',
            email: data.email || '',
            file_cv: data.file_cv || '',
          });
        }
      } catch (err) {
        console.error('Error loading profil:', err);
        setStatus({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    }

    loadProfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });

    try {
      if (formData.id) {
        const { error } = await supabase
          .from('profil')
          .update({
            nama_lengkap: formData.nama_lengkap,
            jabatan: formData.jabatan,
            tentang_saya: formData.tentang_saya,
            foto_profil: formData.foto_profil,
            nomor_whatsapp: formData.nomor_whatsapp,
            email: formData.email,
            file_cv: formData.file_cv,
          })
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('profil').insert([formData]);
        if (error) throw error;
      }

      setStatus({
        type: 'success',
        message: 'Data profil berhasil diperbarui! Perubahan sudah aktif di website.',
      });
    } catch (err) {
      console.error('Error saving profil:', err);
      setStatus({ type: 'error', message: 'Gagal menyimpan: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-secondary">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-container" />
        <p className="text-sm">Memuat data profil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white tracking-tight">
          Pengaturan Profil & Identitas
        </h3>
        <p className="text-xs text-secondary mt-1">
          Informasi ini ditampilkan pada Header, Hero, dan bagian Tentang Saya di website.
        </p>
      </div>

      {status.type === 'success' && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{status.message}</span>
        </div>
      )}

      {status.type === 'error' && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama_lengkap"
              required
              value={formData.nama_lengkap}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Jabatan / Pekerjaan
            </label>
            <input
              type="text"
              name="jabatan"
              required
              value={formData.jabatan}
              onChange={handleChange}
              placeholder="Videografer & Video Editor"
              className="w-full px-4 py-3 rounded-2xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              name="nomor_whatsapp"
              value={formData.nomor_whatsapp}
              onChange={handleChange}
              placeholder="Contoh: 6281234567890"
              className="w-full px-4 py-3 rounded-2xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Email Bisnis
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 rounded-2xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUploader
              bucket="profile"
              folder="foto"
              label="Foto Profil"
              aspectRatio="aspect-square max-w-xs"
              value={formData.foto_profil}
              onChange={(url) => setFormData((prev) => ({ ...prev, foto_profil: url }))}
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUploader
              bucket="berkas"
              folder="cv"
              label="File CV (PDF)"
              accept="application/pdf,.pdf"
              value={formData.file_cv}
              onChange={(url) => setFormData((prev) => ({ ...prev, file_cv: url }))}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">
              Tentang Saya (Bio Singkat)
            </label>
            <textarea
              name="tentang_saya"
              rows="4"
              required
              value={formData.tentang_saya}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 rounded-full bg-primary-container text-on-secondary-fixed font-bold text-sm shadow-md hover:bg-primary-fixed-dim transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Profil</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
