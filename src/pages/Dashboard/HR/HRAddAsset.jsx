import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Image as ImageIcon, Hash } from 'lucide-react'

const HRAddAsset = () => {
  const [form, setForm] = useState({
    productName: '',
    productImage: '',
    productType: 'Returnable',
    productQuantity: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Add asset (UI only):', form)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl space-y-4"
    >
      <div>
        <h2 className="text-xl font-bold text-brand-deep">Add Asset</h2>
        <p className="text-sm text-base-content/70">
          Create a new asset by specifying name, image, type, and quantity.
        </p>
      </div>

      <div className="card-glass-brand p-5 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-medium text-brand-deep">
                Product name
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                <Box className="w-4 h-4" />
              </span>
              <input
                type="text"
                name="productName"
                required
                placeholder="MacBook Pro 16”"
                className="input input-bordered w-full pl-10"
                value={form.productName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm font-medium text-brand-deep">
                Product image URL
              </span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                <ImageIcon className="w-4 h-4" />
              </span>
              <input
                type="url"
                name="productImage"
                required
                placeholder="https://i.ibb.co/your-image.png"
                className="input input-bordered w-full pl-10"
                value={form.productImage}
                onChange={handleChange}
              />
            </div>
            <label className="label">
              <span className="label-text-alt text-xs text-base-content/60">
                Use ImgBB, Cloudinary, or any CDN-hosted image for the asset.
              </span>
            </label>
          </div>

          {/* Type + Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium text-brand-deep">
                  Product type
                </span>
              </label>
              <select
                name="productType"
                className="select select-bordered w-full"
                value={form.productType}
                onChange={handleChange}
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-medium text-brand-deep">
                  Quantity
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-base-content/50">
                  <Hash className="w-4 h-4" />
                </span>
                <input
                  type="number"
                  name="productQuantity"
                  required
                  min={1}
                  placeholder="10"
                  className="input input-bordered w-full pl-10"
                  value={form.productQuantity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-gradient-primary w-full text-sm mt-2"
          >
            Save asset
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default HRAddAsset
