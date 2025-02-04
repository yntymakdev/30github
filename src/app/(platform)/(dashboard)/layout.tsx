'use client';

import { ReactNode } from 'react';
import Sidebar from "@/app/(platform)/(dashboard)/components/sidebar";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
   <div className='h-full'>

<div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
   <Sidebar/>
</div>

      {children}
   </div>
  );
  }
