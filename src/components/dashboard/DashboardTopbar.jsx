import { useEffect, useState } from 'react'
import { Menu, SunMedium, MoonStar } from 'lucide-react'

// Same theme logic as Navbar
const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return DARK_THEME
  const stored = localStorage.getItem('assetverse-theme')
  if (stored === LIGHT_THEME || stored === DARK_THEME) return stored
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? DARK_THEME : LIGHT_THEME
}

const DashboardTopbar = ({ title = 'Dashboard', role = 'employee' }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('assetverse-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === DARK_THEME ? LIGHT_THEME : DARK_THEME))
  }

  const isDark = theme === DARK_THEME

  // TODO: replace with real user data
  const user = {
    name: role === 'hr' ? 'HR Manager' : 'Employee User',
    email: 'user@example.com',
  }

  const handleLogout = () => {
    // TODO: implement real logout
    console.log('dashboard logout')
  }

  return (
    <header className="w-full border-b border-base-200 bg-base-100/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 gap-3">
        {/* Left: drawer toggle (mobile) + title */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </label>
          <div>
            <h1 className="text-base md:text-lg font-semibold text-brand-deep">
              {title}
            </h1>
            <p className="text-[11px] text-base-content/60">
              {role === 'hr' ? 'HR Manager workspace' : 'Employee workspace'}
            </p>
          </div>
        </div>

        {/* Right: theme toggle + user */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunMedium className="w-5 h-5 text-amber-500" />
            ) : (
              <MoonStar className="w-5 h-5 text-sky-500" />
            )}
          </button>

          {/* User info */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full ring ring-brand-accent ring-offset-base-100 ring-offset-2">
                <span className="flex items-center justify-center h-full text-xs font-semibold text-brand-deep">
                  {user.name[0]}
                </span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[60] p-3 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-2xl border border-base-300 w-60"
            >
              <li className="px-2 py-1">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-sm text-brand-deep">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-base-content/60 truncate">
                    {user.email}
                  </span>
                </div>
              </li>
              <li>
                <hr className="my-1 border-base-200" />
              </li>
              <li>
                {/* Later you can navigate to profile based on role */}
                <button className="text-xs text-base-content/80">
                  View profile
                </button>
              </li>
              <li>
                <button
                  className="text-xs text-error"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardTopbar
