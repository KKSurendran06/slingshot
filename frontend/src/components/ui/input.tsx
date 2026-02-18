import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-white/30 selection:bg-violet-500/30 selection:text-white bg-white/[0.04] border-white/[0.08] h-9 w-full min-w-0 rounded-xl border px-3 py-1 text-base text-white/90 shadow-xs transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-violet-500/40 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] focus-visible:bg-white/[0.06]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
