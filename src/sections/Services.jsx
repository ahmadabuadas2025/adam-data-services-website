import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FiDatabase,
  FiCpu,
  FiCloud,
  FiBox,
  FiBarChart2,
  FiUsers,
} from 'react-icons/fi'
import { companyData } from '../data/companyData'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const iconMap = {
    database: FiDatabase,
    brain: FiCpu,
    cloud: FiCloud,
    vr: FiBox,
    analytics: FiBarChart2,
    consulting: FiUsers,
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Animated Background Lights */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full blur-3xl"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${20 + (i % 3) * 30}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? 'rgba(59, 130, 246, 0.3)'
                  : i % 3 === 1
                  ? 'rgba(168, 85, 247, 0.3)'
                  : 'rgba(6, 182, 212, 0.3)'
              }, transparent)`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Flying Technology Icons in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {companyData.services.map((service, index) => {
          const Icon = iconMap[service.icon] || FiBox
          return (
            <motion.div
              key={`bg-icon-${index}`}
              className="absolute"
              style={{
                left: `${10 + (index * 15) % 80}%`,
                top: `${15 + (index * 20) % 70}%`,
              }}
              animate={{
                x: [
                  '0px',
                  `${50 + Math.sin(index) * 100}px`,
                  `${-50 + Math.cos(index) * 100}px`,
                  '0px',
                ],
                y: [
                  '0px',
                  `${30 + Math.cos(index) * 80}px`,
                  `${-30 + Math.sin(index) * 80}px`,
                  '0px',
                ],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.2, 0.1],
                scale: [0.8, 1.2, 1, 0.8],
              }}
              transition={{
                duration: 15 + index * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 1.5,
              }}
            >
              <Icon className="w-8 h-8 text-blue-400/20 dark:text-blue-400/40" />
            </motion.div>
          )
        })}
        {/* Additional floating icons */}
        {[
          FiDatabase,
          FiCpu,
          FiCloud,
          FiBox,
          FiBarChart2,
          FiUsers,
          FiDatabase,
          FiCpu,
        ].map((Icon, index) => (
          <motion.div
            key={`float-icon-${index}`}
            className="absolute"
            style={{
              left: `${5 + (index * 12) % 90}%`,
              top: `${10 + (index * 18) % 80}%`,
            }}
              animate={{
                x: [
                  '0px',
                  `${60 + Math.sin(index * 0.5) * 120}px`,
                  `${-60 + Math.cos(index * 0.5) * 120}px`,
                  '0px',
                ],
                y: [
                  '0px',
                  `${40 + Math.cos(index * 0.5) * 100}px`,
                  `${-40 + Math.sin(index * 0.5) * 100}px`,
                  '0px',
                ],
                rotate: [0, -360],
                opacity: [0.08, 0.25, 0.15, 0.08],
                scale: [0.6, 1.1, 0.9, 0.6],
              }}
              transition={{
                duration: 20 + index * 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 2,
              }}
            >
              <Icon className="w-6 h-6 text-purple-400/15 dark:text-purple-400/35" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Services & Capabilities</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-4"
        >
          {companyData.services.map((service, index) => {
            const Icon = iconMap[service.icon] || FiBox
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                className="relative group"
              >
                {/* Animated Border with Light Effect */}
                <motion.div
                  className="absolute -inset-0.5 rounded-lg overflow-hidden"
                  style={{
                    background: 'linear-gradient(45deg, #3b82f6, #a855f7, #06b6d4, #3b82f6)',
                    backgroundSize: '300% 300%',
                    padding: '2px',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="w-full h-full bg-white/90 dark:bg-gray-800/90 rounded-lg"></div>
                </motion.div>

                {/* Light Glow Effect - Turns Up and Down */}
                <motion.div
                  className="absolute -inset-1 rounded-lg blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${
                      index % 3 === 0
                        ? 'rgba(59, 130, 246, 0.6)'
                        : index % 3 === 1
                        ? 'rgba(168, 85, 247, 0.6)'
                        : 'rgba(6, 182, 212, 0.6)'
                    }, transparent)`,
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                />
                
                <div className="relative glass px-6 py-3 rounded-lg flex items-center space-x-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-10">
                  {/* Icon with Pulsing Light */}
                  <motion.div
                    className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg relative"
                    animate={{
                      boxShadow: [
                        '0 0 8px rgba(59, 130, 246, 0.4)',
                        '0 0 16px rgba(168, 85, 247, 0.6)',
                        '0 0 8px rgba(59, 130, 246, 0.4)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    }}
                  >
                    <Icon className="w-5 h-5 text-white relative z-10" />
                    {/* Inner Light Glow */}
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-lg"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.15,
                      }}
                    />
                  </motion.div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {service.title}
                  </span>
                </div>

                {/* Spotlight Effect */}
                <motion.div
                  className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      index % 3 === 0
                        ? 'rgba(59, 130, 246, 0.4)'
                        : index % 3 === 1
                        ? 'rgba(168, 85, 247, 0.4)'
                        : 'rgba(6, 182, 212, 0.4)'
                    }, transparent)`,
                  }}
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.25,
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services
