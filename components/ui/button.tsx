import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      solid: "",
      line: "btn-line",
      ghost: "btn-ghost",
    },
  },
  defaultVariants: { variant: "solid" },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  dot?: boolean;
}

export function Button({ className, variant, asChild = false, dot = false, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  if (asChild) {
    return (
      <Comp className={cn(buttonVariants({ variant }), className)} {...props}>
        {children}
      </Comp>
    );
  }
  return (
    <Comp className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
      {dot && <span className="dot" aria-hidden="true" />}
    </Comp>
  );
}

export function Dot() {
  return <span className="dot" aria-hidden="true" />;
}

export { buttonVariants };
