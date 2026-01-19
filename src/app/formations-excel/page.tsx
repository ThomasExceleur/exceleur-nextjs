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
    'Découvrez nos formations Excel certifiées Qualiopi. Financement CPF possible. Devenez un expert Excel avec des programmes adaptés à tous les niveaux.',
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
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-secondary/15 to-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CB6AED' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-soft">
                <Image
                  src="/images/logos/qualiopi.png"
                  alt="Qualiopi"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium text-text">Certifié Qualiopi • Financement CPF</span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-6">
                Des{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    formations Excel
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M1 8.5C32 3.5 62 1.5 100 5.5C138 9.5 168 8.5 199 3.5"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                pour tous les niveaux
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-text-light max-w-2xl mx-auto mb-10">
                Maîtrisez Excel et boostez votre carrière avec nos programmes complets.
                Des débutants aux experts, trouvez la formation adaptée à vos objectifs.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-text-dark">2000+</div>
                    <div className="text-sm text-text-light">Stagiaires formés</div>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-text-dark">98%</div>
                    <div className="text-sm text-text-light">Satisfaction</div>
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-text-dark">CPF</div>
                    <div className="text-sm text-text-light">Éligible</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Formations Grid */}
      <section id="formations" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Choisissez votre{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  parcours
                </span>
              </h2>
              <p className="text-lg text-text-light max-w-2xl mx-auto">
                Des programmes complémentaires pour une maîtrise d&apos;Excel à 360°.
                Chaque formation est accompagnée d&apos;un suivi personnalisé.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {formationsData.map((formation, index) => (
              <FadeIn key={formation.slug} direction="up" delay={index * 100}>
                <Link
                  href={`/formations-excel/${formation.slug}`}
                  className="group relative block h-full"
                >
                  {/* Popular badge */}
                  {formation.popular && (
                    <div className="absolute -top-3 left-6 z-20 px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-xs font-bold shadow-lg shadow-primary/30">
                      ⭐ Plus populaire
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

      {/* Why choose us */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-text-dark via-gray-900 to-text-dark relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
                Pourquoi choisir{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Exceleur
                </span>
                ?
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Une pédagogie unique conçue par un expert reconnu
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Vidéos à la demande',
                description: 'Accédez aux cours quand vous voulez, révisez autant de fois que nécessaire.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Accompagnement personnalisé',
                description: 'Un suivi sur plusieurs mois avec une communauté d\'entraide active.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: 'Certification Qualiopi',
                description: 'Formations éligibles au CPF et aux financements entreprise.',
              },
            ].map((item, index) => (
              <FadeIn key={item.title} direction="up" delay={index * 100}>
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <Container>
          <FadeIn direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8 md:p-12 lg:p-16 text-center">
              {/* Background decoration */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              </div>

              {/* Content */}
              <div className="relative max-w-2xl mx-auto">
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Besoin d&apos;une formation sur mesure ?
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Contactez-nous pour discuter de vos besoins spécifiques et obtenir un programme personnalisé pour votre équipe.
                </p>
                <a
                  href="mailto:contact@exceleur.fr"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-xl text-primary font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Nous contacter
                </a>
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
