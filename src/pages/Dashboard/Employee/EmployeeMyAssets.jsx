import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Printer, RotateCcw } from 'lucide-react'

// Fake data for UI only
const mockAssets = [
  {
    id: '1',
    image:
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    name: 'MacBook Pro 14"',
    type: 'Returnable',
    companyName: 'GreenFrame Studio',
    requestDate: '2025-02-01',
    approvalDate: '2025-02-03',
    status: 'Approved',
  },
  {
    id: '2',
    image:
      'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Ergonomic Chair',
    type: 'Returnable',
    companyName: 'CloudNest Labs',
    requestDate: '2025-01-20',
    approvalDate: '2025-01-22',
    status: 'Approved',
  },
  {
    id: '3',
    image:
      'https://images.pexels.com/photos/196659/pexels-photo-196659.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Mechanical Keyboard',
    type: 'Returnable',
    companyName: 'GreenFrame Studio',
    requestDate: '2025-02-05',
    approvalDate: null,
    status: 'Pending',
  },
  {
    id: '4',
    image:
      'https://images.pexels.com/photos/196649/pexels-photo-196649.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Company Hoodie',
    type: 'Non-returnable',
    companyName: 'Northwind Collective',
    requestDate: '2024-12-10',
    approvalDate: '2024-12-11',
    status: 'Approved',
  },
]

const EmployeeMyAssets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')

  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset) => {
      const matchesSearch = asset.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesType =
        filterType === 'All' ? true : asset.type === filterType
      return matchesSearch && matchesType
    })
  }, [searchTerm, filterType])

  const handleReturn = (id) => {
    // UI-only 
    console.log('return asset', id)
  }

  const handlePrint = () => {
    // Later: integrate react-to-print or jsPDF
    console.log('print assets')
  }

  const getStatusBadgeClass = (status) => {
    if (status === 'Approved') return 'badge-success'
    if (status === 'Pending') return 'badge-warning'
    if (status === 'Returned') return 'badge-ghost'
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="select select-sm select-bordered w-40"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
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
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="card-glass-brand p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra-zebra table-sm md:table-md">
            <thead>
              <tr className="text-xs md:text-sm">
                <th>Asset</th>
                <th>Type</th>
                <th>Company</th>
                <th>Requested</th>
                <th>Approved</th>
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
                filteredAssets.map((asset) => (
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
                    <td className="text-xs md:text-sm">{asset.companyName}</td>
                    <td>{asset.requestDate}</td>
                    <td>{asset.approvalDate || '—'}</td>
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
                        {asset.type === 'Returnable' &&
                          asset.status === 'Approved' && (
                            <button
                              type="button"
                              onClick={() => handleReturn(asset.id)}
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
      </div>
    </motion.div>
  )
}

export default EmployeeMyAssets
