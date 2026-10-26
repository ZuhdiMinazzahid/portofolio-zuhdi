import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Save, X, AlertCircle } from 'lucide-react';
import ImageUploader from '../ui/ImageUploader';

export default function AdminProyekTab() {
  const [proyekList, setProyekList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: null, text: '' });

  const emptyForm = {
    id: null,
    judul: '',
    kategori: 'video',
    peran: '',
    toolsText: '',
    cerita_singkat: '',
    gambar_sampul: '',
    tahun: '2026',
    tampilkan: true,
    urutan: 0,
    file_media: '',
    link_youtube: '',
  };

  const [form, setForm] = useState(emptyForm);

  const loadProyek = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('proyek')
        .select(`
          *,
          media_proyek (*)
        `)
        .order('urutan', { ascending: true });

      if (error) throw error;
      setProyekList(data || []);
    } catch (err) {
      console.error('Error fetching proyek:', err);
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProyek();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProject(p);
    const media = p.media_proyek?.[0];
    setForm({
      id: p.id,
      judul: p.judul || '',
      kategori: p.kategori || 'video',
      peran: p.peran || '',
      toolsText: Array.isArray(p.tools) ? p.tools.join(', ') : '',
      cerita_singkat: p.cerita_singkat || '',
      gambar_sampul: p.gambar_sampul || '',
      tahun: p.tahun || '2026',
      tampilkan: p.tampilkan ?? true,
      urutan: p.urutan || 0,
      file_media: media?.alamat_file || '',
      link_youtube: media?.link_youtube || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Yakin ingin menghapus proyek "${title}"?`)) return;

    try {
      const { error } = await supabase.from('proyek').delete().eq('id', id);
      if (error) throw error;
      setProyekList((prev) => prev.filter((item) => item.id !== id));
      setStatusMsg({ type: 'success', text: `Proyek "${title}" berhasil dihapus.` });
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const handleToggleVisibility = async (p) => {
    try {
      const newStatus = !p.tampilkan;
      const { error } = await supabase
        .from('proyek')
        .update({ tampilkan: newStatus })
        .eq('id', p.id);

      if (error) throw error;
      setProyekList((prev) =>
        prev.map((item) => (item.id === p.id ? { ...item, tampilkan: newStatus } : item))
      );
    } catch (err) {
      console.error('Error toggling visibility:', err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: null, text: '' });

    const toolsArray = form.toolsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from('proyek')
          .update({
            judul: form.judul,
            kategori: form.kategori,
            peran: form.peran,
            tools: toolsArray,
            cerita_singkat: form.cerita_singkat,
            gambar_sampul: form.gambar_sampul,
            tahun: form.tahun,
            tampilkan: form.tampilkan,
            urutan: Number(form.urutan),
          })
          .eq('id', form.id);

        if (error) throw error;

        // Upsert media_proyek (file upload or YouTube link)
        const hasMedia = form.file_media || form.link_youtube;
        const existingMedia = editingProject.media_proyek?.[0];
        if (hasMedia) {
          const isVid = Boolean(form.link_youtube) || /\.(mp4|webm|mov|mkv)/i.test(form.file_media || '');
          const mediaPayload = {
            jenis_media: isVid ? 'video' : 'foto',
            alamat_file: form.file_media || null,
            link_youtube: form.link_youtube || null,
            urutan: 1,
          };

          if (existingMedia) {
            await supabase
              .from('media_proyek')
              .update(mediaPayload)
              .eq('id', existingMedia.id);
          } else {
            await supabase.from('media_proyek').insert([
              {
                id_proyek: form.id,
                ...mediaPayload,
              },
            ]);
          }
        } else if (existingMedia) {
          await supabase.from('media_proyek').delete().eq('id', existingMedia.id);
        }
      } else {
        // Insert new project
        const { data: newProj, error } = await supabase
          .from('proyek')
          .insert([
            {
              judul: form.judul,
              kategori: form.kategori,
              peran: form.peran,
              tools: toolsArray,
              cerita_singkat: form.cerita_singkat,
              gambar_sampul: form.gambar_sampul,
              tahun: form.tahun,
              tampilkan: form.tampilkan,
              urutan: Number(form.urutan),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        const hasMedia = form.file_media || form.link_youtube;
        if (hasMedia && newProj) {
          const isVid = Boolean(form.link_youtube) || /\.(mp4|webm|mov|mkv)/i.test(form.file_media || '');
          await supabase.from('media_proyek').insert([
            {
              id_proyek: newProj.id,
              jenis_media: isVid ? 'video' : 'foto',
              alamat_file: form.file_media || null,
              link_youtube: form.link_youtube || null,
              urutan: 1,
            },
          ]);
        }
      }

      setIsModalOpen(false);
      await loadProyek();
      setStatusMsg({
        type: 'success',
        text: `Proyek "${form.judul}" berhasil disimpan!`,
      });
    } catch (err) {
      console.error('Error saving project:', err);
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
            Manajemen Karya & Proyek
          </h3>
          <p className="text-xs text-secondary mt-1">
            Tambah, edit, hapus, dan atur tampilan portofolio karya Anda.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold shadow-md hover:bg-primary-fixed-dim cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karya Baru</span>
        </button>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <AlertCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-secondary">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-container" />
          <p className="text-sm">Memuat daftar proyek...</p>
        </div>
      ) : proyekList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyekList.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-5 border transition-all ${
                p.tampilkan
                  ? 'bg-surface-container-low border-white/10 shadow-lg'
                  : 'bg-surface-container/50 border-white/5 opacity-60'
              }`}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
                <img
                  src={p.gambar_sampul || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80'}
                  alt={p.judul}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-primary-container text-on-secondary-fixed text-[11px] font-bold">
                  {p.kategori}
                </span>
                {!p.tampilkan && (
                  <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-bold">
                    Disembunyikan
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-secondary mb-1">
                <span>Peran: {p.peran}</span>
                <span>{p.tahun}</span>
              </div>

              <h4 className="font-bold text-white text-base mb-2 truncate">
                {p.judul}
              </h4>

              <p className="text-xs text-secondary line-clamp-2 mb-4 leading-relaxed">
                {p.cerita_singkat}
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(p)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    p.tampilkan
                      ? 'text-emerald-400 hover:bg-emerald-500/10'
                      : 'text-secondary hover:bg-white/5'
                  }`}
                  title={p.tampilkan ? 'Sembunyikan dari publik' : 'Tampilkan ke publik'}
                >
                  {p.tampilkan ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  <span>{p.tampilkan ? 'Aktif' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(p)}
                    className="p-2 rounded-xl text-secondary hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Edit Karya"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id, p.judul)}
                    className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Hapus Karya"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-secondary border border-dashed border-white/10 rounded-2xl">
          <p className="text-sm mb-3">Belum ada karya proyek yang tersimpan.</p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold"
          >
            Tambah Karya Pertama
          </button>
        </div>
      )}

      {/* MODAL FORM TAMBAH / EDIT PROYEK */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Karya Portofolio' : 'Tambah Karya Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-secondary hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                  Judul Karya *
                </label>
                <input
                  type="text"
                  required
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                  placeholder="Contoh: Brand Commercial Coffee Roaster"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                    Kategori *
                  </label>
                  <select
                    value={form.kategori}
                    onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  >
                    <option value="video">Videografi & Video Editing</option>
                    <option value="desain">Desain Grafis</option>
                    <option value="media_sosial">Social Media & Reels</option>
                    <option value="dokumentasi">Dokumentasi Acara</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                    Peran / Posisi *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.peran}
                    onChange={(e) => setForm({ ...form, peran: e.target.value })}
                    placeholder="Contoh: Director & Lead Editor"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                    Tahun
                  </label>
                  <input
                    type="text"
                    value={form.tahun}
                    onChange={(e) => setForm({ ...form, tahun: e.target.value })}
                    placeholder="2026"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                    Urutan Tampil (Angka)
                  </label>
                  <input
                    type="number"
                    value={form.urutan}
                    onChange={(e) => setForm({ ...form, urutan: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                  Tools / Software (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={form.toolsText}
                  onChange={(e) => setForm({ ...form, toolsText: e.target.value })}
                  placeholder="Adobe Premiere Pro, DaVinci Resolve, Photoshop"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <ImageUploader
                bucket="media-proyek"
                folder="sampul"
                label="Gambar Sampul / Thumbnail (Foto Preview Karya) *"
                required
                value={form.gambar_sampul}
                onChange={(url) => setForm({ ...form, gambar_sampul: url })}
              />

              <div className="space-y-4 p-4 rounded-2xl bg-surface-container/50 border border-white/5">
                <div>
                  <p className="text-xs font-bold text-white mb-0.5">Media Utama Karya (Video / Foto Resolusi Penuh)</p>
                  <p className="text-[11px] text-secondary">
                    Upload file video atau foto karya langsung ke Supabase Storage, atau sematkan link YouTube.
                  </p>
                </div>

                <ImageUploader
                  bucket="media-proyek"
                  folder="karya"
                  label="Upload File Karya (Video MP4/WebM atau Foto HD)"
                  accept="image/*,video/*"
                  value={form.file_media}
                  onChange={(url) => setForm({ ...form, file_media: url })}
                />

                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                    Atau Link Video YouTube (Opsional)
                  </label>
                  <input
                    type="url"
                    value={form.link_youtube}
                    onChange={(e) => setForm({ ...form, link_youtube: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5">
                  Cerita Singkat Proyek *
                </label>
                <textarea
                  rows="3"
                  required
                  value={form.cerita_singkat}
                  onChange={(e) => setForm({ ...form, cerita_singkat: e.target.value })}
                  placeholder="Jelaskan konsep karya, pesan visual, atau tantangan produksinya..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-white/5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="tampilkan_check"
                  checked={form.tampilkan}
                  onChange={(e) => setForm({ ...form, tampilkan: e.target.checked })}
                  className="w-4 h-4 rounded text-primary-container focus:ring-primary-container cursor-pointer"
                />
                <label htmlFor="tampilkan_check" className="text-xs text-white cursor-pointer font-medium">
                  Tampilkan karya ini ke publik di website
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-semibold text-secondary hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold shadow-md hover:bg-primary-fixed-dim flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Proyek</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
