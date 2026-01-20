'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

export function AboutThomas() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient - matching exceleur.fr purple/pink to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-white" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image de Thomas - Simple circular with gradient border like exceleur.fr */}
          <FadeIn direction="left">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Soft glow behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-2xl opacity-60" />

                {/* Image with gradient border effect - matching exceleur.fr style */}
                <div className="relative p-1.5 rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent">
                  <div className="bg-white rounded-full p-1">
                    <Image
                      src="/images/thomas-portrait.png"
                      alt="Thomas L'Exceleur"
                      width={340}
                      height={340}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contenu */}
          <FadeIn direction="right" delay={200}>
            <div className="space-y-6">
              {/* Title */}
              <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.9] font-black text-text-dark tracking-tight">
                Qui suis-je <span className="text-primary">?</span>
              </h2>

              {/* Content */}
              <div className="space-y-5 text-body text-text leading-relaxed">
                <p>
                  Je m&apos;appelle Thomas, j&apos;accompagne les entreprises et leurs salariés dans le{' '}
                  <strong className="font-semibold text-text-dark">développement</strong> de leur{' '}
                  <strong className="font-semibold text-text-dark">expertise sur Excel</strong> grâce à des
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
                  <strong className="font-semibold text-text-dark">Excel ludique et accessible</strong> au plus grand nombre.
                </p>
                <p>
                  Avec plus de <strong className="font-semibold text-text-dark">175 000 abonnés sur Instagram</strong> et des millions de vues par
                  mois, on peut affirmer sans se tromper que ma <strong className="font-semibold text-text-dark">pédagogie</strong> a su trouver
                  son public.
                </p>
                <p>
                  À la demande générale, j&apos;ai développé plusieurs{' '}
                  <strong className="font-semibold text-text-dark">programmes d&apos;accompagnement</strong> pour les professionnels face aux
                  problématiques qu&apos;ils rencontrent quotidiennement sur <strong className="font-semibold text-text-dark">Excel</strong>.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
