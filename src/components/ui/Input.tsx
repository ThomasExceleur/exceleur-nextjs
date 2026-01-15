'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-heading font-semibold text-small text-text-dark mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 bg-white border-none rounded-input text-body text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all',
            error && 'ring-2 ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-small text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-small text-text-light">{helperText}</p>
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
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-heading font-semibold text-small text-text-dark mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 bg-white border-none rounded-input text-body text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[120px] resize-y',
            error && 'ring-2 ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-small text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-small text-text-light">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
