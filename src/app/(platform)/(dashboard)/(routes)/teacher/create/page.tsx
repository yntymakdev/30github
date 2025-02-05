'use client'
  import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolver/zod"
const formSchema = z.object({
title: z.string().min(1){
  message: "title is requires"
  }
  })
export default function CreatePage()  {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  })

  const {} = form.formState;
  const onSubmit =(values:z.infer<typeof  formSchema>) => {
    console.log(values)

  }



  return (
    <div>
    CreatePage
  
    </div>
  );
};


