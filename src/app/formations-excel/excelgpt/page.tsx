import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Accordion } from '@/components/ui/Accordion';
import { FadeIn } from '@/components/ui/FadeIn';
import { Newsletter } from '@/components/sections/Newsletter';

export const metadata: Metadata = {
  title: 'ExcelGPT - Maîtrise Excel grâce à l\'IA | Exceleur',
  description:
    'Libère ton potentiel sur Excel grâce au pouvoir caché de l\'IA. 8 modules, 3 bonus, garantie 30 jours. Formation par Thomas l\'Exceleur.',
  alternates: {
    canonical: '/formations-excel/excelgpt',
  },
  openGraph: {
    title: 'ExcelGPT - Maîtrise Excel grâce à l\'IA',
    description:
      'Libère ton potentiel sur Excel grâce au pouvoir caché de l\'IA. 8 modules, 3 bonus, garantie 30 jours.',
    type: 'website',
    images: [{ url: '/images/og-image.png' }],
  },
};

const faqItems = [
  {
    question: 'Ai-je vraiment besoin d\'une formation pour utiliser l\'IA ?',
    answer:
      'Sans méthodologie, 90% des utilisateurs concluent que l\'IA "ne marche pas". Cette formation t\'enseigne des techniques reproductibles pour obtenir des réponses précises et fiables à chaque fois.',
  },
  {
    question: 'Combien de temps faut-il y consacrer ?',
    answer:
      'Les vidéos sont courtes et ciblées. 10 minutes par jour suffisent. Tu as un accès à vie, donc tu peux avancer à ton rythme.',
  },
  {
    question: 'Faut-il la version payante de ChatGPT ?',
    answer:
      'Non. La version gratuite couvre tout le contenu de la formation. La version payante est optionnelle pour les fonctionnalités avancées comme Copilot.',
  },
  {
    question: 'Ça marche sur Mac ?',
    answer:
      'Oui. Mac, Windows, toutes les versions d\'Excel sont compatibles.',
  },
  {
    question: 'Quel niveau faut-il avoir sur Excel ?',
    answer:
      'Tous les niveaux sont les bienvenus. Que tu sois débutant ou expert, tu trouveras des cas d\'usage applicables immédiatement.',
  },
  {
    question: 'Et si mon patron découvre que j\'utilise l\'IA ?',
    answer:
      'L\'IA est un outil comme un autre. Tu optimises ton travail, tu ne triches pas. De plus en plus d\'entreprises encouragent l\'utilisation de l\'IA.',
  },
  {
    question: 'J\'ai déjà essayé l\'IA sans succès, pourquoi cette formation serait différente ?',
    answer:
      'Cette formation t\'enseigne une méthodologie structurée pour exploiter toute la puissance de l\'IA. Ce n\'est pas juste "poser des questions à ChatGPT".',
  },
  {
    question: 'Qu\'est-ce que je reçois concrètement ?',
    answer:
      'Un accès immédiat à 8 modules vidéo + 3 bonus sur une plateforme en ligne. Tu reçois tes codes d\'accès par email dès l\'inscription.',
  },
  {
    question: 'Les formules générées par l\'IA contiennent parfois des erreurs ?',
    answer:
      'Le Module 3 couvre la détection des hallucinations. Avec la méthode R.E.C., tu atteins 98% de réussite dès le premier essai. Le Bonus 1 (Custom GPT) approche les 100%.',
  },
  {
    question: 'Est-ce légal/éthique d\'utiliser l\'IA au travail ?',
    answer:
      'Comme Excel ou Google, l\'IA est un outil de plus en plus encouragé en entreprise. Le Module 3 couvre aussi la protection des données.',
  },
  {
    question: 'Et si ChatGPT disparaît ?',
    answer:
      'La méthode fonctionne avec Claude, Gemini, DeepSeek et tout autre IA. Le Module 2 couvre les alternatives. L\'accès à vie inclut les mises à jour futures.',
  },
  {
    question: 'Le paiement via CPF est-il possible ?',
    answer:
      'Non, cette formation n\'est pas éligible au CPF. C\'est un achat direct à 298\u20AC.',
  },
];

