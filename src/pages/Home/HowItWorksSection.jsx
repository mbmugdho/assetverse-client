import { motion } from 'framer-motion'
import { UserPlus2, ClipboardCheck, Laptop2 } from 'lucide-react'

const steps = [
  {
    icon: UserPlus2,
    title: 'HR & employees join',
    description:
      'HR sets up their company in minutes. Employees sign up once and can work with multiple companies.',
  },
  {
    icon: ClipboardCheck,
    title: 'Requests, approvals, & affiliations',
    description:
      'Employees request assets, HR approves, and AssetVerse auto-creates affiliations and assignments.',
  },
  {
    icon: Laptop2,
    title: 'Track, return, and report',
    description:
      'Monitor what’s assigned, what’s returned, and who is responsible — with analytics for HR leaders.',
  },
]

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-20 bg-section-soft2">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
            How It Works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
            Three simple steps from sign-up to full visibility.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="relative card-glass-brand p-5 flex flex-col gap-3 h-full"
            >
              <div className="absolute -top-3 left-4 w-7 h-7 rounded-full bg-brand-main text-white flex items-center justify-center text-xs font-semibold shadow-md">
                {index + 1}
              </div>
              <div className="pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-soft/80 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-brand-main" />
                </div>
                <h3 className="text-sm font-semibold text-brand-deep">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-base-content/80 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
