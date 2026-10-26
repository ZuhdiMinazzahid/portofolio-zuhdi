import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, CheckCircle2, Trash2, Loader2, Clock, Reply, RefreshCw } from 'lucide-react';

export default function AdminPesanTab() {
  const [pesanList, setPesanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPesan = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pesan_masuk')
        .select('*')
        .order('dikirim_pada', { ascending: false });

      if (error) throw error;
      setPesanList(data || []);
    } catch (err) {
      console.error('Error loading pesan_masuk:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPesan();
  }, []);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('pesan_masuk')
        .update({ sudah_dibaca: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      setPesanList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, sudah_dibaca: !currentStatus } : item
        )
      );
    } catch (err) {
      console.error('Error updating read status:', err);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Hapus pesan dari "${name}"?`)) return;

    try {
      const { error } = await supabase.from('pesan_masuk').delete().eq('id', id);
      if (error) throw error;
      setPesanList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Gagal menghapus pesan: ' + err.message);
    }
  };

  const unreadCount = pesanList.filter((p) => !p.sudah_dibaca).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Pesan Masuk Klien
            </h3>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold">
                {unreadCount} Baru
              </span>
            )}
          </div>
          <p className="text-xs text-secondary mt-1">
            Pesan dan brief proyek yang dikirimkan oleh pengunjung melalui formulir kontak.
          </p>
        </div>

        <button
          type="button"
          onClick={loadPesan}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-white/10 text-xs font-semibold text-secondary hover:text-white cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-secondary">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary-container" />
          <p className="text-sm">Memuat pesan masuk...</p>
        </div>
      ) : pesanList.length > 0 ? (
        <div className="space-y-4">
          {pesanList.map((p) => (
            <div
              key={p.id}
              className={`p-6 rounded-2xl border transition-all ${
                !p.sudah_dibaca
                  ? 'bg-surface-container-low border-primary-container/40 shadow-glow'
                  : 'bg-surface-container/60 border-white/5 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      !p.sudah_dibaca ? 'bg-primary-container animate-pulse' : 'bg-secondary/40'
                    }`}
                  />
                  <h4 className="font-bold text-white text-base">
                    {p.nama_pengirim}
                  </h4>
                  <a
                    href={`mailto:${p.email_pengirim}`}
                    className="text-xs text-primary-container hover:underline hidden sm:inline-block"
                  >
                    ({p.email_pengirim})
                  </a>
                </div>

                <div className="flex items-center gap-2 text-xs text-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {p.dikirim_pada
                      ? new Date(p.dikirim_pada).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Baru saja'}
                  </span>
                </div>
              </div>

              <div className="sm:hidden text-xs text-primary-container mb-3">
                {p.email_pengirim}
              </div>

              <p className="text-sm text-slate-200 bg-surface-container p-4 rounded-xl leading-relaxed whitespace-pre-wrap mb-4">
                {p.isi_pesan}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${p.email_pengirim}?subject=Balasan%20Brief%20Proyek%20-%20Zuhdi%20Minazzahid`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold hover:bg-primary-fixed-dim transition-all"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Balas Email</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleRead(p.id, p.sudah_dibaca)}
                    className="text-xs font-semibold text-secondary hover:text-white transition-colors cursor-pointer"
                  >
                    {p.sudah_dibaca ? 'Tandai Belum Dibaca' : 'Tandai Selesai Dibaca'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(p.id, p.nama_pengirim)}
                  className="p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Hapus Pesan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-secondary border border-dashed border-white/10 rounded-2xl">
          <Mail className="w-10 h-10 mx-auto mb-3 opacity-40 text-primary-container" />
          <p className="text-sm">Kotak pesan masuk masih kosong.</p>
          <p className="text-xs text-secondary/60 mt-1">
            Pesan yang dikirim pengunjung website akan otomatis terkumpul di sini.
          </p>
        </div>
      )}
    </div>
  );
}
