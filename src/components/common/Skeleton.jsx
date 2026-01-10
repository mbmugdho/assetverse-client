import { motion } from 'framer-motion'

// Base skeleton with shimmer effect
const SkeletonBase = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-base-300 via-base-200 to-base-300 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
  />
)

// Skeleton Card for asset/product cards
export const SkeletonCard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="card-glass-brand p-4 h-full flex flex-col"
  >
    {/* Image placeholder */}
    <SkeletonBase className="w-full h-44 rounded-xl mb-4" />

    {/* Badge */}
    <SkeletonBase className="h-5 w-20 rounded-full mb-3" />

    {/* Title */}
    <SkeletonBase className="h-5 w-3/4 mb-2" />

    {/* Description lines */}
    <SkeletonBase className="h-3 w-full mb-1" />
    <SkeletonBase className="h-3 w-5/6 mb-4" />

    {/* Meta info */}
    <div className="flex items-center justify-between mt-auto pt-3">
      <SkeletonBase className="h-4 w-24" />
      <SkeletonBase className="h-9 w-28 rounded-full" />
    </div>
  </motion.div>
)

// Skeleton for table rows
export const SkeletonTableRow = ({ columns = 6 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="py-3 px-4">
        <SkeletonBase className={`h-4 ${i === 0 ? 'w-32' : 'w-20'}`} />
      </td>
    ))}
  </tr>
)

// Skeleton for stats cards
export const SkeletonStatsCard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="card-glass-brand p-4 flex items-start gap-3"
  >
    <SkeletonBase className="w-9 h-9 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <SkeletonBase className="h-3 w-24" />
      <SkeletonBase className="h-6 w-16" />
      <SkeletonBase className="h-2 w-32" />
    </div>
  </motion.div>
)

// Skeleton for profile/avatar
export const SkeletonProfile = () => (
  <div className="flex items-center gap-3 animate-pulse">
    <SkeletonBase className="w-12 h-12 rounded-full flex-shrink-0" />
    <div className="space-y-2">
      <SkeletonBase className="h-4 w-32" />
      <SkeletonBase className="h-3 w-24" />
    </div>
  </div>
)

// Skeleton for chart container
export const SkeletonChart = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="card-glass-brand p-4 h-72 flex flex-col"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-1">
        <SkeletonBase className="h-3 w-20" />
        <SkeletonBase className="h-5 w-40" />
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <SkeletonBase className="w-32 h-32 rounded-full" />
    </div>
  </motion.div>
)

// Skeleton for list items
export const SkeletonListItem = () => (
  <div className="flex items-center gap-3 p-3 animate-pulse">
    <SkeletonBase className="w-10 h-10 rounded-lg flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <SkeletonBase className="h-4 w-3/4" />
      <SkeletonBase className="h-3 w-1/2" />
    </div>
    <SkeletonBase className="h-6 w-16 rounded-full" />
  </div>
)

// Skeleton for details page
export const SkeletonDetailsPage = () => (
  <div className="space-y-6 animate-pulse">
    {/* Breadcrumb */}
    <SkeletonBase className="h-4 w-48" />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Image */}
      <SkeletonBase className="w-full h-80 rounded-2xl" />

      {/* Details */}
      <div className="space-y-4">
        <SkeletonBase className="h-6 w-24 rounded-full" />
        <SkeletonBase className="h-8 w-3/4" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-5/6" />
        <SkeletonBase className="h-4 w-4/6" />

        <div className="grid grid-cols-2 gap-4 pt-4">
          <SkeletonBase className="h-20 rounded-xl" />
          <SkeletonBase className="h-20 rounded-xl" />
        </div>

        <SkeletonBase className="h-12 w-full rounded-full mt-4" />
      </div>
    </div>

    {/* Related items */}
    <div className="pt-6">
      <SkeletonBase className="h-6 w-40 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBase key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
)

// Grid of skeleton cards
export const SkeletonCardGrid = ({ count = 8, columns = 4 }) => (
  <div
    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4`}
  >
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
)

// Skeleton for contact/form page
export const SkeletonForm = () => (
  <div className="space-y-4 animate-pulse">
    <SkeletonBase className="h-10 w-full rounded-lg" />
    <SkeletonBase className="h-10 w-full rounded-lg" />
    <SkeletonBase className="h-10 w-full rounded-lg" />
    <SkeletonBase className="h-32 w-full rounded-lg" />
    <SkeletonBase className="h-12 w-full rounded-full" />
  </div>
)

export default SkeletonBase
