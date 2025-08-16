"use client";
import { motion } from "framer-motion";

const fadeInUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  const skills = ["Python", "JavaScript", "React", "Three.js", "Tailwind CSS", "AI/ML"];

  return (
    <section id="about" className="py-24 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">About Me</motion.h2>
          <motion.p variants={fadeInUp} className="text-lg mb-8 max-w-3xl">
            I build intelligent, user-centered apps that blend AI/ML with crisp, modern front-ends.
            I enjoy turning complex problems into clean, interactive experiences.
          </motion.p>

          <motion.h3 variants={fadeInUp} className="text-2xl font-semibold mb-4">Skills</motion.h3>
          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {skills.map((s) => (
              <div key={s} className="p-3 text-center rounded-lg bg-gray-100 border">{s}</div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
