import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Bot() {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    const targetRotY = mouse.x * 0.4;
    const targetRotX = -mouse.y * 0.2;
    group.current.rotation.y += (targetRotY + t * 0.2 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.05;
    group.current.position.y = Math.sin(t * 1.2) * 0.15;
  });

  return (
    <group ref={group} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Head */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial color={hovered ? "#8b5cf6" : "#7c3aed"} metalness={0.2} roughness={0.25} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.42, 0.18, 0.98]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#0b0b0f" />
      </mesh>
      <mesh position={[0.42, 0.18, 0.98]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#0b0b0f" />
      </mesh>
      {/* Mouth */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.35, 0.95]}>
        <torusGeometry args={[0.28, 0.04, 16, 100]} />
        <meshStandardMaterial color="#111827" metalness={0.1} roughness={0.4} />
      </mesh>
      {/* Halo ring */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]} position={[0, 0, -0.2]}> 
        <torusGeometry args={[2.2, 0.02, 16, 200]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>
    </group>
  );
}

export default function AICoach() {
  return (
    <div className="relative h-[420px] w-full sm:h-[460px]">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[36px] bg-gradient-to-b from-violet-200/50 via-fuchsia-100/30 to-transparent blur-3xl" />
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={1} castShadow color="#c4b5fd" />
        <Bot />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
