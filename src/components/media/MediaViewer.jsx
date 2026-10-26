import React, { useState } from 'react';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=0&rel=0`
      : url;
  } catch {
    return url;
  }
}

/**
 * Reusable MediaViewer Component
 * @param {Array} mediaList - Array of media_proyek items
 * @param {string} fallbackCover - Fallback cover image URL
 * @param {string} title - Title for alt text
 */
export default function MediaViewer({ mediaList = [], fallbackCover, title = 'Media Proyek' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMedia = mediaList && mediaList.length > 0 ? mediaList[activeIndex] : null;

  return (
    <div className="w-full space-y-3">
      {/* Primary Display Area */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-surface-container-high shadow-lg border border-white/10 flex items-center justify-center">
        {activeMedia?.link_youtube ? (
          <iframe
            src={getYouTubeEmbedUrl(activeMedia.link_youtube)}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : activeMedia?.jenis_media === 'video' && activeMedia?.alamat_file ? (
          <video
            src={activeMedia.alamat_file}
            controls
            preload="metadata"
            className="w-full h-full object-contain bg-black"
          >
            Browser Anda tidak mendukung pemutar video.
          </video>
        ) : (
          <img
            src={activeMedia?.alamat_file || fallbackCover}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
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
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeIndex === idx
                  ? 'bg-primary-container text-on-secondary-fixed shadow'
                  : 'bg-surface-container text-secondary hover:text-white'
              }`}
            >
              {m.jenis_media === 'video' ? '🎬 Video' : '🖼️ Foto'} {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
