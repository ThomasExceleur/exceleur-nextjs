import { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/sections/SectionTitle';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/sections/CTASection';
import { getAllFormations } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Formations Excel',
  description:
    'Decouvrez nos formations Excel certifiees Qualiopi. Financement CPF possible. Devenez un expert Excel.',
};

// Fallback formations when no MDX content exists
const defaultFormations = [
  {
    slug: 'excel-avance',
    title: 'Excel avance',
    description:
      'Maitrisez Excel pour optimiser vos competences professionnelles. Formation creee par l\'Exceleur. Financement CPF possible.',
    level: 'avance' as const,
    features: [
      'Tableaux croises dynamiques avances',
      'Fonctions RECHERCHEX, INDEX/EQUIV',
      'Power Query et Power Pivot',
      'Automatisation avec macros VBA',
    ],
  },
  {
    slug: 'formation-excel-entreprise',
    title: 'Formation Excel Entreprise',
    description:
      'Formation sur mesure pour les entreprises. Adaptee a vos besoins specifiques et a votre secteur d\'activite.',
    level: 'intermediaire' as const,
    features: [
      'Formation personnalisee',
      'Sur site ou a distance',
      'Suivi post-formation',
      'Support dedier',
    ],
  },
];

const levelLabels = {
  debutant: 'Debutant',
  intermediaire: 'Intermediaire',
  avance: 'Avance',
};

const levelColors = {
  debutant: 'accent' as const,
  intermediaire: 'secondary' as const,
  avance: 'primary' as const,
};

export default function FormationsPage() {
  // Try to get formations from MDX, fallback to default
  let formations = getAllFormations();
  if (formations.length === 0) {
    formations = defaultFormations;
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Formations Excel"
        subtitle="Des formations certifiees Qualiopi pour maitriser Excel et booster votre carriere. Financement CPF possible."
        cta={{
          text: 'Decouvrir les formations',
          href: '#formations',
        }}
      />

      {/* Formations List */}
      <section id="formations" className="section-padding">
        <Container>
          <SectionTitle
            title="Nos formations Excel"
            subtitle="Choisissez la formation adaptee a votre niveau et vos objectifs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formations.map((formation) => (
              <Card key={formation.slug} variant="bordered" padding="lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-h3">{formation.title}</CardTitle>
                    {formation.level && (
                      <Badge variant={levelColors[formation.level]}>
                        {levelLabels[formation.level]}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-text mb-6">{formation.description}</p>

                  {formation.features && formation.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {formation.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-small">
                          <svg
                            className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {formation.price && (
                    <p className="text-h3 text-primary mb-4">{formation.price}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="solid"
                    href={`/formations-excel/${formation.slug}`}
                    className="w-full"
                  >
                    En savoir plus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Besoin d'une formation sur mesure ?"
        description="Contactez-nous pour discuter de vos besoins specifiques et obtenir un devis personnalise."
        buttonText="Nous contacter"
        buttonHref="/contact"
        variant="primary"
      />
    </>
  );
}
