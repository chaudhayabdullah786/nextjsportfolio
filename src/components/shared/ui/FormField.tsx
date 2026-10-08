import React from 'react';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  error?: string;
  htmlFor?: string;
  required?: boolean;
}

export function FormField({ label, error, htmlFor, required, children, className = '', ...props }: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`} {...props}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--fg-base)] flex items-center gap-1">
        {label}
        {required && <span className="text-[var(--accent)]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
