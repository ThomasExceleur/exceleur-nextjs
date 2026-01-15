import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Container } from '@/components/layout/Container';
import { BlogList } from '@/components/blog/BlogList';
import { Pagination } from '@/components/blog/Pagination';
import { Newsletter } from '@/components/sections/Newsletter';
import { getPaginatedBlogPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog Excel | Tuto et actualite',
  description:
    'Sur ce blog, decouvrez des tutoriels et les dernieres actualites liees a Excel. Explorez et maitrisez pleinement les fonctionnalites d\'Excel.',
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const { posts, totalPages, totalPosts } = getPaginatedBlogPosts(currentPage, 12);

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Blog Excel"
        subtitle={`Decouvrez ${totalPosts} tutoriels et astuces pour maitriser Excel`}
        variant="simple"
      />

      {/* Blog List Section */}
      <section className="section-padding">
        <Container>
          <BlogList posts={posts} columns={3} showExcerpt={true} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog-excel"
          />
        </Container>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
