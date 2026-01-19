'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

const instagramReels = [
  { id: 'Ca2YN55LpjA', url: 'https://www.instagram.com/reel/Ca2YN55LpjA/', thumbnail: '/images/instagram/reel-4.jpeg', views: '1.2M' },
  { id: 'CaPyey0owMk', url: 'https://www.instagram.com/reel/CaPyey0owMk/', thumbnail: '/images/instagram/reel-5.jpeg', views: '856K' },
  { id: 'CaAYQncIamo', url: 'https://www.instagram.com/reel/CaAYQncIamo/', thumbnail: '/images/instagram/reel-6.jpeg', views: '1.5M' },
  { id: 'CZmfR-YI7Qx', url: 'https://www.instagram.com/reel/CZmfR-YI7Qx/', thumbnail: '/images/instagram/reel-1.jpeg', views: '2.1M' },
  { id: 'CZ4ou6dhADc', url: 'https://www.instagram.com/reel/CZ4ou6dhADc/', thumbnail: '/images/instagram/reel-2.jpeg', views: '945K' },
  { id: 'Cj5kxedKqsd', url: 'https://www.instagram.com/p/Cj5kxedKqsd/', thumbnail: '/images/instagram/reel-3.jpeg', views: '1.8M' },
];

export function InstagramSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50/30 to-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CB6AED' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10">
        <div
          className="absolute inset-0 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(225,48,108,0.3) 0%, transparent 60%)',
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-10">
        <div
          className="absolute inset-0 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(193,53,132,0.3) 0%, transparent 60%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16">
            {/* Badge with Instagram gradient */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-[#E1306C]/10 to-[#C13584]/10 rounded-full border border-[#E1306C]/20">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#C13584]">@lexceleur</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-text-dark mb-4">
              Découvrez-moi sur{' '}
              <span className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] bg-clip-text text-transparent">
                Instagram
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-body text-text-light max-w-xl mx-auto">
              Des astuces Excel quotidiennes, des tutoriels et du contenu exclusif
            </p>
          </div>
        </FadeIn>

        {/* Reels grid */}
        <FadeIn direction="up" delay={200}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {instagramReels.map((reel, index) => (
              <Link
                key={reel.id}
                href={reel.url}
                target="_blank"
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden no-underline shadow-soft hover:shadow-card-elevated transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Thumbnail */}
                <Image
                  src={reel.thumbnail}
                  alt="Réel Instagram"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-6 h-6 text-[#E1306C] ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* View count */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  <span className="text-xs font-medium text-white">{reel.views}</span>
                </div>

                {/* Reel indicator */}
                <div className="absolute top-3 right-3">
                  <svg className="w-5 h-5 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn direction="up" delay={400}>
          <div className="text-center">
            <Link
              href="https://www.instagram.com/lexceleur/"
              target="_blank"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white font-heading font-bold text-base rounded-full no-underline shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Instagram icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              </svg>
              <span>Suivre @lexceleur</span>
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-dark">175K+</p>
                <p className="text-sm text-text-light">Abonnés</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-text-dark">500+</p>
                <p className="text-sm text-text-light">Publications</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-text-dark">50M+</p>
                <p className="text-sm text-text-light">Vues</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
