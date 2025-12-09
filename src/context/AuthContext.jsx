// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../firebase/firebase.config'
import apiClient from '../services/apiClient'
import { useQuery } from '@tanstack/react-query'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

// Google provider instance
const googleProvider = new GoogleAuthProvider()

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user || null)
      setAuthLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Fetch current backend user (/me) when we have a Firebase user
  const {
    data: backendUser,
    isLoading: backendLoading,
    refetch: refetchMe,
  } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await apiClient.get('/users/me')
      return res.data
    },
    enabled: !!firebaseUser, // only fetch if logged into Firebase
  })

  const isLoading = authLoading || (firebaseUser && backendLoading)

  // ========== Email/Password flows ==========

  // Register Employee with email/password
  const registerEmployee = async ({ name, email, password, dateOfBirth }) => {
    // 1) Firebase signup
    const cred = await createUserWithEmailAndPassword(auth, email, password)

    // 2) Backend user creation
    await apiClient.post('/users', {
      name,
      email,
      dateOfBirth,
      role: 'employee',
    })

    // 3) Issue JWT
    await apiClient.post('/auth/jwt', { email })

    // 4) Refresh /me
    await refetchMe()

    return cred
  }

  // Register HR with email/password
  const registerHR = async ({
    name,
    email,
    password,
    dateOfBirth,
    companyName,
    companyLogo,
  }) => {
    // 1) Firebase signup
    const cred = await createUserWithEmailAndPassword(auth, email, password)

    // 2) Backend user creation
    await apiClient.post('/users', {
      name,
      email,
      dateOfBirth,
      role: 'hr',
      companyName,
      companyLogo,
    })

    // 3) Issue JWT
    await apiClient.post('/auth/jwt', { email })

    // 4) Refresh /me
    await refetchMe()

    return cred
  }

  // Login with email/password
  const login = async ({ email, password }) => {
    // 1) Firebase login
    await signInWithEmailAndPassword(auth, email, password)

    // 2) Issue JWT with backend
    await apiClient.post('/auth/jwt', { email })

    // 3) Refresh /me
    await refetchMe()
  }

  // ========== Google Login flow ==========

  /**
   * 1) User clicks "Continue with Google" on Login page.
   * 2) We sign in with Google in Firebase.
   * 3) We try to issue JWT via backend.
   *    - If 200 → user exists in DB → return { status: 'existing', email }
   *    - If 404 → user not in DB → return { status: 'needsOnboarding', email, name }
   */
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    const email = user.email
    const displayName = user.displayName || ''

    if (!email) {
      throw new Error('Google account has no email')
    }

    try {
      // Try to issue JWT; if user exists in DB, this will succeed
      await apiClient.post('/auth/jwt', { email })
      await refetchMe()
      return { status: 'existing', email }
    } catch (err) {
      // If backend says "User not found in database"
      if (err.response && err.response.status === 404) {
        // User is logged into Firebase via Google, but not in our DB.
        // We'll send them to onboarding to choose role & fill extra info.
        return {
          status: 'needsOnboarding',
          email,
          name: displayName,
        }
      }
      // Other error -> rethrow
      throw err
    }
  }

  /**
   * Google onboarding: complete Employee profile.
   * User is already Google-authenticated; we just create DB user + JWT.
   */
  const completeGoogleSignupEmployee = async ({ name, email, dateOfBirth }) => {
    await apiClient.post('/users', {
      name,
      email,
      dateOfBirth,
      role: 'employee',
    })
    await apiClient.post('/auth/jwt', { email })
    await refetchMe()
  }

  /**
   * Google onboarding: complete HR profile.
   */
  const completeGoogleSignupHR = async ({
    name,
    email,
    dateOfBirth,
    companyName,
    companyLogo,
  }) => {
    await apiClient.post('/users', {
      name,
      email,
      dateOfBirth,
      role: 'hr',
      companyName,
      companyLogo,
    })
    await apiClient.post('/auth/jwt', { email })
    await refetchMe()
  }

  // ========== Logout ==========

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout')
    } catch (e) {
      // ignore
    }
    await signOut(auth)
  }

  const value = {
    firebaseUser,
    backendUser,
    role: backendUser?.role,
    isLoading,
    registerEmployee,
    registerHR,
    login,
    googleLogin,
    completeGoogleSignupEmployee,
    completeGoogleSignupHR,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
