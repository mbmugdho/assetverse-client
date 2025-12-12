import { motion } from 'framer-motion'
import { XCircle, CheckCircle2 } from 'lucide-react'

const ComparisonSection = () => {
  return (
    <section className="py-5 md:py-5">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
            Before & after AssetVerse
          </p>
          <h2 className="text-4xl md:text-4xl font-bold text-brand-deep mt-2">
            Move from scattered spreadsheets to a single source of truth.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {/* Old way */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="card-glass-brand p-5 md:p-6 h-full border border-base-300/80"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-brand-deep">
                Spreadsheets & guesswork
              </h3>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-base-content/80">
              <li>• Hard to see which employee currently has which asset.</li>
              <li>• No single place for requests, approvals, and returns.</li>
              <li>• Manual updates, conflicting versions, and hidden errors.</li>
              <li>• Stressful offboarding and end‑of‑year inventory checks.</li>
            </ul>
          </motion.div>

          {/* New way */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="card-glass-brand p-5 md:p-6 h-full border border-brand-main/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-soft/80">
                <CheckCircle2 className="w-4 h-4 text-brand-main" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-brand-deep">
                AssetVerse way
              </h3>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-base-content/80">
              <li>• Centralized inventory with live available quantities.</li>
              <li>• Clear request and approval flow with auto‑affiliation.</li>
              <li>• Every assignment and return tracked with timestamps.</li>
              <li>• Ready for audits, onboarding, and rapid team growth.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ComparisonSection