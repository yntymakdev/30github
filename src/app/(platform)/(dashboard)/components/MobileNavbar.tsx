'use client'
import {Menu} from "lucide-react";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";

export default function MobileNavbar ()  {
  return (

      <Sheet>
<SheetTrigger className="hidden md:flex h-full w-56 flex-col">

    <div>
    <Menu/>
    </div>
</SheetTrigger>
      </Sheet>
  );
};


