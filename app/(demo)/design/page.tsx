import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

type ScaleName =
  | "lime"
  | "neutral"
  | "good"
  | "warn"
  | "bad"
  | "info"
  | "purple"
  | "teal"

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

const HEXES: Record<ScaleName, Record<(typeof SHADES)[number], string>> = {
  lime: {
    50: "#FFF1F6", 100: "#FFE0EC", 200: "#FFC1D8", 300: "#FF94BC",
    400: "#F45F94", 500: "#E0185B", 600: "#C41250", 700: "#B40F47",
    800: "#8E0B38", 900: "#6B0828", 950: "#3F0418",
  },
  neutral: {
    50: "#FAFAF7", 100: "#F4F4EE", 200: "#E5E5DF", 300: "#CFCFC8",
    400: "#A8AAA3", 500: "#757872", 600: "#4A4D49", 700: "#2E312E",
    800: "#1A1C1A", 900: "#131413", 950: "#0B0C0B",
  },
  good: {
    50: "#ECFDF3", 100: "#D1FADF", 200: "#A7F3C5", 300: "#6EE7A1",
    400: "#34D279", 500: "#16A34A", 600: "#128A3F", 700: "#0E6E33",
    800: "#0B5728", 900: "#08401E", 950: "#042510",
  },
  warn: {
    50: "#FFF8EC", 100: "#FEEBC4", 200: "#FCD78A", 300: "#F8BD55",
    400: "#EFA532", 500: "#E08F1F", 600: "#B86B0F", 700: "#93550A",
    800: "#6F4008", 900: "#4D2C06", 950: "#2A1803",
  },
  bad: {
    50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA", 300: "#FCA5A5",
    400: "#F26D7D", 500: "#DC2626", 600: "#B91C1C", 700: "#991B1B",
    800: "#7F1D1D", 900: "#5C1414", 950: "#340A0A",
  },
  info: {
    50: "#EFF5FF", 100: "#DBE7FE", 200: "#BBCFFD", 300: "#8DAEFB",
    400: "#5A88F6", 500: "#2563EB", 600: "#1D4ED8", 700: "#1E40AF",
    800: "#1E3A8A", 900: "#172F6E", 950: "#0E1C42",
  },
  purple: {
    50: "#F5F0FF", 100: "#EAE0FE", 200: "#D4C2FD", 300: "#B295FB",
    400: "#8B62F4", 500: "#6D28D9", 600: "#5B1FB8", 700: "#4A1A95",
    800: "#391672", 900: "#2A1156", 950: "#170930",
  },
  teal: {
    50: "#ECFDF7", 100: "#C9F7E5", 200: "#95EDCA", 300: "#5BDBAA",
    400: "#28C28A", 500: "#0E7C66", 600: "#0C6A57", 700: "#0A5C4C",
    800: "#084538", 900: "#052E25", 950: "#021915",
  },
}

const SWATCH_BG: Record<ScaleName, Record<(typeof SHADES)[number], string>> = {
  lime: {
    50: "bg-lime-50", 100: "bg-lime-100", 200: "bg-lime-200", 300: "bg-lime-300",
    400: "bg-lime-400", 500: "bg-lime-500", 600: "bg-lime-600", 700: "bg-lime-700",
    800: "bg-lime-800", 900: "bg-lime-900", 950: "bg-lime-950",
  },
  neutral: {
    50: "bg-neutral-50", 100: "bg-neutral-100", 200: "bg-neutral-200", 300: "bg-neutral-300",
    400: "bg-neutral-400", 500: "bg-neutral-500", 600: "bg-neutral-600", 700: "bg-neutral-700",
    800: "bg-neutral-800", 900: "bg-neutral-900", 950: "bg-neutral-950",
  },
  good: {
    50: "bg-good-50", 100: "bg-good-100", 200: "bg-good-200", 300: "bg-good-300",
    400: "bg-good-400", 500: "bg-good-500", 600: "bg-good-600", 700: "bg-good-700",
    800: "bg-good-800", 900: "bg-good-900", 950: "bg-good-950",
  },
  warn: {
    50: "bg-warn-50", 100: "bg-warn-100", 200: "bg-warn-200", 300: "bg-warn-300",
    400: "bg-warn-400", 500: "bg-warn-500", 600: "bg-warn-600", 700: "bg-warn-700",
    800: "bg-warn-800", 900: "bg-warn-900", 950: "bg-warn-950",
  },
  bad: {
    50: "bg-bad-50", 100: "bg-bad-100", 200: "bg-bad-200", 300: "bg-bad-300",
    400: "bg-bad-400", 500: "bg-bad-500", 600: "bg-bad-600", 700: "bg-bad-700",
    800: "bg-bad-800", 900: "bg-bad-900", 950: "bg-bad-950",
  },
  info: {
    50: "bg-info-50", 100: "bg-info-100", 200: "bg-info-200", 300: "bg-info-300",
    400: "bg-info-400", 500: "bg-info-500", 600: "bg-info-600", 700: "bg-info-700",
    800: "bg-info-800", 900: "bg-info-900", 950: "bg-info-950",
  },
  purple: {
    50: "bg-purple-50", 100: "bg-purple-100", 200: "bg-purple-200", 300: "bg-purple-300",
    400: "bg-purple-400", 500: "bg-purple-500", 600: "bg-purple-600", 700: "bg-purple-700",
    800: "bg-purple-800", 900: "bg-purple-900", 950: "bg-purple-950",
  },
  teal: {
    50: "bg-teal-50", 100: "bg-teal-100", 200: "bg-teal-200", 300: "bg-teal-300",
    400: "bg-teal-400", 500: "bg-teal-500", 600: "bg-teal-600", 700: "bg-teal-700",
    800: "bg-teal-800", 900: "bg-teal-900", 950: "bg-teal-950",
  },
}

