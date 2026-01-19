'use client';

import { useEffect, useState } from 'react';

interface FloatingShapeProps {
  className?: string;
}

// Subtle grain overlay for texture
export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Animated floating shapes for sections
export function FloatingShapes({ className = '' }: FloatingShapeProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large blurred circle */}
      <div
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-30 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(203,106,237,0.4) 0%, transparent 70%)',
        }}
      />
      {/* Medium accent circle */}
      <div
        className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full opacity-20 animate-float-medium"
        style={{
          background: 'radial-gradient(circle, rgba(124,195,238,0.5) 0%, transparent 70%)',
        }}
      />
      {/* Small decorative shapes */}
      <div
        className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-primary/20 animate-pulse-soft"
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-accent/30 animate-pulse-soft"
        style={{ animationDelay: '1s' }}
      />
    </div>
  );
}

// Geometric patterns background
export function GeometricPattern({ variant = 'dots' }: { variant?: 'dots' | 'grid' | 'lines' }) {
  const patterns = {
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23CB6AED' fill-opacity='0.07'/%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23CB6AED' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E")`,
    lines: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0' stroke='%23CB6AED' stroke-opacity='0.04' stroke-width='1'/%3E%3C/svg%3E")`,
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: patterns[variant] }}
    />
  );
}

// Gradient mesh background
export function GradientMesh({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute w-full h-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="mesh1" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#CB6AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="mesh2" cx="70%" cy="70%">
            <stop offset="0%" stopColor="#7CC3EE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="mesh3" cx="80%" cy="20%">
            <stop offset="0%" stopColor="#5048DD" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#mesh1)" />
        <rect width="100" height="100" fill="url(#mesh2)" />
        <rect width="100" height="100" fill="url(#mesh3)" />
      </svg>
    </div>
  );
}

// Animated gradient border
export function GlowBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div
        className="absolute -inset-[1px] rounded-card bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"
      />
      <div className="relative bg-white rounded-card">{children}</div>
    </div>
  );
}

// Parallax wrapper
export function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      className={className}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}

// Shimmer effect for loading states and accents
export function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`}
    />
  );
}

// Glowing orb decoration
export function GlowingOrb({
  size = 'md',
  color = 'primary',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'secondary';
  className?: string;
}) {
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
  };

  const colors = {
    primary: 'from-primary/40 to-primary/0',
    accent: 'from-accent/40 to-accent/0',
    secondary: 'from-secondary/40 to-secondary/0',
  };

  return (
    <div
      className={`absolute rounded-full bg-gradient-radial ${sizes[size]} ${colors[color]} blur-3xl animate-pulse-soft pointer-events-none ${className}`}
    />
  );
}
