import type { LucideIcon } from "lucide-react"
import {
  Home,
  Wallet,
  ArrowLeftRight,
  Hash,
  Building2,
  TrendingUp,
  MessageSquare,
  Link2,
  ShieldCheck,
  Settings,
} from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: { text: string; tone: "lime" | "muted" }
}

export type NavSection = {
  label?: string
  items: ReadonlyArray<NavItem>
}

export const NAV_SECTIONS: ReadonlyArray<NavSection> = [
  {
    items: [
      { label: "Overview",      href: "/app/overview",      icon: Home          },
      { label: "Wallet",        href: "/app/wallet",        icon: Wallet,         badge: { text: "₦", tone: "muted" } },
      { label: "Transactions",  href: "/app/transactions",  icon: ArrowLeftRight },
      { label: "Opportunities", href: "/app/opportunities", icon: Hash         },
      { label: "Loans",         href: "/app/loans",         icon: Building2     },
      { label: "Investments",   href: "/app/investments",   icon: TrendingUp    },
      { label: "Copilot",       href: "/app/copilot",       icon: MessageSquare,  badge: { text: "AI", tone: "lime"  } },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { label: "Linked accounts", href: "/app/linked-accounts", icon: Link2       },
      { label: "Security & KYC",  href: "/app/security",        icon: ShieldCheck },
      { label: "Settings",        href: "/app/settings",        icon: Settings    },
    ],
  },
]
