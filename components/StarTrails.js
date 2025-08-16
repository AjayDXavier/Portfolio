"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";

// Component for the star field
function Stars() {
  const meshRef = useRef();
  const trailCount = 1; // we drop trails for smoother glow spheres
  const numStars = 500;

  // Star data
  const starData = useMemo(() => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      const radius = THREE.MathUtils.randFloat(50, 100);
      const angle = Math.random() * Math.PI * 2;
      const y = THREE.MathUtils.randFloatSpread(50);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      stars.push({
        pos: new THREE.Vector3(x, y, z),
        angle,
        radius,
        speed: THREE.MathUtils.randFloat(0.0005, 0.0012),
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6), // add random colors
      });
    }
    return stars;
  }, []);

  // Scroll-controlled rotation
  useEffect(() => {
    const handleScroll = () => {
      const normalizedScroll = window.scrollY / window.innerHeight;
      gsap.to(meshRef.current.rotation, {
        y: normalizedScroll * Math.PI * 2,
        duration: 1.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate star positions
  useFrame(() => {
    const dummy = new THREE.Object3D();
    starData.forEach((star, i) => {
      const y = star.pos.y;
      const x = Math.cos(star.angle) * star.radius;
      const z = Math.sin(star.angle) * star.radius;
      star.pos.set(x, y, z);
      star.angle += star.speed;

      dummy.position.copy(star.pos);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, star.color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, numStars]}>
      <sphereGeometry args={[0.6, 16, 16]} /> {/* bigger, smoother spheres */}
      <meshStandardMaterial emissiveIntensity={1.5} emissive="#ffffff" />
    </instancedMesh>
  );
}

// Main component
export default function StarTrails() {
  return (
    <Canvas camera={{ position: [0, 0, 150], fov: 75 }}>
      {/* lighting for glow effect */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 200]} intensity={2} color="#ffffff" />

      <Stars />

      {/* Bloom effect for glow */}
      <EffectComposer>
        <Bloom
          intensity={2.5}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
}
