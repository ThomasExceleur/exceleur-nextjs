import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BlogContent } from '@/components/blog/BlogContent';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { Newsletter } from '@/components/sections/Newsletter';
import { getBlogPost, getAllBlogPosts, getPage, getAllPageSlugs } from '@/lib/mdx';
import { mdxComponents } from '@/lib/mdx-components';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Reserved routes that have their own page handlers
const reservedRoutes = ['blog-excel', 'formations-excel', 'categorie'];

// Static pages content for pages without MDX
const staticPages: Record<
  string,
  { title: string; description?: string; content: string; type: string }
> = {
  livre: {
    title: 'Revele l\'Exceleur qui est en toi',
    description:
      'Le livre Excel, Revele l\'Exceleur qui est en toi : un concentre d\'astuces et de bonnes pratiques pour faire de toi un magicien du tableur.',
    content: `
## Le livre Excel par Thomas l'Exceleur

Decouvrez "Revele l'Exceleur qui est en toi", un guide pratique pour maitriser Excel.

### Ce que vous trouverez dans ce livre

- Les meilleures astuces pour gagner du temps
- Les fonctions essentielles a maitriser
- Des exercices pratiques
- Des conseils de pro

### Commander le livre

Le livre est disponible sur les principales plateformes de vente en ligne.
    `,
    type: 'page',
  },
  contact: {
    title: 'Contact',
    description: 'Contactez l\'Exceleur pour vos questions sur les formations Excel.',
    content: `
## Contactez-nous

Vous avez une question sur nos formations ? Vous souhaitez un devis personnalise ?

### Email
contact@exceleur.fr

### Reseaux sociaux
Retrouvez-nous sur LinkedIn, YouTube et Facebook.

### Formulaire de contact

Un formulaire de contact sera bientot disponible.
    `,
    type: 'page',
  },
  equipe: {
    title: 'L\'equipe',
    description: 'Decouvrez l\'equipe derriere l\'Exceleur.',
    content: `
## Notre equipe

### Thomas l'Exceleur

Fondateur et formateur principal, Thomas est passionne par Excel depuis plus de 10 ans. Son objectif : rendre Excel accessible a tous et vous aider a booster votre carriere.

### Notre mission

Transformer Excel en votre super-pouvoir professionnel grace a des formations de qualite, certifiees Qualiopi.
    `,
    type: 'page',
  },
  'guide-ultime-tcd': {
    title: 'Le guide ultime des Tableaux Croises Dynamiques',
    description:
      'Maitrisez les tableaux croises dynamiques Excel avec notre guide complet.',
    content: `
## Le guide ultime des Tableaux Croises Dynamiques

Les tableaux croises dynamiques (TCD) sont l'un des outils les plus puissants d'Excel. Ce guide vous apprendra a les maitriser.

### Introduction aux TCD

Un tableau croise dynamique permet de synthetiser et analyser rapidement de grandes quantites de donnees.

### Creer votre premier TCD

1. Selectionnez vos donnees
2. Allez dans Insertion > Tableau croise dynamique
3. Choisissez l'emplacement
4. Faites glisser les champs

### Fonctionnalites avancees

- Champs calcules
- Groupement de donnees
- Segments et chronologies
- Mise en forme conditionnelle

### Telechargez le guide complet

Inscrivez-vous a notre newsletter pour recevoir le guide PDF complet.
    `,
    type: 'guide',
  },
  'raccourcis-indispensables-excel': {
    title: 'Les raccourcis indispensables d\'Excel',
    description: 'Decouvrez les raccourcis clavier Excel essentiels pour gagner du temps.',
    content: `
## Les raccourcis indispensables d'Excel

Gagnez du temps avec ces raccourcis clavier essentiels.

### Navigation

- **Ctrl + Home** : Aller au debut
- **Ctrl + End** : Aller a la fin
- **Ctrl + fleches** : Se deplacer rapidement

### Edition

- **Ctrl + C** : Copier
- **Ctrl + V** : Coller
- **Ctrl + X** : Couper
- **Ctrl + Z** : Annuler
- **F2** : Modifier la cellule
- **F4** : Repeter la derniere action

### Mise en forme

- **Ctrl + B** : Gras
- **Ctrl + I** : Italique
- **Ctrl + U** : Souligne

### Formules

- **F4** : Figer une reference
- **Ctrl + '** : Afficher les formules
- **Tab** : Valider une suggestion

### Telechargez l'aide-memoire

Inscrivez-vous a notre newsletter pour recevoir l'aide-memoire PDF.
    `,
    type: 'guide',
  },
  'mentions-legales': {
    title: 'Mentions legales',
    content: `
## Mentions legales

### Editeur du site

L'Exceleur - Formations Excel
Adresse : [Adresse a completer]
Email : contact@exceleur.fr

### Hebergement

Ce site est heberge par [Hebergeur a completer].

### Propriete intellectuelle

L'ensemble du contenu de ce site est protege par le droit d'auteur.
    `,
    type: 'legal',
  },
  cgv: {
    title: 'Conditions Generales de Vente',
    content: `
## Conditions Generales de Vente

### Article 1 - Objet

Les presentes conditions generales de vente regissent les relations contractuelles entre L'Exceleur et ses clients.

### Article 2 - Prix

Les prix sont indiques en euros TTC.

### Article 3 - Modalites de paiement

Le paiement peut etre effectue par carte bancaire ou virement.

### Article 4 - Droit de retractation

Conformement a la legislation en vigueur, vous disposez d'un delai de 14 jours pour exercer votre droit de retractation.
    `,
    type: 'legal',
  },
  'politique-de-cookies-ue': {
    title: 'Politique de cookies',
    content: `
## Politique de cookies

### Qu'est-ce qu'un cookie ?

Un cookie est un petit fichier texte depose sur votre ordinateur lors de la visite d'un site web.

### Cookies utilises

- Cookies essentiels : necessaires au fonctionnement du site
- Cookies analytiques : pour ameliorer notre site
- Cookies de preference : pour memoriser vos choix

### Gestion des cookies

Vous pouvez gerer vos preferences de cookies a tout moment via les parametres de votre navigateur.
    `,
    type: 'legal',
  },
  'declaration-de-confidentialite-ue': {
    title: 'Politique de confidentialite',
    content: `
## Politique de confidentialite

### Donnees collectees

Nous collectons les donnees suivantes :
- Adresse email (newsletter)
- Donnees de navigation (analytics)

### Utilisation des donnees

Vos donnees sont utilisees pour :
- Vous envoyer notre newsletter
- Ameliorer notre site

### Vos droits

Conformement au RGPD, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees.

### Contact

Pour exercer vos droits : contact@exceleur.fr
    `,
    type: 'legal',
  },
  'thank-you': {
    title: 'Merci !',
    content: `
## Merci pour votre inscription !

Vous allez recevoir un email de confirmation.

A tres bientot !
    `,
    type: 'utility',
  },
};

