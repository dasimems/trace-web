"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "motion/react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { useEndpoint } from "@/hooks/use-endpoint"
import {
  applyForLoan,
  getLoanAffordability,
  getLoanProducts,
  type TLoanProduct,
} from "@/api/loans"
import { constructErrorMessage } from "@/api/functions"
import { formatNairaWhole } from "@/lib/money"
import { REPAYMENT_SIMULATOR_ANCHOR_ID } from "@/components/dashboard/loans/apply-now-button"

const TENOR_OPTIONS = [30, 60, 90, 180] as const

export function RepaymentSimulator() {
  const productsQuery = useEndpoint("/loans/products", getLoanProducts)
  const products = productsQuery.data ?? []
  const eligibleProducts = products.filter((p) => p.eligible)
  const activeProduct: TLoanProduct | undefined =
    eligibleProducts[0] ?? products[0]

  const [productId, setProductId] = useState<string | null>(null)
  const [amount, setAmount] = useState<number | null>(null)
  const [tenorDays, setTenorDays] = useState<number>(180)
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    if (activeProduct && !productId) {
      setProductId(activeProduct.id)
      const mid = Math.round(
        (activeProduct.minAmount + activeProduct.maxAmount) / 2,
      )
      setAmount(mid)
      const midTenor =
        TENOR_OPTIONS.find(
          (t) => t >= activeProduct.minTenorDays && t <= activeProduct.maxTenorDays,
        ) ?? activeProduct.maxTenorDays
      setTenorDays(midTenor)
    }
  }, [activeProduct, productId])

  const affordabilityKey =
    productId && amount && tenorDays
      ? `/loans/affordability?p=${productId}&a=${amount}&t=${tenorDays}`
      : null
  const affordabilityQuery = useEndpoint(affordabilityKey, () =>
    getLoanAffordability({ productId: productId!, amount: amount!, tenorDays }),
  )
  const affordability = affordabilityQuery.data

  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? activeProduct,
    [products, productId, activeProduct],
  )

  const min = product?.minAmount ?? 100_000_00
  const max = product?.maxAmount ?? 1_800_000_00
  const fillPercent =
    amount && max > min ? ((amount - min) / (max - min)) * 100 : 0

  async function handleApply() {
    if (!productId || !amount) return
    setIsApplying(true)
    try {
      await applyForLoan({ productId, requestedAmount: amount, tenorDays })
      toast.success("Application submitted. We'll get back within 1 business day.")
    } catch (error) {
      const message = constructErrorMessage(
        error as TApiErrorResponseType,
        "Couldn't submit application.",
      )
      toast.error(message)
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div
      id={REPAYMENT_SIMULATOR_ANCHOR_ID}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-2">
        <h3 className="font-display text-base font-semibold text-foreground">
          Repayment simulator
        </h3>
        {affordabilityQuery.isLoading && <Spinner className="size-3 text-text-3" />}
        <Badge variant="lime" className="h-6 px-2.5 text-[11px]">
          Live
        </Badge>
      </div>

      {productsQuery.isLoading && !product ? (
        <SimulatorSkeleton />
      ) : !product ? (
        <p className="mt-4 text-sm text-text-3">
          {productsQuery.error ?? "No loan products available right now."}
        </p>
      ) : (
        <>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-sm text-text-3">Amount</div>
              <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
                {amount !== null ? formatNairaWhole(amount) : "—"}
              </div>
              <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.span
                  animate={{ width: `${fillPercent}%` }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="block h-full rounded-full bg-lime-500"
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={Math.max(1000, Math.round((max - min) / 100))}
                  value={amount ?? min}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
                  aria-label="Loan amount"
                />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[11px] text-text-3">
                <span>{formatNairaWhole(min)}</span>
                <span>{formatNairaWhole(max)}</span>
              </div>
            </div>

            <div>
              <div className="text-sm text-text-3">Tenor</div>
              <div className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
                {tenorDays} days
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {TENOR_OPTIONS.filter(
                  (t) => t >= product.minTenorDays && t <= product.maxTenorDays,
                ).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenorDays(t)}
                    className={cn(
                      "inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-colors",
                      tenorDays === t
                        ? "border-lime-500 bg-lime-50 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
                        : "border-border bg-card text-text-2 hover:border-neutral-300 hover:text-foreground dark:hover:border-neutral-700",
                    )}
                  >
                    {t} d
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat
              label="Weekly pay"
              value={
                affordability
                  ? formatNairaWhole(affordability.weeklyPayment)
                  : "—"
              }
            />
            <Stat
              label="Total cost"
              value={
                affordability
                  ? formatNairaWhole(affordability.totalRepayment)
                  : "—"
              }
            />
            <Stat
              label="APR"
              value={`${(product.interestRateBps / 100).toFixed(1)}%`}
              valueClass="text-lime-600 dark:text-lime-400"
            />
          </div>

          {affordability && (
            <div className="mt-5 flex">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] tracking-wide text-white",
                  affordability.isAffordable
                    ? "bg-neutral-950"
                    : "bg-warn-600",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    affordability.isAffordable ? "bg-lime-500" : "bg-white",
                  )}
                />
                {affordability.isAffordable
                  ? "Repayment fits comfortably in your weekly cash-flow."
                  : "Daily repayment exceeds 30% of your typical inflow — consider a smaller amount or longer tenor."}
              </span>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              size="lg"
              disabled={isApplying || !product.eligible || !amount}
              onClick={handleApply}
              className="h-9 gap-1.5 rounded-full px-4 shadow-primary"
            >
              {isApplying ? <Spinner /> : null}
              {isApplying ? "Submitting" : "Apply for this"}
            </Button>
            {!product.eligible && (
              <span className="text-xs text-text-3">
                Eligible after you reach {product.requiredTier} tier.
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function SimulatorSkeleton() {
  return (
    <div className="mt-5 grid gap-6 md:grid-cols-2">
      <div>
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mt-2 h-8 w-32" />
        <Skeleton className="mt-3 h-1.5 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mt-2 h-8 w-32" />
        <Skeleton className="mt-3 h-8 w-44" />
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  valueClass,
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div>
      <div className="text-sm text-text-3">{label}</div>
      <div
        className={cn(
          "mt-1 font-display text-xl font-semibold tabular-nums tracking-tight text-foreground",
          valueClass,
        )}
      >
        {value}
      </div>
    </div>
  )
}

