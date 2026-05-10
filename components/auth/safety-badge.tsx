import { ShieldCheck } from "lucide-react"

export function SafetyBadge() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4 shadow-card">
      <div className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
        <ShieldCheck className="size-4" />
        Bank-grade safety
      </div>
      <p className="mt-2 text-xs leading-relaxed text-text-3">
        Read-only access. We never store credentials. Encrypted with AES-256.
        Audited by NDPR &amp; PCI-DSS.
      </p>
    </div>
  )
}
