import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Profil from './components/sections/Profil';
import Proyek from './components/sections/Proyek';
import Kontak from './components/sections/Kontak';
import AdminDashboard from './components/admin/AdminDashboard';
import { useProfil } from './hooks/useProfil';
import { useKeahlian } from './hooks/useKeahlian';
import { useRiwayat } from './hooks/useRiwayat';
import { useProyek } from './hooks/useProyek';
import { useLinkSosial } from './hooks/useLinkSosial';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(
    window.location.hash === '#admin'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const { profil, loading: profilLoading } = useProfil();
  const { keahlian, loading: keahlianLoading } = useKeahlian();
  const { riwayat, loading: riwayatLoading } = useRiwayat();
  const { proyek, loading: proyekLoading, error: proyekError } = useProyek();
  const { links, loading: linksLoading } = useLinkSosial();

  const brandName = profil?.nama_lengkap || 'Zuhdi Minazzahid';
  const jabatan = profil?.jabatan || 'Videografer & Video Editor';
  const cvUrl = profil?.file_cv && profil?.file_cv !== '#' ? profil.file_cv : null;

  // Render Admin Dashboard if #admin is in URL
  if (isAdminRoute) {
    return (
      <AdminDashboard
        onBackToSite={() => {
          window.location.hash = '';
          setIsAdminRoute(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col font-sans selection:bg-primary-container selection:text-on-primary-container antialiased">
      {/* 1. Header / Navbar (Stitch Style) */}
      <Navbar
        brandName={brandName}
        fotoProfil={profil?.foto_profil}
        cvUrl={cvUrl}
      />

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {/* 2. Hero Section (White Rounded Card Canvas + Stats Strip) */}
        <Hero
          profil={profil}
          loading={profilLoading}
        />

        {/* 3. Profil & Services Section (White Rounded Card Canvas + Live Skills) */}
        <Profil
          keahlian={keahlian}
          riwayat={riwayat}
          loading={profilLoading || keahlianLoading || riwayatLoading}
        />

        {/* 4. Proyek Showcase Section (Dark Embedded Container, Filter Tabs & Detail Modal) */}
        <Proyek
          proyek={proyek}
          loading={proyekLoading}
          error={proyekError}
        />

        {/* 5. Kontak & Collaboration Section (White Rounded Card Canvas + Form + WhatsApp) */}
        <Kontak
          profil={profil}
          links={links}
          loading={linksLoading}
        />
      </main>

      {/* 6. Footer */}
      <Footer brandName={brandName} tagline={jabatan} />
    </div>
  );
}
