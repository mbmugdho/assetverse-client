import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Image as ImageIcon, Hash } from 'lucide-react'
import Swal from 'sweetalert2'
import apiClient from '../../../services/apiClient'

const HRAddAsset = () => {
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    const form = e.target
    const productName = form.productName.value
    const productImage = form.productImage.value
    const productType = form.productType.value
    const productQuantity = form.productQuantity.value

    try {
      setFormLoading(true)
      const quantityNum = Number(productQuantity)

      if (!productName || !productImage || !productType || !productQuantity) {
        setError('All fields are required.')
        setFormLoading(false)
        return
      }

      if (Number.isNaN(quantityNum) || quantityNum <= 0) {
        setError('Quantity must be a positive number.')
        setFormLoading(false)
        return
      }

      // Call backend
      await apiClient.post('/assets', {
        productName,
        productImage,
        productType, // "Returnable" | "Non-returnable"
        productQuantity: quantityNum,
      })

      await Swal.fire({
        title: 'Asset created',
        text: 'The asset has been added to your inventory.',
        icon: 'success',
        timer: 1400,
        showConfirmButton: false,
      })

      // Reset form
      form.reset()
    } catch (err) {
      console.error(err)
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to create asset'

      setError(msg)

      await Swal.fire({
        title: 'Error',
        text: msg,
        icon: 'error',
      })
    } finally {
      setFormLoading(false)
    }
  }

  const disabled = formLoading

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
              />
            </div>
            <label className="label">
              <span className="label-text-alt text-xs text-base-content/60">
                Use ImgBB, Cloudinary, or any CDN-hosted image URL.
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
                defaultValue="Returnable"
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
                  min={1}
                  required
                  placeholder="10"
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs text-error mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={disabled}
            className="btn-gradient-primary w-full text-sm mt-2 disabled:opacity-60"
          >
            {disabled ? 'Saving asset...' : 'Save asset'}
          </button>
        </form>
      </div>
    </motion.div>
  )
}

export default HRAddAsset