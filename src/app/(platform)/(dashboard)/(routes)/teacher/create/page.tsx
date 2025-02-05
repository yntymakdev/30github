'use client'
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
  const



  return (
    <div>
    CreatePage
  
    </div>
  );
};


