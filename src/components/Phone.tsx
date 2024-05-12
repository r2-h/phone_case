import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

type Props = {
  imgSrc: string
  dark?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Phone = ({ imgSrc, dark, className, ...rest }: Props) => {
  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)} {...rest}>
      <img
        src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <img src={imgSrc} className="object-cover" alt="overlaying phone image" />
      </div>
    </div>
  )
}
