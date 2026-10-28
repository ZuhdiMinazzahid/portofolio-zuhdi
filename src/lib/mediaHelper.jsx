import React from 'react';

/**
 * Parses any external media URL (YouTube, Instagram, TikTok, Facebook, Drive, Vimeo, etc.)
 * Returns platform details, embed capability, and display configuration.
 */
export function parseSocialMediaUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;

  // 1. YouTube & YouTube Shorts
  const ytMatch =
    cleanUrl.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11})/i) ||
    cleanUrl.match(/youtube\.com\/shorts\/([^#&?]{11})/i);
  if (ytMatch && ytMatch[1]) {
    const isShorts = cleanUrl.includes('/shorts/');
    return {
      platform: 'youtube',
      name: isShorts ? 'YouTube Shorts' : 'YouTube Video',
      id: ytMatch[1],
      isVertical: isShorts,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0`,
      directUrl: cleanUrl,
      canEmbed: true,
      defaultMode: 'embed',
      brandColor: '#FF0000',
    };
  }

  // 2. Instagram (Reels, Posts, TV, Profil)
  if (/instagram\.com|instagr\.am/i.test(cleanUrl)) {
    const igPostMatch = cleanUrl.match(/(?:p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/i);
    const postId = igPostMatch ? igPostMatch[1] : null;
    const isReel = cleanUrl.includes('/reel');

    return {
      platform: 'instagram',
      name: postId ? (isReel ? 'Instagram Reel' : 'Instagram Post') : 'Instagram Profil',
      id: postId,
      isVertical: true,
      // Note: Instagram embeds frequently get blocked by browser tracking prevention,
      // so defaultMode is 'card' with option to toggle embed
      embedUrl: postId ? `https://www.instagram.com/p/${postId}/embed` : null,
      directUrl: cleanUrl,
      canEmbed: Boolean(postId),
      defaultMode: 'card',
      brandColor: '#E1306C',
    };
  }

  // 3. TikTok
  if (/tiktok\.com/i.test(cleanUrl)) {
    const ttMatch = cleanUrl.match(/video\/(\d+)/i);
    const videoId = ttMatch ? ttMatch[1] : null;
    return {
      platform: 'tiktok',
      name: 'TikTok Video',
      id: videoId,
      isVertical: true,
      embedUrl: videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : null,
      directUrl: cleanUrl,
      canEmbed: Boolean(videoId),
      defaultMode: 'card',
      brandColor: '#00F2FE',
    };
  }

  // 4. Google Drive
  const driveMatch = cleanUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (driveMatch && driveMatch[1]) {
    return {
      platform: 'gdrive',
      name: 'Google Drive',
      id: driveMatch[1],
      isVertical: false,
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      directUrl: cleanUrl,
      canEmbed: true,
      defaultMode: 'embed',
      brandColor: '#4285F4',
    };
  }

  // 5. Vimeo
  const vimeoMatch = cleanUrl.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/i
  );
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      platform: 'vimeo',
      name: 'Vimeo Video',
      id: vimeoMatch[3],
      isVertical: false,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}`,
      directUrl: cleanUrl,
      canEmbed: true,
      defaultMode: 'embed',
      brandColor: '#1AB7EA',
    };
  }

  // 6. Facebook Video / Post
  if (/facebook\.com|fb\.watch/i.test(cleanUrl)) {
    return {
      platform: 'facebook',
      name: 'Facebook Video',
      id: null,
      isVertical: false,
      embedUrl: null,
      directUrl: cleanUrl,
      canEmbed: false,
      defaultMode: 'card',
      brandColor: '#1877F2',
    };
  }

  // 7. X (Twitter)
  if (/twitter\.com|x\.com/i.test(cleanUrl)) {
    return {
      platform: 'x',
      name: 'X (Twitter)',
      id: null,
      isVertical: false,
      embedUrl: null,
      directUrl: cleanUrl,
      canEmbed: false,
      defaultMode: 'card',
      brandColor: '#000000',
    };
  }

  // 8. Threads
  if (/threads\.net/i.test(cleanUrl)) {
    return {
      platform: 'threads',
      name: 'Threads Post',
      id: null,
      isVertical: false,
      embedUrl: null,
      directUrl: cleanUrl,
      canEmbed: false,
      defaultMode: 'card',
      brandColor: '#101010',
    };
  }

  // 9. LinkedIn
  if (/linkedin\.com/i.test(cleanUrl)) {
    return {
      platform: 'linkedin',
      name: 'LinkedIn Post',
      id: null,
      isVertical: false,
      embedUrl: null,
      directUrl: cleanUrl,
      canEmbed: false,
      defaultMode: 'card',
      brandColor: '#0A66C2',
    };
  }

  // 10. Behance / Dribbble
  if (/behance\.net/i.test(cleanUrl)) {
    return {
      platform: 'behance',
      name: 'Behance Portfolio',
      id: null,
      isVertical: false,
      embedUrl: null,
      directUrl: cleanUrl,
      canEmbed: false,
      defaultMode: 'card',
      brandColor: '#0057FF',
    };
  }

  // 11. Generic / Other External Links
  return {
    platform: 'external',
    name: 'Tautan Media',
    id: null,
    isVertical: false,
    embedUrl: null,
    directUrl: cleanUrl,
    canEmbed: false,
    defaultMode: 'card',
    brandColor: '#FFC700',
  };
}

/**
 * Returns a high-res SVG platform icon
 */
export function renderPlatformIcon(platform, className = 'w-5 h-5') {
  const p = (platform || '').toLowerCase();

  if (p === 'instagram') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }

  if (p === 'youtube') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  if (p === 'tiktok') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.12-4.512V9.394a6.34 6.34 0 0 0-5.32 1.954 6.341 6.341 0 0 0 7.401 9.948 6.34 6.34 0 0 0 3.445-5.624V8.583a8.214 8.214 0 0 0 4.77 1.548V6.686z" />
      </svg>
    );
  }

  if (p === 'facebook') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (p === 'gdrive') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.74 3.75L12 11.14l4.26-7.39H7.74zm8.68 1.48L12 12.86l4.26 7.39h4.34l-4.18-7.25 4-6.77h-4.34zM3.4 20.25h8.6l-4.3-7.46L3.4 20.25z" />
      </svg>
    );
  }

  if (p === 'vimeo') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.525 3.01 7.525c-.179 0-.806.378-1.881 1.132L0 7.198c1.185-1.044 2.351-2.084 3.501-3.128 1.577-1.415 2.766-2.157 3.565-2.227 1.879-.176 3.037.989 3.474 3.499.529 3.039.897 4.939 1.104 5.7.632 2.923 1.321 4.385 2.067 4.385.574 0 1.378-.799 2.411-2.396 1.034-1.597 1.583-2.793 1.649-3.588.113-1.341-.378-2.012-1.474-2.012-.522 0-1.077.121-1.666.363 1.07-3.516 3.125-5.226 6.165-5.131 2.253.07 3.328 1.503 3.225 4.302z" />
      </svg>
    );
  }

  if (p === 'linkedin') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  if (p === 'x' || p === 'twitter') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  // Generic globe
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
