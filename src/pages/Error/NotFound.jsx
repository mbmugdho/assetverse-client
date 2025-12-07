import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import notFoundIllustration from '../../assets/illustrations/not-found.png'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <section className="bg-base-100">
      <div className="container-x py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <img
                src={notFoundIllustration}
                alt="Page not found illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Text + button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="space-y-4"
          >
            <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
              404 • Page not found
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-deep">
              Looks like this asset has gone off the grid.
            </h1>
            <p className="text-sm md:text-base text-base-content/80 max-w-md">
              The page you're looking for doesn't exist, has moved, or is
              temporarily unavailable. Let's take you back to where you were.
            </p>

            <button
              type="button"
              onClick={handleGoBack}
              className="btn-gradient-primary inline-flex items-center gap-2 mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFound