'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const chapters = [
  {
    number: '01',
    title: 'Les bases',
    description: 'Je réponds aux 2 questions les plus souvent posées sur les TCD.',
  },
  {
    number: '02',
    title: 'Créer un TCD',
    description: 'Ce dont tu as absolument besoin pour avoir un TCD fiable et comment le mettre en place.',
  },
  {
    number: '03',
    title: 'Manipuler les TCD et leurs données',
    description: 'Les 5 conseils essentiels pour montrer à tes collègues que tu maîtrises cet outil.',
  },
  {
    number: '04',
    title: 'Changer le format d\u2019un TCD',
    description: 'Personnalise ton TCD pour en faire absolument ce que tu veux.',
  },
  {
    number: '05',
    title: 'Les grands dangers des TCD',
    description: 'Les erreurs à ne jamais faire au risque de passer pour quelqu\u2019un d\u2019incompétent.',
  },
];

/* ------------------------------------------------------------------ */
/*  Popup Modal                                                        */
/* ------------------------------------------------------------------ */

function PopupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/guide-tcd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => {
          router.push('/thank-you-guide-ultime-tcd/');
        }, 1500);
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Recevoir le guide"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:text-text-dark hover:bg-gray-100 transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white mb-4">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-text-dark">
            Je veux Recevoir ce guide
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="popup-email" className="block text-sm font-medium text-text-dark mb-1.5">
            E-mail
          </label>
          <input
            id="popup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3.5 rounded-xl text-body text-text placeholder:text-text-light/60 bg-gray-50 border border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 mb-3"
          />

          <Button
            type="submit"
            size="lg"
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 text-white"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Envoi...
              </span>
            ) : status === 'success' ? (
              'Redirection...'
            ) : (
              "C'est parti !"
            )}
          </Button>

          {message && (
            <div
              className={cn(
                'mt-3 text-sm p-3 rounded-lg text-center',
                status === 'success'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-600'
              )}
            >
              {message}
            </div>
          )}

          <p className="text-xs text-text-light/70 text-center mt-4 leading-relaxed">
            En soumettant ce formulaire vous consentez à ce que TCD Apps, en sa qualité de responsable de traitement, collecte vos données afin de vous envoyer des communications par voie électronique. Vous pourrez vous désabonner à tout moment. Pour faire valoir votre droit d&apos;accès, de rectification ou d&apos;effacement, consultez notre{' '}
            <a href="/declaration-de-confidentialite-ue/" className="underline hover:text-text-light">
              politique de confidentialité
            </a>.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Client Component                                              */
/* ------------------------------------------------------------------ */

