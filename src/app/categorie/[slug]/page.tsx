import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/sections/Hero';
import { Container } from '@/components/layout/Container';
import { BlogList } from '@/components/blog/BlogList';
import { Pagination } from '@/components/blog/Pagination';
import { Newsletter } from '@/components/sections/Newsletter';
import { getBlogPostsByCategory, getAllCategories } from '@/lib/mdx';
import { blogCategories } from '@/lib/content';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  // Combine MDX categories with predefined categories
  const mdxCategories = getAllCategories();
  const allSlugs = [
    ...blogCategories.map((c) => c.slug),
    ...mdxCategories.map((c) => c.slug),
  ];

  // Remove duplicates
  const uniqueSlugs = [...new Set(allSlugs)];
  return uniqueSlugs.map((slug) => ({ slug }));
}

// Find category title from slug
function getCategoryTitle(slug: string): string {
  const predefined = blogCategories.find((c) => c.slug === slug);
  if (predefined) return predefined.title;

  const mdxCategory = getAllCategories().find((c) => c.slug === slug);
  if (mdxCategory) return mdxCategory.name;

  // Convert slug to title case
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
    description: `Decouvrez tous nos articles sur ${title}. Tutoriels, astuces et guides Excel.`,
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

  // Get posts for this category
  const allPosts = getBlogPostsByCategory(slug);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const posts = allPosts.slice(startIndex, startIndex + perPage);

  const categoryTitle = getCategoryTitle(slug);

  // If no posts and not a predefined category, return 404
  if (totalPosts === 0 && !blogCategories.find((c) => c.slug === slug)) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={categoryTitle}
        subtitle={
          totalPosts > 0
            ? `${totalPosts} article${totalPosts > 1 ? 's' : ''} dans cette categorie`
            : 'Aucun article pour le moment'
        }
        variant="simple"
      />

      {/* Blog List Section */}
      <section className="section-padding">
        <Container>
          {posts.length > 0 ? (
            <>
              <BlogList posts={posts} columns={3} showExcerpt={true} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/categorie/${slug}`}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-body text-text-light mb-4">
                Aucun article dans cette categorie pour le moment.
              </p>
              <p className="text-body text-text-light">
                Revenez bientot pour decouvrir de nouveaux contenus !
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
