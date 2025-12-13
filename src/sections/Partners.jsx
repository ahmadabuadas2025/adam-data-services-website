import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Partners = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const partners = [
    { name: 'HB', logo: '/imgs/partner/HB.png' },
    { name: 'NoJoom', logo: '/imgs/partner/noJoom.png' },
    { name: 'SAM', logo: '/imgs/partner/sam.png' },
    { name: 'SIM', logo: '/imgs/partner/siminsghit.png' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 200 },
    },
  }

  return (
    <section
      id="partners"
      ref={ref}
      className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Our Partners</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Trusted by leading organizations and technology partners
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1, 
                y: -10,
                rotateY: 5,
              }}
              className="relative flex items-center justify-center group cursor-pointer"
            >
              {/* Animated Badge Background */}
              <motion.div
                className="absolute inset-0 bg-gray-50 rounded-2xl shadow-sm"
                animate={{
                  boxShadow: [
                    '0 2px 8px rgba(0, 0, 0, 0.1)',
                    '0 4px 16px rgba(59, 130, 246, 0.2)',
                    '0 2px 8px rgba(0, 0, 0, 0.1)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
              />
              
              {/* Animated Gradient Border */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl"
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
                  delay: index * 0.5,
                }}
              >
                <div className="w-full h-full bg-gray-50 rounded-2xl"></div>
              </motion.div>
              
              {/* Animated Border Glow on Hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                whileHover={{
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating Particles Effect */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 25}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 0.6, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: index * 0.2 + i * 0.3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
              
              <div className="relative p-8 flex items-center justify-center min-h-[150px] w-full rounded-2xl overflow-hidden">
                <motion.img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-20 object-contain relative z-10"
                  style={{ filter: 'none' }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{ 
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.5 }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Partners
