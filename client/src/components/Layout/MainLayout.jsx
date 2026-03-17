import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
