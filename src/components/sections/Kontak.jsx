import React from 'react';
import ContactForm from '../forms/ContactForm';
import SocialLink from '../items/SocialLink';
import { MessageCircle, Mail, Sparkles, Heart } from 'lucide-react';

export default function Kontak({ profil, links = [], loading = false }) {
  const whatsappNumber =
    profil?.nomor_whatsapp?.replace(/[^0-9]/g, '') || '6281234567890';
  const emailAddress = profil?.email || 'zuhdi.minazzahid@gmail.com';

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Halo Zuhdi, saya tertarik untuk mendiskusikan kerja sama proyek videografi/desain dengan Anda.'
  )}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-4" id="kontak">
      {/* SECTION 4: CONTACT & COLLABORATION (White Rounded Card from Stitch) */}
      <section className="w-full bg-[#FFFFFF] text-[#0E0E10] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl my-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-[#855D00] text-xs mb-3 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            Mari Berkolaborasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E0E10] tracking-tight">
            Mulai Diskusi Proyek Anda
          </h2>
          <p className="text-sm text-[#5A595E] mt-2 leading-relaxed">
            Punya ide video komersial, kampanye media sosial, atau kebutuhan desain identitas merek? Mari bicarakan brief Anda hari ini.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Direct Actions, WhatsApp & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Direct Card */}
            <div className="p-6 rounded-2xl bg-[#EFEFF2] border border-[#E0E0E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0E0E10]">
                    Chat WhatsApp Cepat
                  </h4>
                  <p className="text-xs text-[#5A595E]">
                    Respon langsung & konsultasi singkat
                  </p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0E0E10] text-[#FFFFFF] text-xs font-bold hover:bg-[#25252A] transition-all shrink-0"
              >
                Chat Sekarang
              </a>
            </div>

            {/* Email Direct Card */}
            <div className="p-6 rounded-2xl bg-[#F6F6F8] border border-[#E8E8EC] flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#0E0E10] text-primary-container flex items-center justify-center shrink-0 shadow">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#0E0E10] uppercase tracking-wider">
                  Email Bisnis
                </h4>
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-sm font-semibold text-[#0E0E10] hover:text-[#855D00] truncate block transition-colors"
                >
                  {emailAddress}
                </a>
              </div>
            </div>

            {/* Social Links from Supabase */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#855D00]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E0E10]">
                  Media Sosial & Portofolio
                </span>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 bg-[#F6F6F8] rounded-2xl" />
                  ))}
                </div>
              ) : links.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {links.map((link) => (
                    <SocialLink
                      key={link.id}
                      nama_platform={link.nama_platform}
                      username={link.username}
                      alamat_link={link.alamat_link}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Thank You Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-container/20 to-primary/10 border border-primary-container/30 text-center sm:text-left flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-[#0E0E10]">
                  Thank You for Viewing My Portfolio
                </h5>
                <p className="text-xs text-[#5A595E] mt-0.5">
                  Setiap karya dikerjakan dengan dedikasi dan perhatian penuh terhadap detail cerita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
