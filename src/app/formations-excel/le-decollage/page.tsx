'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Accordion } from '@/components/ui/Accordion';
import { VideoTestimonial } from '@/components/ui/VideoTestimonial';

/* ==========================================================================
   COUNTDOWN TIMER
   ========================================================================== */

const DEADLINE = new Date('2026-02-25T00:00:00+01:00'); // 24 février 2026 à minuit (heure de Paris)

function getTimeLeft(deadline: Date) {
  const diff = Math.max(0, deadline.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: diff === 0,
  };
}

function useCountdown(deadline: Date) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(deadline));
    const timer = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return { ...timeLeft, mounted };
}

/* ==========================================================================
   DATA
   ========================================================================== */

const faqItems = [
  {
    question:
      'Est-ce que j\'ai besoin d\'être "bon en maths" ou d\'avoir des bases techniques pour suivre Le Décollage ?',
    answer:
      "Non. Et c'est justement pour ça que la formation existe. Le Décollage part de zéro et construit tes compétences brique par brique, dans un ordre logique. Pas de jargon inutile, pas de prérequis. Parmi les élèves, certains n'avaient jamais écrit une seule formule avant de commencer \u2014 et ils sont devenus autonomes en quelques semaines. Le problème n'a jamais été ton niveau. C'était l'absence d'un parcours structuré et adapté.",
  },
  {
    question: 'Quels résultats je peux espérer ?',
    answer:
      "Les résultats dépendent de ton implication, mais voici ce qu'on observe régulièrement : des élèves qui divisent par 2 ou 3 le temps passé sur leurs tâches Excel, qui produisent des fichiers propres et professionnels pour la première fois, et qui passent de \u00ab celui qui demande \u00bb à \u00ab celui qu'on vient voir \u00bb. Thierry écrit aujourd'hui des fichiers pour la base de données d'une multinationale. Un autre élève est devenu l'expert Excel de son bureau en partant de zéro.",
  },
  {
    question: 'En combien de temps je vais voir des résultats ?',
    answer:
      "Certains élèves appliquent ce qu'ils apprennent dès le premier module \u2014 les fondations et l'organisation de fichiers sont immédiatement utilisables dans ton travail. En quelques semaines, à raison de quelques minutes par jour, tu peux avoir couvert les formules essentielles et commencer à automatiser des tâches. Le rythme dépend de toi : la formation est en vidéos courtes, accessible à vie, et ta progression est sauvegardée. La formation concentre en 12h de vidéos tout ce qu'il te faut.",
  },
  {
    question:
      "J'ai déjà essayé des tutos YouTube et des formations en ligne sans résultat. Pourquoi ça marcherait cette fois ?",
    answer:
      "Parce que le problème n'était pas toi \u2014 c'était la méthode. Les tutos YouTube sont fragmentés, sans fil conducteur. Tu comprends sur le moment, tu oublies le lendemain. Les formations encyclopédiques te noient sous 400 formules sans t'apprendre à les utiliser. Le Décollage est construit autour de la Règle des 95% : un socle maîtrisé en profondeur, qui couvre la quasi-totalité de tes besoins réels. Avec des cas pratiques, des questionnaires express et des résumés PDF pour que ça reste.",
  },
  {
    question: "Je ne suis pas sûr d'avoir le temps.",
    answer:
      "La formation est en vidéos courtes, conçues pour délivrer un maximum en un minimum de temps. Tu peux suivre Le Décollage aux heures que tu préfères, sur n'importe quel appareil. En quelques minutes par jour, tu progresses. Et l'accès est à vie. Mais pose-toi la question inverse \u2014 combien de temps tu perds chaque semaine à cause d'Excel ? Les heures que tu investis dans la formation, ce sont des heures que tu récupères chaque semaine ensuite.",
  },
  {
    question: "Pourquoi payer alors qu'il y a des contenus gratuits sur internet ?",
    answer:
      "Tu as raison, une bonne partie de ce que tu trouveras dans Le Décollage est techniquement accessible sur internet. Et tu as sûrement déjà essayé : des heures sur Google, des tutos YouTube regardés et oubliés, des forums incompréhensibles. Le résultat ? Tu es toujours au même point. Le Décollage te donne tout ce dont tu as besoin, structuré dans le bon ordre, avec des méthodes de travail que tu ne trouveras nulle part ailleurs.",
  },
  {
    question: "Est-ce que c'est éligible au CPF ?",
    answer: "Non, cette formation n'est pas éligible au CPF.",
  },
  {
    question: "Est-ce qu'il y a une garantie ?",
    answer:
      "Tu bénéficies de 15 jours de garantie remboursement intégral. Sans condition. Sans justification. Par simple email à thomas@exceleur.fr. Si tu n'es pas satisfait, on te rembourse \u2014 point.",
  },
  {
    question: "C'est quoi Elyx exactement ?",
    answer:
      "Elyx est un add-in Excel que j'ai créé. C'est un agent IA autonome qui s'intègre directement dans ton tableur. Tu lui décris ce que tu veux faire en langage naturel, et il l'exécute : nettoyage de données, formules, tableaux croisés dynamiques, graphiques, automatisations. Tu peux aussi lui demander de t'expliquer ce qu'il fait pour apprendre en même temps. Pendant le lancement, tu reçois 3 mois d'abonnement offerts (plan Solo, valeur 57\u20ac). Après les 3 mois, tu es libre de continuer ou non \u2014 aucun engagement.",
  },
];

