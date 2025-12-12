import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardTopbar from '../components/dashboard/DashboardTopbar'

const resolveRoleFromPath = (pathname) => {
  if (pathname.startsWith('/dashboard/hr')) return 'hr'
  return 'employee'
}

const resolveTitleFromPath = (pathname) => {
  if (pathname.startsWith('/dashboard/employee/my-assets')) return 'My Assets'
  if (pathname.startsWith('/dashboard/employee/request-asset'))
    return 'Request Asset'
  if (pathname.startsWith('/dashboard/employee/my-team')) return 'My Team'
  if (pathname.startsWith('/dashboard/employee/profile')) return 'My Profile'

  if (pathname.startsWith('/dashboard/hr/analytics')) return 'Analytics'
  if (pathname.startsWith('/dashboard/hr/assets/add')) return 'Add Asset'
  if (pathname.startsWith('/dashboard/hr/assets')) return 'Asset List'
  if (pathname.startsWith('/dashboard/hr/requests')) return 'All Requests'
  if (pathname.startsWith('/dashboard/hr/employees')) return 'Employee List'
  if (pathname.startsWith('/dashboard/hr/upgrade-package'))
    return 'Upgrade Package'
  if (pathname.startsWith('/dashboard/hr/profile')) return 'HR Profile'

  return 'Dashboard'
}

const DashboardLayout = () => {
  const location = useLocation()
  const role = resolveRoleFromPath(location.pathname)
  const title = resolveTitleFromPath(location.pathname)

  return (
    <div className="min-h-screen bg-section-soft">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        {/* Main content */}
        <div className="drawer-content flex flex-col">
          <DashboardTopbar title={title} role={role} />
          <main className="flex-1 px-4 lg:px-6 py-4 lg:py-6">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <Sidebar role={role} />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
