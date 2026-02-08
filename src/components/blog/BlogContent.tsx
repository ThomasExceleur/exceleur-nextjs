'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ShareButtons } from '@/components/sections/ShareButtons';
import { BlogPostMeta } from '@/types';

interface BlogContentProps {
  meta: BlogPostMeta;
  children: React.ReactNode;
  className?: string;
}

export function BlogContent({ meta, children, className }: BlogContentProps) {
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Blog Excel', href: '/blog-excel' },
    { label: meta.title },
  ];

  const articleUrl = `https://www.exceleur.fr/${meta.slug}`;

  return (
    <article className={cn(className)}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-hover to-secondary" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 animate-float-slow"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
            }}
          />
          <div
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-15 animate-float-medium"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <Container className="relative z-10 py-16 lg:py-24">
          <Breadcrumb items={breadcrumbItems} variant="light" className="mb-8" />

          <div className="max-w-4xl">
            {/* Category badge */}
            {meta.category && (
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm font-medium text-white/90">{meta.category}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-6 leading-tight">
              {meta.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold">{meta.author?.charAt(0) || 'T'}</span>
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{meta.author || 'Thomas'}</p>
                  <p className="text-xs text-white/60">L&apos;Exceleur</p>
                </div>
              </div>

              <div className="w-px h-8 bg-white/20 hidden sm:block" />

              {/* Date */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={meta.date} className="text-sm">{formatDate(meta.date)}</time>
              </div>

              {/* Reading time */}
              {meta.readingTime && (
                <>
                  <div className="w-px h-8 bg-white/20 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{meta.readingTime} min de lecture</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,40 C480,100 960,10 1440,60 L1440,120 L0,120 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Floating share buttons */}
      <ShareButtons url={articleUrl} title={meta.title} variant="floating" />

      {/* Content */}
      <Container className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Featured image */}
          {meta.featuredImage && (
            <div className="relative -mt-20 mb-12 rounded-2xl overflow-hidden shadow-card-elevated">
              <Image
                src={meta.featuredImage}
                alt={meta.title}
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Share buttons top (mobile) */}
          <div className="lg:hidden mb-8">
            <ShareButtons url={articleUrl} title={meta.title} variant="compact" />
          </div>

          {/* Article content */}
          <div className="prose prose-lg max-w-none">{children}</div>

          {/* Share buttons bottom */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-text-dark mb-1">Vous avez aimé cet article ?</p>
                <p className="text-sm text-text-light">Partagez-le avec vos collègues !</p>
              </div>
              <ShareButtons url={articleUrl} title={meta.title} variant="compact" />
            </div>
          </div>

          {/* Categories & Tags */}
          {(meta.categories.length > 0 || meta.tags.length > 0) && (
            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <div className="flex flex-wrap gap-2">
                {meta.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categorie/${category.toLowerCase().replace(/ /g, '-')}/`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium text-primary border border-primary/20 no-underline hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {category}
                  </Link>
                ))}
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-2 bg-white rounded-full text-sm text-text-light border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author card */}
          <div className="mt-12 p-6 lg:p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary p-0.5">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">T</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg text-text-dark mb-1">Thomas L&apos;Exceleur</h3>
                <p className="text-sm text-primary font-medium mb-3">Formateur Excel certifié</p>
                <p className="text-sm text-text-light leading-relaxed">
                  J&apos;accompagne les professionnels dans le développement de leur expertise Excel depuis plus de 10 ans.
                  Retrouvez mes astuces quotidiennes sur Instagram !
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    href="https://www.instagram.com/lexceleur/"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4] text-white text-sm font-bold rounded-full no-underline hover:shadow-lg transition-shadow"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                    </svg>
                    Suivre
                  </Link>
                  <Link
                    href="/formations-excel/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary text-sm font-bold rounded-full no-underline border border-primary/20 hover:bg-primary hover:text-white transition-colors"
                  >
                    Voir les formations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
