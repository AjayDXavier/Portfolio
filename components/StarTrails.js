"use client";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";


function Stars() {
 const meshRef = useRef();
 const numStars = 500;
 const interactionRadius = 20;
 const interactionStrength = 0.5;
 const mouse = new THREE.Vector2(-10, -10); // Initialize off-screen


 useEffect(() => {
 const handleMouseMove = (event) => {
 mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
 mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
 };
 window.addEventListener("mousemove", handleMouseMove);
 return () => window.removeEventListener("mousemove", handleMouseMove);
 }, []);


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
 initialPos: new THREE.Vector3(x, y, z),
 angle,
 radius,
 speed: THREE.MathUtils.randFloat(0.0005, 0.0012),
 color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
 });
 }
 return stars;
 }, []);


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


 const { camera } = useThree();
 const tempVector = new THREE.Vector3();


 useFrame(() => {
 const dummy = new THREE.Object3D();
 starData.forEach((star, i) => {
 star.angle += star.speed;
 star.pos.set(
 Math.cos(star.angle) * star.radius,
 star.initialPos.y,
 Math.sin(star.angle) * star.radius
 );
 tempVector.copy(star.pos).project(camera);
 const distance = tempVector.distanceTo(mouse);


 if (distance < interactionRadius / window.innerWidth) {
 const moveDirection = new THREE.Vector3()
 .subVectors(tempVector, mouse)
 .normalize();


 star.pos.x += moveDirection.x * interactionStrength;
 star.pos.z += moveDirection.z * interactionStrength;
 star.pos.y += moveDirection.y * interactionStrength;
 } else {
 star.pos.y += (star.initialPos.y - star.pos.y) * 0.02;
 }


 dummy.position.copy(star.pos);
 dummy.updateMatrix();
 meshRef.current.setMatrixAt(i, dummy.matrix);
 meshRef.current.setColorAt(i, star.color);
 });
 meshRef.current.instanceMatrix.needsUpdate = true;
 meshRef.current.instanceColor.needsUpdate = true;
 });


 return (
 <instancedMesh ref={meshRef} args={[null, null, numStars]} rotation={[-Math.PI / -6.3, 2, 0]}> {/* Apply the 90 degree rotation here */}
 <sphereGeometry args={[0.6, 16, 16]} />
 <meshStandardMaterial emissiveIntensity={1.5} emissive="#ffffff" />
 </instancedMesh>
 );
}


export default function StarTrails() {
 return (
 <Canvas camera={{ position: [0, 0, 150], fov: 75 }}>
 <ambientLight intensity={0.5} />
 <pointLight position={[0, 0, 200]} intensity={2} color="#ffffff" />
 <Stars />
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