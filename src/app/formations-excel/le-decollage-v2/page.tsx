'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Accordion } from '@/components/ui/Accordion';
import { VideoTestimonial } from '@/components/ui/VideoTestimonial';

/* ==========================================================================
   DATA
   ========================================================================== */

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
    question: "Est-ce que cette formation est faite pour moi si je n'ai pas beaucoup de temps ?",
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
  },
  {
    number: 3,
    title: "La checklist de l'organisation de tes fichiers",
    items: [
      "La stratégie qu'il faut TOUJOURS adopter lorsque tu as plusieurs tables de données",
      'Les 17 habitudes à développer pour créer des tableaux professionnels',
      "L'astuce simple pour permettre à n'importe qui de comprendre ton fichier en moins de 2 minutes",
    ],
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
  },
  {
    number: 6,
    title: "L'automatisation (sans VBA)",
    items: [
      'Importe tes données à partir de fichiers PDF, CSV, txt, web',
      'Mets automatiquement à jour tes données',
      "Un exemple complet d'automatisation que je fais sous tes yeux",
    ],
  },
];

const testimonialVideosFirst = [
  { vimeoId: '904003571', alt: 'Témoignage Thierry' },
  { vimeoId: '903995368', alt: 'Témoignage Bénédicte' },
  { vimeoId: '904000252', alt: 'Témoignage Gaëtan' },
];

const testimonialVideosSecond = [
  { vimeoId: '904002361', alt: 'Témoignage Marie' },
  { vimeoId: '904005061', alt: 'Témoignage Élodie' },
  { vimeoId: '904384660', alt: 'Témoignage Clément' },
];

/* ==========================================================================
   CTA BUTTON — Un seul type, même couleur, même texte partout
   ========================================================================== */

function CTAButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#offre"
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-heading font-bold text-lg rounded-xl shadow-button hover:shadow-button-hover hover:bg-primary-hover transition-all duration-200 ${className}`}
    >
      Rejoindre Le Décollage
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

/* ==========================================================================
   PAGE
   Séquence du rapport : Hero → Problème → Pont → Solution → Preuve #1 →
   Programme → À qui → Preuve #2 → Offre → Garantie → FAQ → CTA final
   ========================================================================== */

export default function LeDecollageV2Page() {
  const [email, setEmail] = useState('');

  return (
    <div className="bg-white">

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 1 — HERO / ACCROCHE
          Centré, 1 écran, 1 CTA unique
          ──────────────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Logo discret */}
          <p className="text-sm font-medium text-text-light tracking-widest uppercase mb-8">
            Exceleur
          </p>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-text-dark leading-tight mb-6">
            6 semaines pour devenir un monstre d&apos;efficacité sur Excel
          </h1>

          <p className="text-lg md:text-xl text-text-light leading-relaxed mb-10 max-w-xl mx-auto">
            Et faire un bond dans ta carrière même si tu n&apos;as que 15 minutes par jour
            à y consacrer.
          </p>

          <CTAButton />

          {/* Indicateur de confiance — sobre, sous le CTA */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-text-light">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              9.4/10 satisfaction
            </span>
            <span className="w-px h-4 bg-gray-200" />
            <span>1 000+ élèves formés</span>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 2 — PROBLÈME / DOULEUR
          Agiter le problème, créer l'empathie
          Texte à gauche, max 680px
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
            Tu utilises Excel tous les jours, mais tu sens que tu perds un temps fou ?
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Tu passes des heures à chercher des formules sur Google. Tu copies-colles des données
              manuellement d&apos;un fichier à l&apos;autre. Et quand tu ouvres un fichier créé par
              quelqu&apos;un d&apos;autre, c&apos;est le chaos.
            </p>
            <p>
              Tes collègues te demandent de l&apos;aide, mais tu n&apos;es même pas sûr de ta propre méthode.
              <strong className="text-text-dark"> Tu sais que tu pourrais faire mieux</strong>, mais par où commencer quand il y a des centaines de
              fonctionnalités ?
            </p>
            <p>
              Le pire ? Chaque erreur dans un tableau peut avoir des conséquences réelles :
              un rapport faux envoyé à ton manager, des données perdues, une présentation ratée.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 3 — PONT / TRANSITION
          "Il existe une meilleure façon" — centré, accent color
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-heading font-bold text-primary leading-snug">
            Et si en 6 semaines, tu pouvais devenir meilleur que 90% des utilisateurs d&apos;Excel ?
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 4 — SOLUTION / PROMESSE
          Présenter la méthode (pas le produit) — bullet points
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
            La Méthode Exceleur : apprendre uniquement ce qui compte
          </h2>

          <p className="text-lg text-text-light leading-relaxed mb-8">
            J&apos;ai formé plus de 1 000 élèves. Et j&apos;ai constaté que{' '}
            <strong className="text-text-dark">95% des utilisateurs n&apos;ont besoin que de 5% des fonctionnalités d&apos;Excel</strong>.
            Le Décollage se concentre exactement sur ces 5%.
          </p>

          <p className="text-lg text-text-light leading-relaxed mb-8">
            Grâce à cette formation, tu vas :
          </p>

          <ul className="space-y-4 mb-10">
            {[
              'Réaliser des fichiers ultra-professionnels qui prouvent tes compétences',
              'Importer et mettre à jour automatiquement tes données (sans VBA)',
              "Réduire drastiquement l'apparition des erreurs dans tes classeurs",
              'Maîtriser plus de 70 formules essentielles',
              "Savoir auditer et corriger n'importe quel fichier Excel",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-lg">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-text-light">{item}</span>
              </li>
            ))}
          </ul>

          <CTAButton />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 5 — PREUVE SOCIALE #1
          3 témoignages vidéo
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-3">
              Ils ont suivi Le Décollage
            </h2>
            <p className="text-lg text-text-light">Voici ce qu&apos;ils en disent</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonialVideosFirst.map((video) => (
              <VideoTestimonial
                key={video.vimeoId}
                vimeoId={video.vimeoId}
                thumbnailAlt={video.alt}
                variant="minimal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 6 — PROGRAMME / CONTENU
          Ce qu'ils vont apprendre — liste structurée, une colonne
          ──────────────────────────────────────────────────────────────────── */}
      <section id="programme" className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
            Le programme complet
          </h2>
          <p className="text-lg text-text-light mb-12">
            6 modules pour passer de débutant à expert, à ton rythme.
          </p>

          <div className="space-y-8">
            {modules.map((mod) => (
              <div key={mod.number} className="border-l-4 border-primary pl-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">
                    Module {mod.number}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
                  {mod.title}
                </h3>
                <ul className="space-y-2">
                  {mod.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-light">
                      <span className="text-primary mt-1.5 flex-shrink-0">&#8226;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 7 — À QUI C'EST DESTINÉ
          "C'est pour toi si..." / "Pas pour toi si..."
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-10">
            Est-ce que Le Décollage est fait pour toi ?
          </h2>

          <div className="space-y-10">
            {/* Pour toi si */}
            <div>
              <h3 className="font-heading text-xl font-bold text-text-dark mb-4">
                C&apos;est pour toi si...
              </h3>
              <ul className="space-y-3">
                {[
                  'Tu utilises Excel au quotidien mais tu sens que tu perds du temps',
                  "Tu es comptable, chef de projet, auditeur, ingénieur ou étudiant",
                  "Tu veux progresser rapidement sans y passer des mois",
                  "Tu veux des fichiers professionnels dont tu es fier",
                  "Tu n'as que 15-30 minutes par jour à y consacrer",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-text-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pas pour toi si */}
            <div>
              <h3 className="font-heading text-xl font-bold text-text-dark mb-4">
                Ce n&apos;est pas pour toi si...
              </h3>
              <ul className="space-y-3">
                {[
                  'Tu es déjà expert Excel et tu maîtrises VBA',
                  "Tu cherches uniquement du contenu sur Power BI ou les macros avancées",
                  "Tu n'es pas prêt à investir du temps pour progresser",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-text-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 8 — PREUVE SOCIALE #2
          Stats + 3 témoignages supplémentaires
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          {/* Stats — chiffres bruts, pas d'animation */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
              <div>
                <p className="text-4xl lg:text-5xl font-heading font-extrabold text-text-dark">
                  9.4<span className="text-xl text-text-light">/10</span>
                </p>
                <p className="text-sm text-text-light mt-1">Note de satisfaction</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200" />
              <div>
                <p className="text-4xl lg:text-5xl font-heading font-extrabold text-text-dark">
                  9.6<span className="text-xl text-text-light">/10</span>
                </p>
                <p className="text-sm text-text-light mt-1">Taux de recommandation</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-200" />
              <div>
                <p className="text-4xl lg:text-5xl font-heading font-extrabold text-text-dark">
                  1 000+
                </p>
                <p className="text-sm text-text-light mt-1">Élèves depuis 2022</p>
              </div>
            </div>
            <p className="text-xs text-text-muted text-center mt-6">
              Indicateurs issus d&apos;enquête interne, mis à jour le 10/12/2024
            </p>
          </div>

          {/* Témoignages #2 */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonialVideosSecond.map((video) => (
              <VideoTestimonial
                key={video.vimeoId}
                vimeoId={video.vimeoId}
                thumbnailAlt={video.alt}
                variant="minimal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 9 — L'OFFRE / PRIX
          Un seul bloc, fond léger, ancrage de valeur avant le prix
          Le seul élément avec un fond différent
          ──────────────────────────────────────────────────────────────────── */}
      <section id="offre" className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4 text-center">
            Investis dans ton avenir
          </h2>
          <p className="text-lg text-text-light text-center mb-10">
            Choisis la formule qui te convient
          </p>

          {/* Bloc offre — seul élément avec fond distinct */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            {/* Version Complète */}
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-heading text-lg font-bold text-text-dark">
                  Version Complète
                </h3>
                <span className="font-heading text-2xl font-extrabold text-text-dark">800 &euro;</span>
              </div>
              <p className="text-sm text-text-light">Les 6 modules + fiches PDF + quiz + cas pratiques</p>
            </div>

            {/* Version Premium — mise en avant */}
            <div className="p-8 bg-primary/5 border-b border-gray-100 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  Recommandé
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-heading text-lg font-bold text-text-dark">
                  Version Premium
                </h3>
                <span className="font-heading text-2xl font-extrabold text-primary">1 200 &euro;</span>
              </div>
              <p className="text-sm text-text-light">
                Tout le Complète + accès communauté privée + masterclass TCD Expert + masterclass nouvelles formules
              </p>
            </div>

            {/* Version Ultime */}
            <div className="p-8">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-heading text-lg font-bold text-text-dark">
                  Version Ultime
                </h3>
                <span className="font-heading text-2xl font-extrabold text-text-dark">2 200 &euro;</span>
              </div>
              <p className="text-sm text-text-light">
                Tout le Premium + masterclass LAMBDA et LET + masterclass entretien de recrutement
              </p>
            </div>

            {/* CTA dans le bloc offre */}
            <div className="px-8 pb-8 pt-4 text-center">
              <CTAButton className="w-full sm:w-auto" />
            </div>
          </div>

          {/* Ce qui est inclus — résumé rapide */}
          <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm text-text-light">
            {[
              '6 modules vidéo complets',
              'Fiches récap PDF téléchargeables',
              'Quiz et cas pratiques',
              'Accès illimité à vie',
              '3 modules bonus offerts',
              'Support communauté (Premium+)',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 10 — GARANTIE
          Réduire le risque perçu — 1 paragraphe sobre
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 mb-4">
            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-3">
            Garantie 14 jours
          </h2>
          <p className="text-lg text-text-light leading-relaxed max-w-lg mx-auto">
            Tu disposes d&apos;un délai de 14 jours pour exercer ton droit de rétractation.
            Si la formation ne te convient pas, tu es intégralement remboursé. Sans condition.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 11 — FAQ
          Lever les dernières objections — accordéon, colonne étroite
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-3 text-center">
            Questions fréquentes
          </h2>
          <p className="text-text-light text-center mb-10">
            Tu as une question ? La réponse est sûrement ici.
          </p>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 12 — CTA FINAL
          Dernier appel à l'action — centré, sobre
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
            Prêt à faire décoller tes compétences Excel ?
          </h2>
          <p className="text-lg text-text-light mb-8 max-w-lg mx-auto">
            Rejoins les 1 000+ élèves qui ont transformé leur façon de travailler sur Excel.
          </p>
          <CTAButton />
          <p className="text-sm text-text-muted mt-6">
            Une question ? Écris-moi à{' '}
            <a href="mailto:thomas@exceleur.fr" className="text-primary hover:underline">
              thomas@exceleur.fr
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}
