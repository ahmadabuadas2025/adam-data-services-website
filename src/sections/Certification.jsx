import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiAward } from 'react-icons/fi'

const Certification = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="certification"
      className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <FiAward className="w-12 h-12 text-blue-600 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Certified Company</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Certified by the City of Tampa - Ready for Federal and State Government Contracts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Fancy Picture Frame */}
            <div className="relative">
              {/* Outer Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 via-amber-100 to-amber-200 dark:from-amber-900 dark:via-amber-800 dark:to-amber-900 rounded-3xl shadow-2xl"></div>
              
              {/* Middle Frame */}
              <div className="absolute -inset-2 bg-gradient-to-br from-amber-300 via-amber-200 to-amber-300 dark:from-amber-700 dark:via-amber-600 dark:to-amber-700 rounded-2xl"></div>
              
              {/* Inner Frame with Padding */}
              <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-amber-950 dark:via-gray-900 dark:to-amber-950 p-8 rounded-xl shadow-inner">
                {/* Matting */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  {/* Certificate Image */}
                  <img
                    src="/imgs/certificate.png"
                    alt="City of Tampa Certification"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Corner Decorations */}
              {[
                { top: '-12px', left: '-12px' },
                { top: '-12px', right: '-12px' },
                { bottom: '-12px', left: '-12px' },
                { bottom: '-12px', right: '-12px' },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 border-4 border-amber-600 dark:border-amber-400 rounded-full bg-amber-100 dark:bg-amber-900"
                  style={pos}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl -z-10"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certification
