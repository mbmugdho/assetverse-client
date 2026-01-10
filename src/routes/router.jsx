import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

// Public pages
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import RegisterEmployee from '../pages/Auth/RegisterEmployee'
import RegisterHR from '../pages/Auth/RegisterHR'
import NotFound from '../pages/Error/NotFound'
import ChooseRoleAfterGoogle from '../pages/Auth/ChooseRoleAfterGoogle'

// New public pages
import PublicAssets from '../pages/Assets/PublicAssets'
import AssetDetails from '../pages/Assets/AssetDetails'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import Terms from '../pages/Legal/Terms'

// Employee dashboard pages
import EmployeeMyAssets from '../pages/Dashboard/Employee/EmployeeMyAssets'
import EmployeeRequestAsset from '../pages/Dashboard/Employee/EmployeeRequestAsset'
import EmployeeMyTeam from '../pages/Dashboard/Employee/EmployeeMyTeam'
import EmployeeProfile from '../pages/Dashboard/Employee/EmployeeProfile'
import RequireEmployee from './RequireEmployee'

// HR dashboard pages
import HRAnalytics from '../pages/Dashboard/HR/HRAnalytics'
import HRAssetsList from '../pages/Dashboard/HR/HRAssetsList'
import HRAddAsset from '../pages/Dashboard/HR/HRAddAsset'
import HRRequests from '../pages/Dashboard/HR/HRRequests'
import HREmployees from '../pages/Dashboard/HR/HREmployees'
import HRUpgradePackage from '../pages/Dashboard/HR/HRUpgradePackage'
import HRProfile from '../pages/Dashboard/HR/HRProfile'
import RequireHR from './RequireHR'

// Auth guard for asset details (requires login)
import RequireAuth from './RequireAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Home
      { index: true, element: <Home /> },

      // Auth
      { path: 'login', element: <Login /> },
      { path: 'register/employee', element: <RegisterEmployee /> },
      { path: 'register/hr', element: <RegisterHR /> },
      { path: 'auth/choose-role', element: <ChooseRoleAfterGoogle /> },

      // Public pages
      { path: 'assets', element: <PublicAssets /> },
      {
        path: 'assets/:id',
        element: (
          <RequireAuth>
            <AssetDetails />
          </RequireAuth>
        ),
      },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Terms /> }, // Same page, different route

      // 404
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // Employee routes
      {
        path: 'employee/my-assets',
        element: (
          <RequireEmployee>
            <EmployeeMyAssets />
          </RequireEmployee>
        ),
      },
      {
        path: 'employee/request-asset',
        element: (
          <RequireEmployee>
            <EmployeeRequestAsset />
          </RequireEmployee>
        ),
      },
      {
        path: 'employee/my-team',
        element: (
          <RequireEmployee>
            <EmployeeMyTeam />
          </RequireEmployee>
        ),
      },
      {
        path: 'employee/profile',
        element: (
          <RequireEmployee>
            <EmployeeProfile />
          </RequireEmployee>
        ),
      },

      // HR routes
      {
        path: 'hr/analytics',
        element: (
          <RequireHR>
            <HRAnalytics />
          </RequireHR>
        ),
      },
      {
        path: 'hr/assets',
        element: (
          <RequireHR>
            <HRAssetsList />
          </RequireHR>
        ),
      },
      {
        path: 'hr/assets/add',
        element: (
          <RequireHR>
            <HRAddAsset />
          </RequireHR>
        ),
      },
      {
        path: 'hr/requests',
        element: (
          <RequireHR>
            <HRRequests />
          </RequireHR>
        ),
      },
      {
        path: 'hr/employees',
        element: (
          <RequireHR>
            <HREmployees />
          </RequireHR>
        ),
      },
      {
        path: 'hr/upgrade-package',
        element: (
          <RequireHR>
            <HRUpgradePackage />
          </RequireHR>
        ),
      },
      {
        path: 'hr/profile',
        element: (
          <RequireHR>
            <HRProfile />
          </RequireHR>
        ),
      },
    ],
  },
])

export default router
