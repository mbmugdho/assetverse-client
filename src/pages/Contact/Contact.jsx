import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import emailjs from '@emailjs/browser'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'muntasirbillahmugdho@gmail.com',
    href: 'mailto:muntasirbillahmugdho@gmail.com',
    description: 'We typically respond within 24 hours',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+880 1234-567890',
    href: 'tel:+8801234567890',
    description: 'Mon-Fri, 9am-6pm BST',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: 'Rangpur, Bangladesh',
    href: 'https://maps.google.com/?q=Rangpur,+Bangladesh',
    description: 'Rangpur Division, Bangladesh',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon - Fri: 9AM - 6PM',
    href: null,
    description: 'Weekend support available for Enterprise',
  },
]

const faqs = [
  {
    question: 'How quickly can I get started?',
    answer:
      'You can sign up and start tracking assets within minutes. No credit card required for the free tier.',
  },
  {
    question: 'Do you offer custom integrations?',
    answer:
      'Yes! Our Enterprise plan includes custom API integrations with your existing HR and IT systems.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We offer email support for all plans, priority support for Standard, and 24/7 dedicated support for Enterprise.',
  },
]

const Contact = () => {
  const formRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setApiError(null)

    try {
      // EmailJS Configuration
      // Replace these with your actual EmailJS credentials from mdmontasirbillah5@gmail.com account
      const serviceId = 'service_mbvi3q2' // e.g., 'service_abc123'
      const templateId = 'template_e2ewo59' // e.g., 'template_xyz789'
      const publicKey = 'ZdYBH-2GriwPgy6UA' // e.g., 'abcdefghijklmnop'

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'muntasirbillahmugdho@gmail.com',
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setApiError('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-section-soft min-h-screen">
      {/* Hero Section */}
      <section className="container-x py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-brand-main font-semibold">
            Get In Touch
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-deep mt-3">
            We'd Love to{' '}
            <span className="text-gradient-hero">Hear From You</span>
          </h1>
          <p className="text-sm md:text-base text-base-content/70 mt-4">
            Have questions about AssetVerse? Need help getting started? Our team
            is here to help you succeed.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="container-x pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-glass-brand p-5"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-soft/70 flex items-center justify-center mb-3">
                <info.icon className="w-5 h-5 text-brand-main" />
              </div>
              <h3 className="text-sm font-semibold text-brand-deep">
                {info.label}
              </h3>
              {info.href ? (
                <a
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-sm text-brand-main hover:underline mt-1 block"
                >
                  {info.value}
                </a>
              ) : (
                <p className="text-sm text-brand-main mt-1">{info.value}</p>
              )}
              <p className="text-xs text-base-content/60 mt-1">
                {info.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className=" py-12 md:py-16">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="card-glass-brand p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-brand-soft/70 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-brand-main" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-brand-deep">
                      Send a Message
                    </h2>
                    <p className="text-xs text-base-content/60">
                      We'll get back to you within 24 hours
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-deep mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm text-base-content/70 mb-4">
                      Thank you for reaching out. We'll respond to your inquiry
                      shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-gradient-outline btn-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm font-medium text-brand-deep">
                          Your Name
                        </span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`input input-bordered w-full ${
                          errors.name ? 'input-error' : ''
                        }`}
                      />
                      {errors.name && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.name}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm font-medium text-brand-deep">
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`input input-bordered w-full ${
                          errors.email ? 'input-error' : ''
                        }`}
                      />
                      {errors.email && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.email}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm font-medium text-brand-deep">
                          Subject
                        </span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`select select-bordered w-full ${
                          errors.subject ? 'select-error' : ''
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Sales Question">Sales Question</option>
                        <option value="Technical Support">
                          Technical Support
                        </option>
                        <option value="Partnership">Partnership</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.subject}
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Message */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm font-medium text-brand-deep">
                          Message
                        </span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={5}
                        className={`textarea textarea-bordered w-full resize-none ${
                          errors.message ? 'textarea-error' : ''
                        }`}
                      />
                      {errors.message && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.message}
                          </span>
                        </label>
                      )}
                      <label className="label">
                        <span className="label-text-alt text-base-content/60">
                          {formData.message.length}/2000 characters
                        </span>
                      </label>
                    </div>

                    {/* Error Message */}
                    {apiError && (
                      <div className="bg-error/10 border border-error/30 text-error rounded-lg py-2.5 px-3 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {apiError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-gradient-primary w-full flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-brand-deep">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-base-content/70 mt-1">
                  Quick answers to common questions
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="collapse collapse-arrow bg-base-100/60 shadow-sm border border-base-200 rounded-2xl"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title text-sm font-semibold text-brand-deep">
                      {faq.question}
                    </div>
                    <div className="collapse-content text-sm text-base-content/70">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real Google Map */}
              <div className="mt-8 card-glass-brand p-4 overflow-hidden">
                <div className="rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115014.78573498089!2d89.20089858312498!3d25.74391485498498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e32de6fca6019b%3A0x9fa496e687f818c8!2sRangpur%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="AssetVerse Office Location - Rangpur, Bangladesh"
                    className="w-full"
                  ></iframe>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-brand-deep">
                    Rangpur, Bangladesh
                  </p>
                  <p className="text-xs text-base-content/60">
                    Rangpur Division, Bangladesh
                  </p>
                  <a
                    href="https://maps.google.com/?q=Rangpur,+Bangladesh"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-ghost mt-2 text-brand-main"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
