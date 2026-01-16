import Image from 'next/image';
import { Container } from '@/components/layout/Container';

export function AboutThomas() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#7CC3EE] to-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image de Thomas */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/images/thomas-lexceleur.png"
                alt="Thomas L'Exceleur"
                width={400}
                height={400}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Contenu */}
          <div>
            <p className="text-primary font-heading font-bold text-lg mb-2">
              Qui est Thomas
            </p>
            <h2 className="text-h2 text-text-dark mb-6">
              L&apos;exceleur ?
            </h2>
            <div className="space-y-4 text-body text-text">
              <p>
                Je m&apos;appelle Thomas, j&apos;accompagne les entreprises et leurs salaries dans le{' '}
                <strong>developpement</strong> de leur <strong>expertise sur Excel</strong> grace a des
                methodes de travail efficaces qui ont fait leurs preuves.
              </p>
              <p>Tout a commence en 2021.</p>
              <p>
                Apres plus de 10 ans passes dans les metiers de la finance a developper des systemes
                complexes sur Excel, j&apos;ai constate que le niveau moyen des professionnels utilisant
                ce logiciel etait vraiment bas.
              </p>
              <p>
                Alors je me suis mis en tete de rendre l&apos;apprentissage d&apos;
                <strong>Excel ludique et accessible</strong> au plus grand nombre.
              </p>
              <p>
                Avec plus de <strong>175 000 abonnes sur Instagram</strong> et des millions de vues par
                mois, on peut affirmer sans se tromper que ma <strong>pedagogie</strong> a su trouver
                son public.
              </p>
              <p>
                A la demande generale, j&apos;ai developpe plusieurs{' '}
                <strong>programmes d&apos;accompagnement</strong> pour les professionnels face aux
                problematiques qu&apos;ils rencontrent quotidiennement sur <strong>Excel</strong>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
