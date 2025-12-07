import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, Building2, Image as ImageIcon, Calendar } from 'lucide-react'
import loginIllustration from '../../assets/illustrations/login.png'

const RegisterHR = () => {
  const handleSubmit = e => {
    e.preventDefault()
    // TODO: implement real HR registration
    console.log('register HR submit')
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
                alt="HR manager registration illustration"
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
                Join as HR Manager
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-brand-deep mt-2">
                Set up your{' '}
                <span className="text-gradient-hero">company workspace</span>.
              </h1>
              <p className="text-sm text-base-content/70 mt-2">
                Create your AssetVerse company account. You'll start with a
                free Basic package (5 employees).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-brand-deep">
                    Your full name
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
                    placeholder="Jordan Smith"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

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
                    required
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
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    name="companyLogo"
                    required
                    placeholder="https://i.ibb.co/your-logo.png"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt text-xs text-base-content/60">
                    You can use ImgBB, Cloudinary, or any CDN-hosted logo.
                  </span>
                </label>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-brand-deep">
                    Work email
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
                    placeholder="you@company.com"
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
                    placeholder="******"
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

              <button
                type="submit"
                className="btn-gradient-primary w-full flex items-center justify-center gap-2 mt-2"
              >
                <span>Create HR Workspace</span>
              </button>
            </form>

            <div className="mt-5 text-xs md:text-sm text-base-content/70 space-y-1.5">
              <p>
                Looking to join as an employee instead?{' '}
                <Link
                  to="/register/employee"
                  className="text-brand-main font-semibold hover:underline"
                >
                  Join as Employee
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

export default RegisterHR