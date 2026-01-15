import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="gradient-hero min-h-[60vh] flex items-center">
      <Container>
        <div className="text-center">
          <h1 className="text-h1 text-white mb-4">404</h1>
          <h2 className="font-heading text-h2 text-white mb-6">Page non trouvee</h2>
          <p className="text-body text-white/80 mb-8 max-w-md mx-auto">
            Desolee, la page que vous recherchez n&apos;existe pas ou a ete deplacee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline-white" href="/">
              Retour a l&apos;accueil
            </Button>
            <Button variant="solid" href="/blog-excel">
              Voir le blog
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
