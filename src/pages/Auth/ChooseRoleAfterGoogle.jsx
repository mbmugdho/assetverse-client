import { motion } from 'framer-motion'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { User, Building2, Calendar } from 'lucide-react'
import loginIllustration from '../../assets/illustrations/login.png'

const ChooseRoleAfterGoogle = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    completeGoogleSignupEmployee,
    completeGoogleSignupHR,
    isLoading: authLoading,
  } = useAuth()

  const { email, name } = location.state || {}

  const [role, setRole] = useState('employee')
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!email) {
      navigate('/login', { replace: true })
    }
  }, [email, navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) return

    setError('')
    const form = e.target
    const fullName = form.name.value
    const dateOfBirth = form.dateOfBirth.value

    try {
      setFormLoading(true)

      if (role === 'employee') {
        await completeGoogleSignupEmployee({
          name: fullName,
          email,
          dateOfBirth,
        })
        navigate('/dashboard/employee/my-assets', { replace: true })
      } else {
        const companyName = form.companyName.value
        const companyLogo = form.companyLogo.value
        await completeGoogleSignupHR({
          name: fullName,
          email,
          dateOfBirth,
          companyName,
          companyLogo,
        })
        navigate('/dashboard/hr/assets', { replace: true })
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to complete profile')
    } finally {
      setFormLoading(false)
    }
  }

  const disabled = authLoading || formLoading

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
                alt="Google onboarding illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Right: Choose role + form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-glass-brand p-6 md:p-8"
          >
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
                Complete your profile
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-brand-deep mt-2">
                Welcome,{' '}
                <span className="text-gradient-hero">{name || email}</span>
              </h1>
              <p className="text-sm text-base-content/70 mt-2">
                Choose how you want to use AssetVerse and add a few details to
                finish setting up your account.
              </p>
            </div>

            {/* Role selector */}
            <div className="mb-4">
              <div className="tabs tabs-boxed bg-base-200/60">
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`tab text-xs md:text-sm ${
                    role === 'employee'
                      ? 'tab-active text-brand-deep'
                      : 'text-base-content/70'
                  }`}
                >
                  Join as Employee
                </button>
                <button
                  type="button"
                  onClick={() => setRole('hr')}
                  className={`tab text-xs md:text-sm ${
                    role === 'hr'
                      ? 'tab-active text-brand-deep'
                      : 'text-base-content/70'
                  }`}
                >
                  Join as HR Manager
                </button>
              </div>
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
                    defaultValue={name || ''}
                    required
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-brand-deep">
                    Email
                  </span>
                </label>
              </div>
              <input
                type="email"
                value={email || ''}
                readOnly
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />

              {/* DOB */}
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

              {role === 'hr' && (
                <>
                  {/* Company name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm font-medium text-brand-deep">
                        Company name
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="companyName"
                        required={role === 'hr'}
                        placeholder="Acme Solutions Ltd."
                        className="input input-bordered w-full pl-10"
                      />
                    </div>
                  </div>

                  {/* Company logo URL */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-sm font-medium text-brand-deep">
                        Company logo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="companyLogo"
                      required={role === 'hr'}
                      placeholder="https://i.ibb.co/your-logo.png"
                      className="input input-bordered w-full"
                    />
                    <label className="label">
                      <span className="label-text-alt text-xs text-base-content/60">
                        You can use ImgBB, Cloudinary, or any CDN-hosted logo.
                      </span>
                    </label>
                  </div>
                </>
              )}

              {error && (
                <p className="text-xs text-error mt-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={disabled}
                className="btn-gradient-primary w-full text-sm mt-2 disabled:opacity-60"
              >
                {disabled ? 'Saving profile...' : 'Complete setup'}
              </button>
            </form>

            <div className="mt-4 text-xs text-base-content/70">
              <Link to="/login" className="text-brand-main hover:underline">
                Back to Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ChooseRoleAfterGoogle