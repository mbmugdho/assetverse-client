import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import RegisterEmployee from '../pages/Auth/RegisterEmployee'
import RegisterHR from '../pages/Auth/RegisterHR'
import NotFound from '../pages/Error/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register/employee', element: <RegisterEmployee /> },
      { path: 'register/hr', element: <RegisterHR /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router