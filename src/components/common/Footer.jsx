import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import logo from '../../assets/logos/logo.png'

const Footer = () => {
  const year = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Assets', to: '/assets' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  const companyLinks = [
    { label: 'Join as Employee', to: '/register/employee' },
    { label: 'Join as HR Manager', to: '/register/hr' },
    { label: 'Login', to: '/login' },
  ]

  const legalLinks = [
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Cookie Policy', to: '/terms#cookies' },
  ]

  const socialLinks = [
    {
      icon: FaFacebook,
      href: 'https://www.facebook.com/mugdho7674/',
      label: 'Facebook',
    },
    {
      icon: FaXTwitter,
      href: 'https://x.com/MdMontasirBill1',
      label: 'X (Twitter)',
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/md-montasir-billah/',
      label: 'LinkedIn',
    },
    {
      icon: FaGithub,
      href: 'https://github.com/mbmugdho',
      label: 'GitHub',
    },
  ]

  return (
    <footer className="bg-section-soft2">
      {/* Main footer content */}
      <div className="container-x py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand + description */}
          <div className="lg:col-span-1 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <img src={logo} alt="AssetVerse Logo" className="w-9 h-8" />
              <span className="text-lg font-semibold tracking-tight text-brand-deep">
                Asset
              </span>
              <span className="text-lg font-extrabold tracking-tight text-gradient-hero">
                Verse
              </span>
            </Link>
            <p className="text-sm text-base-content/70 max-w-xs">
              AssetVerse helps HR and IT teams track every laptop, chair, and
              credential — across multiple companies and teams — with clear,
              auditable workflows.
            </p>
            <div className="flex items-center gap-2">
              <span className="badge-brand text-[11px]">
                B2B HR & Asset Management
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-base-200 hover:bg-brand-main/10 border border-base-300 hover:border-brand-main transition-colors"
                >
                  <social.icon className="w-4 h-4 text-base-content/80" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-brand-deep mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-base-content/70 hover:text-brand-main transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-brand-deep mb-4">
              Get Started
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-base-content/70 hover:text-brand-main transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Legal Links */}
            <h3 className="text-sm font-semibold text-brand-deep mb-3 mt-6">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-base-content/70 hover:text-brand-main transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-brand-deep mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-soft/50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-brand-main" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Email</p>
                  <a
                    href="mailto:support@assetverse.app"
                    className="text-sm text-base-content/80 hover:text-brand-main transition-colors"
                  >
                    support@assetverse.app
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-soft/50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-main" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-base-content/80 hover:text-brand-main transition-colors"
                  >
                    +880 1712-345678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-soft/50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-main" />
                </div>
                <div>
                  <p className="text-xs text-base-content/60">Address</p>
                  <p className="text-sm text-base-content/80">
                    Lalbagh, Rangpur Sadar
                    <br />
                    Rangpur Division, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-200">
        <div className="container-x py-5 flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between">
          <p className="text-xs text-base-content/60">
            © {year} AssetVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-base-content/60">
            <Link
              to="/terms"
              className="hover:text-brand-main transition-colors"
            >
              Terms
            </Link>
            <span>•</span>
            <Link
              to="/privacy"
              className="hover:text-brand-main transition-colors"
            >
              Privacy
            </Link>
            <span>•</span>
            <Link
              to="/contact"
              className="hover:text-brand-main transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
