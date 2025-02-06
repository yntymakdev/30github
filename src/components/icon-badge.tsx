import {cva, type VariantProps} from "class-variance-authority";
import {allowedDisplayValues} from "next/dist/compiled/@next/font/dist/constants";
import {cn} from "@/lib/utils";

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
                sm: 'p-1',
            },
        },
    defaultVarianst: {
        variant: 'default',
        size: 'default',
    },
        },
)
const   iconVariants = cva(
    '',{
        variants: {
            variant: {
                default: 'text-sky-700',
                success: 'text-emerald-700',
            },
            size: {
                default: 'p-2',
                sm: 'p-1',
            },
        }
        defaultVarianst: {
            variant: 'default',
            size: 'default',
        }

    }
)

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps  extends  BackgroundVariantsProps ,IconVariantsProps{
    export  const IconBadge = ({
        icon: Icon,
        variant,
        size
    } : IconBadgeProps) => {
        <div className={cn(backgroundVariants({variant,size}))}>
            <Icon className={cn(iconVariants({variant,size}))}/>

        </div>

}

}