import React, { useEffect, useState } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import gradiente from "../src/gradiente.jpg";
import hojarezca from "../src/hojarezca.jpg";
import test from "../src/test.png";
import words from "../src/words.png";
import "./App.css";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
  Box,
  OrbitControls,
  Text,
  RoundedBox,meshPhongMaterial
} from "@react-three/drei";

const loader = new THREE.TextureLoader();
const textures = [
  loader.load(gradiente),
  loader.load(hojarezca),
  loader.load(test),
  loader.load(words)
  //loader.load(gradiente),
  //loader.load(gradiente)
];

// スカイボックス用のテクスチャ
const skyBoxLoader = new THREE.CubeTextureLoader();
const skyboxTexture = skyBoxLoader.load([
  gradiente,
  hojarezca,
  // techo
  words,
  // abajo
  test,
  //
  hojarezca,
  gradiente
]);

function SkyBox() {
  const { scene } = useThree();
  scene.background = skyboxTexture;
  return null;
}

function App() {
  return (
    <Canvas>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <mesh
        visible // object gets render if true
        userData={{ test: "hello" }} // An object that can be used to store custom data about the Object3d
        position={[0, 0, 0]} // The position on the canvas of the object [x,y,x]
        rotation={[0, 0, 0]} // The rotation of the object
        castShadow // Sets whether or not the object cats a shadow
        // There are many more props.....
      >
        {/* A spherical shape*/}
        {/*<sphereGeometry attach="geometry" args={[1, 16, 200]} />}
        {/* A standard mesh material*/}
        {/*<meshStandardMaterial
          attach="material" // How the element should attach itself to its parent
          color="#7222D3" // The color of the material
          transparent // Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
          roughness={0.1} // The roughness of the material - Defaults to 1
          metalness={0.1} // The metalness of the material - Defaults to 0
        />*/}
      </mesh>
      {/*An ambient light that creates a soft light against the object */}
      <ambientLight intensity={0.75} />
      {/*An directional light which aims form the given position */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/*An point light, basically the same as directional. This one points from under */}
      <pointLight position={[0, -10, 5]} intensity={1} />

      {/* We can use the drei Sphere which has a simple API. This sphere has a wobble material attached to it */}
      {/*<Box visible position={[-3, 0, 0]}>
        <MeshDistortMaterial
          color="#00A38D"
          attach="material"
          distort={0.15} // Strength, 0 disables the effect (default=1)
          speed={0.5} // Speed (default=1)
          roughness={0.1}
          metalness={0}
        />
      </Box>*/}
        <RoundedBox position={[-3, 0, 0]} args={[1.5, 1.5, 1.5]} radius={0.5} smoothness={4} >
                  <MeshWobbleMaterial
          attach="material"
          color="#00A38D"
          factor={1} // Strength, 0 disables the effect (default=1)
          speed={0.5} // Speed (default=1)
          roughness={0.8}
        />
        </RoundedBox>
      <Sphere visible position={[0, 0, 0]} args={[1, 16, 200]}>
        <MeshWobbleMaterial
          attach="material"
          color="#EB1E99"
          factor={1} // Strength, 0 disables the effect (default=1)
          speed={3} // Speed (default=1)
          roughness={0}
        />
      </Sphere>

      {/* This sphere has a distort material attached to it */}
      <Sphere visible position={[3, 0, 0]} args={[1, 16, 200]}>
        <MeshDistortMaterial
          color="#00A38D"
          attach="material"
          distort={0.45} // Strength, 0 disables the effect (default=1)
          speed={5} // Speed (default=1)
          roughness={0.41}
          metalness={1}
        />
      </Sphere>
      <SkyBox />
      <Text      
        color={'#EC2D2D'}
        fontSize={1}
        //maxWidth={5}
      textAlign={'left'}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        fillOpacity={0}
      strokeWidth={'2.5%'}
      strokeColor="#000"
      anchorX="center"
      anchorY="185%">
       Mirada Vegetal 
      </Text>
    </Canvas>
  );
}

export default App;
