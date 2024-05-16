import { cn } from "@/lib/utils"
import { ComponentProps, ElementType, ReactNode } from "react"

type Props<T extends ElementType> = {
  asTag?: T
} & ComponentProps<T>

export const MaxWidthWrapper = <T extends ElementType = "div">({ className, asTag, ...rest }: Props<T>) => {
  const Tag = asTag || "div"

  return <Tag className={cn("h-full w-full mx-auto max-w-screen-xl px-2.5 md:px-20", className)} {...rest} />
}
