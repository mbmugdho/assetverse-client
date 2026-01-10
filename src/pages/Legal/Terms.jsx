import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FileText,
  Shield,
  Lock,
  Eye,
  Server,
  Mail,
  ArrowLeft,
  Calendar,
} from 'lucide-react'

const lastUpdated = 'January 15, 2024'

const sections = [
  {
    id: 'terms',
    icon: FileText,
    title: 'Terms of Service',
    content: [
      {
        heading: '1. Acceptance of Terms',
        text: 'By accessing and using AssetVerse, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.',
      },
      {
        heading: '2. Description of Service',
        text: 'AssetVerse provides a cloud-based asset management platform that allows organizations to track, manage, and monitor their physical and digital assets. The service includes features for asset tracking, employee management, request workflows, and reporting.',
      },
      {
        heading: '3. User Accounts',
        text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.',
      },
      {
        heading: '4. Acceptable Use',
        text: "You agree to use the service only for lawful purposes and in accordance with these terms. You agree not to use the service in any way that could damage, disable, overburden, or impair the service or interfere with any other party's use of the service.",
      },
      {
        heading: '5. Subscription and Payments',
        text: 'Certain features of the service require a paid subscription. By subscribing to a paid plan, you agree to pay the applicable fees. All fees are non-refundable unless otherwise stated in writing.',
      },
      {
        heading: '6. Termination',
        text: 'We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
      },
    ],
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Privacy Policy',
    content: [
      {
        heading: '1. Information We Collect',
        text: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, company information, and usage data.',
      },
      {
        heading: '2. How We Use Your Information',
        text: 'We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices and support messages, and to respond to your comments and questions.',
      },
      {
        heading: '3. Information Sharing',
        text: 'We do not share your personal information with third parties except as described in this policy. We may share information with service providers who assist us in operating our platform, conducting our business, or servicing you.',
      },
      {
        heading: '4. Data Security',
        text: 'We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. All data is encrypted in transit and at rest.',
      },
      {
        heading: '5. Data Retention',
        text: 'We retain your information for as long as your account is active or as needed to provide you services. We will retain and use your information as necessary to comply with our legal obligations and resolve disputes.',
      },
      {
        heading: '6. Your Rights',
        text: 'You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data. Contact us to exercise these rights.',
      },
    ],
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Security Practices',
    content: [
      {
        heading: 'Encryption',
        text: 'All data transmitted between your browser and our servers is encrypted using TLS 1.3. Data at rest is encrypted using AES-256 encryption.',
      },
      {
        heading: 'Access Controls',
        text: 'We implement role-based access controls to ensure that only authorized personnel can access sensitive data. All access is logged and monitored.',
      },
      {
        heading: 'Infrastructure',
        text: 'Our infrastructure is hosted on secure, SOC 2 Type II certified cloud providers with multiple layers of physical and network security.',
      },
      {
        heading: 'Regular Audits',
        text: 'We conduct regular security audits and penetration testing to identify and address potential vulnerabilities in our systems.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: Eye,
    title: 'Cookie Policy',
    content: [
      {
        heading: 'What Are Cookies',
        text: 'Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.',
      },
      {
        heading: 'Essential Cookies',
        text: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access.',
      },
      {
        heading: 'Analytics Cookies',
        text: 'We use analytics cookies to understand how visitors interact with our website. This helps us improve our service and user experience.',
      },
      {
        heading: 'Managing Cookies',
        text: 'You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your user experience.',
      },
    ],
  },
]

const Terms = () => {
  return (
    <div className="bg-section-soft min-h-screen">
      {/* Header */}
      <section className="container-x py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-brand-main mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-deep">
              Legal & Privacy
            </h1>
            <p className="text-base text-base-content/70 mt-3">
              Important information about how we handle your data and the terms
              of using our service.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-base-content/60">
              <Calendar className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Navigation */}
      <section className="container-x pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-glass-brand p-4"
        >
          <p className="text-sm font-semibold text-brand-deep mb-3">
            Quick Navigation
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="btn btn-sm btn-ghost gap-2"
              >
                <section.icon className="w-4 h-4" />
                {section.title}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="container-x pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="card-glass-brand p-6 md:p-8 scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-soft/70 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-brand-main" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-brand-deep">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-6">
                {section.content.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-brand-deep mb-2">
                      {item.heading}
                    </h3>
                    <p className="text-sm text-base-content/70 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className=" py-12">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass-brand p-6 md:p-8 max-w-2xl mx-auto text-center"
          >
            <Mail className="w-10 h-10 text-brand-main mx-auto mb-4" />
            <h2 className="text-xl font-bold text-brand-deep mb-2">
              Questions About Our Policies?
            </h2>
            <p className="text-sm text-base-content/70 mb-4">
              If you have any questions about our terms, privacy practices, or
              how we handle your data, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="btn-gradient-primary inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
              <a
                href="mailto:legal@assetverse.app"
                className="btn-gradient-outline inline-flex items-center justify-center gap-2"
              >
                legal@assetverse.app
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Terms
