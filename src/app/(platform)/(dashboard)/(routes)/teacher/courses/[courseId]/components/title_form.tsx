'use client'
import  * as z from 'zod'
import {useForm} from "react-hook-form";
import {Pencil} from "lucide-react";

interface TitleFormProps{
    initalData:{
        title:string
    }
}

export const  TitleForm =({initalData,courseId}: TitleFormProps)=>  {
    const form  = useForm<z.infer<typeof  formSchema>>({
        defaultValues: initalData
    })
    const {isSubmitting,isValid} = form.formState
const onSubmit=async (values:z.infer<typeof formSchema> ) => {
    console.log(values)

}

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            Course Title
        </div>
        <Button variant='ghost'>

            {isEditting && (
                <>Cancel </>

            )}{
                isEditting && (
                    <>
                    <Pencil
                    </>
            )

        }
<Pencil className='h-4'/>

        </Button>
    </div>
  );
};


