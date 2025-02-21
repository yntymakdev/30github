import { cva } from "class-variance-authority";
import React from "react";

const bannerVariants = cva("bord text-center p-4 text-sm flex items-center w-full", {
  variants: {
    variant: {
      warning: "bg-yellow-200/80 border-yellow-30 text-primary",
      success: "bg-emerald-700 border-emerald-800 text-secondary",
    },
  },
  defaultVariants: { variant: "warning" },
});
const Banner = () => {
  return <div>Banner</div>;
};

export default Banner;
