import React from 'react';
import { AdminPageHeader } from './AdminPageHeader';

interface AdminFormLayoutProps {
  title: string;
  backHref: string;
  children: React.ReactNode;
}

export default function AdminFormLayout({ title, backHref, children }: AdminFormLayoutProps) {
  return (
    <div className="py-2 max-w-[1200px] mx-auto w-full">
      <AdminPageHeader title={title} backHref={backHref} />
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
