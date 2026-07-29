"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshWobbleMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#37B7C3" wireframe roughness={0.1} />
      </mesh>
    </Float>
  );
}

function NeonRing() {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <mesh position={[-2.2, 0.5, -1]} scale={1.5}>
        <torusGeometry args={[1, 0.05, 16, 100]} />
        <meshStandardMaterial color="#088395" emissive="#37B7C3" emissiveIntensity={2} />
      </mesh>
    </Float>
  );
}

function AIBrainSphere() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere args={[1, 32, 32]} position={[0, -0.2, 0]}>
        <MeshWobbleMaterial
          color="#37B7C3"
          factor={0.4}
          speed={2}
          roughness={0.2}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="w-full h-[500px] relative z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#37B7C3" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#088395" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
        
        <AIBrainSphere />
        <FloatingCube />
        <NeonRing />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
