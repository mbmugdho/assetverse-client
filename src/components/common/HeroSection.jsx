import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

// Adjust this path + filename to your actual illustration
import heroIllustration from '../../assets/illustrations/hero-office.svg'

const HeroSection = () => {
  return (
    <section className="bg-hero-surface">
      <div className="container-x py-16 md:py-24 lg:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Text & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Small badge */}
          <div className="badge-brand w-fit">
            <ShieldCheck className="w-4 h-4 text-brand-main" />
            <span>Modern HR & Asset Management</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-brand-deep">
            Control every{' '}
            <span className="text-gradient-hero">device, desk, and detail</span>{' '}
            from one place.
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-base-content/80 max-w-xl">
            AssetVerse brings HR, employees, and company assets onto a single,
            intuitive platform. Track assignments, approvals, and returns in
            real time—across every team and location.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="btn-gradient-primary flex items-center gap-2">
              Get started as HR
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="btn-gradient-outline flex items-center gap-2">
              Explore employee view
            </button>
          </div>

          {/* Supporting line */}
          <div className="flex flex-wrap items-center gap-4 pt-3 text-sm text-base-content/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-main" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent" />
              <span>Free for teams up to 5 employees</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Illustration / mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Background blob / card */}
          <div className="card-glass-brand p-4 md:p-6 lg:p-8 relative overflow-hidden">
            {/* Optional soft gradient overlay */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-brand-soft/40 blur-3xl" />

            <div className="relative">
              <img
                src={heroIllustration}
                alt="HR and asset management illustration"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
