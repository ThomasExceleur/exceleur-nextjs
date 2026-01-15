import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const variantStyles = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
};

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
  variant = 'primary',
  className,
}: CTASectionProps) {
  return (
    <section className={cn('section-padding', className)}>
      <Container>
        <div
          className={cn(
            'rounded-card p-card-padding text-center',
            variantStyles[variant]
          )}
        >
          <h2 className="font-heading text-h2 text-white mb-4">{title}</h2>
          {description && (
            <p className="text-body text-white/90 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          <Button variant="outline-white" size="lg" href={buttonHref}>
            {buttonText}
          </Button>
        </div>
      </Container>
    </section>
  );
}
