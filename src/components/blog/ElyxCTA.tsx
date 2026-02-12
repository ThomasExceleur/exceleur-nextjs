const ELYX_BASE_URL = 'https://getelyxai.com';
const UTM_PARAMS = '?utm_source=blog&utm_medium=cta&utm_campaign=ad_inserter';

interface ElyxCTAProps {
  variant: 'intro' | 'mid' | 'end';
}

const ctaConfig = {
  intro: {
    headline: 'Automatisez vos t\u00e2ches Excel avec l\u2019IA',
    description:
      'Elyx AI analyse vos donn\u00e9es et g\u00e9n\u00e8re des formules Excel en quelques secondes.',
    buttonText: 'Essayer Elyx gratuitement \u2192',
    gradientClasses: 'from-secondary via-secondary/90 to-primary',
  },
  mid: {
    headline: 'Formules Excel complexes\u00a0? Laissez l\u2019IA les \u00e9crire pour vous',
    description:
      'Ne perdez plus de temps \u00e0 chercher la bonne syntaxe. Elyx g\u00e9n\u00e8re vos formules en quelques secondes.',
    buttonText: 'D\u00e9couvrir Elyx',
    gradientClasses: 'from-primary via-primary/90 to-accent',
  },
  end: {
    headline: 'Gagnez des heures sur Excel chaque semaine',
    description:
      'Rejoignez les milliers d\u2019utilisateurs qui automatisent leurs t\u00e2ches Excel avec Elyx AI.',
    buttonText: 'Commencer gratuitement',
    gradientClasses: 'from-primary via-secondary/90 to-secondary',
  },
};

export function ElyxCTA({ variant }: ElyxCTAProps) {
  const config = ctaConfig[variant];
  const href = `${ELYX_BASE_URL}${UTM_PARAMS}`;

  return (
    <div
      className={`relative my-10 overflow-hidden rounded-2xl bg-gradient-to-r ${config.gradientClasses} p-6 md:p-8`}
    >
      {/* Decorative floating orb */}
      <div
        className="absolute -top-1/3 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M30 30m-2 0a2,2 0 1,0 4,0a2,2 0 1,0 -4,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* AI sparkle icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-white text-lg leading-snug mb-1">
            {config.headline}
          </p>
          <p className="text-white/80 text-sm leading-relaxed">
            {config.description}
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full font-heading font-bold text-sm text-primary no-underline shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
        >
          <span className="relative">{config.buttonText}</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
