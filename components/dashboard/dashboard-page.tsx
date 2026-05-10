import type { ReactNode } from "react"

import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar"

type DashboardPageProps = {
  title: string
  meta: string
  actions?: ReactNode
  children: ReactNode
}

export function DashboardPage({
  title,
  meta,
  actions,
  children,
}: DashboardPageProps) {
  return (
    <>
      <DashboardTopbar title={title} meta={meta} actions={actions} />
      <div className="flex-1 px-6 py-6 lg:px-8 lg:py-8">{children}</div>
    </>
  )
}
