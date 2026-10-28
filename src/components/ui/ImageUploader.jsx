import React, { useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { UploadCloud, X, Loader2, Sparkles } from 'lucide-react';

/**
 * Format bytes to readable string (e.g. 1.2 MB)
 */
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Client-side auto compressor for images.
 * Resizes large dimensions (max 2048px) and encodes as WebP/JPEG.
 * Will shrink a 20MB photo to ~300KB-800KB with visually lossless quality.
 */
async function autoCompressImage(file, { maxWidth = 2048, maxHeight = 2048, quality = 0.85 } = {}) {
  // SVG, GIF (animated), or non-image files are kept as-is
  if (
    !file.type.startsWith('image/') ||
    file.type === 'image/svg+xml' ||
    file.type === 'image/gif'
  ) {
    return { file, compressed: false, originalSize: file.size, finalSize: file.size };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale while preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP for superior compression & modern compatibility
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ file, compressed: false, originalSize: file.size, finalSize: file.size });
              return;
            }

            // If compressed blob is somehow larger (rare for already tiny PNG/SVG), keep original
            if (blob.size >= file.size && file.size < 300 * 1024) {
              resolve({ file, compressed: false, originalSize: file.size, finalSize: file.size });
              return;
            }

            const cleanName = file.name.replace(/\.[^.]+$/, '') + '.webp';
            const compressedFile = new File([blob], cleanName, { type: 'image/webp' });
            resolve({
              file: compressedFile,
              compressed: true,
              originalSize: file.size,
              finalSize: blob.size,
            });
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => resolve({ file, compressed: false, originalSize: file.size, finalSize: file.size });
      img.src = e.target.result;
    };
    reader.onerror = () => resolve({ file, compressed: false, originalSize: file.size, finalSize: file.size });
    reader.readAsDataURL(file);
  });
}

