import clsx from "clsx"
import { Star } from "lucide-react"

type Props = {
  className?: { wrapper?: string; star?: string }
}
export const Stars = ({ className }: Props) => {
  return (
    <div className={clsx("flex gap-0.5", className?.wrapper)}>
      <Star className={clsx("text-green-600 fill-green-600", className?.star)} />
      <Star className={clsx("text-green-600 fill-green-600", className?.star)} />
      <Star className={clsx("text-green-600 fill-green-600", className?.star)} />
      <Star className={clsx("text-green-600 fill-green-600", className?.star)} />
      <Star className={clsx("text-green-600 fill-green-600", className?.star)} />
    </div>
  )
}
