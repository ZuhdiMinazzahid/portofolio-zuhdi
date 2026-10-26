import React from 'react';

/**
 * Reusable Section Title Component
 * @param {string} badge - small category badge above title
 * @param {string} title - main section heading
 * @param {string} subtitle - supporting description
 * @param {'left' | 'center'} align - text alignment
 */
export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 bg-brand-blue/10 text-brand-light border border-brand-blue/20 ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          {badge}
        </div>
      )}

      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          {title}
        </h2>
      )}

      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
