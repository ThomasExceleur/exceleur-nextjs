'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Certifié Qualiopi',
    description: 'Reconnaissance officielle de la qualité de nos formations',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Éligible OPCO & CPF',
    description: 'Financements disponibles pour votre formation',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Certification TOSA',
    description: 'Validez vos compétences avec une certification reconnue',
  },
];

export function FinancingSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />

      {/* Animated mesh overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(255,255,255,0.2) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(124,195,238,0.15) 0px, transparent 40%),
            radial-gradient(at 50% 50%, rgba(80,72,221,0.1) 0px, transparent 60%)
          `,
        }}
      />

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-15 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <FadeIn direction="left">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-white/90">Financement</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.1]">
                Faites financer
                <br />
                <span className="relative inline-block">
                  votre formation
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-white/30 rounded-full" />
                </span>
              </h2>

              {/* Description */}
              <div className="space-y-4 text-lg text-white/85 leading-relaxed">
                <p>
                  La <strong className="text-white font-semibold">qualité</strong> des enseignements a été reconnue par un{' '}
                  <strong className="text-white font-semibold">organisme accréditeur</strong> qui a délivré la{' '}
                  <strong className="text-white font-semibold">certification Qualiopi</strong> à chacune des formations du catalogue.
                </p>
                <p>
                  Aujourd&apos;hui, ces formations sont éligibles aux financements{' '}
                  <strong className="text-white font-semibold">OPCO</strong> et <strong className="text-white font-semibold">CPF</strong>.
                </p>
              </div>

              {/* Features grid */}
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-sm font-heading font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-xs text-white/60">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Certification cards */}
          <FadeIn direction="right" delay={200}>
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-75" />

              {/* Glass card container */}
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/50">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                </div>

                <div className="relative space-y-8">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className="text-xl font-heading font-bold text-text-dark mb-2">Nos certifications</h3>
                    <p className="text-sm text-text-light">Gage de qualité et d&apos;éligibilité aux financements</p>
                  </div>

                  {/* Logos */}
                  <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                    {/* Qualiopi */}
                    <div className="group relative flex-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-6 rounded-2xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                        <Image
                          src="/images/qualiopi.webp"
                          alt="Logo Qualiopi"
                          width={200}
                          height={170}
                          className="w-auto h-20 object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-20 bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

                    {/* TOSA */}
                    <div className="group relative flex-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-6 rounded-2xl border border-gray-100 bg-white hover:border-secondary/20 hover:shadow-lg transition-all duration-300">
                        <Image
                          src="/images/tosa.webp"
                          alt="TOSA Centre Agréé"
                          width={200}
                          height={60}
                          className="w-auto h-12 object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100">
                    <div className="flex -space-x-2">
                      {['✓', '✓', '✓'].map((check, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                        >
                          {check}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-text-light">
                      <span className="font-semibold text-text-dark">100%</span> des stagiaires éligibles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,60 C480,100 960,20 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.1" />
        </svg>
      </div>
    </section>
  );
}
