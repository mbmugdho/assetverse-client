import React from 'react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, SunMedium, MoonStar } from 'lucide-react'
import logo from '../../assets/logos/logo.png'
import { useAuth } from '../../context/AuthContext'

// Themes
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
  const navigate = useNavigate()
  const { backendUser, firebaseUser, role, logout } = useAuth()
  const user = backendUser || null

  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('assetverse-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === DARK_THEME ? LIGHT_THEME : DARK_THEME))
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/', { replace: true })
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  const handleGoToDashboard = () => {
    if (role === 'hr') {
      navigate('/dashboard/hr/analytics')
    } else {
      navigate('/dashboard/employee/my-assets')
    }
  }

  const dashboardPath =
    role === 'hr' ? '/dashboard/hr/analytics' : '/dashboard/employee/my-assets'

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-full transition-colors ${
      isActive
        ? 'bg-brand-accent text-brand-soft shadow-sm'
        : 'text-base-content hover:bg-base-200 hover:text-brand-deep'
    }`

  // Common links for both logged in and logged out
  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/assets" className={navLinkClass}>
          Assets
        </NavLink>
      </li>
    </>
  )

  // Links for logged out users
  const joinLinks = !user && (
    <>
      <li>
        <NavLink to="/register/hr" className={navLinkClass}>
          Join as HR
        </NavLink>
      </li>
      <li>
        <NavLink to="/register/employee" className={navLinkClass}>
          Join as Employee
        </NavLink>
      </li>
    </>
  )

  // MOBILE MENU (hamburger)
  const mobileMenu = (
    <ul className="menu menu-sm dropdown-content mt-3 z-[50] p-3 rounded-2xl bg-section-soft2 shadow-lg border border-base-300 w-64">
      {/* Common links */}
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/assets" className={navLinkClass}>
          Assets
        </NavLink>
      </li>

      {!user && (
        <>
          {/* Divider */}
          <li className="my-2">
            <hr className="border-base-200" />
          </li>
          <li>
            <NavLink to="/register/hr" className={navLinkClass}>
              Join as HR
            </NavLink>
          </li>
          <li>
            <NavLink to="/register/employee" className={navLinkClass}>
              Join as Employee
            </NavLink>
          </li>
          <li className="mt-2">
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </li>
        </>
      )}

      {user && (
        <>
          {/* Divider */}
          <li className="my-2">
            <hr className="border-base-200" />
          </li>
          <li>
            <NavLink to={dashboardPath} className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium rounded-full text-error hover:bg-error/10 text-left w-full"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  )

  const displayName =
    backendUser?.name || firebaseUser?.displayName || 'User Name'
  const displayEmail =
    backendUser?.email || firebaseUser?.email || 'user@example.com'
  const avatarUrl = backendUser?.profileImage || firebaseUser?.photoURL || null

  const userDropdown = (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-9 rounded-full ring ring-brand-accent ring-offset-base-100 ring-offset-2 overflow-hidden flex items-center justify-center bg-base-200">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center h-full text-sm font-semibold text-brand-deep">
              {displayName?.[0]?.toUpperCase() || 'A'}
            </span>
          )}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 z-[50] p-3 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-2xl border border-base-300 w-64"
      >
        <li className="px-2 py-1">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm text-brand-deep">
              {displayName}
            </span>
            <span className="text-xs text-base-content/60 truncate">
              {displayEmail}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-brand-main font-semibold mt-1">
              {role === 'hr' ? 'HR Manager' : 'Employee'}
            </span>
          </div>
        </li>
        <li>
          <hr className="my-1 border-base-200" />
        </li>
        <li>
          <NavLink to={dashboardPath} className="text-sm">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={
              role === 'hr'
                ? '/dashboard/hr/profile'
                : '/dashboard/employee/profile'
            }
            className="text-sm"
          >
            My Profile
          </NavLink>
        </li>
        <li>
          <hr className="my-1 border-base-200" />
        </li>
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
    <header className="sticky md:sticky top-0 z-40 backdrop-blur bg-base-100/40 border-b border-base-200 shadow-sm">
      <nav className="container-x flex items-center justify-between py-3">
        {/* LEFT: brand + hamburger */}
        <div className="flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu className="w-5 h-5" />
            </label>
            {mobileMenu}
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <img src={logo} alt="AssetVerse Logo" className="w-9 h-8" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-brand-deep">
              Asset
            </span>
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-gradient-hero">
              Verse
            </span>
          </Link>
        </div>

        {/* CENTER: desktop menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {commonLinks}
            {joinLinks}
          </ul>
        </div>

        {/* RIGHT: actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle ALWAYS visible */}
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

          {/* Logged out: show login/get started */}
          {!user && (
            <div className="hidden lg:flex items-center gap-2">
              <NavLink to="/login" className="btn-gradient-outline text-sm">
                Login
              </NavLink>
              <NavLink
                to="/register/employee"
                className="btn-gradient-primary text-sm"
              >
                Get Started
              </NavLink>
            </div>
          )}

          {/* Logged in: show dashboard + user menu */}
          {user && (
            <>
              <div className="hidden lg:flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGoToDashboard}
                  className="btn-gradient-outline text-sm"
                >
                  Dashboard
                </button>
              </div>

              {userDropdown}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
