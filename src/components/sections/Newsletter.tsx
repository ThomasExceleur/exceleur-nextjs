'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface NewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
  variant?: 'inline' | 'box';
}

export function Newsletter({
  title = 'Rejoignez la newsletter',
  description = 'Recevez chaque semaine des astuces Excel exclusives directement dans votre boite mail.',
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

    // Simulate API call - replace with actual newsletter signup
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Merci ! Vous recevrez bientot nos astuces Excel.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez reessayer.');
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

  return (
    <section className={cn('section-padding', className)}>
      <Container>
        <div className="gradient-primary rounded-card p-card-padding text-center">
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
      </Container>
    </section>
  );
}
