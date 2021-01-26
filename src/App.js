// import * as THREE from 'three'
// import ReactDOM from 'react-dom'
import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'

function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }))
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
  )
}

function Cube({ position, color }) {
  const [ref] = useBox(() => ({
    mass: 1000,
    args: [1, 1, 1],
    position
  }))

  // useFrame(({ clock }) => api.rotation.set(Math.sin(clock.getElapsedTime()), 0, 0))


  return (
    <mesh receiveShadow castShadow ref={ref}  args={[1, 1, 1]}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={color} />
    </mesh>
  )
}
const w = '#ffffff'
const r = '#FF0000'
const m = '#9C4205'
const n = '#000000' 
const b = '#294BBF'
const y = '#E8FF2D'
const p = '#FFC590'
const mario = [
  [w,w,w,w,w,w,w,w,w,w,w,w,w],
  [w,w,w,r,r,r,r,r,r,w,w,w,w],
  [w,w,r,r,r,r,r,r,r,r,r,r,w],
  [w,w,m,m,m,p,p,p,n,p,w,w,w],
  [w,m,p,m,p,p,p,p,n,p,p,p,w],
  [w,m,p,m,m,p,p,p,p,n,p,p,p],
  [w,m,m,p,p,p,p,p,n,n,n,n,w],
  [w,w,w,p,p,p,p,p,p,p,p,w,w],
  [w,w,r,r,b,r,r,r,r,w,w,w,w],
  [w,r,r,r,b,r,r,b,r,r,r,w,w],
  [r,r,r,r,b,b,b,b,r,r,r,r,w],
  [p,p,r,b,y,b,b,y,b,r,p,p,w],
  [p,p,p,b,b,b,b,b,b,p,p,p,w],
  [p,p,b,b,b,b,b,b,b,b,p,p,w],
  [w,w,b,b,b,w,w,b,b,b,w,w,w],
  [w,m,m,m,w,w,w,w,m,m,m,w,w],
  [m,m,m,m,w,w,w,w,m,m,m,m,w],
]

const MarioCube = mario.map((line, x) => {
  return line.map((color, y) => {
    return (
      <Cube receiveShadow castShadow position={[y * 1.2 - ((line.length / 2) * 1.2), Math.random() * 50 + 50, x * 1.2 - ((mario.length / 2) * 1.2)]} color={color} />
    )
  })
})

export default function App() {
  return (
    <Canvas shadowMap colorManagement gl={{ alpha: false }} camera={{ position: [0, 50, 50], fov: 50 }}>
      <color attach="background" args={['lightblue']} />
      <hemisphereLight intensity={0.35} />
      <spotLight position={[0, 100, 0]} angle={0.3} penumbra={1} intensity={1} castShadow shadow-mapSize-width={256} shadow-mapSize-height={256} />
      <Physics gravity={[0, -40, 0]}>
        <Plane rotation={[-Math.PI / 2, 0, 0]} />
        {MarioCube}
      </Physics>
      <OrbitControls />
    </Canvas>
  )
}
