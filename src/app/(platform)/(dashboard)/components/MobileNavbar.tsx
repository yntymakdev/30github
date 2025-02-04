'use client'
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import SideBar from "@/app/(platform)/(dashboard)/components/SideBar";

export default function MobileNavbar ()  {
  return (

      <Sheet>
<SheetTrigger className="hidden md:flex h-full w-56 flex-col">

    <div>
    <Menu/>
    </div>
</SheetTrigger>
          <SheetContent side='left' className='p-0 bg-white'>
              <SideBar/>
          </SheetContent>
      </Sheet>
  );
};


