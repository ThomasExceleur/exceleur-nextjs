'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { FloatingShapes } from '@/components/ui/VisualEffects';

interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  className?: string;
  variant?: 'default' | 'simple' | 'homepage';
}

export function Hero({
  title,
  subtitle,
  cta,
  secondaryCta,
  className,
  variant = 'default',
}: HeroProps) {
  // Homepage variant with Thomas image - enhanced with visual effects
  if (variant === 'homepage') {
    return (
      <section className={cn('relative min-h-[90vh] flex items-center overflow-hidden', className)}>
        {/* Animated gradient background with mesh */}
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Animated mesh overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 30%, rgba(255,255,255,0.15) 0px, transparent 50%),
              radial-gradient(at 80% 20%, rgba(124,195,238,0.2) 0px, transparent 40%),
              radial-gradient(at 40% 80%, rgba(80,72,221,0.15) 0px, transparent 50%)
            `,
          }}
        />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated morphing blob - top right */}
          <div
            className="absolute -top-20 -right-20 w-[600px] h-[600px] opacity-20 blob-animated"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />

          {/* Secondary blob - bottom left */}
          <div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 animate-float-medium"
            style={{
              background: 'radial-gradient(circle, rgba(124,195,238,0.5) 0%, transparent 60%)',
            }}
          />

          {/* Floating particles */}
          <div className="absolute top-1/4 left-[15%] w-3 h-3 rounded-full bg-white/30 animate-float" />
          <div className="absolute top-1/3 right-[25%] w-2 h-2 rounded-full bg-white/20 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-[30%] w-4 h-4 rounded-full bg-white/15 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-2/3 right-[15%] w-2 h-2 rounded-full bg-accent/30 animate-float" style={{ animationDelay: '0.5s' }} />

          {/* Diagonal lines decoration */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonal-lines" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="40" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <Container className="relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <div className="space-y-8">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-fade-in-up"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-sm text-white/90 font-medium">+3000 professionnels formés</span>
              </div>

              {/* Animated title with staggered reveal */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-heading font-extrabold text-white leading-[1.15] tracking-tight">
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                  Faites d&apos;Excel
                </span>
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
                  la compétence
                </span>
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
                  la plus{' '}
                  <span className="relative inline-block">
                    rentable
                    {/* Animated underline */}
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-white/40 rounded-full origin-left animate-scale-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }} />
                  </span>
                </span>
                <span className="block animate-fade-in-up" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
                  de votre carrière
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-xl text-white/80 max-w-lg animate-fade-in-up"
                style={{ animationDelay: '0.55s', animationFillMode: 'both' }}
              >
                Des formations pour maîtriser Excel et booster votre productivité.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-wrap gap-4 animate-fade-in-up"
                style={{ animationDelay: '0.65s', animationFillMode: 'both' }}
              >
                <Button
                  variant="solid"
                  size="lg"
                  href="/formations-excel/"
                  className="group relative overflow-hidden px-8 !bg-white !text-primary !border-white hover:!bg-white/90 hover:!shadow-xl hover:!shadow-white/20"
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  Découvrir les formations
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  href="#newsletter"
                  className="text-white hover:bg-white/10"
                >
                  En savoir plus
                </Button>
              </div>

              {/* Trust indicators */}
              <div
                className="flex items-center gap-6 pt-4 animate-fade-in-up"
                style={{ animationDelay: '0.75s', animationFillMode: 'both' }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/40 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold"
                    >
                      {['🎯', '💼', '📊', '⭐'][i - 1]}
                    </div>
                  ))}
                </div>
                <div className="text-white/70 text-sm">
                  <span className="text-white font-semibold">98%</span> de satisfaction
                </div>
              </div>
            </div>

            {/* Image with enhanced effects */}
            <div
              className="flex justify-center lg:justify-end animate-fade-in-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-90 animate-pulse-soft" />

                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-white/10 animate-spin-slow" />

                {/* Image container */}
                <div className="relative group">
                  <Image
                    src="/images/thomas-hero.png"
                    alt="Thomas L'Exceleur, formateur Excel"
                    width={520}
                    height={300}
                    className="relative max-w-full h-auto drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    priority
                  />

                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom wave decoration - enhanced */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d="M0,40 C480,100 960,10 1440,60 L1440,120 L0,120 Z"
              fill="white"
              fillOpacity="0.08"
            />
            <path
              d="M0,60 C360,100 720,30 1080,70 C1260,85 1380,75 1440,80 L1440,120 L0,120 Z"
              fill="white"
              fillOpacity="0.05"
            />
          </svg>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle hidden lg:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/60 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'relative min-h-[60vh] flex items-center overflow-hidden gradient-hero',
        variant === 'simple' && 'min-h-[40vh]',
        className
      )}
    >
      {/* Decorative floating shapes */}
      <FloatingShapes />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(at 30% 20%, rgba(255,255,255,0.2) 0px, transparent 50%),
            radial-gradient(at 70% 80%, rgba(124,195,238,0.15) 0px, transparent 40%)
          `,
        }}
      />

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-h1 text-white mb-6 text-balance animate-fade-in-up">{title}</h1>
          {subtitle && (
            <p
              className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              {subtitle}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              {cta && (
                <Button variant="outline-white" size="lg" href={cta.href}>
                  {cta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button variant="solid" size="lg" href={secondaryCta.href}>
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,60 C480,100 960,20 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.1" />
        </svg>
      </div>
    </section>
  );
}

interface HeroWithImageProps extends HeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

export function HeroWithImage({
  title,
  subtitle,
  cta,
  imageSrc,
  imageAlt,
  className,
}: HeroWithImageProps) {
  return (
    <section className={cn('relative min-h-[70vh] flex items-center gradient-hero overflow-hidden', className)}>
      {/* Decorative background */}
      <FloatingShapes />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(255,255,255,0.2) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(124,195,238,0.15) 0px, transparent 40%)
          `,
        }}
      />

      <Container className="relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-h1 text-white mb-6 animate-fade-in-up">{title}</h1>
            {subtitle && (
              <p
                className="text-body-lg text-white/90 mb-8 animate-fade-in-up"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
              >
                {subtitle}
              </p>
            )}
            {cta && (
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
              >
                <Button variant="outline-white" size="lg" href={cta.href}>
                  {cta.text}
                </Button>
              </div>
            )}
          </div>
          {imageSrc && (
            <div
              className="flex justify-center lg:justify-end animate-fade-in-up"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 blur-2xl rounded-2xl group-hover:bg-white/20 transition-colors duration-500" />
                <Image
                  src={imageSrc}
                  alt={imageAlt || ''}
                  width={500}
                  height={400}
                  className="relative max-w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,60 C480,100 960,20 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.1" />
        </svg>
      </div>
    </section>
  );
}