const SCALES: ScaleName[] = [
  "lime", "neutral", "good", "warn", "bad", "info", "purple", "teal",
]

function ScaleRow({ name }: { name: ScaleName }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold capitalize">
          {name}
        </h3>
        <code className="font-mono text-xs text-text-3">
          --color-{name}-*
        </code>
      </div>
      <div className="grid grid-cols-11 gap-1.5">
        {SHADES.map((shade) => {
          const bg = SWATCH_BG[name][shade]
          const hex = HEXES[name][shade]
          const dark = shade >= 400
          return (
            <div key={shade} className="space-y-1">
              <div className={`${bg} h-14 rounded-md border border-border`} />
              <div
                className={`text-[10px] leading-tight ${dark ? "" : ""}`}
              >
                <div className="font-mono font-medium">{shade}</div>
                <div className="font-mono text-text-3">{hex}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-5 shadow-card ${className}`}
    >
      {children}
    </div>
  )
}

export default function DesignPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-xl font-semibold tracking-tight">
              Trace · Design System
            </h1>
            <span className="text-sm text-text-3">
              shadcn + Tailwind v4 · light & dark
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-12 px-6 py-10">
        {/* Hero metric */}
        <section className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="ai-badge">Trace AI</span>
              <span className="pill pill-good">+12.4%</span>
            </div>
            <div className="mt-4 text-sm text-text-3">Net worth</div>
            <div className="metric-xl text-foreground">£128,402.55</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="tag tag-cat-income">Income</span>
              <span className="tag tag-cat-bills">Bills</span>
              <span className="tag tag-cat-shopping">Shopping</span>
              <span className="tag tag-cat-food">Food</span>
              <span className="tag tag-cat-transport">Transport</span>
            </div>
          </Card>

          <div className="ai-card">
            <div className="ai-badge">Trace AI</div>
            <h3 className="font-display mt-3 text-base font-semibold">
              You can save £214 this month
            </h3>
            <p className="mt-1 text-sm text-text-2">
              Cancel two unused subscriptions and round up coffee runs.
            </p>
            <div className="mt-4">
              <div className="text-xs text-text-3">Projected savings</div>
              <div className="metric-lg">£214</div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Buttons
          </h2>
          <Card>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="lime-outline">Lime outline</Button>
              <Button variant="dark">Dark</Button>
              <Button variant="link">Link</Button>
            </div>
          </Card>
        </section>

        {/* Pills + Tags + Badges */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Pills, tags & badges
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <div className="text-xs font-medium text-text-3 uppercase tracking-wide">
                Pills
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="pill pill-lime">Brand</span>
                <span className="pill pill-good">+8.2%</span>
                <span className="pill pill-warn">Pending</span>
                <span className="pill pill-bad">Failed</span>
                <span className="pill pill-info">Routing</span>
                <span className="pill pill-muted">Draft</span>
              </div>
            </Card>
            <Card>
              <div className="text-xs font-medium text-text-3 uppercase tracking-wide">
                Category tags
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="tag tag-cat-food">🍱 Food</span>
                <span className="tag tag-cat-transport">🚇 Transport</span>
                <span className="tag tag-cat-income">💷 Income</span>
                <span className="tag tag-cat-bills">📄 Bills</span>
                <span className="tag tag-cat-shopping">🛍 Shopping</span>
              </div>
            </Card>
            <Card className="md:col-span-2">
              <div className="text-xs font-medium text-text-3 uppercase tracking-wide">
                shadcn Badge variants
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="lime">Lime</Badge>
                <Badge variant="good">Good</Badge>
                <Badge variant="warn">Warn</Badge>
                <Badge variant="bad">Bad</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </Card>
          </div>
        </section>

        {/* Color scales */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Color scales
          </h2>
          <Card className="space-y-8">
            {SCALES.map((s) => (
              <ScaleRow key={s} name={s} />
            ))}
          </Card>
        </section>

        {/* Utility resolution check */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Utility resolution
          </h2>
          <Card>
            <p className="text-sm text-text-2">
              Each cell uses a literal Tailwind utility — if any swatch shows
              the wrong color, the scale isn&apos;t resolving.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-md border border-info-200 bg-info-50 p-3 text-info-700">
                bg-info-50 / text-info-700 / border-info-200
              </div>
              <div className="rounded-md border border-good-300 bg-good-100 p-3 text-good-800">
                bg-good-100 / text-good-800 / border-good-300
              </div>
              <div className="rounded-md border border-warn-300 bg-warn-100 p-3 text-warn-800">
                bg-warn-100 / text-warn-800 / border-warn-300
              </div>
              <div className="rounded-md border border-bad-300 bg-bad-100 p-3 text-bad-800">
                bg-bad-100 / text-bad-800 / border-bad-300
              </div>
              <div className="rounded-md border border-purple-300 bg-purple-100 p-3 text-purple-800">
                bg-purple-100 / text-purple-800 / border-purple-300
              </div>
              <div className="rounded-md border border-teal-300 bg-teal-100 p-3 text-teal-800">
                bg-teal-100 / text-teal-800 / border-teal-300
              </div>
              <div className="rounded-md border border-lime-300 bg-lime-100 p-3 text-lime-800">
                bg-lime-100 / text-lime-800 / border-lime-300
              </div>
              <div className="rounded-md border border-neutral-300 bg-neutral-100 p-3 text-neutral-800">
                bg-neutral-100 / text-neutral-800 / border-neutral-300
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}
