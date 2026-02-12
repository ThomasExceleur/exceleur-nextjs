import { Metadata } from 'next';
import { RaccourcisClient } from './RaccourcisClient';

export const metadata: Metadata = {
  title: 'Les Raccourcis Indispensables d\'Excel | Exceleur',
  description:
    'Recevez gratuitement le guide des raccourcis clavier Excel essentiels pour booster votre productivité.',
  alternates: {
    canonical: '/raccourcis-indispensables-excel/',
  },
  openGraph: {
    title: 'Les Raccourcis Indispensables d\'Excel',
    description:
      'Recevez gratuitement le guide des raccourcis clavier Excel essentiels pour booster votre productivité.',
    type: 'website',
    url: '/raccourcis-indispensables-excel/',
    images: [{ url: '/images/og-image.png' }],
  },
};

export default function RaccourcisPage() {
  return <RaccourcisClient />;
}
