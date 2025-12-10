import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useAssetTypeDistribution } from '../../hooks/useHRAnalytics'

const COLORS = {
  Returnable: '#3b82f6', 
  'Non-returnable': '#f97316', 
  default: '#a855f7', 
}

const AssetTypePieChart = () => {
  const { data, isLoading, isError } = useAssetTypeDistribution()

  const chartData =
    data?.map((d) => ({
      name: d.type,
      value: d.count,
    })) || []

  return (
    <div className="card-glass-brand p-4 h-72 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-base-content/60 font-semibold">
            Asset mix
          </p>
          <h3 className="text-sm font-semibold text-brand-deep">
            Returnable vs non-returnable
          </h3>
        </div>
      </div>

      {isLoading && (
        <p className="text-xs text-base-content/70 mt-4">
          Loading asset distribution...
        </p>
      )}
      {isError && (
        <p className="text-xs text-error mt-4">
          Failed to load asset distribution.
        </p>
      )}

      {!isLoading && !isError && chartData.length === 0 && (
        <p className="text-xs text-base-content/70 mt-4">
          No assets found yet. Add assets to see distribution.
        </p>
      )}

      {!isLoading && !isError && chartData.length > 0 && (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="52%"
                outerRadius={70}
                innerRadius={40}
                paddingAngle={3}
              >
                {chartData.map((entry, index) => {
                  const color =
                    COLORS[entry.name] ||
                    COLORS[
                      entry.name === 'Returnable'
                        ? 'Returnable'
                        : entry.name === 'Non-returnable'
                        ? 'Non-returnable'
                        : 'default'
                    ]
                  return <Cell key={`cell-${index}`} fill={color} />
                })}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}`, name]}
                contentStyle={{
                  fontSize: '11px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={24}
                wrapperStyle={{ fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default AssetTypePieChart