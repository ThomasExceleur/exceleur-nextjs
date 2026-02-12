'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

const methodItems = [
  {
    icon: '/images/illustrations/video.webp',
    title: 'Un apprentissage pas-à-pas à travers plusieurs exemples vidéos',
    description: 'Accessible en ligne, n\'importe où, n\'importe quand.',
    color: 'from-primary/20 to-primary/5',
    iconBg: 'from-primary to-primary-hover',
    number: '01',
  },
  {
    icon: '/images/illustrations/fiche-recap.webp',
    title: 'Des fiches récapitulatives déjà préparées pour les stagiaires',
    description: 'Téléchargeables à la fin de chaque module suivi.',
    color: 'from-accent/20 to-accent/5',
    iconBg: 'from-accent to-accent-dark',
    number: '02',
  },
  {
    icon: '/images/illustrations/cible.webp',
    title: 'Le tout condensé dans un programme renfermant uniquement l\'essentiel',
    description: 'Des vidéos courtes, des exemples concrets, et des méthodes de travail qui ont (réellement) fait leurs preuves.',
    color: 'from-primary/15 via-accent/10 to-secondary/15',
    iconBg: 'from-primary via-accent to-secondary',
    number: '03',
  },
];

export function MethodSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23CB6AED' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20">
        <div
          className="absolute inset-0 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(203,106,237,0.15) 0%, transparent 60%)',
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-15">
        <div
          className="absolute inset-0 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(124,195,238,0.2) 0%, transparent 60%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <FadeIn direction="up">
          <div className="text-center mb-16 lg:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/10">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-primary">Notre méthode</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-text-dark mb-4">
              Plusieurs formations
              <br />
              <span className="text-gradient">une seule méthode</span>
            </h2>

            {/* Subtitle */}
            <p className="text-body text-text-light max-w-2xl mx-auto">
              Une approche pédagogique éprouvée pour garantir votre réussite
            </p>
          </div>
        </FadeIn>

        {/* Method cards grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {methodItems.map((item, index) => (
            <FadeIn key={index} direction="up" delay={index * 100}>
              <div className="group relative h-full">
                {/* Card */}
                <div className={`relative h-full p-8 rounded-3xl bg-gradient-to-br ${item.color} border border-white/50 backdrop-blur-sm transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1`}>
                  {/* Number indicator */}
                  <div className="absolute top-6 right-6 text-6xl font-extrabold text-text-dark/5 select-none">
                    {item.number}
                  </div>

                  {/* Content */}
                  <div className="relative flex gap-6 items-start">
                    {/* Icon container */}
                    <div className="flex-shrink-0">
                      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${item.iconBg} p-0.5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            width={56}
                            height={56}
                            className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg font-heading font-bold text-text-dark mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-body text-text-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden rounded-br-3xl">
                    <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${item.iconBg} opacity-10 rounded-tl-3xl transform translate-x-4 translate-y-4`} />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.iconBg} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10 blur-xl`} />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={500}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-soft border border-gray-100/50">
              <div className="flex -space-x-3">
                {['🎓', '💡', '🚀', '⭐'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-white flex items-center justify-center text-lg"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-text-dark">+3000 professionnels formés</p>
                <p className="text-xs text-text-light">avec cette méthode éprouvée</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
