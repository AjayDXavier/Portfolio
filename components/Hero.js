// components/Hero.js

"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// 1. Import new hooks from framer-motion
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const fadeInUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Hero() {
  // 2. Set up motion values to track the mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3. Transform mouse position into a rotation value with a spring for smoothness
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  // 4. Function to update mouse position
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  // Reset rotation when mouse leaves the section
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // 5. Add event handlers and perspective to the main section
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full text-white overflow-hidden"
      style={{ perspective: "1000px" }} // This creates the 3D space
    >
      {/* This part remains the same */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 1]} />
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6">
          {/* 6. Wrap text content in a new motion.div to apply the 3D rotation */}
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              rotateX,
              rotateY,
            }}
          >
            <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl text-center">
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-extrabold">
                Ajay Domnic Xavier
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-200">
                AI/ML Engineer • Developer • 3D Web tinkerer
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}