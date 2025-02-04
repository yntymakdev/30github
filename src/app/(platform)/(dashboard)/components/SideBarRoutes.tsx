'use client'
import {Compass, Layout} from "lucide-react";
import SideBarItem from "@/app/(platform)/(dashboard)/components/SideBarItem";

const guestRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/',
    } ,
    {
        icon: Compass,
        label: 'Browse',
        href: '/search',
    }
]

export default function SideBarRoutes ()  {
    const  routes = guestRoutes;

  return (
    <div className='flex flex-col w-full'>
        {routes.map((route) => (
            <SideBarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
            />

        )}
  
    </div>
  );
};


