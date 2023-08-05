import { CreateStoreForm } from '@/components/create-store';
import React from 'react';

const Stores = () => {
  return (
    <div>
      <div className="min-h-screen mx-auto">
        <div className="flex items-center justify-center h-full">
          <CreateStoreForm />
        </div>
      </div>
    </div>
  );
};

export default Stores;