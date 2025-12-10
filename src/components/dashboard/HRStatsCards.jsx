import { Layers, Users, ClipboardList, Box } from 'lucide-react'
import { useHRSummary } from '../../hooks/useHRAnalytics'

const HRStatsCards = () => {
  const { data, isLoading, isError } = useHRSummary()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="card-glass-brand p-4 animate-pulse h-24"
          />
        ))}
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="card-glass-brand p-4">
        <p className="text-sm text-error">
          Failed to load dashboard statistics.
        </p>
      </div>
    )
  }

  const {
    totalAssets = 0,
    activeEmployees = 0,
    packageLimit = 0,
    totalAssignedAssets = 0,
    pendingRequests = 0,
  } = data

  const utilization =
    packageLimit > 0
      ? Math.round((activeEmployees / packageLimit) * 100)
      : 0

  const statCards = [
    {
      label: 'Assets in inventory',
      value: totalAssets,
      icon: Box,
      subtitle: 'All assets you manage',
    },
    {
      label: 'Active employees',
      value: activeEmployees,
      icon: Users,
      subtitle: `Using ${utilization}% of ${packageLimit} slots`,
    },
    {
      label: 'Assigned assets',
      value: totalAssignedAssets,
      icon: Layers,
      subtitle: 'Currently with employees',
    },
    {
      label: 'Pending requests',
      value: pendingRequests,
      icon: ClipboardList,
      subtitle: 'Awaiting your review',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {statCards.map(({ label, value, icon: Icon, subtitle }) => (
        <div
          key={label}
          className="card-glass-brand p-4 flex items-start gap-3"
        >
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-brand-soft/80">
            <Icon className="w-4 h-4 text-brand-main" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-base-content/60 font-semibold">
              {label}
            </p>
            <p className="mt-1 text-xl font-semibold text-brand-deep">
              {value}
            </p>
            <p className="text-[11px] text-base-content/60 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HRStatsCards