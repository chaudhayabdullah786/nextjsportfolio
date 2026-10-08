// src/components/admin/FormField.tsx
import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  children?: React.ReactNode; // for custom input like textarea or select
  helpText?: string;
}

// Shared input class tokens
const inputBase = [
  'w-full min-w-0',
  'border border-[var(--border-color)]',
  'rounded-lg',
  'px-4 py-3',
  'bg-[rgba(255,255,255,0.025)]',
  'text-white text-[0.9375rem]',
  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]',
  'transition-all duration-200',
  'placeholder:text-[var(--fg-muted)]',
].join(' ');

export default function FormField({ label, name, type = 'text', placeholder, required = false, defaultValue, children, helpText }: FormFieldProps) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-[13px] font-semibold text-[var(--fg-base)] mb-2 tracking-wide">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children ? (
        React.cloneElement(children as React.ReactElement<{ id?: string; name?: string; required?: boolean; defaultValue?: string | number; className?: string }>, {
          id: name,
          name,
          required,
          defaultValue,
          className: inputBase,
        })
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          className={inputBase}
          style={{ height: '44px' }}
        />
      )}
      {helpText && <p className="mt-1.5 text-[12px] text-[var(--fg-muted)] leading-relaxed">{helpText}</p>}
    </div>
  );
}
