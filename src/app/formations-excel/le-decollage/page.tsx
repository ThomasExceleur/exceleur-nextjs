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
    question:
      'Est-ce que j\'ai besoin d\'etre "bon en maths" ou d\'avoir des bases techniques pour suivre Le Decollage ?',
    answer:
      "Non. Et c'est justement pour ca que la formation existe. Le Decollage part de zero et construit tes competences brique par brique, dans un ordre logique. Pas de jargon inutile, pas de prerequis. Parmi les eleves, certains n'avaient jamais ecrit une seule formule avant de commencer \u2014 et ils sont devenus autonomes en quelques semaines. Le probleme n'a jamais ete ton niveau. C'etait l'absence d'un parcours structure et adapte.",
  },
  {
    question: 'Quels resultats je peux esperer ?',
    answer:
      "Les resultats dependent de ton implication, mais voici ce qu'on observe regulierement : des eleves qui divisent par 2 ou 3 le temps passe sur leurs taches Excel, qui produisent des fichiers propres et professionnels pour la premiere fois, et qui passent de \u00ab celui qui demande \u00bb a \u00ab celui qu'on vient voir \u00bb. Thierry ecrit aujourd'hui des fichiers pour la base de donnees d'une multinationale. Un autre eleve est devenu l'expert Excel de son bureau en partant de zero.",
  },
  {
    question: 'En combien de temps je vais voir des resultats ?',
    answer:
      "Certains eleves appliquent ce qu'ils apprennent des le premier module \u2014 les fondations et l'organisation de fichiers sont immediatement utilisables dans ton travail. En quelques semaines, a raison de quelques minutes par jour, tu peux avoir couvert les formules essentielles et commencer a automatiser des taches. Le rythme depend de toi : la formation est en videos courtes, accessible a vie, et ta progression est sauvegardee. La formation concentre en 10h de videos tout ce qu'il te faut.",
  },
  {
    question:
      "J'ai deja essaye des tutos YouTube et des formations en ligne sans resultat. Pourquoi ca marcherait cette fois ?",
    answer:
      "Parce que le probleme n'etait pas toi \u2014 c'etait la methode. Les tutos YouTube sont fragmentes, sans fil conducteur. Tu comprends sur le moment, tu oublies le lendemain. Les formations encyclopediques te noient sous 400 formules sans t'apprendre a les utiliser. Le Decollage est construit autour de la Regle des 95% : un socle maitrise en profondeur, qui couvre la quasi-totalite de tes besoins reels. Avec des cas pratiques, des questionnaires express et des resumes PDF pour que ca reste.",
  },
  {
    question: "Je ne suis pas sur d'avoir le temps.",
    answer:
      "La formation est en videos courtes, concues pour delivrer un maximum en un minimum de temps. Tu peux suivre Le Decollage aux heures que tu preferes, sur n'importe quel appareil. En quelques minutes par jour, tu progresses. Et l'acces est a vie. Mais pose-toi la question inverse \u2014 combien de temps tu perds chaque semaine a cause d'Excel ? Les heures que tu investis dans la formation, ce sont des heures que tu recuperes chaque semaine ensuite.",
  },
  {
    question: "Pourquoi payer alors qu'il y a des contenus gratuits sur internet ?",
    answer:
      "Tu as raison, une bonne partie de ce que tu trouveras dans Le Decollage est techniquement accessible sur internet. Et tu as surement deja essaye : des heures sur Google, des tutos YouTube regardes et oublies, des forums incomprehensibles. Le resultat ? Tu es toujours au meme point. Le Decollage te donne tout ce dont tu as besoin, structure dans le bon ordre, avec des methodes de travail que tu ne trouveras nulle part ailleurs.",
  },
  {
    question: "Est-ce que c'est eligible au CPF ?",
    answer: "Non, cette formation n'est pas eligible au CPF.",
  },
  {
    question: "Est-ce qu'il y a une garantie ?",
    answer:
      "Tu beneficies de 15 jours de garantie remboursement integral. Sans condition. Sans justification. Par simple email a thomas@exceleur.fr. Si tu n'es pas satisfait, on te rembourse \u2014 point.",
  },
  {
    question: "C'est quoi Elyx exactement ?",
    answer:
      "Elyx est un add-in Excel developpe par notre equipe. C'est un agent IA autonome qui s'integre directement dans ton tableur. Tu lui decris ce que tu veux faire en langage naturel, et il l'execute : nettoyage de donnees, formules, tableaux croises dynamiques, graphiques, automatisations. Tu peux aussi lui demander de t'expliquer ce qu'il fait pour apprendre en meme temps. Pendant le lancement, tu recois 3 mois d'abonnement offerts (plan Solo, valeur 57\u20ac). Apres les 3 mois, tu es libre de continuer ou non \u2014 aucun engagement.",
  },
];

