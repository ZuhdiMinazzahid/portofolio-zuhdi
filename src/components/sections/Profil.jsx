import React from 'react';
import SkillIcon from '../items/SkillIcon';
import RiwayatItem from '../items/RiwayatItem';
import {
  Film,
  Palette,
  Video,
  Share2,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Profil({
  keahlian = [],
  riwayat = [],
  loading = false,
}) {
  const pengalaman = riwayat.filter((r) => r.jenis === 'pengalaman');
  const pendidikan = riwayat.filter((r) => r.jenis === 'pendidikan');

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-4" id="profil">
      {/* SECTION 2: PROFIL & SERVICES CONTAINER (White Rounded Card from Stitch) */}
      <section className="w-full bg-[#FFFFFF] text-[#0E0E10] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl my-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-[#855D00] text-xs mb-3 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary-container" />
              Keahlian & Solusi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E0E10] tracking-tight">
              Layanan & Keahlian Utama
            </h2>
          </div>
          <p className="text-sm text-[#5A595E] max-w-md leading-relaxed">
            Pendekatan visual menyeluruh dari pra-produksi, shooting sinematik di lapangan, hingga pasca-produksi audio-visual dan identitas grafis yang solid.
          </p>
        </div>

        {/* 2x2 Services Grid (Exact from Stitch Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Highlight Mustard */}
          <div className="bg-primary-container text-on-secondary-fixed rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-widest font-extrabold opacity-75">
                  01 / Pasca Produksi
                </span>
                <div className="w-12 h-12 rounded-full bg-[#0E0E10] text-primary-container flex items-center justify-center shadow">
                  <Film className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0E0E10] mb-3">
                Editing Video Komersial & Kreatif
              </h3>
              <p className="text-sm text-[#2A230D] mb-6 leading-relaxed">
                Pacing presisi tinggi, multi-cam cut, transisi seamless, color grading sinematik standar industri, serta integrasi sound design yang mendalam.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[#0E0E10]/10 text-xs font-semibold text-[#0E0E10]">
                  Premiere Pro
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0E0E10]/10 text-xs font-semibold text-[#0E0E10]">
                  DaVinci Resolve
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0E0E10]/10 text-xs font-semibold text-[#0E0E10]">
                  CapCut Desktop
                </span>
              </div>
            </div>
            <a
              href="#proyek"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E0E10] text-[#FFFFFF] text-xs font-bold hover:bg-[#25252A] transition-all w-fit"
            >
              <span>Lihat Contoh Karya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Light Neutral Card */}
          <div className="bg-[#F6F6F8] text-[#0E0E10] rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#71717A]">
                  02 / Branding Visual
                </span>
                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] text-[#0E0E10] flex items-center justify-center shadow-sm">
                  <Palette className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0E0E10] mb-3">
                Desain Grafis & Brand Identity
              </h3>
              <p className="text-sm text-[#4E4D52] mb-6 leading-relaxed">
                Penyusunan identitas visual merek, key visual kampanye promosi, thumbnail YouTube berkategori CTR tinggi, poster event, dan aset promosi digital.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[#E8E8EC] text-xs font-semibold text-[#2A292E]">
                  Photoshop
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E8E8EC] text-xs font-semibold text-[#2A292E]">
                  Illustrator
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E8E8EC] text-xs font-semibold text-[#2A292E]">
                  Figma
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E8E8EC] text-xs font-semibold text-[#2A292E]">
                  Canva Pro
                </span>
              </div>
            </div>
            <a
              href="#proyek"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E0E10] text-[#FFFFFF] text-xs font-bold hover:bg-[#25252A] transition-all w-fit"
            >
              <span>Lihat Contoh Karya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 3: Dark Obsidian Inset Card */}
          <div className="bg-[#121214] text-[#FFFFFF] rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-widest font-extrabold text-primary-container">
                  03 / Lapangan & Sinema
                </span>
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center shadow">
                  <Video className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#FFFFFF] mb-3">
                Dokumentasi Acara & Sinematografi
              </h3>
              <p className="text-sm text-[#C8C6C8] mb-6 leading-relaxed">
                Pengambilan gambar di lokasi untuk company profile, event panggung musik, konferensi korporat, podcast video, serta arahan sinematik multi-kamera.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[#242428] text-xs font-semibold text-[#E4E1E6]">
                  Sony Alpha Series
                </span>
                <span className="px-3 py-1 rounded-full bg-[#242428] text-xs font-semibold text-[#E4E1E6]">
                  Gimbal Stabilizer
                </span>
                <span className="px-3 py-1 rounded-full bg-[#242428] text-xs font-semibold text-[#E4E1E6]">
                  Wireless Audio
                </span>
              </div>
            </div>
            <a
              href="#proyek"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold hover:bg-primary-fixed-dim transition-all w-fit"
            >
              <span>Lihat Contoh Karya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: Light Neutral Short-form Card */}
          <div className="bg-[#F6F6F8] text-[#0E0E10] rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#71717A]">
                  04 / Virality & Retention
                </span>
                <div className="w-12 h-12 rounded-full bg-[#FFFFFF] text-[#0E0E10] flex items-center justify-center shadow-sm">
                  <Share2 className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0E0E10] mb-3">
                Pengelolaan Media Sosial & Reels/TikTok
              </h3>
              <p className="text-sm text-[#4E4D52] mb-6 leading-relaxed">
                Penyusunan format short-form berdurasi 15-60 detik dengan formula hook 3 detik awal, teks subtitle animasi dinamis, dan strategi retensi tayangan.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[#E8E8EC] text-xs font-semibold text-[#2A292E]">
                  Reels & Shorts
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E8E8EC] text-xs font-semibold text-[#2A292E]">
                  TikTok Algorithm
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E8E8EC] text-xs font-semibold text-[#2A292E]">
                  Visual Hook Strategy
                </span>
              </div>
            </div>
            <a
              href="#proyek"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E0E10] text-[#FFFFFF] text-xs font-bold hover:bg-[#25252A] transition-all w-fit"
            >
              <span>Lihat Contoh Karya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Educational & Status Summary Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-[#EFEFF2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0E0E10] text-primary-container flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0E0E10]">
                Pendidikan: S1 Ilmu Komunikasi (Broadcasting & Sinematografi)
              </p>
              <p className="text-[11px] text-[#5D5C63]">
                Domisili: Siap Kerja Remote & Lapangan Seluruh Indonesia
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] shadow-sm text-xs font-bold text-[#0E0E10]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            Status: Open for Commission
          </div>
        </div>
      </section>

      {/* DYNAMIC SUPABASE DATA: Software Skills & Experience Highlights */}
      <section className="mt-8 mb-4 p-8 sm:p-12 rounded-3xl bg-surface-container-low text-on-surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Software Icons from Supabase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-container">
              <Sparkles className="w-4 h-4" />
              <span>Software & Tools Penguasaan</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Daftar perangkat lunak editing dan desain grafis yang aktif digunakan dalam setiap alur produksi visual:
            </p>

            {loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-surface-container rounded-2xl" />
                ))}
              </div>
            ) : keahlian.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {keahlian.map((item) => (
                  <SkillIcon
                    key={item.id}
                    nama_keahlian={item.nama_keahlian}
                    ikon={item.ikon}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {/* Riwayat Pengalaman & Pendidikan from Supabase */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-variant/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface">
                Riwayat Pengalaman & Organisasi
              </h4>
              <span className="text-[11px] text-secondary">
                Live Data Supabase
              </span>
            </div>

            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-surface-container rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-2.5">
                {pengalaman.map((item) => (
                  <RiwayatItem
                    key={item.id}
                    judul={item.judul}
                    keterangan={item.keterangan}
                    periode={item.periode}
                    jenis={item.jenis}
                  />
                ))}
                {pendidikan.map((item) => (
                  <RiwayatItem
                    key={item.id}
                    judul={item.judul}
                    keterangan={item.keterangan}
                    periode={item.periode}
                    jenis={item.jenis}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
