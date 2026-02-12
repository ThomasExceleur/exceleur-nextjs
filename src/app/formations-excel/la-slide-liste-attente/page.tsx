import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Accordion } from '@/components/ui/Accordion';
import { FadeIn } from '@/components/ui/FadeIn';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PricingCard } from '@/components/ui/PricingCard';
import { Newsletter } from '@/components/sections/Newsletter';

const faqItems = [
  {
    question: "Qu'est-ce que je vais recevoir et comment se déroule la formation ?",
    answer:
      "Tu vas recevoir un accès à la plateforme de formation avec les 10 modules vidéo, les fiches PDF et les questionnaires. Tu peux suivre la formation à ton rythme, depuis ton PC ou smartphone.",
  },
  {
    question: "Je me débrouille déjà bien sur PowerPoint, est-ce que la formation va vraiment m'aider ?",
    answer:
      "Oui ! La formation ne se contente pas d'apprendre les bases de PowerPoint. Elle t'apprend à structurer tes présentations, à utiliser le storytelling et à devenir un excellent orateur.",
  },
  {
    question: 'Combien de temps dure la formation ?',
    answer:
      "5h de contenu vidéo soigneusement découpé pour t'apprendre à structurer tes présentations, utiliser plus efficacement PowerPoint, et devenir (très) bon à l'oral.",
  },
  {
    question: 'Combien de temps ai-je pour terminer la formation ?',
    answer:
      "Tu as un accès illimité à la formation. Tu peux la suivre à ton rythme et revenir sur les vidéos autant de fois que tu le souhaites.",
  },
  {
    question: "Et si je n'ai pas beaucoup de temps pour suivre la formation ?",
    answer:
      "Pas de souci ! Les vidéos sont courtes et tu peux les regarder à ton rythme. En y passant 30 minutes par jour, tu peux terminer la formation en moins de 2 semaines.",
  },
  {
    question: 'Quels sont les prérequis pour suivre cette formation ?',
    answer:
      "Tu dois avoir un ordinateur avec PowerPoint installé. C'est tout ! La formation est accessible à tous, que tu sois débutant ou utilisateur avancé.",
  },
  {
    question: "Et si je ne suis pas satisfait de mon achat ?",
    answer:
      "Tu disposes de 30 jours pour exercer ta garantie. Si tu n'es pas satisfait, je te rembourse à 100% sans justification.",
  },
];

