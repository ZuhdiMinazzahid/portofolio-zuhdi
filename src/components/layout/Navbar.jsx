import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

export default function Navbar({
  brandName = 'Zuhdi Minazzahid',
  fotoProfil,
  cvUrl,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Profil & Layanan', href: '#profil' },
    { label: 'Karya & Proyek', href: '#proyek' },
    { label: 'Kontak', href: '#kontak' },
  ];

  const defaultAvatar =
    fotoProfil ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform">
            ZM
          </div>
          <span className="font-bold text-lg text-on-surface tracking-tight hidden sm:inline-block group-hover:text-primary-container transition-colors">
            {brandName}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-secondary hover:text-primary-container transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Avatar */}
        <div className="flex items-center gap-3">
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Unduh CV
            </a>
          )}

          <Button href="#kontak" variant="primary" size="sm">
            Hubungi Saya
          </Button>

          <img
            alt="Profile Avatar"
            src={defaultAvatar}
            className="w-8 h-8 rounded-full object-cover ml-1 border border-outline-variant/40"
          />

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-secondary hover:text-white bg-surface-container-high focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-[#141416] border-b border-surface-variant space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-secondary hover:text-primary-container"
            >
              {link.label}
            </a>
          ))}
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-sm font-semibold text-on-surface"
            >
              Unduh CV
            </a>
          )}
        </div>
      )}
    </header>
  );
}
