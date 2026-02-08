'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

const certifications = [
  {
    icon: '🏅',
    title: 'Certification Qualiopi',
    description: 'La qualité des enseignements reconnue par un organisme accréditeur.',
  },
  {
    icon: '💼',
    title: 'Financement OPCO',
    description: 'Formations éligibles aux financements OPCO pour les entreprises.',
  },
  {
    icon: '🎓',
    title: 'Éligible CPF',
    description: 'Utilisez votre Compte Personnel de Formation pour financer votre apprentissage.',
  },
  {
    icon: '✅',
    title: 'Certification TOSA',
    description: 'Validez vos compétences avec la certification TOSA en fin de formation.',
  },
];

export function FinancingSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      <Container className="relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full border border-green-500/20">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-700">Financement</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-text-dark mb-4">
              Faites{' '}
              <span className="text-gradient">financer</span>
              {' '}votre formation
            </h2>
            <p className="text-body text-text max-w-3xl mx-auto">
              La <strong>qualité</strong> des enseignements a été reconnue par un <strong>organisme accréditeur</strong> qui a délivré la <strong>certification Qualiopi</strong> à chacune des formations du catalogue.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.title} direction="up" delay={index * 100}>
              <div className="relative group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full text-center">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="font-heading font-bold text-text-dark mb-2">{cert.title}</h3>
                <p className="text-sm text-text-light">{cert.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
