'use client';

import { Container } from '@/components/layout/Container';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { FadeIn } from '@/components/ui/FadeIn';

const stats = [
  {
    value: 3000,
    suffix: '+',
    label: 'Stagiaires accompagnés',
    description: 'Des professionnels formés à Excel',
  },
  {
    value: 1,
    suffix: 'M+',
    label: 'Abonnés sur les réseaux',
    description: 'Une communauté engagée',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfaction',
    description: 'Taux de recommandation',
  },
  {
    value: 60000,
    suffix: '+',
    label: 'Lecteurs newsletter',
    description: 'Chaque semaine',
  },
];

export function StatsSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient background with mesh effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-white" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large glowing orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(203,106,237,0.3) 0%, transparent 60%)',
          }}
        />
        {/* Secondary orb */}
        <div
          className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-20 animate-float-medium"
          style={{
            background: 'radial-gradient(circle, rgba(124,195,238,0.4) 0%, transparent 60%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23CB6AED' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10">
        {/* Main headline */}
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-text-dark leading-tight">
              Plus de{' '}
              <span className="relative inline-block">
                <span className="text-gradient">3000</span>
                {/* Decorative underline */}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              </span>
              {' '}stagiaires
              <br className="hidden md:block" />
              accompagnés
            </h2>
          </div>
        </FadeIn>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} direction="up" delay={index * 100}>
              <div className="relative group">
                {/* Card background with glass effect */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg group-hover:shadow-xl group-hover:bg-white/80 transition-all duration-300" />

                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-[1px] bg-white rounded-2xl" />
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(203,106,237,0.3), rgba(124,195,238,0.3))',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'exclude',
                      WebkitMaskComposite: 'xor',
                      padding: '1px',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative p-6 lg:p-8 text-center">
                  {/* Animated number */}
                  <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-gradient mb-2">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2500}
                      className="inline-block"
                    />
                  </div>

                  {/* Label */}
                  <div className="font-heading font-bold text-text-dark text-sm md:text-base mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-text-light text-xs md:text-sm">
                    {stat.description}
                  </div>

                  {/* Decorative dot */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom decorative element */}
        <FadeIn direction="up" delay={500}>
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 shadow-md">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-bold text-primary">
                      {['🎯', '📊', '💡', '⭐'][i - 1]}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-text">
                Rejoignez notre communauté
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
