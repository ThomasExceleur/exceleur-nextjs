import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Accordion } from '@/components/ui/Accordion';
import { FadeIn } from '@/components/ui/FadeIn';
import { Newsletter } from '@/components/sections/Newsletter';

export const metadata: Metadata = {
  title: 'TCD Express - Maîtrise les Tableaux Croisés Dynamiques | Exceleur',
  description:
    'Maîtrise les TCD en moins de 7 jours. 6 modules, 2 bonus, garantie 14 jours. Formation par Thomas l\'Exceleur.',
  alternates: {
    canonical: '/formations-excel/tcd-express',
  },
  openGraph: {
    title: 'TCD Express - Maîtrise les Tableaux Croisés Dynamiques',
    description:
      'Maîtrise les TCD en moins de 7 jours. 6 modules, 2 bonus, garantie 14 jours.',
    type: 'website',
    images: [{ url: '/images/og-image.png' }],
  },
};

const faqItems = [
  {
    question: 'Qu\'est-ce que je reçois concrètement ?',
    answer:
      'Un accès complet à 6 modules vidéo + 2 bonus, disponible immédiatement après l\'inscription. Ta progression est sauvegardée automatiquement.',
  },
  {
    question: 'Cette formation est-elle adaptée si j\'ai peu de temps ?',
    answer:
      'Oui ! Les vidéos sont courtes et vont droit au but. Ta progression est sauvegardée et accessible depuis tous tes appareils.',
  },
  {
    question: 'Combien de temps pour terminer la formation ?',
    answer:
      'Tu as un accès à vie. Tu peux avancer à ton rythme, sans date limite.',
  },
  {
    question: 'Quel niveau Excel faut-il avoir ?',
    answer:
      'Aucune compétence avancée n\'est nécessaire. Si tu sais naviguer dans Excel, c\'est suffisant. La formation est progressive.',
  },
  {
    question: 'Pourquoi ne pas me former gratuitement en ligne ?',
    answer:
      'L\'information gratuite existe mais elle est dispersée et inefficace. Cette formation condense l\'essentiel + des insights exclusifs introuvables ailleurs.',
  },
  {
    question: 'Et si je ne suis pas satisfait de mon achat ?',
    answer:
      'Tu disposes de 14 jours pour changer d\'avis. Remboursement intégral sans condition, sur simple demande par email.',
  },
];

const modules = [
  {
    number: 1,
    title: 'Introduction aux TCD',
    description: 'Comprends ce que sont les tableaux croisés dynamiques, organise tes données correctement, découvre l\'interface et crée ton premier TCD professionnel.',
  },
  {
    number: 2,
    title: 'Les dangers des TCD',
    description: 'Évite les erreurs critiques : rafraîchissement incorrect, filtres mal placés, mauvaise sélection de source, problèmes de confidentialité et pièges de calcul.',
  },
  {
    number: 3,
    title: 'Filtres et mise en forme',
    description: 'Maîtrise les filtres, segments et chronologies pour créer des tableaux lisibles, élégants et bien structurés.',
  },
  {
    number: 4,
    title: 'Personnaliser tes TCD',
    description: 'Techniques avancées de tri, gestion des dates, segments dynamiques et champs calculés pour impressionner tes collègues.',
  },
  {
    number: 5,
    title: 'Créer un super-TCD',
    description: 'Crée des tableaux croisés dynamiques à partir de plusieurs sources : Index-Equiv, Power Query et Power Pivot expliqués simplement.',
  },
  {
    number: 6,
    title: 'Projets et mise en pratique',
    description: 'Mets en application tout ce que tu as appris avec des études de cas et projets pratiques inspirés de situations réelles en entreprise.',
  },
];

