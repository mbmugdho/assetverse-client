import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Calendar } from 'lucide-react'
import loginIllustration from '../../assets/illustrations/login.png'
import { useAuth } from '../../context/AuthContext'

const RegisterEmployee = () => {
  const { registerEmployee, isLoading } = useAuth()
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const dateOfBirth = form.dateOfBirth.value

    try {
      setFormLoading(true)
      await registerEmployee({ name, email, password, dateOfBirth })
      // After successful registration, go to login
      navigate('/login', { replace: true })
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to create employee account')
    } finally {
      setFormLoading(false)
    }
  }

  const disabled = isLoading || formLoading

  return (
    <section className="bg-base-100">
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
                alt="Employee registration illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-glass-brand p-6 md:p-8"
          >
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
                Join as Employee
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-brand-deep mt-2">
                Create your{' '}
                <span className="text-gradient-hero">AssetVerse</span> account.
              </h1>
              <p className="text-sm text-base-content/70 mt-2">
                Track every asset you receive across multiple companies, with
                one login.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-brand-deep">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Alex Johnson"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

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
                    required
                    placeholder="you@example.com"
                    className="input input-bordered w-full pl-10"
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
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt text-xs text-base-content/60">
                    Minimum 6 characters
                  </span>
                </label>
              </div>

              {/* Date of birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-brand-deep">
                    Date of birth
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {error && <p className="text-xs text-error mt-1">{error}</p>}

              <button
                type="submit"
                disabled={disabled}
                className="btn-gradient-primary w-full text-sm mt-2 disabled:opacity-60"
              >
                {disabled ? 'Creating account...' : 'Create Employee Account'}
              </button>
            </form>

            <div className="mt-5 text-xs md:text-sm text-base-content/70 space-y-1.5">
              <p>
                Want to manage a company instead?{' '}
                <Link
                  to="/register/hr"
                  className="text-brand-main font-semibold hover:underline"
                >
                  Join as HR Manager
                </Link>
                .
              </p>
              <p>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-brand-main font-semibold hover:underline"
                >
                  Login
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

export default RegisterEmployee
