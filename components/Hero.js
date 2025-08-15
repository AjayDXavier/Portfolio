"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

const fadeInUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Hero() {
  return (
    <section className="relative h-screen w-full text-white overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 1]} />
          <Sphere args={[1, 100, 200]} scale={1.7}>
            <MeshDistortMaterial distort={0.35} speed={2} roughness={0} color="#4f46e5" />
          </Sphere>
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold">
              Ajay Domnic Xavier
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-200">
              AI/ML Engineer • Developer • 3D Web tinkerer
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
