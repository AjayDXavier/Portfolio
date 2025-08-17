// components/Contact.js

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const fadeInUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // --- YOUR EMAILJS LOGIC WILL GO HERE ---
    // Replace with your actual Service ID, Template ID, and Public Key
    const serviceID = "service_mhgusjs";
    const templateID = "template_5outq3h";
    const publicKey = "0hGI6IEVUJNenxBtu";

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4 text-center">Contact Me</motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I’d love to hear from you.
          </motion.p>
          
          <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-2">Email</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm mb-2">Message</label>
              <textarea name="message" id="message" required rows="5" value={formData.message} onChange={handleChange} className="w-full p-3 rounded bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div className="mt-6 text-center">
              <button type="submit" disabled={status === "sending"} className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors">
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
            {status === "success" && <p className="text-center mt-4 text-green-400">Message sent successfully!</p>}
            {status === "error" && <p className="text-center mt-4 text-red-400">Something went wrong. Please try again.</p>}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}