'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { navConfig } from '@/lib/content';
import { Container } from './Container';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth',
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-soft py-3'
          : 'bg-transparent py-4'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center no-underline group"
          >
            <div className="relative">
              <Image
                src="/images/logo.webp"
                alt="Exceleur"
                width={70}
                height={70}
                className={cn(
                  'transition-all duration-300 group-hover:scale-105',
                  isScrolled ? 'w-[60px] h-[60px]' : 'w-[70px] h-[70px]'
                )}
                priority
              />
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navConfig.main.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2.5 rounded-full font-heading text-nav transition-all duration-300',
                        isScrolled
                          ? 'text-text-dark hover:text-primary hover:bg-primary/5'
                          : 'text-white hover:text-white/80 hover:bg-white/10'
                      )}
                      onClick={() => handleDropdownToggle(item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                    >
                      {item.label}
                      <svg
                        className={cn(
                          'w-4 h-4 transition-transform duration-300',
                          openDropdown === item.label && 'rotate-180'
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 opacity-0 invisible translate-y-2',
                        'transition-all duration-300 ease-smooth',
                        'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
                        openDropdown === item.label && 'opacity-100 visible translate-y-0'
                      )}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {/* Dropdown arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 rounded-sm shadow-md" />

                      {/* Dropdown content */}
                      <div className="relative bg-white rounded-2xl shadow-card-elevated p-2 border border-gray-100/50">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-3 text-nav text-text-dark hover:text-primary hover:bg-primary/5 no-underline rounded-xl transition-all duration-200 group/item"
                          >
                            <span className="flex-1">{child.label}</span>
                            <svg
                              className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2.5 rounded-full font-heading text-nav transition-all duration-300 no-underline',
                      isScrolled
                        ? 'text-text-dark hover:text-primary hover:bg-primary/5'
                        : 'text-white hover:text-white/80 hover:bg-white/10'
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="https://exceleur.schoolmaker.co/"
              target="_blank"
              className={cn(
                'relative inline-flex items-center gap-2 font-heading font-bold text-sm px-6 py-3 rounded-full no-underline overflow-hidden group',
                'transition-all duration-300',
                isScrolled
                  ? 'bg-secondary text-white hover:bg-secondary-hover shadow-button hover:shadow-button-hover'
                  : 'bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20'
              )}
            >
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative">Se connecter</span>
              <svg
                className="w-4 h-4 relative transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              'lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300',
              isScrolled
                ? 'text-text-dark hover:bg-primary/5'
                : 'text-white hover:bg-white/10'
            )}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={cn(
                  'absolute left-0 w-full h-0.5 rounded-full transition-all duration-300',
                  isScrolled ? 'bg-text-dark' : 'bg-white',
                  isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-2 w-full h-0.5 rounded-full transition-all duration-300',
                  isScrolled ? 'bg-text-dark' : 'bg-white',
                  isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 w-full h-0.5 rounded-full transition-all duration-300',
                  isScrolled ? 'bg-text-dark' : 'bg-white',
                  isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                )}
              />
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-0 bg-white/95 backdrop-blur-xl transition-all duration-500 ease-smooth overflow-hidden',
          isMobileMenuOpen ? 'max-h-screen opacity-100 pt-20' : 'max-h-0 opacity-0 pt-0'
        )}
      >
        <Container className="py-6">
          <nav className="flex flex-col gap-2">
            {navConfig.main.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 px-4 font-heading text-lg text-text-dark hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300"
                      onClick={() => handleDropdownToggle(item.label)}
                    >
                      {item.label}
                      <svg
                        className={cn(
                          'w-5 h-5 transition-transform duration-300',
                          openDropdown === item.label && 'rotate-180'
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        openDropdown === item.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2.5 px-4 text-text-light hover:text-primary hover:bg-primary/5 no-underline rounded-lg transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 px-4 font-heading text-lg text-text-dark hover:text-primary hover:bg-primary/5 no-underline rounded-xl transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link
                href="https://exceleur.schoolmaker.co/"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-heading font-bold text-lg rounded-2xl no-underline shadow-button hover:shadow-button-hover transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Se connecter
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </nav>
        </Container>
      </div>

      {/* Overlay for mobile menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 -z-10',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
