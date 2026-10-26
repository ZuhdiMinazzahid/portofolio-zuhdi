# PRD Website Portofolio (Versi Simple)

**Pemilik:** Zuhdi Minazzahid
**Stack:** React (komponen reusable `.jsx`) + Supabase (database dan storage)

## 1. Ringkasan

Website portofolio satu halaman untuk menampilkan **karya** di bidang videografi, video editing, dan desain grafis. Fokusnya ke karya, bukan salinan CV. Cukup perkenalan singkat, keahlian, dan kumpulan karya terbaik.

Gaya mengikuti contoh portofolio yang kamu kirim: tema gelap, judul besar "Portfolio 2026", foto profil menonjol, grid karya, dan penutup "Thank You".

## 2. Tujuan

- Menunjukkan karya terbaik dalam sekali lihat.
- Mudah dihubungi (WhatsApp, Instagram, email).
- Ringan dibuka dan rapi di HP maupun laptop.
- Foto dan video proyek bisa diunggah dan diganti kapan saja lewat Supabase.

## 3. Struktur Halaman

Navigasi atas dengan 3 menu: **Profil | Proyek | Kontak**.

| Bagian | Isi | Catatan |
|---|---|---|
| **Pembuka (Hero)** | Judul "Portfolio 2026", foto profil, jabatan (Videografer & Desainer Grafis), tombol Lihat Karya | Layar pertama, bersih dan besar |
| **Profil** | Sapaan, tentang saya (2 sampai 3 kalimat), ikon software, pendidikan, pengalaman singkat | Maksimal 1 layar |
| **Proyek** | "Recap Project 2026": grid 6 sampai 8 karya terbaik, klik untuk lihat detail | Bagian utama |
| **Kontak** | Foto, ikon sosial media (Instagram, TikTok, YouTube, LinkedIn), tombol WhatsApp, form pesan singkat, tulisan "Thank You" | Penutup |

### Prinsip isi (supaya tidak jadi CV)

- **Tentang saya:** 2 sampai 3 kalimat saja.
- **Pengalaman:** 3 sampai 4 highlight, satu baris per item (contoh: Suska TV, Wakil Station Manager, 2023 - Sekarang).
- **Pendidikan:** satu baris.
- **Keahlian:** ikon software saja (Premiere Pro, Photoshop, Audition, Canva, CapCut), tanpa daftar panjang.
- **Detail lengkap** tetap ada di CV, cukup disediakan tombol **Unduh CV**.
- **Karya:** pilih yang terbaik, kualitas lebih penting daripada jumlah.

### Halaman detail proyek

Saat kartu karya diklik, tampil jendela atau halaman kecil berisi: judul, kategori, peran, tools, foto atau video, dan satu paragraf cerita singkat.

## 4. Teknologi

| Bagian | Pilihan |
|---|---|
| Front end | React (Vite), file `.jsx`, komponen reusable |
| Styling | Tailwind CSS |
| Data dan file | Supabase (database dan Storage) |
| Hosting | Vercel atau Netlify |

**Pengelolaan konten (versi 1):** karya, foto, dan video diunggah lewat **dashboard Supabase** (Table Editor dan Storage), jadi belum perlu membuat halaman admin sendiri. Halaman admin bisa ditambah nanti kalau dibutuhkan.

## 5. Komponen React (reusable)

| Kelompok | Komponen |
|---|---|
| Dasar | `Button.jsx`, `Card.jsx`, `Modal.jsx`, `SectionTitle.jsx` |
| Tata letak | `Navbar.jsx`, `Footer.jsx` |
| Bagian halaman | `Hero.jsx`, `Profil.jsx`, `Proyek.jsx`, `Kontak.jsx` |
| Item | `ProjectCard.jsx`, `SkillIcon.jsx`, `RiwayatItem.jsx`, `SocialLink.jsx` |
| Media | `MediaViewer.jsx` (menampilkan foto atau video) |
| Fitur | `ContactForm.jsx`, `CategoryFilter.jsx` (opsional) |

Aturan: komponen hanya menerima data lewat props; pengambilan data dari Supabase dilakukan di folder `hooks/`.

## 6. Database Supabase

Nama tabel dan kolom memakai bahasa Indonesia sederhana.

