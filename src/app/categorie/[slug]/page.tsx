import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { BlogList } from '@/components/blog/BlogList';
import { Pagination } from '@/components/blog/Pagination';
import { Newsletter } from '@/components/sections/Newsletter';
import { FadeIn } from '@/components/ui/FadeIn';
import { getBlogPostsByCategory, getAllCategories } from '@/lib/mdx';
import { blogCategories } from '@/lib/content';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'formules-excel': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  'analyse-de-donnees-excel': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  'graphiques': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  'macros-et-vba': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'power-query': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  default: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
};

// Generate static params for all categories
export async function generateStaticParams() {
  const mdxCategories = getAllCategories();
  const allSlugs = [
    ...blogCategories.map((c) => c.slug),
    ...mdxCategories.map((c) => c.slug),
  ];
  const uniqueSlugs = [...new Set(allSlugs)];
  return uniqueSlugs.map((slug) => ({ slug }));
}

// Find category title from slug
function getCategoryTitle(slug: string): string {
  const predefined = blogCategories.find((c) => c.slug === slug);
  if (predefined) return predefined.title;

  const mdxCategory = getAllCategories().find((c) => c.slug === slug);
  if (mdxCategory) return mdxCategory.name;

  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = getCategoryTitle(slug);

  return {
    title: `${title} - Articles Excel`,
    description: `Découvrez tous nos articles sur ${title}. Tutoriels, astuces et guides Excel.`,
    alternates: {
      canonical: `/categorie/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage = 12;

  const allPosts = getBlogPostsByCategory(slug);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const posts = allPosts.slice(startIndex, startIndex + perPage);

  const categoryTitle = getCategoryTitle(slug);
  const CategoryIcon = categoryIcons[slug] || categoryIcons.default;

  if (totalPosts === 0 && !blogCategories.find((c) => c.slug === slug)) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-secondary/15 to-accent/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23CB6AED' stroke-width='1'/%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-sm mb-6">
                <Link
                  href="/blog-excel/"
                  className="text-text-light hover:text-primary transition-colors"
                >
                  Blog Excel
                </Link>
                <svg className="w-4 h-4 text-text-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-primary font-medium">Catégorie</span>
              </nav>

              {/* Icon badge */}
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
                {CategoryIcon}
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-4">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {categoryTitle}
                </span>
              </h1>

              {/* Subtitle with count */}
              <p className="text-lg md:text-xl text-text-light mb-8">
                {totalPosts > 0
                  ? `${totalPosts} article${totalPosts > 1 ? 's' : ''} pour maîtriser ${categoryTitle.toLowerCase()}`
                  : 'Aucun article pour le moment'}
              </p>

              {/* Stats badges */}
              {totalPosts > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-soft">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <span className="text-sm font-medium text-text">{totalPosts} articles</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-soft">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-text">Lecture gratuite</span>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Blog List Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
        <Container>
          {posts.length > 0 ? (
            <>
              <FadeIn direction="up">
                <div className="text-center mb-10">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">
                    Tous les articles
                  </h2>
                  <p className="text-text-light">
                    Explorez nos tutoriels et guides sur {categoryTitle.toLowerCase()}
                  </p>
                </div>
              </FadeIn>

              <BlogList
                posts={posts}
                columns={3}
                showExcerpt={true}
                showDate={true}
                showReadingTime={true}
                variant="default"
                animated={true}
              />

              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath={`/categorie/${slug}`}
                />
              </div>
            </>
          ) : (
            <FadeIn direction="up">
              <div className="relative text-center py-20 px-6">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />

                <div className="relative">
                  {/* Empty icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
                    Aucun article pour le moment
                  </h3>
                  <p className="text-text-light mb-6 max-w-md mx-auto">
                    Nous travaillons sur de nouveaux contenus pour cette catégorie. Revenez bientôt !
                  </p>

                  <Link
                    href="/blog-excel/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voir tous les articles
                  </Link>
                </div>
              </div>
            </FadeIn>
          )}
        </Container>
      </section>

      {/* Related categories suggestion */}
      {posts.length > 0 && (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
          <Container>
            <FadeIn direction="up">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-text-dark to-gray-800 p-8 md:p-12 lg:p-16">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl" />

                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                      Envie d&apos;aller plus loin ?
                    </h3>
                    <p className="text-white/70 max-w-lg">
                      Découvrez nos formations complètes sur {categoryTitle.toLowerCase()} et devenez un expert Excel.
                    </p>
                  </div>

                  <a
                    href="/formations-excel/"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    Voir les formations
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* Newsletter */}
      <Newsletter variant="gradient" />
    </>
  );
}
