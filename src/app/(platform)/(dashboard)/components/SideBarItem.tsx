'use client'

import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface  SideBarItemProps {
  icon: LucideIcon,
  label: string,
  href: string,

}

export default function SideBarItem ({icon: Icon,label,href}: SideBarItemProps)  {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (pathname === '/' && href === '/') || pathname?.startsWith(`${href}/`);
const onClick = () => {
  router.push(href);
}

  return (
    <button onClick={onClick} type='button' className={cn('flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:bg-slate-300/20', isActive && 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700')}>
    <div className='flex items-center gap-x-2 py-4'>
      <Icon/>

    </div>
  
    </button>
  );
};


