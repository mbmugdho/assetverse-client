import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Lock, LogIn } from 'lucide-react'
import loginIllustration from '../../assets/illustrations/login.png'

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault()
    // TODO: implement real login (Firebase + backend JWT)
    console.log('login submit')
  }

  const handleGoogleLogin = () => {
    // TODO: implement Google login
    console.log('google login')
  }

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

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button
                type="submit"
                className="btn-gradient-primary w-full flex items-center justify-center gap-2 mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>

              <div className="divider text-xs text-base-content/60">
                or continue with
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn-gradient-outline w-full text-sm"
              >
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