import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export const MaxWidthWrapper = ({ className, children }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("h-full w-full mx-auto max-w-screen-xl px-2.5 md:px-20", className)}>{children}</div>
  )
}
