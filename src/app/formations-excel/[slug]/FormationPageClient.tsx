'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';
import { Newsletter } from '@/components/sections/Newsletter';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Accordion } from '@/components/ui/Accordion';

// Default formation data for when MDX doesn't exist
const defaultFormations: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    level: 'debutant' | 'intermediaire' | 'avance';
    features: string[];
    benefits: Array<{ title: string; description: string; icon: string }>;
    modules: Array<{ title: string; items: string[] }>;
    gradient: string;
    gradientFrom: string;
    gradientTo: string;
    shadowColor: string;
    icon: string;
    content: string;
    stats: Array<{ value: number; suffix?: string; label: string }>;
    faq: Array<{ question: string; answer: string }>;
    targetAudience: string[];
    duration: string;
    format: string;
  }
> = {
  'excel-avance': {
    title: 'Excel Avancé',
    subtitle: 'Optimisez vos compétences professionnelles',
    description:
      'Maîtrisez Excel pour optimiser vos compétences professionnelles. Formation créée par Thomas L\'Exceleur.',
    level: 'avance',
    gradient: 'from-[#CB6AED] to-[#9333ea]',
    gradientFrom: '#CB6AED',
    gradientTo: '#9333ea',
    shadowColor: 'rgba(203, 106, 237, 0.3)',
    icon: '⚡',
    duration: '20 heures',
    format: 'En ligne',
    features: [
      'Tableaux croisés dynamiques avancés',
      'Fonctions RECHERCHEX, INDEX/EQUIV',
      'Power Query et Power Pivot',
      'Automatisation avec macros VBA',
      'Analyse de données complexes',
      'Création de tableaux de bord',
    ],
    benefits: [
      {
        title: 'Gagnez du temps',
        description: 'Automatisez vos tâches répétitives et concentrez-vous sur l\'analyse.',
        icon: 'clock',
      },
      {
        title: 'Boostez votre productivité',
        description: 'Maîtrisez les fonctions avancées pour traiter plus de données.',
        icon: 'rocket',
      },
      {
        title: 'Valorisez votre profil',
        description: 'Ajoutez une compétence recherchée sur le marché du travail.',
        icon: 'star',
      },
    ],
    modules: [
      {
        title: 'Module 1 : Tableaux croisés dynamiques avancés',
        items: ['Création et personnalisation de TCD', 'Champs calculés et éléments calculés', 'Groupement et filtrage avancé'],
      },
      {
        title: 'Module 2 : Fonctions avancées',
        items: ['RECHERCHEX et ses variantes', 'INDEX/EQUIV et combinaisons', 'Fonctions matricielles dynamiques'],
      },
      {
        title: 'Module 3 : Power Query',
        items: ['Import et transformation de données', 'Fusion de plusieurs sources', 'Actualisation automatique'],
      },
      {
        title: 'Module 4 : Introduction à VBA',
        items: ['Enregistrement de macros', 'Modification du code', 'Automatisation de tâches répétitives'],
      },
    ],
    stats: [
      { value: 500, suffix: '+', label: 'Personnes formées' },
      { value: 4.8, suffix: '/5', label: 'Note moyenne' },
      { value: 20, suffix: 'h', label: 'De formation' },
    ],
    targetAudience: [
      'Professionnels utilisant Excel quotidiennement',
      'Analystes et contrôleurs de gestion',
      'Chefs de projet et managers',
      'Toute personne souhaitant automatiser ses tâches',
    ],
    faq: [
      {
        question: 'Quel niveau est requis pour suivre cette formation ?',
        answer: 'Un niveau intermédiaire en Excel est recommandé. Vous devez être à l\'aise avec les formules de base (SOMME, SI, RECHERCHEV) et les tableaux croisés dynamiques simples.',
      },
      {
        question: 'Comment se déroule la formation ?',
        answer: 'La formation est 100% en ligne. Vous accédez aux vidéos et exercices à votre rythme, avec un accès à vie au contenu.',
      },
      {
        question: 'Y a-t-il un support en cas de question ?',
        answer: 'Oui, vous bénéficiez d\'un support par email pour toutes vos questions techniques pendant et après la formation.',
      },
    ],
    content: `
## À propos de cette formation

Cette formation Excel avancée est conçue pour les professionnels souhaitant maîtriser les fonctionnalités les plus puissantes d'Excel. Vous apprendrez à automatiser vos tâches, analyser des données complexes et créer des tableaux de bord professionnels.
    `,
  },
  'formation-excel-entreprise': {
    title: 'Formation Excel Entreprise',
    subtitle: 'Sur mesure pour vos équipes',
    description:
      'Formation sur mesure pour les entreprises. Adaptée à vos besoins spécifiques et à votre secteur d\'activité.',
    level: 'intermediaire',
    gradient: 'from-[#5048DD] to-[#3730a3]',
    gradientFrom: '#5048DD',
    gradientTo: '#3730a3',
    shadowColor: 'rgba(80, 72, 221, 0.3)',
    icon: '🏢',
    duration: 'Sur mesure',
    format: 'Sur site ou à distance',
    features: [
      'Formation personnalisée',
      'Sur site ou à distance',
      'Suivi post-formation',
      'Support dédié',
      'Adaptation à votre métier',
      'Exercices sur vos données',
    ],
    benefits: [
      {
        title: 'Formation sur mesure',
        description: 'Contenu adapté à vos processus métier et vos fichiers réels.',
        icon: 'target',
      },
      {
        title: 'Flexibilité totale',
        description: 'Sessions en présentiel ou à distance, selon vos contraintes.',
        icon: 'calendar',
      },
      {
        title: 'Résultats concrets',
        description: 'Vos équipes appliquent immédiatement les compétences acquises.',
        icon: 'chart',
      },
    ],
    modules: [
      {
        title: 'Personnalisation complète',
        items: ['Analyse de vos besoins', 'Programme adapté à votre contexte', 'Exercices sur vos fichiers réels'],
      },
      {
        title: 'Flexibilité totale',
        items: ['Formation sur site ou à distance', 'Planning adapté à vos contraintes', 'Sessions individuelles ou en groupe'],
      },
      {
        title: 'Suivi post-formation',
        items: ['Support technique inclus', 'Réponses à vos questions', 'Consolidation des acquis'],
      },
    ],
    stats: [
      { value: 50, suffix: '+', label: 'Entreprises formées' },
      { value: 98, suffix: '%', label: 'Satisfaction' },
      { value: 1000, suffix: '+', label: 'Collaborateurs formés' },
    ],
    targetAudience: [
      'Équipes financières et comptables',
      'Services RH et administratifs',
      'Équipes commerciales et marketing',
      'Tout département utilisant Excel',
    ],
    faq: [
      {
        question: 'Comment se déroule la mise en place de la formation ?',
        answer: 'Nous commençons par un audit de vos besoins, puis nous élaborons un programme sur mesure. La formation peut se dérouler sur site ou à distance selon vos préférences.',
      },
      {
        question: 'Combien de personnes peuvent suivre la formation ?',
        answer: 'Nous formons des groupes de 2 à 12 personnes pour garantir un accompagnement personnalisé et une efficacité optimale.',
      },
      {
        question: 'Proposez-vous un suivi après la formation ?',
        answer: 'Oui, nous offrons un support post-formation de 3 mois inclus pour répondre aux questions et consolider les acquis de vos équipes.',
      },
    ],
    content: `
## Formation Excel pour les entreprises

Offrez à vos équipes une formation Excel sur mesure, adaptée à vos processus métier et à vos objectifs.
    `,
  },
};

