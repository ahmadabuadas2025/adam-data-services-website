import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function TechSphere({ position, color, radius = 0.3 }) {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export default function TechOrbit() {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005
    }
  })

  const techPositions = [
    [2, 0, 0],
    [-2, 0, 0],
    [0, 2, 0],
    [0, -2, 0],
    [0, 0, 2],
    [0, 0, -2],
    [1.4, 1.4, 0],
    [-1.4, -1.4, 0],
  ]

  const colors = ['#3b82f6', '#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      <group ref={group}>
        {techPositions.map((pos, i) => (
          <TechSphere
            key={i}
            position={pos}
            color={colors[i % colors.length]}
            radius={0.25}
          />
        ))}
      </group>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

