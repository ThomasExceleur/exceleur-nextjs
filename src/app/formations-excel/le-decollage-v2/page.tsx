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
   CTA BUTTON
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
   Séquence slippery slide : Accroche → Douleur → Solutions échouées →
   Mécanisme (Règle 95%) → Crédibilité → Projection → Seul vs accompagné →
   Présentation formation → Preuve #1 → Programme → À qui → Preuve #2 →
   Offre → Garantie → FAQ → CTA final
   ========================================================================== */

export default function LeDecollageV2Page() {
  return (
    <div className="bg-white">

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 1 — ACCROCHE / HERO
          ──────────────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-text-light tracking-widest uppercase mb-8">
            Exceleur
          </p>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-text-dark leading-tight mb-6">
            Si Excel te prend 15&nbsp;heures par semaine et que tu compenses en silence… Alors sache que le problème n&apos;a jamais été ton niveau.
          </h1>

          <p className="text-lg md:text-xl text-text-light leading-relaxed mb-10 max-w-xl mx-auto">
            Et dans la suite de cette page, je vais te montrer pourquoi.
          </p>

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
          SECTION 2 — LE CONSTAT (Des gens brillants galèrent)
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Il y a des gens brillants qui galèrent sur Excel.
            </p>
            <p>
              Des managers respectés. Des commerciaux qui dépassent leurs objectifs chaque trimestre.
              Des comptables avec 20&nbsp;ans de métier. Des chefs de projet qui gèrent des équipes
              de 15&nbsp;personnes sans sourciller.
            </p>
            <p>
              Et pourtant, quand ils reçoivent un fichier Excel un peu costaud,{' '}
              <strong className="text-text-dark">leur estomac se noue.</strong>
            </p>
            <p>
              Ils copient-collent ligne par ligne. Ils envoient un message à &laquo;&nbsp;celui qui gère&nbsp;&raquo;
              en s&apos;excusant de déranger. Ils restent une heure de plus le soir pour finir un truc
              qu&apos;un stagiaire bouclerait en 20&nbsp;minutes.
            </p>
            <p>
              À l&apos;inverse, il y a des gens avec moitié moins d&apos;expérience qui ouvrent le même
              fichier et le traitent les doigts dans le nez.
            </p>
            <p>
              Pas parce qu&apos;ils sont plus intelligents. Pas parce qu&apos;ils connaissent 400&nbsp;formules.
            </p>
            <p>
              <strong className="text-text-dark">
                La différence entre les deux n&apos;a rien à voir avec le talent, ni avec le nombre
                d&apos;heures passées sur des tutos YouTube.
              </strong>
            </p>
            <p>
              Et si tu fais partie du premier groupe — si tu portes cette compétence manquante comme
              un secret professionnel que tu n&apos;avoues à personne — alors ce qui suit va probablement
              changer ta façon de voir Excel.
            </p>
            <p className="font-medium text-text-dark">
              Parce que le vrai problème n&apos;est pas celui que tu crois.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 3 — LA DOULEUR QUOTIDIENNE
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-10">
            Si aujourd&apos;hui Excel te donne cette sensation de nager à contre-courant…
          </h2>

          <div className="space-y-5 text-lg text-text-light leading-relaxed mb-10">
            <p>
              → Tu reçois un fichier avec 12&nbsp;onglets et ton premier réflexe, c&apos;est de vérifier
              qui d&apos;autre dans l&apos;équipe pourrait s&apos;en charger
            </p>
            <p>
              → Tu tapes &laquo;&nbsp;RECHERCHEV Excel&nbsp;&raquo; sur Google pour la quatrième fois ce trimestre
              — et tu retombes sur le même tuto que la dernière fois, sans te souvenir pourquoi ça n&apos;avait pas marché
            </p>
            <p>
              → Tu construis tes tableaux en empilant des copier-coller et des formules en dur,
              en croisant les doigts pour que rien ne se décale — et tu sauvegardes 3&nbsp;versions du fichier &laquo;&nbsp;au cas où&nbsp;&raquo;
            </p>
            <p>
              → Tu acquiesces en réunion quand on parle de &laquo;&nbsp;pivoter les données&nbsp;&raquo; ou de
              &laquo;&nbsp;croiser par trimestre et par zone&nbsp;&raquo;… sans oser demander ce que ça veut dire concrètement
            </p>
            <p>
              → Tu vois le junior arrivé il y a 6&nbsp;mois sortir un dashboard impeccable en 2&nbsp;heures
              — le genre de fichier que tu ne saurais même pas commencer
            </p>
          </div>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p className="font-medium text-text-dark">
              Et le plus insidieux dans tout ça ? C&apos;est ce que ça provoque en toi. Sans que tu le dises à personne.
            </p>
            <p>
              C&apos;est possible que tu rentres certains soirs avec une fatigue qui n&apos;a rien à voir
              avec la charge de travail. Juste l&apos;énergie mentale qu&apos;Excel te pompe.
            </p>
            <p>
              Que tu te retrouves à compenser le soir ou le week-end pour boucler des tâches que d&apos;autres
              expédient avant la pause café.
            </p>
            <p>
              Si tu as 10, 15 ou 20&nbsp;ans de carrière et que tu te surprends à penser
              &laquo;&nbsp;à mon âge, je devrais savoir faire ça&nbsp;&raquo;… alors il y a de fortes chances
              que cette pensée contamine le reste.
            </p>
            <p>
              Que tu commences à douter. Pas juste de ton niveau sur Excel.{' '}
              <strong className="text-text-dark">De ta capacité à apprendre tout court.</strong>
            </p>
            <p>
              Et pendant ce temps, personne ne sait. Parce que ce n&apos;est pas le genre de truc qu&apos;on
              avoue à son manager ou à ses collègues. On fait semblant. On contourne. On compense.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 4 — LES SOLUTIONS ÉCHOUÉES
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
            Alors tu as cherché des solutions. Et à chaque fois, ça a donné la même chose.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Peut-être que ça a commencé par YouTube. Tu as tapé &laquo;&nbsp;apprendre Excel&nbsp;&raquo;,
              tu es tombé sur une vidéo &laquo;&nbsp;Les 10&nbsp;formules indispensables&nbsp;&raquo;.
            </p>
            <p>
              Tu as compris sur le moment. Le lendemain, devant ton fichier, c&apos;était déjà flou.
            </p>
            <p>
              Alors tu as essayé autre chose. Un MOOC. Une formation en ligne. Tu as tenu quelques jours,
              peut-être deux semaines.
            </p>
            <p>
              Et puis le quotidien a repris le dessus. La formation est restée ouverte dans un onglet
              pendant un mois avant que tu la refermes définitivement.
            </p>
            <p>
              Tu as peut-être aussi testé ChatGPT. Tu lui décris ton problème, il te crache une formule.
              Tu la colles dans ta cellule, ça marche — ou pas.
            </p>
            <p>
              Mais dans les deux cas, tu n&apos;as rien compris à ce qui vient de se passer. La prochaine fois,
              tu es toujours aussi dépendant.{' '}
              <strong className="text-text-dark">Tu as juste changé de béquille.</strong>
            </p>
            <p>
              Le point commun de toutes ces tentatives ?
            </p>
            <p>
              Elles t&apos;ont donné des morceaux — une formule ici, une astuce là — mais jamais le tableau complet.
              Comme essayer de construire une maison en récupérant des briques à droite à gauche.{' '}
              <strong className="text-text-dark">Sans plan. Sans fondations.</strong>
            </p>
            <p>
              Et si rien de tout ça n&apos;a marché, ce n&apos;est pas parce que tu manques de volonté ou de capacités.
            </p>
            <p className="font-medium text-text-dark">
              C&apos;est parce que ces méthodes ne sont pas conçues pour t&apos;amener quelque part.
              Elles sont conçues pour répondre à une question ponctuelle — pas pour te rendre autonome.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 5 — LE MÉCANISME (Règle des 95%)
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
            Ce qu&apos;on ne t&apos;a jamais dit sur Excel
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Tout le monde aborde Excel de la même manière&nbsp;: empiler des formules.
              Plus tu en connais, meilleur tu es.
            </p>
            <p>
              C&apos;est ce que disent les tutos YouTube, les formations en ligne, les livres
              &laquo;&nbsp;400&nbsp;formules Excel pour tout maîtriser&nbsp;&raquo;.
            </p>
            <p className="font-medium text-text-dark">
              Et c&apos;est exactement pour ça que ça ne marche pas.
            </p>
            <p>
              Le problème n&apos;a jamais été le nombre de formules que tu connais. Le problème, c&apos;est
              que personne ne t&apos;a appris à <strong className="text-text-dark">structurer ta manière de travailler</strong> sur Excel.
            </p>
            <p>
              Tu empiles des briques sans fondations. Alors forcément, à chaque nouveau fichier, tout vacille.
            </p>
            <p>
              Pendant 11&nbsp;ans en entreprise, j&apos;ai vu passer des centaines de professionnels dans la
              même situation que toi. Des gens compétents, rigoureux, intelligents — qui galéraient sur Excel.
            </p>
            <p>
              En observant ceux qui étaient vraiment à l&apos;aise, j&apos;ai remarqué quelque chose de contre-intuitif.
            </p>
            <p>
              <strong className="text-text-dark">
                Ils n&apos;utilisaient pas plus de formules que les autres. Ils en utilisaient moins.
              </strong>{' '}
              Mais ils les maîtrisaient en profondeur — et surtout, ils avaient une structure de travail solide derrière.
            </p>
            <p>
              C&apos;est un principe que le sociologue Vilfredo Pareto a mis en lumière il y a plus d&apos;un siècle&nbsp;:
              dans n&apos;importe quel domaine, une minorité d&apos;éléments produit la majorité des résultats.
            </p>
            <p>
              Microsoft l&apos;a vérifié en interne — corriger 20% des bugs les plus signalés éliminait 80% des crashes.
              En linguistique, 1&nbsp;000&nbsp;mots suffisent à couvrir 80% des conversations dans n&apos;importe quelle langue.
            </p>
            <p>
              Sur Excel, c&apos;est pareil.
            </p>
          </div>

          {/* Encadré Règle des 95% */}
          <div className="my-10 p-8 border-l-4 border-primary bg-white rounded-r-xl">
            <p className="text-xl md:text-2xl font-heading font-bold text-text-dark mb-3">
              La Règle des 95%
            </p>
            <p className="text-lg text-text-light leading-relaxed">
              Un socle de formules bien maîtrisées — pas 400, pas 200, mais les bonnes — couvre{' '}
              <strong className="text-text-dark">95% de ce que tu as besoin de faire au quotidien</strong>.
            </p>
          </div>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Et la solution, ce n&apos;est pas d&apos;apprendre toujours plus. C&apos;est de maîtriser ce socle
              en profondeur, dans le bon ordre, avec les bonnes méthodes de travail autour.
            </p>
            <p className="font-medium text-text-dark">
              Que chaque formule devienne un réflexe — pas quelque chose que tu dois re-googler à chaque fois.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 6 — CRÉDIBILITÉ (11 ans en entreprise)
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
            Comment je le sais&nbsp;? Parce que je l&apos;ai vu de l&apos;intérieur pendant 11&nbsp;ans.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Avant de créer du contenu sur Excel, j&apos;ai passé 6&nbsp;ans en comptabilité
              puis 5&nbsp;ans en contrôle de gestion. En entreprise. Avec des fichiers réels,
              des deadlines réelles, et des collègues réels qui me demandaient de l&apos;aide.
            </p>
            <p>
              Ce que j&apos;ai observé, encore et encore&nbsp;? Les gens qui progressaient le plus vite
              n&apos;étaient pas ceux qui apprenaient le plus de formules.
            </p>
            <p>
              <strong className="text-text-dark">
                C&apos;étaient ceux qui avaient un cadre de travail clair.
              </strong>{' '}
              Comment structurer un fichier. Quelles formules utiliser dans quelle situation.
              Comment les combiner pour résoudre un problème en 3&nbsp;étapes au lieu de 15.
            </p>
            <p>
              J&apos;ai construit mon approche autour de ça. Et les résultats parlent d&apos;eux-mêmes.
            </p>
          </div>

          {/* Témoignages texte */}
          <div className="mt-10 space-y-8">
            <div className="pl-6 border-l-4 border-gray-200">
              <p className="text-lg text-text-light leading-relaxed mb-2">
                Une élève passait <strong className="text-text-dark">3&nbsp;jours par mois</strong> sur son reporting.
                Après avoir appliqué la Règle des 95%, elle a réduit ça à{' '}
                <strong className="text-text-dark">une demi-journée</strong>.
                Sur un an, c&apos;est l&apos;équivalent de 30&nbsp;jours de travail récupérés.
                Elle a depuis pris plus de responsabilités dans son poste.
              </p>
            </div>
            <div className="pl-6 border-l-4 border-gray-200">
              <p className="text-lg text-text-light leading-relaxed mb-2">
                <strong className="text-text-dark">Julien</strong> était opérateur machine. Excel, pour lui, c&apos;était un mur.
                Aujourd&apos;hui, il est responsable d&apos;atelier — et il dit se sentir enfin légitime,
                parce qu&apos;il maîtrise l&apos;outil que son poste exige.
              </p>
            </div>
            <div className="pl-6 border-l-4 border-gray-200">
              <p className="text-lg text-text-light leading-relaxed mb-2">
                <strong className="text-text-dark">Franck</strong> revenait d&apos;un arrêt maladie.
                Il avait peur d&apos;être largué, dépassé par les évolutions.
                Quelques semaines plus tard, ses collègues l&apos;appelaient &laquo;&nbsp;Monsieur Excel&nbsp;&raquo;.
              </p>
            </div>
          </div>

          <p className="mt-8 text-lg text-text-light leading-relaxed">
            Ces trois personnes n&apos;avaient rien de particulier au départ. Juste la volonté
            de s&apos;y mettre — et un système qui leur montrait quoi apprendre, dans quel ordre,
            et comment l&apos;appliquer.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 7 — PROJECTION (Ce que ça change dans ta semaine)
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
            Et concrètement, qu&apos;est-ce que ça change dans ta semaine&nbsp;?
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Imagine un lundi matin. Tu reçois un fichier à traiter.
            </p>
            <p>
              Tu l&apos;ouvres, tu comprends la structure, tu sais exactement par où commencer.
              Pas de boule au ventre. Pas de message Teams à envoyer. Pas de tuto à chercher en urgence.
            </p>
            <p>
              Ta manager te demande une analyse croisée par zone et par trimestre.
              Tu dis &laquo;&nbsp;oui&nbsp;&raquo; — et cette fois, c&apos;est un vrai oui.
            </p>
            <p>
              Tu ouvres un tableau croisé dynamique, tu configures les champs, tu envoies le résultat
              dans l&apos;heure. Propre. Lisible. Professionnel.
            </p>
            <p>
              <strong className="text-text-dark">Le reporting qui te prenait une journée entière&nbsp;?
              Tu le boucles avant la pause déjeuner.</strong>
            </p>
            <p>
              Les heures que tu passais le soir à compenser, tu les récupères.
              Tu rentres chez toi à l&apos;heure. Sans cette fatigue sourde qui n&apos;avait rien à voir avec ton métier.
            </p>
            <p>
              Et puis un jour, un collègue vient te voir&nbsp;: &laquo;&nbsp;Tu sais comment faire un RECHERCHEV&nbsp;?&nbsp;&raquo;
            </p>
            <p>
              Tu souris. Tu lui montres.{' '}
              <strong className="text-text-dark">
                Tu es passé de l&apos;autre côté — de celui qui demande à celui qu&apos;on vient voir.
              </strong>
            </p>
            <p>
              Mais ce qui change vraiment, au fond, ça n&apos;a pas grand-chose à voir avec Excel.
            </p>
            <p>
              C&apos;est le soulagement de ne plus porter ce secret professionnel. La fierté de te dire
              que tu l&apos;as fait — que ce truc qui te bloquait depuis des années, tu l&apos;as dépassé.
            </p>
            <p className="font-medium text-text-dark">
              Et la certitude, désormais, que si tu as été capable d&apos;apprendre ça,
              tu es capable d&apos;apprendre n&apos;importe quoi d&apos;autre.
            </p>
          </div>

          <div className="mt-10">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 8 — SEUL VS ACCOMPAGNÉ
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
            Tu pourrais essayer seul. Mais voilà ce qui se passe en général.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              La Règle des 95% est simple à comprendre. Mais l&apos;appliquer seul, c&apos;est une autre histoire.
            </p>
            <p>
              Il ne suffit pas de connaître la règle. Il faut savoir quelles formules font partie de ce socle.
              Dans quel ordre les apprendre. Et comment les relier entre elles pour construire des fichiers solides.
            </p>
            <p>
              Si tu pars seul, tu vas probablement retomber dans le même schéma. Piocher un bout ici,
              un bout là. Comprendre sur le moment. Oublier la semaine suivante.
            </p>
            <p>
              Pas par manque de discipline — mais parce que sans parcours structuré,{' '}
              <strong className="text-text-dark">ton cerveau n&apos;a rien à quoi accrocher les nouvelles connaissances</strong>.
            </p>
            <p>
              C&apos;est la différence entre apprendre une langue en ramassant des mots au hasard dans des conversations…
              et suivre un cours qui te donne la grammaire, le vocabulaire essentiel et les mises en situation
              pour que ça tienne.
            </p>
            <p className="font-medium text-text-dark">
              Tu as déjà essayé la première approche. Tu sais où ça mène.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 9 — PRÉSENTATION DU DÉCOLLAGE
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
            C&apos;est pour ça que j&apos;ai créé Le Décollage.
          </h2>
          <p className="text-lg md:text-xl text-text-light leading-relaxed max-w-2xl mx-auto">
            C&apos;est le système que j&apos;aurais voulu avoir quand j&apos;accompagnais mes collègues en entreprise.
            Un parcours structuré, étape par étape, construit autour de la Règle des 95% — pour que tu
            maîtrises exactement ce dont tu as besoin, dans le bon ordre, sans te noyer dans des centaines
            de formules que tu n&apos;utiliseras jamais.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 10 — PREUVE SOCIALE #1
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
          SECTION 11 — PROGRAMME / CONTENU
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
          SECTION 12 — À QUI C'EST DESTINÉ
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-10">
            Est-ce que Le Décollage est fait pour toi&nbsp;?
          </h2>

          <div className="space-y-10">
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
          SECTION 13 — PREUVE SOCIALE #2
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
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
          SECTION 14 — L'OFFRE / PRIX
          ──────────────────────────────────────────────────────────────────── */}
      <section id="offre" className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4 text-center">
            Investis dans ton avenir
          </h2>
          <p className="text-lg text-text-light text-center mb-10">
            Choisis la formule qui te convient
          </p>

          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-100">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-heading text-lg font-bold text-text-dark">
                  Version Complète
                </h3>
                <span className="font-heading text-2xl font-extrabold text-text-dark">800 &euro;</span>
              </div>
              <p className="text-sm text-text-light">Les 6 modules + fiches PDF + quiz + cas pratiques</p>
            </div>

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

            <div className="px-8 pb-8 pt-4 text-center">
              <CTAButton className="w-full sm:w-auto" />
            </div>
          </div>

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
          SECTION 15 — GARANTIE
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
            Tu disposes d&apos;un délai de 14&nbsp;jours pour exercer ton droit de rétractation.
            Si la formation ne te convient pas, tu es intégralement remboursé. Sans condition.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          SECTION 16 — FAQ
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
          SECTION 17 — CTA FINAL
          ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
            Prêt à faire décoller tes compétences Excel&nbsp;?
          </h2>
          <p className="text-lg text-text-light mb-8 max-w-lg mx-auto">
            Rejoins les 1&nbsp;000+ élèves qui ont transformé leur façon de travailler sur Excel.
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
