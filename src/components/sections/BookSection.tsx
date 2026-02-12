'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

const bookFeatures = [
  { icon: '📚', text: '256 pages de contenu pratique' },
  { icon: '💡', text: 'Exercices et exemples concrets' },
  { icon: '🎯', text: 'Accessible aux débutants' },
  { icon: '💻', text: 'Compatible Windows & Mac' },
];

export function BookSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-accent" />

      {/* Animated mesh overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(at 30% 20%, rgba(255,255,255,0.25) 0px, transparent 50%),
            radial-gradient(at 70% 80%, rgba(124,195,238,0.2) 0px, transparent 40%)
          `,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div
          className="absolute top-20 right-[10%] w-[300px] h-[300px] rounded-full opacity-20 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute -bottom-20 left-[5%] w-[400px] h-[400px] rounded-full opacity-15 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
          }}
        />

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Book image */}
          <FadeIn direction="left" className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />

              {/* Decorative ring */}
              <div className="absolute -inset-6 border-2 border-dashed border-white/10 rounded-3xl animate-spin-slow" />

              {/* Book image container */}
              <div className="relative">
                <Image
                  src="/images/livre-exceleur.webp"
                  alt="Livre Exceleur"
                  width={380}
                  height={470}
                  className="relative w-auto max-h-[470px] object-contain drop-shadow-2xl group-hover:scale-[1.02] group-hover:-rotate-2 transition-all duration-500"
                />

                {/* Floating badge - Rating */}
                <div className="absolute -left-4 bottom-20 bg-white rounded-2xl shadow-card-elevated px-4 py-3 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-light">Note Amazon</p>
                      <p className="text-sm font-bold text-text-dark">4.7/5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right" delay={200} className="order-1 lg:order-2">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-sm font-medium text-white/90">Le livre</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.1]">
                Révèle l&apos;exceleur
                <br />
                <span className="relative inline-block">
                  qui est en toi !
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/30 rounded-full" />
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Le livre <strong className="text-white">fun et accessible</strong> pour (ré)apprendre les fondamentaux d&apos;Excel <strong className="text-white">sans prise de tête</strong>.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {bookFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-sm text-white/80">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/livre/"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-heading font-bold text-base rounded-full no-underline overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                  <span className="relative">En savoir plus</span>
                  <svg className="w-5 h-5 relative transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="https://www.amazon.fr/gp/product/B0CH8JD54W?tag=thomascoget-21"
                  target="_blank"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-heading font-bold text-base rounded-full no-underline border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.42 14.58c-.51-.19-1.04-.3-1.58-.3-.53 0-1.06.11-1.58.3l-3.26 1.26-3.26-1.26c-.51-.19-1.04-.3-1.58-.3-.53 0-1.06.11-1.58.3C4.6 15.13 4 16.26 4 17.5V19c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1.5c0-1.24-.6-2.37-1.58-2.92zM12 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                  </svg>
                  Commander sur Amazon
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm"
                    >
                      {star}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/70">
                  <span className="text-white font-semibold">4.7/5</span> sur Amazon
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,40 C480,100 960,10 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.08" />
          <path d="M0,60 C360,100 720,30 1080,70 C1260,85 1380,75 1440,80 L1440,120 L0,120 Z" fill="white" fillOpacity="0.05" />
        </svg>
      </div>
    </section>
  );
}
