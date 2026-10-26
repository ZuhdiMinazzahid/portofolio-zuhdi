# Urutan Pengerjaan Website Portofolio

Dokumen ini adalah panduan kerja untuk agen di Antigravity. Simpan di root repo (misalnya `PLAN.md`), lalu minta agen mengerjakan **satu fase per giliran**.

## Konteks Proyek

- **Pemilik:** Zuhdi Minazzahid, videografer dan desainer grafis.
- **Tujuan:** website portofolio satu halaman yang fokus ke karya, bukan salinan CV.
- **Menu:** Profil | Proyek | Kontak. Tema gelap, judul besar "Portfolio 2026", grid karya, penutup "Thank You".
- **Acuan desain:** folder `design/` (hasil export dari Stitch: screenshot dan atau kode HTML). Ikuti warna, font, jarak, dan tata letaknya.

## Teknologi

- React (Vite), file `.jsx`, komponen reusable
- Tailwind CSS
- Supabase (Postgres, Storage, RLS) lewat `@supabase/supabase-js`
- React Router hanya jika benar-benar perlu (versi 1 satu halaman)
- Deploy: Vercel atau Netlify

## Aturan untuk Agen

1. Kerjakan **satu fase** lalu berhenti, tulis ringkasan apa yang selesai, dan tunggu konfirmasi sebelum lanjut.
2. Komponen harus **reusable**: menerima data lewat props, satu komponen satu tugas.
3. Pengambilan data Supabase **hanya** di folder `src/hooks/`, tidak di dalam komponen tampilan.
4. Nama tabel dan kolom memakai **bahasa Indonesia** persis seperti skema di bawah. Jangan diganti ke Inggris.
5. Hanya pakai **anon key** di front end. Kunci `service_role` tidak boleh masuk kode atau repo.
6. File `.env` tidak boleh di-commit. Sediakan `.env.example`.
7. Tangani kondisi **loading, error, dan data kosong** di setiap bagian yang mengambil data.
8. Jangan menambah fitur di luar daftar (tidak ada halaman admin di versi 1).
9. Commit kecil dan sering dengan pesan commit yang jelas.

## Struktur Folder Target

```
design/                  -> export dari Stitch
supabase/
  schema.sql             -> tabel, bucket, RLS
  seed.sql               -> data dummy
src/
  components/
    ui/                  -> Button, Card, Modal, SectionTitle
    layout/              -> Navbar, Footer
    sections/            -> Hero, Profil, Proyek, Kontak
    items/               -> ProjectCard, SkillIcon, RiwayatItem, SocialLink
    media/               -> MediaViewer
    forms/               -> ContactForm
  hooks/                 -> useProfil, useKeahlian, useRiwayat, useProyek, useLinkSosial
  lib/                   -> supabaseClient.js
  App.jsx
  main.jsx
.env.example
```

## Skema Database (Supabase)

| Tabel | Kolom |
|---|---|
| `profil` (1 baris) | `id`, `nama_lengkap`, `jabatan`, `tentang_saya`, `foto_profil`, `nomor_whatsapp`, `email`, `file_cv` |
| `keahlian` | `id`, `nama_keahlian`, `ikon`, `urutan` |
| `riwayat` | `id`, `jenis` (`pendidikan` atau `pengalaman`), `judul`, `keterangan`, `periode`, `urutan` |
| `proyek` | `id`, `judul`, `kategori` (`video`, `desain`, `media_sosial`, `dokumentasi`), `peran`, `tools` (text[]), `cerita_singkat`, `gambar_sampul`, `tahun`, `tampilkan` (boolean), `urutan` |
| `media_proyek` | `id`, `id_proyek` (relasi ke `proyek`, hapus berantai), `jenis_media` (`foto` atau `video`), `alamat_file`, `link_youtube`, `urutan` |
| `link_sosial` | `id`, `nama_platform`, `username`, `alamat_link`, `urutan` |
| `pesan_masuk` | `id`, `nama_pengirim`, `email_pengirim`, `isi_pesan`, `sudah_dibaca` (default false), `dikirim_pada` (default now) |

Semua `id` bertipe uuid dengan default `gen_random_uuid()`.

**Storage bucket:** `media-proyek` (foto dan video karya), `berkas` (foto profil, ikon, CV). Keduanya publik untuk dibaca, hanya admin yang boleh menulis.

**Aturan RLS:**
- Aktifkan RLS di semua tabel.
- Pengunjung (anon): boleh **membaca** semua tabel (untuk `proyek` hanya baris `tampilkan = true`), dan boleh **menambah** baris ke `pesan_masuk`.
- Pengunjung **tidak boleh** membaca `pesan_masuk`.
- Hanya pengguna yang login (admin) yang boleh menambah, mengubah, dan menghapus data, serta membaca `pesan_masuk`.

---

## Fase 0: Persiapan

**Tugas**
- [ ] Buat project Vite + React di repo ini.
- [ ] Pasang dan atur Tailwind CSS.
- [ ] Pasang `@supabase/supabase-js`.
- [ ] Buat `.env.example` berisi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
- [ ] Buat `src/lib/supabaseClient.js`.
- [ ] Buat struktur folder sesuai target di atas.
- [ ] Baca isi `design/`, lalu masukkan **warna, font, dan ukuran** dari desain ke konfigurasi tema Tailwind.

**Selesai jika:** `npm run dev` jalan tanpa error dan tema Tailwind sudah memuat warna dan font dari desain.

## Fase 1: Database dan Storage