const modules = [
  {
    number: 1,
    title: 'Poser les fondations pour ne plus jamais mal démarrer un fichier',
    items: [
      "Les réglages indispensables à faire avant même d'écrire une seule formule (la plupart des gens sautent cette étape \u2014 et le paient plus tard)",
      'Les 4 manières de faire appel à une cellule (et comment choisir la bonne à chaque fois pour ne pas casser tes formules)',
      "L'erreur de paramétrage méconnue qui a fait perdre dans la nature des milliers de cas positifs à la COVID-19 au Royaume-Uni en 2020 (et que tu fais peut-être aussi sans le savoir)",
      "Mon secret pour récupérer des classeurs corrompus et ne pas devoir recommencer plusieurs heures de travail",
    ],
  },
  {
    number: 2,
    title: "Créer des fichiers propres, pro et compréhensibles par n'importe qui",
    items: [
      "La stratégie qu'il faut TOUJOURS adopter lorsque tu as plusieurs tables de données (mais aussi la SEULE exception à cette règle)",
      'Les 17 habitudes à développer pour créer des tableaux professionnels et résistants aux modifications',
      "L'astuce simple à mettre en place pour permettre à n'importe qui de comprendre ton fichier en moins de 2 minutes",
    ],
  },
  {
    number: 3,
    title: 'Maîtriser les 70+ formules qui couvrent 95% de tes besoins',
    items: [
      '11 formules puissantes pour être un crack de la recherche de données (RECHERCHEV, INDEX/EQUIV, RECHERCHEX...)',
      '7 formules matricielles dynamiques géniales pour mettre à jour toutes tes données d\'un seul coup',
      '8 formules conditionnelles pour devenir le maître des tests logiques',
      '4 formules peu connues mais indispensables pour te sortir de certaines situations',
      "Et bien d'autres qui élèvent le total à plus de 70 formules avec lesquelles tu peux presque tout faire",
    ],
  },
  {
    number: 4,
    title: 'Éliminer 90% des erreurs qui te gâchent la vie',
    items: [
      "L'outil génial pour identifier en un coup d'\u0153il l'origine de tes erreurs",
      'La formule qui va sauver ton fichier plein d\'erreurs lorsque tu dois le présenter à tes collègues',
      "Comment anticiper l'erreur la plus fréquente sur Excel (celle qui t'arrive à coup sûr si tu utilises RECHERCHEV, RECHERCHEX ou INDEX/EQUIV)",
      'La méthode du tamis : comment récupérer instantanément toutes tes cellules contenant une erreur',
    ],
  },
  {
    number: 5,
    title: 'Automatiser tes tâches répétitives (sans toucher à VBA)',
    items: [
      'Comment importer tes données directement sous forme de tableaux à partir de fichiers PDF, CSV, txt, web \u2014 sans écrire une seule ligne de code',
      'Comment mettre automatiquement à jour tes données à partir de ces fichiers, même si la taille des tableaux change',
      "Un exemple complet d'automatisation que je fais sous tes yeux, à partir d'un cas concret que j'ai moi-même rencontré",
    ],
  },
  {
    number: 6,
    title: 'Créer des graphiques impactants qui mettent en valeur tes données',
    items: [
      'Les différents types de graphiques qu\'il faut absolument connaître (et maîtriser)',
      'Comment choisir le bon graphique qui mettra en valeur tes données',
      'La fonctionnalité qui te permet d\'insérer un graphique à l\'intérieur d\'une cellule',
      'Comment créer une carte interactive dans Excel',
    ],
  },
];

