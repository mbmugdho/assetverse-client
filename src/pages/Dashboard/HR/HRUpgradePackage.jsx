import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Crown, Sparkles, CreditCard } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../../context/AuthContext'
import { usePackages } from '../../../hooks/usePackages'
import { useHRPayments } from '../../../hooks/useHRPayments'
import {
  createCheckoutSession,
  confirmPayment,
} from '../../../services/paymentService'

const statusBadgeClass = (status) => {
  if (status === 'completed') return 'badge-success'
  if (status === 'pending') return 'badge-warning'
  if (status === 'failed') return 'badge-error'
  return 'badge-ghost'
}

const HRUpgradePackage = () => {
  const { backendUser } = useAuth()
  const {
    data: packages,
    isLoading: pkgsLoading,
    isError: pkgsError,
  } = usePackages()
  const {
    data: payments,
    isLoading: payLoading,
    isError: payError,
  } = useHRPayments()

  const [upgrading, setUpgrading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const currentSubscription = backendUser?.subscription
    ? backendUser.subscription.charAt(0).toUpperCase() +
      backendUser.subscription.slice(1)
    : 'Basic'

  // Handle Stripe success/cancel query params
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const success = params.get('success')
    const canceled = params.get('canceled')
    const sessionId = params.get('session_id')

    const handleSuccess = async () => {
      try {
        if (!sessionId) return
        setMessage('Confirming payment...')
        await confirmPayment(sessionId)
        // Refresh user and payments
        await queryClient.invalidateQueries({ queryKey: ['me'] })
        await queryClient.invalidateQueries({ queryKey: ['hr-payments'] })
        setMessage('Payment confirmed and subscription updated.')
      } catch (err) {
        console.error(err)
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to confirm payment'
        )
      } finally {
        // Remove query params from URL
        navigate('/dashboard/hr/upgrade-package', { replace: true })
      }
    }

    if (success === '1') {
      handleSuccess()
    } else if (canceled === '1') {
      setMessage('Payment canceled.')
      navigate('/dashboard/hr/upgrade-package', { replace: true })
    }
  }, [location.search, navigate, queryClient])

  const handleUpgrade = async (pkg) => {
    setError('')
    setMessage('')
    try {
      setUpgrading(true)
      const data = await createCheckoutSession(pkg.name)
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Failed to initiate payment.')
      }
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to initiate payment'
      )
    } finally {
      setUpgrading(false)
    }
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
          Compare plans and upgrade your employee limit. Payments are processed
          securely via Stripe.
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
        {message && (
          <p className="text-[11px] text-brand-main max-w-xs text-right">
            {message}
          </p>
        )}
        {error && (
          <p className="text-[11px] text-error max-w-xs text-right">{error}</p>
        )}
      </div>

      {/* Packages grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {pkgsLoading && (
          <p className="text-sm text-base-content/70">Loading packages...</p>
        )}
        {pkgsError && (
          <p className="text-sm text-error">Failed to load packages.</p>
        )}
        {!pkgsLoading &&
          !pkgsError &&
          packages &&
          packages.map((pkg, index) => {
            const isCurrent =
              pkg.name.toLowerCase() ===
              (backendUser?.subscription || 'basic').toLowerCase()

            const Icon =
              pkg.name === 'Basic'
                ? Users
                : pkg.name === 'Standard'
                ? Sparkles
                : Crown

            return (
              <motion.div
                key={pkg._id || pkg.name}
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
                    <Icon className="w-5 h-5 text-brand-main" />
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
                  {pkg.features.map((f) => (
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
                      className="btn-gradient-primary w-full text-xs flex items-center justify-center gap-2 disabled:opacity-60"
                      disabled={upgrading}
                    >
                      <CreditCard className="w-4 h-4" />
                      {upgrading ? 'Redirecting...' : `Upgrade to ${pkg.name}`}
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
        {payLoading && (
          <p className="text-xs text-base-content/70">
            Loading payment history...
          </p>
        )}
        {payError && (
          <p className="text-xs text-error">Failed to load payment history.</p>
        )}
        {!payLoading && !payError && (!payments || payments.length === 0) ? (
          <p className="text-xs text-base-content/70">
            No payments recorded yet.
          </p>
        ) : (
          !payLoading &&
          !payError && (
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
                  {payments &&
                    payments.map((p) => (
                      <tr key={p._id} className="text-[11px] md:text-xs">
                        <td>
                          {p.paymentDate
                            ? new Date(p.paymentDate).toLocaleDateString()
                            : '—'}
                        </td>
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
          )
        )}
      </div>
    </motion.div>
  )
}

export default HRUpgradePackage
