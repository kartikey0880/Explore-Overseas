import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

function Earth() {
  const earthMap = useTexture('/textures/earth-blue-marble.png');
  useEffect(() => {
    earthMap.colorSpace = THREE.SRGBColorSpace;
    earthMap.anisotropy = 8;
    earthMap.needsUpdate = true;
  }, [earthMap]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.55, 128, 128]} />
        <meshStandardMaterial map={earthMap} roughness={0.96} metalness={0.02} />
      </mesh>
      <mesh scale={1.018}>
        <sphereGeometry args={[1.55, 96, 96]} />
        <meshBasicMaterial color="#74cfff" transparent opacity={0.055} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.045}>
        <sphereGeometry args={[1.55, 96, 96]} />
        <meshBasicMaterial color="#4caeff" transparent opacity={0.075} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.58} />
      <directionalLight position={[-4, 2.5, 5]} intensity={2.25} color="#e8f7ff" />
      <pointLight position={[3, -2, -3]} intensity={1.05} color="#168bff" />
      <Stars radius={30} depth={12} count={650} factor={2.2} fade speed={0.25} />
      <Earth />
      <OrbitControls
        enableDamping
        dampingFactor={0.065}
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate
        autoRotateSpeed={0.32}
        rotateSpeed={0.62}
      />
    </>
  );
}

export default function EarthGlobe() {
  return (
    <div className="earth-canvas" aria-label="Interactive realistic Earth. Drag to rotate the globe.">
      <Canvas camera={{ position: [0, 0, 5.1], fov: 38 }} dpr={[1, 1.6]}>
        <Scene />
      </Canvas>
      <span className="earth-orbit earth-orbit-one" />
      <span className="earth-orbit earth-orbit-two" />
      <span className="earth-location earth-location-one" />
      <span className="earth-location earth-location-two" />
    </div>
  );
}
