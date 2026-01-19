'use client';

import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Accordion } from '@/components/ui/Accordion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PricingCard } from '@/components/ui/PricingCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { Newsletter } from '@/components/sections/Newsletter';

const modules = [
  {
    number: 0,
    title: "Les bases d'Excel avant d'utiliser Power Query",
    items: [
      "Découverte de l'interface d'Excel",
      "Les différents messages d'erreur (et comment les résoudre)",
      "Les formules et dates (ce qu'il faut savoir pour s'en sortir dès le début)",
      "Introduction aux TCD (tableaux croisés dynamiques)",
      "Présentation des graphiques : comment choisir et créer des graphiques"
    ]
  },
  {
    number: 1,
    title: "Présentation de Power Query",
    items: [
      "À quoi sert Power Query",
      "Comment l'installer",
      "Important : Comment avoir des données propres"
    ]
  },
  {
    number: 2,
    title: "Le pouvoir révélé de Power Query",
    items: [
      "TCD vs Power Query : 5 bonnes raisons de préférer Power Query",
      "Importer des données depuis un autre fichier",
      "Transformer et suivre la qualité de tes données",
      "La gestion (clé) des étapes et de l'éditeur de formules",
      "Indispensable : Comment rafraîchir tes données et devenir un maître des options d'actualisations",
      "La subtile différence entre ajouter et fusionner les requêtes"
    ]
  },
  {
    number: 3,
    title: "Prévenir les erreurs",
    items: [
      "Comment importer (proprement) un tableau depuis un fichier Excel",
      "La méthode pour changer la source de tes données sans risquer l'apparition d'erreurs",
      "L'option cachée pour résoudre les erreurs de formats de Dates en moins de 10s",
      "L'erreur invisible qui peut causer des approximations dans tes calculs",
      "Trouver et corriger les erreurs dans tes données",
      "Comment identifier les dépendances de requêtes en un coup d'œil"
    ]
  },
  {
    number: 4,
    title: "Transformations avancées des données",
    items: [
      "Transformer massivement du texte",
      "Mes recommandations pour transformer des nombres",
      "La solution pour gérer (très facilement) des lignes vides",
      "Fusionner des colonnes (et éviter les espaces en trop)",
      "L'importance des filtres et comment (bien) les utiliser",
      "L'outil \"transformation intelligente\"",
      "La méthode (encore plus rapide qu'un TCD) pour grouper des données sur plusieurs niveaux",
      "Pivoter / Dépivoter efficacement ses données (+ le petit bug à contourner)",
      "Lignes VS Colonnes : Dans quelle situation utiliser l'un ou l'autre pour fractionner ses données ?"
    ]
  },
  {
    number: 5,
    title: "Maîtriser la gestion des dates et des heures",
    items: [
      "Les différentes manières de décomposer une date",
      "Créer une date à partir d'un texte",
      "Calculer des heures travaillées (transformer des temps)",
      "Gérer les erreurs de dates dues aux régions"
    ]
  },
  {
    number: 6,
    title: "Combiner plusieurs sources de données",
    items: [
      "Ajouter & fusionner les données : Les différences à connaître pour (bien) les utiliser",
      "Combiner tous les fichiers d'un dossier (d'un seul coup)",
      "Combiner toutes les feuilles d'un fichier",
      "Déjouer les erreurs d'importation de plusieurs feuilles",
      "Consolider les données de plusieurs feuilles"
    ]
  },
  {
    number: 7,
    title: "Fusionner tes données (l'équivalent de RechercheV)",
    items: [
      "Un tour rapide des différents types de jointures",
      "Externe gauche (et externe droite) : La jointure qu'il faut absolument connaître",
      "Comment fusionner 2 tableaux (avec des colonnes communes)",
      "La méthode pour résoudre efficacement les problèmes liés aux fusions",
      "Déjouer les erreurs d'importation de plusieurs feuilles grâce à la correspondance approximative",
      "Faire correspondre et standardiser des données légèrement différentes"
    ]
  },
  {
    number: 8,
    title: "La puissance des colonnes personnalisées",
    items: [
      "Les bases du langage M pour commencer à personnaliser tes propres requêtes",
      "Pourquoi utiliser des colonnes personnalisées",
      "Comment sauter une étape dans Power Query (et ce que ça nous permet de faire)",
      "Le guide pour créer tes premières colonnes personnalisées"
    ]
  }
];

