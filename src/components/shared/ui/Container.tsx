import React from 'react';

export function Container({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 w-full ${className}`} {...props}>
      {children}
    </div>
  );
}
