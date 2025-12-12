import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package2, Edit3, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useHRAssets } from '../../../hooks/useHRAssets'
import { deleteAsset as deleteAssetApi } from '../../../services/assetService'

const HRAssetsList = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
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

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
  }

  const confirmDeleteAsset = async (asset) => {
    const result = await Swal.fire({
      title: 'Delete this asset?',
      html: `
        <div style="text-align:left;font-size:13px;line-height:1.4">
          <strong>${asset.productName}</strong><br/>
          Type: ${asset.productType}<br/>
          Total: ${asset.productQuantity}, Available: ${asset.availableQuantity}<br/>
          <small style="color:#6b7280">
            In the real app, make sure there are no active assignments before deleting.
          </small>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      confirmButtonColor: '#e11d48', // red
      cancelButtonColor: '#6b7280',
      background: '#ffffff',
    })

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(asset._id)
        await Swal.fire({
          title: 'Deleted',
          text: 'The asset has been removed from your list.',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Asset List</h2>
          <p className="text-sm text-base-content/70">
            Manage your company's asset inventory with search and
            pagination.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
          <select
            className="select select-sm select-bordered w-40"
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
        </div>
      </div>

      {/* Loading / error handle */}
      {isLoading && (
        <div className="card-glass-brand p-6 text-sm text-base-content/70">
          Loading assets...
        </div>
      )}

      {isError && (
        <div className="card-glass-brand p-6 text-sm text-error">
          Failed to load assets: {error?.message || 'Unknown error'}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="card-glass-brand p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-sm md:table-md">
                <thead>
                  <tr className="text-xs md:text-sm">
                    <th>Asset</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Available</th>
                    <th>Added</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-sm">
                        No assets found.
                      </td>
                    </tr>
                  ) : (
                    assets.map((asset) => (
                      <tr key={asset._id} className="text-xs md:text-sm">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-10 h-10 rounded-xl">
                                <img
                                  src={asset.productImage}
                                  alt={asset.productName}
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
                        <td>{asset.productQuantity}</td>
                        <td>{asset.availableQuantity}</td>
                        <td>
                          {asset.dateAdded
                            ? new Date(asset.dateAdded).toLocaleDateString()
                            : '—'}
                        </td>
                        <td>
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              className="btn btn-ghost btn-xs gap-1"
                              onClick={() =>
                                console.log('Edit asset (to implement):', asset)
                              }
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
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
                <span>
                  {page} / {totalPages}
                </span>
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
        </>
      )}
    </motion.div>
  )
}

export default HRAssetsList
