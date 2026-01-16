import Image from 'next/image';
import { Container } from '@/components/layout/Container';

export function PressSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <h2 className="text-h2 text-text-dark text-center mb-12">
          Ils parlent de nous
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          <Image
            src="/images/logos/podcast-pose-ta-dem.png"
            alt="Logo du podcast Pose ta Dem"
            width={150}
            height={150}
            className="w-auto h-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/images/logos/podcast-geek-chiffres.png"
            alt="Logo du podcast Les Geeks des Chiffres"
            width={200}
            height={80}
            className="w-auto h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </Container>
    </section>
  );
}
