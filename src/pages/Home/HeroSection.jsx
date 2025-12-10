import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'

// Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// Adjust these imports to match your actual illustration filenames
import heroHrDashboard from '../../assets/illustrations/hero-office.png'
import heroTeam from '../../assets/illustrations/team-collaboration.png'
import heroAssets from '../../assets/illustrations/office-management.png'
import heroSelection from '../../assets/illustrations/selection.png'
import heroResume from '../../assets/illustrations/resume.png'
import heroItAssets from '../../assets/illustrations/it-assets.png'

const slides = [
  {
    id: 1,
    image: heroHrDashboard,
    label: 'HR Control Center',
    description:
      'Approve requests, track packages, and manage teams in one dashboard.',
  },
  {
    id: 2,
    image: heroTeam,
    label: 'Engaged Teams',
    description:
      'Give employees clarity on every asset they own across companies.',
  },
  {
    id: 3,
    image: heroAssets,
    label: 'Every Asset Accounted For',
    description:
      "Laptops, chairs, monitors—see what's assigned and what's in stock.",
  },
  {
    id: 4,
    image: heroSelection,
    label: 'Smart Selection Process',
    description:
      'Streamline hiring and onboarding with clear steps from request to approval.',
  },
  {
    id: 5,
    image: heroResume,
    label: 'Unified Employee Profiles',
    description:
      'Keep resumes, roles, and asset history aligned in one clean profile view.',
  },
  {
    id: 6,
    image: heroItAssets,
    label: 'IT Asset Lifecycle',
    description:
      'Monitor every IT asset from purchase to return, with full assignment history.',
  },
]

const HeroSection = () => {
  return (
    <section className="">
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
            <span className="text-gradient-hero">device, desk, and detail </span> {' '}
            from one place.
          </h1>

          {/* Subtext */}
          <p className="text-brand-accent md:text-lg text-brand-accent max-w-xl">
            AssetVerse is a comprehensive digital platform that helps companies efficiently manage their physical assets (laptops, keyboards, chairs, etc.) and track which employee has which equipment. It solves the common problem of companies losing track of valuable assets and streamlines the entire asset management process.
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
          <div className="flex flex-wrap items-center gap-4 pt-3 text-sm text-brand-accent">
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

        {/* Right: Swiper with coverflow effect */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="card-glass-brand p-4 md:p-5 lg:p-6 relative overflow-visible max-w-md lg:max-w-lg w-full">
            {/* Soft glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-brand-soft/40 blur-3xl" />

            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 160,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="hero-swiper w-full"
            >
              {slides.map((slide) => (
                <SwiperSlide
                  key={slide.id}
                  className="!w-[260px] sm:!w-[320px] md:!w-[360px]"
                >
                  <div className="relative w-full h-[300px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-brand-soft/60 bg-white">
                    <img
                      src={slide.image}
                      alt={slide.label}
                      className="w-full h-full object-cover"
                    />
                    {/* Text overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 pb-4 pt-8">
                      <h3 className="text-sm font-semibold text-white mb-1">
                        {slide.label}
                      </h3>
                      <p className="text-[11px] md:text-xs leading-snug text-white/85">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
