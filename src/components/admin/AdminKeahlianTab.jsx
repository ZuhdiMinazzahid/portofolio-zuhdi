import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Trash2, Edit2, Loader2, Save, X } from 'lucide-react';
import ImageUploader from '../ui/ImageUploader';

export default function AdminKeahlianTab() {
  const [keahlianList, setKeahlianList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ id: null, nama_keahlian: '', ikon: '', urutan: 0 });
  const [saving, setSaving] = useState(false);

  const loadKeahlian = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('keahlian')
        .select('*')
        .order('urutan', { ascending: true });

      if (error) throw error;
      setKeahlianList(data || []);
    } catch (err) {
      console.error('Error loading keahlian:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKeahlian();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({ id: null, nama_keahlian: '', ikon: '', urutan: keahlianList.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({ id: item.id, nama_keahlian: item.nama_keahlian, ikon: item.ikon, urutan: item.urutan });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Hapus keahlian "${name}"?`)) return;

    try {
      const { error } = await supabase.from('keahlian').delete().eq('id', id);
      if (error) throw error;
      setKeahlianList((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      console.error('Error deleting keahlian:', err);
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('keahlian')
          .update({
            nama_keahlian: form.nama_keahlian,
            ikon: form.ikon,
            urutan: Number(form.urutan),
          })
          .eq('id', form.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('keahlian').insert([
          {
            nama_keahlian: form.nama_keahlian,
            ikon: form.ikon,
            urutan: Number(form.urutan),
          },
        ]);

        if (error) throw error;
      }

      setIsModalOpen(false);
      await loadKeahlian();
    } catch (err) {
      console.error('Error saving keahlian:', err);
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
            Keahlian & Software Tools
          </h3>
          <p className="text-xs text-secondary mt-1">
            Daftar software yang tampil di bagian profil (Premiere Pro, Photoshop, dll).
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold shadow-md hover:bg-primary-fixed-dim cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Software Baru</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-secondary">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-container" />
          <p className="text-sm">Memuat keahlian...</p>
        </div>
      ) : keahlianList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {keahlianList.map((k) => (
            <div
              key={k.id}
              className="p-4 rounded-2xl bg-surface-container-low border border-white/5 flex flex-col items-center justify-between gap-3 text-center relative group"
            >
              <div className="w-12 h-12 flex items-center justify-center p-1">
                <img
                  src={k.ikon}
                  alt={k.nama_keahlian}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div>
                <h5 className="font-bold text-white text-xs truncate max-w-[120px]">
                  {k.nama_keahlian}
                </h5>
                <span className="text-[10px] text-secondary">
                  Urutan: {k.urutan}
                </span>
              </div>

              <div className="flex items-center gap-1 pt-2 border-t border-white/5 w-full justify-center">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(k)}
                  className="p-1.5 rounded-lg text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(k.id, k.nama_keahlian)}
                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-secondary border border-dashed border-white/10 rounded-2xl">
          <p className="text-sm mb-3">Belum ada software keahlian.</p>
        </div>
      )}

      {/* Modal Tambah / Edit Keahlian */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-surface-container-low rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="font-bold text-white text-base">
                {editingItem ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
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
                  Nama Software / Keahlian *
                </label>
                <input
                  type="text"
                  required
                  value={form.nama_keahlian}
                  onChange={(e) => setForm({ ...form, nama_keahlian: e.target.value })}
                  placeholder="Contoh: Adobe Premiere Pro"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <ImageUploader
                bucket="berkas"
                folder="ikon"
                label="Ikon Software (PNG / SVG)"
                required
                accept="image/*"
                value={form.ikon}
                onChange={(url) => setForm({ ...form, ikon: url })}
              />

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
