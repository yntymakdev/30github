'use client'
import {BarChart, Compass, Layout, List} from "lucide-react";
import SideBarItem from "@/app/(platform)/(dashboard)/components/SideBarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/',
    },
    {
        icon: Compass,
        label: 'Browse',
        href: '/search',
    },
    {
        icon: Compass,
        label: 'Settings',
        href: '/settings',
    },
    {
        icon: Compass,
        label: 'Think',
        href: '/think',
    },
    {
        icon: Compass,
        label: 'What',
        href: '/what',
    },
];

const teacherRoutes = [
    {
        icon: List,
        label: 'Courses',
        href: '/teacher/courses',
    },
    {
        icon: BarChart,
        label: 'Analitycs',
        href: '/teacher/analitycs',
    },
];

export default function SideBarRoutes() {
    const pathname = usePathname();
    const isTeacherPage = pathname.startsWith("/teacher"); // Предположим, что это определяет, является ли текущая страница страницей учителя
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className='flex flex-col w-full'>
            {routes.map((route) => (
                <SideBarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    );
}
