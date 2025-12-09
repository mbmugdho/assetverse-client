import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Wraps any route that needs authentication
const RequireAuth = ({ children }) => {
  const { backendUser, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    // simple loading placeholder; you can swap with a spinner
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-base-content/70">
        Loading...
      </div>
    )
  }

  if (!backendUser) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    )
  }

  return children
}

export default RequireAuth