'use client';

import { ReactNode } from 'react';
import SideBar from "@/app/(platform)/(dashboard)/components/SideBar";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
   <div className='h-full'>

<div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
   <SideBar/>
</div>
<main className={'md:pl-56'}>

      {children}
</main>
   </div>
  );
  }
