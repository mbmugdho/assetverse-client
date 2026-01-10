import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package2, Edit3, Trash2, ArrowUpDown } from 'lucide-react'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useHRAssets } from '../../../hooks/useHRAssets'
import { deleteAsset as deleteAssetApi } from '../../../services/assetService'
import { SkeletonTableRow } from '../../../components/common/Skeleton'

const HRAssetsList = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('dateAdded')
  const [sortOrder, setSortOrder] = useState('desc')
  const limit = 10

  const { data, isLoading, isError, error } = useHRAssets({
    page,
    limit,
    search,
    type: typeFilter,
  })

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteAssetApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hr-assets'] })
    },
  })

  const assets = data?.data || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1

  // Client-side sorting (you can move this to backend)
  const sortedAssets = [...assets].sort((a, b) => {
    let aVal, bVal
    switch (sortBy) {
      case 'name':
        aVal = a.productName?.toLowerCase() || ''
        bVal = b.productName?.toLowerCase() || ''
        break
      case 'quantity':
        aVal = a.productQuantity || 0
        bVal = b.productQuantity || 0
        break
      case 'available':
        aVal = a.availableQuantity || 0
        bVal = b.availableQuantity || 0
        break
      case 'dateAdded':
      default:
        aVal = new Date(a.dateAdded || 0)
        bVal = new Date(b.dateAdded || 0)
    }
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    }
    return aVal < bVal ? 1 : -1
  })

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
  }

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const confirmDeleteAsset = async (asset) => {
    const result = await Swal.fire({
      title: 'Delete this asset?',
      html: `
        <div style="text-align:left;font-size:13px;line-height:1.4">
          <strong>${asset.productName}</strong><br/>
          Type: ${asset.productType}<br/>
          Total: ${asset.productQuantity}, Available: ${asset.availableQuantity}
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280',
    })

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(asset._id)
        await Swal.fire({
          title: 'Deleted',
          text: 'The asset has been removed.',
          icon: 'success',
          timer: 1400,
          showConfirmButton: false,
        })
      } catch (err) {
        console.error(err)
        await Swal.fire({
          title: 'Error',
          text: err.response?.data?.message || 'Failed to delete asset',
          icon: 'error',
        })
      }
    }
  }

  const SortButton = ({ field, label }) => (
    <button
      type="button"
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-brand-main transition-colors"
    >
      {label}
      <ArrowUpDown className={`w-3 h-3 ${sortBy === field ? 'text-brand-main' : 'opacity-40'}`} />
    </button>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Asset List</h2>
          <p className="text-sm text-base-content/70">
            Manage your company's asset inventory with search, filter, and sort.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search assets"
              className="input input-sm input-bordered pl-9 w-48 md:w-60"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>
          
          {/* Type Filter */}
          <select
            className="select select-sm select-bordered w-36"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value)
              setPage(1)
            }}
          >
            <option value="All">All types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>

          {/* Sort Dropdown */}
          <select
            className="select select-sm select-bordered w-36"
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order)
            }}
          >
            <option value="dateAdded-desc">Newest first</option>
            <option value="dateAdded-asc">Oldest first</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="quantity-desc">Quantity ↓</option>
            <option value="quantity-asc">Quantity ↑</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="card-glass-brand p-6">
          <p className="text-sm text-error">
            Failed to load assets: {error?.message || 'Unknown error'}
          </p>
        </div>
      )}

      {/* Table */}
      {!isError && (
        <div className="card-glass-brand p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-sm md:table-md">
              <thead>
                <tr className="text-xs md:text-sm">
                  <th>
                    <SortButton field="name" label="Asset" />
                  </th>
                  <th>Type</th>
                  <th>
                    <SortButton field="quantity" label="Total" />
                  </th>
                  <th>
                    <SortButton field="available" label="Available" />
                  </th>
                  <th>
                    <SortButton field="dateAdded" label="Added" />
                  </th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Loading Skeleton */}
                {isLoading && (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <SkeletonTableRow key={i} columns={6} />
                    ))}
                  </>
                )}

                {/* Empty State */}
                {!isLoading && sortedAssets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <Package2 className="w-12 h-12 mx-auto text-base-content/30 mb-3" />
                      <p className="text-sm text-base-content/70">
                        No assets found matching your criteria.
                      </p>
                    </td>
                  </tr>
                )}

                {/* Data Rows */}
                {!isLoading &&
                  sortedAssets.map((asset) => (
                    <motion.tr
                      key={asset._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs md:text-sm hover:bg-base-200/50 transition-colors"
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-base-200">
                              <img
                                src={asset.productImage}
                                alt={asset.productName}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-brand-deep">
                              {asset.productName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            asset.productType === 'Returnable'
                              ? 'badge-outline border-brand-main text-brand-main'
                              : 'badge-outline border-base-300 text-base-content/70'
                          }`}
                        >
                          {asset.productType}
                        </span>
                      </td>
                      <td className="font-medium">{asset.productQuantity}</td>
                      <td>
                        <span
                          className={`font-medium ${
                            asset.availableQuantity === 0
                              ? 'text-error'
                              : asset.availableQuantity < 3
                              ? 'text-warning'
                              : 'text-success'
                          }`}
                        >
                          {asset.availableQuantity}
                        </span>
                      </td>
                      <td className="text-base-content/70">
                        {asset.dateAdded
                          ? new Date(asset.dateAdded).toLocaleDateString()
                          : '—'}
                      </td>
                      <td>
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-xs gap-1 text-error"
                            onClick={() => confirmDeleteAsset(asset)}
                            disabled={deleteMutation.isLoading}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-base-200 text-xs text-base-content/70">
            <div className="flex items-center gap-1">
              <Package2 className="w-4 h-4 text-brand-main" />
              <span>
                {total} assets · Page {page} of {totalPages}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="btn btn-xs btn-ghost"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              <div className="hidden sm:flex items-center gap-1">
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
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`btn btn-xs ${
                        page === pageNum
                          ? 'btn-primary'
                          : 'btn-ghost'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              
              <button
                type="button"
                className="btn btn-xs btn-ghost"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default HRAssetsList