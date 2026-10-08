import React from 'react';

export function Section({ children, className = '', ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`py-16 sm:py-20 md:py-24 lg:py-28 w-full relative scroll-mt-24 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
