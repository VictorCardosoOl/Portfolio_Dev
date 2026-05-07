import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const headingVariants = cva(
  "font-serif tracking-tight",
  {
    variants: {
      size: {
        huge: "text-fluid-huge",
        h1: "text-fluid-h1",
        h2: "text-fluid-h2",
        h3: "text-fluid-h3",
        h4: "text-fluid-h4",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold",
      },
      themeColor: {
        default: "text-charcoal",
        cream: "text-cream",
        white: "text-white",
      }
    },
    defaultVariants: {
      size: "h2",
      weight: "normal",
      themeColor: "default",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, weight, themeColor, as: Comp = "h2", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ size, weight, themeColor, className }))}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
