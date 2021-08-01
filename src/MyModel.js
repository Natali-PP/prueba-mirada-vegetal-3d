/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import ojo from './spiral.gltf'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF(ojo)
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.04, 0, 0]} rotation={[-1.56, 0.02, -1.56]} scale={[0.94, 0.94, 0.94]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_2.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_3.geometry}
          material={materials['Material.004']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_4.geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/spiral.gltf')

