import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ShootingStar({ 
  startX = -15, 
  startY = 8, 
  endX = 15, 
  endY = -8, 
  delay = 0,
  color = '#3b82f6',
  explosionColor = '#a855f7'
}) {
  const starRef = useRef()
  const trailRef = useRef()
  const [position, setPosition] = useState(new THREE.Vector3(startX, startY, 0))
  const [exploded, setExploded] = useState(false)
  const [particles, setParticles] = useState([])
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Delay start
    const startTimer = setTimeout(() => {
      setStarted(true)
    }, delay * 1000)

    const interval = setInterval(() => {
      setPosition(new THREE.Vector3(startX, startY, 0))
      setExploded(false)
      setParticles([])
      setStarted(true)
    }, 8000) // Longer interval for better timing

    return () => {
      clearInterval(interval)
      clearTimeout(startTimer)
    }
  }, [startX, startY, delay])

  useFrame((state, delta) => {
    if (!starRef.current || !started) return

    const targetPos = new THREE.Vector3(endX, endY, 0)
    const distance = position.distanceTo(targetPos)
    
    if (distance > 0.3 && !exploded) {
      const newPos = position.clone().lerp(targetPos, delta * 0.6)
      setPosition(newPos)
      starRef.current.position.copy(newPos)
      
      // Update trail
      if (trailRef.current) {
        const trailLength = 15
        const positions = []
        for (let i = 0; i < trailLength; i++) {
          const t = Math.max(0, 1 - (i / trailLength) * 0.5)
          const trailPos = new THREE.Vector3().lerpVectors(
            new THREE.Vector3(startX, startY, 0),
            targetPos,
            t
          )
          positions.push(trailPos.x, trailPos.y, trailPos.z)
        }
        if (trailRef.current.geometry) {
          trailRef.current.geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
          )
        }
      }
    } else if (!exploded) {
      setExploded(true)
      // Create explosion particles with theme colors
      const newParticles = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          position: targetPos.clone(),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ),
          life: 1,
          color: i % 2 === 0 ? color : explosionColor,
        })
      }
      setParticles(newParticles)
    }

    // Update particles
    if (particles.length > 0) {
      const updatedParticles = particles
        .map(p => ({
          ...p,
          position: p.position.clone().add(p.velocity.clone().multiplyScalar(delta * 2)),
          life: p.life - delta * 1.5,
        }))
        .filter(p => p.life > 0)
      setParticles(updatedParticles)
    }
  })

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : { r: 0.23, g: 0.51, b: 0.96 }
  }

  const starColor = hexToRgb(color)
  const explosionRgb = hexToRgb(explosionColor)

  return (
    <>
      {/* Star - Smaller */}
      {!exploded && started && (
        <mesh ref={starRef} position={position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
          />
        </mesh>
      )}

      {/* Trail */}
      {!exploded && started && (
        <line ref={trailRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={15}
              array={new Float32Array(15 * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={color} 
            opacity={0.7} 
            transparent 
            linewidth={2}
          />
        </line>
      )}

      {/* Explosion Particles with Theme Colors - Smaller */}
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={particle.life * 2}
            transparent
            opacity={particle.life}
          />
        </mesh>
      ))}
    </>
  )
}

export default ShootingStar
