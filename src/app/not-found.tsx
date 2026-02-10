'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />

      {/* Animated mesh overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(255,255,255,0.25) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(124,195,238,0.2) 0px, transparent 40%),
            radial-gradient(at 50% 50%, rgba(80,72,221,0.15) 0px, transparent 60%)
          `,
        }}
      />

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orb - top right */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />
        {/* Secondary orb - bottom left */}
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
          }}
        />
        {/* Small accent orb */}
        <div
          className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full opacity-20 animate-float-fast"
          style={{
            background: 'radial-gradient(circle, rgba(124,195,238,0.5) 0%, transparent 60%)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Excel-themed decorations */}
        <div className="absolute top-20 left-[15%] w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center animate-bounce-subtle">
          <span className="text-2xl">📊</span>
        </div>
        <div className="absolute bottom-32 right-[20%] w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
          <span className="text-xl">📈</span>
        </div>
        <div className="absolute top-1/3 right-[10%] w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center animate-bounce-subtle" style={{ animationDelay: '1s' }}>
          <span className="text-lg">🔍</span>
        </div>
      </div>

      <Container className="relative z-10">
        <div className="text-center">
          {/* Badge */}
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-medium text-white/90">Erreur 404</span>
            </div>
          </FadeIn>

          {/* Large 404 number */}
          <FadeIn direction="up" delay={100}>
            <div className="relative mb-6">
              {/* Background glow */}
              <div className="absolute inset-0 text-[200px] md:text-[280px] lg:text-[350px] font-heading font-black text-white/5 select-none flex items-center justify-center blur-sm">
                404
              </div>
              {/* Foreground text */}
              <h1 className="relative text-[120px] md:text-[180px] lg:text-[220px] font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/60 leading-none tracking-tight">
                404
              </h1>
            </div>
          </FadeIn>

          {/* Message */}
          <FadeIn direction="up" delay={200}>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Cette cellule est vide !
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg mx-auto leading-relaxed">
              Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
              <br />
              <span className="text-white/60 text-base">Même un RECHERCHEV ne pourrait pas la trouver !</span>
            </p>
          </FadeIn>

          {/* CTA buttons */}
          <FadeIn direction="up" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-heading font-bold text-base rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <svg className="w-5 h-5 relative transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="relative">Retour à l&apos;accueil</span>
              </Link>

              <Link
                href="/blog-excel/"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-heading font-bold text-base rounded-full border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <span>Explorer le blog</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Helpful links */}
          <FadeIn direction="up" delay={500}>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-white/50 mb-4">Vous cherchez peut-être :</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: 'Formations Excel', href: '/formations-excel' },
                  { label: 'Blog Excel', href: '/blog-excel' },
                  { label: 'Le Livre', href: '/livre' },
                  { label: 'Accueil', href: '/' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,60 C480,100 960,20 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.08" />
          <path d="M0,80 C360,100 720,60 1080,90 C1260,100 1380,85 1440,90 L1440,120 L0,120 Z" fill="white" fillOpacity="0.05" />
        </svg>
      </div>
    </div>
  );
}