export async function generateStaticParams() {
  // Get all blog post slugs
  const blogPosts = getAllBlogPosts();
  const blogSlugs = blogPosts.map((post) => ({ slug: post.slug }));

  // Get all page slugs
  const pageSlugs = getAllPageSlugs().map((slug) => ({ slug }));

  // Get static page slugs
  const staticSlugs = Object.keys(staticPages).map((slug) => ({ slug }));

  // Combine all slugs
  const allSlugs = [...blogSlugs, ...pageSlugs, ...staticSlugs];

  // Remove duplicates
  const uniqueSlugs = allSlugs.filter(
    (item, index, self) => index === self.findIndex((t) => t.slug === item.slug)
  );

  return uniqueSlugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if it's a reserved route
  if (reservedRoutes.includes(slug)) {
    return {};
  }

  // Try to find as blog post
  const blogPost = getBlogPost(slug);
  if (blogPost) {
    return {
      title: blogPost.meta.title,
      description: blogPost.meta.metaDescription || blogPost.meta.excerpt,
    };
  }

  // Try to find as page
  const page = getPage(slug);
  if (page) {
    return {
      title: page.frontmatter.title,
      description: page.frontmatter.description,
    };
  }

  // Try static pages
  const staticPage = staticPages[slug];
  if (staticPage) {
    return {
      title: staticPage.title,
      description: staticPage.description,
    };
  }

  return {
    title: 'Page non trouvee',
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if it's a reserved route (should not reach here but just in case)
  if (reservedRoutes.includes(slug)) {
    notFound();
  }

  // Try to find as blog post
  const blogPost = getBlogPost(slug);
  if (blogPost) {
    return (
      <>
        <BlogContent meta={blogPost.meta}>
          <MDXRemote source={blogPost.content} components={mdxComponents} />
        </BlogContent>
        <Newsletter />
      </>
    );
  }

  // Try to find as page from MDX
  const page = getPage(slug);
  if (page) {
    const breadcrumbItems = [
      { label: 'Accueil', href: '/' },
      { label: page.frontmatter.title },
    ];

    return (
      <>
        <div className="gradient-hero py-12 lg:py-16">
          <Container>
            <Breadcrumb items={breadcrumbItems} variant="light" />
            <h1 className="text-h1 text-white">{page.frontmatter.title}</h1>
          </Container>
        </div>
        <Container className="section-padding">
          <div className="max-w-3xl mx-auto prose">
            <MDXRemote source={page.content} components={mdxComponents} />
          </div>
        </Container>
      </>
    );
  }

  // Try static pages
  const staticPage = staticPages[slug];
  if (staticPage) {
    const breadcrumbItems = [
      { label: 'Accueil', href: '/' },
      { label: staticPage.title },
    ];

    return (
      <>
        <div className="gradient-hero py-12 lg:py-16">
          <Container>
            <Breadcrumb items={breadcrumbItems} variant="light" />
            <h1 className="text-h1 text-white">{staticPage.title}</h1>
          </Container>
        </div>
        <Container className="section-padding">
          <div className="max-w-3xl mx-auto prose">
            <MDXRemote source={staticPage.content} components={mdxComponents} />
          </div>
        </Container>
        {staticPage.type !== 'utility' && staticPage.type !== 'legal' && <Newsletter />}
      </>
    );
  }

  // Not found
  notFound();
}
