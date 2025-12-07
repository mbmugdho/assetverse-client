import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

import logo1 from '../../assets/logos/logo1.png'
import logo2 from '../../assets/logos/logo2.png'
import logo3 from '../../assets/logos/logo3.png'
import logo4 from '../../assets/logos/logo4.png'
import logo5 from '../../assets/logos/logo5.png'
import logo6 from '../../assets/logos/logo6.png'

const stats = [
  { label: 'Companies onboarded', value: '100+' },
  { label: 'Assets tracked', value: '5,000+' },
  { label: 'Average setup time', value: '< 1 hour' },
]

const testimonials = [
  {
    quote:
      'AssetVerse gave us instant visibility into every laptop and monitor. Onboarding went from chaos to a 30-minute checklist.',
    name: 'Jordan Patel',
    role: 'People Operations Lead',
    company: 'GreenFrame Studio',
    logo: logo1,
  },
  {
    quote:
      'Our HR team no longer chases spreadsheets. Approvals, employees, and packages live in one clean dashboard.',
    name: 'Amira Hassan',
    role: 'HR Manager',
    company: 'CloudNest Labs',
    logo: logo2,
  },
  {
    quote:
      'Employees love seeing all their assets in one view, even when they work across multiple client companies.',
    name: 'Leon Fischer',
    role: 'Talent Partner',
    company: 'Northwind Collective',
    logo: logo3,
  },
]

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6]

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-section-soft">
      <div className="container-x space-y-10 md:space-y-12">
        {/* Top heading + logo strip */}
        <div className="space-y-4">
          <div className="text-center md:text-left max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
              Trusted by modern teams
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
              HR, IT, and employees actually enjoy using AssetVerse.
            </h2>
            <p className="text-sm md:text-base text-base-content/80 mt-3">
              Replace scattered spreadsheets and manual checklists with a
              platform that gives you audit-ready history for every asset and
              every person.
            </p>
          </div>

          <div className="mt-4">
            <p className="text-xs text-base-content/60 mb-2">
              Companies that trust platforms like AssetVerse:
            </p>
            <div className="card-glass-brand px-4 py-3">
              <div className="flex flex-wrap items-center justify-center md:justify-between gap-4">
                {clientLogos.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`Client logo ${idx + 1}`}
                    className="h-7 md:h-8 object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="card-glass-brand py-5 px-5 text-center md:text-left"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-base-content/60">
                {item.label}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-brand-deep mt-1">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="card-glass-brand p-4 flex flex-col gap-3 h-full"
            >
              <Quote className="w-5 h-5 text-brand-main" />
              <p className="text-xs text-base-content/80 leading-relaxed">
                “{t.quote}”
              </p>
              <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <p className="font-semibold text-brand-deep">{t.name}</p>
                  <p className="text-[11px] text-base-content/60">{t.role}</p>
                  <p className="text-[11px] text-base-content/60 mt-0.5">
                    {t.company}
                  </p>
                </div>
                {t.logo && (
                  <img
                    src={t.logo}
                    alt={t.company}
                    className="h-6 object-contain opacity-90"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
