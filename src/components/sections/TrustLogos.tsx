'use client';

import { Container } from '@/components/layout/Container';

const trustLogos = [
  { name: 'Trescal', color: '#1e40af' },
  { name: 'Bluewin', color: '#0284c7' },
  { name: 'ESCP', color: '#1d4ed8' },
  { name: 'Hermès', color: '#ea580c' },
  { name: 'European Sourcing', color: '#059669' },
];

export function TrustLogos() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <h2 className="text-center text-sm font-heading font-bold uppercase tracking-wider text-text-light mb-8">
          ils m&apos;ont fait confiance
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {trustLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center h-12 px-4 opacity-60 hover:opacity-100 transition-opacity"
            >
              <span
                className="font-heading font-bold text-lg"
                style={{ color: logo.color }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
