"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const NODE_COUNT = 20;
const CONNECT_DIST = 2.0;
const BOUNDS: [number, number, number] = [3.0, 2.0, 1.5];

function NetworkCluster() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodes = useMemo(() =>
    Array.from({ length: NODE_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS[0] * 2,
        (Math.random() - 0.5) * BOUNDS[1] * 2,
        (Math.random() - 0.5) * BOUNDS[2] * 2,
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.003,
      ),
    })), []);

  const MAX_PAIRS = NODE_COUNT * (NODE_COUNT - 1);

  const pointBuffer = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const pointGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pointBuffer, 3));
    return geo;
  }, [pointBuffer]);

  const lineBuffer = useMemo(() => new Float32Array(MAX_PAIRS * 6), []);
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(lineBuffer, 3));
    return geo;
  }, [lineBuffer]);

  useFrame(() => {
    // Update node positions
    for (let i = 0; i < NODE_COUNT; i++) {
      const node = nodes[i];
      node.pos.add(node.vel);
      ([0, 1, 2] as const).forEach((axis) => {
        const b = BOUNDS[axis];
        if (node.pos.getComponent(axis) > b) {
          node.pos.setComponent(axis, b);
          node.vel.setComponent(axis, -Math.abs(node.vel.getComponent(axis)));
        } else if (node.pos.getComponent(axis) < -b) {
          node.pos.setComponent(axis, -b);
          node.vel.setComponent(axis, Math.abs(node.vel.getComponent(axis)));
        }
      });
      pointBuffer[i * 3]     = node.pos.x;
      pointBuffer[i * 3 + 1] = node.pos.y;
      pointBuffer[i * 3 + 2] = node.pos.z;
    }
    pointGeo.attributes.position.needsUpdate = true;

    // Update connection lines
    let idx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodes[i].pos.distanceTo(nodes[j].pos) < CONNECT_DIST) {
          lineBuffer[idx++] = nodes[i].pos.x; lineBuffer[idx++] = nodes[i].pos.y; lineBuffer[idx++] = nodes[i].pos.z;
          lineBuffer[idx++] = nodes[j].pos.x; lineBuffer[idx++] = nodes[j].pos.y; lineBuffer[idx++] = nodes[j].pos.z;
        }
      }
    }
    lineGeo.setDrawRange(0, idx / 3);
    lineGeo.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial color="#c8602a" size={0.06} sizeAttenuation={true} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#c8602a" transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%", cursor: "grab" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#f5f0e8"]} />
      <NetworkCluster />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI * 2) / 3}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        dampingFactor={0.08}
        enableDamping={true}
      />
    </Canvas>
  );
}
