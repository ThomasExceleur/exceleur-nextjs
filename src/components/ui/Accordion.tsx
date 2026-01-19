'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  variant?: 'default' | 'bordered' | 'card';
}

export function Accordion({ items, className = '', variant = 'default' }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const variantStyles = {
    default: {
      container: 'border border-gray-100 rounded-2xl bg-white shadow-soft hover:shadow-card-elevated transition-shadow duration-300',
      button: 'hover:bg-gray-50/50',
      content: '',
    },
    bordered: {
      container: 'border-2 border-gray-200 rounded-xl bg-white',
      button: 'hover:bg-gray-50',
      content: '',
    },
    card: {
      container: 'bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-card-elevated border border-gray-100/50',
      button: 'hover:bg-primary/5',
      content: '',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={cn(
              'overflow-hidden transition-all duration-300',
              styles.container,
              isOpen && 'ring-2 ring-primary/20'
            )}
          >
            <button
              onClick={() => toggleItem(index)}
              className={cn(
                'w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors duration-200',
                styles.button
              )}
            >
              <div className="flex items-center gap-4">
                {/* Number indicator */}
                <span className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300',
                  isOpen
                    ? 'bg-gradient-to-br from-primary to-secondary text-white'
                    : 'bg-primary/10 text-primary'
                )}>
                  {index + 1}
                </span>
                <span className={cn(
                  'font-heading font-semibold transition-colors duration-300',
                  isOpen ? 'text-primary' : 'text-text-dark'
                )}>
                  {item.question}
                </span>
              </div>
              <span
                className={cn(
                  'flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300',
                  isOpen
                    ? 'bg-gradient-to-br from-primary to-secondary text-white rotate-180'
                    : 'bg-primary/10 text-primary'
                )}
              >
                <svg
                  className="w-5 h-5"
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
              </span>
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className={cn(
                  'px-6 pb-5 text-text-light leading-relaxed',
                  styles.content
                )}>
                  {/* Decorative line */}
                  <div className="w-full h-px bg-gradient-to-r from-primary/20 via-accent/20 to-transparent mb-4" />
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Alternative FAQ component with a different layout
interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ items, className = '' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn('grid md:grid-cols-2 gap-6', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={cn(
              'group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer',
              isOpen
                ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20'
                : 'bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg'
            )}
            onClick={() => setOpenIndex(isOpen ? null : index)}
          >
            {/* Icon */}
            {item.icon && (
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300',
                isOpen
                  ? 'bg-gradient-to-br from-primary to-secondary text-white'
                  : 'bg-primary/10 text-primary'
              )}>
                {item.icon}
              </div>
            )}

            {/* Question */}
            <h4 className={cn(
              'font-heading font-bold mb-2 pr-8 transition-colors duration-300',
              isOpen ? 'text-primary' : 'text-text-dark'
            )}>
              {item.question}
            </h4>

            {/* Answer */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="text-text-light text-sm leading-relaxed pt-2">
                {item.answer}
              </p>
            </div>

            {/* Toggle indicator */}
            <div className={cn(
              'absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
              isOpen
                ? 'bg-primary text-white rotate-180'
                : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
            )}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
