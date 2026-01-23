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
  title: 'La Machine - Formation VBA Excel | Exceleur',
  description:
    "Je vais te montrer ma méthode simple et efficace pour faire de toi LE spécialiste de l'automatisation à ton boulot même si tu pars de zéro en programmation.",
};

const faqItems = [
  {
    question: "Qu'est-ce que je vais recevoir et comment se déroule la formation ?",
    answer:
      "Tu vas recevoir un accès à la plateforme de formation avec les 9 modules vidéo, les fiches PDF, les quizz et les cas pratiques. Tu peux suivre la formation à ton rythme, depuis ton PC ou smartphone.",
  },
  {
    question: 'Combien de temps ai-je pour terminer la formation ?',
    answer:
      "Tu as un accès illimité à la formation. Tu peux la suivre à ton rythme et revenir sur les vidéos autant de fois que tu le souhaites.",
  },
  {
    question: 'Combien de temps dure la formation ?',
    answer:
      "La formation contient environ 15 heures de vidéo. En y passant 30 minutes par jour, tu peux la terminer en 1 à 2 mois.",
  },
  {
    question: "Est-ce que cette formation est faite pour moi, même si je n'ai pas beaucoup de temps à y consacrer ?",
    answer:
      "Oui ! En suivant seulement 30 minutes par jour, tu peux terminer la formation en moins de 2 mois. Tu peux la suivre n'importe où, n'importe quand depuis ton PC ou ton smartphone.",
  },
  {
    question: "Est-ce qu'il y a des prérequis pour rejoindre la formation ?",
    answer:
      "Tu dois avoir des bases solides sur Excel pour suivre La Machine. Si tu débutes sur Excel, je te recommande de commencer par Le Décollage.",
  },
  {
    question: 'Faut-il suivre Le Décollage avant La Machine ?',
    answer:
      "Ce n'est pas obligatoire mais fortement recommandé. Le Décollage te donne les bases solides sur Excel. La Machine te permet ensuite d'automatiser tes tâches avec VBA.",
  },
  {
    question: 'Faut-il avoir des bases en programmation pour suivre La Machine ?',
    answer:
      "Non ! La Machine est conçue pour les débutants en VBA. Je t'explique tout de A à Z, pas à pas.",
  },
  {
    question: 'Pourquoi ne pas me former gratuitement avec internet ?',
    answer:
      "Tu trouveras beaucoup de contenu gratuit sur mes réseaux sociaux. Mais La Machine offre un programme structuré et un accompagnement personnalisé que tu ne trouveras pas ailleurs.",
  },
  {
    question: 'Et si je ne suis pas satisfait de mon achat ?',
    answer:
      "Tu disposes d'un délai de 14 jours pour exercer ton droit de rétractation conformément à la législation en vigueur.",
  },
  {
    question: 'Je suis sous Mac, est-ce que cela fonctionne ?',
    answer:
      "VBA fonctionne sur Mac mais avec quelques limitations. Certaines fonctionnalités peuvent ne pas être disponibles. Je te recommande d'utiliser Excel sur Windows pour profiter pleinement de la formation.",
  },
];

