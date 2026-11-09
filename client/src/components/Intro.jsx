
import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Globe2 } from 'lucide-react';
import * as THREE from 'three';

const INTRO_MS = 12000;

// Aircraft wings
function Wing({ side = 1 }) {
  const shape = new THREE.Shape();

  shape.moveTo(0, 0.28);
  shape.lineTo(side * 3.05, -0.48);
  shape.quadraticCurveTo(
    side * 3.35,
    -0.57,
    side * 3.28,
    -0.78
  );
  shape.lineTo(side * 2.95, -1.02);
  shape.lineTo(side * 0.12, -0.18);
  shape.closePath();

  return (
    <mesh position={[0, -0.12, 0]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial
        color="#b8d8e9"
        metalness={0.72}
        roughness={0.27}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Aircraft engines
function Engine({ position }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.22, 0.29, 0.92, 32]} />
        <meshStandardMaterial
          color="#52748d"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0.47, 0]}>
        <torusGeometry args={[0.22, 0.045, 12, 32]} />
        <meshStandardMaterial
          color="#dff6ff"
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0, 0.475, 0]}>
        <circleGeometry args={[0.17, 32]} />
        <meshStandardMaterial
          color="#071b31"
          metalness={0.4}
        />
      </mesh>
    </group>
  );
}

// Complete passenger aircraft
function Aircraft() {
  const aircraftRef = useRef();

  useFrame((state) => {
    if (!aircraftRef.current) return;

    const t = state.clock.elapsedTime;

    // Smooth, continuous aircraft banking
    aircraftRef.current.rotation.z =
      -0.12 + Math.sin(t * 0.65) * 0.035;

    aircraftRef.current.rotation.x =
      0.12 + Math.sin(t * 0.45) * 0.012;

    aircraftRef.current.rotation.y =
      -0.16 + Math.sin(t * 0.35) * 0.025;
  });

  return (
    <group
      ref={aircraftRef}
      rotation={[0.12, -0.16, -0.12]}
      scale={0.94}
    >
      {/* Main fuselage */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.31, 3.55, 12, 32]} />
        <meshPhysicalMaterial
          color="#eaf7ff"
          metalness={0.52}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Front nose */}
      <mesh position={[0, 2.02, 0]}>
        <coneGeometry args={[0.31, 0.72, 32]} />
        <meshPhysicalMaterial
          color="#f7fcff"
          metalness={0.45}
          roughness={0.18}
          clearcoat={1}
        />
      </mesh>

      {/* Rear section */}
      <mesh position={[0, -2.03, 0]}>
        <coneGeometry args={[0.31, 0.65, 32]} />
        <meshStandardMaterial
          color="#8fb6ce"
          metalness={0.65}
          roughness={0.25}
        />
      </mesh>

      {/* Main wings */}
      <Wing side={1} />
      <Wing side={-1} />

      {/* Tail wings */}
      <mesh position={[0, -1.72, 0]}>
        <boxGeometry args={[1.8, 0.48, 0.055]} />
        <meshStandardMaterial
          color="#8fb9d2"
          metalness={0.65}
          roughness={0.25}
        />
      </mesh>

      {/* Vertical stabilizer */}
      <mesh
        position={[0, -1.72, 0.12]}
        rotation={[0.18, 0, 0]}
      >
        <boxGeometry args={[0.07, 0.8, 0.36]} />
        <meshStandardMaterial
          color="#1687c9"
          metalness={0.35}
          roughness={0.3}
        />
      </mesh>

      {/* Engines */}
      <Engine position={[-1.25, -0.1, 0.05]} />
      <Engine position={[1.25, -0.1, 0.05]} />

      {/* Cockpit */}
      <mesh
        position={[0, 1.55, 0.245]}
        rotation={[-0.22, 0, 0]}
      >
        <boxGeometry args={[0.38, 0.28, 0.035]} />
        <meshPhysicalMaterial
          color="#123653"
          metalness={0.7}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>

      {/* Passenger windows */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh
          key={i}
          position={[0.315, 0.92 - i * 0.18, 0]}
        >
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#1687c9" />
        </mesh>
      ))}

      {/* Aircraft branding */}
      <Text
        position={[0, 0.15, 0.315]}
        fontSize={0.19}
        letterSpacing={0.06}
        color="#0878b5"
        anchorX="center"
        anchorY="middle"
      >
        EXPLORE
      </Text>

      <Text
        position={[0, -0.06, 0.315]}
        fontSize={0.105}
        letterSpacing={0.12}
        color="#16496b"
        anchorX="center"
        anchorY="middle"
      >
        OVERSEAS
      </Text>

      {/* Blue lighting */}
      <mesh position={[0, 0, -0.12]}>
        <pointLight
          color="#6bcfff"
          intensity={2.4}
          distance={7}
        />
      </mesh>
    </group>
  );
}

// Cinematic intro component
export default function Intro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (
      reduceMotion ||
      sessionStorage.getItem('eo-intro-seen')
    ) {
      return;
    }

    document.documentElement.classList.add('eo-intro-active');
    setVisible(true);

    const done = window.setTimeout(() => {
      setVisible(false);

      document.documentElement.classList.remove(
        'eo-intro-active'
      );

      sessionStorage.setItem('eo-intro-seen', '1');
    }, INTRO_MS);

    return () => {
      window.clearTimeout(done);

      document.documentElement.classList.remove(
        'eo-intro-active'
      );
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cinematic-intro"
      aria-label="Explore Overseas cinematic introduction"
    >
      <div className="intro-atmosphere" />
      <div className="intro-stars" />

      <div className="intro-brand">
        <span className="intro-mark">
          <Globe2 size={23} />
        </span>

        <span>
          EXPLORE <b>OVERSEAS</b>
          <small>YOUR JOURNEY, OUR GUIDANCE</small>
        </span>
      </div>

      <div className="intro-flight-path" />

      <div className="intro-aircraft">
        <Canvas
          camera={{
            position: [0, 0, 9.2],
            fov: 38
          }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true
          }}
        >
          <ambientLight intensity={1.1} />

          <directionalLight
            position={[-4, 5, 7]}
            intensity={3.2}
            color="#e4f7ff"
          />

          <pointLight
            position={[4, -2, 3]}
            intensity={2.2}
            color="#2bbcff"
          />

          <pointLight
            position={[-4, 1, -2]}
            intensity={1.5}
            color="#1b6caa"
          />

          <Aircraft />
        </Canvas>
      </div>

      <div className="intro-caption">
        THE WORLD IS CLOSER THAN YOU THINK
      </div>
    </div>
  );
}
