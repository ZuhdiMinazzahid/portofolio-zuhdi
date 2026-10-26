-- ==============================================================================
-- DATA DUMMY / SEED DATA PORTOFOLIO ZUHDI MINAZZAHID
-- ==============================================================================

-- 1. SEED: profil
INSERT INTO profil (nama_lengkap, jabatan, tentang_saya, foto_profil, nomor_whatsapp, email, file_cv)
VALUES (
    'Zuhdi Minazzahid',
    'Videografer & Desainer Grafis',
    'Kreator visual yang berfokus pada videografi sinematik, video editing dinamis, dan identitas visual kreatif. Berpengalaman memproduksi konten promosi, event, dan media sosial dengan pendekatan cerita yang berbobot.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    '6281234567890',
    'zuhdi.minazzahid@gmail.com',
    '#'
);

-- 2. SEED: keahlian
INSERT INTO keahlian (nama_keahlian, ikon, urutan) VALUES
('Adobe Premiere Pro', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg', 1),
('Adobe Photoshop', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', 2),
('Adobe Audition', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/audition/audition-plain.svg', 3),
('Canva Pro', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg', 4),
('CapCut', 'https://upload.wikimedia.org/wikipedia/commons/2/25/CapCut_logo.svg', 5);

-- 3. SEED: riwayat
INSERT INTO riwayat (jenis, judul, keterangan, periode, urutan) VALUES
('pengalaman', 'Wakil Station Manager - Suska TV', 'Memimpin operasional siaran, supervisi tim produksi video dan editing', '2023 - Sekarang', 1),
('pengalaman', 'Lead Videographer & Video Editor - Freelance', 'Memproduksi 20+ video promosi komersial dan company profile', '2022 - Sekarang', 2),
('pengalaman', 'Content Creator & Graphic Designer - Media Kampus', 'Merancang visual poster, feed Instagram, dan konten pendek', '2022 - 2023', 3),
('pendidikan', 'S1 Ilmu Komunikasi', 'Fokus Konsentrasi Broadcasting & Sinematografi', '2021 - Sekarang', 4);

-- 4. SEED: proyek & media_proyek
-- Proyek 1: Video Sinematik
WITH p1 AS (
    INSERT INTO proyek (judul, kategori, peran, tools, cerita_singkat, gambar_sampul, tahun, tampilkan, urutan)
    VALUES (
        'Suska TV Annual Reel & Station Id',
        'video',
        'Director & Lead Editor',
        ARRAY['Adobe Premiere Pro', 'Adobe Audition', 'DaVinci Resolve'],
        'Video bumper stasiun dan kompilasi karya tahunan Suska TV dengan transisi dinamis dan color grading dramatis.',
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
        '2025',
        true,
        1
    ) RETURNING id
)
INSERT INTO media_proyek (id_proyek, jenis_media, alamat_file, link_youtube, urutan)
SELECT id, 'video', NULL, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1 FROM p1;

-- Proyek 2: Desain Identitas Visual
WITH p2 AS (
    INSERT INTO proyek (judul, kategori, peran, tools, cerita_singkat, gambar_sampul, tahun, tampilkan, urutan)
    VALUES (
        'Rebranding & Visual Identity Event Pekan Ilmiah',
        'desain',
        'Graphic Designer',
        ARRAY['Adobe Photoshop', 'Canva Pro'],
        'Perancangan sistem grafis lengkap, mulai dari master logo, billboard backdrop panggung, hingga materi cetak dan digital.',
        'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80',
        '2025',
        true,
        2
    ) RETURNING id
)
INSERT INTO media_proyek (id_proyek, jenis_media, alamat_file, link_youtube, urutan)
SELECT id, 'foto', 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=1200&q=80', NULL, 1 FROM p2;

-- Proyek 3: Dokumentasi Event Musik
WITH p3 AS (
    INSERT INTO proyek (judul, kategori, peran, tools, cerita_singkat, gambar_sampul, tahun, tampilkan, urutan)
    VALUES (
        'Aftermovie Konser Musik Gelora Mahasiswa',
        'dokumentasi',
        'Camera Operator & Editor',
        ARRAY['Adobe Premiere Pro', 'CapCut'],
        'Dokumentasi atmosfer konser panggung utama dengan ritme pacing cepat selaras dengan beat musik.',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
        '2024',
        true,
        3
    ) RETURNING id
)
INSERT INTO media_proyek (id_proyek, jenis_media, alamat_file, link_youtube, urutan)
SELECT id, 'video', NULL, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1 FROM p3;

-- 5. SEED: link_sosial
INSERT INTO link_sosial (nama_platform, username, alamat_link, urutan) VALUES
('Instagram', '@zuhdiminazzahid', 'https://instagram.com', 1),
('TikTok', '@zuhdi_visual', 'https://tiktok.com', 2),
('YouTube', 'Zuhdi Minazzahid', 'https://youtube.com', 3),
('LinkedIn', 'Zuhdi Minazzahid', 'https://linkedin.com', 4);
