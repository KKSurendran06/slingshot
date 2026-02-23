import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "bg-[#20242c] text-secondary-foreground [a&]:hover:bg-[#2a2e38]",
        secondary:
          "bg-[#1a1d23] text-muted-foreground [a&]:hover:bg-[#20242c]",
        destructive:
          "bg-[#ff453a]/10 text-[#ff453a] [a&]:hover:bg-[#ff453a]/15",
        outline:
          "border border-[rgba(255,255,255,0.06)] text-muted-foreground bg-transparent [a&]:hover:bg-[#1a1d23]",
        ghost: "text-muted-foreground [a&]:hover:bg-[#1a1d23]",
        link: "text-[#3b82f6] underline-offset-4 [a&]:hover:underline p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
