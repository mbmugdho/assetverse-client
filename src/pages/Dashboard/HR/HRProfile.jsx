import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  User,
  Calendar,
  Building2,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import apiClient from '../../../services/apiClient'
import { useAuth } from '../../../context/AuthContext'

const HRProfile = () => {
  const { backendUser, firebaseUser, isLoading: authLoading } = useAuth()
  const queryClient = useQueryClient()

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    profileImage: '',
    companyName: '',
    companyLogo: '',
  })
  const [profilePreview, setProfilePreview] = useState('')
  const [logoPreview, setLogoPreview] = useState('')
  const [savingPersonal, setSavingPersonal] = useState(false)
  const [savingCompany, setSavingCompany] = useState(false)
  const [errorPersonal, setErrorPersonal] = useState('')
  const [errorCompany, setErrorCompany] = useState('')

  const isLoading = authLoading

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
        companyName: backendUser.companyName || '',
        companyLogo: backendUser.companyLogo || '',
      })
      setProfilePreview(initialProfileImage)
      setLogoPreview(backendUser.companyLogo || '')
    }
  }, [backendUser, firebaseUser])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
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

  const handlePersonalSubmit = async (e) => {
    e.preventDefault()
    if (!backendUser) return
    setErrorPersonal('')
    try {
      setSavingPersonal(true)
      await apiClient.patch('/users/me', {
        name: formState.name,
        dateOfBirth: formState.dateOfBirth,
        profileImage: formState.profileImage,
      })
      await queryClient.invalidateQueries({ queryKey: ['me'] })
    } catch (err) {
      console.error(err)
      setErrorPersonal(
        err.response?.data?.message ||
          err.message ||
          'Failed to update personal profile'
      )
    } finally {
      setSavingPersonal(false)
    }
  }

  const handleCompanySubmit = async (e) => {
    e.preventDefault()
    if (!backendUser) return
    setErrorCompany('')
    try {
      setSavingCompany(true)
      await apiClient.patch('/users/me', {
        companyName: formState.companyName,
        companyLogo: formState.companyLogo,
      })
      await queryClient.invalidateQueries({ queryKey: ['me'] })
    } catch (err) {
      console.error(err)
      setErrorCompany(
        err.response?.data?.message ||
          err.message ||
          'Failed to update company profile'
      )
    } finally {
      setSavingCompany(false)
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

  const usagePercent =
    backendUser.employeeLimit > 0
      ? Math.round(
          (backendUser.currentEmployees / backendUser.employeeLimit) * 100
        )
      : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-5 lg:gap-8"
    >
      {/* Left: personal + company forms */}
      <div className="space-y-4">
        {/* Personal info */}
        <div className="card-glass-brand p-5 md:p-6">
          <h2 className="text-xl font-bold text-brand-deep mb-1">HR Profile</h2>
          <p className="text-sm text-base-content/70 mb-4">
            Update your personal details. Your email is read-only and tied to
            your login.
          </p>
          <form onSubmit={handlePersonalSubmit} className="space-y-4">
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
                  className="input input-bordered w-full pl-10 bg-base-200 cursor-not-allowed"
                  value={formState.email}
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
                  Paste a hosted image URL or upload a preview below.
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

            {errorPersonal && (
              <p className="text-xs text-error mt-1">{errorPersonal}</p>
            )}

            <button
              type="submit"
              className="btn-gradient-primary w-full text-sm mt-2 disabled:opacity-60"
              disabled={savingPersonal}
            >
              {savingPersonal ? 'Saving changes...' : 'Save personal changes'}
            </button>
          </form>
        </div>

        {/* Company info */}
        <div className="card-glass-brand p-5 md:p-6">
          <h3 className="text-sm font-semibold text-brand-deep mb-2">
            Company profile
          </h3>
          <p className="text-xs text-base-content/70 mb-3">
            Update your company name and logo. This appears for all affiliated
            employees.
          </p>
          <form onSubmit={handleCompanySubmit} className="space-y-3">
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
                  value={formState.companyName}
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
                  placeholder="https://i.ibb.co/your-logo.png"
                  className="input input-bordered w-full pl-10"
                  value={formState.companyLogo}
                  onChange={handleChange}
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-xs text-base-content/60">
                  Use ImgBB, Cloudinary, or any CDN-hosted logo.
                </span>
              </label>
              <label className="flex items-center gap-2 border border-base-300 rounded-xl px-3 py-2 cursor-pointer bg-base-100/80 hover:border-brand-main/60">
                <ImageIcon className="w-4 h-4 text-base-content/70" />
                <span className="text-xs text-base-content/70">
                  Upload logo (preview only)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>

            {errorCompany && (
              <p className="text-xs text-error mt-1">{errorCompany}</p>
            )}

            <button
              type="submit"
              className="btn-gradient-outline w-full text-sm mt-1 disabled:opacity-60"
              disabled={savingCompany}
            >
              {savingCompany
                ? 'Saving company changes...'
                : 'Save company changes'}
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
            ) : formState.companyLogo ? (
              <img src={formState.companyLogo} alt="Company logo" />
            ) : (
              <span className="text-sm font-semibold text-brand-main text-center px-1">
                {formState.companyName[0] || 'C'}
              </span>
            )}
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-brand-deep">
              {formState.companyName || backendUser.companyName}
            </p>
            <p className="text-[11px] text-base-content/60">
              Subscription: {backendUser.subscription}
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
            You&apos;re currently using{' '}
            <span className="font-semibold text-brand-main">
              {backendUser.currentEmployees}/{backendUser.employeeLimit}
            </span>{' '}
            employee seats.
          </p>
          <div className="w-full bg-base-200 rounded-full h-2.5 mb-2 overflow-hidden">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-brand-main to-brand-accent"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="text-[11px] text-base-content/60">
            When you approach 100%, you&apos;ll be prompted to upgrade your
            package in the Upgrade Package tab.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default HRProfile
