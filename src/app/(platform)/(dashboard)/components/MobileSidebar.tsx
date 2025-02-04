'use client'
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import SideBar from "@/app/(platform)/(dashboard)/components/SideBar";

export default function MobileSidebar ()  {
  return (

      <Sheet>
<SheetTrigger className="md:hidden pr-4 hover:opacity-75  transition">

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


