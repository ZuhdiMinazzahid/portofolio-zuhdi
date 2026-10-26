import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useLinkSosial() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true);
        setError(null);
        const { data, error: err } = await supabase
          .from('link_sosial')
          .select('*')
          .order('urutan', { ascending: true });

        if (err) throw err;
        setLinks(data || []);
      } catch (err) {
        console.error('Error fetching link_sosial:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  return { links, loading, error };
}
