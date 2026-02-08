import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BlogContent } from '@/components/blog/BlogContent';
import { Container } from '@/components/layout/Container';
import { Newsletter } from '@/components/sections/Newsletter';
import { FadeIn } from '@/components/ui/FadeIn';
import { getBlogPost, getAllBlogPosts, getPage, getAllPageSlugs } from '@/lib/mdx';
import { BlogPostingJsonLd } from '@/components/seo';
import { mdxComponents } from '@/lib/mdx-components';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Reserved routes that have their own page handlers
const reservedRoutes = ['blog-excel', 'formations-excel', 'categorie'];

// Page type configurations for styling
const pageTypeConfig = {
  page: {
    gradient: 'from-primary via-secondary to-accent',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    showNewsletter: true,
  },
  guide: {
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    showNewsletter: true,
  },
  legal: {
    gradient: 'from-gray-600 via-gray-700 to-gray-800',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    showNewsletter: false,
  },
  utility: {
    gradient: 'from-primary to-secondary',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    showNewsletter: false,
  },
};

// Static pages content for pages without MDX
const staticPages: Record<
  string,
  { title: string; description?: string; content: string; type: 'page' | 'guide' | 'legal' | 'utility' }
> = {
  livre: {
    title: 'Révèle l\'Exceleur qui est en toi',
    description:
      'Le livre Excel, Révèle l\'Exceleur qui est en toi : un concentré d\'astuces et de bonnes pratiques pour faire de toi un magicien du tableur.',
    content: `
## Le livre Excel par Thomas l'Exceleur

Découvrez "Révèle l'Exceleur qui est en toi", un guide pratique pour maîtriser Excel.

### Ce que vous trouverez dans ce livre

- Les meilleures astuces pour gagner du temps
- Les fonctions essentielles à maîtriser
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

Vous avez une question sur nos formations ? Vous souhaitez un devis personnalisé ?

### Email
contact@exceleur.fr

### Réseaux sociaux
Retrouvez-nous sur LinkedIn, YouTube et Facebook.

### Formulaire de contact

Un formulaire de contact sera bientôt disponible.
    `,
    type: 'page',
  },
  equipe: {
    title: 'L\'équipe',
    description: 'Découvrez l\'équipe derrière l\'Exceleur.',
    content: `
## Notre équipe

### Thomas l'Exceleur

Fondateur et formateur principal, Thomas est passionné par Excel depuis plus de 10 ans. Son objectif : rendre Excel accessible à tous et vous aider à booster votre carrière.

### Notre mission

Transformer Excel en votre super-pouvoir professionnel grâce à des formations de qualité.
    `,
    type: 'page',
  },
  'guide-ultime-tcd': {
    title: 'Le guide ultime des Tableaux Croisés Dynamiques',
    description:
      'Maîtrisez les tableaux croisés dynamiques Excel avec notre guide complet.',
    content: `
## Le guide ultime des Tableaux Croisés Dynamiques

Les tableaux croisés dynamiques (TCD) sont l'un des outils les plus puissants d'Excel. Ce guide vous apprendra à les maîtriser.

### Introduction aux TCD

Un tableau croisé dynamique permet de synthétiser et analyser rapidement de grandes quantités de données.

### Créer votre premier TCD

1. Sélectionnez vos données
2. Allez dans Insertion > Tableau croisé dynamique
3. Choisissez l'emplacement
4. Faites glisser les champs

### Fonctionnalités avancées

- Champs calculés
- Groupement de données
- Segments et chronologies
- Mise en forme conditionnelle

### Téléchargez le guide complet

Inscrivez-vous à notre newsletter pour recevoir le guide PDF complet.
    `,
    type: 'guide',
  },
  'raccourcis-indispensables-excel': {
    title: 'Les raccourcis indispensables d\'Excel',
    description: 'Découvrez les raccourcis clavier Excel essentiels pour gagner du temps.',
    content: `
## Les raccourcis indispensables d'Excel

Gagnez du temps avec ces raccourcis clavier essentiels.

### Navigation

- **Ctrl + Home** : Aller au début
- **Ctrl + End** : Aller à la fin
- **Ctrl + flèches** : Se déplacer rapidement

### Édition

- **Ctrl + C** : Copier
- **Ctrl + V** : Coller
- **Ctrl + X** : Couper
- **Ctrl + Z** : Annuler
- **F2** : Modifier la cellule
- **F4** : Répéter la dernière action

### Mise en forme

- **Ctrl + B** : Gras
- **Ctrl + I** : Italique
- **Ctrl + U** : Souligné

### Formules

- **F4** : Figer une référence
- **Ctrl + '** : Afficher les formules
- **Tab** : Valider une suggestion

### Téléchargez l'aide-mémoire

Inscrivez-vous à notre newsletter pour recevoir l'aide-mémoire PDF.
    `,
    type: 'guide',
  },
  'mentions-legales': {
    title: 'Mentions légales',
    content: `
## Mentions légales

### Éditeur du site

L'Exceleur - Formations Excel
Adresse : [Adresse à compléter]
Email : contact@exceleur.fr

### Hébergement

Ce site est hébergé par [Hébergeur à compléter].

### Propriété intellectuelle

L'ensemble du contenu de ce site est protégé par le droit d'auteur.
    `,
    type: 'legal',
  },
  cgv: {
    title: 'Conditions Générales de Vente',
    content: `
## Conditions Générales de Vente

### Article 1 - Objet

Les présentes conditions générales de vente régissent les relations contractuelles entre L'Exceleur et ses clients.

### Article 2 - Prix

Les prix sont indiqués en euros TTC.

### Article 3 - Modalités de paiement

Le paiement peut être effectué par carte bancaire ou virement.

### Article 4 - Droit de rétractation

Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation.
    `,
    type: 'legal',
  },
  'politique-de-cookies-ue': {
    title: 'Politique de cookies',
    content: `
## Politique de cookies

### Qu'est-ce qu'un cookie ?

Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site web.

### Cookies utilisés

- Cookies essentiels : nécessaires au fonctionnement du site
- Cookies analytiques : pour améliorer notre site
- Cookies de préférence : pour mémoriser vos choix

### Gestion des cookies

Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur.
    `,
    type: 'legal',
  },
  'declaration-de-confidentialite-ue': {
    title: 'Politique de confidentialité',
    content: `
## Politique de confidentialité

### Données collectées

Nous collectons les données suivantes :
- Adresse email (newsletter)
- Données de navigation (analytics)

### Utilisation des données

Vos données sont utilisées pour :
- Vous envoyer notre newsletter
- Améliorer notre site

### Vos droits

Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.

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

À très bientôt !
    `,
    type: 'utility',
  },
  'thank-you-guide-ultime-tcd': {
    title: 'Merci pour votre téléchargement !',
    description: 'Votre guide ultime des Tableaux Croisés Dynamiques arrive dans votre boîte mail.',
    content: `
## Merci pour votre téléchargement !

Votre guide ultime des Tableaux Croisés Dynamiques est en route vers votre boîte mail.

### Et maintenant ?

1. **Vérifiez votre boîte mail** (et vos spams)
2. **Téléchargez le guide** depuis le lien dans l'email
3. **Appliquez les conseils** et devenez un pro des TCD !

### Besoin d'aller plus loin ?

Découvrez nos formations Excel pour maîtriser encore plus de fonctionnalités.
    `,
    type: 'utility',
  },
  'thank-you-guide-ultime-tcd-lk': {
    title: 'Merci pour votre téléchargement !',
    description: 'Votre guide ultime des Tableaux Croisés Dynamiques arrive dans votre boîte mail.',
    content: `
## Merci pour votre téléchargement !

Votre guide ultime des Tableaux Croisés Dynamiques est en route vers votre boîte mail.

### Et maintenant ?

1. **Vérifiez votre boîte mail** (et vos spams)
2. **Téléchargez le guide** depuis le lien dans l'email
3. **Appliquez les conseils** et devenez un pro des TCD !

### Besoin d'aller plus loin ?

Découvrez nos formations Excel pour maîtriser encore plus de fonctionnalités.
    `,
    type: 'utility',
  },
  'newsletter-externe': {
    title: 'Inscrivez-vous à la newsletter',
    description: 'Rejoignez plus de 50 000 lecteurs et recevez mes conseils Excel en exclusivité.',
    content: `
## Rejoignez la newsletter Exceleur

Comme plus de 50 000 lecteurs, recevez chaque semaine mes meilleurs conseils Excel directement dans votre boîte mail.

### Ce que vous recevrez :

- Des astuces Excel exclusives
- Des raccourcis pour gagner du temps
- Des tutoriels pas à pas
- Des offres spéciales sur nos formations

### C'est gratuit !

Et vous pouvez vous désinscrire à tout moment.
    `,
    type: 'page',
  },
  'formations_bf2025-2': {
    title: 'Offre Spéciale Formations Excel',
    description: 'Profitez de nos offres exceptionnelles sur les formations Excel.',
    content: `
## Offre Spéciale Formations Excel

Découvrez nos formations Excel avec des conditions exceptionnelles.

### Nos formations

- **Le Décollage** : Pour bien démarrer avec Excel
- **La Machine** : Pour maîtriser Excel comme un pro
- **La Slide** : Pour créer des présentations impactantes
- **Power Query Secrets** : Pour automatiser vos traitements

### Inscrivez-vous maintenant

Profitez de cette offre limitée pour booster votre carrière avec Excel.
    `,
    type: 'page',
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
      alternates: {
        canonical: `/${slug}`,
      },
    };
  }

  // Try to find as page
  const page = getPage(slug);
  if (page) {
    return {
      title: page.frontmatter.title,
      description: page.frontmatter.description,
      alternates: {
        canonical: `/${slug}`,
      },
    };
  }

  // Try static pages
  const staticPage = staticPages[slug];
  if (staticPage) {
    return {
      title: staticPage.title,
      description: staticPage.description,
      alternates: {
        canonical: `/${slug}`,
      },
    };
  }

  return {
    title: 'Page non trouvée',
  };
}

