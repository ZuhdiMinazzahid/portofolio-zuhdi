import React, { useState } from 'react';

/**
 * SkillIcon Component
 * @param {string} nama_keahlian - Tool or software name
 * @param {string} ikon - URL to icon image or SVG
 */
export default function SkillIcon({ nama_keahlian, ikon }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-dark-900/90 border border-white/10 hover:border-brand-accent/50 hover:bg-dark-850 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 select-none"
      title={nama_keahlian}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2 p-1">
        {!imgError && ikon ? (
          <img
            src={ikon}
            alt={nama_keahlian}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-300"
            loading="lazy"
          />
        ) : (
          <span className="w-full h-full rounded-xl bg-brand-blue/20 flex items-center justify-center font-bold text-brand-light text-base">
            {nama_keahlian ? nama_keahlian.slice(0, 2).toUpperCase() : 'SK'}
          </span>
        )}
      </div>

      <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors text-center line-clamp-1">
        {nama_keahlian}
      </span>
    </div>
  );
}
