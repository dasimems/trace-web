"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { LogoWordmark } from "@/components/landing/logo-mark"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NAV_SECTIONS, type NavItem } from "@/components/dashboard/sidebar-nav-config"
import { useEndpoint } from "@/hooks/use-endpoint"
import { getOpportunities } from "@/api/opportunities"

export function DashboardSidebar() {
  const pathname = usePathname()
  const opportunitiesQuery = useEndpoint("/opportunities", () =>
    getOpportunities(),
  )
  const opportunitiesCount = opportunitiesQuery.data?.length ?? 0

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border">
      <SidebarHeader className="px-5 pb-4 pt-6">
        <Link href="/app/overview" aria-label="Trace home">
          <LogoWordmark />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-2">
        {NAV_SECTIONS.map((section, idx) => (
          <SidebarGroup key={section.label ?? `section-${idx}`}>
            {section.label && (
              <SidebarGroupLabel className="px-2 font-mono text-[11px] tracking-[0.16em] text-text-3">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const dynamicBadge =
                    item.href === "/app/opportunities" && opportunitiesCount > 0
                      ? {
                          text: String(opportunitiesCount),
                          tone: "lime" as const,
                        }
                      : undefined
                  return (
                    <NavItemRow
                      key={item.href}
                      item={dynamicBadge ? { ...item, badge: dynamicBadge } : item}
                      active={pathname === item.href}
                    />
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        <UserBadge />
      </SidebarFooter>
    </Sidebar>
  )
}

function NavItemRow({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={active}
        size="lg"
        className={cn(
          "h-10 gap-3 rounded-lg px-3 text-sm font-medium",
          active
            ? "bg-lime-50 text-lime-700 hover:bg-lime-50 hover:text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"
            : "text-text-2 hover:bg-muted hover:text-foreground",
        )}
      >
        <Link href={item.href}>
          <Icon className={cn("size-4", active && "text-lime-600 dark:text-lime-400")} />
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && <NavBadge text={item.badge.text} tone={item.badge.tone} />}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function NavBadge({ text, tone }: { text: string; tone: "lime" | "muted" }) {
  return (
    <span
      className={cn(
        "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 font-mono text-[10px] font-semibold",
        tone === "lime"
          ? "bg-lime-500 text-white"
          : "bg-muted text-text-3",
      )}
    >
      {text}
    </span>
  )
}

function UserBadge() {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-mono text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
        AO
      </span>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-foreground">
          Adaeze Okafor
        </div>
        <div className="truncate text-xs text-text-3">Lagos · Trader</div>
      </div>
    </div>
  )
}
