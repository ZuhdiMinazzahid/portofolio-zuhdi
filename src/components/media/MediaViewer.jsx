import React, { useState, useEffect } from 'react';
import { ExternalLink, Play, LayoutGrid } from 'lucide-react';
import { parseSocialMediaUrl, renderPlatformIcon } from '../../lib/mediaHelper';

/**
 * Reusable MediaViewer Component
 * Seamlessly handles any media:
 * - Social Media Links: Instagram (Reels/Posts), TikTok, YouTube, Facebook, Drive, Vimeo, etc.
 * - Uploaded native video (MP4/WebM)
 * - High-resolution photos (preserving 4:3 portrait, 16:9 landscape, or 1:1 square)
 *
 * @param {Array} mediaList - Array of media_proyek items
 * @param {string} fallbackCover - Fallback cover image URL
 * @param {string} title - Title for alt text & display
 */
export default function MediaViewer({ mediaList = [], fallbackCover, title = 'Media Proyek' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMedia = mediaList && mediaList.length > 0 ? mediaList[activeIndex] : null;
  const externalUrl = activeMedia?.link_youtube;
  const parsedLink = parseSocialMediaUrl(externalUrl);

  // View mode for social links: 'embed' or 'card'
  const [viewMode, setViewMode] = useState(parsedLink?.defaultMode || 'embed');

  // Whenever active media or link changes, reset view mode to the platform's safe default
  useEffect(() => {
    if (parsedLink) {
      setViewMode(parsedLink.defaultMode);
    }
  }, [externalUrl]);

  return (
    <div className="w-full space-y-3">
      {/* Primary Display Area */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-container-high shadow-2xl border border-white/10 flex items-center justify-center">
        {/* CASE 1: External Social Media Link (Instagram, TikTok, YouTube, Drive, Facebook, etc.) */}
        {parsedLink ? (
          viewMode === 'embed' && parsedLink.canEmbed && parsedLink.embedUrl ? (
            <div className="relative w-full h-full bg-black flex flex-col">
              {/* Top Banner with Platform Indicator and Direct Link Button */}
              <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-white/10 text-white flex items-center justify-center">
                    {renderPlatformIcon(parsedLink.platform, 'w-3.5 h-3.5')}
                  </span>
                  <span className="text-xs font-bold text-white drop-shadow">
                    {parsedLink.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('card')}
                    className="text-[11px] text-secondary hover:text-white px-2.5 py-1 rounded-full bg-black/60 border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Beralih ke tampilan kartu"
                  >
                    <LayoutGrid className="w-3 h-3" />
                    <span>Kartu</span>
                  </button>
                  <a
                    href={parsedLink.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-on-secondary-fixed text-xs font-bold hover:bg-primary-fixed-dim transition-all shadow"
                  >
                    <span>Buka Aplikasi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Responsive Iframe Embed */}
              <iframe
                src={parsedLink.embedUrl}
                title={title}
                className="w-full h-full border-0 pt-7"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            /* SOCIAL MEDIA SHOWCASE CARD (Default for Instagram, TikTok, Facebook, etc. to prevent browser iframe blocks) */
            <div className="relative w-full h-full bg-[#0E0E12] flex flex-col items-center justify-center p-6 text-center overflow-hidden group select-none">
              {/* Blurred Ambient Backdrop using cover image */}
              {fallbackCover && (
                <img
                  src={fallbackCover}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 scale-110 pointer-events-none"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 pointer-events-none" />

              {/* Center Content */}
              <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto space-y-3.5">
                {/* Floating Platform Icon */}
                <div
                  className="w-16 h-16 rounded-3xl backdrop-blur-md bg-white/10 border border-white/15 shadow-2xl flex items-center justify-center text-white transform group-hover:scale-110 transition-all duration-300"
                  style={{
                    boxShadow: `0 10px 30px -5px ${parsedLink.brandColor}40`,
                  }}
                >
                  {renderPlatformIcon(parsedLink.platform, 'w-8 h-8')}
                </div>

                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-white/10 text-white backdrop-blur-sm border border-white/10">
                    {parsedLink.name}
                  </span>
                  <h4 className="text-white font-bold text-base sm:text-lg mt-1.5 line-clamp-1">
                    {title}
                  </h4>
                  <p className="text-[11px] text-secondary mt-1 leading-relaxed">
                    Karya ini dipublikasikan di {parsedLink.name}. Tonton video / konten selengkapnya langsung di aplikasi.
                  </p>
                </div>

                {/* Primary Action Button */}
                <a
                  href={parsedLink.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-secondary-fixed text-xs sm:text-sm font-bold shadow-xl hover:bg-primary-fixed-dim hover:scale-105 transition-all duration-300"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Buka di {parsedLink.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Optional Embed Switcher (if the platform supports iframe embeds) */}
                {parsedLink.canEmbed && (
                  <button
                    type="button"
                    onClick={() => setViewMode('embed')}
                    className="text-[11px] text-secondary hover:text-white underline cursor-pointer pt-1 transition-colors"
                  >
                    Coba muat pratinjau di dalam halaman
                  </button>
                )}
              </div>
            </div>
          )
        ) : activeMedia?.jenis_media === 'video' && activeMedia?.alamat_file ? (
          /* CASE 2: Uploaded Direct Video (MP4/WebM) */
          <video
            src={activeMedia.alamat_file}
            controls
            preload="metadata"
            className="w-full h-full object-contain bg-black"
          >
            Browser Anda tidak mendukung pemutar video.
          </video>
        ) : (
          /* CASE 3: Photo (High-Res Image, handles 4:3 portrait, 16:9, or 1:1 without cropping) */
          <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
            {/* Ambient Blurred Background to prevent black bars */}
            <img
              src={activeMedia?.alamat_file || fallbackCover}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
            />
            {/* Actual Image Contained Cleanly */}
            <img
              src={activeMedia?.alamat_file || fallbackCover}
              alt={title}
              className="relative max-h-full max-w-full object-contain z-10 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Multiple Media Thumbnails / Navigation (if project has more than 1 media) */}
      {mediaList && mediaList.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {mediaList.map((m, idx) => (
            <button
              key={m.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'bg-primary-container text-on-secondary-fixed shadow'
                  : 'bg-surface-container text-secondary hover:text-white'
              }`}
            >
              {m.link_youtube
                ? '🌐 Link Media'
                : m.jenis_media === 'video'
                ? '🎬 Video'
                : '🖼️ Foto'}{' '}
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