const masterclasses = [
  {
    number: 1,
    title: "Maîtriser le langage M : Niveau avancé",
    description: "Dans cette masterclass, je vais te montrer tout ce que tu dois savoir sur le langage M pour combiner et filtrer tes données comme un pro.",
    gradient: 'from-teal-500 to-emerald-500',
  },
  {
    number: 2,
    title: "Créer un tableau de bord dans Excel en utilisant Power Query",
    description: "Je te montre comment créer un tableau de bord de A à Z avec des données importées et actualisées en 2 clics depuis Power Query.",
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    number: 3,
    title: "Rendre tes fichiers résistants aux modifications avec Power Query",
    description: "Il existe des solutions pour prendre en compte les modifications (une colonne qui change de nom, une colonne insérée) dans Power Query.",
    gradient: 'from-cyan-500 to-teal-500',
  }
];

const bonuses = [
  {
    number: 1,
    title: "Les modèles de données avec Power Pivot",
    items: [
      "Quand faut-il l'utiliser ?",
      "Comment créer un TCD à partir de plusieurs tableaux Excel ?",
      "Combiner Power Pivot et Power Query pour créer des tables de données"
    ]
  },
  {
    number: 2,
    title: "Importer ses données depuis plusieurs sources",
    items: [
      "Importer des données depuis le Web (wikipedia, etc)",
      "Importer des données depuis Google Sheets",
      "Importer des données depuis plusieurs PDF à la fois",
      "Importer des données depuis Microsoft Access"
    ]
  },
  {
    number: 3,
    title: "Connecter Power Query et Power BI",
    items: [
      "Installation et présentation de Power BI",
      "Charger et transformer les données de Power Query dans Power BI",
      "Mettre en place ton modèle de données et tes relations",
      "Créer et publier un tableau de bord"
    ]
  }
];

const faqItems = [
  {
    question: "Est-ce que la formation est adaptée aux débutants ?",
    answer: "Oui ! Le Module 0 couvre les bases d'Excel nécessaires avant d'utiliser Power Query. Tu n'as pas besoin d'être un expert Excel pour suivre cette formation."
  },
  {
    question: "Combien de temps dure la formation ?",
    answer: "La formation complète représente environ 20 heures de contenu vidéo. Tu peux la suivre à ton rythme, et tu gardes un accès à vie."
  },
  {
    question: "Est-ce que Power Query est inclus dans Excel ?",
    answer: "Oui, Power Query est intégré dans Excel depuis Excel 2016. Si tu as une version plus ancienne, je t'explique comment l'installer dans le Module 1."
  },
  {
    question: "Est-ce que je peux utiliser Power Query sur Mac ?",
    answer: "Malheureusement, Power Query n'est pas disponible sur Mac. Cette formation est destinée aux utilisateurs Windows."
  },
  {
    question: "Est-ce que la formation est éligible au CPF ?",
    answer: "Non, cette formation n'est pas éligible au CPF car elle ne prépare pas à une certification officielle."
  },
  {
    question: "Quelle est la différence entre les 3 formules ?",
    answer: "La Version Complète contient tous les modules de formation. La Version Premium ajoute l'accès à la communauté privée pour poser tes questions. La Version Ultime inclut en plus les 3 Masterclasses avancées et l'accès aux consultations."
  },
  {
    question: "Est-ce que je peux payer en plusieurs fois ?",
    answer: "Oui, le paiement en 3 fois est disponible pour toutes les formules. Les détails seront indiqués lors de l'inscription."
  },
  {
    question: "Pendant combien de temps ai-je accès à la formation ?",
    answer: "Tu as un accès à vie à la formation et à toutes ses futures mises à jour. Tu peux la revoir autant de fois que tu le souhaites."
  },
  {
    question: "Y a-t-il une garantie satisfait ou remboursé ?",
    answer: "Oui, tu bénéficies d'une garantie satisfait ou remboursé de 30 jours. Si la formation ne te convient pas, tu peux demander un remboursement intégral."
  }
];

