-- ==============================================================================
-- SKEMA DATABASE PORTOFOLIO ZUHDI MINAZZAHID
-- ==============================================================================

-- 1. TABEL: profil (Data identitas pemilik - 1 baris)
CREATE TABLE IF NOT EXISTS profil (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_lengkap VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    tentang_saya TEXT NOT NULL,
    foto_profil TEXT,
    nomor_whatsapp VARCHAR(50),
    email VARCHAR(255),
    file_cv TEXT,
    dibuat_pada TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL: keahlian (Daftar software & skills dengan ikon)
CREATE TABLE IF NOT EXISTS keahlian (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_keahlian VARCHAR(100) NOT NULL,
    ikon TEXT NOT NULL,
    urutan INT DEFAULT 0
);

-- 3. TABEL: riwayat (Pendidikan dan Pengalaman singkat)
CREATE TABLE IF NOT EXISTS riwayat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jenis VARCHAR(50) NOT NULL CHECK (jenis IN ('pendidikan', 'pengalaman')),
    judul VARCHAR(255) NOT NULL,
    keterangan TEXT NOT NULL,
    periode VARCHAR(100) NOT NULL,
    urutan INT DEFAULT 0
);

-- 4. TABEL: proyek (Katalog karya portofolio)
CREATE TABLE IF NOT EXISTS proyek (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(50) NOT NULL CHECK (kategori IN ('video', 'desain', 'media_sosial', 'dokumentasi')),
    peran VARCHAR(150) NOT NULL,
    tools TEXT[] DEFAULT '{}',
    cerita_singkat TEXT NOT NULL,
    gambar_sampul TEXT,
    tahun VARCHAR(10),
    tampilkan BOOLEAN DEFAULT TRUE,
    urutan INT DEFAULT 0,
    dibuat_pada TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABEL: media_proyek (Detail foto & video untuk tiap karya)
CREATE TABLE IF NOT EXISTS media_proyek (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_proyek UUID NOT NULL REFERENCES proyek(id) ON DELETE CASCADE,
    jenis_media VARCHAR(20) NOT NULL CHECK (jenis_media IN ('foto', 'video')),
    alamat_file TEXT,
    link_youtube TEXT,
    urutan INT DEFAULT 0
);

-- 6. TABEL: link_sosial (Tautan media sosial & kontak)
CREATE TABLE IF NOT EXISTS link_sosial (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_platform VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    alamat_link TEXT NOT NULL,
    urutan INT DEFAULT 0
);

-- 7. TABEL: pesan_masuk (Pesan dari form kontak)
CREATE TABLE IF NOT EXISTS pesan_masuk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_pengirim VARCHAR(255) NOT NULL,
    email_pengirim VARCHAR(255) NOT NULL,
    isi_pesan TEXT NOT NULL,
    sudah_dibaca BOOLEAN DEFAULT FALSE,
    dikirim_pada TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- PENGATURAN ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Aktifkan RLS di semua tabel
ALTER TABLE profil ENABLE ROW LEVEL SECURITY;
ALTER TABLE keahlian ENABLE ROW LEVEL SECURITY;
ALTER TABLE riwayat ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyek ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_proyek ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_sosial ENABLE ROW LEVEL SECURITY;
ALTER TABLE pesan_masuk ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- KEBIJAKAN AKSES PUBLIK (PENGUNJUNG / ANON)
-- ------------------------------------------------------------------------------

-- Pengunjung boleh membaca profil
CREATE POLICY "Publik dapat melihat profil" 
ON profil FOR SELECT 
TO anon, authenticated 
USING (true);

-- Pengunjung boleh melihat keahlian
CREATE POLICY "Publik dapat melihat keahlian" 
ON keahlian FOR SELECT 
TO anon, authenticated 
USING (true);

-- Pengunjung boleh melihat riwayat
CREATE POLICY "Publik dapat melihat riwayat" 
ON riwayat FOR SELECT 
TO anon, authenticated 
USING (true);

-- Pengunjung HANYA boleh melihat proyek yang tampilkan = true
CREATE POLICY "Publik dapat melihat proyek yang aktif" 
ON proyek FOR SELECT 
TO anon, authenticated 
USING (tampilkan = true);

-- Pengunjung boleh melihat media proyek
CREATE POLICY "Publik dapat melihat media proyek" 
ON media_proyek FOR SELECT 
TO anon, authenticated 
USING (true);

-- Pengunjung boleh melihat tautan sosial
CREATE POLICY "Publik dapat melihat link sosial" 
ON link_sosial FOR SELECT 
TO anon, authenticated 
USING (true);

-- Pengunjung BOLEH mengirim pesan (INSERT), tapi TIDAK BOLEH membaca pesan
CREATE POLICY "Publik dapat mengirim pesan masuk" 
ON pesan_masuk FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- KEBIJAKAN AKSES ADMIN (AUTHENTICATED)
-- Pengguna terautentikasi (admin login di Supabase) memiliki akses penuh
-- ------------------------------------------------------------------------------

CREATE POLICY "Admin full access profil" ON profil FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access keahlian" ON keahlian FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access riwayat" ON riwayat FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access proyek" ON proyek FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access media_proyek" ON media_proyek FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access link_sosial" ON link_sosial FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access pesan_masuk" ON pesan_masuk FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- PENGATURAN STORAGE BUCKETS (Jalankan via SQL atau Dashboard Storage)
-- ==============================================================================

-- Buat bucket penyimpanan (semua diset public agar media dapat diakses publik)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('profile', 'profile', true),
  ('media-proyek', 'media-proyek', true),
  ('berkas', 'berkas', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan baca Storage untuk publik
CREATE POLICY "Publik dapat melihat media dan berkas"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id IN ('profile', 'media-proyek', 'berkas'));

-- Kebijakan tulis Storage hanya untuk admin (authenticated)
CREATE POLICY "Admin upload media dan berkas"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('profile', 'media-proyek', 'berkas'));

CREATE POLICY "Admin update media dan berkas"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id IN ('profile', 'media-proyek', 'berkas'));

CREATE POLICY "Admin delete media dan berkas"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id IN ('profile', 'media-proyek', 'berkas'));


