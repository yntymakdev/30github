'use client'
import {UserButton} from "@clerk/nextjs";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";

export default function NavbarRoutes ()  {
  const  pathname = usePathname()
  const router = useRouter();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className='flex gap-x-2 ml-auto'>
      {
        isTeacherPage || isPlayerPage ? (
            <Button>
              <LogOut className='h-4 w-4 mr-2'/>
              Exit
            </Button>

        )

      }

      <UserButton/>


    </div>
  );
};


