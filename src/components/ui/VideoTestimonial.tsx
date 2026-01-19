'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface VideoTestimonialProps {
  vimeoId: string;
  thumbnailAlt: string;
  className?: string;
  variant?: 'default' | 'card' | 'minimal';
  title?: string;
  author?: string;
  duration?: string;
}

export function VideoTestimonial({
  vimeoId,
  thumbnailAlt,
  className = '',
  variant = 'default',
  title,
  author,
  duration,
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card-elevated transition-all duration-300',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

        {/* Video container */}
        <div className="relative aspect-video">
          {isPlaying ? (
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={`https://vumbnail.com/${vimeoId}.jpg`}
                alt={thumbnailAlt}
                fill
                className={cn(
                  'object-cover transition-transform duration-500',
                  isHovered && 'scale-105'
                )}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Duration badge */}
              {duration && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
                  <span className="text-xs font-medium text-white">{duration}</span>
                </div>
              )}

              {/* Play button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group/play"
              >
                <div className="relative">
                  {/* Ripple effect */}
                  <div className={cn(
                    'absolute inset-0 rounded-full bg-white/30 transition-transform duration-500',
                    isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
                  )} />

                  {/* Button */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/30 transform transition-all duration-300 group-hover/play:scale-110">
                    <svg
                      className="w-7 h-7 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Info at bottom */}
              {(title || author) && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {title && (
                    <p className="font-heading font-bold text-white text-sm mb-1 line-clamp-1">
                      {title}
                    </p>
                  )}
                  {author && (
                    <p className="text-white/80 text-xs">{author}</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        className={cn('relative aspect-video rounded-xl overflow-hidden', className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isPlaying ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={`https://vumbnail.com/${vimeoId}.jpg`}
              alt={thumbnailAlt}
              fill
              className={cn(
                'object-cover transition-transform duration-500',
                isHovered && 'scale-105'
              )}
            />

            {/* Simple overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Minimal play button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className={cn(
                'w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300',
                isHovered && 'scale-110'
              )}>
                <svg
                  className="w-5 h-5 text-primary ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        'group relative aspect-video rounded-2xl overflow-hidden shadow-card',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {isPlaying ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={`https://vumbnail.com/${vimeoId}.jpg`}
            alt={thumbnailAlt}
            fill
            className={cn(
              'object-cover transition-transform duration-700',
              isHovered && 'scale-110'
            )}
          />

          {/* Gradient overlay */}
          <div className={cn(
            'absolute inset-0 transition-all duration-300',
            isHovered
              ? 'bg-gradient-to-t from-black/70 via-black/30 to-black/10'
              : 'bg-gradient-to-t from-black/50 via-black/20 to-transparent'
          )} />

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
            <div className={cn(
              'absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 to-transparent transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )} />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
            <div className={cn(
              'absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-secondary/30 to-transparent transition-opacity duration-300',
              isHovered ? 'opacity-100' : 'opacity-0'
            )} />
          </div>

          {/* Play button */}
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group/btn"
          >
            <div className="relative">
              {/* Outer ring pulse */}
              <div className={cn(
                'absolute inset-0 rounded-full border-2 border-white/30 transition-all duration-700',
                isHovered ? 'scale-[1.8] opacity-0' : 'scale-100 opacity-100'
              )} />
              <div className={cn(
                'absolute inset-0 rounded-full border-2 border-white/20 transition-all duration-700 delay-100',
                isHovered ? 'scale-[2.2] opacity-0' : 'scale-100 opacity-0'
              )} />

              {/* Main button */}
              <div className={cn(
                'relative w-18 h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all duration-300',
                isHovered
                  ? 'bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/40 scale-110'
                  : 'bg-white/95 shadow-xl'
              )}>
                <svg
                  className={cn(
                    'w-8 h-8 lg:w-9 lg:h-9 ml-1 transition-colors duration-300',
                    isHovered ? 'text-white' : 'text-primary'
                  )}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Watch text on hover */}
            <div className={cn(
              'absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}>
              <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-text-dark shadow-lg">
                Regarder le témoignage
              </span>
            </div>
          </button>

          {/* Author badge (if provided) */}
          {author && (
            <div className={cn(
              'absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-full transition-all duration-300',
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            )}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                {author.charAt(0)}
              </div>
              <span className="text-xs font-medium text-text-dark">{author}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Grid of video testimonials with masonry-like layout
interface VideoTestimonialGridProps {
  videos: Array<{
    vimeoId: string;
    alt: string;
    title?: string;
    author?: string;
    duration?: string;
  }>;
  className?: string;
}

export function VideoTestimonialGrid({ videos, className }: VideoTestimonialGridProps) {
  return (
    <div className={cn('grid md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {videos.map((video, index) => (
        <VideoTestimonial
          key={video.vimeoId}
          vimeoId={video.vimeoId}
          thumbnailAlt={video.alt}
          title={video.title}
          author={video.author}
          duration={video.duration}
          variant="card"
          className={cn(
            index === 0 && 'md:col-span-2 lg:col-span-1'
          )}
        />
      ))}
    </div>
  );
}
