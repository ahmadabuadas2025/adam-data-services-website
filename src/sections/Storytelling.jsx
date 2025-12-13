import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiDatabase, FiCode, FiCpu, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import ProcessDiagram from '../components/ProcessDiagram'

const Storytelling = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="storytelling"
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Process
            </span>
          </h2>
          
          {/* Subtitle with scanning light effect and icons */}
          <div className="relative inline-block max-w-3xl mx-auto">
            <motion.p 
              className="text-xl text-gray-300 flex items-center justify-center gap-3 flex-wrap"
            >
              <motion.span
                className="inline-flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <FiDatabase className="w-5 h-5 text-blue-400" />
                <span>From raw data</span>
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <FiArrowRight className="w-4 h-4 text-purple-400" />
              </motion.span>
              
              <motion.span
                className="inline-flex items-center gap-2 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <FiCode className="w-5 h-5 text-cyan-400" />
                <span className="relative z-10">to transformative</span>
                {/* Scanning light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '50%',
                    height: '100%',
                  }}
                />
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <FiArrowRight className="w-4 h-4 text-purple-400" />
              </motion.span>
              
              <motion.span
                className="inline-flex items-center gap-2 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <FiCpu className="w-5 h-5 text-purple-400" />
                <span className="relative z-10">business</span>
                {/* Scanning light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '50%',
                    height: '100%',
                  }}
                />
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.3, duration: 0.4 }}
              >
                <FiArrowRight className="w-4 h-4 text-pink-400" />
              </motion.span>
              
              <motion.span
                className="inline-flex items-center gap-2 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <FiTrendingUp className="w-5 h-5 text-pink-400" />
                <span className="relative z-10">impact</span>
                {/* Scanning light effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '50%',
                    height: '100%',
                  }}
                />
              </motion.span>
            </motion.p>
          </div>
        </motion.div>

        {/* Canvas-based Process Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <ProcessDiagram />
        </motion.div>
      </div>
    </section>
  )
}

export default Storytelling
