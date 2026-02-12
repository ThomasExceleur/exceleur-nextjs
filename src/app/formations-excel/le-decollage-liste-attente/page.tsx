import { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Accordion } from '@/components/ui/Accordion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { VideoTestimonial } from '@/components/ui/VideoTestimonial';
import { PricingCard } from '@/components/ui/PricingCard';
import { FadeIn } from '@/components/ui/FadeIn';
import { Newsletter } from '@/components/sections/Newsletter';

export const metadata: Metadata = {
  title: 'Le Décollage - Formation Excel complète | Exceleur',
  description:
    "6 semaines pour devenir un monstre d'efficacité sur Excel et faire un bond dans ta carrière même si tu n'as que 15 minutes par jour à y consacrer.",
  alternates: {
    canonical: '/formations-excel/le-decollage-liste-attente',
  },
};

const faqItems = [
  {
    question: "Qu'est-ce que je vais recevoir et comment se déroule la formation ?",
    answer:
      "Tu vas recevoir un accès à la plateforme de formation avec les 6 modules vidéo, les fiches PDF, les quizz et les cas pratiques. Tu peux suivre la formation à ton rythme, depuis ton PC ou smartphone.",
  },
  {
    question: 'Pour qui est faite cette formation ?',
    answer:
      "C'est un must-have pour les comptables, chefs de projets, auditeurs, ingénieurs, étudiants voulant progresser rapidement sur Excel et dans leur vie professionnelle. Mais aussi pour tous ceux qui utilisent Excel au quotidien.",
  },
  {
    question: "Est-ce que cette formation est faite pour moi si je n'ai pas beaucoup de temps à y consacrer ?",
    answer:
      "Oui ! En suivant seulement 30 minutes par jour, tu peux terminer la formation en moins d'un mois. Tu peux la suivre n'importe où, n'importe quand depuis ton PC ou ton smartphone.",
  },
  {
    question: 'Combien de temps ai-je pour terminer la formation ?',
    answer:
      "Tu as un accès illimité à la formation. Tu peux la suivre à ton rythme et revenir sur les vidéos autant de fois que tu le souhaites.",
  },
  {
    question: 'Quelle formation choisir entre Le Décollage et La Machine ?',
    answer:
      "Le Décollage est une formation complète pour maîtriser Excel. La Machine est dédiée à l'automatisation avec Power Query et Power Pivot. Si tu débutes, commence par Le Décollage.",
  },
  {
    question: 'Pourquoi ne pas me former gratuitement ?',
    answer:
      "Tu trouveras beaucoup de contenu gratuit sur mes réseaux sociaux. Mais Le Décollage offre un programme structuré et un accompagnement personnalisé que tu ne trouveras pas ailleurs.",
  },
  {
    question: 'On peut avoir une facture ?',
    answer:
      "Bien sûr ! Tu recevras une facture par email après ton inscription. Nous pouvons également établir un devis si besoin.",
  },
  {
    question: 'Et si je ne suis pas satisfait de mon achat ?',
    answer:
      "Tu disposes d'un délai de 14 jours pour exercer ton droit de rétractation conformément à la législation en vigueur.",
  },
];

