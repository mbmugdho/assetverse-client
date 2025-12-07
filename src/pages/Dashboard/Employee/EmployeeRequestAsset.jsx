import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Building2, TypeIcon } from 'lucide-react'

// Fake assets for UI
const mockAvailableAssets = [
  {
    id: 'a1',
    image:
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    name: 'MacBook Air 13"',
    type: 'Returnable',
    companyName: 'GreenFrame Studio',
    available: 3,
  },
  {
    id: 'a2',
    image:
      'https://images.pexels.com/photos/196649/pexels-photo-196649.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Noise-cancelling Headphones',
    type: 'Returnable',
    companyName: 'CloudNest Labs',
    available: 5,
  },
  {
    id: 'a3',
    image:
      'https://images.pexels.com/photos/37347/office-freelancer-computer-business-37347.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Standing Desk',
    type: 'Returnable',
    companyName: 'Northwind Collective',
    available: 1,
  },
  {
    id: 'a4',
    image:
      'https://images.pexels.com/photos/37347/office-freelancer-computer-business-37347.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Welcome Swag Kit',
    type: 'Non-returnable',
    companyName: 'GreenFrame Studio',
    available: 10,
  },
]

const EmployeeRequestAsset = () => {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [note, setNote] = useState('')

  const handleOpenRequest = asset => {
    setSelectedAsset(asset)
    setNote('')
    const dialog = document.getElementById('asset-request-modal')
    dialog?.showModal()
  }

  const handleCloseModal = () => {
    const dialog = document.getElementById('asset-request-modal')
    dialog?.close()
    setSelectedAsset(null)
  }

  const handleSubmitRequest = e => {
    e.preventDefault()
    // UI-only: log selection
    console.log('Requesting asset:', selectedAsset, 'Note:', note)
    handleCloseModal()
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
        <p className="text-xs text-base-content/60">
          Showing {mockAvailableAssets.length} available assets
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockAvailableAssets.map(asset => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3 }}
            className="card-glass-brand overflow-hidden flex flex-col"
          >
            <figure className="h-40 bg-base-200/60">
              <img
                src={asset.image}
                alt={asset.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-brand-deep">
                  {asset.name}
                </h3>
                <span className="badge badge-xs badge-outline border-brand-main/60 text-brand-main">
                  {asset.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-base-content/70">
                <Building2 className="w-3 h-3" />
                <span>{asset.companyName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-base-content/70">
                <Box className="w-3 h-3" />
                <span>Available: {asset.available}</span>
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
        ))}
      </div>

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
                Request: {selectedAsset.name}
              </h3>
              <p className="text-xs text-base-content/70 mb-3">
                Company: {selectedAsset.companyName} · Type:{' '}
                {selectedAsset.type}
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
                    onChange={e => setNote(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gradient-primary w-full text-sm"
                >
                  Submit request
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