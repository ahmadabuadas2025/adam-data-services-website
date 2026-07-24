import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin } from 'react-icons/fi'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const form = e.target

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'sales@adamdataservices.org',
      href: 'mailto:sales@adamdataservice.org',
    },
    {
      icon: FiMail,
      label: 'Email',
      value: 'aja.it.2024@gmail.com',
      href: 'mailto:aja.it.2024@gmail.com',
    },
    {
      icon: FiMail,
      label: 'Email',
      value: 'Raayashanawany1993@gmail.com',
      href: 'mailto:Raayashanawany1993@gmail.com',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (850) 449-9890',
      href: 'tel:+18504499890',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (847) 641-7399',
      href: 'tel:+18476417399',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Global Remote Team & Tampa FL, USA',
      href: '#',
    },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your business? Let's start a conversation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8">
                We're here to help you leverage the power of data, AI, and
                emerging technologies. Reach out to discuss your project or
                learn more about our services.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                const isEmail = info.label === 'Email'
                return (
                  <motion.a
                    key={index}
                    href={isEmail ? `mailto:${info.value}?subject=Contact from ADAM Data Services Website` : info.href}
                    onClick={(e) => {
                      if (isEmail) {
                        e.preventDefault()
                        window.location.href = `mailto:${info.value}?subject=Contact from ADAM Data Services Website&body=Hello ADAM Data Services,%0D%0A%0D%0A`
                      }
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 glass p-4 rounded-lg group cursor-pointer"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* LinkedIn Social Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <motion.a
                href="https://www.linkedin.com/company/adam-data-services/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex items-center space-x-3 glass p-4 rounded-lg group"
              >
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <FiLinkedin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">LinkedIn</div>
                  <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    Follow us on LinkedIn
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form - Netlify Forms */}
          <motion.form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="glass p-8 rounded-2xl space-y-6"
          >
            {/* Netlify hidden field */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400"
              >
                Thank you! Your message has been sent. We'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400"
              >
                There was an error sending your message. Please try again.
              </motion.div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your company (optional)"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="w-5 h-5" />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
