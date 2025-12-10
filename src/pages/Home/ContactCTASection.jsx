import { Mail, Phone } from 'lucide-react'

const ContactCTASection = () => {
  return (
    <section className=" py-8 md:py-12">
      <div className="container-x">
        <div className="card-glass-brand px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-s uppercase tracking-[0.18em] text-brand-main font-semibold">
              Ready to get started?
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-brand-deep mt-2 mb-2">
              See AssetVerse in action with your own data.
            </h2>
            <p className="text-sm md:text-base text-base-content/80 max-w-xl">
              Book a walkthrough or send us a quick note. We'll help you model
              your teams, assets, and packages in under an hour.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="btn-gradient-primary flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
              <Mail className="w-4 h-4" />
              Contact sales
            </button>
            <button className="btn-gradient-outline flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
              <Phone className="w-4 h-4" />
              Talk to our team
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTASection
