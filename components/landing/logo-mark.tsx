import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md bg-lime-500 font-display text-base font-bold text-white shadow-brand-mark",
        className,
      )}
    >
      T
    </span>
  )
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        Trac<span className="text-lime-500">e</span>
      </span>
    </span>
  )
}
