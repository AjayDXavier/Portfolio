"use client";
import { motion } from "framer-motion";

const fadeInUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Projects() {
  const projects = [
    { title: "3D Portfolio Website", description: "Next.js + Three.js interactive portfolio.", link: "#" },
    { title: "AI-Powered App", description: "Real-time predictions with a clean UI.", link: "#" },
    { title: "IoT Dashboard", description: "Live telemetry & alerts dashboard.", link: "#" },
  ];

  return (
    <section id="projects" className="py-24 bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-3xl font-bold mb-8">
          Projects
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.a
              variants={fadeInUp}
              key={p.title}
              href={p.link}
              className="group bg-white rounded-xl border hover:shadow-lg transition p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-gray-600 flex-1">{p.description}</p>
              <span className="mt-4 inline-flex items-center gap-1">
                View Project <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
