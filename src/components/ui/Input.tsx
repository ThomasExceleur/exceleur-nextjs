'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'filled' | 'bordered' | 'glass';
}

const variantStyles = {
  default: 'bg-white border border-gray-200 focus:border-primary',
  filled: 'bg-gray-50 border border-transparent focus:bg-white focus:border-primary',
  bordered: 'bg-transparent border-2 border-gray-200 focus:border-primary',
  glass: 'bg-white/80 backdrop-blur-sm border border-white/50 focus:border-primary',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, icon, iconPosition = 'left', variant = 'default', ...props }, ref) => {
    const inputId = id || props.name;
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full group">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block font-heading font-semibold text-sm mb-2 transition-colors duration-200',
              isFocused ? 'text-primary' : 'text-text-dark'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* Icon left */}
          {icon && iconPosition === 'left' && (
            <div className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200',
              isFocused ? 'text-primary' : 'text-text-light'
            )}>
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3.5 rounded-xl text-body text-text placeholder:text-text-light/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300',
              variantStyles[variant],
              icon && iconPosition === 'left' && 'pl-12',
              icon && iconPosition === 'right' && 'pr-12',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              'hover:border-primary/50',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Icon right */}
          {icon && iconPosition === 'right' && (
            <div className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200',
              isFocused ? 'text-primary' : 'text-text-light'
            )}>
              {icon}
            </div>
          )}

          {/* Focus glow effect */}
          <div className={cn(
            'absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 pointer-events-none -z-10',
            isFocused && 'opacity-100'
          )} />
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-1.5 mt-2">
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-text-light">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'bordered' | 'glass';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, variant = 'default', ...props }, ref) => {
    const textareaId = id || props.name;
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full group">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block font-heading font-semibold text-sm mb-2 transition-colors duration-200',
              isFocused ? 'text-primary' : 'text-text-dark'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              'w-full px-4 py-3.5 rounded-xl text-body text-text placeholder:text-text-light/60 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 min-h-[140px] resize-y',
              variantStyles[variant],
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              'hover:border-primary/50',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Focus glow effect */}
          <div className={cn(
            'absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 pointer-events-none -z-10',
            isFocused && 'opacity-100'
          )} />
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-1.5 mt-2">
            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-text-light">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Search input variant
interface SearchInputProps extends Omit<InputProps, 'icon' | 'iconPosition'> {
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        variant="filled"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
        iconPosition="left"
        className={cn('pr-4', className)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch) {
            onSearch((e.target as HTMLInputElement).value);
          }
          props.onKeyDown?.(e);
        }}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
