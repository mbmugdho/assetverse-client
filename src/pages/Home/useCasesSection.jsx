import { motion } from 'framer-motion'
import { UserCog, MonitorSmartphone, FileText } from 'lucide-react'

const useCases = [
  {
    icon: UserCog,
    title: 'For HR managers',
    description:
      'Onboard and offboard with confidence. See which employee has which device and approve asset requests in a few clicks.',
  },
  {
    icon: MonitorSmartphone,
    title: 'For IT & operations',
    description:
      'Track every laptop, monitor, and peripheral across locations. Handle returns and replacements without losing inventory.',
  },
  {
    icon: FileText,
    title: 'For finance & compliance',
    description:
      'Keep a clean asset register with full assignment history, ready for audits, budgeting, and end‑of‑year reporting.',
  },
]

const useCasesSection = () => {
  return (
    <section className="py-5 md:py-5">
      <div className="container-x">
        <div className="max-w-2xl mb-10 md:mb-12">
          <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
            Solutions by role
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
            Built for HR, IT, and finance to work together.
          </h2>
          <p className="text-sm md:text-base text-base-content/80 mt-3">
            AssetVerse connects people and equipment, so each team sees exactly
            what they need—without messy spreadsheets or email chains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {useCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="card-glass-brand p-4 md:p-5 flex flex-col gap-3 h-full"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft/70">
                <item.icon className="w-5 h-5 text-brand-main" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-brand-deep">
                  {item.title}
                </h3>
                <p className="text-xs text-base-content/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default useCasesSection