const modules = [
  {
    number: 1,
    title: 'Créer un environnement solide',
    subtitle: 'Avant de commencer à automatiser',
    items: [
      "Les applications de VBA en dehors d'Excel",
      'Bien paramétrer ton fichier pour ne pas être ralenti par la suite',
      "L'erreur fatale qui m'a déjà fait perdre toute une journée de travail... et comment l'éviter",
      'Les 4 fenêtres que tu dois connaître par cœur pour être efficace',
    ],
  },
  {
    number: 2,
    title: "L'art de manipuler le code",
    subtitle: 'Ton 1er code VBA',
    items: [
      "Les fondements d'une macro bien écrite",
      'Clean code : Mes 3 astuces pour maîtriser ce principe fondamental',
      "La méthode pour détecter en quelques secondes où se trouve l'erreur dans ta macro",
    ],
  },
  {
    number: 3,
    title: 'Comprendre le langage orienté objet',
    subtitle: 'Un langage orienté objet',
    items: [
      'La méthode "iPhone" pour faciliter l\'analyse de ton code',
      "Changer les propriétés de n'importe quel objet (même une feuille)",
      'Ce que tu dois absolument savoir pour utiliser les boutons efficacement',
      'Mettre à jour un tableau sans avoir à connaître sa position dans la feuille',
    ],
  },
  {
    number: 4,
    title: 'Rendre Excel dynamique',
    subtitle: 'Les variables',
    items: [
      'Les 11 types de variables que tu dois connaître et utiliser au bon moment',
      "L'astuce imparable pour ne plus jamais casser ta macro lorsque tu insères une ligne ou une colonne",
      'Mon secret pour savoir qui a utilisé une de tes macros et quand',
      'Ne passe plus jamais à côté d\'une faute dans une variable avec cette option',
    ],
  },
  {
    number: 5,
    title: "Mettre de l'intelligence artificielle dans ton fichier",
    subtitle: 'Les boucles et conditions',
    items: [
      'Les 7 types de boucles conditionnelles expliquées en détails',
      'La fonction IF : Pour que la machine fasse les bons choix à ta place',
      'La boucle conditionnelle la plus utilisée par les connaisseurs de VBA',
      'Une technique redoutable pour vérifier la bonne exécution des boucles',
    ],
  },
  {
    number: 6,
    title: 'Façonner le design de ta feuille',
    subtitle: "Modifier les propriétés d'une cellule",
    items: [
      'Ne retiens pas toutes les formules par cœur : voici quoi faire à la place',
      "Appliquer une boucle à chaque élément d'un tableau peu importe sa taille",
      'Affiche tes cellules dans la bonne mise en forme avec ces lignes de code magiques',
    ],
  },
  {
    number: 7,
    title: "Communiquer avec l'utilisateur de ta macro",
    subtitle: 'Interagir avec MsgBox et InputBox',
    items: [
      'Transforme Excel en fichier interactif grâce à ces 2 fonctions',
      "Comment arrêter une macro proprement avant la fin de son exécution",
      "L'action irréversible qui te coûtera tes données si tu ne la connais pas",
    ],
  },
  {
    number: 8,
    title: 'Le formulaire ultime',
    subtitle: 'Créer des formulaires',
    items: [
      'Userform : Crée de superbes interfaces dynamiques',
      'La méthode débutant vs la méthode pro pour créer des boutons radio',
      'La petite ligne à ajouter en fin de code pour préserver les ressources de ton ordinateur',
    ],
  },
  {
    number: 9,
    title: "Automatiser un tableau de bord : L'exemple complet",
    subtitle: 'Automatiser un tableau de bord avec VBA',
    items: [
      'Je te montre devant toi comment automatiser la mise à jour d\'un tableau en 30 minutes',
      'Mise en place le tableau de bord à partir d\'une base de donnée',
      'Actualisation du reporting en quelques clics via un formulaire',
    ],
  },
];

const masterclasses = [
  {
    number: 1,
    title: "Générer du code VBA à l'aide de ChatGPT",
    description: "Tout le monde finira par prendre ce virage de l'IA, mais les personnes qui adoptent ces nouvelles technologies avant tous les autres prennent une avance considérable.",
    items: [
      'REC : Le Super-framework pour obtenir des réponses pertinentes',
      'Prompt multi-couche : Le secret pour obtenir une réponse ultra-complète',
      'La technique pour débugger une macro en quelques secondes',
      "Mes secrets pour comprendre n'importe quelle macro",
    ],
    gradient: 'from-primary to-secondary',
  },
  {
    number: 2,
    title: 'Interagir avec Word, Outlook, et PowerPoint',
    description: "Microsoft offre énormément de possibilités d'interactions entre ses différents logiciels.",
    items: [
      'Transférer et mettre en forme des données en masse sur Word',
      'Créer des contacts depuis Excel, programmer des rendez-vous sur Outlook',
      'Configurer des modèles dans PowerPoint et transférer des graphiques',
    ],
    gradient: 'from-secondary to-accent',
  },
  {
    number: 3,
    title: "Devenir un pro de la gestion d'erreurs",
    description: "C'est inévitable de faire des erreurs en VBA, ça fait partie du jeu. Ta capacité à anticiper et résoudre ces erreurs te permettra d'être beaucoup plus efficace.",
    items: [
      "Les 3 types d'erreurs en VBA",
      'La bonne méthode pour gérer chacune de ces erreurs',
      "Les dangers derrière les systèmes de gestion d'erreurs",
    ],
    gradient: 'from-accent to-primary',
  },
];

const testimonialVideos = [
  { vimeoId: '690458799', alt: 'Témoignage Julie' },
  { vimeoId: '694958428', alt: 'Témoignage vidéo' },
  { vimeoId: '694964355', alt: 'Témoignage Rémi' },
  { vimeoId: '690458618', alt: 'Témoignage Anaïs' },
];

