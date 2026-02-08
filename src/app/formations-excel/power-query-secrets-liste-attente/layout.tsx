import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Power Query Secrets - Formation Excel | Exceleur',
  description:
    'Découvre les secrets de Power Query pour automatiser le traitement de tes données Excel.',
  alternates: {
    canonical: '/formations-excel/power-query-secrets-liste-attente',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