const modules = [
  {
    number: 1,
    title: 'Les fondamentaux',
    items: [
      "Un rapide tour du fonctionnement de PowerPoint et de ses différents thèmes",
      "La fonctionnalité cachée qui te permet de créer tes propres thèmes personnalisés",
      "Quels types de diapositives créer et comment les réutiliser à l'infini",
      "Intégrer l'identité de ta marque en un instant grâce aux palettes de couleurs personnalisées",
    ],
  },
  {
    number: 2,
    title: 'Donner vie à tes présentations avec les objets graphiques',
    items: [
      "Les secrets d'un organigramme de qualité (et actualisable en 2 clics)",
      'La nouvelle fonctionnalité de Microsoft 365 qui te fera gagner des heures de travail',
      'Mon secret pour animer des objets 3D sur PowerPoint',
    ],
  },
  {
    number: 3,
    title: 'Maîtriser les subtilités de la mise en forme',
    items: [
      "La méthode révolutionnaire pour aligner et positionner tous les objets d'une diapositive",
      'Les 3 raccourcis à absolument connaître pour modifier tes présentations',
      'Créer des diapositives de couvertures modernes et dynamiques',
      "L'option cachée pour créer des objets qui ont déjà la mise en forme que tu souhaites",
      "La méthode pour importer et mettre en valeur tes graphiques Excel",
    ],
  },
  {
    number: 4,
    title: 'Ajouter des vidéos fiables dans PowerPoint',
    items: [
      "Les 2 manières d'importer une vidéo sur PowerPoint et laquelle privilégier",
      'Comment sélectionner et mettre en forme les vidéos pour dynamiser la présentation',
      "La fonctionnalité pour faire des captures d'écrans et des enregistrements en quelques clics",
    ],
  },
  {
    number: 5,
    title: 'Réaliser des transitions fluides et des animations professionnelles',
    items: [
      '2 manières simples de réaliser des animations qui impressionnent',
      'À quel moment utiliser les transitions mais aussi à quel moment ne surtout pas en utiliser',
      "La nouvelle option de PowerPoint qui te permet de créer des transitions ultra quali",
      "Un exemple détaillé de cette option pour améliorer l'impact de ta présentation",
    ],
  },
  {
    number: 6,
    title: 'Naviguer efficacement à travers ton fichier',
    items: [
      "Les outils d'organisation à connaître pour travailler avec fluidité",
      "L'astuce pour naviguer à travers ta présentation de manière interactive",
      "La fonction Zoom qui te permet de passer d'un chapitre à l'autre",
    ],
  },
  {
    number: 7,
    title: 'Éviter les erreurs techniques',
    items: [
      "Les secrets d'exports pour ne jamais craindre le crash",
      "L'option cachée qui inspecte l'intégralité de ta présentation",
      "La méthode simple pour enregistrer une vidéo de présentation sans logiciel externe",
    ],
  },
  {
    number: 8,
    title: "Les 10 règles d'or d'une présentation bien conçue",
    items: [
      'Les bonnes questions à se poser pour avoir une présentation claire et pertinente',
      'Les tailles de police recommandées pour garder tes diapositives parfaitement lisibles',
      'Pourquoi les titres dans tes diapositives sont extrêmement importants',
      'Le chiffre magique (validé par la science) à toujours avoir en tête',
      "L'option PowerPoint à exploiter PENDANT ta présentation",
      "L'erreur (extrêmement courante) à éviter si tu ne veux pas gâcher ton message",
      "L'astuce empruntée des auteurs de livres à succès",
    ],
  },
  {
    number: 9,
    title: "L'art du storytelling pour captiver ton audience",
    items: [
      "L'étape essentielle à suivre pour raconter une histoire cohérente",
      "Les 3 structures extrêmement efficaces pour construire le plan de tes présentations",
      'Les principes de Storytelling que l\'on retrouve dans tous les bons films',
    ],
  },
  {
    number: 10,
    title: "(Très) bon à l'oral",
    items: [
      'La technique utilisée par les plus grands conférenciers',
      'Comment finir ta présentation en beauté et la rendre mémorable',
      "La méthode des mini-histoires pour renouveler l'attention de ton audience",
      'Les 3 règles à retenir pour gérer ton temps comme un pro',
      'La (seule) posture à adopter pour savoir quoi faire de tes mains',
      "Je décrypte 5 présentations sur scènes sous tes yeux",
    ],
  },
];

const pricingFeatures = [
  { text: 'Module 1 - Les fondamentaux', included: true },
  { text: 'Module 2 - Objets graphiques', included: true },
  { text: 'Module 3 - Mise en forme', included: true },
  { text: 'Module 4 - Vidéos', included: true },
  { text: 'Module 5 - Transitions & animations', included: true },
  { text: 'Module 6 - Navigation', included: true },
  { text: 'Module 7 - Erreurs techniques', included: true },
  { text: "Module 8 - Les 10 règles d'or", included: true },
  { text: 'Module 9 - Storytelling', included: true },
  { text: "Module 10 - L'oral", included: true },
  { text: 'Attestation de fin de formation', included: true },
  { text: 'Questionnaires de validation', included: true },
  { text: 'Fiches récap PDF', included: true },
  { text: 'Accès communauté privée', included: true },
];

