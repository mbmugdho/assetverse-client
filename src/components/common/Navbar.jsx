import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, SunMedium, MoonStar } from 'lucide-react'
import logo from '../../assets/logos/logo.png'

// DaisyUI built-in themes
const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return DARK_THEME

  const stored = localStorage.getItem('assetverse-theme')
  if (stored === LIGHT_THEME || stored === DARK_THEME) return stored

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? DARK_THEME : LIGHT_THEME
}

const Navbar = () => {
  // TODO: i will add real auth later
  const user = null // from AuthContext
  const role = null // "employee" | "hr"

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('assetverse-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === DARK_THEME ? LIGHT_THEME : DARK_THEME))
  }

  const handleLogout = () => {
    // TODO: logout logic
    console.log('logout clicked')
  }

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-full transition-colors ${
      isActive
        ? 'bg-brand-deep text-brand-soft shadow-sm'
        : 'text-base-content/80 hover:bg-base-200 hover:text-brand-deep'
    }`

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/employee" className={navLinkClass}>
          Join as Employee
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/hr" className={navLinkClass}>
          Join as HR Manager
        </NavLink>
      </li>
    </>
  )

  const mobileMenu = (
    <ul className="menu menu-sm dropdown-content mt-3 z-[50] p-3 rounded-2xl bg-base-100 shadow-lg border border-base-300 w-64">
      {publicLinks}
      {!user && (
        <li className="mt-1">
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
        </li>
      )}

      {user && role === 'employee' && (
        <>
          <li className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-base-content/60">
            Employee
          </li>
          <li>
            <NavLink
              to="/dashboard/employee/my-assets"
              className={navLinkClass}
            >
              My Assets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/employee/request-asset"
              className={navLinkClass}
            >
              Request Asset
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/employee/my-team" className={navLinkClass}>
              My Team
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/employee/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium rounded-full text-brand-deep hover:bg-base-200 text-left"
            >
              Logout
            </button>
          </li>
        </>
      )}

      {user && role === 'hr' && (
        <>
          <li className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-base-content/60">
            HR Manager
          </li>
          <li>
            <NavLink to="/dashboard/hr/assets" className={navLinkClass}>
              Asset List
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/hr/assets/add" className={navLinkClass}>
              Add Asset
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/hr/requests" className={navLinkClass}>
              All Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/hr/employees" className={navLinkClass}>
              Employee List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/hr/upgrade-package"
              className={navLinkClass}
            >
              Upgrade Package
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/hr/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium rounded-full text-brand-deep hover:bg-base-200 text-left"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  )

  const userDropdown = (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-9 rounded-full ring ring-brand-accent ring-offset-base-100 ring-offset-2">
          <span className="flex items-center justify-center h-full text-sm font-semibold text-brand-deep">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </span>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 z-[50] p-3 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-2xl border border-base-300 w-64"
      >
        <li className="px-2 py-1">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm">
              {user?.name || 'User Name'}
            </span>
            <span className="text-xs text-base-content/60 truncate">
              {user?.email || 'user@example.com'}
            </span>
          </div>
        </li>
        <li>
          <hr className="my-1 border-base-200" />
        </li>

        {role === 'employee' && (
          <>
            <li>
              <NavLink
                to="/dashboard/employee/my-assets"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                My Assets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/employee/request-asset"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                Request Asset
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/employee/my-team"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                My Team
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/employee/profile"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
          </>
        )}

        {role === 'hr' && (
          <>
            <li>
              <NavLink
                to="/dashboard/hr/assets"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                Asset List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/hr/assets/add"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                Add Asset
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/hr/requests"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                All Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/hr/employees"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                Employee List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/hr/upgrade-package"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                Upgrade Package
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/hr/profile"
                className={({ isActive }) =>
                  `text-sm ${
                    isActive ? 'text-brand-main' : 'text-base-content/80'
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
          </>
        )}

        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="text-error text-sm"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )

  const isDark = theme === DARK_THEME

  return (
    <header className="sticky top-0 z-40 bg-base-100/50 backdrop-blur border-b border-base-200 shadow-sm">
      <nav className="container-x flex items-center justify-between py-3">
        {/* Left: brand + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu className="w-5 h-5" />
            </label>
            {mobileMenu}
          </div>

          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <img src={logo} alt="AssetVerse Logo" className="w-8 h-6" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-brand-deep">
              Asset
            </span>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-gradient-hero">
              Verse
            </span>
          </Link>
        </div>

        {/* Center: nav links (desktop) */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{publicLinks}</ul>
        </div>

        {/* Right: theme toggle + auth */}
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

          {!user && (
            <>
              <NavLink
                to="/login"
                className="btn-gradient-outline text-sm hidden sm:inline-flex"
              >
                Login
              </NavLink>
              <NavLink
                to="/register/employee"
                className="btn-gradient-primary text-sm"
              >
                Get Started
              </NavLink>
            </>
          )}

          {user && userDropdown}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
