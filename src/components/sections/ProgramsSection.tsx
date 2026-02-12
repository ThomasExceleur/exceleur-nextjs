'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

const formations = [
  {
    title: 'Le Décollage',
    description: 'La vraie méthode pour devenir un monstre d\'efficacité sur Excel',
    href: '/formations-excel/le-decollage-liste-attente',
    gradient: 'from-[#60a5fa] to-[#3b82f6]',
    shadowColor: 'rgba(59, 130, 246, 0.4)',
    icon: '🚀',
    image: '/images/formations/le-decollage/thumbnail.webp',
  },
  {
    title: 'La Machine',
    description: 'Propulse ta carrière grâce au secret bien gardé des macros VBA',
    href: '/formations-excel/la-machine-liste-attente',
    gradient: 'from-[#CB6AED] to-[#9333ea]',
    shadowColor: 'rgba(203, 106, 237, 0.4)',
    icon: '⚙️',
    image: '/images/formations/la-machine/thumbnail.webp',
  },
  {
    title: 'La Slide',
    description: 'Deviens le présentateur fascinant que tout le monde écoute',
    href: '/formations-excel/la-slide-liste-attente',
    gradient: 'from-[#34d399] to-[#10b981]',
    shadowColor: 'rgba(16, 185, 129, 0.4)',
    icon: '📊',
    image: '/images/formations/la-slide/thumbnail.webp',
  },
  {
    title: 'Power Query Secrets',
    description: 'Deviens LA personne la plus efficace du bureau',
    href: '/formations-excel/power-query-secrets-liste-attente',
    gradient: 'from-[#fb923c] to-[#f97316]',
    shadowColor: 'rgba(249, 115, 22, 0.4)',
    icon: '⚡',
    image: '/images/formations/power-query-secrets/thumbnail.webp',
  },
  {
    title: 'ExcelGPT',
    description: 'Libère ton potentiel sur Excel grâce à la puissance de l\'IA',
    href: '/formations-excel/excelgpt',
    gradient: 'from-[#a78bfa] to-[#7c3aed]',
    shadowColor: 'rgba(124, 58, 237, 0.4)',
    icon: '🤖',
    image: '/images/formations/excelgpt/thumbnail.webp',
  },
  {
    title: 'TCD Express',
    description: 'Maîtrise les TCD en moins de 7 jours',
    href: '/formations-excel/tcd-express',
    gradient: 'from-[#f472b6] to-[#ec4899]',
    shadowColor: 'rgba(236, 72, 153, 0.4)',
    icon: '📋',
    image: '/images/formations/tcd-express/thumbnail.webp',
  },
];

export function ProgramsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CB6AED' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-h2 text-text-dark mb-6">
              Des{' '}
              <span className="relative inline-block">
                <span className="text-gradient">programmes complémentaires</span>
              </span>
              <br />
              pour une maîtrise du logiciel{' '}
              <span className="text-gradient">à 360°</span>
            </h2>
            <p className="text-body text-text max-w-4xl mx-auto">
              Les <strong>inscriptions</strong> se font <strong>par session</strong> à différentes périodes de l&apos;année
              afin de garantir aux stagiaires un accompagnement de qualité. Les <strong>cours</strong> sont enregistrés au{' '}
              <strong>format vidéo</strong> et <strong>disponibles à la demande</strong> pour permettre à chacun de suivre
              le programme à son rythme. Chaque formation est composée d&apos;un <strong>enseignement théorique</strong> et
              d&apos;un <strong>accompagnement</strong> sur plusieurs mois.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {formations.map((formation, index) => (
            <FadeIn key={formation.title} direction="up" delay={index * 100}>
              <Link
                href={formation.href}
                className="group relative block no-underline h-full"
              >
                {/* Card container */}
                <div
                  className={`relative h-full p-6 lg:p-8 rounded-2xl bg-gradient-to-br ${formation.gradient} text-white overflow-hidden transition-all duration-500 group-hover:scale-[1.02]`}
                  style={{
                    boxShadow: `0 10px 40px -10px ${formation.shadowColor}`,
                  }}
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Floating orb */}
                    <div
                      className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-float-slow"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
                      }}
                    />
                    {/* Secondary orb */}
                    <div
                      className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 animate-float-medium"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
                      }}
                    />
                  </div>

                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div className="text-3xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {formation.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-extrabold mb-2 uppercase tracking-wide">
                      {formation.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-sm mb-6 flex-grow">
                      {formation.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-small font-extrabold uppercase group/cta">
                      <span className="relative">
                        En savoir +
                        <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-0.5 bg-white/50 transition-all duration-300" />
                      </span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-white/5 transform rotate-45 translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${formation.shadowColor}, transparent)`,
                  }}
                />
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
