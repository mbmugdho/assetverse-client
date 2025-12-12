import { motion } from 'framer-motion'
import {
  Laptop2,
  ClipboardList,
  RefreshCw,
  LineChart,
  Shield,
  Globe2,
} from 'lucide-react'

const features = [
  {
    icon: Laptop2,
    title: 'Multi-company asset view',
    description:
      'Employees see all assets assigned to them, even if they work with multiple companies.',
  },
  {
    icon: ClipboardList,
    title: 'Request & approval workflows',
    description:
      'Structured asset requests with HR approvals and automatic employee affiliation.',
  },
  {
    icon: RefreshCw,
    title: 'Returnable vs non-returnable',
    description:
      'Treat long-term assets differently from consumables with smart asset types.',
  },
  {
    icon: LineChart,
    title: 'Usage analytics',
    description:
      'See which assets are most requested and how inventory moves over time.',
  },
  {
    icon: Shield,
    title: 'Secure, role-based access',
    description:
      'JWT-secured APIs and HR/employee roles keep data isolated and auditable.',
  },
  {
    icon: Globe2,
    title: 'Remote-ready',
    description:
      'Track assets across cities and time zones without losing control over ownership.',
  },
]

const FeaturesSection = () => {
  return (
    <section className="py-5 md:py-5 ">
      <div className="container-x">
        <div className="max-w-2xl mb-10 md:mb-12">
          <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
            Product Features
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
            Everything you need to keep assets and people in sync.
          </h2>
          <p className="text-sm md:text-base text-base-content/80 mt-3">
            From onboarding kits to IT equipment, AssetVerse centralizes every
            movement so HR, IT, and employees always stay on the same page.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card-glass-brand p-4 md:p-5 flex flex-col gap-3 h-full"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft/70">
                <feature.icon className="w-5 h-5 text-brand-main" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-brand-deep">
                  {feature.title}
                </h3>
                <p className="text-xs text-base-content/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
