import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import ShootingStar from './ShootingStar'

function FloatingParticles() {
  const points = useRef()
  const particleCount = 1000

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.1
      points.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingShapes() {
  const shapes = useRef([])

  useFrame((state) => {
    shapes.current.forEach((shape, i) => {
      if (shape) {
        shape.rotation.x += 0.01
        shape.rotation.y += 0.01
        shape.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5
      }
    })
  })

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (shapes.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#3b82f6' : '#a855f7'}
            emissive={i % 2 === 0 ? '#3b82f6' : '#a855f7'}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </>
  )
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      <FloatingParticles />
      <FloatingShapes />
      {/* 3 Shooting Stars with different paths, delays, and explosion points on screen */}
      <ShootingStar 
        startX={-15} 
        startY={8} 
        endX={3} 
        endY={-2} 
        delay={0} 
        color="#3b82f6"
        explosionColor="#a855f7"
      />
      <ShootingStar 
        startX={-12} 
        startY={-6} 
        endX={-2} 
        endY={3} 
        delay={2.5} 
        color="#06b6d4"
        explosionColor="#3b82f6"
      />
      <ShootingStar 
        startX={-18} 
        startY={4} 
        endX={2} 
        endY={-3} 
        delay={5} 
        color="#a855f7"
        explosionColor="#06b6d4"
      />
    </>
  )
}
