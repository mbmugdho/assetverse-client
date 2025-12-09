import { motion } from 'framer-motion'
import { Users, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useHREmployees } from '../../../hooks/useHREmployees'
import { removeEmployeeFromTeam } from '../../../services/affiliationService'

const HREmployees = () => {
  const { data, isLoading, isError, error } = useHREmployees()
  const employees = data || []

  const queryClient = useQueryClient()

  const removeMutation = useMutation({
    mutationFn: removeEmployeeFromTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr-employees'] })
    },
  })

  const currentEmployees = employees.length

  const confirmRemoveEmployee = async emp => {
    const result = await Swal.fire({
      title: 'Remove employee from team?',
      html: `
        <div style="text-align:left;font-size:13px;line-height:1.4">
          <strong>${emp.employeeName || emp.employeeEmail}</strong><br/>
          ${emp.employeeEmail}<br/>
          <small style="color:#6b7280">
            This will mark the employee's affiliation as inactive and return any active assets.
          </small>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280',
      background: '#ffffff',
    })

    if (result.isConfirmed) {
      try {
        await removeMutation.mutateAsync(emp._id)
        await Swal.fire({
          title: 'Removed',
          text: 'The employee has been removed from your team (active assets returned).',
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
            'Failed to remove employee. Try again later.',
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Employee List</h2>
          <p className="text-sm text-base-content/70">
            View and manage employees affiliated with your company.
          </p>
        </div>
        <div className="text-xs text-base-content/70 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-main" />
          <span>{currentEmployees} employees in your team</span>
        </div>
      </div>

      {isLoading && (
        <div className="card-glass-brand p-6 text-sm text-base-content/70">
          Loading employees...
        </div>
      )}

      {isError && (
        <div className="card-glass-brand p-6 text-sm text-error">
          Failed to load employees: {error?.message || 'Unknown error'}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {employees.length === 0 ? (
            <p className="text-sm text-base-content/70">
              No employees affiliated yet. Approve asset requests to build your
              team.
            </p>
          ) : (
            employees.map(emp => (
              <motion.div
                key={emp._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3 }}
                className="card-glass-brand p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-xs font-semibold text-brand-main">
                      {(emp.employeeName || emp.employeeEmail)[0]}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-brand-deep">
                      {emp.employeeName || emp.employeeEmail}
                    </p>
                    <p className="text-[11px] text-base-content/70">
                      {emp.employeeEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-base-content/70">
                  <span>
                    Affiliated:{' '}
                    {emp.affiliationDate
                      ? new Date(emp.affiliationDate).toLocaleDateString()
                      : '—'}
                  </span>
                  <span>Assets: {emp.assetsCount || 0}</span>
                </div>
                <div className="mt-auto pt-1 flex justify-end">
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs gap-1 text-error"
                    onClick={() => confirmRemoveEmployee(emp)}
                    disabled={removeMutation.isLoading}
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove from team
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  )
}

export default HREmployees