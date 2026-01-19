'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

export function AboutThomas() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent/5 to-white" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orb - top right */}
        <div
          className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full opacity-30 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(124,195,238,0.4) 0%, transparent 60%)',
          }}
        />
        {/* Floating orb - bottom left */}
        <div
          className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full opacity-20 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(203,106,237,0.3) 0%, transparent 60%)',
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237CC3EE' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image de Thomas */}
          <FadeIn direction="left">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Decorative background shapes */}
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl opacity-60" />

                {/* Main image container */}
                <div className="relative">
                  {/* Decorative ring */}
                  <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />

                  {/* Image with gradient border effect */}
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-primary via-accent to-secondary">
                    <div className="bg-white rounded-full p-1">
                      <Image
                        src="/images/thomas-lexceleur.png"
                        alt="Thomas L'Exceleur"
                        width={380}
                        height={380}
                        className="rounded-full"
                      />
                    </div>
                  </div>

                  {/* Floating badge - Instagram followers */}
                  <div className="absolute -right-4 top-1/4 bg-white rounded-2xl shadow-card-elevated px-4 py-3 animate-bounce-subtle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1306C] to-[#C13584] flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-light">Instagram</p>
                        <p className="text-sm font-bold text-text-dark">175K+</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge - Experience */}
                  <div className="absolute -left-4 bottom-1/4 bg-white rounded-2xl shadow-card-elevated px-4 py-3 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-light">Expérience</p>
                        <p className="text-sm font-bold text-text-dark">10+ ans</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contenu */}
          <FadeIn direction="right" delay={200}>
            <div className="space-y-6">
              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium text-primary">Qui est Thomas</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1] font-extrabold text-text-dark">
                L&apos;exceleur<span className="text-primary">?</span>
              </h2>

              {/* Content */}
              <div className="space-y-5 text-body text-text leading-relaxed">
                <p>
                  Je m&apos;appelle Thomas, j&apos;accompagne les entreprises et leurs salariés dans le{' '}
                  <strong className="text-primary">développement</strong> de leur{' '}
                  <strong className="text-primary">expertise sur Excel</strong> grâce à des
                  méthodes de travail efficaces qui ont fait leurs preuves.
                </p>
                <p className="text-text-light">Tout a commencé en 2021.</p>
                <p>
                  Après plus de 10 ans passés dans les métiers de la finance à développer des systèmes
                  complexes sur Excel, j&apos;ai constaté que le niveau moyen des professionnels utilisant
                  ce logiciel était vraiment bas.
                </p>
                <p>
                  Alors je me suis mis en tête de rendre l&apos;apprentissage d&apos;
                  <strong className="text-primary">Excel ludique et accessible</strong> au plus grand nombre.
                </p>
                <p>
                  Avec plus de <strong className="text-primary">175 000 abonnés sur Instagram</strong> et des millions de vues par
                  mois, on peut affirmer sans se tromper que ma <strong className="text-primary">pédagogie</strong> a su trouver
                  son public.
                </p>
                <p>
                  À la demande générale, j&apos;ai développé plusieurs{' '}
                  <strong className="text-primary">programmes d&apos;accompagnement</strong> pour les professionnels face aux
                  problématiques qu&apos;ils rencontrent quotidiennement sur <strong className="text-primary">Excel</strong>.
                </p>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-dark">2000+</p>
                    <p className="text-sm text-text-light">Stagiaires formés</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-dark">98%</p>
                    <p className="text-sm text-text-light">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
