import Logo from "@/app/(platform)/(dashboard)/components/logo";
import SideBarRoutes from "@/app/(platform)/(dashboard)/components/SideBarRoutes";

export default function SideBar ()  {
  return (

    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>

        <div className='p-6'>
            <Logo/>
    </div>
        <div className='flex flex-col w-full'>
            <SideBarRoutes/>
        </div>
    </div>
  );
};


