import { motion } from 'framer-motion'
import { Users, Crown, Sparkles } from 'lucide-react'

const packages = [
  {
    name: 'Basic',
    employeeLimit: 5,
    price: 5,
    features: ['Asset Tracking', 'Employee Management', 'Basic Support'],
    icon: Users,
    highlight: 'Perfect for startups',
    isPopular: false,
  },
  {
    name: 'Standard',
    employeeLimit: 10,
    price: 8,
    features: ['All Basic features', 'Advanced Analytics', 'Priority Support'],
    icon: Sparkles,
    highlight: 'Most popular for growing teams',
    isPopular: true,
  },
  {
    name: 'Premium',
    employeeLimit: 20,
    price: 15,
    features: ['All Standard features', 'Custom Branding', '24/7 Support'],
    icon: Crown,
    highlight: 'For multi-location enterprises',
    isPopular: false,
  },
]

const PackagesSection = () => {
  return (
    <section className="py-8 md:py-8 ">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
            Pricing & Packages
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
            Scale from 5 to 20 employees without changing tools.
          </h2>
          <p className="text-sm md:text-base text-base-content/80 mt-3">
            Start free with the Basic package, then upgrade in a few clicks as
            your team and asset inventory grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`relative card-glass-brand card-glass-brand-hover  flex flex-col ${
                pkg.isPopular
                  ? 'border-brand-main shadow-lg shadow-brand-main/15'
                  : ''
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-section-soft2 rounded-full text-xs px-4 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-5 md:p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-deep">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-base-content/70 mt-1">
                      {pkg.highlight}
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-soft/70">
                    <pkg.icon className="w-5 h-5 text-brand-main" />
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-brand-deep">
                    ${pkg.price}
                  </span>
                  <span className="text-xs text-base-content/70 ml-1">
                    / employee / month
                  </span>
                </div>

                <div className="mb-4 text-sm text-base-content/80">
                  Up to{' '}
                  <span className="font-semibold text-brand-main">
                    {pkg.employeeLimit} employees
                  </span>{' '}
                  per company.
                </div>

                <ul className="space-y-2 text-sm text-base-content/80 flex-1 mb-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-main" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`mt-auto w-full text-sm font-semibold py-2.5 rounded-full border transition-all ${
                    pkg.isPopular
                      ? 'btn-gradient-primary border-transparent'
                      : 'btn-gradient-outline border-brand-main/40'
                  }`}
                >
                  Choose {pkg.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PackagesSection
