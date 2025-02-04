'use client';

import { ReactNode } from 'react';
import SideBar from "@/app/(platform)/(dashboard)/components/SideBar";
import Navbar from "@/app/(platform)/(dashboard)/components/Navbar";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
   <div className='h-full'>
<div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
    <Navbar/>
</div>
<div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
   <SideBar/>
</div>
<main className={'md:pl-56'}>

      {children}
</main>
   </div>
  );
  }
