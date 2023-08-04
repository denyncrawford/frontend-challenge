import { StoresCard } from '@/components/stores';
import React from 'react';

const Stores = () => {
  return (
    <div>
      <div className="max-h-screen mx-auto">
        <div className="flex items-center justify-center h-full">
          <StoresCard />
        </div>
      </div>
    </div>
  );
};

export default Stores;
