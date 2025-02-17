'use client'
import MobileSidebar from "@/app/(platform)/(dashboard)/components/MobileSidebar";
import NavbarRoutes from "@/components/NavbarRoutes";

export default function Navbar ()  {
  return (
    <div className='p-4 border h-full flex items-center bg-white shadow-sm'>
    <MobileSidebar/>
      <NavbarRoutes/>

    </div>
  );
};


