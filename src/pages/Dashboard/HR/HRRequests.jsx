import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, User, Box, CheckCircle2, XCircle } from 'lucide-react'
import Swal from 'sweetalert2'

// Mock requests data
const mockRequests = [
  {
    id: 'r1',
    employeeName: 'Alex Johnson',
    employeeEmail: 'alex@example.com',
    assetName: 'MacBook Pro 14"',
    companyName: 'GreenFrame Studio',
    requestDate: '2025-02-01',
    status: 'Pending',
  },
  {
    id: 'r2',
    employeeName: 'Maya Chen',
    employeeEmail: 'maya@greenframe.io',
    assetName: 'Ergonomic Chair',
    companyName: 'GreenFrame Studio',
    requestDate: '2025-01-25',
    status: 'Approved',
  },
  {
    id: 'r3',
    employeeName: 'Daniel Lee',
    employeeEmail: 'daniel@cloudnest.dev',
    assetName: 'Mechanical Keyboard',
    companyName: 'CloudNest Labs',
    requestDate: '2025-02-03',
    status: 'Rejected',
  },
  {
    id: 'r4',
    employeeName: 'Sarah Ahmed',
    employeeEmail: 'sarah@cloudnest.dev',
    assetName: 'Welcome Swag Kit',
    companyName: 'CloudNest Labs',
    requestDate: '2025-02-04',
    status: 'Pending',
  },
]

const HRRequests = () => {
  const [requests, setRequests] = useState(mockRequests)
  const [filterStatus, setFilterStatus] = useState('All')

  const filtered = requests.filter(r =>
    filterStatus === 'All' ? true : r.status === filterStatus
  )

  const badgeClass = status => {
    if (status === 'Pending')
      return 'badge-warning text-xs text-warning-content'
    if (status === 'Approved')
      return 'badge-success text-xs text-success-content'
    if (status === 'Rejected')
      return 'badge-error text-xs text-error-content'
    return 'badge-ghost text-xs'
  }

  const confirmRequestAction = async (type, req) => {
    const isApprove = type === 'approve'

    const result = await Swal.fire({
      title: isApprove ? 'Approve this request?' : 'Reject this request?',
      html: `
        <div style="text-align:left;font-size:13px;line-height:1.4">
          <strong>${req.employeeName}</strong> (${req.employeeEmail})<br/>
          Asset: <strong>${req.assetName}</strong><br/>
          Company: ${req.companyName}
        </div>
      `,
      icon: isApprove ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: isApprove ? 'Approve' : 'Reject',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: isApprove ? '#337B01' : '#e11d48', // your green vs red
      cancelButtonColor: '#6b7280',
      background: '#ffffff',
    })

    if (result.isConfirmed) {
      // UI-only state update
      setRequests(prev =>
        prev.map(r =>
          r.id === req.id
            ? { ...r, status: isApprove ? 'Approved' : 'Rejected' }
            : r
        )
      )

      await Swal.fire({
        title: isApprove ? 'Approved' : 'Rejected',
        text: isApprove
          ? 'The request has been marked as approved.'
          : 'The request has been marked as rejected.',
        icon: 'success',
        timer: 1400,
        showConfirmButton: false,
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">All Requests</h2>
          <p className="text-sm text-base-content/70">
            Review, approve, or reject asset requests from your employees.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="tabs tabs-boxed bg-base-200/60">
            {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`tab text-xs md:text-sm ${
                  filterStatus === status
                    ? 'tab-active text-brand-deep'
                    : 'text-base-content/70'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-glass-brand p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-sm md:table-md">
            <thead>
              <tr className="text-xs md:text-sm">
                <th>Employee</th>
                <th>Asset</th>
                <th>Company</th>
                <th>Request date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-sm">
                    No requests in this view.
                  </td>
                </tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="text-xs md:text-sm">
                    <td>
                      <div className="flex flex-col">
                        <span className="font-semibold text-brand-deep">
                          {r.employeeName}
                        </span>
                        <span className="text-[11px] text-base-content/60">
                          {r.employeeEmail}
                        </span>
                      </div>
                    </td>
                    <td>{r.assetName}</td>
                    <td>{r.companyName}</td>
                    <td className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3 text-base-content/60" />
                      <span>{r.requestDate}</span>
                    </td>
                    <td>
                      <span className={`badge ${badgeClass(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-end gap-1">
                        {r.status === 'Pending' ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs gap-1 text-success"
                              onClick={() =>
                                confirmRequestAction('approve', r)
                              }
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Approve
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs gap-1 text-error"
                              onClick={() =>
                                confirmRequestAction('reject', r)
                              }
                            >
                              <XCircle className="w-3 h-3" />
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-base-content/60">
                            No actions
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default HRRequests