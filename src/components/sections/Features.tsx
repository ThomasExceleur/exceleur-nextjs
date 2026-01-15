import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from './SectionTitle';
import { FeatureCard, FeatureIcons } from './FeatureCard';

interface Feature {
  icon: keyof typeof FeatureIcons | React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function Features({
  title,
  subtitle,
  features,
  columns = 4,
  className,
}: FeaturesProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={cn('section-padding', className)}>
      <Container>
        {title && <SectionTitle title={title} subtitle={subtitle} />}
        <div className={cn('grid grid-cols-1 gap-8', gridCols[columns])}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={
                typeof feature.icon === 'string'
                  ? FeatureIcons[feature.icon as keyof typeof FeatureIcons]
                  : feature.icon
              }
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
