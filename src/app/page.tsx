import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { CTASection } from '@/components/sections/CTASection';
import { Newsletter } from '@/components/sections/Newsletter';
import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/sections/SectionTitle';
import { BlogList } from '@/components/blog/BlogList';
import { Button } from '@/components/ui/Button';
import { homepageContent, siteConfig } from '@/lib/content';
import { getAllBlogPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function HomePage() {
  // Get latest blog posts
  const recentPosts = getAllBlogPosts().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={homepageContent.hero.title}
        subtitle={homepageContent.hero.subtitle}
        cta={{
          text: homepageContent.hero.cta.text,
          href: homepageContent.hero.cta.href,
        }}
      />

      {/* Features Section */}
      <Features
        title="Pourquoi choisir l'Exceleur ?"
        subtitle="Des formations de qualite pour maitriser Excel et booster votre carriere."
        features={homepageContent.features.map((feature) => ({
          icon: feature.icon as 'certification' | 'cpf' | 'tosa' | 'expert',
          title: feature.title,
          description: feature.description,
        }))}
        columns={4}
      />

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="section-padding bg-background-alt">
          <Container>
            <SectionTitle
              title="Derniers articles du blog"
              subtitle="Decouvrez nos astuces et tutoriels Excel pour progresser rapidement."
            />
            <BlogList posts={recentPosts} columns={3} />
            <div className="text-center mt-8">
              <Button variant="solid" href="/blog-excel">
                Voir tous les articles
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <CTASection
        title={homepageContent.cta.title}
        description={homepageContent.cta.description}
        buttonText={homepageContent.cta.buttonText}
        buttonHref={homepageContent.cta.buttonHref}
        variant="secondary"
      />

      {/* Newsletter Section */}
      <Newsletter
        title={homepageContent.newsletter.title}
        description={homepageContent.newsletter.description}
        placeholder={homepageContent.newsletter.placeholder}
        buttonText={homepageContent.newsletter.buttonText}
      />
    </>
  );
}
