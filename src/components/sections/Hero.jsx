import React from 'react';
import { ArrowDown, Mail, Download, Video } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero({ profil, loading = false }) {
  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 animate-pulse">
        <div className="w-full bg-[#FFFFFF] rounded-3xl p-12 lg:p-16 h-96 flex items-center justify-center">
          <div className="h-10 w-64 bg-slate-200 rounded-full" />
        </div>
      </section>
    );
  }

  const nama = profil?.nama_lengkap || 'Zuhdi Minazzahid';
  const namaParts = nama.trim().split(/\s+/);
  const firstName = namaParts[0] || 'Zuhdi';
  const lastName = namaParts.slice(1).join(' ') || 'Minazzahid';
  const jabatan = profil?.jabatan || 'Videografer & Video Editor';
  const foto =
    profil?.foto_profil ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
  const cvUrl = profil?.file_cv && profil?.file_cv !== '#' ? profil.file_cv : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-6">
      {/* SECTION 1: HERO CONTAINER (White Rounded Card Canvas) */}
      <section className="w-full bg-[#FFFFFF] text-[#0D0D11] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden transition-all duration-300">
        {/* Subtle Ambient Graphic Pattern */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Capsule Availability Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low/10 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-[#1F1F24] font-bold">
                Tersedia untuk Proyek Lepas & Kontrak
              </span>
            </div>

            {/* Main Headline with Curved Underline under Zuhdi */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0E0E10] tracking-tight leading-[1.12]">
              <span className="relative inline-block text-[#0E0E10]">
                {firstName}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 sm:h-4 text-primary-container pointer-events-none"
                  fill="none"
                  viewBox="0 0 240 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9.5C65 2.5 175 1.5 238 9.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
              </span>
              <span className="block mt-1 sm:mt-2 text-[#0E0E10]">
                {lastName}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#474649] max-w-xl leading-relaxed">
              {profil?.tentang_saya ||
                'Menyulap gagasan menjadi narasi visual berdaya pikat tinggi melalui sinematografi komersial, motion graphic presisi, dan arsitektur brand identity yang memikat audiens modern.'}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Button
                href="#proyek"
                variant="primary"
                size="lg"
                icon={ArrowDown}
                iconPosition="right"
              >
                Lihat Karya
              </Button>

              <Button
                href="#kontak"
                variant="secondary"
                size="lg"
                icon={Mail}
              >
                Hubungi Sekarang
              </Button>

              {cvUrl && (
                <Button
                  href={cvUrl}
                  target="_blank"
                  variant="light"
                  size="lg"
                  icon={Download}
                >
                  Unduh CV
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Visual Portrait & Mustard Accent */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-88 md:h-88">
              {/* Geometric Graphic Circles */}
              <div className="absolute inset-0 rounded-full bg-primary-container/30 -rotate-6 scale-105" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-container via-primary-fixed to-white opacity-80 rotate-12 scale-102" />

              {/* Outer Portrait Clip */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl bg-surface-container-high border-2 border-white">
                <img
                  alt={nama}
                  src={foto}
                  className="w-full h-full object-cover object-top scale-105 transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 left-2 sm:-left-2 bg-[#0E0E10] text-[#FFFFFF] px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
                <div className="w-7 h-7 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-none text-white">{jabatan}</p>
                  <p className="text-[11px] text-secondary leading-none mt-1">
                    Based in Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS COUNTER BAR (Dark Canvas Strip from Stitch) */}
      <div className="w-full py-8 px-6 sm:px-10 my-6 rounded-3xl bg-surface-container-low shadow-inner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-surface-variant/40">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-primary-container tracking-tight">
              20+
            </span>
            <span className="text-xs uppercase tracking-wider text-secondary mt-1 font-semibold">
              Proyek Selesai
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              3+
            </span>
            <span className="text-xs uppercase tracking-wider text-secondary mt-1 font-semibold">
              Tahun Pengalaman
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-primary-container tracking-tight">
              100k+
            </span>
            <span className="text-xs uppercase tracking-wider text-secondary mt-1 font-semibold">
              Total Views & Reach
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              15+
            </span>
            <span className="text-xs uppercase tracking-wider text-secondary mt-1 font-semibold">
              Brand & Partner Klien
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
