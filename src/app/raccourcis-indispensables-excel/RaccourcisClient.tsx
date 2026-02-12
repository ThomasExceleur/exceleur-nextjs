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
    title: 'Navigation',
    description: 'Se déplacer rapidement dans un classeur sans toucher la souris.',
  },
  {
    number: '02',
    title: 'Sélection',
    description: 'Sélectionner efficacement des plages de données en un instant.',
  },
  {
    number: '03',
    title: 'Édition',
    description: 'Copier, coller, annuler, et bien plus — les raccourcis du quotidien.',
  },
  {
    number: '04',
    title: 'Mise en forme',
    description: 'Mettre en forme tes cellules sans jamais quitter le clavier.',
  },
  {
    number: '05',
    title: 'Formules',
    description: 'Les raccourcis pour travailler plus vite avec les formules.',
  },
  {
    number: '06',
    title: 'Productivité',
    description: 'Les raccourcis avancés pour aller encore plus vite au quotidien.',
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
      const response = await fetch('/api/guide-raccourcis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => {
          router.push('/thank-you-raccourcis-excel/');
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white mb-4">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
            className="w-full px-4 py-3.5 rounded-xl text-body text-text placeholder:text-text-light/60 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 mb-3"
          />

          <Button
            type="submit"
            size="lg"
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-0 text-white"
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
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-red-50 text-red-600'
              )}
            >
              {message}
            </div>
          )}

          <p className="text-xs text-text-light/70 text-center mt-4 leading-relaxed">
            En soumettant ce formulaire vous consentez à ce que Exceleur, en sa qualité de responsable de traitement, collecte vos données afin de vous envoyer des communications par voie électronique. Vous pourrez vous désabonner à tout moment. Pour faire valoir votre droit d&apos;accès, de rectification ou d&apos;effacement, consultez notre{' '}
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

export function RaccourcisClient() {
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = useCallback(() => setPopupOpen(true), []);
  const closePopup = useCallback(() => setPopupOpen(false), []);

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600" />

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
                Fais exploser ta{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">productivité</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-white/20 -skew-x-2 rounded" />
                </span>
                {' '}sur Excel
              </h1>

              <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto">
                Arrête d&apos;avancer aussi vite qu&apos;un escargot. Télécharge les raccourcis clavier qui vont tout changer.
              </p>

              <Button
                size="lg"
                onClick={openPopup}
                className="bg-white text-blue-700 hover:bg-white/90 border-0 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base font-bold px-8"
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
                Tu perds un temps fou à naviguer dans tes classeurs Excel avec la souris. Tu cliques, tu scrolles, tu cherches le bon menu...
              </p>
              <p className="text-lg font-bold text-text-dark mt-4">
                Problème : Tu sais que les raccourcis clavier existent, mais tu ne les retiens jamais.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <p className="text-lg text-text leading-relaxed">
                Tu as déjà essayé d&apos;apprendre quelques raccourcis. Ctrl+C, Ctrl+V, ok. Mais au-delà de ça, tu ne sais pas lesquels sont vraiment utiles. Il y en a des centaines — et les listes que tu trouves sur Internet sont soit trop longues, soit incomplètes.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <p className="text-lg text-text leading-relaxed">
                Résultat : tu copies-colles cellule par cellule, tu mets en forme à la souris, tu navigues onglet par onglet.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <p className="text-lg text-text leading-relaxed">
                Pendant ce temps, tu vois tes collègues aller deux fois plus vite que toi. Leurs doigts volent sur le clavier et ils enchaînent les actions sans jamais toucher la souris.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={400}>
              <p className="text-lg font-semibold text-text-dark">
                Tu te sens freiné. Tu sais que tu pourrais être bien plus efficace.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ───────── MA SOLUTION À TON PROBLÈME ───────── */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/50">
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
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500" />
                  Je perdais un temps fou à chercher les bons menus avec la souris
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500" />
                  Je faisais tout manuellement alors que des raccourcis existaient
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500" />
                  Je voyais mes collègues être 2x plus rapides que moi sur Excel
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500" />
                  Je me sentais freiné dans ma productivité au quotidien
                </li>
              </ul>

              <p className="text-lg font-semibold text-text-dark mb-6">
                Je me suis rendu compte que je n&apos;allais jamais progresser si je continuais comme ça.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                Alors j&apos;ai identifié les raccourcis qui font vraiment la différence — ceux que j&apos;utilise tous les jours.
              </p>

              <p className="text-lg text-text leading-relaxed mb-6">
                J&apos;ai condensé les raccourcis essentiels dans un guide GRATUIT. Tu y apprendras comment :
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Naviguer à la vitesse de l&apos;éclair sans toucher la souris
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gagner plusieurs heures par semaine grâce aux raccourcis
                </li>
                <li className="flex items-start gap-3 text-lg text-text leading-relaxed">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Avoir tous les raccourcis essentiels sous la main, organisés par catégorie
                </li>
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───────── QUI EST THOMAS L'EXCELEUR ? ───────── */}
      <section className="py-16 lg:py-24 bg-blue-50/50">
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
                Grâce à ça, j&apos;ai accumulé plusieurs milliers d&apos;heures de pratique sur Excel — ça m&apos;a permis d&apos;en maîtriser tous les ressorts.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───────── LE GUIDE QUE TU VAS RECEVOIR ───────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4 text-center">
                Le guide que tu vas recevoir
              </h2>

              <p className="text-lg text-text leading-relaxed mb-4 text-center">
                C&apos;est un aide-mémoire complet avec tous les raccourcis clavier Excel qui comptent vraiment. Fini les recherches Google — tu auras tout sous la main.
              </p>

              <p className="text-lg font-bold text-text-dark mb-8 text-center">
                Le contenu de ce guide :
              </p>
            </div>
          </FadeIn>

          <div className="max-w-2xl mx-auto space-y-4">
            {chapters.map((chapter, i) => (
              <FadeIn key={chapter.number} direction="up" delay={i * 80}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-heading font-bold text-sm group-hover:scale-105 transition-transform">
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
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-0 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base font-bold px-8"
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
