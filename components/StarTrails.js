"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import gsap from "gsap";

// Component for the star field
function Stars() {
  const pointsRef = useRef();
  const trailCount = 5; // number of previous positions per star

  // Initialize stars
  const starData = useMemo(() => {
    const stars = [];
    const numStars = 500; // keep performance in mind
    for (let i = 0; i < numStars; i++) {
      const radius = THREE.MathUtils.randFloat(50, 100);
      const angle = Math.random() * Math.PI * 2;
      const y = THREE.MathUtils.randFloatSpread(50);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      // store current + previous positions for trail
      stars.push({
        positions: Array(trailCount).fill([x, y, z]),
        angle,
        radius,
        speed: THREE.MathUtils.randFloat(0.0005, 0.0012),
      });
    }
    return stars;
  }, []);

  // Flatten all positions into a single Float32Array
  const positions = useMemo(() => {
    const arr = new Float32Array(starData.length * trailCount * 3);
    starData.forEach((star, i) => {
      star.positions.forEach((pos, j) => {
        arr[(i * trailCount + j) * 3] = pos[0];
        arr[(i * trailCount + j) * 3 + 1] = pos[1];
        arr[(i * trailCount + j) * 3 + 2] = pos[2];
      });
    });
    return arr;
  }, [starData]);

  // Scroll-controlled rotation
  useEffect(() => {
    const handleScroll = () => {
      const normalizedScroll = window.scrollY / window.innerHeight;
      gsap.to(pointsRef.current.rotation, {
        y: normalizedScroll * Math.PI * 2,
        duration: 1.5,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate stars & trails
useFrame(() => {
  const array = pointsRef.current.geometry.attributes.position.array;

  starData.forEach((star, i) => {
    // shift trail positions
    star.positions.pop();

    // keep Y steady to reduce shimmer
    const y = star.positions[0][1]; 
    const x = Math.cos(star.angle) * star.radius;
    const z = Math.sin(star.angle) * star.radius;
    star.positions.unshift([x, y, z]);

    // slowly rotate
    star.angle += star.speed;

    // update buffer geometry
    star.positions.forEach((pos, j) => {
      array[(i * trailCount + j) * 3] = pos[0];
      array[(i * trailCount + j) * 3 + 1] = pos[1];
      array[(i * trailCount + j) * 3 + 2] = pos[2];
    });
  });

  pointsRef.current.geometry.attributes.position.needsUpdate = true;
});


  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={1.0}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

// Main component
export default function StarTrails() {
  return (
    <Canvas camera={{ position: [0, 0, 150], fov: 75 }}>
      <Stars />
    </Canvas>
  );
}
