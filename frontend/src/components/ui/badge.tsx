import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-violet-500/15 text-violet-300 border-violet-500/20 [a&]:hover:bg-violet-500/25",
        secondary:
          "bg-white/[0.06] text-white/60 border-white/[0.08] [a&]:hover:bg-white/[0.1]",
        destructive:
          "bg-red-500/15 text-red-400 border-red-500/20 [a&]:hover:bg-red-500/25",
        outline:
          "border-white/[0.1] text-white/60 [a&]:hover:bg-white/[0.06]",
        ghost: "text-white/50 [a&]:hover:bg-white/[0.06]",
        link: "text-violet-400 underline-offset-4 [a&]:hover:underline",
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
