'use client'
import  * as z from 'zod'
import {useForm} from "react-hook-form";

interface TitleFormProps{
    initalData:{
        title:string
    }
}

export const  TitleForm =({initalData,courseId}: TitleFormProps)=>  {
    const form  = useForm<z.infer<typeof  formSchema>>({
        defaultValues: initalData

    })

  return (
    <div>
    TitleForm
  
    </div>
  );
};


