'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
  variant?: 'default' | 'compact' | 'floating';
}

const platforms = [
  {
    id: 'email',
    label: 'Email',
    color: 'hover:bg-gray-600 hover:border-gray-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    color: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
  },
  {
    id: 'twitter',
    label: 'X (Twitter)',
    color: 'hover:bg-black hover:border-black',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'copy',
    label: 'Copier le lien',
    color: 'hover:bg-primary hover:border-primary',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function ShareButtons({ url, title, className, variant = 'default' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks: Record<string, string> = {
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const handleShare = async (platformId: string) => {
    if (platformId === 'email') {
      window.location.href = shareLinks[platformId];
    } else if (platformId === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      window.open(shareLinks[platformId], '_blank', 'width=600,height=400');
    }
  };

  if (variant === 'floating') {
    return (
      <div className={cn('fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2', className)}>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-card-elevated border border-gray-100 p-2 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-text-light uppercase tracking-wider text-center px-2 py-1">
            Partager
          </span>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handleShare(platform.id)}
              className={cn(
                'group relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-text-light transition-all duration-300 hover:text-white hover:scale-110',
                platform.color,
                platform.id === 'copy' && copied && 'bg-green-500 border-green-500 text-white'
              )}
              aria-label={platform.label}
            >
              {platform.id === 'copy' && copied ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                platform.icon
              )}
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {platform.id === 'copy' && copied ? 'Copié !' : platform.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleShare(platform.id)}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-text-light transition-all duration-300 hover:text-white',
              platform.color,
              platform.id === 'copy' && copied && 'bg-green-500 border-green-500 text-white'
            )}
            aria-label={platform.label}
          >
            {platform.id === 'copy' && copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="scale-75">{platform.icon}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <span className="flex items-center gap-2 text-sm font-medium text-text-light">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Partager
      </span>
      <div className="flex items-center gap-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleShare(platform.id)}
            className={cn(
              'group relative flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-text-light transition-all duration-300 hover:text-white',
              platform.color,
              platform.id === 'copy' && copied && 'bg-green-500 border-green-500 text-white'
            )}
            aria-label={platform.label}
          >
            {platform.id === 'copy' && copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium hidden sm:inline">Copié !</span>
              </>
            ) : (
              <>
                <span className="scale-90">{platform.icon}</span>
                <span className="text-sm font-medium hidden sm:inline">{platform.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
