import { RecoveryPassword } from '@/components/recovery-password';
import dynamic from 'next/dynamic';
import React from 'react';

export default function RecoveryPasswordPage() {
  return (
    <div className="min-h-screen py-10 mx-aut" style={{}}>
      <div className="flex items-center justify-center h-full">
        <RecoveryPassword />
      </div>
    </div>
  );
}
