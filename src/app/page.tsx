import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TrustLogos } from '@/components/sections/TrustLogos';
import { AboutThomas } from '@/components/sections/AboutThomas';
import { MethodSection } from '@/components/sections/MethodSection';
import { FinancingSection } from '@/components/sections/FinancingSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { BookSection } from '@/components/sections/BookSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { Newsletter } from '@/components/sections/Newsletter';
import { PressSection } from '@/components/sections/PressSection';
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
        title="Faites d'Excel la compétence la plus rentable de votre carrière"
        variant="homepage"
      />

      {/* Trust Logos - "Ils m'ont fait confiance" */}
      <TrustLogos />

      {/* About Thomas - "Qui est Thomas L'Exceleur?" */}
      <AboutThomas />

      {/* Method Section - "Plusieurs formations, une seule méthode" */}
      <MethodSection />

      {/* Financing Section - "Faites financer votre formation" */}
      <FinancingSection />

      {/* Programs Section - "Des programmes complémentaires" */}
      <ProgramsSection />

      {/* Stats Section - "Plus de 2000 stagiaires accompagnés" */}
      <StatsSection />

      {/* Book Section - "Révèle l'exceleur qui est en toi !" */}
      <BookSection />

      {/* Instagram Section - "Découvrez-moi sur Instagram" */}
      <InstagramSection />

      {/* Newsletter Section */}
      <Newsletter
        variant="homepage"
        subtitle="Comme plus de 50 000 lecteurs,"
        title="rejoignez la #REFérence"
        description="Recevez en exclusivité mes emails privés dans lesquels je partage mes conseils et mes dernières découvertes sur Excel."
        placeholder="Votre email"
        buttonText="S'inscrire"
      />

      {/* Press Section - "Ils parlent de nous" */}
      <PressSection />
    </>
  );
}
