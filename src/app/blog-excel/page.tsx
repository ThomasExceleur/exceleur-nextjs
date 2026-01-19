import { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { FilterableBlogList, HorizontalBlogList } from '@/components/blog/BlogList';
import { Pagination } from '@/components/blog/Pagination';
import { Newsletter } from '@/components/sections/Newsletter';
import { FadeIn } from '@/components/ui/FadeIn';
import { getPaginatedBlogPosts, getAllBlogPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog Excel | Tutoriels et actualités',
  description:
    'Sur ce blog, découvrez des tutoriels et les dernières actualités liées à Excel. Explorez et maîtrisez pleinement les fonctionnalités d\'Excel.',
  alternates: {
    canonical: '/blog-excel',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { posts, totalPages, totalPosts } = getPaginatedBlogPosts(currentPage, 12);
  const allPosts = getAllBlogPosts();

  // Extract unique categories
  const categories = Array.from(
    new Set(allPosts.flatMap(post => post.categories || []))
  ).filter(Boolean);

  // Get featured posts (most recent 3)
  const featuredPosts = allPosts.slice(0, 3);

  return (
    <>
      {/* Hero Section with gradient background */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary/5" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container className="relative">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-soft">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
                <span className="text-sm font-medium text-text">{totalPosts} articles disponibles</span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-dark mb-6">
                Le{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Blog Excel
                  </span>
                  {/* Underline decoration */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M1 8.5C32 3.5 62 1.5 100 5.5C138 9.5 168 8.5 199 3.5"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-text-light max-w-2xl mx-auto mb-8">
                Tutoriels, astuces et actualités pour maîtriser Excel comme un pro.
                Des formules de base aux techniques avancées.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-text-dark">{totalPosts}+</div>
                    <div className="text-xs text-text-light">Articles</div>
                  </div>
                </div>

                <div className="w-px h-10 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-text-dark">{categories.length}</div>
                    <div className="text-xs text-text-light">Catégories</div>
                  </div>
                </div>

                <div className="w-px h-10 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-text-dark">100%</div>
                    <div className="text-xs text-text-light">Gratuit</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Featured Articles (only on first page) */}
      {currentPage === 1 && featuredPosts.length > 0 && (
        <section className="py-12 lg:py-16 bg-white border-b border-gray-100">
          <Container>
            <HorizontalBlogList
              posts={featuredPosts}
              title="Articles populaires"
              subtitle="Les tutoriels les plus consultés"
            />
          </Container>
        </section>
      )}

      {/* Blog List Section with categories */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
        <Container>
          <FadeIn direction="up">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-3">
                Tous les articles
              </h2>
              <p className="text-text-light">
                Explorez nos tutoriels par catégorie ou parcourez tous les articles
              </p>
            </div>
          </FadeIn>

          <FilterableBlogList
            posts={posts}
            columns={3}
            showExcerpt={true}
            showDate={true}
            showReadingTime={true}
            categories={categories}
            showFilter={categories.length > 0}
            variant="default"
            animated={true}
          />

          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog-excel"
            />
          </div>
        </Container>
      </section>

      {/* CTA Section before Newsletter */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <Container>
          <FadeIn direction="up">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-text-dark to-gray-800 p-8 md:p-12 lg:p-16">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl" />

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                    Prêt à maîtriser Excel ?
                  </h3>
                  <p className="text-white/70 max-w-lg">
                    Découvrez nos formations complètes pour passer du niveau débutant à expert en quelques semaines.
                  </p>
                </div>

                <a
                  href="/formations-excel"
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

      {/* Newsletter */}
      <Newsletter variant="gradient" />
    </>
  );
}
