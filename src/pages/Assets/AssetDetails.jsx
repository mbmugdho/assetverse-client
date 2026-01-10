import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Building2,
  Calendar,
  Package,
  Tag,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react'
import { useAssetDetails } from '../../hooks/useAssetDetails'
import { SkeletonDetailsPage } from '../../components/common/Skeleton'
import AssetCard from '../../components/common/AssetCard'

const AssetDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useAssetDetails(id)

  const asset = data?.asset
  const relatedAssets = data?.relatedAssets || []

  if (isLoading) {
    return (
      <section className="bg-section-soft min-h-screen">
        <div className="container-x py-8 md:py-12">
          <SkeletonDetailsPage />
        </div>
      </section>
    )
  }

  if (isError || !asset) {
    return (
      <section className="bg-section-soft min-h-screen">
        <div className="container-x py-8 md:py-12">
          <div className="card-glass-brand p-8 text-center max-w-lg mx-auto">
            <XCircle className="w-16 h-16 mx-auto text-error mb-4" />
            <h2 className="text-xl font-bold text-brand-deep mb-2">
              Asset Not Found
            </h2>
            <p className="text-sm text-base-content/70 mb-6">
              {error?.message ||
                "The asset you're looking for doesn't exist or has been removed."}
            </p>
            <Link
              to="/assets"
              className="btn-gradient-primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Assets
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const {
    productName,
    productImage,
    productType,
    productQuantity,
    availableQuantity,
    companyName,
    dateAdded,
    hrEmail,
  } = asset

  const isAvailable = availableQuantity > 0
  const formattedDate = dateAdded
    ? new Date(dateAdded).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'

  return (
    <section className="bg-section-soft min-h-screen">
      <div className="container-x py-8 md:py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-base-content/70 mb-6"
        >
          <Link to="/" className="hover:text-brand-main transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/assets"
            className="hover:text-brand-main transition-colors"
          >
            Assets
          </Link>
          <span>/</span>
          <span className="text-brand-deep font-medium truncate max-w-[200px]">
            {productName}
          </span>
        </motion.nav>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm gap-2 mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-glass-brand p-4 md:p-6">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-base-200">
                <img
                  src={
                    productImage || 'https://placehold.co/600x600?text=No+Image'
                  }
                  alt={productName}
                  className="w-full h-full object-cover"
                />

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`badge ${
                      isAvailable
                        ? 'bg-success text-white border-success'
                        : 'bg-error text-white border-error'
                    } gap-1`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        In Stock
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" />
                        Out of Stock
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip (placeholder for multiple images) */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors cursor-pointer ${
                      i === 1
                        ? 'border-brand-main'
                        : 'border-transparent hover:border-brand-main/50'
                    }`}
                  >
                    <img
                      src={
                        productImage ||
                        'https://placehold.co/100x100?text=No+Image'
                      }
                      alt={`${productName} thumbnail ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Type Badge */}
            <div>
              <span
                className={`badge ${
                  productType === 'Returnable'
                    ? 'badge-outline border-brand-main text-brand-main'
                    : 'badge-outline border-base-300 text-base-content/70'
                }`}
              >
                {productType}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-deep">
              {productName}
            </h1>

            {/* Description */}
            <div className="card-glass-brand p-4">
              <h3 className="text-sm font-semibold text-brand-deep mb-2">
                Description
              </h3>
              <p className="text-sm text-base-content/70 leading-relaxed">
                This is a {productType.toLowerCase()} asset managed by{' '}
                {companyName || 'the organization'}.
                {productType === 'Returnable'
                  ? ' This item must be returned when no longer needed or upon employment termination.'
                  : ' This is a consumable item that does not need to be returned.'}
              </p>
            </div>

            {/* Key Specifications */}
            <div className="card-glass-brand p-4">
              <h3 className="text-sm font-semibold text-brand-deep mb-3">
                Key Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-soft/50 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-brand-main" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Company</p>
                    <p className="text-sm font-medium text-brand-deep">
                      {companyName || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-soft/50 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-4 h-4 text-brand-main" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Type</p>
                    <p className="text-sm font-medium text-brand-deep">
                      {productType}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-soft/50 flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-brand-main" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Availability</p>
                    <p
                      className={`text-sm font-medium ${
                        isAvailable ? 'text-success' : 'text-error'
                      }`}
                    >
                      {availableQuantity} of {productQuantity} available
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-soft/50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-brand-main" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Added On</p>
                    <p className="text-sm font-medium text-brand-deep">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div
              className={`card-glass-brand p-4 border-l-4 ${
                isAvailable ? 'border-l-success' : 'border-l-error'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-deep">
                    {isAvailable
                      ? 'Available for Request'
                      : 'Currently Unavailable'}
                  </p>
                  <p className="text-xs text-base-content/60 mt-1">
                    {isAvailable
                      ? `${availableQuantity} unit${
                          availableQuantity > 1 ? 's' : ''
                        } can be requested`
                      : 'All units are currently assigned'}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isAvailable ? 'bg-success/20' : 'bg-error/20'
                  }`}
                >
                  {isAvailable ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-error" />
                  )}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to="/login"
                className="btn-gradient-primary w-full text-base flex items-center justify-center gap-2"
              >
                Request This Asset
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-center text-base-content/60 mt-2">
                Login as an employee to submit a request
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Assets */}
        {relatedAssets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 lg:mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
                  Similar Items
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-brand-deep mt-1">
                  Related Assets
                </h2>
              </div>
              <Link to="/assets" className="btn-gradient-outline btn-sm gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {relatedAssets.map((relatedAsset, index) => (
                <AssetCard
                  key={relatedAsset._id}
                  asset={relatedAsset}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default AssetDetails
