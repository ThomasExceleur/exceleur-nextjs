'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/ui/FadeIn';

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  variant?: 'inline' | 'box' | 'homepage' | 'gradient';
}

export function Newsletter({
  title = 'Rejoignez la newsletter',
  subtitle,
  description = 'Recevez chaque semaine des astuces Excel exclusives directement dans votre boîte mail.',
  placeholder = 'Votre email',
  buttonText = "S'inscrire",
  className,
  variant = 'box',
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (variant === 'inline') {
    return (
      <div className={cn('py-8', className)}>
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="font-heading text-h3 text-text-dark mb-1">{title}</h3>
              <p className="text-body text-text-light">{description}</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className="min-w-[250px]"
                disabled={status === 'loading'}
              />
              <Button type="submit" variant="solid" disabled={status === 'loading'}>
                {status === 'loading' ? '...' : buttonText}
              </Button>
            </form>
          </div>
          {message && (
            <p
              className={cn(
                'mt-4 text-small text-center',
                status === 'success' ? 'text-success' : 'text-red-500'
              )}
            >
              {message}
            </p>
          )}
        </Container>
      </div>
    );
  }

  if (variant === 'homepage' || variant === 'gradient') {
    return (
      <section id="newsletter" className={cn('py-16 md:py-24 relative overflow-hidden', className)}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating orb */}
          <div
            className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
            }}
          />
          {/* Secondary orb */}
          <div
            className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full opacity-15 animate-float-medium"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Decorative dots */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/20 animate-pulse-soft" />
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 rounded-full bg-white/15 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-white/25 animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        <Container className="relative z-10">
          <FadeIn direction="up">
            <div className="text-center max-w-2xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <span className="text-sm text-white/90">
                  {subtitle || 'Comme plus de 60 000 lecteurs,'}
                </span>
              </div>

              {/* Title with gradient effect */}
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {title}
              </h2>

              <p className="text-lg text-white/90 mb-8">{description}</p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={placeholder}
                      required
                      className="w-full bg-white/95 border-0 shadow-lg focus:ring-2 focus:ring-white/50"
                      disabled={status === 'loading'}
                    />
                    {/* Glow effect under input */}
                    <div className="absolute -inset-1 bg-white/20 rounded-lg blur-md -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  </div>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="whitespace-nowrap uppercase bg-white text-primary hover:bg-white/90 border-0 shadow-lg"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi...
                      </span>
                    ) : (
                      buttonText
                    )}
                  </Button>
                </div>

                {/* Success/Error message */}
                {message && (
                  <div
                    className={cn(
                      'mt-4 text-small p-3 rounded-lg backdrop-blur-sm',
                      status === 'success'
                        ? 'bg-white/20 text-white'
                        : 'bg-red-500/20 text-red-100'
                    )}
                  >
                    {status === 'success' && (
                      <span className="mr-2">✓</span>
                    )}
                    {message}
                  </div>
                )}
              </form>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gratuit</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Pas de spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Désinscription en 1 clic</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d="M0,60 C300,100 600,20 1200,60 L1200,120 L0,120 Z"
              fill="white"
              fillOpacity="0.05"
            />
          </svg>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('section-padding', className)}>
      <Container>
        <div className="relative gradient-primary rounded-card p-card-padding text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full opacity-20 animate-float-slow"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
              }}
            />
          </div>

          <div className="relative z-10">
            <h2 className="font-heading text-h2 text-white mb-4">{title}</h2>
            <p className="text-body text-white/90 mb-8 max-w-xl mx-auto">{description}</p>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="flex-1"
                  disabled={status === 'loading'}
                />
                <Button
                  type="submit"
                  variant="solid"
                  className="whitespace-nowrap"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Envoi...' : buttonText}
                </Button>
              </div>
              {message && (
                <p
                  className={cn(
                    'mt-4 text-small',
                    status === 'success' ? 'text-white' : 'text-red-200'
                  )}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
