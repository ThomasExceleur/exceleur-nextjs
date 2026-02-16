import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Le Decollage - Deviens autonome sur Excel | Exceleur',
  description:
    'Le systeme base sur la Regle des 95% pour devenir autonome sur Excel en quelques semaines, sans apprendre des centaines de formules. Formation en ligne par Exceleur.',
  alternates: {
    canonical: '/formations-excel/le-decollage',
  },
};

export default function LeDecollageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`header, footer { display: none !important; }`}</style>
      {children}
    </>
  );
}
