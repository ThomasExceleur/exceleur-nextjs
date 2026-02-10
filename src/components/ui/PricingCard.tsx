'use client';

import { cn } from '@/lib/utils';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  features: PricingFeature[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({
  title,
  subtitle,
  price,
  priceNote,
  features,
  ctaText,
  ctaHref,
  highlighted = false,
  badge,
  className = '',
}: PricingCardProps) {
  return (
    <div className={cn('relative group', className)}>
      {/* Glow effect for highlighted card */}
      {highlighted && (
        <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500 -z-10" />
      )}

      {/* Badge - outside overflow-hidden container to avoid clipping */}
      {(highlighted || badge) && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-heading font-bold shadow-lg whitespace-nowrap',
              highlighted
                ? 'bg-accent text-text-dark'
                : 'bg-gradient-to-r from-primary to-secondary text-white'
            )}
          >
            {badge || 'Recommandé'}
          </div>
        </div>
      )}

      <div
        className={cn(
          'relative rounded-3xl p-6 lg:p-8 transition-all duration-500 overflow-hidden',
          highlighted
            ? 'bg-gradient-to-br from-primary via-primary-hover to-secondary text-white shadow-2xl scale-105 z-10'
            : 'bg-white border border-gray-100 shadow-card-elevated hover:shadow-card-hover hover:-translate-y-1'
        )}
      >
        {/* Decorative background elements for highlighted card */}
        {highlighted && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20 animate-float-slow"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
                }}
              />
              <div
                className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full opacity-15 animate-float-medium"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
                }}
              />
            </div>
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
              }}
            />
          </>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6 pt-2">
            <h3
              className={cn(
                'text-xl font-heading font-bold mb-2',
                highlighted ? 'text-white' : 'text-gradient'
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                'text-sm',
                highlighted ? 'text-white/80' : 'text-text-light'
              )}
            >
              {subtitle}
            </p>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div
              className={cn(
                'text-4xl lg:text-5xl font-heading font-extrabold mb-1',
                highlighted ? 'text-white' : 'text-text-dark'
              )}
            >
              {price}
            </div>
            {priceNote && (
              <p className={cn(
                'text-xs',
                highlighted ? 'text-white/60' : 'text-text-light'
              )}>
                {priceNote}
              </p>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {feature.included ? (
                  <div className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                    highlighted
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br from-green-400 to-green-500'
                  )}>
                    <svg
                      className={cn(
                        'w-3 h-3',
                        highlighted ? 'text-accent' : 'text-white'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                    highlighted ? 'bg-white/10' : 'bg-gray-100'
                  )}>
                    <svg
                      className={cn(
                        'w-3 h-3',
                        highlighted ? 'text-white/40' : 'text-gray-300'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
                <span
                  className={cn(
                    'text-sm',
                    feature.included
                      ? highlighted
                        ? 'text-white'
                        : 'text-text'
                      : highlighted
                      ? 'text-white/40 line-through'
                      : 'text-gray-400 line-through'
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href={ctaHref}
            className={cn(
              'group/btn relative block w-full text-center py-4 px-6 rounded-2xl font-heading font-bold transition-all duration-300 overflow-hidden no-underline',
              highlighted
                ? 'bg-white text-primary hover:bg-gray-50 shadow-lg'
                : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-[1.02]'
            )}
          >
            {/* Shine effect */}
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative flex items-center justify-center gap-2">
              {ctaText}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Corner decoration */}
        {!highlighted && (
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/5 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
