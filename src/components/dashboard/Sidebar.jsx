import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Box,
  ClipboardList,
  Users,
  ArrowUpRight,
  UserCog,
  Briefcase,
  Laptop2,
} from 'lucide-react'

// Active class helper
const navItemClass = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-brand-deep text-brand-soft'
      : 'text-base-content/70 hover:bg-base-200 hover:text-brand-deep'
  }`

const Sidebar = ({ role = 'employee' }) => {
  return (
    <aside className="w-64 bg-section-soft2 border-r border-base-200 h-full flex flex-col">
      <div className="px-4 pt-4 pb-2 border-b border-base-200">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-semibold tracking-tight text-brand-deep">
            Asset
          </span>
          <span className="text-lg font-extrabold tracking-tight text-gradient-hero">
            Verse
          </span>
        </div>
        <p className="mt-1 text-[11px] text-base-content/60">
          {role === 'hr' ? 'HR Manager Dashboard' : 'Employee Dashboard'}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {/* Overview */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-base-content/50 mb-2 px-2">
            Overview
          </p>
          <ul className="space-y-1">
            <li>
              <NavLink
                to={
                  role === 'hr'
                    ? '/dashboard/hr/assets'
                    : '/dashboard/employee/my-assets'
                }
                className={navItemClass}
                end
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Role-specific */}
        {role === 'employee' ? (
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-base-content/50 mb-2 px-2">
              My workspace
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/dashboard/employee/my-assets"
                  className={navItemClass}
                  end
                >
                  <Laptop2 className="w-4 h-4" />
                  <span>My Assets</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employee/request-asset"
                  className={navItemClass}
                  end
                >
                  <Box className="w-4 h-4" />
                  <span>Request Asset</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employee/my-team"
                  className={navItemClass}
                  end
                >
                  <Users className="w-4 h-4" />
                  <span>My Team</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employee/profile"
                  className={navItemClass}
                  end
                >
                  <UserCog className="w-4 h-4" />
                  <span>Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-base-content/50 mb-2 px-2">
              Company
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink to="/dashboard/hr/assets" className={navItemClass} end>
                  <Box className="w-4 h-4" />
                  <span>Asset List</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/hr/assets/add"
                  className={navItemClass}
                  end
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Add Asset</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/hr/requests"
                  className={navItemClass}
                  end
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>All Requests</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/hr/employees"
                  className={navItemClass}
                  end
                >
                  <Users className="w-4 h-4" />
                  <span>Employee List</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/hr/upgrade-package"
                  className={navItemClass}
                  end
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Upgrade Package</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/hr/profile"
                  className={navItemClass}
                  end
                >
                  <UserCog className="w-4 h-4" />
                  <span>Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="px-4 py-3 border-t border-base-200 text-[11px] text-base-content/60">
        <p>© {new Date().getFullYear()} AssetVerse</p>
      </div>
    </aside>
  )
}

export default Sidebar
