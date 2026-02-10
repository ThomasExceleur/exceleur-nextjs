import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';
import { Newsletter } from '@/components/sections/Newsletter';
import { getAllFormations } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Formations Excel | Exceleur',
  description:
    'Découvrez nos formations Excel. Devenez un expert Excel avec des programmes adaptés à tous les niveaux.',
  alternates: {
    canonical: '/formations-excel',
  },
};

// Formation cards data with enhanced styling
const formationsData = [
  {
    slug: 'le-decollage-liste-attente',
    title: 'Le Décollage',
    subtitle: 'Les bases d\'Excel pour bien démarrer',
    description: 'Idéal pour les débutants qui veulent maîtriser les fondamentaux d\'Excel et gagner en productivité dès les premières semaines.',
    level: 'debutant' as const,
    gradient: 'from-[#60a5fa] to-[#3b82f6]',
    shadowColor: 'rgba(59, 130, 246, 0.3)',
    icon: '🚀',
    features: [
      'Prise en main complète d\'Excel',
      'Formules essentielles (SOMME, MOYENNE, SI)',
      'Mise en forme et tableaux',
      'Graphiques de base',
    ],
  },
  {
    slug: 'la-machine-liste-attente',
    title: 'La Machine',
    subtitle: 'Maîtrisez Excel comme un pro',
    description: 'Pour ceux qui veulent aller plus loin et automatiser leurs tâches quotidiennes avec des techniques avancées.',
    level: 'intermediaire' as const,
    gradient: 'from-[#CB6AED] to-[#9333ea]',
    shadowColor: 'rgba(203, 106, 237, 0.3)',
    icon: '⚙️',
    features: [
      'Tableaux croisés dynamiques',
      'Fonctions avancées (RECHERCHEX, INDEX)',
      'Mise en forme conditionnelle',
      'Validation de données',
    ],
    popular: true,
  },
  {
    slug: 'la-slide-liste-attente',
    title: 'La Slide',
    subtitle: 'Créez des présentations impactantes',
    description: 'Apprenez à créer des tableaux de bord visuels et des présentations professionnelles qui impressionnent.',
    level: 'intermediaire' as const,
    gradient: 'from-[#34d399] to-[#10b981]',
    shadowColor: 'rgba(16, 185, 129, 0.3)',
    icon: '📊',
    features: [
      'Dashboards interactifs',
      'Graphiques avancés',
      'Design professionnel',
      'Storytelling avec les données',
    ],
  },
  {
    slug: 'power-query-secrets-liste-attente',
    title: 'Power Query Secrets',
    subtitle: 'Automatisez vos traitements de données',
    description: 'Découvrez la puissance de Power Query pour transformer et nettoyer vos données automatiquement.',
    level: 'avance' as const,
    gradient: 'from-[#fb923c] to-[#f97316]',
    shadowColor: 'rgba(249, 115, 22, 0.3)',
    icon: '⚡',
    features: [
      'Import de données multisources',
      'Transformation automatisée',
      'Nettoyage de données',
      'Actualisation en un clic',
    ],
  },
  {
    slug: 'excelgpt',
    title: 'ExcelGPT',
    subtitle: 'Libère ton potentiel Excel grâce à l\'IA',
    description: 'Et si ChatGPT t\'apportait un avantage injuste sur tes collègues ? 8 modules pour maîtriser l\'IA sur Excel.',
    level: 'intermediaire' as const,
    gradient: 'from-[#a78bfa] to-[#7c3aed]',
    shadowColor: 'rgba(124, 58, 237, 0.3)',
    icon: '🤖',
    features: [
      'L\'art du prompt professionnel',
      'Formules parfaites avec l\'IA',
      'Automatiser sans coder (VBA)',
      'Les super-pouvoirs de Copilot',
    ],
  },
  {
    slug: 'tcd-express',
    title: 'TCD Express',
    subtitle: 'Maîtrise les TCD en moins de 7 jours',
    description: 'Deviens celui qu\'on appelle quand il faut assurer sur Excel. 6 modules pour maîtriser les tableaux croisés dynamiques.',
    level: 'intermediaire' as const,
    gradient: 'from-[#f472b6] to-[#ec4899]',
    shadowColor: 'rgba(236, 72, 153, 0.3)',
    icon: '📋',
    features: [
      'Création de TCD professionnels',
      'Filtres, segments et chronologies',
      'Champs calculés et personnalisation',
      'Projets et mises en pratique',
    ],
  },
  {
    slug: 'excel-avance',
    title: 'Excel Avancé',
    subtitle: 'Optimisez vos compétences professionnelles',
    description: 'Maîtrisez les fonctionnalités avancées d\'Excel : TCD, Power Query, VBA et fonctions complexes.',
    level: 'avance' as const,
    gradient: 'from-[#2dd4bf] to-[#14b8a6]',
    shadowColor: 'rgba(20, 184, 166, 0.3)',
    icon: '🎯',
    features: [
      'Tableaux croisés dynamiques avancés',
      'Fonctions RECHERCHEX, INDEX/EQUIV',
      'Power Query et Power Pivot',
      'Automatisation avec macros VBA',
    ],
  },
];

