import Image from 'next/image';
import { Container } from '@/components/layout/Container';

const methodItems = [
  {
    icon: '/images/illustrations/video.webp',
    title: 'Un apprentissage pas-a-pas a travers plusieurs exemples videos',
    description: 'accessible en ligne, n\'importe ou, n\'importe quand.',
  },
  {
    icon: '/images/illustrations/fiche-recap.webp',
    title: 'Des fiches recapitulatives deja preparees pour les stagiaires',
    description: 'telechargeables a la fin de chaque module suivi.',
  },
  {
    icon: '/images/illustrations/time.webp',
    title: 'Un accompagnement sur le long terme',
    description: 'ou je reponds personnellement a toutes les questions autour d\'Excel qui me sont posees.',
  },
  {
    icon: '/images/illustrations/cible.webp',
    title: 'Le tout condense dans un programme renfermant uniquement l\'essentiel',
    description: 'Des videos courtes, des exemples concrets, et des methodes de travail qui ont (reellement) fait leurs preuves.',
  },
];

export function MethodSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-h2 text-text-dark">
            Plusieurs formations<br />
            <span className="text-primary">une seule methode</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {methodItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-6 items-start p-6 rounded-card bg-background-alt/30"
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div>
                <h3 className="text-h3 text-text-dark mb-2">{item.title}</h3>
                <p className="text-body text-text-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
