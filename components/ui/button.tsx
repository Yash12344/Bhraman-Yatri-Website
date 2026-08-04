import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.05em] whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-saffron-500 text-white shadow-md shadow-saffron-500/25 hover:bg-saffron-600 hover:shadow-lg hover:shadow-saffron-500/30 hover:-translate-y-0.5",
        dark: "bg-forest-700 text-white hover:bg-forest-900",
        outline:
          "border-2 border-white bg-transparent text-white hover:bg-white/10",
        ghost: "text-gray-700 hover:bg-gray-100",
      },
      size: {
        sm: "h-9 rounded-lg px-4 text-xs",
        md: "h-11 rounded-lg px-6 text-sm",
        lg: "h-12 rounded-lg px-8 text-sm",
        pill: "h-12 rounded-full px-8 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
