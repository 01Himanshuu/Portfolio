'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Float, Environment } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import * as THREE from 'three';

// Typeface font from Three.js CDN
const FONT_URL = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';

/**
 * GlassText — 3D "hello" text with glass/refraction material
 * Wobbles in response to mouse movement with spring physics
 */
function GlassText({ mouse }) {
  const meshRef = useRef();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Calculate target rotation from mouse position (-1 to 1 range)
    targetRot.current.x = -mouse.current.y * 0.2;
    targetRot.current.y = mouse.current.x * 0.25;

    // Spring interpolation for smooth wobble
    const springFactor = 1 - Math.pow(0.001, delta);
    meshRef.current.rotation.x +=
      (targetRot.current.x - meshRef.current.rotation.x) * springFactor * 0.8;
    meshRef.current.rotation.y +=
      (targetRot.current.y - meshRef.current.rotation.y) * springFactor * 0.8;

    // Subtle idle floating motion
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font={FONT_URL}
        size={1.8}
        height={0.5}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.03}
        bevelSize={0.03}
        bevelSegments={5}
        letterSpacing={-0.05}
      >
        hello
        <meshPhysicalMaterial
          transmission={0.92}
          roughness={0.05}
          thickness={0.5}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          transparent
          opacity={0.9}
          color="#e8e4f0"
          side={THREE.DoubleSide}
        />
      </Text3D>
    </Center>
  );
}

/**
 * Scene — Three.js scene with lights and environment
 */
function Scene({ mouse }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#a29bfe" />
      <pointLight position={[0, 4, 0]} intensity={0.8} color="#c8ff00" />

      {/* Environment map for reflections */}
      <Environment preset="city" />

      {/* The 3D glass text */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <GlassText mouse={mouse} />
      </Float>
    </>
  );
}

/**
 * Fallback while the 3D scene loads
 */
function LoadingFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}
    >
      Loading 3D...
    </div>
  );
}

/**
 * HeroScene — The full 3D canvas component
 * Tracks mouse position and passes it to the 3D text for wobble effect
 */
export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onMouseMove = (e) => {
      // Normalize mouse position to -1 to 1 range
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mounted]);

  if (!mounted) return <LoadingFallback />;

  return (
    <div ref={containerRef} className="hero-3d-canvas">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <Scene mouse={mouse} />
        </Canvas>
      </Suspense>
    </div>
  );
}
