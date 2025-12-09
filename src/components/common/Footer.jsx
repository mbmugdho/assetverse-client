import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from '../../assets/logos/logo.png'


const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-base-200 bg-section-soft">
      {/* Main footer content */}
      <div className="container-x py-8 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-15">
        {/* Brand + description */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-baseline gap-1.5 hover:opacity-90 transition-opacity"
          >
            <img src={logo} alt="AssetVerse Logo" className="w-8 h-6" />
            <span className="text-lg font-semibold tracking-tight text-brand-deep">
              Asset
            </span>
            <span className="text-lg font-extrabold tracking-tight text-gradient-hero">
              Verse
            </span>
          </Link>
          <p className="text-sm text-base-content/70 max-w-md">
            AssetVerse helps HR and IT teams track every laptop, chair, and
            credential — across multiple companies and teams — with clear,
            auditable workflows.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <span className="badge-brand text-[11px]">
              B2B HR & Asset Management
            </span>
          </div>
        </div>

        {/* Quick navigation */}
        <div>
          <h3 className="text-sm font-semibold text-brand-deep mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-base-content/80">
            <li>
              <Link to="/" className="hover:text-brand-main transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/register/employee"
                className="hover:text-brand-main transition-colors"
              >
                Join as Employee
              </Link>
            </li>
            <li>
              <Link
                to="/register/hr"
                className="hover:text-brand-main transition-colors"
              >
                Join as HR Manager
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-brand-main transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + socials */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-brand-deep">
            Contact & Social
          </h3>

          <div className="space-y-1 text-sm text-base-content/80">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-main" />
              <a
                href="mailto:support@assetverse.app"
                className="hover:text-brand-main transition-colors"
              >
                support@assetverse.app
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-main" />
              <a
                href="tel:+1234567890"
                className="hover:text-brand-main transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-base-content/60 mb-2">
              Follow us on social:
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/login"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook login"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-base-200 hover:bg-brand-main/10 border border-base-300 hover:border-brand-main transition-colors"
              >
                <FaFacebook className="w-4 h-4 text-base-content/80" />
              </a>
              <a
                href="https://www.instagram.com/accounts/login/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram login"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-base-200 hover:bg-brand-main/10 border border-base-300 hover:border-brand-main transition-colors"
              >
                <FaInstagram className="w-4 h-4 text-base-content/80" />
              </a>
              <a
                href="https://x.com/login"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter) login"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-base-200 hover:bg-brand-main/10 border border-base-300 hover:border-brand-main transition-colors"
              >
               
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-200">
        <div className="container-x py-4 flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between text-xs text-base-content/60">
          <p>© {year} AssetVerse. All rights reserved.</p>
          <p className="text-center md:text-right">
            Built for HR, IT, and distributed teams who care about every asset.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
