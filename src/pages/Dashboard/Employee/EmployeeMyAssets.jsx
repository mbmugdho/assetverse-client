import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Printer, RotateCcw } from 'lucide-react'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEmployeeAssets } from '../../../hooks/useEmployeeAssets'
import { returnAssignedAsset } from '../../../services/assignedAssetService'
import { useAuth } from '../../../context/AuthContext'
import logo from '../../../assets/logos/logo.png'

const EmployeeMyAssets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')

  const { data, isLoading, isError, error } = useEmployeeAssets()
  const assets = data || []

  const queryClient = useQueryClient()
  const { backendUser } = useAuth()

  const returnMutation = useMutation({
    mutationFn: returnAssignedAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-assets'] })
    },
  })

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = asset.assetName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType =
        filterType === 'All' ? true : asset.assetType === filterType
      return matchesSearch && matchesType
    })
  }, [assets, searchTerm, filterType])

  const handleReturn = async id => {
    const result = await Swal.fire({
      title: 'Return this asset?',
      text: 'This will mark the asset as returned and update inventory.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Return',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#337B01',
      cancelButtonColor: '#6b7280',
      background: '#ffffff',
    })

    if (result.isConfirmed) {
      try {
        await returnMutation.mutateAsync(id)
        await Swal.fire({
          title: 'Returned',
          text: 'The asset has been marked as returned.',
          icon: 'success',
          timer: 1400,
          showConfirmButton: false,
        })
      } catch (err) {
        console.error(err)
        await Swal.fire({
          title: 'Error',
          text: err.response?.data?.message || 'Failed to return asset',
          icon: 'error',
        })
      }
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const getStatusBadgeClass = status => {
    if (status === 'assigned') return 'badge-success'
    if (status === 'returned') return 'badge-ghost'
    return 'badge-ghost'
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
          <h2 className="text-xl font-bold text-brand-deep">My Assets</h2>
          <p className="text-sm text-base-content/70">
            All hardware and equipment currently or previously assigned to you.
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
              placeholder="Search by asset name"
              className="input input-sm input-bordered pl-9 w-52"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="select select-sm select-bordered w-40"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="All">All types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-sm btn-ghost gap-2"
            disabled={isLoading || isError || filteredAssets.length === 0}
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
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
        <div className="card-glass-brand p-0 overflow-hidden print-area">
          {/* Printable header with branding */}
          <div className="px-4 pt-4 pb-2 border-b border-base-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="AssetVerse"
                className="w-8 h-8 rounded-md object-contain"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
                Asset assignment report
              </p>
              <p className="text-sm font-semibold text-brand-deep">
                {backendUser?.name || 'Employee'}
              </p>
              <p className="text-[11px] text-base-content/60">
                {backendUser?.email || 'user@example.com'}
              </p>
            </div>
            <div className="text-[11px] text-base-content/60">
              <p>Generated on {new Date().toLocaleDateString()}</p>
              <p className="mt-1 italic">
                For internal use. Verified by AssetVerse.
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table table-zebra-zebra table-sm md:table-md">
              <thead>
                <tr className="text-xs md:text-sm">
                  <th>Asset</th>
                  <th>Type</th>
                  <th>Company</th>
                  <th>Assigned</th>
                  <th>Returned</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-sm">
                      No assets found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map(asset => (
                    <tr key={asset._id} className="text-xs md:text-sm">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 h-10 rounded-xl">
                              <img
                                src={asset.assetImage}
                                alt={asset.assetName}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-brand-deep">
                              {asset.assetName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            asset.assetType === 'Returnable'
                              ? 'badge-outline border-brand-main text-brand-main'
                              : 'badge-outline border-base-300 text-base-content/70'
                          }`}
                        >
                          {asset.assetType}
                        </span>
                      </td>
                      <td>{asset.companyName}</td>
                      <td>
                        {asset.assignmentDate
                          ? new Date(asset.assignmentDate).toLocaleDateString()
                          : '—'}
                      </td>
                      <td>
                        {asset.returnDate
                          ? new Date(asset.returnDate).toLocaleDateString()
                          : '—'}
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${getStatusBadgeClass(
                            asset.status
                          )}`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end">
                          {asset.assetType === 'Returnable' &&
                            asset.status === 'assigned' && (
                              <button
                                type="button"
                                onClick={() => handleReturn(asset._id)}
                                disabled={returnMutation.isLoading}
                                className="btn btn-ghost btn-xs gap-1"
                              >
                                <RotateCcw className="w-3 h-3" />
                                Return
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer for signature */}
          <div className="px-4 py-3 border-t border-base-200 text-[11px] text-base-content/60">
            <p>Signature (HR / Manager): _____________________________</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default EmployeeMyAssets