**Tugas**
- [ ] Tulis `supabase/schema.sql`: semua tabel sesuai skema, relasi, dan check constraint.
- [ ] Tambahkan aturan RLS di file yang sama.
- [ ] Tulis instruksi pembuatan bucket `media-proyek` dan `berkas` beserta kebijakan aksesnya.
- [ ] Tulis `supabase/seed.sql`: data dummy (1 profil, 5 keahlian, 4 riwayat, 3 proyek dengan media, 4 link sosial).
- [ ] Berikan langkah singkat untuk menjalankan SQL di SQL Editor Supabase dan mengunggah aset dummy.

**Selesai jika:** SQL berjalan tanpa error di Supabase, data dummy muncul di Table Editor, dan query baca dari klien anon berhasil.

## Fase 2: Komponen Dasar

**Tugas**
- [ ] Buat `Button`, `Card`, `Modal`, `SectionTitle` (reusable, bervarian lewat props).
- [ ] Buat `Navbar` (menu Profil, Proyek, Kontak, scroll halus ke bagian) dan `Footer`.
- [ ] Terapkan tema gelap dan tipografi sesuai desain.
- [ ] Buat halaman sementara yang menampilkan semua komponen dasar untuk dicek tampilannya.

**Selesai jika:** komponen terlihat sesuai desain Stitch dan bisa dipakai ulang tanpa menyalin kode.

## Fase 3: Hero dan Profil

**Tugas**
- [ ] Buat `Hero` (judul Portfolio 2026, foto profil, jabatan, tombol Lihat Karya dan Unduh CV).
- [ ] Buat `Profil` (sapaan, tentang saya, ikon keahlian, pendidikan, pengalaman singkat).
- [ ] Buat `SkillIcon` dan `RiwayatItem`.
- [ ] Buat hook `useProfil`, `useKeahlian`, `useRiwayat` yang mengambil data dari Supabase.
- [ ] Tampilkan skeleton saat loading dan pesan ramah jika data kosong atau gagal dimuat.

**Selesai jika:** Hero dan Profil tampil dengan data dari Supabase dan cocok dengan desain.

## Fase 4: Proyek

**Tugas**
- [ ] Buat `Proyek` (judul bagian "Recap Project 2026" dan grid karya).
- [ ] Buat `ProjectCard` dengan gambar sampul, judul, dan kategori.
- [ ] Buat `CategoryFilter` (opsional, hanya jika ada di desain).
- [ ] Buat hook `useProyek` (hanya `tampilkan = true`, urut berdasarkan `urutan`).
- [ ] Buat `MediaViewer` yang menampilkan foto atau video (file Storage atau embed YouTube).
- [ ] Klik kartu membuka `Modal` berisi judul, kategori, peran, tools, cerita singkat, dan media.
- [ ] Video tidak diputar otomatis; gambar memakai lazy loading.

**Selesai jika:** grid karya tampil, modal detail menampilkan foto dan video dengan benar, dan tidak ada gambar yang memperlambat halaman.

## Fase 5: Kontak

**Tugas**
- [ ] Buat `Kontak` (foto, ikon sosial dari `link_sosial`, tombol WhatsApp, tulisan "Thank You").
- [ ] Buat `SocialLink` dan hook `useLinkSosial`.
- [ ] Buat `ContactForm` (nama, email, pesan) yang menyimpan ke `pesan_masuk`.
- [ ] Validasi isian, batasi panjang pesan, tambahkan kolom jebakan tersembunyi untuk anti spam.
- [ ] Tampilkan notifikasi berhasil atau gagal setelah kirim.

**Selesai jika:** pesan dari form masuk ke tabel `pesan_masuk`, dan pengunjung tidak bisa membaca isi tabel itu.

## Fase 6: Penyempurnaan

**Tugas**
- [ ] Cek tampilan di lebar HP, tablet, dan laptop, perbaiki yang berantakan.
- [ ] Tambahkan judul halaman, deskripsi, dan gambar pratinjau (meta tag) untuk berbagi link.
- [ ] Pastikan semua gambar punya teks alternatif dan kontras warna cukup.
- [ ] Cek performa (Lighthouse), kompres aset berat bila perlu.
- [ ] Rapikan kode: hapus yang tidak terpakai, pastikan tidak ada kunci rahasia di repo.

**Selesai jika:** skor Lighthouse Performance di HP minimal 85 dan tidak ada error di konsol.

## Fase 7: Konten Asli dan Rilis

**Tugas (dikerjakan bersama pemilik)**
- [ ] Ganti data dummy dengan data asli lewat dashboard Supabase (6 sampai 8 karya terbaik).
- [ ] Video panjang diunggah ke YouTube dan dimasukkan lewat kolom `link_youtube`; Supabase hanya untuk foto dan klip pendek yang sudah dikompres.
- [ ] Deploy ke Vercel atau Netlify, isi variabel lingkungan Supabase di pengaturan hosting.
- [ ] Tes di HP asli dan beberapa browser.
- [ ] Pasang domain bila sudah ada.

**Selesai jika:** website live, semua bagian menampilkan konten asli, dan form kontak berfungsi di versi online.

---

## Prompt Siap Pakai per Fase

Tempel salah satu ke chat agen, sesuaikan nomor fasenya:

> Baca `PLAN.md` dan folder `design/`. Kerjakan **Fase N** saja, ikuti aturan untuk agen. Setelah selesai, tuliskan ringkasan apa yang dibuat, file yang berubah, dan cara mengeceknya, lalu berhenti dan tunggu konfirmasi saya.

## Catatan untuk Pemilik

- Review hasil tiap fase di browser sebelum lanjut ke fase berikutnya.
- Jika tampilan beda dari desain, kirim screenshot dan sebutkan bagian yang kurang pas.
- Simpan `.env` hanya di komputer dan di pengaturan hosting, jangan dibagikan.
