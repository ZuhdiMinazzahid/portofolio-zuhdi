import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useProfil() {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfil() {
      try {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase
          .from('profil')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (err) throw err;
        setProfil(data);
      } catch (err) {
        console.error('Error fetching profil:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfil();
  }, []);

  return { profil, loading, error };
}
