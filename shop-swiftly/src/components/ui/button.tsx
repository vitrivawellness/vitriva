import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-medical-purple text-white hover:bg-primary-dark shadow-soft transition-all duration-300 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-medical-purple/20 bg-background text-medical-purple hover:bg-medical-purple/5 hover:border-medical-purple transition-all",
        secondary: "bg-medical-lavender text-medical-purple hover:bg-medical-lavender/80",
        ghost: "hover:bg-medical-lavender hover:text-medical-purple",
        link: "text-medical-purple underline-offset-4 hover:underline",
        hero: "bg-medical-purple text-white hover:bg-primary-dark tracking-wide uppercase text-sm font-sans font-bold shadow-soft",
        "hero-outline": "border-2 border-medical-purple text-medical-purple hover:bg-medical-purple hover:text-white tracking-wide uppercase text-sm font-sans font-bold",
      },
      size: {
        default: "h-12 px-6 py-3 rounded-2xl",
        sm: "h-10 rounded-xl px-4",
        lg: "h-14 rounded-2xl px-10 text-lg",
        xl: "h-16 rounded-[20px] px-12 text-xl font-bold",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
