'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

const trustLogos = [
  { name: 'Trescal', src: '/images/logos/trescal.png', width: 120, height: 56 },
  { name: 'Bluewin', src: '/images/logos/bluewin.png', width: 120, height: 40 },
  { name: 'ESCP', src: '/images/logos/escp.png', width: 140, height: 50 },
  { name: 'Hermès', src: '/images/logos/hermes.png', width: 100, height: 60 },
  { name: 'European Sourcing', src: '/images/logos/european-sourcing.png', width: 120, height: 50 },
];

export function TrustLogos() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CB6AED' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] opacity-10">
        <div
          className="absolute inset-0 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(203,106,237,0.3) 0%, transparent 60%)',
          }}
        />
      </div>
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] opacity-10">
        <div
          className="absolute inset-0 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(124,195,238,0.3) 0%, transparent 60%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full border border-primary/10">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="text-sm font-medium text-primary">Références clients</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-dark">
              Ils m&apos;ont fait{' '}
              <span className="text-gradient">confiance</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          {/* Logo carousel container */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Logos grid with glass effect */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-12 px-4">
              {trustLogos.map((logo, index) => (
                <div
                  key={logo.name}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  {/* Logo container */}
                  <div className="flex items-center justify-center h-20 px-8 py-4 bg-white rounded-2xl border border-gray-100/80 shadow-soft group-hover:shadow-card-elevated group-hover:border-primary/20 transition-all duration-500 group-hover:-translate-y-1">
                    <Image
                      src={logo.src}
                      alt={`Logo ${logo.name}`}
                      width={logo.width}
                      height={logo.height}
                      className="w-auto h-auto max-h-12 object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bottom indicator */}
        <FadeIn direction="up" delay={400}>
          <div className="mt-12 text-center">
            <p className="text-sm text-text-light">
              Et <span className="font-semibold text-primary">+100 entreprises</span> accompagnées dans leur montée en compétences Excel
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
