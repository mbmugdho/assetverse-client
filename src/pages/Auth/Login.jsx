import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Eye, EyeOff, Zap } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import loginIllustration from '../../assets/illustrations/login.png'
import { useAuth } from '../../context/AuthContext'

// Demo credentials
const DEMO_CREDENTIALS = {
  hr: {
    email: 'demo.hr@assetverse.app',
    password: 'Demo@123',
    label: 'Demo HR Login',
  },
  employee: {
    email: 'demo.employee@assetverse.app',
    password: 'Demo@123',
    label: 'Demo Employee Login',
  },
}

const Login = () => {
  const { login, googleLogin, isLoading } = useAuth()
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear errors when user types
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setFormLoading(true)
      const user = await login({ 
        email: formData.email, 
        password: formData.password 
      })

      setSuccess('Login successful! Redirecting...')
      
      setTimeout(() => {
        if (user.role === 'hr') {
          navigate('/dashboard/hr/analytics', { replace: true })
        } else {
          navigate('/dashboard/employee/my-assets', { replace: true })
        }
      }, 500)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Invalid email or password')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDemoLogin = async (type) => {
    const creds = DEMO_CREDENTIALS[type]
    setFormData({ email: creds.email, password: creds.password })
    setError('')
    setSuccess(`Filled ${type.toUpperCase()} demo credentials. Click Login to continue.`)
  }

  const handleGoogleLogin = async () => {
    setError('')
    setSuccess('')
    try {
      setFormLoading(true)
      const result = await googleLogin()

      if (result.status === 'existing') {
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => {
          if (result.role === 'hr') {
            navigate('/dashboard/hr/analytics', { replace: true })
          } else {
            navigate('/dashboard/employee/my-assets', { replace: true })
          }
        }, 500)
      } else if (result.status === 'needsOnboarding') {
        navigate('/auth/choose-role', {
          state: {
            email: result.email,
            name: result.name,
          },
          replace: true,
        })
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Google login failed')
    } finally {
      setFormLoading(false)
    }
  }

  const disabled = isLoading || formLoading

  return (
    <section className="bg-section-soft2 min-h-[calc(100vh-4rem)]">
      <div className="container-x py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Left: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <img
                src={loginIllustration}
                alt="Person logging in illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Right: Login form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-glass-brand p-6 md:p-8"
          >
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
                Welcome back
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-brand-deep mt-2">
                Login to <span className="text-gradient-hero">AssetVerse</span>
              </h1>
              <p className="text-sm text-base-content/70 mt-2">
                Access your dashboard to manage assets, approvals, and teams.
              </p>
            </div>

            {/* Demo Login Buttons */}
            <div className="mb-6 p-4 rounded-xl bg-brand-soft/30 border border-brand-main/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-brand-main" />
                <span className="text-xs font-semibold text-brand-deep">
                  Quick Demo Access
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('hr')}
                  disabled={disabled}
                  className="btn btn-sm bg-brand-main/10 hover:bg-brand-main/20 border-brand-main/30 text-brand-deep text-xs"
                >
                  Demo HR Login
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('employee')}
                  disabled={disabled}
                  className="btn btn-sm bg-brand-accent/10 hover:bg-brand-accent/20 border-brand-accent/30 text-brand-deep text-xs"
                >
                  Demo Employee
                </button>
              </div>
              <p className="text-[10px] text-base-content/60 mt-2">
                Click a button above to auto-fill demo credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-brand-deep">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className={`input input-bordered w-full pl-10 ${
                      error && !formData.email ? 'input-error' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-brand-deep">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className={`input input-bordered w-full pl-10 pr-10 ${
                      error && formData.password.length < 6 ? 'input-error' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-base-content/50 hover:text-base-content"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <label className="label">
                  <span className="label-text-alt text-xs text-base-content/60">
                    Minimum 6 characters
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-error py-2 px-3"
                >
                  <span className="text-xs">{error}</span>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-success py-2 px-3"
                >
                  <span className="text-xs">{success}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={disabled}
                className="btn-gradient-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
              >
                {disabled ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </>
                )}
              </button>

              <div className="divider text-xs text-base-content/60">
                or continue with
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={disabled}
                className="btn-gradient-outline w-full text-sm disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>
            </form>

            <div className="mt-5 text-xs md:text-sm text-base-content/70 space-y-1.5">
              <p>
                New here?{' '}
                <Link
                  to="/register/employee"
                  className="text-brand-main font-semibold hover:underline"
                >
                  Join as Employee
                </Link>{' '}
                or{' '}
                <Link
                  to="/register/hr"
                  className="text-brand-main font-semibold hover:underline"
                >
                  Join as HR Manager
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Login