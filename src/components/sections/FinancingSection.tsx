import Image from 'next/image';
import { Container } from '@/components/layout/Container';

export function FinancingSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-primary/20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu */}
          <div>
            <h2 className="text-h2 text-text-dark mb-6">
              Faites financer<br />
              <span className="text-primary">votre formation</span>
            </h2>
            <div className="space-y-4 text-body text-text">
              <p>
                La <strong>qualite</strong> des enseignements a ete reconnue par un{' '}
                <strong>organisme accrediteur</strong> qui a delivre la{' '}
                <strong>certification Qualiopi</strong> a chacune des formations du catalogue.
              </p>
              <p>
                Aujourd&apos;hui, ces formations sont eligibles aux financements{' '}
                <strong>OPCO</strong> et <strong>CPF</strong>.
              </p>
              <p>
                De plus, les <strong>stagiaires</strong> ont la possibilite de passer la{' '}
                <strong>certification TOSA</strong> en fin de formation afin de{' '}
                <strong>valider leurs competences</strong> nouvellement acquises.
              </p>
            </div>
          </div>

          {/* Logos certifications */}
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            <Image
              src="/images/qualiopi.webp"
              alt="Logo Qualiopi"
              width={200}
              height={170}
              className="w-auto h-24 object-contain"
            />
            <Image
              src="/images/tosa.webp"
              alt="TOSA Centre Agree"
              width={200}
              height={60}
              className="w-auto h-16 object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
