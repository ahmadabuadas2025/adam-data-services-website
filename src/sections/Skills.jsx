import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiPython,
  SiReact,
  SiNodedotjs,
  SiAmazonaws,
  SiDocker,
  SiKubernetes,
  SiTensorflow,
  SiPostgresql,
  SiMongodb,
  SiThreedotjs,
  SiUnity,
  SiGraphql,
} from 'react-icons/si'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const techIcons = {
    Python: SiPython,
    React: SiReact,
    'Node.js': SiNodedotjs,
    AWS: SiAmazonaws,
    Docker: SiDocker,
    Kubernetes: SiKubernetes,
    TensorFlow: SiTensorflow,
    PostgreSQL: SiPostgresql,
    MongoDB: SiMongodb,
    'Three.js': SiThreedotjs,
    Unity: SiUnity,
    GraphQL: SiGraphql,
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
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 200 },
    },
  }

  return (
    <section
      id="skills"
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
            <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Mastery across the modern technology landscape
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-6"
        >
          {Object.entries(techIcons).map(([name, Icon], index) => (
            <motion.div
              key={name}
              variants={itemVariants}
              whileHover={{ scale: 1.2, rotate: 5, y: -10 }}
              className="flex flex-col items-center justify-center glass p-6 rounded-2xl group cursor-pointer"
            >
              <Icon className="w-12 h-12 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