### `profil` (1 baris)

| Kolom | Isi |
|---|---|
| `id` | Kunci utama |
| `nama_lengkap` | Zuhdi Minazzahid |
| `jabatan` | Videografer & Desainer Grafis |
| `tentang_saya` | 2 sampai 3 kalimat |
| `foto_profil` | Alamat foto di Storage |
| `nomor_whatsapp` | Untuk tombol WhatsApp |
| `email` | |
| `file_cv` | Alamat CV (PDF) di Storage |

### `keahlian`

| Kolom | Isi |
|---|---|
| `id` | Kunci utama |
| `nama_keahlian` | Contoh: Adobe Premiere Pro |
| `ikon` | Alamat gambar ikon |
| `urutan` | Urutan tampil |

### `riwayat` (pendidikan dan pengalaman singkat)

| Kolom | Isi |
|---|---|
| `id` | Kunci utama |
| `jenis` | `pendidikan` atau `pengalaman` |
| `judul` | Contoh: Wakil Station Manager, Suska TV |
| `keterangan` | Satu baris singkat |
| `periode` | Contoh: 2023 - Sekarang |
| `urutan` | Urutan tampil |

### `proyek`

| Kolom | Isi |
|---|---|
| `id` | Kunci utama |
| `judul` | Judul karya |
| `kategori` | `video`, `desain`, `media_sosial`, atau `dokumentasi` |
| `peran` | Contoh: Editor |
| `tools` | Daftar software yang dipakai |
| `cerita_singkat` | Satu paragraf |
| `gambar_sampul` | Alamat gambar utama |
| `tahun` | |
| `tampilkan` | Tampil atau disembunyikan |
| `urutan` | Urutan tampil |

### `media_proyek` (foto dan video tiap karya)

| Kolom | Isi |
|---|---|
| `id` | Kunci utama |
| `id_proyek` | Terhubung ke `proyek` |
| `jenis_media` | `foto` atau `video` |
| `alamat_file` | Alamat file di Storage |
| `link_youtube` | Opsional, untuk video panjang |
| `urutan` | Urutan tampil |

### `link_sosial`

| Kolom | Isi |
|---|---|
| `id` | Kunci utama |
| `nama_platform` | Instagram, TikTok, YouTube, LinkedIn |
| `username` | Contoh: @zuhdi |
| `alamat_link` | Link lengkap |
| `urutan` | Urutan tampil |

### `pesan_masuk`

| Kolom | Isi |
|---|---|
| `id` | Kunci utama |
| `nama_pengirim` | |
| `email_pengirim` | |
| `isi_pesan` | |
| `sudah_dibaca` | Default `false` |
| `dikirim_pada` | Otomatis |

**Hubungan:** satu `proyek` punya banyak `media_proyek`. Tabel lain berdiri sendiri.

## 7. Penyimpanan File (Storage)

| Bucket | Isi |
|---|---|
| `media-proyek` | Foto dan video karya |
| `berkas` | Foto profil, ikon, dan CV |

Catatan video: paket gratis Supabase punya batas ukuran file, jadi video panjang lebih aman di YouTube (isi `link_youtube`). Supabase dipakai untuk foto dan klip pendek yang sudah dikompres.

## 8. Keamanan

- Aktifkan RLS di semua tabel.
- Pengunjung hanya bisa **membaca** data yang tampil dan **mengirim** pesan lewat form kontak.
- Hanya akun admin (login Supabase) yang bisa mengubah data dan membaca `pesan_masuk`.
- Di React hanya memakai kunci publik (anon key).

## 9. Tahapan Pengerjaan

1. Siapkan proyek React, Tailwind, dan Supabase.
2. Buat tabel dan bucket, lalu isi data awal.
3. Buat komponen dasar dan tampilan tema gelap.
4. Rangkai bagian Hero, Profil, Proyek, dan Kontak dengan data Supabase.
5. Rapikan tampilan di HP, uji coba, lalu deploy.

## 10. Pertanyaan Terbuka

1. Warna aksen yang diinginkan (biru seperti contoh, atau warna lain)?
2. Karya apa saja yang akan jadi 6 sampai 8 proyek pertama?
3. Mau pakai domain sendiri atau domain gratis dari hosting dulu?