export function GuideUltimeTcdClient() {
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = useCallback(() => setPopupOpen(true), []);
  const closePopup = useCallback(() => setPopupOpen(false), []);

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600" />

        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)' }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full opacity-15 animate-float-medium"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative z-10">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Le guide ultime des{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">TCD</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-white/20 -skew-x-2 rounded" />
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto">
                Dis adieu aux prises de têtes, pertes de temps, et mises à jour manuelles de tes tableaux.
              </p>

              <Button
                size="lg"
                onClick={openPopup}
                className="bg-white text-emerald-700 hover:bg-white/90 border-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base font-bold px-8"
              >
                Je veux le recevoir !
              </Button>
            </div>
          </FadeIn>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-12 lg:h-16" preserveAspectRatio="none">
            <path fill="white" d="M0,40 C480,80 960,0 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ───────── C'EST FRUSTRANT ───────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark">
                C&apos;est frustrant :
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-6">
            <FadeIn direction="up">
              <p className="text-lg text-text leading-relaxed">
                Tu as entendu parler des Tableaux Croisés Dynamiques (les fameux TCD) dans Excel, tu sais qu&apos;ils sont très utiles et surpuissants.
              </p>
              <p className="text-lg font-bold text-text-dark mt-4">
                Problème : Tu ne sais pas comment les utiliser.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <p className="text-lg text-text leading-relaxed">
                Tu en as déjà fait quelques-uns, sans résultat convaincant. Alors tu es allé sur Google. T&apos;as trouvé quelques blogs et forums sur lesquels on en parle. Sauf que ce sont souvent des infos limitées : Soit elles utilisent une ancienne version d&apos;Excel. Ou alors elles sont incomplètes.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <p className="text-lg text-text leading-relaxed">
                Tu tentes quand même d&apos;appliquer ce que tu as trouvé (tant bien que mal).
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <p className="text-lg text-text leading-relaxed">
                Au début ça fonctionne bien, mais c&apos;est temporaire. Quand tu mets à jour ton fichier Excel, tu as des erreurs – ou pire plus rien ne marche.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={400}>
              <p className="text-lg text-text leading-relaxed">
                Alors tu en es réduit à faire tes tableaux à la main. Pourtant tu sais qu&apos;avec un TCD tu aurais pu le faire en un temps record.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={500}>
              <p className="text-lg font-semibold text-text-dark">
                Tu as l&apos;impression de ne rien comprendre, d&apos;être dépassé.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ───────── MA SOLUTION À TON PROBLÈME ───────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-emerald-50/50">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8 text-center">
                Ma solution à ton problème
              </h2>

              <p className="text-lg text-text leading-relaxed mb-6">
                Au début de ma carrière j&apos;étais dans ta situation
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                  Je construisais des TCD pour m&apos;apercevoir qu&apos;ensuite ils n&apos;affichaient pas la donnée que je voulais
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                  Je perdais des heures à chercher comment résoudre un problème, alors que la solution était à portée de clic
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                  Je voyais mes collègues faire des TCD qu&apos;on aurait dit sortis tout droit de la NASA
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                  Je me sentais freiné dans ma carrière parce que je ne maîtrisais pas les TCD
                </li>
              </ul>

              <p className="text-lg font-semibold text-text-dark mb-6">
                Je me suis rendu compte que je n&apos;allais jamais progresser si je continuais comme ça.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                Alors j&apos;ai cherché une solution – et j&apos;ai fini par la trouver.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                J&apos;ai créé une méthode qui m&apos;a permis de mettre en place des tas d&apos;outils de suivi, d&apos;analyse et de reporting très rapidement.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                Ça m&apos;a permis de faire un bond dans ma carrière.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                Tout ça juste en maîtrisant ces outils ultrapuissants que sont les TCD.
              </p>

              <p className="text-lg text-text leading-relaxed mb-8">
                C&apos;est une compétence qui s&apos;apprend, et qui se pratique.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                J&apos;ai condensé le meilleur de ce que j&apos;ai appris dans une formation GRATUITE. Tu y apprendras comment :
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <svg className="flex-shrink-0 w-5 h-5 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mettre en place des TCD qui répondent à tes besoins
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <svg className="flex-shrink-0 w-5 h-5 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gagner plusieurs heures par semaine à l&apos;aide de ces outils
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <svg className="flex-shrink-0 w-5 h-5 text-emerald-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Passer d&apos;énormes fichiers de données à des tableaux de suivi simples et visuels
                </li>
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───────── QUI EST THOMAS L'EXCELEUR ? ───────── */}
      <section className="py-16 lg:py-24 bg-emerald-50/50">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-8">
                Qui est Thomas l&apos;Exceleur ?
              </h2>

              <p className="text-lg text-text leading-relaxed mb-6">
                Je suis Thomas Coget, dit Thomas l&apos;Exceleur.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                Plus de 1 million de personnes apprennent à mieux maîtriser Excel en me suivant sur les réseaux sociaux.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                J&apos;ai + de 10 ans d&apos;expérience dans les fonctions financières de plusieurs entreprises.
              </p>

              <p className="text-lg text-text leading-relaxed">
                Grâce à ça, j&apos;ai accumulé plusieurs milliers d&apos;heures de pratique sur Excel – ça m&apos;a permis d&apos;en maîtriser tous les ressorts.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───────── LA FORMATION QUE TU VAS RECEVOIR ───────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4 text-center">
                La formation que tu vas recevoir
              </h2>

              <p className="text-lg text-text leading-relaxed mb-4 text-center">
                C&apos;est un guide de + de 20 pages qui te permettra de réellement maîtriser cet outil. Fini les prises de têtes, tu vas passer pour un magicien des TCD.
              </p>

              <p className="text-lg font-bold text-text-dark mb-8 text-center">
                Le contenu de cette formation :
              </p>
            </div>
          </FadeIn>

          <div className="max-w-2xl mx-auto space-y-4">
            {chapters.map((chapter, i) => (
              <FadeIn key={chapter.number} direction="up" delay={i * 80}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-heading font-bold text-sm group-hover:scale-105 transition-transform">
                    {chapter.number}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-text-dark mb-1">{chapter.title}</h3>
                    <p className="text-sm text-text-light">{chapter.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn direction="up" delay={500}>
            <div className="text-center mt-10">
              <Button
                size="lg"
                onClick={openPopup}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base font-bold px-8"
              >
                Je veux le recevoir !
              </Button>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───────── POPUP ───────── */}
      <PopupModal open={popupOpen} onClose={closePopup} />
    </>
  );
}
