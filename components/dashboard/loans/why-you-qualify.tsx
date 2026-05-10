type QualifyRow = {
  label: string
  value: string
}

const ROWS: ReadonlyArray<QualifyRow> = [
  { label: "Income stability",  value: "9 wks · ✓"           },
  { label: "Repayment history", value: "4 / 4 on time"       },
  { label: "Trust score",       value: "82"                  },
  { label: "Sector resilience", value: "Textiles · stable"   },
]

export function WhyYouQualify() {
  return (
    <div className="rounded-2xl border border-lime-300 bg-lime-50/40 p-5 dark:border-lime-500/40 dark:bg-lime-500/5">
      <span className="ai-badge">Why you qualify</span>
      <p className="mt-4 text-sm leading-relaxed text-text-2">
        &ldquo;You qualify for Gold because your business income has been stable
        for{" "}
        <span className="font-semibold text-lime-600 dark:text-lime-400">
          9 consecutive weeks
        </span>
        , with a debt-to-income ratio of just 0.18.&rdquo;
      </p>

      <ul className="mt-5 divide-y divide-lime-200/60 dark:divide-lime-500/20">
        {ROWS.map((row) => (
          <li key={row.label} className="flex items-center justify-between py-3 text-sm">
            <span className="text-text-2">{row.label}</span>
            <span className="font-mono text-xs tracking-wide text-foreground">
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
