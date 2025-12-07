import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'

const mockEmployees = [
  {
    id: 'e1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinDate: '2025-01-15',
    assetsCount: 3,
    avatar: 'https://i.pravatar.cc/100?img=11',
  },
  {
    id: 'e2',
    name: 'Maya Chen',
    email: 'maya@greenframe.io',
    joinDate: '2024-11-02',
    assetsCount: 2,
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 'e3',
    name: 'Daniel Lee',
    email: 'daniel@cloudnest.dev',
    joinDate: '2025-01-05',
    assetsCount: 1,
    avatar: 'https://i.pravatar.cc/100?img=13',
  },
]

const packageLimit = 10

const HREmployees = () => {
  const [employees, setEmployees] = useState(mockEmployees)

  const currentEmployees = employees.length

  const confirmRemoveEmployee = async (emp) => {
    const result = await Swal.fire({
      title: 'Remove employee from team?',
      html: `
        <div style="text-align:left;font-size:13px;line-height:1.4">
          <strong>${emp.name}</strong><br/>
          ${emp.email}<br/>
          <small style="color:#6b7280">
            In the real app, you should also review their active assets before removal.
          </small>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: '#e11d48', // red
      cancelButtonColor: '#6b7280',
      background: '#ffffff',
    })

    if (result.isConfirmed) {
      // UI-only: update state
      setEmployees((prev) => prev.filter((e) => e.id !== emp.id))

      await Swal.fire({
        title: 'Removed',
        text: 'The employee has been removed from your team (UI only).',
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Employee List</h2>
          <p className="text-sm text-base-content/70">
            View and manage employees affiliated with your company.
          </p>
        </div>
        <div className="text-xs text-base-content/70 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-main" />
          <span>
            {currentEmployees}/{packageLimit} employees used
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees.length === 0 ? (
          <p className="text-sm text-base-content/70">
            No employees affiliated yet. Approve asset requests to build your
            team.
          </p>
        ) : (
          employees.map((emp) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3 }}
              className="card-glass-brand p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img src={emp.avatar} alt={emp.name} />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-brand-deep">
                    {emp.name}
                  </p>
                  <p className="text-[11px] text-base-content/70">
                    {emp.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-base-content/70">
                <span>Joined: {emp.joinDate}</span>
                <span>Assets: {emp.assetsCount}</span>
              </div>
              <div className="mt-auto pt-1 flex justify-end">
                <button
                  type="button"
                  className="btn btn-ghost btn-xs gap-1 text-error"
                  onClick={() => confirmRemoveEmployee(emp)}
                >
                  <Trash2 className="w-3 h-3" />
                  Remove from team
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}

export default HREmployees
