import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

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
  variant?: 'default' | 'simple';
}

export function Hero({
  title,
  subtitle,
  cta,
  secondaryCta,
  className,
  variant = 'default',
}: HeroProps) {
  return (
    <section
      className={cn(
        'gradient-hero py-16 lg:py-24',
        variant === 'simple' && 'py-12 lg:py-16',
        className
      )}
    >
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-h1 text-white mb-6 text-balance">{title}</h1>
          {subtitle && (
            <p className="text-body text-white/90 mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {(cta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
    <section className={cn('gradient-hero py-16 lg:py-24 relative overflow-hidden', className)}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-h1 text-white mb-6">{title}</h1>
            {subtitle && (
              <p className="text-body text-white/90 mb-8">{subtitle}</p>
            )}
            {cta && (
              <Button variant="outline-white" size="lg" href={cta.href}>
                {cta.text}
              </Button>
            )}
          </div>
          {imageSrc && (
            <div className="flex justify-center lg:justify-end">
              <Image
                src={imageSrc}
                alt={imageAlt || ''}
                width={500}
                height={400}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
