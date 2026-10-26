import React, { useState } from 'react';
import ProjectCard from '../items/ProjectCard';
import MediaViewer from '../media/MediaViewer';
import Modal from '../ui/Modal';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function Proyek({ proyek = [], loading = false, error = null }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'Semua Karya' },
    { id: 'video', label: 'Videografi' },
    { id: 'desain', label: 'Desain Grafis' },
    { id: 'media_sosial', label: 'Social Media' },
    { id: 'dokumentasi', label: 'Dokumentasi' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? proyek
      : proyek.filter((p) => p.kategori === activeFilter);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-4" id="proyek">
      {/* SECTION 3: PROJECT SHOWCASE CONTAINER (Dark Embedded Container from Stitch) */}
      <section className="w-full bg-[#141416] text-[#FFFFFF] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl my-4">
        {/* Showcase Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary-container text-xs mb-3 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Our Works / Recap Project 2026
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight">
              Portofolio Proyek Pilihan
            </h2>
            <p className="text-sm text-secondary mt-2 max-w-xl leading-relaxed">
              Koleksi proyek terpilih yang mencerminkan eksplorasi sinematik, ritme visual editing dinamis, dan ketajaman identitas grafis.
            </p>
          </div>

          {/* Filter Tabs Interactive */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-surface-container-high/60 backdrop-blur-sm self-start lg:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-primary-container text-on-secondary-fixed shadow'
                    : 'text-secondary hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Gagal memuat proyek dari Supabase: {error}</span>
          </div>
        )}

        {/* 3-Column Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-surface-container-low rounded-2xl overflow-hidden h-80 border border-white/5"
              />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-secondary">
            <p className="text-sm">
              Tidak ada proyek untuk kategori ini saat ini.
            </p>
          </div>
        )}
      </section>

      {/* DETAIL MODAL LIGHTBOX */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.judul || 'Detail Karya'}
        maxWidth="max-w-3xl"
      >
        {selectedProject && (
          <div className="space-y-5">
            {/* Media Display (Photo / Video / YouTube Embed) */}
            <MediaViewer
              mediaList={selectedProject.media_proyek}
              fallbackCover={selectedProject.gambar_sampul}
              title={selectedProject.judul}
            />

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-low p-5 rounded-2xl border border-white/5 text-xs">
              <div>
                <span className="text-secondary block font-medium">Peran / Posisi:</span>
                <span className="text-white font-bold text-sm">
                  {selectedProject.peran || 'Director & Editor'}
                </span>
              </div>

              <div>
                <span className="text-secondary block font-medium">Tahun Produksi:</span>
                <span className="text-white font-bold text-sm">
                  {selectedProject.tahun || '2026'}
                </span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-secondary block font-medium mb-1.5">
                  Software & Tools yang Digunakan:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(selectedProject.tools) &&
                    selectedProject.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-[11px] font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Story Paragraph */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-primary-container mb-2">
                Cerita Singkat Proyek
              </h4>
              <p className="text-sm text-secondary leading-relaxed">
                {selectedProject.cerita_singkat}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
