import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useKeahlian() {
  const [keahlian, setKeahlian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchKeahlian() {
      try {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase
          .from('keahlian')
          .select('*')
          .order('urutan', { ascending: true });

        if (err) throw err;
        setKeahlian(data || []);
      } catch (err) {
        console.error('Error fetching keahlian:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchKeahlian();
  }, []);

  return { keahlian, loading, error };
}
