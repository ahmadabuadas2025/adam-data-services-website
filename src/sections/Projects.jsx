import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'Agintic AI & LLM Models',
      description:
        'Building intelligent agents and LLM models to automate workflows and streamline operations for organizations',
      outcome: 'Automated 70% of repetitive tasks and improved efficiency by 85%',
      tech: ['LLM', 'AI Agents', 'Python', 'OpenAI'],
      gradient: 'from-blue-500 to-cyan-500',
      image: '/imgs/projects/genAI.png',
    },
    {
      title: 'AI-Powered Analytics Suite',
      description:
        'Machine learning platform delivering real-time predictive insights',
      outcome: 'Increased decision accuracy by 40% and ROI by 200%',
      tech: ['TensorFlow', 'React', 'Node.js', 'MongoDB'],
      gradient: 'from-purple-500 to-pink-500',
      image: '/imgs/projects/ai.png',
    },
    {
      title: 'Data Platform & Pipeline',
      description:
        'Scalable cloud-native data infrastructure processing 10M+ records daily',
      outcome: 'Reduced processing time by 85% and costs by 60%',
      tech: ['AWS', 'Kubernetes', 'Python', 'PostgreSQL'],
      gradient: 'from-teal-500 to-blue-500',
      image: '/imgs/projects/DPL.png',
    },
    {
      title: 'Data Processing Solutions',
      description:
        'Advanced data processing and transformation pipelines for enterprise clients',
      outcome: 'Achieved 99.9% uptime and real-time analytics capability',
      tech: ['Kafka', 'Spark', 'Docker', 'AWS'],
      gradient: 'from-orange-500 to-red-500',
      image: '/imgs/projects/DP.png',
    },
    {
      title: 'Immersive VR Career Simulation',
      description:
        'Virtual reality solution for schools providing career simulation and training experiences',
      outcome: 'Improved student engagement by 90% and career readiness by 65%',
      tech: ['Unity', 'Three.js', 'WebXR', 'Node.js'],
      gradient: 'from-green-500 to-emerald-500',
      image: '/imgs/projects/VR.png',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="projects"
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
            <span className="gradient-text">Projects & Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real-world solutions delivering measurable business impact
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-0 rounded-2xl group cursor-pointer relative overflow-hidden"
            >
              {/* Animated Border - Lights Up and Down */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  padding: '2px',
                  background: `linear-gradient(180deg, ${project.gradient.includes('blue') ? '#3b82f6' : project.gradient.includes('purple') ? '#a855f7' : project.gradient.includes('teal') ? '#14b8a6' : project.gradient.includes('green') ? '#10b981' : '#f59e0b'}, transparent, ${project.gradient.includes('blue') ? '#3b82f6' : project.gradient.includes('purple') ? '#a855f7' : project.gradient.includes('teal') ? '#14b8a6' : project.gradient.includes('green') ? '#10b981' : '#f59e0b'})`,
                  backgroundSize: '100% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '0% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
              </motion.div>

              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                style={{ margin: '2px' }}
              />

              <div className="relative z-10 p-6" style={{ margin: '2px' }}>
                {/* Project Image */}
                <div className="mb-4 rounded-xl overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome */}
                <div className="mb-6 p-4 bg-green-500/10 dark:bg-green-500/20 rounded-lg border border-green-500/20">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                    ✓ Outcome: {project.outcome}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