export default function LaSlidePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Gradient Background - Orange/Coral theme for PowerPoint */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-300/10 rounded-full blur-3xl" />

        {/* Presentation pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='5' y='5' width='50' height='40' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Crect x='5' y='50' width='50' height='5' fill='%23ffffff' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <FadeIn direction="up">
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-medium text-white">Formation PowerPoint par Louis & Thomas</span>
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                  LA SLIDE
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-semibold mb-4">
                  Construis une carrière à succès avec des présentations PowerPoint qui cartonnent
                </p>

                <h2 className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                  La nouvelle méthode pour créer des présentations captivantes et mémorables sans y passer des heures
                </h2>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span className="text-sm font-medium text-white">500+ élèves</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full">
                    <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-white">9.2/10 satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-sm font-medium text-white">Formation complète</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="#liste-attente"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Rejoindre la liste d&apos;attente
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
                  {/* Presentation mockup */}
                  <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <p className="font-heading font-bold text-gray-700">Présentations pro</p>
                        <p className="text-sm text-gray-500">en quelques clics</p>
                      </div>
                    </div>
                  </div>

                  {/* Feature pills */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">10</div>
                      <div className="text-xs text-white/80">modules vidéo</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">5h</div>
                      <div className="text-xs text-white/80">de formation</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">∞</div>
                      <div className="text-xs text-white/80">accès illimité</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-white">PDF</div>
                      <div className="text-xs text-white/80">fiches récap</div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-6">
                  + Attestation
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
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                <span className="text-sm font-medium text-orange-600">Ce que tu vas apprendre</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Tu vas découvrir comment :
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                title: 'Structurer tes présentations',
                description: 'en mini-histoires passionnantes qui captivent ton audience',
                gradient: 'from-orange-500 to-rose-500',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                ),
                title: 'Animer et mettre en forme',
                description: 'des diapositives en un temps record avec un rendu professionnel',
                gradient: 'from-rose-500 to-pink-500',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ),
                title: "Présenter à l'oral",
                description: 'avec sérénité et embarquer ton public avec toi',
                gradient: 'from-pink-500 to-purple-500',
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

      {/* Problem Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-6">
                  Réussir une présentation PowerPoint est une véritable épreuve.
                </h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <FadeIn direction="right">
                <div className="space-y-6">
                  <p className="text-text-light text-lg">
                    D&apos;abord, il faut trouver comment présenter ton sujet.
                  </p>
                  <p className="text-text-light text-lg">
                    Ensuite, tu dois créer les diapositives, trouver des illustrations, réfléchir au design.
                  </p>
                  <p className="text-text-light text-lg">
                    Et pour finir, tu passes un temps fou sur la mise en forme à essayer de <strong className="text-text-dark">tout harmoniser</strong>.
                  </p>
                  <p className="text-text-light text-lg">
                    Ça peut facilement te prendre <strong className="text-text-dark">plusieurs heures</strong> pour un résultat qui n&apos;est pas toujours à la hauteur.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={200}>
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="font-heading text-xl font-bold text-text-dark mb-6 text-center">
                    Une bonne ou mauvaise présentation a le pouvoir de tout faire basculer.
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-text">
                        Une <strong className="text-green-600">bonne présentation</strong> peut propulser ta carrière en un clin d&apos;œil
                      </p>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-text">
                        Une <strong className="text-red-600">mauvaise présentation</strong> peut ruiner ta crédibilité
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Method Steps Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                <span className="text-sm font-medium text-orange-600">La méthode</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                Voici comment on va s&apos;y prendre
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line connector */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-rose-500 to-pink-500 hidden md:block" />

              <div className="space-y-12">
                {[
                  {
                    number: '1',
                    title: 'Maîtrise la création',
                    content: "Tu vas découvrir les meilleures astuces de création et de mise en forme de diapositives sur PowerPoint pour réaliser des présentations au rendu professionnel en un temps record.",
                    gradient: 'from-orange-500 to-rose-500',
                  },
                  {
                    number: '2',
                    title: 'Structure tes histoires',
                    content: "Tu vas découvrir comment structurer tes diapositives en mini-histoires passionnantes pour garder l'attention de ton public et rendre ton message impactant.",
                    gradient: 'from-rose-500 to-pink-500',
                  },
                  {
                    number: '3',
                    title: "Excelle à l'oral",
                    content: "Tu vas découvrir les techniques utilisées par les plus grands conférenciers pour captiver une audience et rendre un discours mémorable.",
                    gradient: 'from-pink-500 to-purple-500',
                  },
                ].map((step, index) => (
                  <FadeIn key={index} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 150}>
                    <div className="flex items-start gap-6 md:gap-8">
                      {/* Number badge */}
                      <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-heading text-2xl font-bold shadow-lg flex-shrink-0`}>
                        {step.number}
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-soft border border-gray-100">
                        <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
                          {step.title}
                        </h3>
                        <p className="text-text-light">
                          {step.content}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Presentation Section - Dark gradient */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-white/60 text-sm mb-4">Je te présente</p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                LA <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">SLIDE</span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Le programme conçu pour faire de toi LE spécialiste des présentations PowerPoint qui cartonnent, te forger une sérieuse réputation dans ton entreprise, et faire décoller ta carrière.
              </p>

              {/* Feature badges */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-white">10 modules vidéo</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Fiches PDF</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Attestation</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Programme Section */}
      <section id="programme" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                <span className="text-sm font-medium text-orange-600">10 modules complets</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Le programme
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Un parcours complet pour maîtriser PowerPoint et exceller à l&apos;oral
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {modules.map((module, index) => (
              <FadeIn key={module.number} direction="up" delay={index * 50}>
                <div className="group h-full bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    {/* Module number */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-heading font-bold text-lg flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {module.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-bold text-text-dark mb-3 group-hover:text-orange-600 transition-colors">
                        {module.title}
                      </h3>
                      <ul className="space-y-2">
                        {module.items.slice(0, 3).map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm text-text-light">
                            <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                        {module.items.length > 3 && (
                          <li className="text-sm text-orange-600 font-medium">
                            + {module.items.length - 3} autres points
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* PDF Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-100 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                    <span className="text-sm font-medium text-orange-600">Bonus inclus</span>
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                    L&apos;antisèche
                  </h2>
                  <p className="text-orange-600 font-semibold mb-6">Fiches résumés en PDF</p>
                  <p className="text-text-light mb-4">
                    Tu as terminé la formation et tu voudrais emporter avec toi tout ce que tu viens d&apos;apprendre ?
                  </p>
                  <p className="text-text-light mb-4">
                    Aucun souci, je t&apos;ai préparé des fiches résumés PDF pour que tu retrouves en un coup d&apos;œil l&apos;info dont tu as besoin.
                  </p>
                  <p className="text-text-light">
                    Pour compléter ton apprentissage, je t&apos;ai préparé des <strong className="text-text-dark">questionnaires rapides</strong> après chaque module pour que tu identifies les étapes où tu as encore des lacunes.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={200}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-3xl p-8 shadow-xl">
                    <div className="space-y-4">
                      {['Fiche Module 1', 'Fiche Module 2', 'Fiche Module 3'].map((fiche, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 transform hover:-translate-x-2 transition-transform duration-300">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-text-dark">{fiche}</p>
                            <p className="text-sm text-text-light">PDF téléchargeable</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating decoration */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg transform rotate-12">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-orange-500 to-rose-500 text-white">
        <Container>
          <FadeIn direction="up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <AnimatedCounter end={500} suffix="+" className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-white/80 mt-2">élèves formés</p>
              </div>
              <div>
                <AnimatedCounter end={9.2} decimals={1} suffix="/10" className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-white/80 mt-2">satisfaction</p>
              </div>
              <div>
                <AnimatedCounter end={10} className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-white/80 mt-2">modules vidéo</p>
              </div>
              <div>
                <AnimatedCounter end={5} suffix="h" className="text-4xl md:text-5xl font-heading font-extrabold" />
                <p className="text-white/80 mt-2">de formation</p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Waitlist Section */}
      <section id="liste-attente" className="py-20 lg:py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-rose-500 to-pink-600" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl" />

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
              <p className="text-white/90 mb-4">
                Louis accompagne actuellement les étudiants de la 2ème promo afin qu&apos;ils fassent un bond dans leur carrière à l&apos;aide de PowerPoint.
              </p>
              <p className="text-white/90 mb-8">
                Tu souhaites <strong>être prévenu à l&apos;avance de la réouverture des inscriptions</strong> afin de rejoindre la prochaine promo ?
              </p>

              <p className="text-xl font-bold text-yellow-300 mb-6">Inscris-toi sur la liste d&apos;attente</p>

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
                    className="px-8 py-4 bg-yellow-400 text-orange-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    C&apos;est parti !
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
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                <span className="text-sm font-medium text-orange-600">Tarifs</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Découvre l&apos;offre
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* La Slide Card */}
              <FadeIn direction="up" delay={100}>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-orange-500">
                  {/* Highlighted badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    Recommandé
                  </div>

                  <h3 className="font-heading text-2xl font-extrabold text-center mb-2 mt-4">La Slide</h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-heading font-extrabold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">1200€</span>
                    <p className="text-sm text-text-light mt-1">Paiement en plusieurs fois disponible</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-text-dark mb-2">Durée :</h4>
                    <p className="text-text-light text-sm">
                      5h de contenu vidéo soigneusement découpé pour t&apos;apprendre à structurer tes présentations, utiliser plus efficacement PowerPoint, et devenir (très) bon à l&apos;oral
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-bold text-text-dark mb-4">Au programme :</h4>
                    <ul className="space-y-2">
                      {pricingFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-text-light">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#liste-attente"
                    className="block w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-center font-bold rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Rejoindre la liste d&apos;attente
                  </a>
                </div>
              </FadeIn>

              {/* Comparison Card */}
              <FadeIn direction="up" delay={200}>
                <div className="bg-gray-100 rounded-3xl p-8">
                  <h3 className="font-heading text-2xl font-extrabold text-center text-gray-500 mb-2">Les autres formations</h3>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-heading font-extrabold text-gray-400">+ de 3000€</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-500 mb-2">Durée :</h4>
                    <p className="text-gray-500">Plus de 30h à investir</p>
                  </div>

                  <div className="space-y-6 text-gray-500">
                    <div>
                      <p className="font-semibold">Suivre une formation PowerPoint</p>
                      <p className="text-sm">Dans un format pas toujours agréable, aux sujets trop basiques ou trop pointus, pas du tout orientés business. (Coût moyen : 1200€)</p>
                    </div>
                    <div>
                      <p className="font-semibold">Suivre une formation de prise de parole</p>
                      <p className="text-sm">Qui n&apos;abordera qu&apos;une partie du sujet. (Coût moyen : 2000€)</p>
                    </div>
                    <div>
                      <p className="font-semibold">Prendre le temps d&apos;assimiler</p>
                      <p className="text-sm">Et de connecter les enseignements de chacune des formations. (Plus de 30 heures de pratique)</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Pour qui Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                Cette formation est pour toi si :
              </h2>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pour toi */}
            <FadeIn direction="right">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-6">Cette formation est pour toi si :</h3>
                <ul className="space-y-4">
                  {[
                    "Tu souhaites travailler plus efficacement et perdre moins de temps sur la création de présentations PowerPoint",
                    "Tu veux créer l'effet waouh lors de tes présentations et avoir plus d'impact",
                    "Tu veux développer une compétence forte qui te suivra durant toute carrière",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-text-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Pas pour toi */}
            <FadeIn direction="left" delay={100}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-6">En revanche, elle n&apos;est pas pour toi si :</h3>
                <ul className="space-y-4">
                  {[
                    "Tu attends la solution miracle qui te fera progresser sans investissement",
                    "Tu n'es pas prêt à changer tes méthodes de travail",
                    "Tu considères PowerPoint comme un outil secondaire dans ton activité",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-text-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Garantie Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Ma garantie risque inversé Excellence
              </h2>
              <p className="text-xl font-bold text-orange-600 mb-6">30 jours pour te décider</p>

              <p className="text-text-light mb-4">
                Tu peux regarder toutes les vidéos, télécharger tous les fichiers, si tu n&apos;es pas satisfait de la formation dans les <strong className="text-text-dark">30 jours</strong> qui suivent ta commande alors <strong className="text-text-dark">je te rembourse à 100%</strong>. Aucune justification ne te sera demandée.
              </p>

              <p className="text-text-light mb-8">
                Il te suffit simplement d&apos;envoyer un email à cette adresse :{' '}
                <a href="mailto:thomas@exceleur.fr" className="text-orange-600 hover:underline font-medium">
                  thomas@exceleur.fr
                </a>
              </p>

              <div className="bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-3xl p-8">
                <h3 className="font-heading text-xl font-bold text-text-dark mb-4">Pourquoi je te propose ça ?</h3>
                <p className="text-text-light">
                  Tout simplement car je sais que c&apos;est un <strong className="text-text-dark">vrai investissement</strong> et que tu veux être sûr de faire le bon choix. J&apos;ai <strong className="text-text-dark">confiance en mon produit</strong> et je sais que tu en seras tellement satisfait que tu ne voudras pas te faire rembourser. Pour cette raison, je prends le risque à ta place en te permettant de <strong className="text-text-dark">changer d&apos;avis pendant 30 jours</strong> après ton achat.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Option A/B Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                Comment imagines-tu tes prochaines présentations ?
              </h2>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Option A */}
            <FadeIn direction="right">
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 h-full">
                <div className="inline-block bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Option A
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-6">
                  Tu reviendras à tes anciennes habitudes.
                </h3>
                <div className="space-y-4 text-text-light">
                  <p>Tu continueras de copier les présentations de tes collègues.</p>
                  <p>Mais aussi de déplacer tes objets un par un pour les aligner alors que tu sais qu&apos;il existe de meilleures méthodes.</p>
                  <p>Et ainsi perdre des heures de travail à mettre en forme tes présentations.</p>
                  <p>En ne sachant plus quoi faire de mieux pour être plus convaincant.</p>
                </div>
              </div>
            </FadeIn>

            {/* Option B */}
            <FadeIn direction="left" delay={100}>
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-500 h-full">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Option B
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-6">
                  Ou alors, tu peux repartir sur de nouvelles bases.
                </h3>
                <div className="space-y-4 text-text-light mb-6">
                  <p>Développer une <strong className="text-text-dark">nouvelle manière de présenter</strong>.</p>
                  <p>Passer plus de temps sur des tâches créatives et moins de temps sur de la mise en forme ennuyeuse.</p>
                  <p>Prendre plaisir à préparer tes interventions, à choisir tes phrases d&apos;accroches, le tout avec sérénité car tu sais que tes <strong className="text-text-dark">méthodes fonctionnent</strong>.</p>
                </div>
                <p className="font-bold text-text-dark mb-4">Tu auras le super-pouvoir de :</p>
                <ul className="space-y-2">
                  {['Partager tes idées', "Créer de l'adhésion autour de tes projets", "Augmenter ta visibilité dans l'entreprise", 'Motiver tes équipes'].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-orange-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-rose-500" />
                <span className="text-sm font-medium text-orange-600">FAQ</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                Questions fréquentes
              </h2>
              <p className="text-text-light">Je réponds à tes questions</p>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-orange-50/30">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-dark mb-4">
                Tu as encore une question, un doute ?
              </h2>
              <p className="text-text-light mb-2">
                Envoie-moi un mail à{' '}
                <a href="mailto:thomas@exceleur.fr" className="text-orange-600 hover:underline font-medium">
                  thomas@exceleur.fr
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
