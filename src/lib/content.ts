import { NavConfig, Category } from '@/types';

/**
 * Site configuration
 */
export const siteConfig = {
  name: 'Exceleur',
  title: 'Formations Excel | Par Thomas L\'Exceleur',
  description:
    'Faites d\'Excel la competence la plus rentable de votre carriere. Financement Qualiopi, CPF. Certification TOSA.',
  url: 'https://exceleur.fr',
  ogImage: '/images/og-image.png',
  author: 'Thomas L\'Exceleur',
  social: {
    linkedin: 'https://www.linkedin.com/in/lexceleur/',
    youtube: 'https://www.youtube.com/@lexceleur',
    facebook: 'https://www.facebook.com/lexceleur',
  },
};

/**
 * Navigation configuration
 */
export const navConfig: NavConfig = {
  main: [
    { label: 'Accueil', href: '/' },
    {
      label: 'Formations',
      href: '/formations-excel',
      children: [
        { label: 'Excel avance', href: '/formations-excel/excel-avance' },
        { label: 'Formation Entreprise', href: '/formations-excel/formation-excel-entreprise' },
      ],
    },
    { label: 'Blog', href: '/blog-excel' },
    { label: 'Livre', href: '/livre' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: {
    legal: [
      { label: 'Mentions legales', href: '/mentions-legales' },
      { label: 'CGV', href: '/cgv' },
      { label: 'Politique de cookies', href: '/politique-de-cookies-ue' },
      { label: 'Confidentialite', href: '/declaration-de-confidentialite-ue' },
    ],
    resources: [
      { label: 'Guide TCD', href: '/guide-ultime-tcd' },
      { label: 'Raccourcis Excel', href: '/raccourcis-indispensables-excel' },
      { label: 'Blog Excel', href: '/blog-excel' },
    ],
  },
};

/**
 * Main blog categories based on sitemap
 */
export const blogCategories: Category[] = [
  { slug: 'formules-excel', title: 'Formules Excel', postCount: 0 },
  { slug: 'astuces-excel', title: 'Astuces Excel', postCount: 0 },
  { slug: 'fonctions', title: 'Fonctions', postCount: 0 },
  { slug: 'graphiques', title: 'Graphiques', postCount: 0 },
  { slug: 'macros-et-vba', title: 'Macros et VBA', postCount: 0 },
  { slug: 'analyse-de-donnees-excel', title: 'Analyse de donnees', postCount: 0 },
  { slug: 'productivite', title: 'Productivite', postCount: 0 },
  { slug: 'raccourcis', title: 'Raccourcis', postCount: 0 },
  { slug: 'mise-en-forme', title: 'Mise en forme', postCount: 0 },
  { slug: 'calculs', title: 'Calculs', postCount: 0 },
  { slug: 'dates', title: 'Dates', postCount: 0 },
  { slug: 'depannage', title: 'Depannage', postCount: 0 },
  { slug: 'gestion-derreurs', title: 'Gestion d\'erreurs', postCount: 0 },
  { slug: 'excel-365', title: 'Excel 365', postCount: 0 },
  { slug: 'alternatives', title: 'Alternatives', postCount: 0 },
  { slug: 'cloud', title: 'Cloud', postCount: 0 },
  { slug: 'finance', title: 'Finance', postCount: 0 },
  { slug: 'comptabilite', title: 'Comptabilite', postCount: 0 },
  { slug: 'rh', title: 'RH', postCount: 0 },
  { slug: 'statistiques', title: 'Statistiques', postCount: 0 },
];

/**
 * Footer columns content
 */
export const footerContent = {
  column1: {
    title: 'L\'Exceleur',
    description:
      'Formations Excel certifiees Qualiopi. Faites d\'Excel votre super-pouvoir.',
  },
  column2: {
    title: 'Liens utiles',
    links: navConfig.footer.resources,
  },
  column3: {
    title: 'Legal',
    links: navConfig.footer.legal,
  },
};

/**
 * Homepage sections content
 */
export const homepageContent = {
  hero: {
    title: 'Faites d\'Excel la competence la plus rentable de votre carriere',
    subtitle:
      'Formations Excel certifiees Qualiopi, financement CPF possible. Certification TOSA.',
    cta: {
      text: 'Decouvrir mes formations',
      href: '/formations-excel',
    },
  },
  features: [
    {
      icon: 'certification',
      title: 'Certification Qualiopi',
      description: 'Formations certifiees pour garantir leur qualite.',
    },
    {
      icon: 'cpf',
      title: 'Financement CPF',
      description: 'Utilisez votre Compte Personnel de Formation.',
    },
    {
      icon: 'tosa',
      title: 'Certification TOSA',
      description: 'Validez vos competences avec une certification reconnue.',
    },
    {
      icon: 'expert',
      title: 'Expert Excel',
      description: 'Formateur passionne avec des annees d\'experience.',
    },
  ],
  cta: {
    title: 'Pret a devenir un Exceleur ?',
    description:
      'Rejoignez des milliers de professionnels qui ont transforme leur carriere grace a Excel.',
    buttonText: 'Commencer maintenant',
    buttonHref: '/formations-excel',
  },
  newsletter: {
    title: 'Rejoignez la newsletter',
    description:
      'Recevez chaque semaine des astuces Excel exclusives directement dans votre boite mail.',
    placeholder: 'Votre email',
    buttonText: 'S\'inscrire',
  },
};
