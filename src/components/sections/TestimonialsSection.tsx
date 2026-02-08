'use client';

import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';

const testimonials = [
  {
    id: 'romain',
    name: 'Romain P.',
    quote: "La formation était vraiment très bien structurée et le contenu de qualité. On voit que tu connais très bien ton sujet… Il y avait beaucoup de pratique, c'est top !",
    rating: 5,
  },
  {
    id: 'virginie',
    name: 'Virginie D.',
    quote: "Avant la formation je perdais beaucoup trop de temps sur Excel et mon supérieur hiérarchique me le reprochait. J'étais clairement la plus lente du bureau. Alors j'ai appliqué tous les conseils que tu m'as donnés, et en quelques semaines j'ai totalement changé ma manière de bosser sur Excel. C'est le jour et la nuit, plus aucun reproche parce que je suis trop lente sur cet outil. Mes collègues se sont mis à me demander des conseils pour savoir comment je faisais pour travailler aussi rapidement avec Excel !",
    rating: 5,
  },
  {
    id: 'eddine',
    name: 'Eddine S.',
    quote: "J'étais très stressé dans ma recherche d'emploi, j'avais peur qu'on me fasse passer un test sur Excel lors d'un entretien et qu'ils voient que je n'avais pas le niveau attendu. Maintenant plus de soucis avec Excel, je peux clairement dire que je suis un utilisateur avancé après avoir suivi cette formation. Ça m'a vraiment aidé pour trouver un emploi après ma reconversion.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      <Container className="relative z-10">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full border border-primary/10">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-medium text-primary">Témoignages</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-text-dark">
              Ce que disent nos{' '}
              <span className="text-gradient">stagiaires</span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={200}>
          <TestimonialCarousel
            testimonials={testimonials}
            variant="card"
            autoPlay
            autoPlayInterval={6000}
          />
        </FadeIn>
      </Container>
    </section>
  );
}
