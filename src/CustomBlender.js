import React, { useRef, useState, Suspense } from "react";
import { Canvas, extend, useThree, useFrame, useLoader} from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import {Text, Environment} from '@react-three/drei';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette
} from "@react-three/postprocessing";
import MyModel from './MyModel.js';
extend({ OrbitControls });
//const MyModel = React.lazy(() => import('./MyModel.js'));

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={false}
      enableZoom={true}
    />
  );
};

// Loads the skybox texture and applies it to the scene.
function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    /*
    "/test.png",

    "/psicodelico.jpg" ,
    "/psicodelico.jpg" ,
    "/psicodelico.jpg" ,
    "/psicodelico.jpg" ,
    "/psicodelico.jpg" ,
    "/psicodelico.jpg" */

    "/gradiente.jpg",
    "/test.png",
    "/hojarezca.jpg",
    "/words.png",
    "/test.png",
    "/gradiente.jpg"
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

// Geometry
function Sphere(props) {
  const { scene, gl } = useThree();
  // The cubeRenderTarget is used to generate a texture for the reflective sphere.
  // It must be updated on each frame in order to track camera movement and other changes.
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter
  });
  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  scene.add(cubeCamera);
  const mesh = useRef();
  // Update the cubeCamera with current renderer and scene.
  useFrame((t) => { mesh.current.rotation.x = Math.sin(t.clock.elapsedTime*100)*50
    mesh.current.rotation.y = Math.sin(t.clock.elapsedTime*80)*50
    //cubeCamera.position.set(Math.sin(t.clock.elapsedTime)*1,Math.sin(t.clock.elapsedTime)*5,Math.sin(t.clock.elapsedTime)*4)
    cubeCamera.update(gl, scene)});

  return (
    <mesh visible position={[0, 1, 0]} 
      rotation={[0, 0, 0]}  
      ref={mesh} castShadow
      onPointerOver={props.onHover} 
      onPointerOut={props.outHover}
    >
      <directionalLight intensity={0.75} />
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshBasicMaterial
        attach="material"
        envMap={cubeCamera.renderTarget.texture}
        color="white"
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  );
}

// Lights
function CustomBlender() {
  const [hovered, setHovered]=useState(false);
  //const gltf = useLoader(GLTFLoader, './ojo_broken_a.gltf')
  return (
    <Canvas>
      <CameraControls />
        <Environment files={['gradiente.jpg','gradiente.jpg','gradiente.jpg','test.png','test.png','test.png']} path='./' background={false} />
      <SkyBox />
      <Text      
        color={'#EC2D2D'}
        fontSize={1}
        maxWidth={5}
        textAlign={'left'}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        fillOpacity={0}
        strokeWidth={'2.5%'}
        strokeColor="#000"
        anchorX="right"
        anchorY="right">
        Mirada Vegetal 
      </Text>
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, -10, 5]} intensity={1} />
      <MyModel />
    </Canvas>
  );
}

export default CustomBlender;
