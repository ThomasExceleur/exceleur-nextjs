'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';

const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Déclaration de confidentialité', href: '/declaration-de-confidentialite-ue' },
  { label: 'Politique de cookies', href: '/politique-de-cookies-ue' },
  { label: 'CGV', href: '/cgv' },
  { label: 'Certificat Qualiopi', href: 'https://www.exceleur.fr/wp-content/uploads/2023/10/Certificat-Qualiopi-2023-EXCELEUR.pdf', external: true },
  { label: 'Règlement intérieur', href: 'https://www.exceleur.fr/wp-content/uploads/2024/12/Reglement-interieur-Exceleur.pdf', external: true },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lexceleur/',
    icon: 'instagram',
    followers: '175K',
    color: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737]',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@exceleur',
    icon: 'tiktok',
    followers: '50K',
    color: 'hover:bg-[#000000]',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@lexceleur',
    icon: 'youtube',
    followers: '10K',
    color: 'hover:bg-[#FF0000]',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thomas-lexceleur/',
    icon: 'linkedin',
    color: 'hover:bg-[#0A66C2]',
  },
];

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large orb */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
          }}
        />
        {/* Secondary orb */}
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-15 animate-float-medium"
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

      <Container className="relative z-10 py-16 lg:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & Branding */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative">
                <Image
                  src="/images/logo.webp"
                  alt="Exceleur"
                  width={70}
                  height={70}
                  className="w-[70px] h-[70px] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
            <p className="text-white/80 text-sm mb-6 max-w-xs">
              Faites d&apos;Excel la compétence la plus rentable de votre carrière grâce à nos formations certifiées.
            </p>
            <div className="flex items-center gap-3">
              <Image
                src="/images/illustrations/qualiopi.webp"
                alt="Certification Qualiopi"
                width={80}
                height={40}
                className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Column 2: Legal Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-6">
              Pages légales
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={'external' in link && link.external ? '_blank' : undefined}
                    className="text-white/70 hover:text-white text-sm no-underline transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                    {link.external && (
                      <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-6">
              Réseaux sociaux
            </h3>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className={`flex items-center gap-3 p-3 -ml-3 rounded-xl no-underline group transition-all duration-300 ${link.color} hover:text-white`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
                    <SocialIcon icon={link.icon} />
                  </div>
                  <div>
                    <span className="text-white font-medium text-sm block">{link.label}</span>
                    {link.followers && (
                      <span className="text-white/60 text-xs">{link.followers} abonnés</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter CTA */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-6">
              Newsletter
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Rejoignez +50 000 lecteurs et recevez mes conseils Excel en exclusivité.
            </p>
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-heading font-bold text-sm rounded-full no-underline shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span>S&apos;inscrire</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Trust badges */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Gratuit</span>
              </div>
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Sans spam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm text-center md:text-left">
              <p>&copy; {currentYear} Exceleur. Tous droits réservés.</p>
              <p className="mt-1">
                Réalisation{' '}
                <Link
                  href="https://charlenezybala.com/"
                  target="_blank"
                  className="text-white/80 hover:text-white no-underline transition-colors"
                >
                  Charlène Zybala
                </Link>
              </p>
            </div>

            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-all duration-300 group"
            >
              <span>Retour en haut</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="absolute top-0 w-full h-full rotate-180"
        >
          <path
            d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z"
            fill="white"
          />
        </svg>
      </div>
    </footer>
  );
}
