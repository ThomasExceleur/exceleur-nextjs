import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'La Slide - Formation PowerPoint | Exceleur',
  description:
    'Maîtrise PowerPoint et crée des présentations professionnelles qui captent l\'attention.',
  alternates: {
    canonical: '/formations-excel/la-slide-liste-attente',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