const levelLabels = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};

const levelColors = {
  debutant: 'bg-blue-100 text-blue-700',
  intermediaire: 'bg-purple-100 text-purple-700',
  avance: 'bg-orange-100 text-orange-700',
};

export default function FormationsPage() {
  // Try to get formations from MDX, fallback to default
  let formations = getAllFormations();
  if (formations.length === 0) {
    formations = formationsData;
  }

  return (
    <>
      {/* Hero Section - Matching exceleur.fr wavy gradient style */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Wavy gradient background like exceleur.fr */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #CB6AED 0%, #9b5de5 25%, #7209b7 50%, #3a0ca3 75%, #4cc9f0 100%)',
            }}
          />
          {/* Wavy overlay effect */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 40%, rgba(203, 106, 237, 0.8) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(76, 201, 240, 0.6) 0%, transparent 50%),
                radial-gradient(ellipse 70% 50% at 50% 80%, rgba(155, 93, 229, 0.7) 0%, transparent 50%)
              `,
            }}
          />
          {/* Soft wave shapes */}
          <svg
            className="absolute bottom-0 left-0 w-full h-32 lg:h-48"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,30 1440,60 L1440,120 L0,120 Z"
              fill="white"
              fillOpacity="0.1"
            />
            <path
              d="M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,80 L1440,120 L0,120 Z"
              fill="white"
              fillOpacity="0.05"
            />
          </svg>
        </div>

        <Container className="relative z-10">
          <FadeIn direction="up">
            <div className="text-center">
              {/* Icon - laptop with lightbulb like exceleur.fr */}
              <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
                <div className="relative">
                  {/* Laptop */}
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {/* Lightbulb accent */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
                Les formations Exceleur
              </h1>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Main Content Section - "NOS FORMATIONS EXCEL" */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-text-dark mb-4 uppercase tracking-tight">
                Nos formations Excel
              </h2>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-6">
                Des programmes complémentaires pour une maîtrise du logiciel à 360°
              </h3>
              <p className="text-text leading-relaxed">
                Excel est un outil surpuissant mais j&apos;ai souvent constaté un écart entre les possibilités
                qu&apos;offre cet outil et les compétences de ses utilisateurs. Je suis là pour t&apos;accompagner
                à réellement maîtriser Excel et te faire progresser dans ta carrière.
              </p>
            </div>
          </FadeIn>

          {/* Formations Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {formationsData.map((formation, index) => (
              <FadeIn key={formation.slug} direction="up" delay={index * 100}>
                <Link
                  href={`/formations-excel/${formation.slug}/`}
                  className="group relative block h-full"
                >
                  {/* Popular badge */}
                  {formation.popular && (
                    <div className="absolute -top-3 left-6 z-20 px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-xs font-bold shadow-lg shadow-primary/30">
                      Plus populaire
                    </div>
                  )}

                  {/* Card */}
                  <div className="relative h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-card-elevated transition-all duration-500 group-hover:-translate-y-1">
                    {/* Top gradient bar */}
                    <div className={`h-2 bg-gradient-to-r ${formation.gradient}`} />

                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
                      style={{ background: `linear-gradient(135deg, ${formation.shadowColor}, transparent)` }}
                    />

                    <div className="p-6 lg:p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${formation.gradient} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                            style={{ boxShadow: `0 8px 24px -4px ${formation.shadowColor}` }}
                          >
                            {formation.icon}
                          </div>
                          <div>
                            <h3 className="font-heading text-xl font-extrabold text-text-dark group-hover:text-primary transition-colors">
                              {formation.title}
                            </h3>
                            <p className="text-sm text-text-light">{formation.subtitle}</p>
                          </div>
                        </div>

                        {/* Level badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[formation.level]}`}>
                          {levelLabels[formation.level]}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-text mb-6 leading-relaxed">
                        {formation.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {formation.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${formation.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-text-light">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-text-light">Inscriptions par session</span>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${formation.gradient} text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-all duration-300`}>
                          En savoir plus
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <Newsletter variant="gradient" />
    </>
  );
}
