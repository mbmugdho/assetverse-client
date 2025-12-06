import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

// Pages
import Home from '../pages/Home/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, // this means path: '/'
        element: <Home />,
      },
      // Auth routes (add these files later)
      // {
      //   path: 'login',
      //   element: <Login />,
      // },
      // {
      //   path: 'register/employee',
      //   element: <RegisterEmployee />,
      // },
      // {
      //   path: 'register/hr',
      //   element: <RegisterHR />,
      // },

      // 404 for any unknown route under '/'
      // {
      //   path: '*',
      //   element: <NotFound />,
      // },
    ],
  },
])

export default router