// Enhanced Hero Component for static/MDX pages
function PageHero({
  title,
  description,
  type = 'page',
}: {
  title: string;
  description?: string;
  type?: 'page' | 'guide' | 'legal' | 'utility';
}) {
  const config = pageTypeConfig[type];

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orb */}
        <div
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
          }}
        />
        {/* Secondary orb */}
        <div
          className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative">
        <FadeIn direction="up">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link
              href="/"
              className="text-white/70 hover:text-white transition-colors"
            >
              Accueil
            </Link>
            <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">{title}</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <div className="text-white/90">
              {config.icon}
            </div>
            <span className="text-sm text-white/90 font-medium capitalize">
              {type === 'legal' ? 'Document légal' : type === 'guide' ? 'Guide pratique' : type === 'utility' ? 'Confirmation' : 'Page'}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 max-w-4xl">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              {description}
            </p>
          )}
        </FadeIn>
      </Container>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-12 lg:h-16"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,40 C480,80 960,0 1440,40 L1440,60 L0,60 Z"
          />
        </svg>
      </div>
    </section>
  );
}

// Enhanced Content Section
function ContentSection({
  children,
  type = 'page',
}: {
  children: React.ReactNode;
  type?: 'page' | 'guide' | 'legal' | 'utility';
}) {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      {type === 'guide' && (
        <>
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 rounded-full blur-3xl" />
        </>
      )}
      {type === 'page' && (
        <>
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-3xl" />
        </>
      )}

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CB6AED' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto">
            {/* Content card for legal pages */}
            {type === 'legal' ? (
              <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 border border-gray-100">
                <div className="prose prose-lg prose-headings:font-heading prose-headings:text-text-dark prose-p:text-text prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-text prose-strong:text-text-dark">
                  {children}
                </div>
              </div>
            ) : (
              <div className="prose prose-lg prose-headings:font-heading prose-headings:text-text-dark prose-p:text-text prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-text prose-strong:text-text-dark prose-h2:mt-12 prose-h2:mb-6 prose-h3:mt-8 prose-h3:mb-4">
                {children}
              </div>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

// CTA Section for guides
function GuideCTA() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-emerald-500/5 via-white to-teal-500/5">
      <Container>
        <FadeIn direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 md:p-12 lg:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative max-w-2xl mx-auto">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>

              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                Envie du guide complet ?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Inscrivez-vous à notre newsletter et recevez le guide PDF complet avec encore plus d&apos;astuces et d&apos;exemples pratiques.
              </p>

              <Link
                href="/#newsletter"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-xl text-emerald-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Recevoir le guide gratuit
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
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
        <BlogPostingJsonLd
          title={blogPost.meta.title}
          description={blogPost.meta.metaDescription || blogPost.meta.excerpt}
          slug={blogPost.meta.slug}
          datePublished={blogPost.meta.date}
          author={blogPost.meta.author}
          image={blogPost.meta.featuredImage}
        />
        <BlogContent meta={blogPost.meta}>
          <MDXRemote source={blogPost.content} components={mdxComponents} />
        </BlogContent>
        <Newsletter variant="gradient" />
      </>
    );
  }

  // Try to find as page from MDX
  const page = getPage(slug);
  if (page) {
    return (
      <>
        <PageHero
          title={page.frontmatter.title}
          description={page.frontmatter.description}
          type="page"
        />
        <ContentSection type="page">
          <MDXRemote source={page.content} components={mdxComponents} />
        </ContentSection>
        <Newsletter variant="gradient" />
      </>
    );
  }

  // Try static pages
  const staticPage = staticPages[slug];
  if (staticPage) {
    const config = pageTypeConfig[staticPage.type];

    return (
      <>
        <PageHero
          title={staticPage.title}
          description={staticPage.description}
          type={staticPage.type}
        />
        <ContentSection type={staticPage.type}>
          <MDXRemote source={staticPage.content} components={mdxComponents} />
        </ContentSection>
        {staticPage.type === 'guide' && <GuideCTA />}
        {config.showNewsletter && <Newsletter variant="gradient" />}
      </>
    );
  }

  // Not found
  notFound();
}
