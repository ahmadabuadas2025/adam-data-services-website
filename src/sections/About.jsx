import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiTarget, FiEye, FiAward, FiInfo } from 'react-icons/fi'
import { companyData } from '../data/companyData'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showCertificate, setShowCertificate] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">About Us</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              We are a high-skill, innovative startup transforming the way
              businesses leverage data, AI, and emerging technologies
            </p>
            
            {/* Tampa Certification Badge with Certificate Icon */}
            <div className="relative" style={{ zIndex: 1000 }}>
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setShowCertificate(true)}
                onHoverEnd={() => setShowCertificate(false)}
                onClick={() => setShowCertificate(!showCertificate)}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                    '0 0 40px rgba(168, 85, 247, 0.8)',
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-white font-semibold">
                  ✓ Tampa City Certified Company
                </span>
                <span className="text-white/80 text-sm">
                  Ready for Federal & State Contracts
                </span>
                <FiInfo className="w-5 h-5 text-white cursor-pointer" />
              </motion.div>
              
              {/* Certificate Popup - Appears above all */}
              <AnimatePresence>
                {showCertificate && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4"
                    style={{ zIndex: 99999 }}
                    onMouseEnter={() => setShowCertificate(true)}
                    onMouseLeave={() => setShowCertificate(false)}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 border-2 border-blue-500">
                      <img
                        src="/imgs/certificate.png"
                        alt="City of Tampa Certification"
                        className="max-w-md h-auto rounded-lg"
                      />
                    </div>
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-l-2 border-t-2 border-blue-500 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="glass p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <FiTarget className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {companyData.mission}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <FiEye className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {companyData.vision}
              </p>
            </motion.div>
          </div>

          {/* Core Values - Merged */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-center mb-12">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyData.values.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="glass p-6 rounded-xl text-center"
                >
                  <FiAward className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
