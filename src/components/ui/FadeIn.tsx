'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const getInitialStyles = () => {
    const base = { opacity: 0, transform: '' };
    switch (direction) {
      case 'up':
        base.transform = 'translateY(30px)';
        break;
      case 'down':
        base.transform = 'translateY(-30px)';
        break;
      case 'left':
        base.transform = 'translateX(-30px)';
        break;
      case 'right':
        base.transform = 'translateX(30px)';
        break;
      default:
        base.transform = 'none';
    }
    return base;
  };

  const initialStyles = getInitialStyles();

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : initialStyles.opacity,
        transform: isVisible ? 'none' : initialStyles.transform,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
