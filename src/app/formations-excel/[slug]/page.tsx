import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CTASection } from '@/components/sections/CTASection';
import { getFormation, getAllFormations } from '@/lib/mdx';
import { mdxComponents } from '@/lib/mdx-components';

interface FormationPageProps {
  params: Promise<{ slug: string }>;
}

// Default formation data for when MDX doesn't exist
const defaultFormations: Record<
  string,
  {
    title: string;
    description: string;
    level: 'debutant' | 'intermediaire' | 'avance';
    features: string[];
    content: string;
  }
> = {
  'excel-avance': {
    title: 'Excel avance, optimisez vos competences professionnelles',
    description:
      'Maitrisez Excel pour optimiser vos competences professionnelles. Formation creee par l\'Exceleur. Financement CPF possible.',
    level: 'avance',
    features: [
      'Tableaux croises dynamiques avances',
      'Fonctions RECHERCHEX, INDEX/EQUIV',
      'Power Query et Power Pivot',
      'Automatisation avec macros VBA',
      'Analyse de donnees complexes',
      'Creation de tableaux de bord',
    ],
    content: `
## A propos de cette formation

Cette formation Excel avancee est concue pour les professionnels souhaitant maitriser les fonctionnalites les plus puissantes d'Excel. Vous apprendrez a automatiser vos taches, analyser des donnees complexes et creer des tableaux de bord professionnels.

## Programme de la formation

### Module 1 : Tableaux croises dynamiques avances
- Creation et personnalisation de TCD
- Champs calcules et elements calcules
- Groupement et filtrage avance

### Module 2 : Fonctions avancees
- RECHERCHEX et ses variantes
- INDEX/EQUIV et combinaisons
- Fonctions matricielles dynamiques

### Module 3 : Power Query
- Import et transformation de donnees
- Fusion de plusieurs sources
- Actualisation automatique

### Module 4 : Introduction a VBA
- Enregistrement de macros
- Modification du code
- Automatisation de taches repetitives
    `,
  },
  'formation-excel-entreprise': {
    title: 'Formation Excel Entreprise',
    description:
      'Formation sur mesure pour les entreprises. Adaptee a vos besoins specifiques et a votre secteur d\'activite.',
    level: 'intermediaire',
    features: [
      'Formation personnalisee',
      'Sur site ou a distance',
      'Suivi post-formation',
      'Support dedie',
      'Adaptation a votre metier',
      'Exercices sur vos donnees',
    ],
    content: `
## Formation Excel pour les entreprises

Offrez a vos equipes une formation Excel sur mesure, adaptee a vos processus metier et a vos objectifs.

## Pourquoi choisir notre formation entreprise ?

### Personnalisation complete
Nous analysons vos besoins et construisons un programme adapte a votre contexte professionnel.

### Flexibilite
Formation sur site dans vos locaux ou a distance, selon vos preferences.

### Suivi post-formation
Accompagnement apres la formation pour repondre aux questions et consolider les acquis.

## Processus

1. **Analyse des besoins** - Rencontre pour comprendre vos objectifs
2. **Proposition sur mesure** - Programme et devis personnalises
3. **Formation** - Sessions adaptees a votre planning
4. **Suivi** - Support post-formation inclus

## Contactez-nous

Pour obtenir un devis personnalise, contactez-nous via notre formulaire de contact.
    `,
  },
};

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

export async function generateStaticParams() {
  const formations = getAllFormations();
  const mdxSlugs = formations.map((f) => ({ slug: f.slug }));
  const defaultSlugs = Object.keys(defaultFormations).map((slug) => ({ slug }));

  // Combine MDX slugs with default slugs, removing duplicates
  const allSlugs = [...new Set([...mdxSlugs.map((s) => s.slug), ...defaultSlugs.map((s) => s.slug)])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FormationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formation = getFormation(slug);

  if (formation) {
    return {
      title: formation.meta.title,
      description: formation.meta.description || formation.meta.metaDescription,
    };
  }

  const defaultFormation = defaultFormations[slug];
  if (defaultFormation) {
    return {
      title: defaultFormation.title,
      description: defaultFormation.description,
    };
  }

  return {
    title: 'Formation non trouvee',
  };
}

export default async function FormationPage({ params }: FormationPageProps) {
  const { slug } = await params;
  const formation = getFormation(slug);
  const defaultFormation = defaultFormations[slug];

  if (!formation && !defaultFormation) {
    notFound();
  }

  const meta = formation?.meta || {
    slug,
    title: defaultFormation.title,
    description: defaultFormation.description,
    level: defaultFormation.level,
    features: defaultFormation.features,
  };

  const content = formation?.content || defaultFormation.content;

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Formations', href: '/formations-excel' },
    { label: meta.title },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="gradient-hero py-12 lg:py-16">
        <Container>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="flex items-start gap-4 mb-4">
            <h1 className="text-h1 text-white">{meta.title}</h1>
            {meta.level && (
              <Badge variant={levelColors[meta.level]} size="md">
                {levelLabels[meta.level]}
              </Badge>
            )}
          </div>
          <p className="text-body text-white/90 max-w-2xl mb-8">{meta.description}</p>
          <Button variant="outline-white" size="lg" href="#programme">
            Voir le programme
          </Button>
        </Container>
      </div>

      {/* Features */}
      {meta.features && meta.features.length > 0 && (
        <section className="py-12 bg-background-alt">
          <Container>
            <h2 className="font-heading text-h2 text-text mb-8 text-center">
              Ce que vous apprendrez
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {meta.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-lg"
                >
                  <svg
                    className="w-6 h-6 text-success flex-shrink-0"
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
                  <span className="text-body">{feature}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Content */}
      <section id="programme" className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto prose">
            <MDXRemote source={content} components={mdxComponents} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Pret a vous former ?"
        description="Inscrivez-vous des maintenant et commencez votre parcours vers l'excellence Excel."
        buttonText="S'inscrire a la formation"
        buttonHref="/contact"
        variant="primary"
      />
    </>
  );
}