const modules = [
  {
    number: 1,
    title: 'Poser les fondations pour ne plus jamais mal demarrer un fichier',
    items: [
      "Les reglages indispensables a faire avant meme d'ecrire une seule formule (la plupart des gens sautent cette etape \u2014 et le paient plus tard)",
      'Les 4 manieres de faire appel a une cellule (et comment choisir la bonne a chaque fois pour ne pas casser tes formules)',
      "L'erreur de parametrage meconnue qui a fait perdre dans la nature des milliers de cas positifs a la COVID-19 au Royaume-Uni en 2020 (et que tu fais peut-etre aussi sans le savoir)",
      "Mon secret pour recuperer des classeurs corrompus et ne pas devoir recommencer plusieurs heures de travail",
    ],
  },
  {
    number: 2,
    title: "Creer des fichiers propres, pro et comprehensibles par n'importe qui",
    items: [
      "La strategie qu'il faut TOUJOURS adopter lorsque tu as plusieurs tables de donnees (mais aussi la SEULE exception a cette regle)",
      'Les 17 habitudes a developper pour creer des tableaux professionnels et resistants aux modifications',
      "L'astuce simple a mettre en place pour permettre a n'importe qui de comprendre ton fichier en moins de 2 minutes",
    ],
  },
  {
    number: 3,
    title: 'Maitriser les 70+ formules qui couvrent 95% de tes besoins',
    items: [
      '11 formules puissantes pour etre un crack de la recherche de donnees (RECHERCHEV, INDEX/EQUIV, RECHERCHEX...)',
      '7 formules matricielles dynamiques geniales pour mettre a jour toutes tes donnees d\'un seul coup',
      '8 formules conditionnelles pour devenir le maitre des tests logiques',
      '4 formules peu connues mais indispensables pour te sortir de certaines situations',
      "Et bien d'autres qui elevent le total a plus de 70 formules avec lesquelles tu peux presque tout faire",
    ],
  },
  {
    number: 4,
    title: 'Eliminer 90% des erreurs qui te gachent la vie',
    items: [
      "L'outil genial pour identifier en un coup d'\u0153il l'origine de tes erreurs",
      'La formule qui va sauver ton fichier plein d\'erreurs lorsque tu dois le presenter a tes collegues',
      "Comment anticiper l'erreur la plus frequente sur Excel (celle qui t'arrive a coup sur si tu utilises RECHERCHEV, RECHERCHEX ou INDEX/EQUIV)",
      'La methode du tamis : comment recuperer instantanement toutes tes cellules contenant une erreur',
    ],
  },
  {
    number: 5,
    title: 'Automatiser tes taches repetitives (sans toucher a VBA)',
    items: [
      'Comment importer tes donnees directement sous forme de tableaux a partir de fichiers PDF, CSV, txt, web \u2014 sans ecrire une seule ligne de code',
      'Comment mettre automatiquement a jour tes donnees a partir de ces fichiers, meme si la taille des tableaux change',
      "Un exemple complet d'automatisation que je fais sous tes yeux, a partir d'un cas concret que j'ai moi-meme rencontre",
    ],
  },
  {
    number: 6,
    title: 'Creer des graphiques impactants qui mettent en valeur tes donnees',
    items: [
      'Les differents types de graphiques qu\'il faut absolument connaitre (et maitriser)',
      'Comment choisir le bon graphique qui mettra en valeur tes donnees',
      'La fonctionnalite qui te permet d\'inserer un graphique a l\'interieur d\'une cellule',
      'Comment creer une carte interactive dans Excel',
    ],
  },
];

