import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Le Décollage - Formation Excel complète | Exceleur',
  description:
    "6 semaines pour devenir un monstre d'efficacité sur Excel et faire un bond dans ta carrière même si tu n'as que 15 minutes par jour à y consacrer.",
  alternates: {
    canonical: '/formations-excel/le-decollage-v2',
  },
};

export default function SalesPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