const modules = [
  {
    number: 1,
    title: 'Introduction',
    items: ["Une courte vidéo pour t'expliquer comment utiliser au mieux Le Décollage"],
    image: '/images/formations/le-decollage/le-decollage-intro.png',
  },
  {
    number: 2,
    title: 'Les fondations',
    items: [
      'Les réglages indispensables pour toujours bien démarrer un fichier',
      'Les 4 manières de faire appel à une cellule (et comment choisir la bonne)',
      "L'erreur de paramétrage méconnue qui a fait perdre des milliers de cas positif à la COVID-19 au Royaume-Uni",
      'Mon secret pour récupérer des classeurs corrompus',
    ],
    image: '/images/formations/le-decollage/module2.png',
  },
  {
    number: 3,
    title: "La checklist de l'organisation de tes fichiers",
    items: [
      "La stratégie qu'il faut TOUJOURS adopter lorsque tu as plusieurs tables de données",
      'Les 17 habitudes à développer pour créer des tableaux professionnels',
      "L'astuce simple pour permettre à n'importe qui de comprendre ton fichier en moins de 2 minutes",
    ],
    image: '/images/formations/le-decollage/module3.png',
  },
  {
    number: 4,
    title: 'Les formules indispensables',
    items: [
      '11 formules puissantes pour être un crack de la recherche de données',
      '7 formules matricielles dynamiques géniales',
      'Deviens le maître des tests logiques avec ces 8 formules conditionnelles',
      '4 formules peu connues mais indispensables',
      'Plus de 70 formules au total',
    ],
    image: '/images/formations/le-decollage/module4.png',
  },
  {
    number: 5,
    title: 'Audit de ton classeur',
    items: [
      "L'outil génial pour identifier en un coup d'œil l'origine de tes erreurs",
      "L'option que tu dois activer pour gagner un temps fou",
      'La formule qui va sauver ton fichier pleins d\'erreurs',
      'La méthode du tamis pour récupérer toutes tes cellules contenant une erreur',
    ],
    image: '/images/formations/le-decollage/module5.png',
  },
  {
    number: 6,
    title: "L'automatisation (sans VBA)",
    items: [
      'Importe tes données à partir de fichiers PDF, CSV, txt, web',
      'Mets automatiquement à jour tes données',
      "Un exemple complet d'automatisation que je fais sous tes yeux",
    ],
    image: '/images/formations/le-decollage/module6.png',
  },
];

const testimonialVideos = [
  { vimeoId: '904003571', alt: 'Témoignage Thierry' },
  { vimeoId: '903995368', alt: 'Témoignage Bénédicte' },
  { vimeoId: '904000252', alt: 'Témoignage Gaëtan' },
  { vimeoId: '904002361', alt: 'Témoignage Marie' },
  { vimeoId: '904005061', alt: 'Témoignage Élodie' },
  { vimeoId: '904384660', alt: 'Témoignage Clément' },
];

const pricingFeatures = [
  'Les 6 Modules du Décollage',
  'Les 3 Modules Bonus offerts',
  'Les fiches récap PDF à télécharger',
  'Les questionnaires pour tester tes connaissances',
  'Les Cas Pratiques',
  '1 Accès à ma communauté privée',
  'Masterclass 1 : TCD Expert',
  'Masterclass 2 : Nouvelles formules',
  'Masterclass 3 : LAMBDA et LET',
  'Masterclass 4 : Entretien de recrutement',
];

