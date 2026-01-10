import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Target,
  Eye,
  Heart,
  Users,
  Shield,
  Zap,
  Award,
  ArrowRight,
  CheckCircle,
  Building2,
  Globe2,
} from 'lucide-react'

const stats = [
  { label: 'Companies Trust Us', value: '100+' },
  { label: 'Assets Tracked', value: '5,000+' },
  { label: 'Team Members', value: '25+' },
  { label: 'Countries Served', value: '12+' },
]

const values = [
  {
    icon: Shield,
    title: 'Security First',
    description:
      'Your data security is our top priority. We use enterprise-grade encryption and follow industry best practices.',
  },
  {
    icon: Zap,
    title: 'Simplicity',
    description:
      'Complex asset management made simple. Our intuitive interface requires minimal training.',
  },
  {
    icon: Heart,
    title: 'Customer Focus',
    description:
      'We build features based on real customer feedback. Your success is our success.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'Designed for teams to work together seamlessly across departments and locations.',
  },
]

const team = [
  {
    name: 'Md Montasir Billah',
    role: 'CEO & Co-Founder',
    image:
      'https://ik.imagekit.io/azfnpskmy/profile.jpg?updatedAt=1767465202030',
    bio: 'Former HR Director at Fortune 500. 15+ years in workforce management.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-Founder',
    image: 'https://i.pravatar.cc/300?img=3',
    bio: 'Ex-Google engineer. Expert in scalable cloud architecture.',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Product',
    image: 'https://i.pravatar.cc/300?img=5',
    bio: 'Product leader with 10+ years building enterprise SaaS solutions.',
  },
  {
    name: 'David Kim',
    role: 'Head of Customer Success',
    image: 'https://i.pravatar.cc/300?img=8',
    bio: 'Passionate about helping customers achieve their goals.',
  },
]

const milestones = [
  {
    year: '2020',
    title: 'Founded',
    description:
      'AssetVerse was born from a simple idea: make asset tracking effortless.',
  },
  {
    year: '2021',
    title: 'First 50 Customers',
    description:
      'Reached our first major milestone with companies across 5 countries.',
  },
  {
    year: '2022',
    title: 'Series A Funding',
    description:
      'Raised $5M to expand our team and accelerate product development.',
  },
  {
    year: '2023',
    title: 'Global Expansion',
    description: 'Now serving companies in 12+ countries with 24/7 support.',
  },
]

const About = () => {
  return (
    <div className="bg-section-soft min-h-screen">
      {/* Hero Section */}
      <section className="container-x py-12 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
            About AssetVerse
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-deep mt-3">
            We're on a mission to{' '}
            <span className="text-gradient-hero">
              simplify asset management
            </span>
          </h1>
          <p className="text-base md:text-lg text-base-content/70 mt-4 max-w-2xl mx-auto">
            AssetVerse helps HR, IT, and operations teams track every laptop,
            chair, and credential — across multiple companies and teams — with
            clear, auditable workflows.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="card-glass-brand p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-brand-deep">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-base-content/70 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className=" py-12 md:py-16">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass-brand p-6 md:p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-soft/70 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-brand-main" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-deep mb-3">
                Our Mission
              </h2>
              <p className="text-sm md:text-base text-base-content/70 leading-relaxed">
                To empower organizations of all sizes with intuitive, powerful
                tools that bring clarity and control to asset management. We
                believe every company deserves to know exactly where their
                assets are and who's using them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-glass-brand p-6 md:p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-soft/70 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-brand-main" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-brand-deep mb-3">
                Our Vision
              </h2>
              <p className="text-sm md:text-base text-base-content/70 leading-relaxed">
                A world where asset management is effortless, transparent, and
                accessible to every organization. We envision a future where HR,
                IT, and finance teams collaborate seamlessly with real-time
                visibility into every asset.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container-x py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
            What Drives Us
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
            Our Core Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glass-brand p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-brand-soft/70 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-5 h-5 text-brand-main" />
              </div>
              <h3 className="text-base font-semibold text-brand-deep mb-2">
                {value.title}
              </h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className=" py-12 md:py-16">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
              Our Journey
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
              The AssetVerse Story
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 mb-6 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12  rounded-2xl bg-brand-main text-white flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-brand-main/30 mt-2" />
                  )}
                </div>
                <div className="card-glass-brand p-4 flex-1">
                  <h3 className="font-semibold text-brand-deep">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-x py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
            Meet The Team
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-deep mt-2">
            The People Behind AssetVerse
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glass-brand p-5 text-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-brand-main/30">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base font-semibold text-brand-deep">
                {member.name}
              </h3>
              <p className="text-xs text-brand-main font-medium mt-1">
                {member.role}
              </p>
              <p className="text-xs text-base-content/70 mt-2 leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass-brand p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <Award className="w-12 h-12 text-brand-main mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-bold text-brand-deep mb-3">
              Ready to Transform Your Asset Management?
            </h2>
            <p className="text-sm text-base-content/70 mb-6 max-w-lg mx-auto">
              Join hundreds of companies who trust AssetVerse to manage their
              assets efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/register/hr"
                className="btn-gradient-primary inline-flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-gradient-outline inline-flex items-center justify-center gap-2"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