const masterclasses = [
  {
    title: 'TCD Expert : maitriser les tableaux croises dynamiques comme un pro',
    items: [
      'Un decryptage complet de la formule imbuvable (mais indispensable) pour manipuler tes TCD',
      'Les 5 grands dangers sur les TCD (pour ne plus jamais tomber dans le piege)',
      'Ma methode pour relier plusieurs tableaux dans un seul TCD',
    ],
  },
  {
    title: 'Les 15 nouvelles formules d\'Excel a decouvrir absolument',
    items: [
      '15 formules recentes qui vont te sauver la mise dans pas mal de situations',
      'Je te montre a quoi elles servent, comment les utiliser et dans quelle situation',
    ],
  },
  {
    title: 'LAMBDA et LET : la revolution qui remplace VBA',
    items: [
      '2 fonctions tellement puissantes qu\'elles meritent une masterclass entiere',
      'Comment simplifier des formules existantes et creer tes propres formules en quelques secondes',
    ],
  },
  {
    title: 'Reussir avec brio les tests Excel en entretien de recrutement',
    items: [
      'Les questions theoriques les plus posees',
      'Les 3 types de tests pratiques qu\'on te fera faire',
      'Les exercices incontournables autour de la resolution de problemes',
    ],
  },
];

const testimonialVideosFirst = [
  { vimeoId: '904003571', alt: 'Temoignage Thierry' },
  { vimeoId: '903995368', alt: 'Temoignage Benedicte' },
  { vimeoId: '904000252', alt: 'Temoignage Gaetan' },
];

const testimonialVideosSecond = [
  { vimeoId: '904002361', alt: 'Temoignage Marie' },
  { vimeoId: '904005061', alt: 'Temoignage Elodie' },
  { vimeoId: '904384660', alt: 'Temoignage Clement' },
];

const URL_PAIEMENT_1X = '#offre';
const URL_PAIEMENT_3X = '#offre';

/* ==========================================================================
   CTA BUTTONS
   ========================================================================== */

function CTAButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      <a
        href={URL_PAIEMENT_1X}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-white font-heading font-bold text-base rounded-xl shadow-button hover:bg-primary-hover transition-all duration-200"
      >
        Paiement en 1 fois &mdash; 497&euro;
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
      <a
        href={URL_PAIEMENT_3X}
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-primary font-heading font-bold text-base rounded-xl border-2 border-primary hover:bg-primary/5 transition-all duration-200"
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
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-heading font-bold text-lg rounded-xl shadow-button hover:bg-primary-hover transition-all duration-200 ${className}`}
    >
      Rejoindre Le Decollage
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
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
    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
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

/* ==========================================================================
   PAGE
   ========================================================================== */

export default function LeDecollagePage() {
  const [openModule, setOpenModule] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* ================================================================
          BANNIERE DE LANCEMENT
          ================================================================ */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 text-center">
        <p className="text-sm md:text-base font-medium">
          Offre de lancement : du 19 au 24 fevrier &mdash; Tarif special + 3 mois d&apos;Elyx offerts.{' '}
          <a href="#offre" className="underline font-bold">
            Voir l&apos;offre
          </a>
        </p>
      </div>

      {/* ================================================================
          SECTION 1 - HERO / ACCROCHE
          ================================================================ */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-hero" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-white/80 tracking-widest uppercase mb-8">
            Formation Excel en ligne
          </p>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-tight mb-6">
            Si Excel te prend 15&nbsp;heures par semaine et que tu compenses en
            silence&hellip; Alors sache que le probl&egrave;me n&apos;a jamais
            &eacute;t&eacute; ton niveau.
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-xl mx-auto">
            Et dans la suite de cette page, je vais te montrer pourquoi.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <StarIcon />
              9.4/10 satisfaction
            </span>
            <span className="w-px h-4 bg-white/30" />
            <span>1&nbsp;000+ &eacute;l&egrave;ves form&eacute;s</span>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 - LE CONSTAT
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p className="text-xl font-medium text-text-dark">
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
            <p>
              Pas parce qu&apos;ils sont plus intelligents. Pas parce qu&apos;ils connaissent
              400&nbsp;formules.
            </p>
            <p>
              <strong className="text-text-dark">
                La diff&eacute;rence entre les deux n&apos;a rien &agrave; voir avec le talent, ni
                avec le nombre d&apos;heures pass&eacute;es sur des tutos YouTube.
              </strong>
            </p>
            <p>
              Et si tu fais partie du premier groupe &mdash; si tu portes cette comp&eacute;tence
              manquante comme un secret professionnel que tu n&apos;avoues &agrave; personne &mdash;
              alors ce qui suit va probablement changer ta fa&ccedil;on de voir Excel.
            </p>
            <p className="font-medium text-text-dark">
              Parce que le vrai probl&egrave;me n&apos;est pas celui que tu crois.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 - LA DOULEUR QUOTIDIENNE
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-10">
            Si aujourd&apos;hui Excel te donne cette sensation de nager &agrave;
            contre-courant&hellip;
          </h2>

          <div className="space-y-5 mb-10">
            {[
              "Tu recois un fichier avec 12 onglets et ton premier reflexe, c'est de verifier qui d'autre dans l'equipe pourrait s'en charger",
              'Tu tapes \u00ab RECHERCHEV Excel \u00bb sur Google pour la quatrieme fois ce trimestre \u2014 et tu retombes sur le meme tuto que la derniere fois',
              "Tu construis tes tableaux en empilant des copier-coller et des formules en dur, en croisant les doigts pour que rien ne se decale",
              'Tu acquiesces en reunion quand on parle de \u00ab pivoter les donnees \u00bb\u2026 sans oser demander ce que ca veut dire concretement',
              "Tu vois le junior arrive il y a 6 mois sortir un dashboard impeccable en 2 heures \u2014 le genre de fichier que tu ne saurais meme pas commencer",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-lg text-text-light leading-relaxed">
                <span className="text-primary font-bold mt-0.5 flex-shrink-0">&rarr;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p className="font-medium text-text-dark">
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
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8">
            Alors tu as cherch&eacute; des solutions. Et &agrave; chaque fois, &ccedil;a a
            donn&eacute; la m&ecirc;me chose.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Peut-&ecirc;tre que &ccedil;a a commenc&eacute; par YouTube. Tu as tap&eacute;
              &laquo;&nbsp;apprendre Excel&nbsp;&raquo;, tu es tomb&eacute; sur une vid&eacute;o
              &laquo;&nbsp;Les 10&nbsp;formules indispensables&nbsp;&raquo;.
            </p>
            <p>
              Tu as compris sur le moment. Le lendemain, devant ton fichier, c&apos;&eacute;tait
              d&eacute;j&agrave; flou.
            </p>
            <p>
              Alors tu as essay&eacute; autre chose. Un MOOC. Une formation en ligne. Tu as tenu
              quelques jours, peut-&ecirc;tre deux semaines.
            </p>
            <p>
              Et puis le quotidien a repris le dessus. La formation est rest&eacute;e ouverte dans
              un onglet pendant un mois avant que tu la refermes d&eacute;finitivement.
            </p>
            <p>
              Tu as peut-&ecirc;tre aussi test&eacute; ChatGPT. Tu lui d&eacute;cris ton
              probl&egrave;me, il te crache une formule. Tu la colles dans ta cellule, &ccedil;a
              marche &mdash; ou pas.
            </p>
            <p>
              Mais dans les deux cas, tu n&apos;as rien compris &agrave; ce qui vient de se passer.
              La prochaine fois, tu es toujours aussi d&eacute;pendant.{' '}
              <strong className="text-text-dark">Tu as juste chang&eacute; de b&eacute;quille.</strong>
            </p>
            <p>
              Le point commun de toutes ces tentatives&nbsp;?
            </p>
            <p>
              Elles t&apos;ont donn&eacute; des morceaux &mdash; une formule ici, une astuce
              l&agrave; &mdash; mais jamais le tableau complet. Comme essayer de construire une
              maison en r&eacute;cup&eacute;rant des briques &agrave; droite &agrave; gauche.{' '}
              <strong className="text-text-dark">Sans plan. Sans fondations.</strong>
            </p>
            <p className="font-medium text-text-dark">
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8">
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

          {/* Encadre Regle des 95% */}
          <div className="my-10 p-8 border-l-4 border-primary bg-white rounded-r-2xl shadow-sm">
            <p className="text-xl md:text-2xl font-heading font-bold text-text-dark mb-3">
              La R&egrave;gle des 95%
            </p>
            <p className="text-lg text-text-light leading-relaxed">
              Un socle de formules bien ma&icirc;tris&eacute;es &mdash; pas 400, pas 200, mais les
              bonnes &mdash; couvre{' '}
              <strong className="text-text-dark">
                95% de ce que tu as besoin de faire au quotidien
              </strong>
              .
            </p>
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
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8">
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

          {/* Temoignages texte */}
          <div className="mt-10 space-y-6">
            {[
              {
                text: 'Une eleve passait 3 jours par mois sur son reporting. Apres avoir applique la Regle des 95%, elle a reduit ca a une demi-journee. Sur un an, c\'est l\'equivalent de 30 jours de travail recuperes.',
                highlight: '3 jours \u2192 une demi-journee',
              },
              {
                text: 'Julien etait operateur machine. Excel, pour lui, c\'etait un mur. Aujourd\'hui, il est responsable d\'atelier \u2014 et il dit se sentir enfin legitime.',
                highlight: 'Operateur \u2192 Responsable d\'atelier',
              },
              {
                text: 'Franck revenait d\'un arret maladie. Il avait peur d\'etre largue. Quelques semaines plus tard, ses collegues l\'appelaient \u00ab Monsieur Excel \u00bb.',
                highlight: '\u00ab Monsieur Excel \u00bb',
              },
            ].map((testimonial, i) => (
              <div key={i} className="pl-6 border-l-4 border-gray-200">
                <p className="text-sm font-bold text-primary mb-2">{testimonial.highlight}</p>
                <p className="text-lg text-text-light leading-relaxed">{testimonial.text}</p>
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8">
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
            <p>
              <strong className="text-text-dark">
                Le reporting qui te prenait une journ&eacute;e enti&egrave;re&nbsp;? Tu le boucles
                avant la pause d&eacute;jeuner.
              </strong>
            </p>
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
            <p className="font-medium text-text-dark">
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
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8">
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
            <p className="font-medium text-text-dark">
              Tu as d&eacute;j&agrave; essay&eacute; la premi&egrave;re approche. Tu sais
              o&ugrave; &ccedil;a m&egrave;ne.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 9 - PRESENTATION DU DECOLLAGE
          ================================================================ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            La formation
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-dark mb-4">
            Le D&eacute;collage
          </h2>
          <p className="text-lg md:text-xl text-text-light leading-relaxed max-w-2xl mx-auto mb-6">
            Le syst&egrave;me bas&eacute; sur la R&egrave;gle des 95% pour devenir autonome sur
            Excel en quelques semaines, sans apprendre des centaines de formules, sans
            d&eacute;pendre d&apos;un coll&egrave;gue ou de ChatGPT, sans passer tes soir&eacute;es
            &agrave; compenser &mdash; m&ecirc;me si tu n&apos;as jamais eu de vraie formation et
            m&ecirc;me si tu penses ne pas &ecirc;tre fait pour &ccedil;a.
          </p>

          {/* Placeholder mockup */}
          <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
              <p className="text-text-muted text-sm">Visuel de la formation Le D&eacute;collage</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 10 - SOUS-PROMESSES
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-dark mb-8">
            Dans Le D&eacute;collage, je te montre &eacute;tape par &eacute;tape les
            m&eacute;thodes pour&nbsp;:
          </h2>

          <div className="space-y-5">
            {[
              "Devenir autonome sur Excel au quotidien (ne plus jamais avoir a deranger un collegue ou a perdre 30 minutes sur Google pour une formule)",
              "Diviser par 2 ou 3 le temps que tu passes sur tes taches Excel (et recuperer tes soirees et tes week-ends)",
              'Produire des fichiers propres, fiables et professionnels que tu peux partager sans stress (et qui font dire a ton manager "c\'est clair, merci")',
              "Maitriser les formules et fonctionnalites qui couvrent 95% de tes besoins reels \u2014 et les avoir dans tes reflexes, pas dans tes notes",
              "Retrouver de la serenite face a Excel : ouvrir un fichier sans boule au ventre, dire \u00ab oui, je gere \u00bb quand on te demande quelque chose",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                  <CheckIcon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-lg text-text-light leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 11 - TEMOIGNAGES #1
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-3">
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

      {/* ================================================================
          SECTION 12 - MODULES
          ================================================================ */}
      <section id="programme" className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-3">
            Parmi ce que tu vas d&eacute;couvrir
          </h2>
          <p className="text-lg text-text-light mb-12">
            6 modules pour devenir autonome, &agrave; ton rythme.
          </p>

          <div className="space-y-4">
            {modules.map((mod) => {
              const isOpen = openModule === mod.number;
              return (
                <div
                  key={mod.number}
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenModule(isOpen ? null : mod.number)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {mod.number}
                      </span>
                      <span className="font-heading font-bold text-text-dark text-base md:text-lg">
                        {mod.title}
                      </span>
                    </div>
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
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
                      <div className="px-6 pb-5">
                        <div className="w-full h-px bg-gray-100 mb-4" />
                        <ul className="space-y-3">
                          {mod.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-text-light">
                              <span className="text-primary mt-1.5 flex-shrink-0">&#8226;</span>
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
            <h3 className="font-heading text-xl md:text-2xl font-extrabold text-text-dark mb-8">
              + 4 Masterclass incluses
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {masterclasses.map((mc, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold">
                      MC{i + 1}
                    </span>
                    <h4 className="font-heading font-bold text-text-dark text-sm leading-snug">
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

          <div className="mt-12">
            <CTASingle />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 13 - BONUS
          ================================================================ */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-10 text-center">
            Les bonus inclus
          </h2>

          <div className="space-y-6">
            {/* Bonus 1 */}
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200">
              <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">
                Bonus #1
              </p>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
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
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200">
              <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">
                Bonus #2
              </p>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                La m&eacute;thode pour reprendre le fichier d&apos;un coll&egrave;gue
              </h3>
              <p className="text-text-light leading-relaxed">
                Les 6&nbsp;&eacute;tapes pour reprendre le fichier d&apos;un coll&egrave;gue aussi
                facilement que si tu l&apos;avais toi-m&ecirc;me cr&eacute;&eacute; &mdash; et les
                2&nbsp;niveaux de compr&eacute;hension d&apos;un fichier Excel.
              </p>
            </div>

            {/* Bonus 3 */}
            <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200">
              <p className="text-sm font-bold text-primary uppercase tracking-wide mb-2">
                Bonus #3
              </p>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                Les mises en forme conditionnelles
              </h3>
              <p className="text-text-light leading-relaxed">
                Comment mettre en &eacute;vidence les tendances cl&eacute;s dans tes fichiers
                gr&acirc;ce aux mises en forme conditionnelles, et surtout le grand danger &agrave;
                &eacute;viter quand tu les utilises.
              </p>
            </div>

            {/* Bonus Lancement - Elyx */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border-2 border-primary/20 relative">
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full">
                  <SparklesIcon />
                  Bonus lancement
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                  3 mois offerts d&apos;Elyx &mdash; ton assistant IA directement dans Excel
                </h3>
                <p className="text-text-light leading-relaxed mb-4">
                  Elyx, c&apos;est l&apos;add-in Excel que j&apos;ai cr&eacute;&eacute; avec mon
                  &eacute;quipe. Un agent IA autonome, int&eacute;gr&eacute; directement dans ton
                  tableur, qui ex&eacute;cute le travail &agrave; ta place &mdash; ou qui
                  t&apos;explique comment faire si tu pr&eacute;f&egrave;res apprendre.
                </p>
                <p className="text-text-light leading-relaxed mb-4">
                  C&apos;est le compl&eacute;ment parfait du D&eacute;collage&nbsp;: la formation te
                  donne les fondations et les r&eacute;flexes, Elyx te fait gagner du temps sur
                  l&apos;ex&eacute;cution au quotidien.
                </p>
                <p className="text-sm font-medium text-primary">
                  Valeur : 57&euro; &mdash; Offert uniquement du 19 au 24 f&eacute;vrier 2025.
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
                  1&nbsp;000+
                </p>
                <p className="text-sm text-text-light mt-1">
                  &Eacute;l&egrave;ves depuis 2022
                </p>
              </div>
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-10">
            Qui suis-je pour te dire &ccedil;a&nbsp;?
          </h2>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <Image
                src="/images/thomas-portrait.png"
                alt="Thomas, l'Exceleur"
                width={160}
                height={160}
                className="rounded-full"
              />
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
                Plus de <strong className="text-text-dark">400&nbsp;000 personnes</strong> suivent
                mes conseils quotidiens sur Instagram et TikTok. J&apos;ai aussi &eacute;crit le
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
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-4">
              Tout ce que tu obtiens imm&eacute;diatement
            </h2>
          </div>

          <div className="p-6 md:p-10 border-2 border-gray-200 rounded-2xl bg-white">
            <div className="space-y-4 mb-8">
              {[
                'La formation Le Decollage : 6 modules complets pour devenir autonome sur Excel grace a la Regle des 95%',
                '4 Masterclass incluses : TCD Expert, les 15 nouvelles formules, LAMBDA & LET, et Reussir les tests Excel en entretien',
                'Bonus #1 : Fast Excel \u2014 les raccourcis qui te font gagner du temps chaque jour',
                "Bonus #2 : La methode pour reprendre le fichier d'un collegue",
                'Bonus #3 : Les mises en forme conditionnelles',
                'Les resumes PDF de chaque module',
                "Des questionnaires express pour t'entrainer",
                'Des cas pratiques pour appliquer les cours',
                "Acces a vie a l'ensemble du contenu",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-text-light">{item}</span>
                </div>
              ))}

              {/* Elyx bonus highlighted */}
              <div className="flex items-start gap-3 p-3 -mx-3 rounded-xl bg-primary/5">
                <span className="flex-shrink-0 mt-0.5">
                  <SparklesIcon />
                </span>
                <span className="font-medium text-text-dark">
                  BONUS LANCEMENT : 3 mois d&apos;Elyx offerts &mdash; ton assistant IA dans Excel
                  (valeur&nbsp;: 57&euro;)
                </span>
              </div>
            </div>

            {/* Prix */}
            <div className="text-center border-t border-gray-100 pt-8">
              <p className="text-5xl md:text-6xl font-heading font-extrabold text-text-dark mb-2">
                497&euro;
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

          {/* Urgence lancement */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <p className="text-sm md:text-base font-medium text-amber-800">
              Offre de lancement : du 19 au 24 f&eacute;vrier 2025 &agrave; minuit.
              Pass&eacute; ce d&eacute;lai, le bonus Elyx (3&nbsp;mois offerts) et le tarif de
              lancement ne seront plus disponibles.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 17 - GARANTIE
          ================================================================ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
            <ShieldIcon />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-dark mb-4">
            Garantie S&eacute;r&eacute;nit&eacute; &mdash; 15&nbsp;jours
          </h2>
          <div className="space-y-4 text-lg text-text-light leading-relaxed text-left">
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
            <p className="font-medium text-text-dark text-center">
              Tu ne prends donc aucun risque &agrave; essayer.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 18 - COUP DE PRESSION
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-8">
            Soyons honn&ecirc;tes une minute.
          </h2>

          <div className="space-y-6 text-lg text-text-light leading-relaxed">
            <p>
              Tu sais comment se passe ta semaine sur Excel en ce moment. Tu re&ccedil;ois un
              fichier, ton estomac se noue. Tu passes des heures sur une t&acirc;che qui devrait te
              prendre 20&nbsp;minutes.
            </p>
            <p>
              <strong className="text-text-dark">Et &ccedil;a, &ccedil;a ne va pas
              s&apos;arr&ecirc;ter tout seul.</strong>
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

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {/* Option 1 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50">
              <p className="font-heading font-bold text-text-dark mb-3">Option 1</p>
              <p className="text-text-light leading-relaxed">
                Tu ne fais rien. Tu continues de compenser. Dans 6&nbsp;mois, tu es exactement au
                m&ecirc;me endroit &mdash; avec un peu plus de fatigue et un peu moins de confiance.
              </p>
            </div>

            {/* Option 2 */}
            <div className="p-6 rounded-2xl border-2 border-primary/30 bg-primary/5">
              <p className="font-heading font-bold text-primary mb-3">Option 2</p>
              <p className="text-text-light leading-relaxed">
                Tu rejoins Le D&eacute;collage. En quelques semaines, tu ma&icirc;trises les
                formules essentielles, tu gagnes des heures chaque semaine. Et tu retrouves la
                s&eacute;r&eacute;nit&eacute; face &agrave; Excel.
              </p>
            </div>
          </div>

          <div className="mt-8 text-lg text-text-light leading-relaxed">
            <p>
              <strong className="text-text-dark">Mais cette d&eacute;cision a une date limite.</strong>
            </p>
            <p className="mt-3">
              L&apos;offre de lancement &mdash; avec le tarif actuel et les 3&nbsp;mois d&apos;Elyx
              offerts &mdash; se termine le{' '}
              <strong className="text-text-dark">
                24&nbsp;f&eacute;vrier 2025 &agrave; minuit
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
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-3 text-center">
            Questions fr&eacute;quentes
          </h2>
          <p className="text-text-light text-center mb-10">
            Tu as une question&nbsp;? La r&eacute;ponse est s&ucirc;rement ici.
          </p>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ================================================================
          SECTION 20 - CTA FINAL
          ================================================================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-dark mb-4">
            Pr&ecirc;t &agrave; faire d&eacute;coller tes comp&eacute;tences Excel&nbsp;?
          </h2>
          <p className="text-lg text-text-light mb-8 max-w-lg mx-auto">
            Rejoins les 1&nbsp;000+ &eacute;l&egrave;ves qui ont transform&eacute; leur
            fa&ccedil;on de travailler sur Excel.
          </p>

          <CTAButtons className="justify-center" />

          <p className="text-sm text-text-muted mt-8">
            D&apos;autres questions&nbsp;? &Eacute;cris-moi &agrave;{' '}
            <a href="mailto:thomas@exceleur.fr" className="text-primary hover:underline">
              thomas@exceleur.fr
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