const levelLabels = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};

const levelColors = {
  debutant: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  intermediaire: 'bg-primary/10 text-primary border-primary/20',
  avance: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
};

const benefitIcons: Record<string, React.ReactNode> = {
  clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  rocket: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

interface FormationPageClientProps {
  slug: string;
}

export default function FormationPageClient({ slug }: FormationPageClientProps) {
  const [mounted, setMounted] = useState(false);
  const formation = defaultFormations[slug];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!formation) {
    return null;
  }

  const {
    title,
    subtitle,
    description,
    level,
    gradientFrom,
    gradientTo,
    shadowColor,
    icon,
    duration,
    format,
    features,
    benefits,
    modules,
    stats,
    targetAudience,
    faq,
  } = formation;

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Dynamic gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}10 0%, white 50%, ${gradientTo}10 100%)`,
          }}
        />

        {/* Decorative floating orbs */}
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${gradientFrom}40 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${gradientTo}40 0%, transparent 70%)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10"
          style={{ background: `radial-gradient(circle, ${gradientFrom}30 0%, transparent 50%)` }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${gradientFrom.replace('#', '')}' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <FadeIn direction="up">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link
                href="/"
                className="text-text-light hover:text-primary transition-colors"
              >
                Accueil
              </Link>
              <svg className="w-4 h-4 text-text-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link
                href="/formations-excel/"
                className="text-text-light hover:text-primary transition-colors"
              >
                Formations
              </Link>
              <svg className="w-4 h-4 text-text-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-primary font-medium">{title}</span>
            </nav>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <FadeIn direction="up" delay={100}>
              <div>
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {level && (
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${levelColors[level]}`}>
                      <span className="w-2 h-2 rounded-full bg-current" />
                      {levelLabels[level]}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200/50 text-text">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {duration}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm border border-gray-200/50 text-text">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {format}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-4 leading-tight">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                  >
                    {title}
                  </span>
                </h1>

                {/* Subtitle */}
                {subtitle && (
                  <p className="text-xl md:text-2xl text-text-light mb-4 font-medium">{subtitle}</p>
                )}

                {/* Description */}
                <p className="text-lg text-text mb-8 leading-relaxed max-w-xl">
                  {description}
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-soft">
                    <div className="flex -space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-text-dark">4.8/5</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#programme"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                      boxShadow: `0 10px 40px -10px ${shadowColor}`,
                    }}
                  >
                    Voir le programme
                    <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                  <a
                    href="/contact/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-text-dark font-semibold hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Nous contacter
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Right: Formation card visual */}
            <FadeIn direction="up" delay={200}>
              <div className="relative">
                {/* Main card */}
                <div
                  className="relative p-8 lg:p-10 rounded-3xl text-white overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                    boxShadow: `0 25px 80px -20px ${shadowColor}`,
                  }}
                >
                  {/* Floating orbs inside card */}
                  <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />
                  <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 60%)' }} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-20 h-20 mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl">
                      {icon}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-2">{title}</h3>
                    <p className="text-white/80 mb-6">{subtitle}</p>

                    {/* Divider */}
                    <div className="h-px bg-white/20 mb-6" />

                    {/* Quick features */}
                    <ul className="space-y-4">
                      {features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-white/90">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32">
                    <div className="absolute top-0 right-0 w-full h-full bg-white/5 transform rotate-45 translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Floating badge - Format */}
                <div className="absolute -top-4 -right-4 px-5 py-3 bg-white rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${gradientFrom}20 0%, ${gradientTo}20 100%)` }}
                    >
                      <svg className="w-6 h-6" style={{ color: gradientFrom }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-text-light">Format</div>
                      <div className="text-sm font-bold text-text-dark">{format}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      {benefits && benefits.length > 0 && (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: `radial-gradient(circle, ${gradientFrom} 0%, transparent 70%)` }}
          />

          <Container className="relative">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}10 0%, ${gradientTo}10 100%)`,
                    color: gradientFrom,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Pourquoi cette formation
                </div>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                  Les avantages de cette{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                  >
                    formation
                  </span>
                </h2>
                <p className="text-lg text-text-light max-w-2xl mx-auto">
                  Découvrez ce qui rend cette formation unique et comment elle va transformer votre maîtrise d&apos;Excel.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <FadeIn key={index} direction="up" delay={index * 100}>
                  <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-soft hover:shadow-card transition-all duration-500 hover:-translate-y-2">
                    {/* Glow effect on hover */}
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
                      style={{ background: `linear-gradient(135deg, ${gradientFrom}10 0%, ${gradientTo}10 100%)` }}
                    />

                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                        boxShadow: `0 10px 30px -10px ${shadowColor}`,
                      }}
                    >
                      <div className="text-white">
                        {benefitIcons[benefit.icon] || benefitIcons.star}
                      </div>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-text-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Features Grid Section */}
      {features && features.length > 0 && (
        <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${gradientFrom.replace('#', '')}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <Container className="relative">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                  Ce que vous allez{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                  >
                    apprendre
                  </span>
                </h2>
                <p className="text-lg text-text-light max-w-2xl mx-auto">
                  Les compétences clés que vous maîtriserez à la fin de cette formation
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <FadeIn key={index} direction="up" delay={index * 50}>
                  <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-soft hover:shadow-card hover:border-transparent transition-all duration-300">
                    {/* Hover border gradient */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${gradientFrom}20 0%, ${gradientTo}20 100%)`,
                        padding: '1px',
                      }}
                    />

                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-text font-medium pt-2">{feature}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Statistics Section */}
      {stats && stats.length > 0 && mounted && (
        <section
          className="py-20 lg:py-24 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />

          <Container className="relative">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Des résultats concrets
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Rejoignez des centaines de professionnels satisfaits
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <FadeIn key={index} direction="up" delay={index * 100}>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center">
                    <div className="font-heading text-5xl md:text-6xl font-extrabold text-white mb-2">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2000}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                    </div>
                    <p className="text-white/80 font-medium">{stat.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Modules Section */}
      {modules.length > 0 && (
        <section id="programme" className="py-20 lg:py-28 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div
            className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ background: `radial-gradient(circle, ${gradientTo} 0%, transparent 70%)` }}
          />

          <Container className="relative">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}10 0%, ${gradientTo}10 100%)`,
                    color: gradientFrom,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Programme détaillé
                </div>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                  Le programme de la{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                  >
                    formation
                  </span>
                </h2>
                <p className="text-lg text-text-light max-w-2xl mx-auto">
                  Un parcours structuré pour vous mener de A à Z vers la maîtrise complète
                </p>
              </div>
            </FadeIn>

            <div className="max-w-4xl mx-auto space-y-6">
              {modules.map((module, index) => (
                <FadeIn key={index} direction="up" delay={index * 100}>
                  <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-soft hover:shadow-card transition-all duration-500 overflow-hidden">
                    {/* Left accent line */}
                    <div
                      className="absolute top-0 left-0 w-1.5 h-full rounded-l-3xl"
                      style={{ background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                    />

                    <div className="p-8 lg:p-10 pl-10 lg:pl-12">
                      <div className="flex items-start gap-6">
                        {/* Module number */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                            boxShadow: `0 10px 30px -10px ${shadowColor}`,
                          }}
                        >
                          {index + 1}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold text-text-dark mb-4 group-hover:text-primary transition-colors">
                            {module.title}
                          </h3>
                          <ul className="space-y-3">
                            {module.items.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-text-light">
                                <div
                                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ background: `linear-gradient(135deg, ${gradientFrom}20 0%, ${gradientTo}20 100%)` }}
                                >
                                  <svg className="w-3.5 h-3.5" style={{ color: gradientFrom }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Target Audience Section */}
      {targetAudience && targetAudience.length > 0 && (
        <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
          <Container className="relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <FadeIn direction="up">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${gradientFrom}10 0%, ${gradientTo}10 100%)`,
                      color: gradientFrom,
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Pour qui ?
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-6">
                    Cette formation est faite pour{' '}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                    >
                      vous
                    </span>{' '}
                    si...
                  </h2>
                  <p className="text-lg text-text-light mb-8">
                    Découvrez si cette formation correspond à votre profil et à vos objectifs professionnels.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={100}>
                <div className="space-y-4">
                  {targetAudience.map((audience, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-card transition-all duration-300"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-text font-medium">{audience}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>
      )}

      {/* Guarantee Section */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <Container className="relative">
          <FadeIn direction="up">
            <div
              className="relative rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${gradientFrom}05 0%, ${gradientTo}10 100%)` }}
            >
              {/* Background decorations */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
                style={{ background: `radial-gradient(circle, ${gradientFrom}40 0%, transparent 70%)` }}
              />

              <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Icon */}
                <div
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                    boxShadow: `0 20px 60px -20px ${shadowColor}`,
                  }}
                >
                  <svg className="w-12 h-12 lg:w-16 lg:h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-text-dark mb-4">
                    Garantie Satisfait ou Remboursé
                  </h3>
                  <p className="text-lg text-text-light mb-6 max-w-2xl">
                    Nous sommes convaincus de la qualité de cette formation. Si elle ne répond pas à vos attentes dans les 30 premiers jours, nous vous remboursons intégralement, sans condition.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-text">
                      <svg className="w-5 h-5" style={{ color: gradientFrom }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      30 jours de garantie
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-text">
                      <svg className="w-5 h-5" style={{ color: gradientFrom }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Remboursement intégral
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-text">
                      <svg className="w-5 h-5" style={{ color: gradientFrom }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sans conditions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
          <Container className="relative">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}10 0%, ${gradientTo}10 100%)`,
                    color: gradientFrom,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  FAQ
                </div>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                  Questions{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
                  >
                    fréquentes
                  </span>
                </h2>
                <p className="text-lg text-text-light max-w-2xl mx-auto">
                  Tout ce que vous devez savoir avant de vous lancer
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <div className="max-w-3xl mx-auto">
                <Accordion
                  items={faq.map((item) => ({
                    question: item.question,
                    answer: item.answer,
                  }))}
                />
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div
              className="relative overflow-hidden rounded-3xl p-8 md:p-12 lg:p-16 text-center"
              style={{ background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)` }}
            >
              {/* Background decorations */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{ background: `radial-gradient(circle, ${gradientFrom} 0%, transparent 70%)` }}
              />
              <div
                className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15"
                style={{ background: `radial-gradient(circle, ${gradientTo} 0%, transparent 70%)` }}
              />

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative max-w-3xl mx-auto">
                {/* Icon */}
                <div
                  className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center text-4xl"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                    boxShadow: `0 20px 60px -15px ${shadowColor}`,
                  }}
                >
                  {icon}
                </div>

                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                  Prêt à vous former ?
                </h2>
                <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                  Inscrivez-vous dès maintenant et commencez votre parcours vers l&apos;excellence Excel.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="/contact/"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
                      boxShadow: `0 15px 50px -15px ${shadowColor}`,
                    }}
                  >
                    S&apos;inscrire à la formation
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <Link
                    href="/formations-excel/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voir toutes les formations
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Garantie 30 jours
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Newsletter */}
      <Newsletter variant="gradient" />
    </>
  );
}
