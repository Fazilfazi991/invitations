"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-soft hover:bg-primary-dark",
        outline: "border border-border bg-white text-primary hover:bg-primary-soft",
        ghost: "text-foreground hover:bg-primary-soft",
        soft: "bg-primary-soft text-primary hover:bg-brand-light/50",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 px-4",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <motion.span whileTap={{ scale: 0.98 }} className="inline-flex">
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
      </motion.span>
    );
  }
);
Button.displayName = "Button";
