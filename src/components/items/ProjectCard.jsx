import React from 'react';
import { Play, Eye, ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  const {
    judul,
    kategori,
    peran,
    tools = [],
    cerita_singkat,
    gambar_sampul,
    tahun,
  } = project;

  const isVideo = kategori === 'video' || kategori === 'dokumentasi';

  const categoryLabels = {
    video: 'Videografi & Editing',
    desain: 'Desain Grafis',
    media_sosial: 'Social Media & Reels',
    dokumentasi: 'Dokumentasi & Cinema',
  };

  const coverUrl =
    gambar_sampul ||
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80';

  return (
    <div
      onClick={() => onSelect(project)}
      className="project-card group bg-surface-container-low rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer border border-white/5 hover:border-primary-container/40"
    >
      {/* Thumbnail Aspect Video with Overlay */}
      <div className="relative w-full aspect-video overflow-hidden bg-surface-container">
        <img
          src={coverUrl}
          alt={judul}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Category Capsule Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold shadow-md">
          {categoryLabels[kategori] || kategori}
        </span>

        {/* Hover Center Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <span className="w-14 h-14 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            {isVideo ? (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </span>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-secondary mb-2">
            <span className="truncate pr-2 font-medium">Peran: {peran}</span>
            {tahun && (
              <span className="shrink-0 px-2 py-0.5 rounded bg-surface-container-high text-[11px]">
                {tahun}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-primary-container transition-colors line-clamp-1">
            {judul}
          </h3>

          <p className="text-xs text-secondary mt-2 line-clamp-2 leading-relaxed">
            {cerita_singkat}
          </p>
        </div>

        {/* Footer with Tools & Detail Action */}
        <div className="pt-5 mt-4 border-t border-surface-variant/30 flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 overflow-hidden max-h-7">
            {Array.isArray(tools) &&
              tools.slice(0, 2).map((tool, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] text-on-surface truncate"
                >
                  {tool}
                </span>
              ))}
            {Array.isArray(tools) && tools.length > 2 && (
              <span className="text-[10px] text-secondary">
                +{tools.length - 2}
              </span>
            )}
          </div>

          <button
            type="button"
            className="text-primary-container hover:underline text-xs font-bold inline-flex items-center gap-1 shrink-0"
          >
            <span>Detail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
