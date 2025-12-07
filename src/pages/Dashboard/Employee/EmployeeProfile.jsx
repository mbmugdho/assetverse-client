import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Calendar, Image as ImageIcon } from 'lucide-react'

// UI-only initial data
const initialProfile = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  dateOfBirth: '1995-06-15',
  profileImage: '',
}

const mockAffiliations = [
  { id: 'c1', name: 'GreenFrame Studio', role: 'Product Designer' },
  { id: 'c2', name: 'CloudNest Labs', role: 'Consultant' },
]

const EmployeeProfile = () => {
  const [profile, setProfile] = useState(initialProfile)
  const [imagePreview, setImagePreview] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImagePreview(url)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Updated profile (UI only):', profile)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-5 lg:gap-8"
    >
      {/* Left: form */}
      <div className="card-glass-brand p-5 md:p-6">
        <h2 className="text-xl font-bold text-brand-deep mb-1">My Profile</h2>
        <p className="text-sm text-base-content/70 mb-4">
          Update your personal information. Your email is read-only and tied to
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
                className="input input-bordered w-full pl-10"
                value={profile.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Profile image upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-medium text-brand-deep">
                Profile picture
              </span>
            </label>
            <label className="flex items-center gap-2 border border-base-300 rounded-xl px-3 py-2 cursor-pointer bg-base-100/80 hover:border-brand-main/60">
              <ImageIcon className="w-4 h-4 text-base-content/70" />
              <span className="text-xs text-base-content/70">
                Upload image (UI only)
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <label className="label">
              <span className="label-text-alt text-xs text-base-content/60">
                This is for preview only. You&apos;ll connect real upload later
                (e.g. ImgBB/Cloudinary).
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn-gradient-primary w-full text-sm mt-2"
          >
            Save changes
          </button>
        </form>
      </div>

      {/* Right: avatar + affiliations */}
      <div className="space-y-4">
        <div className="card-glass-brand p-5 flex flex-col items-center gap-3">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full border-2 border-brand-main bg-base-200 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-brand-main">
                  {profile.name[0]}
                </div>
              )}
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-brand-deep">
              {profile.name}
            </p>
            <p className="text-xs text-base-content/70">{profile.email}</p>
          </div>
        </div>

        <div className="card-glass-brand p-5">
          <h3 className="text-sm font-semibold text-brand-deep mb-2">
            Company affiliations
          </h3>
          {mockAffiliations.length === 0 ? (
            <p className="text-xs text-base-content/70">
              You're not affiliated with any company yet. Request an asset
              to get started.
            </p>
          ) : (
            <ul className="space-y-2">
              {mockAffiliations.map(aff => (
                <li
                  key={aff.id}
                  className="flex items-center justify-between gap-2 border border-base-200 rounded-xl px-3 py-2 bg-base-100/80"
                >
                  <div>
                    <p className="text-xs font-semibold text-brand-deep">
                      {aff.name}
                    </p>
                    <p className="text-[11px] text-base-content/60">
                      Role: {aff.role}
                    </p>
                  </div>
                  <span className="badge badge-xs badge-outline border-brand-main/60 text-brand-main">
                    Active
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default EmployeeProfile