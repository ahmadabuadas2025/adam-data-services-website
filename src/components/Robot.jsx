import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Robot = ({ message = 'Hi', onComplete, triggerOnView = false }) => {
  const [showRobot, setShowRobot] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [hideRobot, setHideRobot] = useState(false)
  const [phase, setPhase] = useState('walking') // 'walking' or 'smiling'
  const [hasShown, setHasShown] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
  // Watch for contact section visibility manually
  useEffect(() => {
    if (!triggerOnView) return
    
    const checkVisibility = () => {
      const contactElement = document.getElementById('contact')
      if (contactElement) {
        const rect = contactElement.getBoundingClientRect()
        // More lenient visibility check - section is visible if any part is in viewport
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        setIsInView(isVisible)
      }
    }
    
    // Check immediately and on scroll/resize
    checkVisibility()
    const interval = setInterval(checkVisibility, 100) // Check every 100ms for better detection
    window.addEventListener('scroll', checkVisibility, { passive: true })
    window.addEventListener('resize', checkVisibility)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
    }
  }, [triggerOnView])

  useEffect(() => {
    // If triggerOnView is true, only show when section is in view
    if (triggerOnView) {
      if (isInView && !hasShown) {
        setHasShown(true)
        // Show robot immediately
        setShowRobot(true)
        
        // Show message and change to smiling phase when robot reaches center
        const timer2 = setTimeout(() => {
          console.log('Setting showMessage to true, message:', message)
          setShowMessage(true)
          setPhase('smiling')
        }, 3000)

        // Hide message first, then robot disappears
        const timer3 = setTimeout(() => {
          setShowMessage(false)
          // Robot disappears after message is hidden
          setTimeout(() => {
            setHideRobot(true)
            setTimeout(() => {
              setShowRobot(false)
              setHasShown(false) // Reset to allow re-triggering
              if (onComplete) onComplete()
            }, 1000)
          }, 500)
        }, 7000) // Show message for 4 seconds (3s delay + 4s display)

        return () => {
          clearTimeout(timer2)
          clearTimeout(timer3)
        }
      }
      return
    }

    // Original behavior for non-view-triggered robots
    // Show robot after a short delay
    const timer1 = setTimeout(() => {
      setShowRobot(true)
    }, 1000)

    // Show message and change to smiling phase when robot reaches center
    const timer2 = setTimeout(() => {
      setShowMessage(true)
      setPhase('smiling')
    }, 3000)

    // Hide message and robot
    const timer3 = setTimeout(() => {
      setShowMessage(false)
      setHideRobot(true)
      setTimeout(() => {
        setShowRobot(false)
        if (onComplete) onComplete()
      }, 1000)
    }, 6000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete, triggerOnView, isInView, hasShown])

  // Reset when going out of view (for re-triggering) - removed to prevent interference

  // For non-view-triggered robots, return early if not showing
  if (!triggerOnView && !showRobot && !hideRobot) return null

  return (
    <div className="relative">
      <AnimatePresence>
        {showRobot && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={
              hideRobot
                ? { x: '-100%', opacity: 0 }
                : { x: '20%', opacity: 1 }
            }
            exit={{ x: '-100%', opacity: 0 }}
            transition={{
              x: { duration: 2, ease: 'easeInOut' },
              opacity: { duration: 0.5 },
            }}
            className="fixed bottom-20 left-0 z-50 pointer-events-none"
          >
          {/* Robot Body */}
          <div className="relative">
            {/* Robot Character - SVG Based like Portfolio */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative scale-75"
            >
              {/* Robot SVG */}
              <svg
                width="90"
                height="112"
                viewBox="0 0 80 100"
                className="drop-shadow-2xl"
              >
                {/* Head */}
                <rect
                  x="20"
                  y="5"
                  width="40"
                  height="35"
                  rx="5"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
                
                {/* Eyes */}
                <circle cx="30" cy="20" r="6" fill="white" />
                <circle cx="50" cy="20" r="6" fill="white" />
                {phase === 'smiling' ? (
                  <>
                    {/* Smiling eyes (curved lines) */}
                    <motion.path
                      d="M 25 20 Q 30 15 35 20"
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.path
                      d="M 45 20 Q 50 15 55 20"
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Smile mouth */}
                    <motion.path
                      d="M 28 28 Q 40 35 52 28"
                      stroke="black"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ 
                        pathLength: 1,
                        d: [
                          'M 28 28 Q 40 35 52 28',
                          'M 28 28 Q 40 36 52 28',
                          'M 28 28 Q 40 35 52 28',
                        ]
                      }}
                      transition={{ 
                        pathLength: { duration: 0.3, delay: 0.2 },
                        d: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <circle cx="30" cy="20" r="3" fill="black" />
                    <circle cx="50" cy="20" r="3" fill="black" />
                  </>
                )}
                
                {/* Antenna */}
                <line x1="40" y1="5" x2="40" y2="0" stroke="#3B82F6" strokeWidth="2" />
                <circle cx="40" cy="0" r="3" fill="#3B82F6" />
                
                {/* Body */}
                <rect
                  x="15"
                  y="40"
                  width="50"
                  height="45"
                  rx="5"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
                
                {/* Screen with waveform */}
                <rect
                  x="22"
                  y="48"
                  width="36"
                  height="20"
                  rx="3"
                  fill="#BFDBFE"
                />
                {/* Waveform lines */}
                <motion.path
                  d="M 25 58 L 28 55 L 31 60 L 34 53 L 37 58 L 40 55 L 43 60 L 46 53 L 49 58 L 52 55 L 55 60"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  animate={{
                    d: [
                      "M 25 58 L 28 55 L 31 60 L 34 53 L 37 58 L 40 55 L 43 60 L 46 53 L 49 58 L 52 55 L 55 60",
                      "M 25 58 L 28 60 L 31 55 L 34 62 L 37 56 L 40 60 L 43 55 L 46 62 L 49 56 L 52 60 L 55 55",
                      "M 25 58 L 28 55 L 31 60 L 34 53 L 37 58 L 40 55 L 43 60 L 46 53 L 49 58 L 52 55 L 55 60",
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Red buttons */}
                <circle cx="30" cy="75" r="3" fill="#EF4444" />
                <circle cx="50" cy="75" r="3" fill="#EF4444" />
                
                {/* Left Arm */}
                <rect
                  x="5"
                  y="50"
                  width="12"
                  height="8"
                  rx="4"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
                <rect
                  x="2"
                  y="55"
                  width="6"
                  height="4"
                  rx="2"
                  fill="#6B7280"
                />
                
                {/* Right Arm */}
                <rect
                  x="63"
                  y="50"
                  width="12"
                  height="8"
                  rx="4"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
                <rect
                  x="72"
                  y="55"
                  width="6"
                  height="4"
                  rx="2"
                  fill="#6B7280"
                />
                
                {/* Left Leg */}
                <rect
                  x="20"
                  y="85"
                  width="12"
                  height="15"
                  rx="6"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
                <rect
                  x="18"
                  y="98"
                  width="16"
                  height="2"
                  rx="1"
                  fill="#6B7280"
                />
                
                {/* Right Leg */}
                <rect
                  x="48"
                  y="85"
                  width="12"
                  height="15"
                  rx="6"
                  fill="#9CA3AF"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
                <rect
                  x="46"
                  y="98"
                  width="16"
                  height="2"
                  rx="1"
                  fill="#6B7280"
                />
              </svg>
            </motion.div>

            {/* Message Bubble - Bigger and Connected to Robot */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-28 left-1/2 transform -translate-x-1/2 z-50"
                  style={{ pointerEvents: 'none', minWidth: '200px' }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl relative text-base font-bold">
                    <p className="whitespace-normal text-center">{message}</p>
                    {/* Speech bubble tail - Connected to robot head */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-600"></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}

export default Robot
