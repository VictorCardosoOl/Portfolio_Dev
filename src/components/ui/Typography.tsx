import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const typographyVariants = cva(
  "m-0", // base classes
  {
    variants: {
      variant: {
        huge: "text-fluid-huge font-serif font-bold uppercase tracking-tighter leading-none",
        display: "text-fluid-display font-serif font-bold uppercase tracking-tight",
        h1: "text-fluid-h1 font-serif font-bold uppercase tracking-tight",
        h2: "text-fluid-h2 font-serif font-medium uppercase tracking-tight",
        h3: "text-fluid-h3 font-serif font-medium uppercase",
        h4: "text-fluid-h4 font-serif font-bold uppercase",
        p: "text-fluid-p font-sans leading-relaxed opacity-80",
        label: "text-fluid-label font-sans font-bold uppercase tracking-widest opacity-60",
      },
      themeColor: {
        default: "text-[#1a1a1a]",
        inverted: "text-[#F4EFE8]",
        muted: "text-[#1a1a1a]/60",
        none: "",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      }
    },
    defaultVariants: {
      variant: "p",
      themeColor: "default",
      align: "left",
    },
  }
);

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, themeColor, align, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, themeColor, align, className }))}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
