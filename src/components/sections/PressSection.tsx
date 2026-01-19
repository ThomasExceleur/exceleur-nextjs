'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { FadeIn } from '@/components/ui/FadeIn';

interface PressItem {
  name: string;
  logo: string;
  url?: string;
  description?: string;
  quote?: string;
}

interface PressSectionProps {
  items?: PressItem[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'cards' | 'minimal' | 'quotes';
  className?: string;
}

const defaultPressItems: PressItem[] = [
  {
    name: 'Pose ta Dem',
    logo: '/images/logos/podcast-pose-ta-dem.png',
    url: '#',
    description: 'Podcast entrepreneuriat',
  },
  {
    name: 'Les Geeks des Chiffres',
    logo: '/images/logos/podcast-geek-chiffres.png',
    url: '#',
    description: 'Podcast finance & data',
  },
];

export function PressSection({
  items = defaultPressItems,
  title = 'Ils parlent de nous',
  subtitle,
  variant = 'default',
  className,
}: PressSectionProps) {
  // Quotes variant
  if (variant === 'quotes') {
    return (
      <section className={cn('py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white', className)}>
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="text-sm font-medium text-primary">Presse</span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                {title}
              </h2>
              {subtitle && (
                <p className="text-lg text-text-light max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <FadeIn key={item.name} direction="up" delay={index * 0.1}>
                <div className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                  {/* Quote icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary/60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Logo */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center p-2">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-auto h-12 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text-dark">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-text-light">{item.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Quote */}
                  {item.quote && (
                    <p className="text-text italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  )}

                  {/* Link */}
                  {item.url && (
                    <Link
                      href={item.url}
                      target="_blank"
                      className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:text-primary-hover transition-colors group/link"
                    >
                      Lire l&apos;article
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Cards variant
  if (variant === 'cards') {
    return (
      <section className={cn('py-16 lg:py-24 bg-white', className)}>
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
                {title}
              </h2>
              {subtitle && (
                <p className="text-lg text-text-light max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <FadeIn key={item.name} direction="up" delay={index * 0.1}>
                <Link
                  href={item.url || '#'}
                  target={item.url ? '_blank' : undefined}
                  className="group relative block bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/30 hover:shadow-card transition-all duration-300"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gray-50 flex items-center justify-center p-4 mb-4 group-hover:bg-primary/5 transition-colors duration-300">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-auto h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-text-dark mb-1">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-text-light">{item.description}</p>
                    )}

                    {/* Arrow indicator */}
                    <div className="mt-4 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                      <svg className="w-4 h-4 text-text-light group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <section className={cn('py-12 bg-gray-50', className)}>
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <span className="text-sm font-medium text-text-light uppercase tracking-wider">
              {title}
            </span>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {items.map((item, index) => (
                <FadeIn key={item.name} direction="up" delay={index * 0.1}>
                  {item.url ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={120}
                        height={60}
                        className="w-auto h-10 md:h-12 object-contain"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={120}
                      height={60}
                      className="w-auto h-10 md:h-12 object-contain opacity-60"
                    />
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Default variant
  return (
    <section className={cn('py-16 lg:py-24 bg-white', className)}>
      <Container>
        <FadeIn direction="up">
          <div className="text-center mb-12">
            {/* Decorative element */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/50 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-secondary/50 to-transparent rounded-full" />
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-text-light max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        </FadeIn>

        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
          {items.map((item, index) => (
            <FadeIn key={item.name} direction="up" delay={index * 0.15}>
              <div className="group relative">
                {/* Hover background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {item.url ? (
                  <Link
                    href={item.url}
                    target="_blank"
                    className="relative block"
                  >
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={150}
                      height={80}
                      className="w-auto h-16 md:h-20 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                    />
                  </Link>
                ) : (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={150}
                    height={80}
                    className="relative w-auto h-16 md:h-20 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                  />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