const masterclasses = [
  {
    title: 'TCD Expert : maîtriser les tableaux croisés dynamiques comme un pro',
    items: [
      'Un décryptage complet de la formule imbuvable (mais indispensable) pour manipuler tes TCD',
      'Les 5 grands dangers sur les TCD (pour ne plus jamais tomber dans le piège)',
      'Ma méthode pour relier plusieurs tableaux dans un seul TCD',
    ],
  },
  {
    title: 'Les 15 nouvelles formules d\'Excel à découvrir absolument',
    items: [
      '15 formules récentes qui vont te sauver la mise dans pas mal de situations',
      'Je te montre à quoi elles servent, comment les utiliser et dans quelle situation',
    ],
  },
  {
    title: 'LAMBDA et LET : la révolution qui remplace VBA',
    items: [
      '2 fonctions tellement puissantes qu\'elles méritent une masterclass entière',
      'Comment simplifier des formules existantes et créer tes propres formules en quelques secondes',
    ],
  },
  {
    title: 'Réussir avec brio les tests Excel en entretien de recrutement',
    items: [
      'Les questions théoriques les plus posées',
      'Les 3 types de tests pratiques qu\'on te fera faire',
      'Les exercices incontournables autour de la résolution de problèmes',
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

const URL_PAIEMENT_1X = 'https://exceleur.schoolmaker.co/purchases/new?price_id=ff1bd50f-9532-441d-b8ac-98041d289ddb';
const URL_PAIEMENT_3X = 'https://exceleur.schoolmaker.co/subscriptions/new?price_id=14e5db05-7c27-427f-a779-c344adbb6bf9';

/* ==========================================================================
   CTA BUTTONS
   ========================================================================== */

function CTAButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <a
        href={URL_PAIEMENT_1X}
        className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 bg-primary text-white font-heading font-bold text-base rounded-2xl shadow-button hover:shadow-button-hover hover:scale-[1.02] transition-all duration-300 overflow-hidden"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <span className="relative">Paiement en 1 fois &mdash; 497&euro;</span>
        <svg
          className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
      <a
        href={URL_PAIEMENT_3X}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 bg-white text-primary font-heading font-bold text-base rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 hover:scale-[1.02] transition-all duration-300"
      >
        Paiement en 3 fois &mdash; 3x 165,67&euro;
      </a>
    </div>
  );
}

function CTASingle({ className = '' }: { className?: string }) {
  return (
    <a
      href="#offre"
      className={`group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-primary font-heading font-bold text-lg rounded-2xl shadow-[0_4px_20px_rgba(255,255,255,0.3),0_0_40px_rgba(203,106,237,0.25)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.5),0_0_50px_rgba(203,106,237,0.35)] hover:scale-[1.02] transition-all duration-300 overflow-hidden ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative">Rejoindre Le D&eacute;collage</span>
      <svg
        className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

/* ==========================================================================
   ICONS
   ========================================================================== */

function CheckIcon({ className = 'w-5 h-5 text-primary' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function LeDecollagePage() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const countdown = useCountdown(DEADLINE);

  return (
    <div className="bg-white">
      {/* ================================================================
          BANNIERE STICKY AVEC COUNTDOWN
          ================================================================ */}
      <div className="sticky top-0 z-50 relative bg-gradient-to-r from-primary via-secondary to-primary text-white py-2.5 px-4 overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="relative flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          <p className="text-sm md:text-base font-medium">
            Offre de lancement &mdash; Tarif sp&eacute;cial + 3 mois d&apos;Elyx offerts
          </p>

          {countdown.mounted && !countdown.expired && (
            <div className="flex items-center gap-1.5">
              {[
                { value: countdown.days, label: 'j' },
                { value: countdown.hours, label: 'h' },
                { value: countdown.minutes, label: 'm' },
                { value: countdown.seconds, label: 's' },
              ].map((unit, i) => (
                <div key={i} className="flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/20 backdrop-blur-sm text-white font-heading font-bold text-sm md:text-base tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-white/70 text-xs ml-0.5 mr-1">{unit.label}</span>
                </div>
              ))}
            </div>
          )}

          <a href="#offre" className="text-sm font-bold text-white underline hover:text-white/90 whitespace-nowrap">
            Voir l&apos;offre &rarr;
          </a>
        </div>
      </div>

      {/* ================================================================
          SECTION 1 - HERO
          ================================================================ */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />

        {/* Animated orbs */}
        <div className="absolute top-10 right-[10%] w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-[5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Formation Excel en ligne
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6 normal-case">
            Si Excel te prend 15&nbsp;heures par semaine et que tu compenses en silence&hellip;
            <br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #fff 0%, #E0A3F5 50%, #A8D8F4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.4)) drop-shadow(0 4px 20px rgba(203,106,237,0.3))' }}>
              Alors sache que le probl&egrave;me n&apos;a jamais &eacute;t&eacute; ton niveau.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl mx-auto">
            Et dans la suite de cette page, je vais te montrer pourquoi.
          </p>

          <CTASingle className="mb-12" />

          {/* Social proof bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="text-white font-bold text-sm">9.4/10</span>
              <span className="text-white/60 text-sm">satisfaction</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-white font-bold text-sm">3&nbsp;000+</span>
              <span className="text-white/60 text-sm">&eacute;l&egrave;ves form&eacute;s</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-bold text-sm">12h</span>
              <span className="text-white/60 text-sm">de formation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 - LE CONSTAT
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p className="text-2xl md:text-3xl font-heading font-extrabold text-text-dark leading-snug normal-case">
              Il y a des gens brillants qui gal&egrave;rent sur Excel.
            </p>
            <p>
              Des managers respect&eacute;s. Des commerciaux qui d&eacute;passent leurs objectifs
              chaque trimestre. Des comptables avec 20&nbsp;ans de m&eacute;tier. Des chefs de
              projet qui g&egrave;rent des &eacute;quipes de 15&nbsp;personnes sans sourciller.
            </p>
            <p>
              Et pourtant, quand ils re&ccedil;oivent un fichier Excel un peu costaud,{' '}
              <strong className="text-text-dark">leur estomac se noue.</strong>
            </p>
            <p>
              Ils copient-collent ligne par ligne. Ils envoient un message &agrave;
              &laquo;&nbsp;celui qui g&egrave;re&nbsp;&raquo; en s&apos;excusant de d&eacute;ranger.
              Ils restent une heure de plus le soir pour finir un truc qu&apos;un stagiaire
              bouclerait en 20&nbsp;minutes.
            </p>
            <p>
              &Agrave; l&apos;inverse, il y a des gens avec moiti&eacute; moins
              d&apos;exp&eacute;rience qui ouvrent le m&ecirc;me fichier et le traitent les doigts
              dans le nez.
            </p>

            {/* Highlighted insight */}
            <div className="my-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-lg md:text-xl font-medium text-text-dark leading-relaxed">
                La diff&eacute;rence entre les deux n&apos;a rien &agrave; voir avec le talent, ni
                avec le nombre d&apos;heures pass&eacute;es sur des tutos YouTube.
              </p>
            </div>

            <p>
              Et si tu fais partie du premier groupe &mdash; si tu portes cette comp&eacute;tence
              manquante comme un secret professionnel que tu n&apos;avoues &agrave; personne &mdash;
              alors ce qui suit va probablement changer ta fa&ccedil;on de voir Excel.
            </p>
            <p className="font-medium text-text-dark text-xl">
              Parce que le vrai probl&egrave;me n&apos;est pas celui que tu crois.
            </p>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="section-divider" />

      {/* ================================================================
          SECTION 3 - LA DOULEUR QUOTIDIENNE
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-12 normal-case">
            Si aujourd&apos;hui Excel te donne cette sensation de nager &agrave;
            contre-courant&hellip;
          </h2>

          <div className="space-y-4 mb-12">
            {[
              "Tu reçois un fichier avec 12 onglets et ton premier réflexe, c'est de vérifier qui d'autre dans l'équipe pourrait s'en charger",
              'Tu tapes \u00ab RECHERCHEV Excel \u00bb sur Google pour la quatrième fois ce trimestre \u2014 et tu retombes sur le même tuto que la dernière fois',
              "Tu construis tes tableaux en empilant des copier-coller et des formules en dur, en croisant les doigts pour que rien ne se décale",
              'Tu acquiesces en réunion quand on parle de \u00ab pivoter les données \u00bb\u2026 sans oser demander ce que ça veut dire concrètement',
              "Tu vois le junior arrivé il y a 6 mois sortir un dashboard impeccable en 2 heures \u2014 le genre de fichier que tu ne saurais même pas commencer",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-primary/[0.02] transition-all duration-300"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {i + 1}
                </span>
                <span className="text-text-light leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p className="font-medium text-text-dark text-xl">
              Et le plus insidieux dans tout &ccedil;a&nbsp;? C&apos;est ce que &ccedil;a provoque
              en toi. Sans que tu le dises &agrave; personne.
            </p>
            <p>
              C&apos;est possible que tu rentres certains soirs avec une fatigue qui n&apos;a rien
              &agrave; voir avec la charge de travail. Juste l&apos;&eacute;nergie mentale
              qu&apos;Excel te pompe.
            </p>
            <p>
              Si tu as 10, 15 ou 20&nbsp;ans de carri&egrave;re et que tu te surprends &agrave;
              penser &laquo;&nbsp;&agrave; mon &acirc;ge, je devrais savoir faire
              &ccedil;a&nbsp;&raquo;&hellip; alors il y a de fortes chances que cette pens&eacute;e
              contamine le reste.
            </p>
            <p>
              Que tu commences &agrave; douter. Pas juste de ton niveau sur Excel.{' '}
              <strong className="text-text-dark">
                De ta capacit&eacute; &agrave; apprendre tout court.
              </strong>
            </p>
            <p>
              Et pendant ce temps, personne ne sait. Parce que ce n&apos;est pas le genre de truc
              qu&apos;on avoue &agrave; son manager ou &agrave; ses coll&egrave;gues. On fait
              semblant. On contourne. On compense.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 - LES SOLUTIONS ECHOUEES
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-100/80">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-10 normal-case">
            Alors tu as cherch&eacute; des solutions. Et &agrave; chaque fois, &ccedil;a a
            donn&eacute; la m&ecirc;me chose.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <div className="flex items-start gap-4">
              <XIcon />
              <p>
                <strong className="text-text-dark">YouTube.</strong> Tu as tap&eacute;
                &laquo;&nbsp;apprendre Excel&nbsp;&raquo;, tu es tomb&eacute; sur une vid&eacute;o
                &laquo;&nbsp;Les 10&nbsp;formules indispensables&nbsp;&raquo;.
                Tu as compris sur le moment. Le lendemain, devant ton fichier, c&apos;&eacute;tait
                d&eacute;j&agrave; flou.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <XIcon />
              <p>
                <strong className="text-text-dark">Un MOOC ou une formation en ligne.</strong> Tu as tenu
                quelques jours, peut-&ecirc;tre deux semaines. Et puis le quotidien a repris le dessus.
                La formation est rest&eacute;e ouverte dans un onglet pendant un mois avant que tu la
                refermes d&eacute;finitivement.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <XIcon />
              <p>
                <strong className="text-text-dark">ChatGPT.</strong> Tu lui d&eacute;cris ton
                probl&egrave;me, il te crache une formule. Tu la colles dans ta cellule, &ccedil;a
                marche &mdash; ou pas. Mais dans les deux cas, tu n&apos;as rien compris.{' '}
                <strong className="text-text-dark">Tu as juste chang&eacute; de b&eacute;quille.</strong>
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 md:p-8 rounded-2xl bg-white border border-gray-200 shadow-soft">
            <p className="text-lg text-text-light leading-relaxed mb-4">
              Le point commun de toutes ces tentatives&nbsp;? Elles t&apos;ont donn&eacute; des morceaux
              &mdash; une formule ici, une astuce l&agrave; &mdash; mais jamais le tableau complet.
            </p>
            <p className="text-lg font-medium text-text-dark">
              C&apos;est parce que ces m&eacute;thodes ne sont pas con&ccedil;ues pour
              t&apos;amener quelque part. Elles sont con&ccedil;ues pour r&eacute;pondre &agrave;
              une question ponctuelle &mdash; pas pour te rendre autonome.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 - LE MECANISME (Regle des 95%)
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8 normal-case">
            Ce qu&apos;on ne t&apos;a jamais dit sur Excel
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Tout le monde aborde Excel de la m&ecirc;me mani&egrave;re&nbsp;: empiler des
              formules. Plus tu en connais, meilleur tu es.
            </p>
            <p className="font-medium text-text-dark">
              Et c&apos;est exactement pour &ccedil;a que &ccedil;a ne marche pas.
            </p>
            <p>
              Le probl&egrave;me n&apos;a jamais &eacute;t&eacute; le nombre de formules que tu
              connais. Le probl&egrave;me, c&apos;est que personne ne t&apos;a appris &agrave;{' '}
              <strong className="text-text-dark">structurer ta mani&egrave;re de travailler</strong>{' '}
              sur Excel.
            </p>
            <p>
              Pendant 11&nbsp;ans en entreprise, j&apos;ai vu passer des centaines de
              professionnels dans la m&ecirc;me situation que toi.
            </p>
            <p>
              En observant ceux qui &eacute;taient vraiment &agrave; l&apos;aise, j&apos;ai
              remarqu&eacute; quelque chose de contre-intuitif.
            </p>
            <p>
              <strong className="text-text-dark">
                Ils n&apos;utilisaient pas plus de formules que les autres. Ils en utilisaient
                moins.
              </strong>{' '}
              Mais ils les ma&icirc;trisaient en profondeur &mdash; et surtout, ils avaient une
              structure de travail solide derri&egrave;re.
            </p>
            <p>
              C&apos;est un principe que Vilfredo Pareto a mis en lumi&egrave;re il y a plus
              d&apos;un si&egrave;cle&nbsp;: dans n&apos;importe quel domaine, une minorit&eacute;
              d&apos;&eacute;l&eacute;ments produit la majorit&eacute; des r&eacute;sultats.
            </p>
            <p>
              Microsoft l&apos;a v&eacute;rifi&eacute; en interne &mdash; corriger 20% des bugs les
              plus signal&eacute;s &eacute;liminait 80% des crashes. Sur Excel, c&apos;est pareil.
            </p>
          </div>

          {/* Premium callout - Regle des 95% */}
          <div className="relative my-12 p-8 md:p-10 rounded-3xl overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-3xl p-[2px]" style={{ background: 'linear-gradient(135deg, #CB6AED, #7CC3EE)' }}>
              <div className="w-full h-full rounded-[22px] bg-white" />
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                Le principe fondamental
              </p>
              <p className="text-2xl md:text-3xl font-heading font-extrabold text-text-dark mb-4 normal-case">
                La R&egrave;gle des 95%
              </p>
              <p className="text-lg md:text-xl text-text-light leading-relaxed">
                Un socle de formules bien ma&icirc;tris&eacute;es &mdash; pas 400, pas 200, mais les
                bonnes &mdash; couvre{' '}
                <span className="text-gradient font-bold">
                  95% de ce que tu as besoin de faire au quotidien
                </span>
                .
              </p>
            </div>
          </div>

          <p className="text-lg text-text-light leading-relaxed">
            Et la solution, ce n&apos;est pas d&apos;apprendre toujours plus. C&apos;est de
            ma&icirc;triser ce socle en profondeur, dans le bon ordre, avec les bonnes
            m&eacute;thodes de travail autour. Que chaque formule devienne{' '}
            <strong className="text-text-dark">un r&eacute;flexe</strong> &mdash; pas quelque chose
            que tu dois re-googler &agrave; chaque fois.
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 - CREDIBILITE
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-100/80">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8 normal-case">
            Comment je le sais&nbsp;? Parce que je l&apos;ai vu de l&apos;int&eacute;rieur pendant
            11&nbsp;ans.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Avant de cr&eacute;er du contenu sur Excel, j&apos;ai pass&eacute; 6&nbsp;ans en
              comptabilit&eacute; puis 5&nbsp;ans en contr&ocirc;le de gestion. En entreprise. Avec
              des fichiers r&eacute;els, des deadlines r&eacute;elles, et des coll&egrave;gues
              r&eacute;els qui me demandaient de l&apos;aide.
            </p>
            <p>
              <strong className="text-text-dark">
                C&apos;&eacute;taient ceux qui avaient un cadre de travail clair.
              </strong>{' '}
              Comment structurer un fichier. Quelles formules utiliser dans quelle situation. Comment
              les combiner pour r&eacute;soudre un probl&egrave;me en 3&nbsp;&eacute;tapes au lieu
              de 15.
            </p>
            <p>
              J&apos;ai construit mon approche autour de &ccedil;a. Et les r&eacute;sultats parlent
              d&apos;eux-m&ecirc;mes.
            </p>
          </div>

          {/* Temoignages metriques */}
          <div className="mt-10 grid gap-4">
            {[
              {
                text: 'Une élève passait 3 jours par mois sur son reporting. Après avoir appliqué la Règle des 95%, elle a réduit ça à une demi-journée. Sur un an, c\'est l\'équivalent de 30 jours de travail récupérés.',
                highlight: '3 jours \u2192 \u00bd journ\u00e9e',
                color: 'primary' as const,
              },
              {
                text: 'Julien était opérateur de machine. Excel, pour lui, c\'était un mur. Aujourd\'hui, il est responsable d\'atelier \u2014 et il dit se sentir enfin légitime.',
                highlight: 'Op\u00e9rateur \u2192 Responsable',
                color: 'secondary' as const,
              },
              {
                text: 'Franck revenait d\'un arrêt maladie. Il avait peur d\'être largué. Quelques semaines plus tard, ses collègues l\'appelaient \u00ab Monsieur Excel \u00bb.',
                highlight: '\u00ab Monsieur Excel \u00bb',
                color: 'accent' as const,
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-5 md:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-card transition-shadow duration-300">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  i === 0 ? 'bg-primary/10 text-primary' :
                  i === 1 ? 'bg-secondary/10 text-secondary' :
                  'bg-accent/20 text-accent-dark'
                }`}>
                  {testimonial.highlight}
                </span>
                <p className="text-text-light leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg text-text-light leading-relaxed">
            Ces trois personnes n&apos;avaient rien de particulier au d&eacute;part. Juste la
            volont&eacute; de s&apos;y mettre &mdash; et un syst&egrave;me qui leur montrait quoi
            apprendre, dans quel ordre, et comment l&apos;appliquer.
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 - PROJECTION / FUTURECASTING
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8 normal-case">
            Et concr&egrave;tement, qu&apos;est-ce que &ccedil;a change dans ta semaine&nbsp;?
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>Imagine un lundi matin. Tu re&ccedil;ois un fichier &agrave; traiter.</p>
            <p>
              Tu l&apos;ouvres, tu comprends la structure, tu sais exactement par o&ugrave;
              commencer. Pas de boule au ventre. Pas de message Teams &agrave; envoyer. Pas de tuto
              &agrave; chercher en urgence.
            </p>
            <p>
              Ta manager te demande une analyse crois&eacute;e par zone et par trimestre. Tu dis
              &laquo;&nbsp;oui&nbsp;&raquo; &mdash; et cette fois, c&apos;est un vrai oui.
            </p>

            <div className="my-8 p-6 rounded-2xl bg-green-50/70 border border-green-100">
              <p className="text-lg md:text-xl font-medium text-text-dark leading-relaxed">
                Le reporting qui te prenait une journ&eacute;e enti&egrave;re&nbsp;? Tu le boucles
                avant la pause d&eacute;jeuner.
              </p>
            </div>

            <p>
              Et puis un jour, un coll&egrave;gue vient te voir&nbsp;: &laquo;&nbsp;Tu sais comment
              faire un RECHERCHEV&nbsp;?&nbsp;&raquo;
            </p>
            <p>
              Tu souris. Tu lui montres.{' '}
              <strong className="text-text-dark">
                Tu es pass&eacute; de l&apos;autre c&ocirc;t&eacute; &mdash; de celui qui demande
                &agrave; celui qu&apos;on vient voir.
              </strong>
            </p>
            <p>
              Mais ce qui change vraiment, au fond, &ccedil;a n&apos;a pas grand-chose &agrave; voir
              avec Excel.
            </p>
            <p className="font-medium text-text-dark text-xl">
              C&apos;est le soulagement de ne plus porter ce secret professionnel. La
              fiert&eacute; de te dire que tu l&apos;as fait. Et la certitude que si tu as
              &eacute;t&eacute; capable d&apos;apprendre &ccedil;a, tu es capable d&apos;apprendre
              n&apos;importe quoi d&apos;autre.
            </p>
          </div>

          <div className="mt-10">
            <CTASingle />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 - SEUL VS ACCOMPAGNE
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-100/80">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8 normal-case">
            Tu pourrais essayer seul. Mais voil&agrave; ce qui se passe en g&eacute;n&eacute;ral.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              La R&egrave;gle des 95% est simple &agrave; comprendre. Mais l&apos;appliquer seul,
              c&apos;est une autre histoire.
            </p>
            <p>
              Si tu pars seul, tu vas probablement retomber dans le m&ecirc;me sch&eacute;ma.
              Piocher un bout ici, un bout l&agrave;. Comprendre sur le moment. Oublier la semaine
              suivante.
            </p>
            <p>
              Pas par manque de discipline &mdash; mais parce que sans parcours structur&eacute;,{' '}
              <strong className="text-text-dark">
                ton cerveau n&apos;a rien &agrave; quoi accrocher les nouvelles connaissances
              </strong>
              .
            </p>
            <p>
              C&apos;est la diff&eacute;rence entre apprendre une langue en ramassant des mots au
              hasard dans des conversations&hellip; et suivre un cours qui te donne la grammaire, le
              vocabulaire essentiel et les mises en situation pour que &ccedil;a tienne.
            </p>
            <p className="font-medium text-text-dark text-xl">
              Tu as d&eacute;j&agrave; essay&eacute; la premi&egrave;re approche. Tu sais
              o&ugrave; &ccedil;a m&egrave;ne.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 9 - PRESENTATION DU DECOLLAGE
          ================================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 bg-mesh opacity-50" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            La formation
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-6 normal-case">
            Le D&eacute;collage
          </h2>
          <p className="text-lg md:text-xl text-text-light leading-relaxed max-w-2xl mx-auto mb-10">
            Le syst&egrave;me bas&eacute; sur la R&egrave;gle des 95% pour devenir autonome sur
            Excel en quelques semaines, sans apprendre des centaines de formules, sans
            d&eacute;pendre d&apos;un coll&egrave;gue ou de ChatGPT, sans passer tes soir&eacute;es
            &agrave; compenser &mdash; m&ecirc;me si tu n&apos;as jamais eu de vraie formation et
            m&ecirc;me si tu penses ne pas &ecirc;tre fait pour &ccedil;a.
          </p>

          {/* Product mockup */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-card-elevated border border-white/50">
                <Image
                  src="/images/formations/le-decollage/le-decollage-exceleur.png"
                  alt="Formation Le Décollage - Exceleur"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 10 - SOUS-PROMESSES
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-100/80">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-dark mb-10 normal-case">
            Dans Le D&eacute;collage, je te montre &eacute;tape par &eacute;tape les
            m&eacute;thodes pour&nbsp;:
          </h2>

          <div className="space-y-4">
            {[
              "Devenir autonome sur Excel au quotidien (ne plus jamais avoir à déranger un collègue ou à perdre 30 minutes sur Google pour une formule)",
              "Diviser par 2 ou 3 le temps que tu passes sur tes tâches Excel (et récupérer tes soirées et tes week-ends)",
              'Produire des fichiers propres, fiables et professionnels que tu peux partager sans stress (et qui font dire à ton manager "c\'est clair, merci")',
              "Maîtriser les formules et fonctionnalités qui couvrent 95% de tes besoins réels \u2014 et les avoir dans tes réflexes, pas dans tes notes",
              "Retrouver de la sérénité face à Excel : ouvrir un fichier sans boule au ventre, dire \u00ab oui, je gère \u00bb quand on te demande quelque chose",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mt-0.5">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-text-light leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 11 - TEMOIGNAGES #1
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              Preuve sociale
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-3 normal-case">
              Ils ont suivi Le D&eacute;collage
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

      {/* Gradient divider */}
      <div className="section-divider" />

      {/* ================================================================
          SECTION 12 - MODULES
          ================================================================ */}
      <section id="programme" className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              Le programme
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-3 normal-case">
              Parmi ce que tu vas d&eacute;couvrir
            </h2>
            <p className="text-lg text-text-light">
              6 modules pour devenir autonome, &agrave; ton rythme.
            </p>
          </div>

          <div className="space-y-3">
            {modules.map((mod) => {
              const isOpen = openModule === mod.number;
              return (
                <div
                  key={mod.number}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'bg-white shadow-card border-2 border-primary/20'
                      : 'bg-white border border-gray-200 hover:border-primary/20 hover:shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? null : mod.number)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isOpen
                          ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-button'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {mod.number}
                      </span>
                      <span className="font-heading font-bold text-text-dark text-base md:text-lg normal-case">
                        {mod.title}
                      </span>
                    </div>
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-primary text-white rotate-180'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6">
                        <div className="w-full h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent mb-5" />
                        <ul className="space-y-3">
                          {mod.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-text-light">
                              <CheckIcon className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Masterclasses */}
          <div className="mt-16">
            <h3 className="font-heading text-xl md:text-2xl font-extrabold text-text-dark mb-8 text-center normal-case">
              + 4 Masterclass incluses
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {masterclasses.map((mc, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-gray-200 hover:border-secondary/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5 text-secondary flex items-center justify-center text-xs font-bold">
                      MC{i + 1}
                    </span>
                    <h4 className="font-heading font-bold text-text-dark text-sm leading-snug normal-case">
                      {mc.title}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {mc.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text-light">
                        <CheckIcon className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <CTASingle />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 13 - BONUS
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-100/80">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              En plus du programme
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark normal-case">
              Les bonus inclus
            </h2>
          </div>

          <div className="space-y-5">
            {/* Bonus 1 */}
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-card transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  Bonus
                </p>
              </div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3 normal-case">
                Fast Excel &mdash; Les raccourcis qui te font gagner du temps chaque jour
              </h3>
              <p className="text-text-light leading-relaxed">
                La liste ultime des raccourcis qui vont r&eacute;ellement te servir au quotidien
                &mdash; avec une d&eacute;monstration concr&egrave;te de chaque situation o&ugrave;
                les utiliser. Plus mon hack secret pour pr&eacute;remplir les formules en
                2&nbsp;secondes.
              </p>
            </div>

            {/* Bonus 2 */}
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-card transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  Bonus
                </p>
              </div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3 normal-case">
                La m&eacute;thode pour reprendre le fichier d&apos;un coll&egrave;gue
              </h3>
              <p className="text-text-light leading-relaxed">
                Les 6&nbsp;&eacute;tapes pour reprendre le fichier d&apos;un coll&egrave;gue aussi
                facilement que si tu l&apos;avais toi-m&ecirc;me cr&eacute;&eacute; &mdash; et les
                2&nbsp;niveaux de compr&eacute;hension d&apos;un fichier Excel.
              </p>
            </div>

            {/* Bonus 3 */}
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-card transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <p className="text-xs font-bold text-primary uppercase tracking-wide">
                  Bonus
                </p>
              </div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3 normal-case">
                Les mises en forme conditionnelles
              </h3>
              <p className="text-text-light leading-relaxed">
                Comment mettre en &eacute;vidence les tendances cl&eacute;s dans tes fichiers
                gr&acirc;ce aux mises en forme conditionnelles, et surtout le grand danger &agrave;
                &eacute;viter quand tu les utilises.
              </p>
            </div>

            {/* Bonus Lancement - Elyx */}
            <div className="relative p-6 md:p-8 rounded-2xl overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl p-[2px]" style={{ background: 'linear-gradient(135deg, #CB6AED, #5048DD, #7CC3EE, #CB6AED)', backgroundSize: '300% 300%', animation: 'gradient 4s ease infinite' }}>
                <div className="w-full h-full rounded-[14px] bg-white" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full">
                    <SparklesIcon />
                    Bonus lancement
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-text-dark mb-3 normal-case">
                  3 mois offerts d&apos;Elyx &mdash; ton agent IA directement dans Excel
                </h3>
                <p className="text-text-light leading-relaxed mb-4">
                  Elyx, c&apos;est l&apos;add-in Excel que j&apos;ai cr&eacute;&eacute;. Un agent IA autonome, int&eacute;gr&eacute; directement dans ton
                  tableur, qui ex&eacute;cute le travail &agrave; ta place &mdash; ou qui
                  t&apos;explique comment faire si tu pr&eacute;f&egrave;res apprendre.
                </p>
                <p className="text-text-light leading-relaxed mb-4">
                  C&apos;est le compl&eacute;ment parfait du D&eacute;collage&nbsp;: la formation te
                  donne les fondations et les r&eacute;flexes, Elyx te fait gagner du temps sur
                  l&apos;ex&eacute;cution au quotidien.
                </p>
                <p className="text-sm font-bold text-primary">
                  Valeur : 57&euro; &mdash; Offert uniquement du 19 au 24 f&eacute;vrier 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 14 - TEMOIGNAGES #2 + STATS
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          {/* Stats */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[
                { value: '9.4', suffix: '/10', label: 'Note de satisfaction' },
                { value: '9.6', suffix: '/10', label: 'Taux de recommandation' },
                { value: '3 000', suffix: '+', label: 'Élèves depuis 2022' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 md:p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold">
                    <span className="text-gradient">{stat.value}</span>
                    <span className="text-lg md:text-xl text-text-light">{stat.suffix}</span>
                  </p>
                  <p className="text-xs md:text-sm text-text-light mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

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

      {/* ================================================================
          SECTION 15 - BIO
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-100/80">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-10 normal-case">
            Qui suis-je pour te dire &ccedil;a&nbsp;?
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-lg" />
                <Image
                  src="/images/thomas-portrait.png"
                  alt="Thomas, l'Exceleur"
                  width={176}
                  height={176}
                  className="relative rounded-full border-4 border-white shadow-soft"
                />
              </div>
            </div>

            <div className="space-y-5 text-lg text-text-light leading-relaxed">
              <p>
                Salut&nbsp;! C&apos;est <strong className="text-text-dark">Thomas, l&apos;Exceleur</strong>.
              </p>
              <p>
                Pendant 11&nbsp;ans, j&apos;ai travaill&eacute; en entreprise comme comptable puis
                contr&ocirc;leur de gestion. J&apos;ai vu de l&apos;int&eacute;rieur ce qui bloque
                la plupart des gens sur Excel&nbsp;: ce n&apos;est pas un manque de formules,
                c&apos;est un manque de structure.
              </p>
              <p>
                Plus d&apos;<strong className="text-text-dark">1&nbsp;million de personnes</strong> suivent
                mes conseils quotidiens sur Instagram, TikTok, YouTube et LinkedIn. J&apos;ai aussi &eacute;crit le
                livre &laquo;&nbsp;R&eacute;v&egrave;le l&apos;Exceleur qui est en toi&nbsp;!&nbsp;&raquo;
                &eacute;dit&eacute; par <strong className="text-text-dark">Larousse</strong>.
              </p>
              <p>
                J&apos;ai cr&eacute;&eacute; Le D&eacute;collage pour compiler mes meilleures
                m&eacute;thodes de travail dans une formation vraiment concr&egrave;te, avec des
                conseils que tu ne trouveras nulle part ailleurs &mdash; et toujours dans une
                ambiance cool et abordable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 16 - OFFRE / PRIX
          ================================================================ */}
      <section id="offre" className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              L&apos;offre compl&egrave;te
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-4 normal-case">
              Tout ce que tu obtiens imm&eacute;diatement
            </h2>
          </div>

          {/* Premium pricing card */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-xl" />

            <div className="relative p-6 md:p-10 rounded-3xl bg-white overflow-hidden">
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-3xl p-[2px]" style={{ background: 'linear-gradient(135deg, #CB6AED, #5048DD, #7CC3EE)' }}>
                <div className="w-full h-full rounded-[22px] bg-white" />
              </div>

              <div className="relative">
                <div className="space-y-3.5 mb-8">
                  {[
                    'La formation Le Décollage : 6 modules complets pour devenir autonome sur Excel grâce à la Règle des 95%',
                    '4 Masterclass incluses : TCD Expert, les 15 nouvelles formules, LAMBDA & LET, et Réussir les tests Excel en entretien',
                    'Bonus #1 : Fast Excel \u2014 les raccourcis qui te font gagner du temps chaque jour',
                    "Bonus #2 : La méthode pour reprendre le fichier d'un collègue",
                    'Bonus #3 : Les mises en forme conditionnelles',
                    'Les résumés PDF de chaque module',
                    "Des questionnaires express pour t'entraîner",
                    'Des cas pratiques pour appliquer les cours',
                    "Accès à vie à l'ensemble du contenu",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-text-light">{item}</span>
                    </div>
                  ))}

                  {/* Elyx bonus highlighted */}
                  <div className="flex items-start gap-3 p-4 -mx-1 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10">
                    <span className="flex-shrink-0 mt-0.5 text-primary">
                      <SparklesIcon />
                    </span>
                    <span className="font-medium text-text-dark">
                      BONUS LANCEMENT : 3 mois d&apos;Elyx offerts &mdash; ton agent IA dans Excel
                      (valeur&nbsp;: 57&euro;)
                    </span>
                  </div>
                </div>

                {/* Prix */}
                <div className="text-center border-t border-gray-100 pt-8">
                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-2xl md:text-3xl font-heading font-bold text-text-muted line-through">
                      800&euro;
                    </span>
                    <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-lg">
                      -38%
                    </span>
                  </div>
                  <p className="text-6xl md:text-7xl font-heading font-extrabold mb-1">
                    <span className="text-gradient">497&euro;</span>
                  </p>
                  <p className="text-sm text-primary font-medium mb-1">
                    Tarif de lancement &mdash; offre limit&eacute;e
                  </p>
                  <p className="text-text-light mb-8">
                    ou 3x 165,67&euro; sans frais
                  </p>

                  <CTAButtons className="justify-center" />

                  <div className="flex items-center justify-center gap-2 mt-6 text-sm text-text-muted">
                    <LockIcon />
                    <span>Paiement 100% s&eacute;curis&eacute;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Urgence lancement avec countdown */}
          <div className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm md:text-base font-bold text-amber-800">
                  L&apos;offre de lancement se termine dans&nbsp;:
                </p>
              </div>

              {countdown.mounted && !countdown.expired ? (
                <div className="flex items-center gap-2 md:gap-3">
                  {[
                    { value: countdown.days, label: 'jours' },
                    { value: countdown.hours, label: 'heures' },
                    { value: countdown.minutes, label: 'min' },
                    { value: countdown.seconds, label: 'sec' },
                  ].map((unit, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white border border-amber-200 shadow-sm text-amber-900 font-heading font-extrabold text-xl md:text-2xl tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-amber-600 mt-1 font-medium">{unit.label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base font-bold text-amber-800">Offre expir&eacute;e</p>
              )}

              <p className="text-xs md:text-sm text-amber-700 text-center">
                Pass&eacute; ce d&eacute;lai, le bonus Elyx (3&nbsp;mois offerts) et le tarif de lancement ne seront plus disponibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 17 - GARANTIE
          ================================================================ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="p-8 md:p-10 rounded-3xl bg-green-50/70 border border-green-100">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <ShieldIcon />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-dark normal-case">
                Garantie S&eacute;r&eacute;nit&eacute; &mdash; 15&nbsp;jours
              </h2>
            </div>

            <div className="space-y-4 text-lg text-text-light leading-relaxed">
              <p>
                Je sais que c&apos;est un investissement. Et je sais aussi que tu as peut-&ecirc;tre
                d&eacute;j&agrave; pay&eacute; pour des formations qui n&apos;ont rien
                donn&eacute;. C&apos;est pour &ccedil;a que je prends le risque &agrave; ta place.
              </p>
              <p>
                Tu as <strong className="text-text-dark">15&nbsp;jours</strong> pour tester Le
                D&eacute;collage. Sans condition. Sans justification.
              </p>
              <p>
                Si malgr&eacute; &ccedil;a tu sens que Le D&eacute;collage n&apos;est pas fait pour
                toi&nbsp;: tu as juste &agrave; nous envoyer un email &agrave;{' '}
                <a
                  href="mailto:thomas@exceleur.fr"
                  className="text-primary hover:underline"
                >
                  thomas@exceleur.fr
                </a>{' '}
                dans les 15&nbsp;jours suivant ton achat. On te remboursera
                l&apos;int&eacute;gralit&eacute; de ton investissement.
              </p>
              <p className="font-medium text-text-dark text-center text-xl pt-2">
                Tu ne prends donc aucun risque &agrave; essayer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 18 - COUP DE PRESSION
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-100/80">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8 normal-case">
            Soyons honn&ecirc;tes une minute.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Tu sais comment se passe ta semaine sur Excel en ce moment. Tu re&ccedil;ois un
              fichier, ton estomac se noue. Tu passes des heures sur une t&acirc;che qui devrait te
              prendre 20&nbsp;minutes.
            </p>
            <p className="text-xl font-medium text-text-dark">
              Et &ccedil;a, &ccedil;a ne va pas s&apos;arr&ecirc;ter tout seul.
            </p>
            <p>
              Chaque semaine qui passe, c&apos;est 4 &agrave; 5 heures perdues. Sur un an,
              &ccedil;a repr&eacute;sente plus de{' '}
              <strong className="text-text-dark">
                5&nbsp;semaines de travail &agrave; temps plein &mdash; gaspill&eacute;es
              </strong>
              .
            </p>
            <p>
              Mais le pire, ce n&apos;est pas le temps perdu. C&apos;est ce que &ccedil;a te
              co&ucirc;te &eacute;motionnellement. La honte. Le stress. Le doute. Et cette petite
              voix qui te dit &laquo;&nbsp;peut-&ecirc;tre que je ne suis juste pas fait pour
              &ccedil;a&nbsp;&raquo; &mdash; alors que le vrai probl&egrave;me, c&apos;est que
              personne ne t&apos;a jamais form&eacute; correctement.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {/* Option 1 - Muted */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm font-bold">1</span>
                <p className="font-heading font-bold text-text-muted normal-case">Option 1</p>
              </div>
              <p className="text-text-light leading-relaxed">
                Tu ne fais rien. Tu continues de compenser. Dans 6&nbsp;mois, tu es exactement au
                m&ecirc;me endroit &mdash; avec un peu plus de fatigue et un peu moins de confiance.
              </p>
            </div>

            {/* Option 2 - Highlighted */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/30 shadow-card">
              <div className="absolute -top-3 right-4">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full normal-case">
                  Recommand&eacute;
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-sm font-bold">2</span>
                <p className="font-heading font-bold text-primary normal-case">Option 2</p>
              </div>
              <p className="text-text-light leading-relaxed">
                Tu rejoins Le D&eacute;collage. En quelques semaines, tu ma&icirc;trises les
                formules essentielles, tu gagnes des heures chaque semaine. Et tu retrouves la
                s&eacute;r&eacute;nit&eacute; face &agrave; Excel.
              </p>
            </div>
          </div>

          <div className="mt-10 text-lg text-text-light leading-relaxed">
            <p className="text-xl font-medium text-text-dark">
              Mais cette d&eacute;cision a une date limite.
            </p>
            <p className="mt-3">
              L&apos;offre de lancement &mdash; avec le tarif actuel et les 3&nbsp;mois d&apos;Elyx
              offerts &mdash; se termine le{' '}
              <strong className="text-text-dark">
                24&nbsp;f&eacute;vrier 2026 &agrave; minuit
              </strong>
              . Apr&egrave;s &ccedil;a, ces conditions ne reviendront pas.
            </p>
          </div>

          <div className="mt-10">
            <CTAButtons />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 19 - FAQ
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark normal-case">
              Questions fr&eacute;quentes
            </h2>
            <p className="text-text-light mt-3">
              Tu as une question&nbsp;? La r&eacute;ponse est s&ucirc;rement ici.
            </p>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ================================================================
          SECTION 20 - CTA FINAL
          ================================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 normal-case">
            Pr&ecirc;t &agrave; faire d&eacute;coller tes comp&eacute;tences Excel&nbsp;?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Rejoins les 3&nbsp;000+ &eacute;l&egrave;ves qui ont transform&eacute; leur
            fa&ccedil;on de travailler sur Excel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={URL_PAIEMENT_1X}
              className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 bg-white text-primary font-heading font-bold text-base rounded-2xl shadow-card-elevated hover:shadow-glow hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Paiement en 1 fois &mdash; 497&euro;</span>
              <svg
                className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href={URL_PAIEMENT_3X}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-5 bg-white/15 backdrop-blur-sm text-white font-heading font-bold text-base rounded-2xl border border-white/30 hover:bg-white/25 hover:scale-[1.02] transition-all duration-300"
            >
              Paiement en 3 fois &mdash; 3x 165,67&euro;
            </a>
          </div>

          <p className="text-sm text-white/60 mt-8">
            D&apos;autres questions&nbsp;? &Eacute;cris-moi &agrave;{' '}
            <a href="mailto:thomas@exceleur.fr" className="text-white/80 hover:text-white underline">
              thomas@exceleur.fr
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
