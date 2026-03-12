"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";

function GlassTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <Torus ref={ref} args={[1.4, 0.45, 64, 128]}>
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.3}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#d4c4a8"
        />
      </Torus>
    </Float>
  );
}

function SmallSphere({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#c8602a" roughness={0.1} metalness={0.8} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#f5f0e8"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff8f0" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#c8d4e8" />
      <GlassTorus />
      <SmallSphere position={[2.5, 1.2, 0]} />
      <SmallSphere position={[-2.8, -0.8, -0.5]} />
      <Environment preset="studio" />
    </Canvas>
  );
}
