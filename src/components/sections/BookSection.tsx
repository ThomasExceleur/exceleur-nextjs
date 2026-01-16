import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export function BookSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image du livre */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <Image
              src="/images/livre-exceleur.webp"
              alt="Livre Exceleur"
              width={350}
              height={430}
              className="w-auto max-h-[430px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Contenu */}
          <div className="order-1 lg:order-2 text-white">
            <h2 className="text-h2 text-white mb-4">
              Revele l&apos;exceleur qui est en toi !
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Le livre fun et accessible pour (re)apprendre les fondamentaux d&apos;Excel sans prise de tete
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href="/livre"
                className="inline-flex items-center justify-center px-6 py-3 rounded-button border-2 border-white text-white font-heading font-bold hover:bg-white hover:text-primary transition-colors no-underline"
              >
                En savoir +
              </Link>
              <Link
                href="https://www.amazon.fr/gp/product/B0CH8JD54W?tag=thomascoget-21"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 rounded-button bg-white text-primary font-heading font-bold hover:bg-white/90 transition-colors no-underline"
              >
                Commander sur Amazon
              </Link>
            </div>

            <div className="space-y-2 text-white/80 text-sm">
              <p className="font-bold">5000+ exemplaires vendus</p>
              <p>Ideal pour tous les utilisateurs (Windows et Mac).</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
