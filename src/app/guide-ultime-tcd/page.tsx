import { Metadata } from 'next';
import { GuideUltimeTcdClient } from './GuideUltimeTcdClient';

export const metadata: Metadata = {
  title: 'Le Guide Ultime des Tableaux Croisés Dynamiques | Exceleur',
  description:
    'Recevez gratuitement le guide complet pour maîtriser les Tableaux Croisés Dynamiques Excel. 20+ pages de méthodes, astuces et exemples concrets.',
  alternates: {
    canonical: '/guide-ultime-tcd/',
  },
  openGraph: {
    title: 'Le Guide Ultime des Tableaux Croisés Dynamiques',
    description:
      'Recevez gratuitement le guide complet pour maîtriser les Tableaux Croisés Dynamiques Excel. 20+ pages de méthodes, astuces et exemples concrets.',
    type: 'website',
    url: '/guide-ultime-tcd/',
    images: [{ url: '/images/og-image.png' }],
  },
};

export default function GuideUltimeTcdPage() {
  return <GuideUltimeTcdClient />;
}