export default function ImageUploader({
  bucket = 'media-proyek',
  folder = 'sampul',
  value = '',
  onChange,
  label = 'Gambar',
  required = false,
  accept = 'image/*',
  aspectRatio = 'aspect-[3/4]',
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setError('');

    const isImage = rawFile.type.startsWith('image/') || accept.includes('image');
    const isVid = rawFile.type.startsWith('video/') || accept.includes('video');
    const isDoc = rawFile.type.includes('pdf') || accept.includes('pdf');

    // Validation rules:
    // 1. Video: Supabase default free tier limit is 50 MB
    if (isVid && !isImage && rawFile.size > 50 * 1024 * 1024) {
      setError(
        `Ukuran video (${formatBytes(rawFile.size)}) melebihi batas 50 MB. Untuk video berukuran besar, gunakan opsi link YouTube.`
      );
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    // 2. Document (PDF): 25 MB limit
    if (isDoc && rawFile.size > 25 * 1024 * 1024) {
      setError(`Ukuran berkas (${formatBytes(rawFile.size)}) melebihi batas (maks. 25 MB).`);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    setUploading(true);

    try {
      let fileToUpload = rawFile;

      // Auto compress image client-side: berapapun ukuran aslinya (10MB, 20MB, 30MB+),
      // otomatis di-resize dan dikompres menjadi file WebP ringan berkisar 300KB - 800KB.
      if (rawFile.type.startsWith('image/')) {
        setStatusMessage(`Mengompres foto (${formatBytes(rawFile.size)})...`);
        const { file: compressedFile, compressed, originalSize, finalSize } = await autoCompressImage(rawFile);
        fileToUpload = compressedFile;
        if (compressed) {
          setStatusMessage(`Mengupload (${formatBytes(originalSize)} ➔ ${formatBytes(finalSize)})...`);
        } else {
          setStatusMessage(`Mengupload (${formatBytes(finalSize)})...`);
        }
      } else if (rawFile.type.startsWith('video/')) {
        setStatusMessage(`Mengupload video (${formatBytes(rawFile.size)})...`);
      } else {
        setStatusMessage(`Mengupload berkas (${formatBytes(rawFile.size)})...`);
      }

      const ext = fileToUpload.name.split('.').pop() || 'bin';
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, fileToUpload, {
          upsert: true,
          contentType: fileToUpload.type || undefined,
        });

      if (uploadError) {
        if (
          uploadError.message?.toLowerCase().includes('payload too large') ||
          uploadError.statusCode === '413'
        ) {
          throw new Error('Ukuran file melebihi batas storage Supabase. Coba file yang lebih kecil.');
        }
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onChange(data.publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Gagal upload: ' + (err.message || 'Coba lagi.'));
    } finally {
      setUploading(false);
      setStatusMessage('');
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleClear = () => {
    onChange('');
    setError('');
  };

  const isPdf = accept.includes('pdf') || /\.pdf(\?.*)?$/i.test(value);
  const isVideo = accept.includes('video') || /\.(mp4|webm|mov|mkv)(\?.*)?$/i.test(value);

  let hintText = 'Auto-compress aktif • Berapapun ukurannya otomatis dioptimasi';
  let uploadLabel = 'Klik untuk upload foto / gambar';

  if (isPdf) {
    uploadLabel = 'Klik untuk upload file PDF';
    hintText = 'Format PDF • Berkas CV / portofolio dokumen';
  } else if (accept.includes('video') && accept.includes('image')) {
    uploadLabel = 'Klik untuk upload karya (Video atau Foto)';
    hintText = 'Foto otomatis di-compress • Video MP4 maks. 50 MB';
  } else if (accept.includes('video')) {
    uploadLabel = 'Klik untuk upload file video';
    hintText = 'Video MP4, WebM • Maks. 50 MB';
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-bold text-secondary uppercase tracking-wider">
          {label} {required && '*'}
        </label>
        {!isPdf && !accept.includes('video') && (
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" /> Auto-compress aktif
          </span>
        )}
      </div>

      {value ? (
        isPdf ? (
          <div className="relative flex items-center gap-3 p-4 rounded-xl bg-surface-container border border-white/10 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
              <span className="text-rose-400 text-xs font-extrabold">PDF</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Dokumen PDF Terupload</p>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-primary-container hover:underline truncate block"
              >
                Lihat / Unduh Dokumen &rarr;
              </a>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-rose-500 transition-colors cursor-pointer shrink-0"
              title="Hapus file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : isVideo ? (
          <div className="relative w-full rounded-xl overflow-hidden bg-black border border-white/10 aspect-video mb-2 flex items-center justify-center">
            <video src={value} controls className="w-full h-full object-contain" />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-500 transition-colors cursor-pointer z-10"
              title="Hapus video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className={`relative w-full rounded-xl overflow-hidden bg-surface-container border border-white/10 ${aspectRatio} mb-2`}>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-500 transition-colors cursor-pointer"
              title="Hapus gambar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full rounded-xl border-2 border-dashed border-white/10 hover:border-primary-container/60 bg-surface-container hover:bg-surface-container-high transition-all flex flex-col items-center justify-center gap-2 py-8 cursor-pointer disabled:opacity-50 group"
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary-container animate-spin" />
              <span className="text-xs text-primary-container font-semibold">
                {statusMessage || 'Sedang memproses...'}
              </span>
              <span className="text-[11px] text-secondary">Mohon tunggu sebentar</span>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-primary-container/10 group-hover:bg-primary-container/20 flex items-center justify-center transition-colors">
                <UploadCloud className="w-5 h-5 text-primary-container" />
              </div>
              <div className="text-center px-4">
                <p className="text-xs font-semibold text-white">{uploadLabel}</p>
                <p className="text-[11px] text-secondary mt-0.5">{hintText}</p>
              </div>
            </>
          )}
        </button>
      )}

      <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
      {error && <p className="mt-1.5 text-[11px] text-rose-400">{error}</p>}
      {required && (
        <input
          type="text"
          required
          value={value}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
