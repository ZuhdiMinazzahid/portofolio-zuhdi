import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Trash2, Edit2, Loader2, Save, X, Globe } from 'lucide-react';

export default function AdminSosialTab() {
  const [linksList, setLinksList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    id: null,
    nama_platform: '',
    username: '',
    alamat_link: '',
    urutan: 0,
  });
  const [saving, setSaving] = useState(false);

  const loadLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('link_sosial')
        .select('*')
        .order('urutan', { ascending: true });

      if (error) throw error;
      setLinksList(data || []);
    } catch (err) {
      console.error('Error loading links:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      id: null,
      nama_platform: '',
      username: '',
      alamat_link: '',
      urutan: linksList.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      id: item.id,
      nama_platform: item.nama_platform,
      username: item.username,
      alamat_link: item.alamat_link,
      urutan: item.urutan,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Hapus link sosial "${name}"?`)) return;

    try {
      const { error } = await supabase.from('link_sosial').delete().eq('id', id);
      if (error) throw error;
      setLinksList((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error('Error deleting link:', err);
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('link_sosial')
          .update({
            nama_platform: form.nama_platform,
            username: form.username,
            alamat_link: form.alamat_link,
            urutan: Number(form.urutan),
          })
          .eq('id', form.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('link_sosial').insert([
          {
            nama_platform: form.nama_platform,
            username: form.username,
            alamat_link: form.alamat_link,
            urutan: Number(form.urutan),
          },
        ]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      await loadLinks();
    } catch (err) {
      console.error('Error saving link:', err);
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Tautan Media Sosial
          </h3>
          <p className="text-xs text-secondary mt-1">
            Akun Instagram, TikTok, YouTube, dan LinkedIn yang tampil di bagian kontak.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold shadow-md hover:bg-primary-fixed-dim cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Akun Baru</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-secondary">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-container" />
          <p className="text-sm">Memuat link sosial...</p>
        </div>
      ) : linksList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {linksList.map((link) => (
            <div
              key={link.id}
              className="p-5 rounded-2xl bg-surface-container-low border border-white/5 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container text-primary-container flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-white text-sm truncate">
                    {link.nama_platform}
                  </h5>
                  <p className="text-xs text-secondary truncate">
                    {link.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(link)}
                  className="p-1.5 rounded-lg text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(link.id, link.nama_platform)}
                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-secondary border border-dashed border-white/10 rounded-2xl">
          <p className="text-sm">Belum ada akun sosial media yang tersimpan.</p>
        </div>
      )}

      {/* Modal Tambah / Edit Link */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-surface-container-low rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="font-bold text-white text-base">
                {editingItem ? 'Edit Akun Sosial' : 'Tambah Akun Sosial Baru'}
              </h4>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-secondary hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                  Nama Platform *
                </label>
                <input
                  type="text"
                  required
                  value={form.nama_platform}
                  onChange={(e) => setForm({ ...form, nama_platform: e.target.value })}
                  placeholder="Instagram, TikTok, YouTube, LinkedIn"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                  Username / ID Akun *
                </label>
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="@zuhdiminazzahid"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                  URL Tautan Lengkap *
                </label>
                <input
                  type="url"
                  required
                  value={form.alamat_link}
                  onChange={(e) => setForm({ ...form, alamat_link: e.target.value })}
                  placeholder="https://instagram.com/zuhdiminazzahid"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                  Urutan Tampil
                </label>
                <input
                  type="number"
                  value={form.urutan}
                  onChange={(e) => setForm({ ...form, urutan: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-secondary hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
