import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Server, Clock4 } from 'lucide-react'

const SecuritySection = () => {
  return (
    <section className="py-16 md:py-20 ">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
              Security & reliability
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
              Enterprise-grade protection for every asset record.
            </h2>
            <p className="text-sm md:text-base text-base-content/80 mt-3 max-w-xl">
              AssetVerse is designed with modern security and access control in
              mind—so HR, IT, and employees can work faster without sacrificing
              safety or compliance.
            </p>
          </motion.div>

          {/* Right: small security highlights */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="card-glass-brand p-4 flex gap-3 items-start">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft/80">
                <ShieldCheck className="w-5 h-5 text-brand-main" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-deep">
                  Role-based access
                </h3>
                <p className="text-xs text-base-content/80 mt-1">
                  Distinct HR and employee views, secured by JWT and checked on
                  every request.
                </p>
              </div>
            </div>

            <div className="card-glass-brand p-4 flex gap-3 items-start">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft/80">
                <Lock className="w-5 h-5 text-brand-main" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-deep">
                  Safe authentication
                </h3>
                <p className="text-xs text-base-content/80 mt-1">
                  Firebase-backed login with optional Google sign-in and secure
                  token storage.
                </p>
              </div>
            </div>

            <div className="card-glass-brand p-4 flex gap-3 items-start">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft/80">
                <Server className="w-5 h-5 text-brand-main" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-deep">
                  Reliable APIs
                </h3>
                <p className="text-xs text-base-content/80 mt-1">
                  Structured REST APIs with validation, error handling, and
                  production-ready deployment.
                </p>
              </div>
            </div>

            <div className="card-glass-brand p-4 flex gap-3 items-start">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft/80">
                <Clock4 className="w-5 h-5 text-brand-main" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-deep">
                  Audit-friendly history
                </h3>
                <p className="text-xs text-base-content/80 mt-1">
                  Requests, approvals, and assignments are tracked with dates
                  and statuses for full visibility.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection