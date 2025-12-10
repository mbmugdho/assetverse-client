import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useTopRequestedAssets } from '../../hooks/useHRAnalytics'

const TopRequestedBarChart = () => {
  const { data, isLoading, isError } = useTopRequestedAssets()

  const chartData =
    data?.map((d) => ({
      name:
        d.assetName && d.assetName.length > 16
          ? d.assetName.slice(0, 14) + '…'
          : d.assetName || 'Unknown',
      fullName: d.assetName || 'Unknown',
      count: d.count,
    })) || []

  return (
    <div className="card-glass-brand p-4 h-72 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-base-content/60 font-semibold">
            Asset demand
          </p>
          <h3 className="text-sm font-semibold text-brand-deep">
            Top requested assets
          </h3>
        </div>
      </div>

      {isLoading && (
        <p className="text-xs text-base-content/70 mt-4">
          Loading top requested assets...
        </p>
      )}
      {isError && (
        <p className="text-xs text-error mt-4">
          Failed to load top requested assets.
        </p>
      )}

      {!isLoading && !isError && chartData.length === 0 && (
        <p className="text-xs text-base-content/70 mt-4">
          No asset requests yet. Once employees start requesting, you&apos;ll
          see trends here.
        </p>
      )}

      {!isLoading && !isError && chartData.length > 0 && (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 4, left: 0, bottom: 24 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                strokeOpacity={0.3}
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(value, name, props) => [
                  value,
                  props.payload.fullName,
                ]}
                contentStyle={{ fontSize: '11px' }}
              />
              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default TopRequestedBarChart