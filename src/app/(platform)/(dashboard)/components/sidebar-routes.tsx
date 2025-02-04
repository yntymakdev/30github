'use client'
import {Compass, Layout} from "lucide-react";

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

export default function SidebarRoutes ()  {
    const  router = guestRoutes;``

  return (
    <div className='flex flex-col w-full'>
    sidebar-routes
  
    </div>
  );
};


