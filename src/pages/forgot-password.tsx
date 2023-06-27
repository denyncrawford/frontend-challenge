import { ForgotPasswordForm } from '@/components/forgot-password';
import React from 'react';

export default function ForgotPasswordPage() {
  return (
    <div className="h-screen mx-auto">
      <div className="flex items-center justify-center h-full">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
