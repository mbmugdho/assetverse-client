import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Calendar, Package, ArrowRight } from 'lucide-react'

const AssetCard = ({ asset, index = 0 }) => {
  const {
    _id,
    productName,
    productImage,
    productType,
    companyName,
    dateAdded,
    availableQuantity,
  } = asset

  const isAvailable = availableQuantity > 0
  const formattedDate = dateAdded
    ? new Date(dateAdded).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-glass-brand p-4 h-full flex flex-col group hover:shadow-lg hover:border-brand-main/30 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-base-200">
        <img
          src={productImage || 'https://placehold.co/400x300?text=No+Image'}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`badge badge-sm ${
              isAvailable
                ? 'bg-success/90 text-white border-success'
                : 'bg-error/90 text-white border-error'
            }`}
          >
            {isAvailable ? `${availableQuantity} Available` : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Type Badge */}
      <div className="mb-2">
        <span
          className={`badge badge-sm ${
            productType === 'Returnable'
              ? 'badge-outline border-brand-main text-brand-main'
              : 'badge-outline border-base-300 text-base-content/70'
          }`}
        >
          {productType}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-brand-deep line-clamp-2 mb-2 group-hover:text-brand-main transition-colors">
        {productName}
      </h3>

      {/* Meta Info */}
      <div className="space-y-1.5 mb-4 flex-grow">
        {companyName && (
          <div className="flex items-center gap-2 text-xs text-base-content/70">
            <Building2 className="w-3.5 h-3.5 text-brand-accent" />
            <span className="truncate">{companyName}</span>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-2 text-xs text-base-content/70">
            <Calendar className="w-3.5 h-3.5 text-brand-accent" />
            <span>Added {formattedDate}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-base-content/70">
          <Package className="w-3.5 h-3.5 text-brand-accent" />
          <span>
            {availableQuantity} of {asset.productQuantity || availableQuantity} available
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto pt-3 border-t border-base-200">
        <Link
          to={`/assets/${_id}`}
          className="btn-gradient-primary w-full text-sm flex items-center justify-center gap-2 group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}

// Grid wrapper for consistent 4-column layout
export const AssetCardGrid = ({ assets, isLoading, emptyMessage }) => {
  if (isLoading) {
    // Import skeleton dynamically to avoid circular imports
    const { SkeletonCard } = require('./Skeleton')
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (!assets || assets.length === 0) {
    return (
      <div className="card-glass-brand p-12 text-center">
        <Package className="w-12 h-12 mx-auto text-base-content/30 mb-3" />
        <p className="text-base-content/70">
          {emptyMessage || 'No assets found.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {assets.map((asset, index) => (
        <AssetCard key={asset._id} asset={asset} index={index} />
      ))}
    </div>
  )
}

export default AssetCard