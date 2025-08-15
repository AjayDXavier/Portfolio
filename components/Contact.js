"use client";
import { motion } from "framer-motion";

const fadeInUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">Contact Me</motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-300 mb-8">
            Have a project in mind or want to collaborate? I’d love to hear from you.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex justify-center gap-4">
            <a href="mailto:youremail@example.com" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500">
              Send Email
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-lg border border-white/30 hover:bg-white/10">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-lg border border-white/30 hover:bg-white/10">
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
