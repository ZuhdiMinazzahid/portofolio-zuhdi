import React, { useState } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminProyekTab from './AdminProyekTab';
import AdminPesanTab from './AdminPesanTab';
import AdminProfilTab from './AdminProfilTab';
import AdminKeahlianTab from './AdminKeahlianTab';
import AdminRiwayatTab from './AdminRiwayatTab';
import AdminSosialTab from './AdminSosialTab';
import {
  Film,
  Mail,
  User,
  Wrench,
  History,
  Share2,
  LogOut,
  ExternalLink,
  Loader2,
} from 'lucide-react';

export default function AdminDashboard({ onBackToSite }) {
  const { session, user, loading, login, signup, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('proyek');

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-container-lowest text-on-surface flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-container" />
      </div>
    );
  }

  if (!session) {
    return (
      <AdminLogin
        onLogin={login}
        onBackToSite={onBackToSite}
      />
    );
  }

  const tabs = [
    { id: 'proyek', label: 'Proyek & Karya', icon: Film },
    { id: 'pesan', label: 'Pesan Masuk', icon: Mail },
    { id: 'profil', label: 'Profil & Bio', icon: User },
    { id: 'keahlian', label: 'Keahlian / Tools', icon: Wrench },
    { id: 'riwayat', label: 'Riwayat & Karier', icon: History },
    { id: 'sosial', label: 'Link Sosial', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col font-sans selection:bg-primary-container selection:text-on-primary-container antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center font-extrabold text-sm shadow-md">
            ZM
          </div>
          <div>
            <h2 className="font-bold text-base text-white leading-tight">
              Admin Portal
            </h2>
            <p className="text-[11px] text-secondary truncate max-w-[200px] sm:max-w-xs">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-semibold text-secondary hover:text-white hover:bg-surface-container transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Website</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-secondary-fixed shadow-md'
                    : 'bg-surface-container text-secondary hover:text-white hover:bg-surface-container-high'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="bg-surface-container-low/70 rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl">
          {activeTab === 'proyek' && <AdminProyekTab />}
          {activeTab === 'pesan' && <AdminPesanTab />}
          {activeTab === 'profil' && <AdminProfilTab />}
          {activeTab === 'keahlian' && <AdminKeahlianTab />}
          {activeTab === 'riwayat' && <AdminRiwayatTab />}
          {activeTab === 'sosial' && <AdminSosialTab />}
        </div>
      </div>
    </div>
  );
}
