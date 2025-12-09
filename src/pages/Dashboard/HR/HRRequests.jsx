import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, User, Box, CheckCircle2, XCircle } from 'lucide-react'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useHRRequests } from '../../../hooks/useHRRequests'
import {
  approveRequest as approveRequestApi,
  rejectRequest as rejectRequestApi,
} from '../../../services/requestService'

const HRRequests = () => {
  const [filterStatus, setFilterStatus] = useState('All')

  const { data, isLoading, isError, error } = useHRRequests(filterStatus)
  const requests = data || []

  const queryClient = useQueryClient()

  const approveMutation = useMutation({
    mutationFn: approveRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr-requests'] })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: rejectRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr-requests'] })
    },
  })

  const badgeClass = status => {
    if (status === 'pending')
      return 'badge-warning text-xs text-warning-content'
    if (status === 'approved')
      return 'badge-success text-xs text-success-content'
    if (status === 'rejected')
      return 'badge-error text-xs text-error-content'
    if (status === 'returned')
      return 'badge-ghost text-xs'
    return 'badge-ghost text-xs'
  }

  const humanStatus = status =>
    status.charAt(0).toUpperCase() + status.slice(1)

  const confirmRequestAction = async (type, req) => {
    const isApprove = type === 'approve'

    const result = await Swal.fire({
      title: isApprove ? 'Approve this request?' : 'Reject this request?',
      html: `
        <div style="text-align:left;font-size:13px;line-height:1.4">
          <strong>${req.requesterName || ''}</strong> (${req.requesterEmail})<br/>
          Asset: <strong>${req.assetName}</strong><br/>
          Company: ${req.companyName}
        </div>
      `,
      icon: isApprove ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonText: isApprove ? 'Approve' : 'Reject',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: isApprove ? '#337B01' : '#e11d48',
      cancelButtonColor: '#6b7280',
      background: '#ffffff',
    })

    if (result.isConfirmed) {
      try {
        if (isApprove) {
          await approveMutation.mutateAsync(req._id)
        } else {
          await rejectMutation.mutateAsync(req._id)
        }

        await Swal.fire({
          title: isApprove ? 'Approved' : 'Rejected',
          text: isApprove
            ? 'The request has been marked as approved.'
            : 'The request has been marked as rejected.',
          icon: 'success',
          timer: 1400,
          showConfirmButton: false,
        })
      } catch (err) {
        console.error(err)
        await Swal.fire({
          title: 'Error',
          text:
            err.response?.data?.message ||
            'Failed to process request. Check package limit and stock.',
          icon: 'error',
        })
      }
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
            {['All', 'Pending', 'Approved', 'Rejected', 'Returned'].map(status => (
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

      {isLoading && (
        <div className="card-glass-brand p-6 text-sm text-base-content/70">
          Loading requests...
        </div>
      )}

      {isError && (
        <div className="card-glass-brand p-6 text-sm text-error">
          Failed to load requests: {error?.message || 'Unknown error'}
        </div>
      )}

      {!isLoading && !isError && (
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
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-sm">
                      No requests in this view.
                    </td>
                  </tr>
                ) : (
                  requests.map(r => (
                    <tr key={r._id} className="text-xs md:text-sm">
                      <td>
                        <div className="flex flex-col">
                          <span className="font-semibold text-brand-deep">
                            {r.requesterName || r.requesterEmail}
                          </span>
                          <span className="text-[11px] text-base-content/60">
                            {r.requesterEmail}
                          </span>
                        </div>
                      </td>
                      <td>{r.assetName}</td>
                      <td>{r.companyName}</td>
                      <td className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3 text-base-content/60" />
                        <span>
                          {r.requestDate
                            ? new Date(r.requestDate).toLocaleDateString()
                            : '—'}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${badgeClass(r.requestStatus)}`}
                        >
                          {humanStatus(r.requestStatus)}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end gap-1">
                          {r.requestStatus === 'pending' ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-ghost btn-xs gap-1 text-success"
                                onClick={() =>
                                  confirmRequestAction('approve', r)
                                }
                                disabled={approveMutation.isLoading}
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
                                disabled={rejectMutation.isLoading}
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
      )}
    </motion.div>
  )
}

export default HRRequests