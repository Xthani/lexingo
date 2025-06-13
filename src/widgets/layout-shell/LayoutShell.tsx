'use client';

import { ReactNode, useState } from 'react';
import { Sidebar } from '@shared/ui/sidebar';
import { LayoutHeader } from '@shared/ui/layout-header';

export const LayoutShell = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <LayoutHeader isSidebarOpen={isSidebarOpen} />
      <main className="main-content">{children}</main>
    </div>
  );
}; 