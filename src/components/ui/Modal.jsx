import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal Component
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {string} title
 * @param {string} maxWidth - Tailwind max-w class (e.g. 'max-w-2xl', 'max-w-4xl')
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-3xl',
  className = '',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        className={`relative z-10 w-full ${maxWidth} bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 transform transition-all duration-300 animate-scaleUp ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-dark-850/50">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate pr-4">
            {title || 'Detail'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
            aria-label="Tutup jendela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[calc(85vh-100px)] overflow-y-auto text-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
}
