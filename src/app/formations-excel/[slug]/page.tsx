import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FormationPageClient from './FormationPageClient';
import { getFormation, getAllFormations } from '@/lib/mdx';

interface FormationPageProps {
  params: Promise<{ slug: string }>;
}

// Default formation data for when MDX doesn't exist
const defaultFormations: Record<string, { title: string; description: string }> = {
  'excel-avance': {
    title: 'Excel Avancé',
    description: 'Maîtrisez Excel pour optimiser vos compétences professionnelles. Formation créée par Thomas L\'Exceleur.',
  },
  'le-declic': {
    title: 'Le Déclic',
    description: 'Maîtrise les formules indispensables d\'Excel en 7 jours. La formation pour ENFIN savoir quelle formule utiliser, quand et comment.',
  },
};

export async function generateStaticParams() {
  const formations = getAllFormations();
  const mdxSlugs = formations.map((f) => ({ slug: f.slug }));
  const defaultSlugs = Object.keys(defaultFormations).map((slug) => ({ slug }));

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
      alternates: {
        canonical: `/formations-excel/${slug}`,
      },
    };
  }

  const defaultFormation = defaultFormations[slug];
  if (defaultFormation) {
    return {
      title: defaultFormation.title,
      description: defaultFormation.description,
      alternates: {
        canonical: `/formations-excel/${slug}`,
      },
    };
  }

  return {
    title: 'Formation non trouvée',
  };
}

export default async function FormationPage({ params }: FormationPageProps) {
  const { slug } = await params;
  const formation = getFormation(slug);
  const defaultFormation = defaultFormations[slug];

  if (!formation && !defaultFormation) {
    notFound();
  }

  return <FormationPageClient slug={slug} />;
}
