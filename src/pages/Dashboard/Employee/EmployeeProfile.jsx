import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  User,
  Calendar,
  Image as ImageIcon,
  Briefcase,
} from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import apiClient from '../../../services/apiClient'
import { useAuth } from '../../../context/AuthContext'
import { useMyAffiliations } from '../../../hooks/useMyAffiliations'

const EmployeeProfile = () => {
  const { backendUser, firebaseUser, isLoading: authLoading } = useAuth()
  const queryClient = useQueryClient()
  const {
    data: affiliations,
    isLoading: affLoading,
    isError: affError,
  } = useMyAffiliations()
  const myAffiliations = affiliations || []

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    profileImage: '',
  })
  const [previewImage, setPreviewImage] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const isLoading = authLoading

  // Initialize form from backendUser + Gmail avatar
  useEffect(() => {
    if (backendUser) {
      const dob = backendUser.dateOfBirth
        ? new Date(backendUser.dateOfBirth).toISOString().slice(0, 10)
        : ''
      const initialProfileImage =
        backendUser.profileImage || firebaseUser?.photoURL || ''
      setFormState({
        name: backendUser.name || '',
        email: backendUser.email || '',
        dateOfBirth: dob,
        profileImage: initialProfileImage,
      })
      setPreviewImage(initialProfileImage)
    }
  }, [backendUser, firebaseUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewImage(url)
    // You can later hook a real upload to ImgBB/Cloudinary if desired
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!backendUser) return
    setError('')
    try {
      setSaving(true)
      await apiClient.patch('/users/me', {
        name: formState.name,
        dateOfBirth: formState.dateOfBirth,
        profileImage: formState.profileImage,
      })
      await queryClient.invalidateQueries({ queryKey: ['me'] })
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.message || err.message || 'Failed to update profile'
      )
    } finally {
      setSaving(false)
    }
  }

  if (isLoading && !backendUser) {
    return (
      <div className="card-glass-brand p-6 text-sm text-base-content/70">
        Loading profile...
      </div>
    )
  }

  if (!backendUser) {
    return (
      <div className="card-glass-brand p-6 text-sm text-error">
        Unable to load profile.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-5 lg:gap-8"
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
                value={formState.name}
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
                value={formState.email}
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
                value={formState.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Profile image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-medium text-brand-deep">
                Profile image URL
              </span>
            </label>
            <div className="relative mb-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                <ImageIcon className="w-4 h-4" />
              </span>
              <input
                type="url"
                name="profileImage"
                placeholder="https://i.ibb.co/your-avatar.png"
                className="input input-bordered w-full pl-10"
                value={formState.profileImage}
                onChange={handleChange}
              />
            </div>
            <label className="label">
              <span className="label-text-alt text-xs text-base-content/60">
                You can paste a hosted image URL here. File upload preview below
                is for convenience only.
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
                onChange={handleImageChange}
              />
            </label>
          </div>

          {error && <p className="text-xs text-error mt-1">{error}</p>}

          <button
            type="submit"
            className="btn-gradient-primary w-full text-sm mt-2 disabled:opacity-60"
            disabled={saving}
          >
            {saving ? 'Saving changes...' : 'Save changes'}
          </button>
        </form>
      </div>

      {/* Right: avatar + affiliations */}
      <div className="space-y-4">
        <div className="card-glass-brand p-5 flex flex-col items-center gap-3">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full border-2 border-brand-main bg-base-200 overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-brand-main">
                  {formState.name[0] || backendUser.name[0]}
                </div>
              )}
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-brand-deep">
              {formState.name}
            </p>
            <p className="text-xs text-base-content/70">{formState.email}</p>
          </div>
        </div>

        <div className="card-glass-brand p-5">
          <h3 className="text-sm font-semibold text-brand-deep mb-2 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-main" />
            Company affiliations
          </h3>
          {affLoading && (
            <p className="text-xs text-base-content/70">
              Loading affiliations...
            </p>
          )}
          {affError && (
            <p className="text-xs text-error">Failed to load affiliations.</p>
          )}
          {!affLoading && !affError && myAffiliations.length === 0 && (
            <p className="text-xs text-base-content/70">
              You are not affiliated with any company yet.
            </p>
          )}
          {!affLoading && !affError && myAffiliations.length > 0 && (
            <ul className="space-y-2 text-xs text-base-content/80">
              {myAffiliations.map((aff) => (
                <li
                  key={aff._id}
                  className="border border-base-200 rounded-xl px-3 py-2 bg-base-100/80"
                >
                  <p className="font-semibold text-brand-deep">
                    {aff.companyName}
                  </p>
                  <p className="text-[11px] text-base-content/60">
                    Affiliated since:{' '}
                    {aff.affiliationDate
                      ? new Date(aff.affiliationDate).toLocaleDateString()
                      : '—'}
                  </p>
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
