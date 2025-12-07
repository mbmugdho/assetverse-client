import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  User,
  Calendar,
  Building2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react'

// Mock initial profile
const initialHRProfile = {
  name: 'Jordan Smith',
  email: 'jordan@company.com',
  dateOfBirth: '1988-04-12',
  profileImage: '',
  companyName: 'GreenFrame Studio',
  companyLogo: '',
  subscription: 'Standard',
  employeeLimit: 10,
  currentEmployees: 3,
}

const HRProfile = () => {
  const [profile, setProfile] = useState(initialHRProfile)
  const [profilePreview, setProfilePreview] = useState('')
  const [logoPreview, setLogoPreview] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setProfilePreview(url)
  }

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setLogoPreview(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Update HR profile (UI only):', profile)
  }

  const usagePercent =
    profile.employeeLimit > 0
      ? Math.round((profile.currentEmployees / profile.employeeLimit) * 100)
      : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-5 lg:gap-8"
    >
      {/* Left: forms */}
      <div className="space-y-4">
        {/* Personal info */}
        <div className="card-glass-brand p-5 md:p-6">
          <h2 className="text-xl font-bold text-brand-deep mb-1">HR Profile</h2>
          <p className="text-sm text-base-content/70 mb-4">
            Update your personal details. Your email is read-only and tied to
            your login.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium text-brand-deep">
                  Full name
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full pl-10"
                  value={profile.name}
                  onChange={handleChange}
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
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 bg-base-200 cursor-not-allowed"
                  value={profile.email}
                  readOnly
                />
              </div>
            </div>

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
                  className="input input-bordered w-full pl-10"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Profile picture */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium text-brand-deep">
                  Profile picture
                </span>
              </label>
              <label className="flex items-center gap-2 border border-base-300 rounded-xl px-3 py-2 cursor-pointer bg-base-100/80 hover:border-brand-main/60">
                <ImageIcon className="w-4 h-4 text-base-content/70" />
                <span className="text-xs text-base-content/70">
                  Upload image (preview only)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn-gradient-primary w-full text-sm mt-2"
            >
              Save personal changes
            </button>
          </form>
        </div>

        {/* Company info */}
        <div className="card-glass-brand p-5 md:p-6">
          <h3 className="text-sm font-semibold text-brand-deep mb-2">
            Company profile
          </h3>
          <p className="text-xs text-base-content/70 mb-3">
            Update your company information and logo. This appears for all
            affiliated employees.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log('Update company (UI only):', profile)
            }}
            className="space-y-3"
          >
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
                  className="input input-bordered w-full pl-10"
                  value={profile.companyName}
                  onChange={handleChange}
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
              <div className="relative mb-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                  <ImageIcon className="w-4 h-4" />
                </span>
                <input
                  type="url"
                  name="companyLogo"
                  className="input input-bordered w-full pl-10"
                  placeholder="https://i.ibb.co/your-logo.png"
                  value={profile.companyLogo}
                  onChange={handleChange}
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-xs text-base-content/60">
                  Or upload an image (preview only):
                </span>
              </label>
              <label className="flex items-center gap-2 border border-base-300 rounded-xl px-3 py-2 cursor-pointer bg-base-100/80 hover:border-brand-main/60 mb-1">
                <ImageIcon className="w-4 h-4 text-base-content/70" />
                <span className="text-xs text-base-content/70">
                  Upload logo file
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn-gradient-outline w-full text-sm mt-1"
            >
              Save company changes
            </button>
          </form>
        </div>
      </div>

      {/* Right: subscription summary */}
      <div className="space-y-4">
        <div className="card-glass-brand p-5 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl border-2 border-brand-main bg-base-200 overflow-hidden flex items-center justify-center">
            {logoPreview ? (
              <img src={logoPreview} alt="Company logo preview" />
            ) : profile.companyLogo ? (
              <img src={profile.companyLogo} alt="Company logo" />
            ) : (
              <span className="text-sm font-semibold text-brand-main text-center px-1">
                {profile.companyName[0]}
              </span>
            )}
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-brand-deep">
              {profile.companyName}
            </p>
            <p className="text-[11px] text-base-content/60">
              Subscription: {profile.subscription}
            </p>
          </div>
        </div>

        <div className="card-glass-brand p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-brand-main" />
            <h3 className="text-sm font-semibold text-brand-deep">
              Subscription usage
            </h3>
          </div>
          <p className="text-xs text-base-content/70 mb-3">
            You're currently using{' '}
            <span className="font-semibold text-brand-main">
              {profile.currentEmployees}/{profile.employeeLimit}
            </span>{' '}
            employee seats.
          </p>
          <div className="w-full bg-base-200 rounded-full h-3 mb-2 overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-brand-main to-brand-accent"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="text-[11px] text-base-content/60">
            When you approach 100%, you'll be prompted to upgrade your
            package in the Upgrade Package tab.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default HRProfile