const pricingFeaturesUltime = [
  { text: 'Les 9 Modules de La Machine', included: true },
  { text: 'Les 2 Modules Bonus offerts', included: true },
  { text: 'Les fiches récap PDF à télécharger', included: true },
  { text: 'Les Fichiers Excel contenant les macros', included: true },
  { text: 'Les Cas Pratiques', included: true },
  { text: '1 accès à ma communauté privée', included: true },
  { text: '1 accès aux Consultations', included: true },
  { text: 'Attestation de fin de formation', included: true },
  { text: 'Masterclass 1 : ChatGPT', included: true },
  { text: 'Masterclass 2 : Word, Outlook, PowerPoint', included: true },
  { text: "Masterclass 3 : Gestion d'erreurs", included: true },
];

const pricingFeaturesPremium = [
  { text: 'Les 9 Modules de La Machine', included: true },
  { text: 'Les 2 Modules Bonus offerts', included: true },
  { text: 'Les fiches récap PDF à télécharger', included: true },
  { text: 'Les Fichiers Excel contenant les macros', included: true },
  { text: 'Les Cas Pratiques', included: true },
  { text: '1 accès à ma communauté privée', included: true },
  { text: '1 accès aux Consultations', included: true },
  { text: 'Attestation de fin de formation', included: true },
  { text: 'Masterclass 1 : ChatGPT', included: false },
  { text: 'Masterclass 2 : Word, Outlook, PowerPoint', included: false },
  { text: "Masterclass 3 : Gestion d'erreurs", included: false },
];

const pricingFeaturesComplete = [
  { text: 'Les 9 Modules de La Machine', included: true },
  { text: 'Les 2 Modules Bonus offerts', included: true },
  { text: 'Les fiches récap PDF à télécharger', included: true },
  { text: 'Les Fichiers Excel contenant les macros', included: true },
  { text: 'Les Cas Pratiques', included: true },
  { text: '1 accès à ma communauté privée', included: false },
  { text: '1 accès aux Consultations', included: false },
  { text: 'Attestation de fin de formation', included: false },
  { text: 'Masterclass 1 : ChatGPT', included: false },
  { text: 'Masterclass 2 : Word, Outlook, PowerPoint', included: false },
  { text: "Masterclass 3 : Gestion d'erreurs", included: false },
];

