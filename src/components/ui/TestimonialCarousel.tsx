'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  variant?: 'default' | 'card' | 'minimal';
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
  variant = 'default',
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  if (variant === 'card') {
    return (
      <div
        className={cn('relative', className)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Card container */}
        <div className="relative bg-white rounded-3xl shadow-card-elevated p-8 md:p-10 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/5 to-transparent rounded-tr-full" />

          {/* Quote icon */}
          <div className="absolute top-6 left-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="relative pt-16">
            <blockquote className="text-xl md:text-2xl text-text-dark font-medium leading-relaxed mb-8">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              {currentTestimonial.avatar ? (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-full blur-sm opacity-50" />
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-full blur-sm opacity-50" />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                </div>
              )}
              <div>
                <p className="font-heading font-bold text-text-dark">
                  {currentTestimonial.name}
                </p>
                {(currentTestimonial.role || currentTestimonial.company) && (
                  <p className="text-sm text-text-light">
                    {currentTestimonial.role}
                    {currentTestimonial.role && currentTestimonial.company && ' - '}
                    {currentTestimonial.company}
                  </p>
                )}
                {currentTestimonial.rating && (
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          i < currentTestimonial.rating! ? 'text-amber-400' : 'text-gray-200'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {/* Dots */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-soft">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  index === currentIndex
                    ? 'w-8 h-2.5 bg-gradient-to-r from-primary to-secondary'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="group w-11 h-11 rounded-full bg-white shadow-soft border border-gray-100 flex items-center justify-center text-text-light hover:text-primary hover:border-primary/30 hover:shadow-card transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="group w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20 flex items-center justify-center text-white hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div
        className={cn('relative', className)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="text-center">
          {/* Rating stars */}
          {currentTestimonial.rating && (
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'w-5 h-5',
                    i < currentTestimonial.rating! ? 'text-amber-400' : 'text-gray-200'
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="text-lg md:text-xl text-text-dark leading-relaxed mb-6 max-w-2xl mx-auto">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-3">
            {currentTestimonial.avatar && (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            )}
            <div className="text-left">
              <p className="font-heading font-bold text-sm text-text-dark">
                {currentTestimonial.name}
              </p>
              {(currentTestimonial.role || currentTestimonial.company) && (
                <p className="text-xs text-text-light">
                  {currentTestimonial.role}
                  {currentTestimonial.role && currentTestimonial.company && ' - '}
                  {currentTestimonial.company}
                </p>
              )}
            </div>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  index === currentIndex
                    ? 'w-6 h-2 bg-gradient-to-r from-primary to-secondary'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Large decorative quote */}
      <div className="absolute -top-4 -left-2 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <svg className="w-10 h-10 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Testimonial content */}
      <div className="relative pt-12 px-4 md:px-12">
        <div
          className={cn(
            'min-h-[200px] transition-all duration-500',
            direction === 'next' ? 'animate-fade-in-right' : 'animate-fade-in-left'
          )}
          key={currentIndex}
        >
          <blockquote className="text-xl md:text-2xl text-text-dark font-medium leading-relaxed mb-8">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            {currentTestimonial.avatar ? (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-secondary rounded-full" />
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                {currentTestimonial.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-heading font-bold text-text-dark">
                {currentTestimonial.name}
              </p>
              {(currentTestimonial.role || currentTestimonial.company) && (
                <p className="text-sm text-text-light">
                  {currentTestimonial.role}
                  {currentTestimonial.role && currentTestimonial.company && ' - '}
                  {currentTestimonial.company}
                </p>
              )}
              {currentTestimonial.rating && (
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < currentTestimonial.rating! ? 'text-amber-400' : 'text-gray-200'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  index === currentIndex
                    ? 'w-10 h-2.5 bg-gradient-to-r from-primary to-secondary shadow-sm shadow-primary/30'
                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="group w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-text-light hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="group w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-text-light hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Static testimonial card for grids
interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  variant?: 'default' | 'compact';
}

export function TestimonialCard({
  testimonial,
  className,
  variant = 'default',
}: TestimonialCardProps) {
  if (variant === 'compact') {
    return (
      <div className={cn(
        'group relative bg-white rounded-2xl p-5 shadow-soft hover:shadow-card transition-all duration-300',
        className
      )}>
        {/* Hover glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

        {/* Rating */}
        {testimonial.rating && (
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn(
                  'w-3.5 h-3.5',
                  i < testimonial.rating! ? 'text-amber-400' : 'text-gray-200'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        {/* Quote */}
        <p className="text-sm text-text leading-relaxed mb-4 line-clamp-3">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-bold text-text-dark">{testimonial.name}</p>
            {testimonial.role && (
              <p className="text-[10px] text-text-light">{testimonial.role}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'group relative bg-white rounded-3xl p-6 shadow-soft hover:shadow-card-elevated transition-all duration-300',
      className
    )}>
      {/* Hover glow */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

      {/* Quote icon */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Rating */}
      {testimonial.rating && (
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'w-4 h-4',
                i < testimonial.rating! ? 'text-amber-400' : 'text-gray-200'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-text leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {testimonial.avatar ? (
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={44}
              height={44}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-heading font-bold text-sm text-text-dark">{testimonial.name}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-xs text-text-light">
              {testimonial.role}
              {testimonial.role && testimonial.company && ' - '}
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