const pricingOptions = [
  {
    title: "Version Ultime",
    subtitle: "Pour devenir un pro",
    price: "2100€",
    features: [
      { text: "Les 9 Modules de Power Query Secrets", included: true },
      { text: "Les 3 Modules Bonus offerts", included: true },
      { text: "Les fiches recap' PDF à télécharger", included: true },
      { text: "Les fichiers Excel présentés", included: true },
      { text: "Les Cas Pratiques", included: true },
      { text: "Accès à ma communauté privée", included: true },
      { text: "Accès aux Consultations", included: true },
      { text: "Masterclass 1 : Langage M", included: true },
      { text: "Masterclass 2 : Tableau de bord", included: true },
      { text: "Masterclass 3 : Fichiers résistants", included: true },
    ],
    highlighted: true,
  },
  {
    title: "Version Premium",
    subtitle: "Pour poser tes questions",
    price: "1300€",
    features: [
      { text: "Les 9 Modules de Power Query Secrets", included: true },
      { text: "Les 3 Modules Bonus offerts", included: true },
      { text: "Les fiches recap' PDF à télécharger", included: true },
      { text: "Les fichiers Excel présentés", included: true },
      { text: "Les Cas Pratiques", included: true },
      { text: "Accès à ma communauté privée", included: true },
      { text: "Accès aux Consultations", included: false },
      { text: "Masterclass 1 : Langage M", included: false },
      { text: "Masterclass 2 : Tableau de bord", included: false },
      { text: "Masterclass 3 : Fichiers résistants", included: false },
    ],
    highlighted: false,
  },
  {
    title: "Version Complète",
    subtitle: "Pour la théorie",
    price: "900€",
    features: [
      { text: "Les 9 Modules de Power Query Secrets", included: true },
      { text: "Les 3 Modules Bonus offerts", included: true },
      { text: "Les fiches recap' PDF à télécharger", included: true },
      { text: "Les fichiers Excel présentés", included: true },
      { text: "Les Cas Pratiques", included: true },
      { text: "Accès à ma communauté privée", included: false },
      { text: "Accès aux Consultations", included: false },
      { text: "Masterclass 1 : Langage M", included: false },
      { text: "Masterclass 2 : Tableau de bord", included: false },
      { text: "Masterclass 3 : Fichiers résistants", included: false },
    ],
    highlighted: false,
  },
];

export default function PowerQuerySecretsListeAttentePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Gradient Background - Teal/Emerald theme for Power Query */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-3xl" />

        {/* Data flow pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 30 L20 30 L25 20 L35 40 L40 30 L55 30' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ccircle cx='5' cy='30' r='3' fill='%23ffffff'/%3E%3Ccircle cx='55' cy='30' r='3' fill='%23ffffff'/%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <FadeIn direction="up">
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-sm font-medium text-white">Formation Power Query avancée</span>
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                  POWER QUERY <span className="text-yellow-400">SECRETS</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-semibold mb-4">
                  Deviens LA personne la plus efficace du bureau
                </p>

                <h2 className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                  La nouvelle façon d&apos;exploiter ses données sur Excel grâce au pouvoir secret de Power Query
                </h2>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span className="text-sm font-medium text-white">2500+ élèves</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full">
                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-white">98% satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-white">20h de contenu</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#liste-attente"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-yellow-400 text-teal-900 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
                >
                  S&apos;inscrire à la liste d&apos;attente
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </FadeIn>

            {/* Right Column - Visual Card */}
            <FadeIn direction="left" delay={200}>
              <div className="relative">
                {/* Main visual card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                  {/* Power Query mockup */}
                  <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
                    <div className="aspect-video bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                          </svg>
                        </div>
                        <p className="font-heading font-bold text-gray-700">Données automatisées</p>
                        <p className="text-sm text-gray-500">en quelques clics</p>
                      </div>
                    </div>
                  </div>

                  {/* Feature pills */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">9</div>
                      <div className="text-xs text-white/80">modules complets</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">3</div>
                      <div className="text-xs text-white/80">masterclasses</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">∞</div>
                      <div className="text-xs text-white/80">accès à vie</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">PDF</div>
                      <div className="text-xs text-white/80">fiches récap</div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-6">
                  Top 10% Excel
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-teal-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                <span className="text-sm font-medium text-teal-700">Ce que tu vas apprendre</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Tu vas découvrir comment :
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Power Query va révolutionner ta façon de travailler avec les données
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Traiter tes données en un temps record',
                description: 'Et travailler plus sereinement sans perdre des heures en tâches répétitives',
                gradient: 'from-teal-500 to-emerald-500',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Créer des tableaux de bord fiables',
                description: 'Et actualisables en 2 clics pour impressionner tes collègues',
                gradient: 'from-emerald-500 to-cyan-500',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: 'Automatiser ton travail',
                description: 'Sans devoir utiliser VBA ni coder une seule ligne de macro',
                gradient: 'from-cyan-500 to-teal-500',
              },
            ].map((benefit, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-text-light">
                    {benefit.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Method Steps Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-teal-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                <span className="text-sm font-medium text-teal-700">La méthode</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                Comment ça va se passer ?
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: '1',
                title: 'La découverte',
                content: "Suis la formation vidéo une première fois pour avoir une vision d'ensemble sur ce qu'il est possible de faire avec Power Query.",
                extra: "Tu peux avancer à ton rythme, ta progression sera sauvegardée.",
                gradient: 'from-teal-500 to-emerald-500',
              },
              {
                number: '2',
                title: 'La pratique',
                content: "Reproduis dans tes fichiers tout ce qu'on a vu ensemble en t'aidant des fiches recap' que je t'ai préparées.",
                extra: "En quelques jours, tu auras déjà tes premiers succès avec Power Query.",
                gradient: 'from-emerald-500 to-cyan-500',
              },
              {
                number: '3',
                title: 'La maîtrise',
                content: "À ce stade-là, tu seras un véritable ninja du M. Personne ne pourra rivaliser avec l'efficacité de ton travail.",
                extra: "Avec Power Query comme botte secrète, tu seras dans le Top 10% des utilisateurs Excel.",
                gradient: 'from-cyan-500 to-teal-500',
              },
            ].map((step, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="group text-center">
                  {/* Number badge */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-heading text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-teal-700 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-text-light mb-4">
                    {step.content}
                  </p>
                  <p className="text-text-light text-sm">
                    <strong className="text-text-dark">{step.extra}</strong>
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/formations/power-query-secrets/thomas-lexceleur.jpg"
                      alt="Thomas l'Exceleur"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">
                    700 000+ abonnés
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={200}>
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-teal-100 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                    <span className="text-sm font-medium text-teal-700">Ton formateur</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-6">
                    Qui suis-je pour te dire ça ?
                  </h2>
                  <div className="space-y-4 text-text-light">
                    <p>
                      C&apos;est <strong className="text-teal-700">Thomas l&apos;Exceleur</strong>.
                    </p>
                    <p>
                      Aussi incroyable que cela puisse paraître, <strong className="text-text-dark">Excel</strong> a toujours été pour moi <strong className="text-text-dark">un vrai terrain de jeu</strong>.
                    </p>
                    <p>
                      Et après plus de <strong className="text-text-dark">10 ans</strong> passés dans le secteur financier à l&apos;utiliser tous les jours, j&apos;ai développé une <strong className="text-text-dark">véritable expertise</strong> de l&apos;utilisation d&apos;Excel dans le milieu professionnel.
                    </p>
                    <p>
                      J&apos;interviens maintenant <strong className="text-text-dark">auprès d&apos;entreprises</strong> pour les aider à résoudre des problématiques complexes sur Excel.
                    </p>
                    <p>
                      J&apos;ai également <strong className="text-text-dark">écrit le livre</strong> &quot;Révèle l&apos;Exceleur qui est en toi !&quot; édité par Larousse.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Presentation Section - Dark gradient */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-white/60 text-sm mb-4">Je te présente</p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                POWER QUERY <span className="text-yellow-400">SECRETS</span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Le programme pour faire de toi un crack de la manipulation de données sur Excel et devenir LA personne la plus efficace du bureau.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-white">9 modules + 3 bonus</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-sm font-medium text-white">3 Masterclasses</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Communauté privée</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Programme Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-teal-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                <span className="text-sm font-medium text-teal-700">9 modules complets</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                LE PROGRAMME
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                9 modules complets pour maîtriser Power Query de A à Z
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-4">
            {modules.map((module, index) => (
              <FadeIn key={index} direction="up" delay={index * 50}>
                <div className="group bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Module number */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {module.number}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-bold text-text-dark mb-3 group-hover:text-teal-600 transition-colors">
                          Module {module.number} - {module.title}
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {module.items.slice(0, 4).map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm text-text-light">
                              <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                          {module.items.length > 4 && (
                            <li className="text-sm text-teal-600 font-medium col-span-2">
                              + {module.items.length - 4} autres points
                            </li>
                          )}
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

      {/* Masterclasses Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-medium text-white">Contenu premium</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
                LES MASTERCLASS INDISPENSABLES
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                3 masterclasses pour aller encore plus loin
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {masterclasses.map((masterclass, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${masterclass.gradient} flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {masterclass.number}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-3">
                    Masterclass {masterclass.number} : {masterclass.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {masterclass.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Bonus Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-purple-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
                <span className="text-sm font-medium text-purple-700">Inclus dans la formation</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                LES BONUS OFFERTS
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                3 bonus pour compléter ta formation
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bonuses.map((bonus, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="group bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {bonus.number}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-text-dark mb-4">
                    Bonus {bonus.number} : {bonus.title}
                  </h3>
                  <ul className="space-y-2">
                    {bonus.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-text-light">
                        <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* PDF Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                L&apos;ANTISÈCHE
              </h2>
              <p className="text-xl text-text-light">
                Fiches résumés PDF pour retrouver en un coup d&apos;œil l&apos;info dont tu as besoin.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-teal-600 to-emerald-600 text-white">
        <Container>
          <FadeIn direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <AnimatedCounter end={98} suffix="%" className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-teal-200 mt-2">de satisfaction</p>
              </div>
              <div>
                <AnimatedCounter end={97} suffix="%" className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-teal-200 mt-2">recommandent</p>
              </div>
              <div>
                <AnimatedCounter end={2500} suffix="+" className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-teal-200 mt-2">élèves formés</p>
              </div>
              <div>
                <AnimatedCounter end={20} suffix="h" className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-teal-200 mt-2">de formation</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Waitlist Section */}
      <section id="liste-attente" className="py-20 lg:py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto text-center text-white">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4">
                Les inscriptions sont fermées
              </h2>
              <p className="text-white/90 mb-8">
                Tu souhaites <strong>être prévenu à l&apos;avance de l&apos;ouverture officielle des inscriptions</strong> afin de rejoindre la prochaine promo ?
              </p>

              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Ton adresse email"
                    className="flex-1 px-5 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 shadow-lg"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-yellow-400 text-teal-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Je m&apos;inscris
                  </button>
                </div>
                <p className="text-xs text-white/60 mt-4">
                  En vous inscrivant, vous consentez à recevoir des communications de Exceleur.
                </p>
              </form>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-teal-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                <span className="text-sm font-medium text-teal-700">3 formules disponibles</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                DÉCOUVRE LES FORMULES
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Choisis la formule qui correspond à tes besoins
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            {pricingOptions.map((option, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <PricingCard
                  title={option.title}
                  subtitle={option.subtitle}
                  price={option.price}
                  features={option.features}
                  ctaText="Rejoindre la liste d'attente"
                  ctaHref="#liste-attente"
                  highlighted={option.highlighted}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Garantie Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Garantie satisfait ou remboursé
              </h2>
              <p className="text-xl font-bold text-teal-600 mb-6">30 jours pour te décider</p>

              <p className="text-text-light mb-8">
                Tu bénéficies d&apos;une garantie satisfait ou remboursé de <strong className="text-text-dark">30 jours</strong>. Si la formation ne te convient pas, tu peux demander un <strong className="text-text-dark">remboursement intégral</strong> sans justification.
              </p>

              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-text-dark mb-4">Pourquoi cette garantie ?</h3>
                <p className="text-text-light">
                  Je suis <strong className="text-text-dark">confiant</strong> dans la qualité de ma formation. Si tu suis les modules et appliques ce que tu apprends, tu verras des résultats. Mais si ce n&apos;est pas le cas, je préfère te rembourser plutôt que de te garder insatisfait.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-teal-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
                <span className="text-sm font-medium text-teal-700">FAQ</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                QUESTIONS FRÉQUENTES
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-dark mb-4">
                Tu as encore une question, un doute ?
              </h2>
              <p className="text-text-light mb-2">
                Envoie-moi un mail à{' '}
                <a href="mailto:hello@exceleur.fr" className="text-teal-600 hover:underline font-medium">
                  hello@exceleur.fr
                </a>
              </p>
              <p className="text-text-light">Je me ferai un plaisir d&apos;y répondre.</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Newsletter */}
      <Newsletter variant="gradient" />
    </>
  );
}
