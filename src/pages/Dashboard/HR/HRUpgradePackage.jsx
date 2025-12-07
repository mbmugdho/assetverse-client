import { motion } from 'framer-motion'
import { Users, Crown, Sparkles, CreditCard } from 'lucide-react'

const packages = [
  {
    name: 'Basic',
    employeeLimit: 5,
    price: 5,
    features: ['Asset Tracking', 'Employee Management', 'Basic Support'],
    icon: Users,
  },
  {
    name: 'Standard',
    employeeLimit: 10,
    price: 8,
    features: ['All Basic features', 'Advanced Analytics', 'Priority Support'],
    icon: Sparkles,
  },
  {
    name: 'Premium',
    employeeLimit: 20,
    price: 15,
    features: ['All Standard features', 'Custom Branding', '24/7 Support'],
    icon: Crown,
  },
]

// Mock current subscription & payment history
const currentSubscription = 'Standard'

const mockPayments = [
  {
    id: 'p1',
    date: '2025-01-15',
    packageName: 'Standard',
    employeeLimit: 10,
    amount: 80,
    status: 'completed',
    transactionId: 'txn_123456',
  },
  {
    id: 'p2',
    date: '2024-11-10',
    packageName: 'Basic',
    employeeLimit: 5,
    amount: 25,
    status: 'completed',
    transactionId: 'txn_987654',
  },
]

const HRUpgradePackage = () => {
  const handleUpgrade = pkg => {
    console.log('Upgrade (UI only) to:', pkg.name)
  }

  const statusBadgeClass = status => {
    if (status === 'completed') return 'badge-success'
    if (status === 'pending') return 'badge-warning'
    if (status === 'failed') return 'badge-error'
    return 'badge-ghost'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-brand-deep">Upgrade Package</h2>
        <p className="text-sm text-base-content/70">
          Compare plans and upgrade your employee limit. Payments will later be
          processed via Stripe.
        </p>
      </div>

      {/* Current plan badge */}
      <div className="card-glass-brand p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
            Current plan
          </p>
          <p className="text-sm font-semibold text-brand-deep">
            {currentSubscription} package
          </p>
          <p className="text-xs text-base-content/70">
            Upgrade instantly when you need more employees.
          </p>
        </div>
      </div>

      {/* Packages grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {packages.map((pkg, index) => {
          const isCurrent = pkg.name === currentSubscription
          return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`card-glass-brand p-5 flex flex-col gap-3 ${
                isCurrent ? 'border-brand-main shadow-brand-main/15' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-brand-deep">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-base-content/60 mt-1">
                    Up to {pkg.employeeLimit} employees
                  </p>
                </div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-soft/70">
                  <pkg.icon className="w-5 h-5 text-brand-main" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-brand-deep">
                  ${pkg.price}
                </span>
                <span className="text-xs text-base-content/60 ml-1">
                  / employee / month
                </span>
              </div>
              <ul className="space-y-1 text-xs text-base-content/80">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-main" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                {isCurrent ? (
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost w-full text-xs"
                    disabled
                  >
                    Current plan
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUpgrade(pkg)}
                    className="btn-gradient-primary w-full text-xs flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Upgrade to {pkg.name}
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Payment history */}
      <div className="card-glass-brand p-4">
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="w-4 h-4 text-brand-main" />
          <h3 className="text-sm font-semibold text-brand-deep">
            Payment history
          </h3>
        </div>
        {mockPayments.length === 0 ? (
          <p className="text-xs text-base-content/70">
            No payments recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs md:table-sm">
              <thead>
                <tr className="text-xs">
                  <th>Date</th>
                  <th>Package</th>
                  <th>Employees</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map(p => (
                  <tr key={p.id} className="text-[11px] md:text-xs">
                    <td>{p.date}</td>
                    <td>{p.packageName}</td>
                    <td>{p.employeeLimit}</td>
                    <td>${p.amount}</td>
                    <td>
                      <span
                        className={`badge badge-xs ${statusBadgeClass(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="font-mono text-[10px]">
                      {p.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default HRUpgradePackage