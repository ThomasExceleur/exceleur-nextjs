import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TrustLogos } from '@/components/sections/TrustLogos';
import { AboutThomas } from '@/components/sections/AboutThomas';
import { MethodSection } from '@/components/sections/MethodSection';
import { FinancingSection } from '@/components/sections/FinancingSection';
import { BookSection } from '@/components/sections/BookSection';
import { PressSection } from '@/components/sections/PressSection';
import { Newsletter } from '@/components/sections/Newsletter';
import { siteConfig } from '@/lib/content';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Thomas image */}
      <Hero
        title="Faites d'Excel la competence la plus rentable de votre carriere"
        variant="homepage"
      />

      {/* Trust Logos - "Ils m'ont fait confiance" */}
      <TrustLogos />

      {/* About Thomas - "Qui est Thomas L'Exceleur?" */}
      <AboutThomas />

      {/* Method Section - "Plusieurs formations, une seule methode" */}
      <MethodSection />

      {/* Financing Section - "Faites financer votre formation" */}
      <FinancingSection />

      {/* Book Section - "Revele l'exceleur qui est en toi !" */}
      <BookSection />

      {/* Press Section - "Ils parlent de nous" */}
      <PressSection />

      {/* Newsletter Section */}
      <Newsletter
        title="Rejoignez la #REFerence"
        description="Comme plus de 50 000 lecteurs, recevez en exclusivite mes emails prives dans lesquels je partage mes conseils et mes dernieres decouvertes sur Excel."
        placeholder="Votre email"
        buttonText="S'inscrire"
      />
    </>
  );
}
