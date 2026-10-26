import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useProyek() {
  const [proyek, setProyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProyek() {
      try {
        setLoading(true);
        setError(null);

        // Fetch projects with tampilkan = true and their related media_proyek
        const { data, error: err } = await supabase
          .from('proyek')
          .select(`
            *,
            media_proyek (
              id,
              id_proyek,
              jenis_media,
              alamat_file,
              link_youtube,
              urutan
            )
          `)
          .eq('tampilkan', true)
          .order('urutan', { ascending: true });

        if (err) throw err;

        // Sort media_proyek within each project by urutan
        const sorted = (data || []).map((p) => ({
          ...p,
          media_proyek: (p.media_proyek || []).sort(
            (a, b) => (a.urutan || 0) - (b.urutan || 0)
          ),
        }));

        setProyek(sorted);
      } catch (err) {
        console.error('Error fetching proyek:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProyek();
  }, []);

  return { proyek, loading, error };
}
