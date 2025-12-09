import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Building2, TypeIcon } from 'lucide-react'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAvailableAssets } from '../../../hooks/useAvailableAssets'
import { createRequest } from '../../../services/requestService'

const EmployeeRequestAsset = () => {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [note, setNote] = useState('')

  const { data, isLoading, isError, error } = useAvailableAssets({
    search,
    type: typeFilter,
  })

  const availableAssets = data || []

  const queryClient = useQueryClient()

  const requestMutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['available-assets'] })
    },
  })

  const handleOpenRequest = (asset) => {
    setSelectedAsset(asset)
    setNote('')
    const dialog = document.getElementById('asset-request-modal')
    dialog?.showModal()
  }

  const handleCloseModal = () => {
    const dialog = document.getElementById('asset-request-modal')
    dialog?.close()
    setSelectedAsset(null)
    setNote('')
  }

  const handleSubmitRequest = async (e) => {
    e.preventDefault()
    if (!selectedAsset) return

    try {
      await requestMutation.mutateAsync({
        assetId: selectedAsset._id,
        note,
      })

      await Swal.fire({
        title: 'Request submitted',
        text: 'Your asset request has been created and is pending HR approval.',
        icon: 'success',
        timer: 1600,
        showConfirmButton: false,
      })

      handleCloseModal()
    } catch (err) {
      console.error(err)
      await Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to submit request',
        icon: 'error',
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Request Asset</h2>
          <p className="text-sm text-base-content/70">
            Browse available assets across your affiliated companies and submit
            a request.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search assets"
            className="input input-sm input-bordered w-44 md:w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-sm select-bordered w-40"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="card-glass-brand p-6 text-sm text-base-content/70">
          Loading available assets...
        </div>
      )}

      {isError && (
        <div className="card-glass-brand p-6 text-sm text-error">
          Failed to load assets: {error?.message || 'Unknown error'}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {availableAssets.length === 0 ? (
            <p className="text-sm text-base-content/70">
              No assets currently available for request.
            </p>
          ) : (
            availableAssets.map((asset) => (
              <motion.div
                key={asset._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3 }}
                className="card-glass-brand overflow-hidden flex flex-col"
              >
                <figure className="h-40 bg-base-200/60">
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-brand-deep">
                      {asset.productName}
                    </h3>
                    <span className="badge badge-xs badge-outline border-brand-main/60 text-brand-main">
                      {asset.productType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-base-content/70">
                    <Building2 className="w-3 h-3" />
                    <span>{asset.companyName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-base-content/70">
                    <Box className="w-3 h-3" />
                    <span>Available: {asset.availableQuantity}</span>
                  </div>
                  <div className="mt-auto pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenRequest(asset)}
                      className="btn-gradient-primary w-full flex items-center justify-center gap-2 text-xs"
                    >
                      <TypeIcon className="w-4 h-4" />
                      Request this asset
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Request modal */}
      <dialog id="asset-request-modal" className="modal">
        <div className="modal-box max-w-md bg-base-100">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </form>
          {selectedAsset && (
            <>
              <h3 className="font-semibold text-brand-deep mb-2">
                Request: {selectedAsset.productName}
              </h3>
              <p className="text-xs text-base-content/70 mb-3">
                Company: {selectedAsset.companyName} · Type:{' '}
                {selectedAsset.productType}
              </p>
              <form onSubmit={handleSubmitRequest} className="space-y-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-sm font-medium text-brand-deep">
                      Note to HR (optional)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered text-sm"
                    rows={3}
                    placeholder="E.g., Needed for remote work, design work, etc."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gradient-primary w-full text-sm"
                  disabled={requestMutation.isLoading}
                >
                  {requestMutation.isLoading
                    ? 'Submitting...'
                    : 'Submit request'}
                </button>
              </form>
            </>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </motion.div>
  )
}

export default EmployeeRequestAsset
