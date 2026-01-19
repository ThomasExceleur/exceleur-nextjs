'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  variant?: 'primary' | 'secondary' | 'gradient' | 'dark';
  className?: string;
  badge?: string;
}

const variantStyles = {
  primary: {
    bg: 'bg-gradient-to-br from-primary via-primary-hover to-secondary',
    text: 'text-white',
    button: 'bg-white text-primary hover:bg-gray-50',
    secondaryButton: 'bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50',
  },
  secondary: {
    bg: 'bg-gradient-to-br from-secondary via-secondary to-primary',
    text: 'text-white',
    button: 'bg-white text-secondary hover:bg-gray-50',
    secondaryButton: 'bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50',
  },
  gradient: {
    bg: 'bg-gradient-to-br from-primary via-accent to-secondary',
    text: 'text-white',
    button: 'bg-white text-primary hover:bg-gray-50',
    secondaryButton: 'bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50',
  },
  dark: {
    bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    text: 'text-white',
    button: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30',
    secondaryButton: 'bg-transparent text-white border-2 border-white/20 hover:bg-white/5 hover:border-white/40',
  },
};

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref,
  variant = 'primary',
  className,
  badge,
}: CTASectionProps) {
  const styles = variantStyles[variant];

  return (
    <section className={cn('py-20 lg:py-28', className)}>
      <Container>
        <FadeIn direction="up">
          <div
            className={cn(
              'relative overflow-hidden rounded-3xl p-10 md:p-14 lg:p-20 text-center',
              styles.bg
            )}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Floating orbs */}
              <div
                className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 animate-float-slow"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
                }}
              />
              <div
                className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-15 animate-float-medium"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
                }}
              />

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M30 30m-2 0a2,2 0 1,0 4,0a2,2 0 1,0 -4,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
              {/* Badge */}
              {badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-medium text-white/90">{badge}</span>
                </div>
              )}

              {/* Title */}
              <h2 className={cn(
                'text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold mb-6 leading-tight',
                styles.text
              )}>
                {title}
              </h2>

              {/* Description */}
              {description && (
                <p className={cn(
                  'text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed',
                  styles.text
                )}>
                  {description}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={buttonHref}
                  className={cn(
                    'group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-base no-underline overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl',
                    styles.button
                  )}
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative">{buttonText}</span>
                  <svg className="w-5 h-5 relative transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {secondaryButtonText && secondaryButtonHref && (
                  <Link
                    href={secondaryButtonHref}
                    className={cn(
                      'group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-base no-underline transition-all duration-300',
                      styles.secondaryButton
                    )}
                  >
                    {secondaryButtonText}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent" />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
