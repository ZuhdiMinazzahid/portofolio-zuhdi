import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';

export default function Footer({
  brandName = 'Zuhdi Minazzahid',
  tagline = 'Videografer & Desainer Grafis',
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-variant/40 bg-surface-container-lowest py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-white tracking-tight">
              {brandName}
            </h4>
            <p className="text-xs text-secondary mt-1">
              {tagline} • Portfolio 2026
            </p>
          </div>

          {/* Center Thank You */}
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-primary-container/15 text-primary-container border border-primary-container/30">
              Thank you for visiting
            </span>
          </div>

          {/* Back to Top */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-semibold text-secondary hover:text-white px-4 py-2.5 rounded-full bg-surface-container border border-surface-variant hover:border-primary-container/40 transition-all cursor-pointer"
              aria-label="Kembali ke atas"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surface-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary/60">
          <div>
            © 2026 {brandName}. All rights reserved.
          </div>
          <a
            href="#admin"
            className="hover:text-primary-container transition-colors inline-flex items-center gap-1.5 opacity-60 hover:opacity-100"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
