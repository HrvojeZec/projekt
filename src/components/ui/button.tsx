import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        solid: "",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
      },
      color: {
        green: "",
        brown: "",
        red: "",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
      radius: {
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      // SOLID
      {
        variant: "solid",
        color: "green",
        radius: "sm",
        class:
          "bg-[var(--green-500)] text-white hover:bg-[var(--green-600)] rounded-md",
      },
      {
        variant: "solid",
        color: "green",
        radius: "lg",
        class:
          "bg-[var(--green-500)] text-white hover:bg-[var(--green-600)] rounded-xl",
      },
      {
        variant: "solid",
        color: "green",
        radius: "full",
        class:
          "bg-[var(--green-500)] text-white hover:bg-[var(--green-600)] rounded-full",
      },

      {
        variant: "solid",
        color: "brown",
        radius: "sm",
        class:
          "bg-[var(--brown-500)] text-white hover:bg-[var(--brown-600)] rounded-md",
      },
      {
        variant: "solid",
        color: "brown",
        radius: "lg",
        class:
          "bg-[var(--brown-500)] text-white hover:bg-[var(--brown-600)] rounded-xl",
      },
      {
        variant: "solid",
        color: "brown",
        radius: "full",
        class:
          "bg-[var(--brown-500)] text-white hover:bg-[var(--brown-600)] rounded-full",
      },

      {
        variant: "solid",
        color: "red",
        radius: "sm",
        class:
          "bg-[var(--error-500)] text-white hover:bg-[var(--error-600)] rounded-md",
      },
      {
        variant: "solid",
        color: "red",
        radius: "lg",
        class:
          "bg-[var(--error-500)] text-white hover:bg-[var(--error-600)] rounded-xl",
      },
      {
        variant: "solid",
        color: "red",
        radius: "full",
        class:
          "bg-[var(--error-500)] text-white hover:bg-[var(--error-600)] rounded-full",
      },

      // OUTLINE
      {
        variant: "outline",
        color: "green",
        radius: "sm",
        class:
          "border border-[var(--green-500)] text-[var(--green-600)] hover:bg-[var(--green-50)] rounded-md",
      },
      {
        variant: "outline",
        color: "green",
        radius: "lg",
        class:
          "border border-[var(--green-500)] text-[var(--green-600)] hover:bg-[var(--green-50)] rounded-xl",
      },
      {
        variant: "outline",
        color: "green",
        radius: "full",
        class:
          "border border-[var(--green-500)] text-[var(--green-600)] hover:bg-[var(--green-50)] rounded-full",
      },

      {
        variant: "outline",
        color: "brown",
        radius: "sm",
        class:
          "border border-[var(--brown-500)] text-[var(--brown-600)] hover:bg-[var(--brown-50)] rounded-md",
      },
      {
        variant: "outline",
        color: "brown",
        radius: "lg",
        class:
          "border border-[var(--brown-500)] text-[var(--brown-600)] hover:bg-[var(--brown-50)] rounded-xl",
      },
      {
        variant: "outline",
        color: "brown",
        radius: "full",
        class:
          "border border-[var(--brown-500)] text-[var(--brown-600)] hover:bg-[var(--brown-50)] rounded-full",
      },

      {
        variant: "outline",
        color: "red",
        radius: "sm",
        class:
          "border border-[var(--error-500)] text-[var(--error-600)] hover:bg-[var(--error-50)] rounded-md",
      },
      {
        variant: "outline",
        color: "red",
        radius: "lg",
        class:
          "border border-[var(--error-500)] text-[var(--error-600)] hover:bg-[var(--error-50)] rounded-xl",
      },
      {
        variant: "outline",
        color: "red",
        radius: "full",
        class:
          "border border-[var(--error-500)] text-[var(--error-600)] hover:bg-[var(--error-50)] rounded-full",
      },

      // GHOST
      {
        variant: "ghost",
        color: "green",
        radius: "sm",
        class: "text-[var(--green-600)] hover:bg-[var(--green-50)] rounded-md",
      },
      {
        variant: "ghost",
        color: "green",
        radius: "lg",
        class: "text-[var(--green-600)] hover:bg-[var(--green-50)] rounded-xl",
      },
      {
        variant: "ghost",
        color: "green",
        radius: "full",
        class:
          "text-[var(--green-600)] hover:bg-[var(--green-50)] rounded-full",
      },

      {
        variant: "ghost",
        color: "brown",
        radius: "sm",
        class: "text-[var(--brown-600)] hover:bg-[var(--brown-50)] rounded-md",
      },
      {
        variant: "ghost",
        color: "brown",
        radius: "lg",
        class: "text-[var(--brown-600)] hover:bg-[var(--brown-50)] rounded-xl",
      },
      {
        variant: "ghost",
        color: "brown",
        radius: "full",
        class:
          "text-[var(--brown-600)] hover:bg-[var(--brown-50)] rounded-full",
      },

      {
        variant: "ghost",
        color: "red",
        radius: "sm",
        class: "text-[var(--error-600)] hover:bg-[var(--error-50)] rounded-md",
      },
      {
        variant: "ghost",
        color: "red",
        radius: "lg",
        class: "text-[var(--error-600)] hover:bg-[var(--error-50)] rounded-xl",
      },
      {
        variant: "ghost",
        color: "red",
        radius: "full",
        class:
          "text-[var(--error-600)] hover:bg-[var(--error-50)] rounded-full",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "green",
      size: "md",
      radius: "lg",
    },
  }
);

function Button({
  className,
  variant,
  color,
  size,
  radius,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, color, size, radius }),
        className
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