export default function LeDecollagePage() {
  return (
    <>
      {/* Hero Section - Refined with floating elements */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />

        {/* Decorative floating orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-secondary/30 rounded-full blur-2xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <FadeIn direction="up">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium text-white">Formation phare</span>
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                  <span className="block text-white/80 text-2xl md:text-3xl mb-2 uppercase tracking-wider">
                    Le Décollage
                  </span>
                  <span className="inline-flex items-center gap-4">
                    <span className="text-accent">6 semaines</span>
                    <Image
                      src="/images/formations/le-decollage/illustration-fusee.png"
                      alt="Fusée"
                      width={50}
                      height={50}
                      className="inline animate-bounce"
                    />
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                    pour devenir un monstre d&apos;efficacité sur Excel
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                  Et faire un bond dans ta carrière même si tu n&apos;as que 15 minutes par jour
                  (ou 2h par semaine) à y consacrer
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#liste-attente"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-heading font-bold rounded-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    S&apos;inscrire à la liste d&apos;attente
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

            {/* Visual card */}
            <div className="lg:w-1/2">
              <FadeIn direction="left" delay={200}>
                <div className="relative">
                  {/* Main card */}
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    {/* Trust badges */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-white text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        1000+ élèves
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-white text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        9.4/10 satisfaction
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-4">
                      {[
                        '6 modules vidéo complets',
                        'Fiches récap PDF téléchargeables',
                        'Quiz et cas pratiques',
                        'Accès illimité à vie',
                        'Support communauté',
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-white">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price teaser */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                      <div className="flex items-end gap-2">
                        <span className="text-white/70 text-sm">À partir de</span>
                        <span className="text-3xl font-heading font-extrabold text-white">800€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section - Card-based with gradients */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CB6AED' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span className="text-sm font-medium text-primary">Ce que tu vas apprendre</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Tu vas découvrir des méthodes qui ont
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> fait leurs preuves</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '/images/formations/le-decollage/icone-graphique-3.png',
                title: 'Réaliser des fichiers ultra-professionnels',
                description: 'Prouver tes compétences et développer ta carrière naturellement',
                gradient: 'from-primary/10 to-secondary/10',
                iconBg: 'from-primary to-secondary',
              },
              {
                icon: '/images/formations/le-decollage/icone-graphique-4.png',
                title: 'Importer et mettre à jour automatiquement tes données',
                description: '(sans utiliser VBA) et ainsi te libérer du temps au quotidien sans effort supplémentaire',
                gradient: 'from-secondary/10 to-accent/10',
                iconBg: 'from-secondary to-accent',
              },
              {
                icon: '/images/formations/le-decollage/icone-graphique-5.png',
                title: "Réduire drastiquement l'apparition des erreurs",
                description: 'Et ne plus jamais gaspiller ton énergie à les corriger',
                gradient: 'from-accent/10 to-primary/10',
                iconBg: 'from-accent to-primary',
              },
            ].map((benefit, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className={`group relative h-full bg-gradient-to-br ${benefit.gradient} rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}>
                  {/* Icon */}
                  <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${benefit.iconBg} p-1 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center relative overflow-hidden">
                      <Image
                        src={benefit.icon}
                        alt=""
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text-dark mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.iconBg} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works Section - Timeline style */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-primary/5 relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Illustration */}
            <FadeIn direction="right" className="lg:w-2/5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl scale-90" />
                <Image
                  src="/images/formations/le-decollage/illustration-pc-ampoule.png"
                  alt="Illustration PC"
                  width={400}
                  height={400}
                  className="relative mx-auto drop-shadow-2xl"
                />
              </div>
            </FadeIn>

            {/* Steps */}
            <div className="lg:w-3/5">
              <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-soft">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <span className="text-sm font-medium text-primary">En 3 étapes simples</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-12">
                  Comment ça va se passer ?
                </h2>
              </FadeIn>

              <div className="space-y-8">
                {[
                  {
                    number: '1',
                    title: 'La découverte',
                    content: "Regarde toutes les vidéos une première fois pour avoir une vision d'ensemble. Tu peux les visionner à ton rythme. En suivant seulement 30 minutes par jour, tu peux terminer la formation en moins d'un mois.",
                    color: 'primary',
                  },
                  {
                    number: '2',
                    title: 'La pratique',
                    content: "Tu vas régulièrement pouvoir tester tes connaissances avec des quizz. Je t'ai préparé des fiches récaps PDF pour chaque module que tu vas pouvoir emporter à ton travail.",
                    color: 'secondary',
                  },
                  {
                    number: '3',
                    title: 'La maîtrise',
                    content: "À cette étape, tu seras déjà meilleur que 90% des utilisateurs d'Excel. Tu seras légitime pour prendre en charge les projets les plus ambitieux de ton équipe.",
                    color: 'accent',
                  },
                ].map((step, index) => (
                  <FadeIn key={step.number} direction="left" delay={index * 150}>
                    <div className="group flex gap-6 bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 border border-gray-100">
                      {/* Number */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${step.color} to-${step.color}/70 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl font-heading font-extrabold text-white">{step.number}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className={`font-heading text-xl font-bold mb-2 text-${step.color}`}>
                          {step.title}
                        </h3>
                        <p className="text-text-light leading-relaxed">
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

      {/* Presentation Section - Refined gradient */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-text-dark via-gray-900 to-text-dark" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/30 to-transparent rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <span className="text-white/60 text-lg block mb-2">Je te présente</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-white via-primary/80 to-secondary/80 bg-clip-text text-transparent">
                  Le Décollage
                </span>
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                La formation spécialement conçue pour faire de toi un dieu d&apos;Excel en
                t&apos;apprenant des compétences solides qui vont t&apos;accompagner tout au long de
                ta carrière.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content cards */}
            <div className="space-y-6">
              <FadeIn direction="right">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                  <h3 className="font-heading text-2xl font-bold text-accent mb-4">Pour qui ?</h3>
                  <p className="text-white/80 leading-relaxed">
                    C&apos;est un must-have pour les comptables, chefs de projets, auditeurs,
                    ingénieurs, étudiants voulant progresser rapidement sur Excel et dans leur vie
                    professionnelle...
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={100}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                  <h3 className="font-heading text-2xl font-bold text-accent mb-4">Comment ?</h3>
                  <p className="text-white/80 leading-relaxed">
                    Grâce à une <strong className="text-white">méthode unique</strong>, que j&apos;ai appelée la{' '}
                    <strong className="text-white">Méthode Exceleur</strong>. Où je reprends le même format qui a fait le
                    succès de mes vidéos Instagram & TikTok pour te proposer un programme complet et
                    agréable à suivre.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Image */}
            <FadeIn direction="left" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-3xl blur-2xl scale-95" />
                <Image
                  src="/images/formations/le-decollage/le-decollage-exceleur.png"
                  alt="Capture d'écran de la formation"
                  width={600}
                  height={400}
                  className="relative rounded-2xl shadow-2xl border border-white/20"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Programme Section - Card-based modules */}
      <section id="programme" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span className="text-sm font-medium text-primary">6 modules complets</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Le programme
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-8">
            {modules.map((module, index) => (
              <FadeIn key={module.number} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 100}>
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 lg:gap-12 items-center bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 border border-gray-100 hover:shadow-xl transition-all duration-500`}
                >
                  {/* Content */}
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                        <span className="text-lg font-heading font-bold text-white">{module.number}</span>
                      </div>
                      <div className="px-4 py-1.5 bg-primary/10 rounded-full">
                        <span className="text-sm font-medium text-primary">Module {module.number}</span>
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-text-dark mb-6">
                      {module.title}
                    </h3>

                    <ul className="space-y-4">
                      {module.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 group">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                            <svg className="w-4 h-4 text-primary group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-text-light leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image */}
                  <div className="lg:w-1/2">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl scale-90 group-hover:scale-100 transition-transform duration-500" />
                      <Image
                        src={module.image}
                        alt={`Module ${module.number}`}
                        width={500}
                        height={300}
                        className="relative rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <FadeIn direction="up">
            <p className="text-center text-sm text-text-light mb-10">
              Indicateurs issus d&apos;enquête interne, mis à jour une fois par an. Dernière mise à jour le 10/12/2024
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: 9.4, suffix: '/10', label: 'Note moyenne de satisfaction', color: 'primary' },
              { value: 9.6, suffix: '/10', label: 'Note de recommandation', color: 'secondary' },
              { value: 1000, suffix: '+', label: 'Élèves formés depuis 2022', color: 'accent' },
            ].map((stat, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className={`text-center p-8 rounded-3xl bg-gradient-to-br from-${stat.color}/5 to-${stat.color}/10 border border-${stat.color}/20 hover:shadow-lg transition-all duration-300`}>
                  <div className={`flex items-center justify-center gap-1 text-4xl lg:text-5xl font-heading font-extrabold text-${stat.color}`}>
                    <AnimatedCounter
                      end={stat.value}
                      decimals={stat.suffix === '/10' ? 1 : 0}
                      suffix={stat.suffix !== '/10' ? stat.suffix : ''}
                    />
                    {stat.suffix === '/10' && <span className="text-2xl text-text-light">/10</span>}
                  </div>
                  <p className="text-text-light mt-3">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-primary/5 relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                Plus de <span className="text-primary">1000 élèves</span> ont déjà rejoint Le Décollage
              </h2>
              <p className="text-lg text-text-light">Voici ce qu&apos;ils en disent</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialVideos.map((video, index) => (
              <FadeIn key={video.vimeoId} direction="up" delay={index * 100}>
                <VideoTestimonial
                  vimeoId={video.vimeoId}
                  thumbnailAlt={video.alt}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Waitlist Section */}
      <section id="liste-attente" className="py-20 lg:py-28 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent" />

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-4">
                Les inscriptions sont fermées
              </h2>
              <p className="text-white/90 text-lg mb-8">
                J&apos;accompagne actuellement les étudiants de la 7ème promo afin qu&apos;ils
                fassent un bond dans leur carrière à l&apos;aide d&apos;Excel. Tu souhaites{' '}
                <strong>être prévenu à l&apos;avance de la réouverture des inscriptions</strong>{' '}
                afin de rejoindre la prochaine promo ?
              </p>

              <h3 className="font-heading text-xl font-bold text-accent mb-8">
                Inscris-toi sur la liste d&apos;attente
              </h3>

              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input
                    type="email"
                    placeholder="Ton adresse e-mail"
                    className="flex-1 px-6 py-4 rounded-xl border-0 text-text bg-white shadow-lg focus:ring-2 focus:ring-accent focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-accent text-white font-heading font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-accent/90 transition-all duration-300"
                  >
                    C&apos;est parti !
                  </button>
                </div>
                <p className="text-sm text-white/60">
                  En t&apos;inscrivant, tu consens à recevoir des communications de Exceleur.
                </p>
              </form>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span className="text-sm font-medium text-primary">Choisis ta formule</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Investis dans <span className="text-primary">ton avenir</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0}>
              <PricingCard
                title="Version Complète"
                subtitle="Pour ceux qui veulent juste la théorie"
                price="800€"
                features={pricingFeatures.slice(0, 5).map((f) => ({ text: f, included: true }))}
                ctaText="S'inscrire sur la liste d'attente"
                ctaHref="#liste-attente"
              />
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <PricingCard
                title="Version Premium"
                subtitle="Pour ceux qui veulent pouvoir me poser des questions"
                price="1 200€"
                features={pricingFeatures.slice(0, 7).map((f) => ({ text: f, included: true }))}
                ctaText="S'inscrire sur la liste d'attente"
                ctaHref="#liste-attente"
                highlighted
              />
            </FadeIn>
            <FadeIn direction="up" delay={200}>
              <PricingCard
                title="Version Ultime"
                subtitle="Pour devenir des boss d'Excel"
                price="2 200€"
                features={pricingFeatures.map((f) => ({ text: f, included: true }))}
                ctaText="S'inscrire sur la liste d'attente"
                ctaHref="#liste-attente"
              />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-primary/5 relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <FadeIn direction="right" className="lg:w-2/5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl scale-95" />
                <Image
                  src="/images/formations/le-decollage/thomas-lexceleur.jpg"
                  alt="Thomas l'Exceleur"
                  width={400}
                  height={500}
                  className="relative rounded-3xl shadow-2xl mx-auto"
                />
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:w-3/5">
              <p className="text-primary font-semibold mb-2">Qui suis-je pour te dire ça ?</p>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
                C&apos;est <span className="text-primary">Thomas l&apos;Exceleur</span>
              </h2>

              <div className="space-y-6 text-lg">
                <p className="text-text-light">
                  <strong className="text-text-dark">J&apos;interviens auprès d&apos;entreprises</strong> pour les aider à
                  résoudre des problématiques complexes sur Excel.
                </p>
                <p className="text-text-light">
                  <strong className="text-text-dark">J&apos;ai également écrit le livre &quot;Révèle l&apos;Exceleur qui est en toi !&quot;</strong>{' '}
                  édité par Larousse.
                </p>
                <p className="text-text-light">
                  Plus de <strong className="text-text-dark">400 000 personnes suivent mes conseils quotidiens</strong> sur
                  Instagram et TikTok.
                </p>
                <p className="text-text-light">
                  J&apos;ai décidé de les accompagner en compilant mes meilleures méthodes de
                  travail dans une formation vraiment concrète avec des conseils que tu ne
                  trouveras nulle part ailleurs.
                </p>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft">
                  <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                  </svg>
                  <span className="text-sm font-medium text-text-dark">175K abonnés</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                  <span className="text-sm font-medium text-text-dark">50K abonnés</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-primary">Questions fréquentes</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                  F.A.Q
                </h2>
                <p className="text-text-light mt-3">Je réponds à tes questions</p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <Accordion items={faqItems} />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4">
                Tu as encore une question, un doute ?
              </h2>
              <p className="text-text-light mb-2">
                Envoie-moi un mail à{' '}
                <a
                  href="mailto:thomas@exceleur.fr"
                  className="text-primary hover:text-secondary transition-colors font-semibold"
                >
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