const modules = [
  {
    number: 1,
    title: 'Introduction',
    description: 'Découvre comment l\'IA va devenir ton super-pouvoir professionnel et pourquoi cette compétence va te distinguer.',
  },
  {
    number: 2,
    title: 'Les fondamentaux de l\'IA',
    description: 'ChatGPT, Claude, Gemini : comprends les différences, gratuit vs payant, Chain of Thoughts, et comment rester à jour.',
  },
  {
    number: 3,
    title: 'L\'art du prompt professionnel',
    description: 'Maîtrise la méthode R.E.C. (Rôle + Exemple + Contexte) pour des réponses précises. Détection des hallucinations et 10 cas d\'usage cachés.',
  },
  {
    number: 4,
    title: 'Excel & ChatGPT : les formules',
    description: 'Le "Template 5 Couches" pour des formules parfaites du premier coup. Méthode de diagnostic pour corriger les erreurs et technique de brainstorming.',
  },
  {
    number: 5,
    title: 'Automatiser sans coder',
    description: 'La méthode "Code Zéro" pour automatiser tes tâches. Le "Prompt Chirurgical" pour le VBA. Techniques de débogage et formules personnalisées.',
  },
  {
    number: 6,
    title: 'Les super-pouvoirs de Copilot',
    description: 'Menu contextuel magique, analyse Python intégrée, et opérations impossibles dans Excel classique.',
  },
  {
    number: 7,
    title: '15 techniques pro (que 95% ignorent)',
    description: 'Mode Agent pour déléguer le travail, Projects + RAG pour la mémoire, extraction de données depuis des photos.',
  },
  {
    number: 8,
    title: 'Code Interpreter',
    description: 'Analyse 50 000 lignes en 2 minutes, fusionne des fichiers, transforme tes données en rapports professionnels.',
  },
];

const bonuses = [
  {
    title: 'Custom GPT personnalisé',
    description: 'Un assistant IA sur-mesure + un GPT spécialisé pour résoudre tes formules Excel complexes.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Smart Extract',
    description: 'L\'outil pour gérer les fichiers massifs : +100 000 lignes, +30 onglets. Analyse ce que ChatGPT ne peut pas traiter seul.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: 'Exceller dans sa vie pro',
    description: '47 prompts testés pour booster ta productivité : arguments en réunion, synthèse de documents, préparation d\'entretiens, optimisation de CV.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: 'Marie-Claire M.',
    role: 'DAF',
    text: 'J\'ai résolu en 10 minutes un problème sur lequel je bloquais depuis des mois. Bien différent d\'une formation classique sur les formules.',
  },
  {
    name: 'Matthieu D.',
    role: 'Auditeur',
    text: 'Des formules complexes résolues en quelques secondes. Le bonus Custom GPT a été d\'une aide inestimable.',
  },
  {
    name: 'Laurent B.',
    role: 'Contrôleur de gestion',
    text: 'La bonne formulation des prompts m\'a fait gagner des heures que je passais sur Google à chercher des solutions.',
  },
  {
    name: 'Sophie F.',
    role: 'Responsable commerciale',
    text: 'J\'ai automatisé ma compilation de stats hebdomadaires : de 2 heures de travail manuel à zéro effort. Mon équipe est plus efficace.',
  },
  {
    name: 'Élodie P.',
    role: 'Contrôleuse de gestion junior',
    text: 'J\'ai enfin compris des fichiers complexes hérités et pu documenter chaque étape en toute confiance.',
  },
  {
    name: 'Yasmina L.',
    role: 'Acheteuse',
    text: 'Mes collègues sont bluffés par les automatisations que j\'ai mises en place grâce à l\'IA. Du jamais vu dans mon service.',
  },
  {
    name: 'Camille D.',
    role: 'Responsable comptable',
    text: 'J\'ai remplacé 4 tâches manuelles mensuelles par une seule macro. Je clôture mes comptes un jour plus tôt maintenant.',
  },
  {
    name: 'Hugo M.',
    role: 'Responsable commercial',
    text: 'La corvée du lundi matin transformée en génération automatique de tableaux de bord. Un vrai game-changer.',
  },
];

