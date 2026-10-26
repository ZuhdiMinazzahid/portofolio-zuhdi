import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useRiwayat() {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRiwayat() {
      try {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase
          .from('riwayat')
          .select('*')
          .order('urutan', { ascending: true });

        if (err) throw err;
        setRiwayat(data || []);
      } catch (err) {
        console.error('Error fetching riwayat:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRiwayat();
  }, []);

  const pengalaman = riwayat.filter((item) => item.jenis === 'pengalaman');
  const pendidikan = riwayat.filter((item) => item.jenis === 'pendidikan');

  return { riwayat, pengalaman, pendidikan, loading, error };
}
