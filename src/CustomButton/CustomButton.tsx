// components/CustomButton/CustomButton.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { customButtonVariants } from "./styles";
import { cn } from "@/lib/utils";
import type { CustomButtonProps } from "./types";

export const CustomButton = React.forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(customButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
});

CustomButton.displayName = "CustomButton";
