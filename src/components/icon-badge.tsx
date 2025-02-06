const  backgroundVariants= cva(
    'rounded-full flex items-center justify-center',
    {variants: {
        variant: {
            default: 'bg-sky-100',
            success: 'bg-emerald-100',
        },
            iconVariant: {
            default: 'text-sky-100',
                success: 'text-emerald-700',
            },
            size: {
            default: 'p-2',
            }


        }}

)