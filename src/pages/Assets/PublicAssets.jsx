import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Package, ArrowUpDown } from 'lucide-react'
import { usePublicAssets } from '../../hooks/usePublicAssets'
import AssetCard, { AssetCardGrid } from '../../components/common/AssetCard'
import { SkeletonCard } from '../../components/common/Skeleton'

const PublicAssets = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [type, setType] = useState('All')
  const [sortBy, setSortBy] = useState('dateAdded')
  const [sortOrder, setSortOrder] = useState('desc')
  const limit = 12

  const { data, isLoading, isError, error } = usePublicAssets({
    page,
    limit,
    search,
    type,
    sortBy,
    sortOrder,
  })

  const assets = data?.data || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const handleTypeChange = (newType) => {
    setType(newType)
    setPage(1)
  }

  const handleSortChange = (value) => {
    const [field, order] = value.split('-')
    setSortBy(field)
    setSortOrder(order)
    setPage(1)
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="bg-section-soft min-h-screen">
      <div className="container-x py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
            Browse Inventory
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-deep mt-2">
            All Available Assets
          </h1>
          <p className="text-sm md:text-base text-base-content/70 mt-2 max-w-2xl">
            Explore our complete inventory of company assets. Login as an
            employee to request items for your work.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-glass-brand p-4 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search assets by name..."
                  className="input input-bordered w-full pl-10 pr-24"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-sm btn-primary"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-base-content/50" />
                <select
                  className="select select-bordered select-sm w-40"
                  value={type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-base-content/50" />
                <select
                  className="select select-bordered select-sm w-44"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="dateAdded-desc">Newest First</option>
                  <option value="dateAdded-asc">Oldest First</option>
                  <option value="productName-asc">Name A-Z</option>
                  <option value="productName-desc">Name Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(search || type !== 'All') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-base-200">
              <span className="text-xs text-base-content/60">
                Active filters:
              </span>

              {search && (
                <span className="badge badge-sm badge-outline gap-1">
                  Search: {search}
                  <button
                    onClick={() => {
                      setSearch('')
                      setSearchInput('')
                      setPage(1)
                    }}
                    className="ml-1 hover:text-error"
                  >
                    ×
                  </button>
                </span>
              )}

              {type !== 'All' && (
                <span className="badge badge-sm badge-outline gap-1">
                  Type: {type}
                  <button
                    onClick={() => handleTypeChange('All')}
                    className="ml-1 hover:text-error"
                  >
                    ×
                  </button>
                </span>
              )}

              <button
                onClick={() => {
                  setSearch('')
                  setSearchInput('')
                  setType('All')
                  setSortBy('dateAdded')
                  setSortOrder('desc')
                  setPage(1)
                }}
                className="text-xs text-brand-main hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-4"
        >
          <p className="text-sm text-base-content/70">
            {isLoading ? (
              'Loading assets...'
            ) : (
              <>
                Showing{' '}
                <span className="font-semibold text-brand-deep">
                  {assets.length}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-brand-deep">{total}</span>{' '}
                assets
              </>
            )}
          </p>
        </motion.div>

        {/* Error State */}
        {isError && (
          <div className="card-glass-brand p-8 text-center">
            <Package className="w-12 h-12 mx-auto text-error mb-3" />
            <p className="text-error font-medium">Failed to load assets</p>
            <p className="text-sm text-base-content/70 mt-1">
              {error?.message || 'Please try again later'}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Assets Grid */}
        {!isLoading && !isError && (
          <>
            {assets.length === 0 ? (
              <div className="card-glass-brand p-12 text-center">
                <Package className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                <h3 className="text-lg font-semibold text-brand-deep mb-2">
                  No Assets Found
                </h3>
                <p className="text-sm text-base-content/70 max-w-md mx-auto">
                  {search || type !== 'All'
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : 'There are no assets available at the moment. Check back later!'}
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
              >
                {assets.map((asset, index) => (
                  <AssetCard key={asset._id} asset={asset} index={index} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 mt-8"
              >
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="btn btn-sm btn-ghost"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`btn btn-sm ${
                          page === pageNum ? 'btn-primary' : 'btn-ghost'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="btn btn-sm btn-ghost"
                >
                  Next
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default PublicAssets
