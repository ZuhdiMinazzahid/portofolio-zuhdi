import React from 'react';
import { ArrowUpRight } from 'lucide-react';

function renderPlatformIcon(platform) {
  const p = (platform || '').toLowerCase();
  if (p.includes('instagram')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }
  if (p.includes('youtube')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  if (p.includes('linkedin')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (p.includes('tiktok')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.12-4.512V9.394a6.34 6.34 0 0 0-5.32 1.954 6.341 6.341 0 0 0 7.401 9.948 6.34 6.34 0 0 0 3.445-5.624V8.583a8.214 8.214 0 0 0 4.77 1.548V6.686z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function SocialLink({ nama_platform, username, alamat_link }) {
  return (
    <a
      href={alamat_link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#F6F6F8] hover:bg-primary-container text-[#0E0E10] transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-[#FFFFFF] group-hover:bg-[#0E0E10] group-hover:text-primary-container text-[#0E0E10] flex items-center justify-center shrink-0 transition-colors shadow-sm">
          {renderPlatformIcon(nama_platform)}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-[#0E0E10] truncate">
            {nama_platform}
          </p>
          <p className="text-[11px] text-[#5A595E] group-hover:text-on-secondary-fixed/80 truncate">
            {username}
          </p>
        </div>
      </div>

      <div className="w-7 h-7 rounded-full bg-transparent flex items-center justify-center text-[#5A595E] group-hover:text-[#0E0E10]">
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </a>
  );
}
