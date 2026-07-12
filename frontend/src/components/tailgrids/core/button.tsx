"use client";

import { cn } from "@/utils/cn";
import { VariantProps } from "class-variance-authority";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps
} from "react-aria-components";

// `buttonStyles` is the single CVA source of truth, owned by /styles/button.ts.
// Re-exported here so existing React consumers keep working without churn.
export { buttonStyles } from "@/styles/button";

export interface ButtonProps
  extends
    Omit<AriaButtonProps, "isDisabled" | "isPending">,
    VariantProps<typeof buttonStyles> {
  disabled?: boolean;
  pending?: boolean;
  readOnly?: boolean;
}

export function Button({
  variant,
  appearance,
  iconOnly,
  size,
  children,
  className,
  disabled,
  pending,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      className={cn(
        buttonStyles({
          variant,
          appearance,
          iconOnly,
          size
        }),
        className
      )}
      isDisabled={disabled}
      isPending={pending}
      {...props}
    >
      {children}
    </AriaButton>
  );
}
