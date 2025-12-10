import { motion } from 'framer-motion'
import { ShieldCheck, Users, Clock3 } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Zero asset blind spots',
    description:
      'Know exactly who has which laptop, monitor, or chair — across every department and office.',
  },
  {
    icon: Users,
    title: 'HR & employees aligned',
    description:
      'HR, managers, and employees share a single source of truth for asset requests and approvals.',
  },
  {
    icon: Clock3,
    title: 'Faster onboarding & offboarding',
    description:
      'Turn chaotic handovers into predictable, auditable workflows for new hires and exits.',
  },
]

const AboutSection = () => {
  return (
    <section className="">
      <div className="container-x py-14 md:py-18 lg:py-20 grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
            Why AssetVerse
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-deep">
            Designed for HR teams that never want to lose{' '}
            <span className="text-gradient-hero">another asset</span>.
          </h2>
          <p className="text-base text-brand-main max-w-2xl">
            AssetVerse brings together HR, IT, and finance into a single,
            asset-aware workspace. From the first laptop request to the last day
            at work, every step is visible, traceable, and secure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {benefits.map((item) => (
            <div
              key={item.title}
              className="card-glass-brand p-4 flex flex-col gap-3 h-full"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft/70">
                <item.icon className="w-5 h-5 text-brand-main" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-brand-deep">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-main leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