const bonuses = [
  {
    title: 'La checklist du TCD réussi',
    description: 'Une checklist étape par étape pour créer tes premiers tableaux croisés dynamiques sans stress.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Les notes prêtes-à-l\'emploi',
    description: 'Des notes pré-rédigées contenant toutes les informations clés pour une référence rapide au bureau.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function TCDExpressPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#4338CA]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <div className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                <span className="text-sm font-medium text-white">Formation TCD</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                Ma&icirc;trise les TCD en{' '}
                <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  moins de 7 jours
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Deviens celui qu&apos;on appelle quand il faut assurer sur Excel.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#pricing"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-heading font-bold rounded-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  D&eacute;couvrir TCD Express
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#programme"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-heading font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  Voir le programme
                </a>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Et si tu pouvais construire des tableaux professionnels{' '}
                <span className="text-indigo-300">en un temps record ?</span>
              </h2>
              <p className="text-white/70 text-lg mb-12">
                Arr&ecirc;te de perdre du temps &agrave; manipuler manuellement tes donn&eacute;es.
                Les TCD automatisent tout cela pour toi.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-indigo-500/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                <span className="text-sm font-medium text-indigo-600">5 b&eacute;n&eacute;fices cl&eacute;s</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Ce que tu vas gagner
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Gagner un temps fou chaque semaine',
                description: 'Automatise tes suivis et reportings en quelques clics.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Reportings complets sans y passer des heures',
                description: 'Cr\u00E9e des analyses professionnelles rapidement.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Comparer des indicateurs facilement',
                description: 'Par mois, produit, \u00E9quipe... en quelques secondes.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: 'Mise \u00E0 jour en 1 clic',
                description: 'Sans tout refaire, tes donn\u00E9es se mettent \u00E0 jour automatiquement.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                title: 'Devenir la r\u00E9f\u00E9rence TCD',
                description: '\u00CAtre reconnu comme "la personne qui g\u00E8re les TCD" au bureau.',
              },
            ].map((benefit, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="group h-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{benefit.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* About Thomas */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-indigo-50/30 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn direction="up">
              <p className="text-indigo-600 font-semibold mb-2 text-center">Qui suis-je ?</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8 text-center">
                Thomas, l&apos;Exceleur
              </h2>
              <div className="space-y-4 text-lg text-text-light">
                <p>
                  Plus de <strong className="text-text-dark">10 ans d&apos;exp&eacute;rience</strong> sur Excel dans la finance, l&apos;automatisation et la r&eacute;solution de probl&egrave;mes.
                </p>
                <p>
                  Plus de <strong className="text-text-dark">1 million d&apos;abonn&eacute;s</strong> sur TikTok et Instagram. Auteur du livre <strong className="text-text-dark">&laquo; R&eacute;v&egrave;le l&apos;Exceleur qui est en toi ! &raquo;</strong> &eacute;dit&eacute; par Larousse.
                </p>
                <p>
                  Mon objectif : te donner des conseils pratiques pour ma&icirc;triser les TCD avec confiance et efficacit&eacute;.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Press Logos */}
      <section className="py-12 bg-white border-y border-gray-100">
        <Container>
          <FadeIn direction="up">
            <p className="text-center text-sm text-text-light mb-8 uppercase tracking-wider font-medium">
              Ils parlent de nous
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16 opacity-60">
              {['Konbini', 'BFM TV', 'Microsoft', 'Society'].map((name) => (
                <span key={name} className="font-heading text-xl font-bold text-gray-400">
                  {name}
                </span>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Programme Section */}
      <section id="programme" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-indigo-500/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                <span className="text-sm font-medium text-indigo-600">6 modules complets</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Le programme
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            {modules.map((mod, index) => (
              <FadeIn key={mod.number} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 80}>
                <div className="flex gap-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-lg font-heading font-bold text-white">{mod.number}</span>
                    </div>
                  </div>
                  <div>
                    <div className="px-3 py-1 bg-indigo-500/10 rounded-full inline-block mb-2">
                      <span className="text-xs font-medium text-indigo-600">Module {mod.number}</span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-text-dark mb-2">{mod.title}</h3>
                    <p className="text-text-light leading-relaxed">{mod.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Bonuses Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-amber-500/10 rounded-full">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-amber-600">2 bonus offerts</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Les bonus inclus
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {bonuses.map((bonus, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="group h-full bg-white rounded-2xl p-6 shadow-soft hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                  <div className="w-16 h-16 mb-5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {bonus.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-3">{bonus.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{bonus.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Before/After Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Avant / Apr&egrave;s TCD Express
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn direction="right">
              <div className="h-full bg-red-50 rounded-2xl p-8 border border-red-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-red-700">Avant</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'T\u00E2tonnements sans r\u00E9elle compr\u00E9hension',
                    'Tout recommencer \u00E0 chaque mise \u00E0 jour de donn\u00E9es',
                    'Recherches interminables sur YouTube et Google',
                    'Anxi\u00E9t\u00E9 avant de pr\u00E9senter ses analyses en r\u00E9union',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                        </svg>
                      </div>
                      <span className="text-text-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="h-full bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-emerald-700">Apr&egrave;s</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Compr\u00E9hension totale des TCD, cr\u00E9ation en quelques secondes',
                    'Mises \u00E0 jour automatiques instantan\u00E9es, sans erreurs',
                    'M\u00E9thodologie claire et reproductible',
                    'Pr\u00E9sentations confiantes, devenir la r\u00E9f\u00E9rence Excel de l\'\u00E9quipe',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-text-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-indigo-50/30 relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                  Rejoins TCD Express
                </h2>
                <p className="text-text-light">Acc&egrave;s imm&eacute;diat &middot; Garantie 14 jours</p>
              </div>

              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 lg:p-10 text-white shadow-2xl">
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Acc&egrave;s &agrave; vie
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-heading font-extrabold">250&euro;</span>
                  </div>
                  <p className="text-white/80">Paiement unique &middot; Pas d&apos;abonnement</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    '6 modules vid\u00E9o complets',
                    'Bonus 1 : Checklist du TCD r\u00E9ussi',
                    'Bonus 2 : Notes pr\u00EAtes-\u00E0-l\'emploi',
                    'Acc\u00E8s \u00E0 vie + mises \u00E0 jour',
                    'Garantie 14 jours satisfait ou rembours\u00E9',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://exceleur.schoolmaker.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full px-8 py-4 bg-white text-indigo-700 font-heading font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Rejoindre la formation
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <p className="text-center text-sm text-text-light mt-6">
                14 jours pour changer d&apos;avis &mdash; Remboursement int&eacute;gral sans condition.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-12">
                T&eacute;moignage
              </h2>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                <div className="flex items-center gap-1 justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-text italic leading-relaxed mb-6">
                  &laquo; La formation est claire, p&eacute;dagogique, pratique... Je me sens beaucoup plus &agrave; l&apos;aise pour analyser mes donn&eacute;es et aller droit au but. &raquo;
                </p>
                <div>
                  <p className="font-heading font-bold text-text-dark">Lo&iuml;c Quelen</p>
                  <p className="text-sm text-text-light">Chef de Projet Aquacole</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-indigo-50/30 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-indigo-500/10 rounded-full">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-indigo-600">Questions fr&eacute;quentes</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                  F.A.Q
                </h2>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <Accordion items={faqItems} />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-6">
                Pr&ecirc;t &agrave; ma&icirc;triser les TCD ?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Rejoins TCD Express et deviens la r&eacute;f&eacute;rence Excel de ton &eacute;quipe en moins de 7 jours.
              </p>
              <a
                href="https://exceleur.schoolmaker.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-700 font-heading font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Rejoindre la formation &mdash; 250&euro;
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-indigo-500/5 via-white to-purple-500/5">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4">
                Tu as encore une question ?
              </h2>
              <p className="text-text-light mb-2">
                Envoie-moi un mail &agrave;{' '}
                <a href="mailto:thomas@exceleur.fr" className="text-indigo-600 hover:text-indigo-700 transition-colors font-semibold">
                  thomas@exceleur.fr
                </a>
              </p>
              <p className="text-text-light">Je me ferai un plaisir d&apos;y r&eacute;pondre.</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Newsletter variant="gradient" />
    </>
  );
}
