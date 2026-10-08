'use client';

import React, { useState } from 'react';
import { createAdmin } from '../actions';
import { useRouter } from 'next/navigation';
import FormField from '@/components/admin/FormField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { FormActions } from '@/components/admin/FormActions';

export default function AdminForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    try {
      await createAdmin(formData);
      router.push('/admin/admins');
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        setError(e.message || 'Failed to create admin');
      } else {
        setError('Failed to create admin');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <AdminFormSection 
          title="Account Details" 
          description="Create a new admin user."
        >
          <FormField label="Username" name="username" required />
          
          <FormField label="Email" name="email" type="email" required />
          
          <FormField label="Password" name="password" type="password" required helpText="Must be strong and secure." />
        </AdminFormSection>

        <FormActions 
          submitLabel="Create Admin" 
          cancelHref="/admin/admins" 
          isPending={isSubmitting} 
        />
      </form>
    </div>
  );
}
