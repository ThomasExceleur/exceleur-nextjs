'use client';

import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from './SectionTitle';
import { FeatureCard, FeatureIcons } from './FeatureCard';
import { FadeIn } from '@/components/ui/FadeIn';

interface Feature {
  icon: keyof typeof FeatureIcons | React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'cards' | 'minimal' | 'alternating' | 'centered';
  cardVariant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'gradient';
  background?: 'white' | 'gray' | 'gradient' | 'dark';
  className?: string;
  animated?: boolean;
}

export function Features({
  title,
  subtitle,
  badge,
  features,
  columns = 4,
  variant = 'default',
  cardVariant = 'default',
  background = 'white',
  className,
  animated = true,
}: FeaturesProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-primary/5 via-white to-secondary/5',
    dark: 'bg-gradient-to-br from-text-dark via-gray-900 to-text-dark',
  };

  // Centered variant with large icons
  if (variant === 'centered') {
    return (
      <section className={cn('py-16 lg:py-24 relative overflow-hidden', bgStyles[background], className)}>
        {/* Background decorations for gradient/dark backgrounds */}
        {(background === 'gradient' || background === 'dark') && (
          <>
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl" />
          </>
        )}

        <Container className="relative">
          {title && (
            <FadeIn direction="up">
              <div className="text-center mb-12 lg:mb-16">
                {badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <span className={cn('text-sm font-medium', background === 'dark' ? 'text-white' : 'text-primary')}>
                      {badge}
                    </span>
                  </div>
                )}
                <h2 className={cn(
                  'font-heading text-3xl md:text-4xl font-extrabold mb-4',
                  background === 'dark' ? 'text-white' : 'text-text-dark'
                )}>
                  {title}
                </h2>
                {subtitle && (
                  <p className={cn(
                    'text-lg max-w-2xl mx-auto',
                    background === 'dark' ? 'text-white/70' : 'text-text-light'
                  )}>
                    {subtitle}
                  </p>
                )}
              </div>
            </FadeIn>
          )}

          <div className={cn('grid grid-cols-1 gap-8 lg:gap-12', gridCols[columns])}>
            {features.map((feature, index) => (
              <FadeIn key={index} direction="up" delay={animated ? index * 100 : 0}>
                <div className="text-center group">
                  {/* Large icon */}
                  <div className={cn(
                    'w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                    background === 'dark'
                      ? 'bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30'
                      : 'bg-gradient-to-br from-primary/10 to-secondary/10'
                  )}>
                    <div className={cn(
                      'w-10 h-10',
                      background === 'dark' ? 'text-white' : 'text-primary'
                    )}>
                      {typeof feature.icon === 'string'
                        ? FeatureIcons[feature.icon as keyof typeof FeatureIcons]
                        : feature.icon}
                    </div>
                  </div>

                  <h3 className={cn(
                    'font-heading text-lg font-bold mb-2',
                    background === 'dark' ? 'text-white' : 'text-text-dark'
                  )}>
                    {feature.title}
                  </h3>
                  <p className={cn(
                    'text-sm leading-relaxed max-w-xs mx-auto',
                    background === 'dark' ? 'text-white/70' : 'text-text-light'
                  )}>
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Alternating variant with zigzag layout
  if (variant === 'alternating') {
    return (
      <section className={cn('py-16 lg:py-24 relative overflow-hidden', bgStyles[background], className)}>
        <Container className="relative">
          {title && (
            <FadeIn direction="up">
              <SectionTitle title={title} subtitle={subtitle} variant={background === 'dark' ? 'light' : 'default'} />
            </FadeIn>
          )}

          <div className="space-y-12 lg:space-y-16">
            {features.map((feature, index) => (
              <FadeIn key={index} direction={index % 2 === 0 ? 'left' : 'right'} delay={animated ? index * 100 : 0}>
                <div className={cn(
                  'flex flex-col lg:flex-row items-center gap-8 lg:gap-12',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}>
                  {/* Icon side */}
                  <div className="flex-shrink-0">
                    <div className={cn(
                      'w-32 h-32 rounded-3xl flex items-center justify-center',
                      background === 'dark'
                        ? 'bg-gradient-to-br from-primary to-secondary shadow-xl shadow-primary/30'
                        : 'bg-gradient-to-br from-primary/10 to-secondary/10'
                    )}>
                      <div className={cn(
                        'w-16 h-16',
                        background === 'dark' ? 'text-white' : 'text-primary'
                      )}>
                        {typeof feature.icon === 'string'
                          ? FeatureIcons[feature.icon as keyof typeof FeatureIcons]
                          : feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={cn(
                    'text-center lg:text-left',
                    index % 2 === 1 && 'lg:text-right'
                  )}>
                    <h3 className={cn(
                      'font-heading text-2xl font-bold mb-3',
                      background === 'dark' ? 'text-white' : 'text-text-dark'
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      'text-base leading-relaxed max-w-lg',
                      background === 'dark' ? 'text-white/70' : 'text-text-light'
                    )}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Minimal variant with inline icons
  if (variant === 'minimal') {
    return (
      <section className={cn('py-12 lg:py-16', bgStyles[background], className)}>
        <Container>
          {title && (
            <FadeIn direction="up">
              <div className="text-center mb-10">
                <h2 className={cn(
                  'font-heading text-2xl md:text-3xl font-bold',
                  background === 'dark' ? 'text-white' : 'text-text-dark'
                )}>
                  {title}
                </h2>
              </div>
            </FadeIn>
          )}

          <div className={cn('grid grid-cols-1 gap-6', gridCols[columns])}>
            {features.map((feature, index) => (
              <FadeIn key={index} direction="up" delay={animated ? index * 50 : 0}>
                <div className="flex items-start gap-4 group">
                  {/* Small icon */}
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                    background === 'dark'
                      ? 'bg-white/10 text-white'
                      : 'bg-gradient-to-br from-primary/10 to-secondary/10 text-primary'
                  )}>
                    <div className="w-5 h-5">
                      {typeof feature.icon === 'string'
                        ? FeatureIcons[feature.icon as keyof typeof FeatureIcons]
                        : feature.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className={cn(
                      'font-heading font-bold mb-1',
                      background === 'dark' ? 'text-white' : 'text-text-dark'
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      'text-sm',
                      background === 'dark' ? 'text-white/70' : 'text-text-light'
                    )}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Cards variant using FeatureCard component
  if (variant === 'cards') {
    return (
      <section className={cn('py-16 lg:py-24 relative overflow-hidden', bgStyles[background], className)}>
        {background === 'gradient' && (
          <>
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl" />
          </>
        )}

        <Container className="relative">
          {title && (
            <FadeIn direction="up">
              <SectionTitle
                title={title}
                subtitle={subtitle}
                badge={badge}
                variant={background === 'dark' ? 'light' : 'default'}
              />
            </FadeIn>
          )}

          <div className={cn('grid grid-cols-1 gap-6 lg:gap-8', gridCols[columns])}>
            {features.map((feature, index) => (
              <FadeIn key={index} direction="up" delay={animated ? index * 100 : 0}>
                <FeatureCard
                  icon={
                    typeof feature.icon === 'string'
                      ? FeatureIcons[feature.icon as keyof typeof FeatureIcons]
                      : feature.icon
                  }
                  title={feature.title}
                  description={feature.description}
                  variant={cardVariant}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Default variant
  return (
    <section className={cn('py-16 lg:py-24 relative overflow-hidden', bgStyles[background], className)}>
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CB6AED' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        {title && (
          <FadeIn direction="up">
            <SectionTitle
              title={title}
              subtitle={subtitle}
              badge={badge}
              variant={background === 'dark' ? 'light' : 'default'}
            />
          </FadeIn>
        )}

        <div className={cn('grid grid-cols-1 gap-6 lg:gap-8', gridCols[columns])}>
          {features.map((feature, index) => (
            <FadeIn key={index} direction="up" delay={animated ? index * 100 : 0}>
              <FeatureCard
                icon={
                  typeof feature.icon === 'string'
                    ? FeatureIcons[feature.icon as keyof typeof FeatureIcons]
                    : feature.icon
                }
                title={feature.title}
                description={feature.description}
                variant={cardVariant}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Numbered features list component
interface NumberedFeaturesProps {
  title?: string;
  subtitle?: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  className?: string;
}

export function NumberedFeatures({
  title,
  subtitle,
  features,
  className,
}: NumberedFeaturesProps) {
  return (
    <section className={cn('py-16 lg:py-24 bg-white', className)}>
      <Container>
        {title && (
          <FadeIn direction="up">
            <SectionTitle title={title} subtitle={subtitle} />
          </FadeIn>
        )}

        <div className="max-w-3xl mx-auto space-y-8">
          {features.map((feature, index) => (
            <FadeIn key={index} direction="up" delay={index * 100}>
              <div className="flex gap-6 group">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-heading font-bold text-lg shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-text-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Horizontal features strip
interface FeaturesStripProps {
  features: Array<{
    icon: React.ReactNode;
    label: string;
  }>;
  className?: string;
}

export function FeaturesStrip({ features, className }: FeaturesStripProps) {
  return (
    <div className={cn(
      'py-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-y border-gray-100',
      className
    )}>
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FadeIn key={index} direction="up" delay={index * 50}>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <span className="font-medium text-text-dark">{feature.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </div>
  );
}