export default function LaMachinePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Gradient background - darker for VBA/code theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-text-dark" />

        {/* Decorative floating orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

        {/* Code pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' fill='%23ffffff' font-family='monospace' font-size='12'%3ESub Macro()%3C/text%3E%3Ctext x='20' y='50' fill='%23ffffff' font-family='monospace' font-size='12'%3E...%3C/text%3E%3Ctext x='10' y='70' fill='%23ffffff' font-family='monospace' font-size='12'%3EEnd Sub%3C/text%3E%3C/svg%3E")`,
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
                  <span className="text-sm font-medium text-white">Formation avancée</span>
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                  <span className="block text-white/80 text-2xl md:text-3xl mb-2 uppercase tracking-wider">
                    La Machine
                  </span>
                  <span className="text-accent">Propulse ta carrière</span>
                  <br />
                  <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                    grâce aux macros VBA
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                  Je vais te montrer ma méthode simple et efficace pour faire de toi LE spécialiste
                  de l&apos;automatisation même si tu pars de zéro en programmation.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#liste-attente"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-secondary font-heading font-bold rounded-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
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
                        500+ élèves
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-white text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        9.4/10 satisfaction
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/30 rounded-full text-white text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Attestation de fin de formation
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-4">
                      {[
                        '9 modules vidéo complets',
                        '3 Masterclass avancées',
                        'Fichiers Excel avec macros',
                        'Attestation de fin de formation',
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
                        <span className="text-3xl font-heading font-extrabold text-white">700€</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1"></p>
                    </div>
                  </div>

                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-primary" />
                <span className="text-sm font-medium text-secondary">Ce que tu vas maîtriser</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Tu vas découvrir comment
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Automatiser',
                description: 'Toutes les petites tâches quotidiennes qui te prennent un temps fou pour te recentrer sur ce que tu aimes vraiment faire',
                gradient: 'from-secondary/10 to-primary/10',
                iconBg: 'from-secondary to-primary',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
              },
              {
                title: 'Créer des macros',
                description: 'Performantes à partir de zéro et prendre en charge des projets plus ambitieux',
                gradient: 'from-primary/10 to-accent/10',
                iconBg: 'from-primary to-accent',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Mettre à jour',
                description: 'Des tableaux ultras sophistiqués en quelques clics (de quoi impressionner tous tes collègues)',
                gradient: 'from-accent/10 to-secondary/10',
                iconBg: 'from-accent to-secondary',
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className={`group relative h-full bg-gradient-to-br ${benefit.gradient} rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text-dark mb-3 group-hover:text-secondary transition-colors">
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

      {/* 3 Steps Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-secondary/5 relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-soft">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-primary" />
                <span className="text-sm font-medium text-secondary">Ma méthode en 3 étapes</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                Voici ce que je te propose
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-8">
            {[
              {
                number: '1',
                title: 'La découverte',
                content: "Suis la formation vidéo une première fois pour avoir une vision d'ensemble sur ce qu'il est possible de faire en VBA. En y passant seulement 30 min par jour, tu auras des bases solides en 1 à 2 semaines.",
                color: 'secondary',
              },
              {
                number: '2',
                title: 'La pratique',
                content: "Reproduis dans tes fichiers tout ce qu'on a vu ensemble en t'aidant des fiches récap' PDF. Tu vas pouvoir automatiser chacune de tes tâches quotidiennes et tout le monde va remarquer ton évolution.",
                color: 'primary',
              },
              {
                number: '3',
                title: 'La maîtrise',
                content: "Tu pourras t'appuyer sur notre communauté privée et nous poser tes questions. Avec le temps, tu vas développer des macros de plus en plus complexes et acquérir une compétence très recherchée.",
                color: 'accent',
              },
            ].map((step, index) => (
              <FadeIn key={step.number} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 150}>
                <div className="group flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 border border-gray-100">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${step.color} to-${step.color}/70 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl font-heading font-extrabold text-white">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`font-heading text-2xl font-bold mb-3 text-${step.color}`}>
                      {step.title}
                    </h3>
                    <p className="text-text-light leading-relaxed text-lg">
                      {step.content}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Presentation Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-text-dark via-gray-900 to-text-dark" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-3xl" />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <span className="text-white/60 text-lg block mb-2">Je te présente</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                <span className="bg-gradient-to-r from-white via-secondary/80 to-primary/80 bg-clip-text text-transparent">
                  La Machine
                </span>
              </h2>
              <p className="text-white/80 max-w-3xl mx-auto text-lg">
                La méthode unique pour t&apos;apprendre à rapidement maîtriser VBA et de t&apos;en
                servir comme tremplin pour ta carrière.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20 max-w-4xl mx-auto">
              <h4 className="font-heading text-2xl font-bold text-accent mb-8 text-center">
                Une formation conçue pour être ultra-efficace
              </h4>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: '🎬', text: 'Des vidéos courtes et percutantes' },
                  { icon: '📝', text: 'Des supports écrits détaillés' },
                  { icon: '📱', text: 'Accessible partout, tout le temps' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <p className="text-white/90 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Programme Section */}
      <section id="programme" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-primary" />
                <span className="text-sm font-medium text-secondary">9 modules complets</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Le programme
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <FadeIn key={module.number} direction="up" delay={index * 50}>
                <div className="group h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-lg">
                      <span className="text-sm font-heading font-bold text-white">{module.number}</span>
                    </div>
                    <span className="text-xs font-medium text-secondary px-2 py-1 bg-secondary/10 rounded-full">
                      Module {module.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-text-dark mb-2 group-hover:text-secondary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-text-light mb-4">{module.subtitle}</p>

                  <ul className="space-y-2">
                    {module.items.slice(0, 3).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-text-light">
                        <svg className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="line-clamp-2">{item}</span>
                      </li>
                    ))}
                    {module.items.length > 3 && (
                      <li className="text-sm text-secondary font-medium">
                        + {module.items.length - 3} autres...
                      </li>
                    )}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Masterclass Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-accent/10 rounded-full">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium text-accent">Nouveauté 2024</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                Les Masterclass indispensables
              </h2>
              <p className="text-text-light max-w-2xl mx-auto">
                En complément de la formation, 3 Masterclass pour approfondir des sujets essentiels.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8">
            {masterclasses.map((mc, index) => (
              <FadeIn key={mc.number} direction="up" delay={index * 100}>
                <div className={`group relative h-full bg-gradient-to-br ${mc.gradient} rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500`}>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/80 rounded-full text-xs font-semibold text-text-dark">
                      Masterclass {mc.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text-dark mb-3 pr-20">
                    {mc.title}
                  </h3>
                  <p className="text-sm text-text-light mb-6">
                    {mc.description}
                  </p>

                  <ul className="space-y-3">
                    {mc.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-sm text-text-light">
                        <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* TOSA Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <FadeIn direction="right" className="lg:w-2/5 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-full blur-3xl" />
                <Image
                  src="/images/formations/la-machine/tampon-certification-tosa-vba.webp"
                  alt="Attestation de fin de formation"
                  width={280}
                  height={280}
                  className="relative mx-auto drop-shadow-2xl"
                />
              </div>
            </FadeIn>

            <FadeIn direction="left" className="lg:w-3/5">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-accent/10 rounded-full">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-sm font-medium text-accent">Offert avec la formation</span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-6">
                Certification <span className="text-secondary">VBA</span>
              </h2>

              <p className="text-lg text-text-light mb-8">
                À la fin de la formation, tu passeras la <strong className="text-text-dark">certification VBA</strong>.
                Tu vas pouvoir justifier et mettre en avant tes nouvelles compétences{' '}
                <strong className="text-text-dark">en toute confiance</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-2">C&apos;est quoi le TOSA ?</h3>
                  <p className="text-text-light text-sm">
                    La <strong>référence</strong> en certification, reconnue mondialement. La certification informatique{' '}
                    <strong>la plus demandée</strong> par les entreprises françaises.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-2">Comment ça se passe ?</h3>
                  <p className="text-text-light text-sm">
                    Pendant 1 heure, tu passes une série de tests. Tu recevras une <strong>note sur 1000</strong> à intégrer à ton CV.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-secondary/5">
        <Container>
          <FadeIn direction="up">
            <p className="text-center text-sm text-text-light mb-10">
              Indicateurs issus d&apos;enquête interne, mis à jour une fois par an. Dernière mise à jour le 10/12/2024
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: 9.4, suffix: '/10', label: 'Note moyenne de satisfaction', color: 'secondary' },
              { value: 9.6, suffix: '/10', label: 'Note de recommandation', color: 'primary' },
              { value: 500, suffix: '+', label: 'Élèves formés depuis 2021', color: 'accent' },
            ].map((stat, index) => (
              <FadeIn key={index} direction="up" delay={index * 100}>
                <div className={`text-center p-8 rounded-3xl bg-white border border-gray-100 shadow-soft hover:shadow-lg transition-all duration-300`}>
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
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
                Ils ont suivi <span className="text-secondary">La Machine</span>
              </h2>
              <p className="text-lg text-text-light">Voici ce qu&apos;ils en disent</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-text-dark" />
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
                J&apos;accompagne actuellement les étudiants de la 5ème promo. Tu souhaites{' '}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-primary" />
                <span className="text-sm font-medium text-secondary">Choisis ta formule</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark">
                Investis dans <span className="text-secondary">ton avenir</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
            <FadeIn direction="up" delay={0}>
              <PricingCard
                title="Version Complète"
                subtitle="Pour ceux qui veulent juste la théorie"
                price="700€"
                features={pricingFeaturesComplete}
                ctaText="S'inscrire sur la liste d'attente"
                ctaHref="#liste-attente"
              />
            </FadeIn>
            <FadeIn direction="up" delay={100}>
              <PricingCard
                title="Version Premium"
                subtitle="Pour ceux qui veulent me poser des questions"
                price="1 000€"
                features={pricingFeaturesPremium}
                ctaText="S'inscrire sur la liste d'attente"
                ctaHref="#liste-attente"
                highlighted
              />
            </FadeIn>
            <FadeIn direction="up" delay={200}>
              <PricingCard
                title="Version Ultime"
                subtitle="Pour devenir les boss des macros"
                price="1 800€"
                features={pricingFeaturesUltime}
                ctaText="S'inscrire sur la liste d'attente"
                ctaHref="#liste-attente"
              />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Pour qui Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-secondary/5">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                Pour qui est faite cette formation ?
              </h2>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn direction="right">
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 h-full">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-6">Cette formation est faite pour toi si :</h3>
                <ul className="space-y-4">
                  {[
                    'Tu veux passer à un niveau supérieur dans ta carrière',
                    'Tu veux comprendre de A à Z comment fonctionnent les macros',
                    'Tu veux découvrir mes meilleures astuces sur VBA',
                    "Tu veux des exemples concrets d'utilisation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-text-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 h-full">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-6">Cette formation n&apos;est pas pour toi si :</h3>
                <ul className="space-y-4">
                  {[
                    'Tu cherches un guide pour copier-coller des macros sans comprendre',
                    'Tu veux une solution miracle pour évoluer sans rien faire',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary/10 rounded-full">
                  <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-secondary">Questions fréquentes</span>
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
      <section className="py-16 lg:py-20 bg-gradient-to-br from-secondary/5 via-white to-primary/5">
        <Container>
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4">
                Tu as encore une question, un doute ?
              </h2>
              <p className="text-text-light mb-2">
                Envoie-moi un mail à{' '}
                <a
                  href="mailto:hello@exceleur.fr"
                  className="text-secondary hover:text-primary transition-colors font-semibold"
                >
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
