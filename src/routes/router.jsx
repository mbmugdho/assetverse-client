import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'

import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import RegisterEmployee from '../pages/Auth/RegisterEmployee'
import RegisterHR from '../pages/Auth/RegisterHR'
import NotFound from '../pages/Error/NotFound'
import LoadingSpinner from '../components/common/LoadingSpinner'

// Employee dashboard pages
import EmployeeMyAssets from '../pages/Dashboard/Employee/EmployeeMyAssets'
import EmployeeRequestAsset from '../pages/Dashboard/Employee/EmployeeRequestAsset'
import EmployeeMyTeam from '../pages/Dashboard/Employee/EmployeeMyTeam'
import EmployeeProfile from '../pages/Dashboard/Employee/EmployeeProfile'

// HR dashboard pages
import HRAssetsList from '../pages/Dashboard/HR/HRAssetsList'
import HRAddAsset from '../pages/Dashboard/HR/HRAddAsset'
import HRRequests from '../pages/Dashboard/HR/HRRequests'
import HREmployees from '../pages/Dashboard/HR/HREmployees'
import HRUpgradePackage from '../pages/Dashboard/HR/HRUpgradePackage'
import HRProfile from '../pages/Dashboard/HR/HRProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register/employee', element: <RegisterEmployee /> },
      { path: 'register/hr', element: <RegisterHR /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // Employee
      { path: 'employee/my-assets', element: <EmployeeMyAssets /> },
      { path: 'employee/request-asset', element: <EmployeeRequestAsset /> },
      { path: 'employee/my-team', element: <EmployeeMyTeam /> },
      { path: 'employee/profile', element: <EmployeeProfile /> },

      // HR
      { path: 'hr/assets', element: <HRAssetsList /> },
      { path: 'hr/assets/add', element: <HRAddAsset /> },
      { path: 'hr/requests', element: <HRRequests /> },
      { path: 'hr/employees', element: <HREmployees /> },
      { path: 'hr/upgrade-package', element: <HRUpgradePackage /> },
      { path: 'hr/profile', element: <HRProfile /> },
    ],
  },
])

export default router
