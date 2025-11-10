// components/CustomButton/types.ts
import { ButtonProps } from "@/components/ui/button";

export type CustomButtonVariant = "primary" | "secondary" | "danger";
export type CustomButtonSize = "sm" | "md" | "lg";

export interface CustomButtonProps extends ButtonProps {
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
}
