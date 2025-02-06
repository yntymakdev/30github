
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {IconBadge} from "@/components/icon-badge";
import {LayoutDashboard, LayoutDashboardIcon} from "lucide-react";

const  CourseIdPagePage  = async({params}: {params:{courseId: string}})=> {

 const {userId} = await  auth()
    if(!userId){
        return  redirect("/");
    }


  const course = await db.course.findUnique({
      where: {
          id: params.courseId,
      }
  })
    if(!course){
        return redirect("/");
    }

    const requiredFields =  [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
    ]
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
const completionText = `(${completedFields}/${totalFields})`
    return (
    <div className='p-6'>
        <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>
                    Course Setup
                </h1>

                <span className='text-sm text-slate-700'>
                    Completed fields {completionText}

                </span>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
            <div>
                <div className='flex items-center gap-x-2'>
                    <IconBadge   icon={LayoutDashboard} />
                    <h2 className='text-xl'>
                        Costomize your course
                    </h2>
                </div>
            </div>

        </div>

    </div>
  );
};

export default CourseIdPagePage;