export default function ExcelGPTPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
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
                <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                <span className="text-sm font-medium text-white">Formation IA + Excel</span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                Lib&egrave;re ton potentiel sur Excel gr&acirc;ce au{' '}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  pouvoir cach&eacute; de l&apos;IA
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Et si ChatGPT t&apos;apportait un avantage injuste sur tes coll&egrave;gues ?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#pricing"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-700 font-heading font-bold rounded-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Rejoindre la formation
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

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310B981' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-emerald-500/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                <span className="text-sm font-medium text-emerald-600">5 b&eacute;n&eacute;fices cl&eacute;s</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Ce que l&apos;IA va changer pour toi
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Formules exactes pr\u00EAtes \u00E0 coller',
                description: 'Obtiens la bonne formule du premier coup, sans chercher pendant des heures.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Corrige tes erreurs en 20 secondes',
                description: 'Plus besoin de d\u00E9bugger pendant des heures. L\'IA identifie et corrige instantan\u00E9ment.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
                title: 'Macros compl\u00E8tes sans VBA',
                description: 'G\u00E9n\u00E8re des macros fonctionnelles sans \u00E9crire une seule ligne de code.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: 'Tutos personnalis\u00E9s',
                description: 'Re\u00E7ois des tutoriels adapt\u00E9s \u00E0 ton niveau et \u00E0 tes besoins sp\u00E9cifiques.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Analyse de donn\u00E9es instantan\u00E9e',
                description: 'Fais analyser des jeux de donn\u00E9es volumineux en quelques secondes.',
              },
            ].map((benefit, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className="group h-full bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
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

      {/* Problem Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-8">
                99% des gens{' '}
                <span className="text-red-400">n&apos;utilisent pas ChatGPT</span>{' '}
                comme il faut
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {[
                  'Formules bancales qu\'il faut corriger',
                  'Macros qui n\u00E9cessitent des heures de d\u00E9bogage',
                  'R\u00E9ponses vagues et inutilisables',
                  'Temps perdu \u00E0 chercher ailleurs',
                ].map((problem, index) => (
                  <FadeIn key={index} direction="up" delay={index * 100}>
                    <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-white/80">{problem}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <FadeIn direction="up" delay={400}>
                <p className="text-xl text-emerald-300 font-semibold mt-12">
                  Avec la bonne m&eacute;thodologie, l&apos;IA devient ton meilleur alli&eacute; sur Excel.
                </p>
              </FadeIn>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* About Thomas */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-emerald-50/30 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn direction="up">
              <p className="text-emerald-600 font-semibold mb-2 text-center">Qui suis-je ?</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8 text-center">
                Thomas, l&apos;Exceleur
              </h2>
              <div className="space-y-4 text-lg text-text-light">
                <p>
                  Formateur Excel depuis des ann&eacute;es, j&apos;interviens aupr&egrave;s d&apos;entreprises pour r&eacute;soudre des probl&eacute;matiques complexes sur Excel.
                </p>
                <p>
                  Auteur du livre <strong className="text-text-dark">&laquo; R&eacute;v&egrave;le l&apos;Exceleur qui est en toi ! &raquo;</strong> &eacute;dit&eacute; par Larousse. Plus de <strong className="text-text-dark">1 million de personnes</strong> suivent mes conseils sur TikTok et Instagram.
                </p>
                <p>
                  Apr&egrave;s avoir &eacute;t&eacute; initialement d&eacute;&ccedil;u par les limites de ChatGPT sur Excel, j&apos;ai d&eacute;couvert la bonne m&eacute;thodologie pour exploiter l&apos;IA efficacement. J&apos;ai compil&eacute; tout cela dans cette formation.
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
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-emerald-500/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                <span className="text-sm font-medium text-emerald-600">8 modules complets</span>
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
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <span className="text-lg font-heading font-bold text-white">{mod.number}</span>
                    </div>
                  </div>
                  <div>
                    <div className="px-3 py-1 bg-emerald-500/10 rounded-full inline-block mb-2">
                      <span className="text-xs font-medium text-emerald-600">Module {mod.number}</span>
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-amber-500/10 rounded-full">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-amber-600">3 bonus offerts</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Les bonus inclus
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                  Rejoins ExcelGPT
                </h2>
                <p className="text-text-light">Acc&egrave;s imm&eacute;diat &middot; Garantie 30 jours</p>
              </div>

              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 lg:p-10 text-white shadow-2xl">
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  Acc&egrave;s &agrave; vie
                </div>

                <div className="mb-8">
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-heading font-extrabold">298&euro;</span>
                  </div>
                  <p className="text-white/80">Paiement unique &middot; Pas d&apos;abonnement</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    '8 modules vid\u00E9o complets',
                    'Bonus 1 : Custom GPT personnalis\u00E9',
                    'Bonus 2 : Smart Extract',
                    'Bonus 3 : 47 prompts pro',
                    'Acc\u00E8s \u00E0 vie + mises \u00E0 jour',
                    'Garantie 30 jours satisfait ou rembours\u00E9',
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
                  className="group flex items-center justify-center gap-2 w-full px-8 py-4 bg-white text-emerald-700 font-heading font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Rejoindre la formation
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <p className="text-center text-sm text-text-light mt-6">
                Garantie 30 jours &mdash; Si tu n&apos;es pas satisfait, on te rembourse sans question.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-emerald-50/30 relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                Ce qu&apos;ils en disent
              </h2>
              <p className="text-text-light text-lg">Retours d&apos;&eacute;l&egrave;ves de la formation</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} direction="up" delay={index * 80}>
                <div className="h-full bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-text-light italic leading-relaxed mb-4">
                    &laquo; {testimonial.text} &raquo;
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-heading font-bold text-text-dark">{testimonial.name}</p>
                    <p className="text-sm text-text-light">{testimonial.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-emerald-500/10 rounded-full">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-emerald-600">Questions fr&eacute;quentes</span>
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-6">
                Pr&ecirc;t &agrave; lib&eacute;rer ton potentiel ?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Rejoins ExcelGPT et transforme ta mani&egrave;re de travailler sur Excel gr&acirc;ce &agrave; l&apos;IA.
              </p>
              <a
                href="https://exceleur.schoolmaker.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-700 font-heading font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Rejoindre la formation &mdash; 298&euro;
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-emerald-500/5 via-white to-teal-500/5">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4">
                Tu as encore une question ?
              </h2>
              <p className="text-text-light mb-2">
                Envoie-moi un mail &agrave;{' '}
                <a href="mailto:thomas@exceleur.fr" className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold">
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
