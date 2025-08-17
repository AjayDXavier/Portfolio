// components/Projects.js

"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // For optimized images

const fadeInUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Projects() {
  // 1. Updated the projects array to include image and tags
  const projects = [
    { 
      title: "3D Portfolio Website", 
      description: "Next.js + Three.js interactive portfolio.", 
      link: "#",
      image: "/project-portfolio.jpg", // Example image path
      tags: ["Next.js", "Three.js", "Framer Motion"],
    },
    { 
      title: "AI-Powered App", 
      description: "Real-time predictions with a clean UI.", 
      link: "#",
      image: "/project-ai-app.jpg", // Example image path
      tags: ["Python", "React", "FastAPI"],
    },
    { 
      title: "IoT Dashboard", 
      description: "Live telemetry & alerts dashboard.", 
      link: "#",
      image: "/project-iot.jpg", // Example image path
      tags: ["React", "MQTT", "Node.js"],
    },
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
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {projects.map((p) => (
            <motion.a
              variants={fadeInUp}
              key={p.title}
              href={p.link}
              className="group bg-white rounded-xl border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* 2. Added Image container with hover effect */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={p.image}
                  alt={`Screenshot of ${p.title}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-gray-600 flex-1">{p.description}</p>
                {/* 3. Added technology tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* 4. Enhanced "View Project" link */}
                <span className="mt-6 font-semibold text-blue-600 inline-flex items-center gap-1">
                  View Project <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}