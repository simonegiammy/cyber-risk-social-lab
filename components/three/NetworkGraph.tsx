"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 80;
const RADIUS = 7;

function Nodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities, edgeIndices } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = RADIUS * (0.4 + Math.random() * 0.6);
      positions.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004
      ));
    }
    // Edges: connect each node to ~3 nearest neighbours
    const edgeIndices: [number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < NODE_COUNT; i++) {
      const dists = positions.map((p, j) => ({ j, d: positions[i].distanceTo(p) })).filter(x => x.j !== i);
      dists.sort((a, b) => a.d - b.d);
      for (let k = 0; k < 3; k++) {
        const j = dists[k].j;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) { seen.add(key); edgeIndices.push([i, j]); }
      }
    }
    return { positions, velocities, edgeIndices };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(edgeIndices.length * 6);
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [edgeIndices]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i].add(velocities[i]);
      // Soft containment
      if (positions[i].length() > RADIUS) {
        positions[i].setLength(RADIUS - 0.1);
        velocities[i].multiplyScalar(-1);
      }
      dummy.position.copy(positions[i]);
      const pulse = 0.6 + 0.4 * Math.sin(t * 1.2 + i);
      dummy.scale.setScalar(0.04 + pulse * 0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update edges
    const pos = lineGeo.attributes.position.array as Float32Array;
    for (let e = 0; e < edgeIndices.length; e++) {
      const [a, b] = edgeIndices[e];
      pos[e * 6] = positions[a].x; pos[e * 6 + 1] = positions[a].y; pos[e * 6 + 2] = positions[a].z;
      pos[e * 6 + 3] = positions[b].x; pos[e * 6 + 4] = positions[b].y; pos[e * 6 + 5] = positions[b].z;
    }
    lineGeo.attributes.position.needsUpdate = true;

    // Slow rotation
    if (meshRef.current.parent) meshRef.current.parent.rotation.y = t * 0.04;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#7C9CFF" toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#00FF9C" transparent opacity={0.18} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

export function NetworkGraph({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 14], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <Nodes />
      </Canvas>
    </div>
  );
}
