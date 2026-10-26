import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

/**
 * RiwayatItem Component (Experience or Education concise highlight)
 * @param {string} judul
 * @param {string} keterangan
 * @param {string} periode
 * @param {'pengalaman' | 'pendidikan'} jenis
 */
export default function RiwayatItem({ judul, keterangan, periode, jenis = 'pengalaman' }) {
  const Icon = jenis === 'pendidikan' ? GraduationCap : Briefcase;

  return (
    <div className="flex items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-dark-900/60 border border-white/5 hover:border-white/15 hover:bg-dark-850/60 transition-all duration-200">
      <div className="flex items-start sm:items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-dark-800 border border-white/10 flex items-center justify-center text-brand-light shrink-0 mt-0.5 sm:mt-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <h5 className="text-sm font-semibold text-white tracking-tight truncate">
            {judul}
          </h5>
          {keterangan && (
            <p className="text-xs text-slate-400 truncate">
              {keterangan}
            </p>
          )}
        </div>
      </div>

      {periode && (
        <span className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-dark-800 border border-white/10 text-slate-300">
          {periode}
        </span>
      )}
    </div>
  );
}
