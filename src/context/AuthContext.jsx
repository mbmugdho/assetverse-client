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

const googleProvider = new GoogleAuthProvider()

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setFirebaseUser(user || null)
      setAuthLoading(false)
    })
    return () => unsubscribe()
  }, [])

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
    enabled: !!firebaseUser,
  })

  const isLoading = authLoading || (firebaseUser && backendLoading)

  // ========== Email/Password registration ==========

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

    // 3) Sign out so they go through normal login flow
    await signOut(auth)

    return cred
  }

  const registerHR = async ({
    name,
    email,
    password,
    dateOfBirth,
    companyName,
    companyLogo,
  }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)

    await apiClient.post('/users', {
      name,
      email,
      dateOfBirth,
      role: 'hr',
      companyName,
      companyLogo,
    })

    await signOut(auth)

    return cred
  }

  // ========== Email/Password login ==========

  // Returns backend user (with role) so UI can redirect properly
  const login = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password)
    await apiClient.post('/auth/jwt', { email })
    const res = await apiClient.get('/users/me')
    await refetchMe()
    return res.data
  }

  // ========== Google login / onboarding ==========

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    const email = user.email
    const displayName = user.displayName || ''

    if (!email) {
      throw new Error('Google account has no email')
    }

    try {
      await apiClient.post('/auth/jwt', { email })
      const res = await apiClient.get('/users/me')
      await refetchMe()
      return {
        status: 'existing',
        email,
        role: res.data.role,
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Not in DB yet
        return {
          status: 'needsOnboarding',
          email,
          name: displayName,
        }
      }
      throw err
    }
  }

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