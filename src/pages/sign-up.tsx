import { SignUpForm } from '@/components/sign-up';
import React from 'react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen py-10 px-auto">
      <div className="flex items-center justify-center h-full ">
        <SignUpForm />
      </div>
    </div>
  );
}
