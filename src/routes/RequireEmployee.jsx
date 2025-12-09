import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RequireAuth from './RequireAuth'

const RequireEmployee = ({ children }) => {
  const { role } = useAuth()
  const location = useLocation()

  return (
    <RequireAuth>
      {role === 'employee' ? (
        children
      ) : (
        <Navigate to="/" state={{ from: location.pathname }} replace />
      )}
    </RequireAuth>
  )
}

export default RequireEmployee