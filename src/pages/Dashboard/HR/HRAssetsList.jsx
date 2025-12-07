import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package2, Edit3, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'

// Initial mock data for UI only
const initialAssets = [
  {
    id: '1',
    name: 'MacBook Pro 14"',
    type: 'Returnable',
    totalQuantity: 10,
    availableQuantity: 3,
    image:
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    dateAdded: '2025-01-10',
  },
  {
    id: '2',
    name: 'Ergonomic Chair',
    type: 'Returnable',
    totalQuantity: 20,
    availableQuantity: 12,
    image:
      'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400',
    dateAdded: '2025-01-05',
  },
  {
    id: '3',
    name: 'Mechanical Keyboard',
    type: 'Returnable',
    totalQuantity: 15,
    availableQuantity: 5,
    image:
      'https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=400',
    dateAdded: '2025-01-20',
  },
  {
    id: '4',
    name: 'Company Hoodie',
    type: 'Non-returnable',
    totalQuantity: 50,
    availableQuantity: 40,
    image:
      'https://images.pexels.com/photos/7671163/pexels-photo-7671163.jpeg?auto=compress&cs=tinysrgb&w=400',
    dateAdded: '2024-12-15',
  },
]

const HRAssetsList = () => {
  const [assets, setAssets] = useState(initialAssets)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'All' ? true : a.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [assets, search, typeFilter])

  const confirmDeleteAsset = async (asset) => {
    const result = await Swal.fire({
      title: 'Delete this asset?',
      html: `
        <div style="text-align:left;font-size:13px;line-height:1.4">
          <strong>${asset.name}</strong><br/>
          Type: ${asset.type}<br/>
          Total: ${asset.totalQuantity}, Available: ${asset.availableQuantity}<br/>
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
      // UI-only: remove from state
      setAssets((prev) => prev.filter((a) => a.id !== asset.id))

      await Swal.fire({
        title: 'Deleted',
        text: 'The asset has been removed from your list (UI only).',
        icon: 'success',
        timer: 1400,
        showConfirmButton: false,
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-brand-deep">Asset List</h2>
          <p className="text-sm text-base-content/70">
            Manage your company&apos;s asset inventory with search and basic
            filtering. Later, you&apos;ll add real pagination & editing.
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-sm">
                    No assets found.
                  </td>
                </tr>
              ) : (
                filtered.map((asset) => (
                  <tr key={asset.id} className="text-xs md:text-sm">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-xl">
                            <img src={asset.image} alt={asset.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-brand-deep">
                            {asset.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          asset.type === 'Returnable'
                            ? 'badge-outline border-brand-main text-brand-main'
                            : 'badge-outline border-base-300 text-base-content/70'
                        }`}
                      >
                        {asset.type}
                      </span>
                    </td>
                    <td>{asset.totalQuantity}</td>
                    <td>{asset.availableQuantity}</td>
                    <td>{asset.dateAdded}</td>
                    <td>
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs gap-1"
                          onClick={() =>
                            console.log('Edit asset (UI only):', asset)
                          }
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs gap-1 text-error"
                          onClick={() => confirmDeleteAsset(asset)}
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

        {/* Simple pagination UI (UI only) */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-base-200 text-xs text-base-content/70">
          <div className="flex items-center gap-1">
            <Package2 className="w-4 h-4 text-brand-main" />
            <span>{filtered.length} assets found</span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" className="btn btn-xs btn-ghost" disabled>
              Previous
            </button>
            <span>Page 1 of 1</span>
            <button type="button" className="btn btn-xs btn-ghost" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HRAssetsList
